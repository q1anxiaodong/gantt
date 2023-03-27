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
        const view = D3Ins.getViewOfComponentModel(model);
        const grid = model.getAxisModel("y").dependentModels.grid;
        const type = model.type;
  
        this.seriesInfo.push({ model, view, grid, type });
      };
    D3Ins.getModel().eachComponent("series", getInfo);
    D3Ins.getModel().eachComponent('markArea',getInfo);
  }
  init() {
    this.seriesInfo.forEach((series) => {
      if (["bar", "hqbar"].indexOf(series.type) !== -1) {
        const { model, view, grid } = series;
        const scale = this._D3Ins.getModel().get('scale');
        const bandWidth = model.bandwidth;
        let states = model.points.map((item, index) => {
          return {
            // shape: { width: !index ? 0 : model.points[index - 1][0] - bandWidth },
            shape: { width: item[0] - bandWidth },
            // lineShape: {width: index ? model.points[index - 1][0] + bandWidth / 2 : bandWidth},
            // lineShape: {width: item[0] - bandWidth},
            style: { opacity: 1 },
          };
        });
        let zeroState = {
          shape: { width: 0 },
        };
        const position = grid.position;
        this.seriesInfo.forEach((itm) => {
          if (itm.grid.id === grid.id) {
            if (['custom', 'markArea'].indexOf(itm.type) !== -1) {
              const elZeroState = {
                ignore: true,
              };
              itm.view.group.childAt(0).eachChild((el, idx) => {
                const elStates = states.map((item, index) => {
                  return {
                    ignore: index < itm.model.get('xIndex'),
                  };
                });
                el.states = elStates;
                el.zeroState = elZeroState;
              });
            } 
            else {
              const clipPath = new D3Charts.graphic.Rect({
                shape: {
                  x: position.left,
                  y: position.top,
                  width: 0,
                  height: position.height,
                },
              });
              let clipStates;
              // if (itm.type === 'line') {
              //   clipStates = states.map(state => {
              //     return {shape: state.lineShape, style: state.style};
              //   })
              // } else {
                clipStates = states;
              // }
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
      if (['custom', 'markArea'].indexOf(type) !== -1) {
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
    this.seriesInfo.forEach((series) => {
      const { type, view } = series;
      if (['custom', 'markArea'].indexOf(type) !== -1) {
        view.group.childAt(0).eachChild((el) => {
          this.useState(el, index, animation);
        });
      } else if (type === 'line') {
        this.useState(view.group.clipPath, index, true);
      }
       else {
        this.useState(view.group.clipPath, index, animation);
      }
    });
  }
}

const changeChartLegend = (chart, lastIndex, changeMap) => {
  if (!changeMap || !changeMap.length) return;
  const globalModel = chart.getModel();
  const legendModel = globalModel.getComponentByIndex('legend', 0);
  const legendView = chart.getViewOfComponentModel(legendModel);
  changeMap.forEach(({source, target}) => {
    const seriesModel = globalModel.getSeriesByName(source)[0];
    const seriesData = seriesModel.getData();
    const last = Math.max(0, Math.min(lastIndex, seriesData.length - 1));
    const name = `{${source}|${target.replace('$', seriesData[last][1].toFixed(2))}}`;
    legendView.group.eachChild(child => {
      if (child._name === source) {
        child.traverse(el => {
          if (el.style.text){
            el.attr({
              style: {text: name}
            })
          }
        })
      }
    })
  })
}