class TimeLineHelper {
  /** helper对应的D3Chart图表示例 */
  _D3Ins;
  /** 图表的数据结构信息 */
  seriesInfo;
  constructor(chart, index) {
    this._D3Ins = chart;
    this.seriesInfo = [];
    // 获取helper对应的图表的数据结构
    this.getSeriesInfo();
    // 初始化helper
    this.init();
    // 通过helper给图表赋最初状态
    this.initState(index);
  }
  getSeriesInfo() {
    const D3Ins = this._D3Ins;
    const getInfo = (model) => {
      if (["waterMark", "mark"].indexOf(model.get('id')) !== -1 && model.type === "custom") {
        return;
      }
      const view = D3Ins.getViewOfComponentModel(model);
      const grid = model.getAxisModel("y").dependentModels.grid;
      const visible = !(model.get('selected') === false);
      const type = model.type;

      this.seriesInfo.push({ model, view, grid, type, visible });
    };
    D3Ins.getModel().eachComponent("series", getInfo, false);
    D3Ins.getModel().eachComponent("markArea", getInfo);
  }
  init() {
    this.seriesInfo.forEach((series) => {
      if (["bar", "hqbar"].indexOf(series.type) !== -1) {
        const { model, view, grid } = series;
        let states;
        const scale = this._D3Ins.getModel().get("scale");
        const bandWidth = model.bandwidth;
        if (series.type === 'bar' && !series.visible) {
          const xAxisModel = model.dependentModels.axis[0];
          const xAxisScale = xAxisModel.getScale();
          states = xAxisModel.domain.map(dataItem => {
            return {
              shape: {
                width: xAxisScale(dataItem) - xAxisScale.bandwidth()
              }
            }
          });
        } else {
          states = model.points.map((item, index) => {
            return {
              shape: { width: item[0] - bandWidth },
            };
          });
        }
        let zeroState = {
          shape: { width: 0 },
        };
        const position = grid.position;
        this.seriesInfo.forEach((itm) => {
          if (!itm.visible) {
            return;
          }
          if (itm.grid.id === grid.id) {
            if (["custom", "markArea"].indexOf(itm.type) !== -1) {
              const elZeroState = {
                ignore: true,
              };
              itm.view.group.childAt(0).eachChild((el, idx) => {
                const elStates = states.map((item, index) => {
                  return {
                    ignore: index < itm.model.get("xIndex"),
                  };
                });
                el.states = elStates;
                el.zeroState = elZeroState;
              });
            } else {
              const clipPath = new D3Charts.graphic.Rect({
                shape: {
                  x: position.left,
                  y: position.top,
                  width: 0,
                  height: position.height,
                },
              });
              let clipStates;
              clipStates = states;
              clipPath.states = clipStates;
              clipPath.zeroState = zeroState;
              itm.view.group.setClipPath(clipPath);
            }
          }
        });
      }
    });
  }
  initState(index) {
    this.seriesInfo.forEach((item) => {
      const { type, view } = item;
      if (!item.visible) {
        return;
      }
      if (["custom", "markArea"].indexOf(type) !== -1) {
        view.group.childAt(0).eachChild((el) => {
          this.useState(el, index);
        });
      } else {
        const clipPath = item.view.group.clipPath;
        if (index === undefined) {
          this.useState(clipPath, "zeroState");
        }
        const idx = Math.max(0, Math.min(index, clipPath.states.length - 1));
        this.useState(clipPath, idx);
      }
    });
  }
  useState(el, stateIndex, animation) {
    const state =
      stateIndex === "zeroState" ? el[stateIndex] : el.states[stateIndex];
    animation ? el.animateTo(state) : el.attr(state);
  }
  change(index, animation) {
    const lineAnimation = animation === undefined ? true : animation;
    this.seriesInfo.forEach((series) => {
      const { type, view } = series;
      if (!series.visible) {
        return;
      }
      if (["custom", "markArea"].indexOf(type) !== -1) {
        view.group.childAt(0).eachChild((el) => {
          this.useState(el, index, animation);
        });
      } else if (type === "line") {
        this.useState(view.group.clipPath, index, lineAnimation);
      } else {
        this.useState(view.group.clipPath, index, animation);
      }
    });
  }
}

const changeChartLegend = (chart, lastIndex, changeMap) => {
  if (!changeMap || !changeMap.length) return;
  const globalModel = chart.getModel();
  const firstGrid = globalModel.getComponentByIndex("grid", 0);
  // 第一个grid到dom的边距
  let lastTextElPosition = firstGrid.position.left;
  changeMap.forEach(({ source, target, index }) => {
    const legendIndex = index === undefined ? 0 : index;
    const legendModel = globalModel.getComponentByIndex("legend", legendIndex);
    const legendView = chart.getViewOfComponentModel(legendModel);
    const seriesModel = globalModel.getSeriesByName(source)[0];
    const seriesData = seriesModel.getData();
    const horizontalGap = legendModel.get('horizontalGap');
    const symbolSize = legendModel.get('symbol').size[0];
    lastTextElPosition = lastTextElPosition - symbolSize;
    const last = Math.max(0, Math.min(lastIndex, seriesData.length - 1));
    let name = `{${source}|${target.replace(
      "$",
      (seriesModel.type === 'hqbar' ? seriesData[last][1][0] : seriesData[last][1]).toFixed(2)
    )}}`;
    legendView.group.eachChild((child) => {
      if (child._name === source) {
        child.traverse((el) => {
          if (el.style.text) {
            let iconStyle = '';
            ['icon_Line', 'icon_Bar'].forEach(str => {
              if (el.style.text.indexOf(str) !== -1) {
                iconStyle += `{${str}|}`;
              }
            });
            name = iconStyle + name;
            el.attr({
              style: { text: name },
            });
            el.parent.attr({
              position: [lastTextElPosition, el.parent.position[1]]
            });
            lastTextElPosition = lastTextElPosition + el.getBoundingRect().width + horizontalGap;
          }
        });
      }
    });
  });
};

const changeChartWaterMark = (chart, lastIndex) => {
  if (!chart || lastIndex === undefined) {
    return;
  }
  const globalModel = chart.getModel();
  const waterMarkModel = globalModel.getComponentById("series", 'waterMark');
  const waterMarkView = chart.getViewOfComponentModel(waterMarkModel);
  const targetLabel = waterMarkModel.domain[lastIndex];
  const markLabel = `${targetLabel.slice(4 , 6)}-${targetLabel.slice(6 , 8)}`;
  waterMarkView.group.traverse(el => {
    if (el.style && el.style.text !== undefined) {
      el.attr({
        style: {
          text: markLabel
        }
      })
    }
  })
}
