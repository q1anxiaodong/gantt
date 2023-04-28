const waterMarkImages = {
  dark: 'data:image/png;base64,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',
  light: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAAeCAYAAAAvpTBDAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAaaADAAQAAAABAAAAHgAAAACOZ4U9AAAGw0lEQVRoBb2aiZLbNhBE7ZzO+f/fmcRJnMMOHrXNarUaICVrM1VcADM9B2ZAEKT27ZtbejtY37xcX9yKn8r5OKz99XJ9OrD83ZATl+jf0flNgxPtu4H51nD4/tXGR90vB+BHA/0x+vA8pl/GmJwlDl8/jOsR+vhVaFEgkvF18F9ryIRIHvTh0kz/Zkz3LiBPJk7u1acgSZk/FtoZXNpZjjNQnGYylgaeJDzyyeLhcmJ1nqXP1cdP5gr/zlM8zkOPOz558M/Sp1wJLVk4eTYRtCfd+2xJGYfLFUtuP+K3tukTg29Lrsdd/bczRj8TnduzipR3Evx/ij4xuU3sycbo7vQhi+RKoAj2zx3+vE57Psg6RWpJldzbTIjLzvRn+uRlVSQSmjEqwZ5DcFx67o7uTizE7/fRJc/gbuioSK9xFxHEaoIpuwn6f2C0eXvyKYiPCakVSTzkzItFofm13GsHQY+LAr9xIMoygAySk7YFXRD3/eVE1PZo+Un/91l/HjqLlLkh3izSal4Uh7smdTxiP3nCx977cV09k5oBJe+eLQgHM1IR0pf8EBjH2CSOr7k1cXzeVlqCy7jpc3yX31RJuy3eszzmjH/NPX3NxsyXE+nVMymdEihXrqLBephICvbSlycrE4Qz5F4kHsSuA2ZFTT/vlpV+i9d3IXSJe4bLAs1iz1xv9txROlCy0sFqMisZ9jJZws+Clvx3dR5sP1c/c0O8zmO8KpKHzRbGImuUh4mtBqsiKXG097yZN+fwVHSfnPiSzXRZKLxkczdp0TBRTz78fGHltLSyjT1yIJtg20t1i1k6Q2W/qxOXxQTLHaxYafGpON3mYF/sninSDqbzBGoTWZkl8PZMyeRTIH29kD2SlEdpyWQ3E6OECUebMaeOFnTiskjEzEXePVYK196lNrtni8SK43SSwQ3WIZEkTnWiNhHJWsuhxZ9HYAg+398SAy4LCU8EPudDopqOx5yJx96WzNEmDtkRD0zT3/lepAxYioBJlDuDd5ZY4Y8WifjyaIpf7GUyW3w+B/ScfO7it2cFeXHb2PQxuvDAeQ5nPPBNf8oXOB2g4BMUDv695HbQTVspl33dvRqrZTtqyUy74Ge2kd1TJPAibKave3jYcX2PsfIVqAs9GPVTzhaWK1lYbDregwDjMsYuZ7FQHK7ZuxlFSjpaZIknBnw4EUc7lrd49WVA+ugql85rusidr/nnHMTfDbsSRiiAipDKyNt2Ax/Kj5a7syFLP+Alx89P46JdkfCOaXZbwqXTttB2d4JP2/h3nnLlPPQSJx6tYzUf54HZ41f1EyDFNMhYQdFvdI8t9LUY0Dsq0Mx3+sQuPI7tSbpTkz87BaZtcuNxKlcN1+44dM/qbzE+UiQFlZNknAHAc3ybiBcJ/IrcluPSLrJZMVxPfeyevZOko1YxZQzwG69ts9hq2M2HBGo35vgjx4xXMuHV+goR71Fb0vfWbTk/Y3TZmX57gZWe22ZB+RiMYvLk6453rHDOc/0Zf/pMkkGMTJURBiUW8VlbbDf+cXX2chout2Hz23CNx/tWO4wI68lnLukLXu4gPE8aD5tNv/G1w2xFwthMsSl70pE7pR2tKGFSnrb2wIbC0V0pm7RpF97RP6koNveJnlPGMCtS+p/hsO1YxZB89Pe4eCZlICh48txoyhg7HWGP5CtbyPYTjwFni6xhTe1U1+8iFMjLWV6bK7HqHIA9CB4FcbznfxO4ECVIoFkCLqjbv20CQmGLy0l+nKf+Ki5haNMmvJVd5GcpY8Cu80hu8rA94/G9zvWJvb0PXsVPVV1pDK8m2BIAJnXEy1XizpqOy7HhlHjfGlY4ZPtW4cAH+hlDJl/xNxwyPeuIhwWcX+kJiSLxPObwQr7BXr0OHBUpnQ/97YWT9gxpEmCz4LOkC5t4t+W+W4yp6/izfWzke04WXzFlDPDB6pslxWnvbIO9ER+v+Z1J9i7cl7+PFOnKwMHA3z1WW2GayUkjrxMY/IZlXj8vdIaoEomCZj+NZPEVk8egxaffv5ClHneNf/UAw9cW7HHxO9m+IF6zSDy4NYnRvUmmy5A7+aTFn+H3yQj40pKYXBgBuRpiH1voND22oIwLHfw4X7y2tQ3o9tKsn1m8UMiww4XNfV5HRRrYq0QzPiKMU6B8QfSJYGOWdGSJXeFJnv+ABvYRUjzNN3NiPpl4FcT9wWs2wCDTFih7eZcJR7sRRSIAAZXgi/Tyw5qqLt6jLbadfCt0Pv3EMp7hmTjbA6uS5Gguo3sX6ciuBONTfkkofpyQoSO8ZC1O2SGXsgOPdzmeR37n3uj/B5ibnO2P31eDAAAAAElFTkSuQmCC'
};
const legendLabelMap = {
  BOLL: {
    data: [{ name: "BOLL" }, { name: "MID" }, { name: "UP" }, { name: "LOW" }],
  },
  KDJ: {
    data: [{ name: "KDJ" }, { name: "K" }, { name: "D" }, { name: "J" }],
  },
  TRIX: {
    data: [{ name: "_trix" }, { name: "TRIX" }, { name: "TRMA" }],
  },
  OBV: {
    data: [{ name: "OBV", iconType: 'icon_Line' }],
  },
  Shrinkage: {
    top: [{ name: "MA5"}, { name: "MA10" }],
    mid: [{ name: "Shrinkage", iconType: "icon_Bar" }, { name: "turnover" }],
  },
  VOL: {
    top: [{ name: "MA24" }, { name: "MA72" }, { name: "MA200" }],
    mid: [
      { name: "VOL", iconType: "icon_Bar" },
      { name: "MA5" },
      { name: "MA60" },
    ],
  },
  ContinuousRising: {
    data: [{ name: "ContinuousRising", iconType: "icon_Bar" }],
  },
  BearishHarami: {
    data: [{ name: 'MA5' }],
  },
  YiYang: {
    data: [{ name: 'MA5' }, { name: 'MA10' }, { name: 'MA20' }, { name: 'MA30' }]
  }
};
const legendLabelRichMap = {
  icon_Bar: {
    textWidth: 30,
    textHeight: 30,
    textBackgroundColor: {
      image: "../assets/legend-bar.png",
    },
  },
  icon_Line: {
    textWidth: 30,
    textHeight: 30,
    textBackgroundColor: {
      image: "../assets/yellow-icon_line.png",
    },
  },
  BOLL: { fill: "rgba(0, 0, 0, 0.6)" },
  MID: { fill: "#36f" },
  UP: { fill: "#ff2436" },
  LOW: { fill: "#07ab4b" },
  KDJ: { fill: "rgba(0, 0, 0, 0.6)" },
  K: { fill: "#ff9500" },
  D: { fill: "#ff2436" },
  J: { fill: "#0f0f0f" },
  _trix: { fill: "rgba(0, 0, 0, 0.6)" },
  TRIX: { fill: "#ff9500" },
  TRMA: { fill: "#FF2436" },
  OBV: { fill: "#ff9500" },
  turnover: { fill: "rgba(0, 0, 0, 0.6)" },
  Shrinkage: { fill: "rgba(0, 0, 0, 0.6)" },
  VOL: { fill: "rgba(0, 0, 0, 0.6)" },
  MA5: { fill: "rgba(0, 0, 0, 0.6)" },
  MA10: { fill: '#36f' },
  MA20: { fill: '#ff9500' },
  MA30: { fill: '#ff2436' },
  MA60: { fill: "#ff9500" },
  MA24: { fill: "rgba(0, 0, 0, 0.6)" },
  MA72: { fill: "#ff2436" },
  MA200: { fill: "rgba(51, 102, 255, 0.84)" },
  ContinuousRising: { fill: "rgba(0, 0, 0, 0.6)" },
};

//util
const numberFormat = (value) => {
  const TEN_THOUSAND = 10000;
  let val, unit, tmp;
  const size = ['', '万', '亿', '万亿'];
  if (value < TEN_THOUSAND) {
    val = value.toFixed(2);
    unit = '';
  } else {
    tmp = Math.floor(Math.log(value) / Math.log(TEN_THOUSAND));
    val = (value / Math.pow(TEN_THOUSAND, tmp)).toFixed(2);
    unit = size[tmp];
  }
  return '' + val + unit;
}
//---------------------------------
const getData = (data) => {
  return [{ originData: data }];
};
const getTextStyle = (scale) => {
  return {
    fontSize: 12 * scale,
    fontFamily: "THSJinRongTi-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
  };
};

const getGrid = (index, scale, isSingleGrid) => {
  const isMainGrid = index === 0;
  const originHeight = isMainGrid ? 160 : 64;
  // const originWidth = 323;
  const originLeft = 10;
  const OriginRight = 10;
  const top = isSingleGrid ? 24 * scale : undefined;
  const bottom = isSingleGrid ? undefined : isMainGrid ? "38%" : "5%";
  return {
    left: originLeft * scale,
    top,
    right: OriginRight * scale,
    bottom,
    height: originHeight * scale,
    background: {
      show: false,
      borderEnable: 1,
      style: {
        fill: index === 0 ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.3)",
      },
    },
  };
};

const getXAxis = (gridIndex, scale) => {
  const isMultGrid = !!(
    gridIndex &&
    Array.isArray(gridIndex) &&
    gridIndex.length > 1
  );
  const axisLabelFormatter = (label, index, len) => {
    return `${label.slice(4, 6)}-${label.slice(6, 8)}`;
  };
  const axisTickValues = (labelArr) => {
    const lastIndex = labelArr.length - 1;
    const percent = [0, 0.25, 0.5, 0.75, 1];
    return percent.map((per) => {
      return labelArr[Math.floor(lastIndex * per)];
    });
  };
  return {
    xOrY: "x",
    position: "bottom",
    type: "band",
    $dataIndex: 0,
    filterHide: false,
    $gridIndex: gridIndex,
    dataKey: "t",
    // paddingInner: 0.1 * scale,
    // paddingOuter: 0.1 * scale,
    splitLine: { show: false },
    tickValues: axisTickValues,
    label: {
      show: true,
      inRange: true,
      fontFamily: 'THSJinRongTi-Medium',
      formatter: axisLabelFormatter,
      style: { textFill: "rgba(0,0,0,0.6)", fontWeight: 'normal' },
    },
    line: { show: false },
    tick: { show: false },
    interval: isMultGrid ? 100 : 8,
  };
};

const getYAxis = (gridIndex, scale) => {
  const isMainYAxis = !!(gridIndex === 0);
  const tickValues = (domain) => {
    const intervals = isMainYAxis ? [0, 0.25, 0.5, 0.75, 1] : [0, 0.5, 1];
    const extent = Math.abs(domain[0] - domain[1]);
    const start = Math.min(domain[0], domain[1]);
    return intervals.map((interval) => start + interval * extent);
  };
  const labelFormatter = (originVal, index, len) => {
    const value = numberFormat(originVal);
    if (index !== 0 && index !== len - 1) return `{middle|${value}}`;
    if (!isMainYAxis) return "";
    return value;
  };
  return {
    position: "left",
    type: "linear",
    xOrY: "y",
    $gridIndex: gridIndex,
    tickValues,
    splitLine: {
      show: true,
      style: { color: "rgba(0,0,0,0.06)", lineWidth: 1 * scale },
    },
    label: {
      inside: true,
      inRange: true,
      fontFamily: 'THSJinRongTi-Medium',
      formatter: labelFormatter,
      style: {
        textFill: "rgba(0,0,0,0.6)",
        fontWeight: 'normal',
        rich: {
          middle: { textPadding: [12 * scale, 0, 0, 0] },
        },
      },
    },
    line: { show: false },
    tick: { show: false },
    z: 9,
  };
};

const getKLineSeries = (scale, axisIndex, name) => {
  return {
    type: "hqbar",
    name: name,
    hqbarType: "kline",
    compressThreshold: 60,
    $dataIndex: 0,
    $axisIndex: axisIndex || [0, 1],
    hq: {
      up: { fill: "transparent", lineWidth: 1 * scale },
      down: { lineWidth: 1 * scale },
      eq: { lineWidth: 1 * scale },
    },
  };
};
const getLineSeries = (name, dataKey, axisIndex, color, scale) => {
  return {
    name: name,
    type: "line",
    aliasType: "hqline",
    dataKey: dataKey,
    $dataIndex: 0,
    $axisIndex: axisIndex,
    line: {
      show: true,
      style: { normal: { stroke: color, lineWidth: 1 * scale } },
    },
  };
};
const getBarSeries = (
  name,
  dataKey,
  axisIndex,
  upBarColor,
  downBarColor,
  visibleBar
) => {
  const itemStyleFun = (data) => {
    if (!visibleBar) {
      return { fill: "transparent" };
    }
    // TODO: 后续删除条件中的常量
    if (data[1] - 867651125 > 0) {
      return { fill: upBarColor };
    } else {
      return { fill: downBarColor };
    }
  };
  return {
    name: name,
    type: "bar",
    $dataIndex: 0,
    selected: visibleBar,
    $axisIndex: axisIndex,
    dataKey: dataKey,
    itemStyle: {
      normal: itemStyleFun,
    },
  };
};
const getLegend = (data, scale, isSingleGrid, itemMargin) => {
  const legendFormatter = (label, params) => {
    let res;
    if (params.iconType) {
      res = `{${params.iconType}|}{${label}|${label}}`;
    } else {
      res = `{${label}|${label}}`;
    }
    return res;
  };
  return {
    show: true,
    top: isSingleGrid ? 8 * scale : "67%",
    padding: [0, 15, 0, 15],
    left: 10 * scale,
    addLine: false,
    horizontalGap: (itemMargin || 10) * scale,
    symbol: {
      type: 'none',
    },
    // innerGap: 10 * scale,
    // symbol: { type: "none", size: [10 * scale, 10 * scale] },
    formatter: legendFormatter,
    textStyle: {
      fontSize: 12 * scale,
      fontFamily: "THSJinRongTi-Medium",
      rich: legendLabelRichMap,
    },
    data: data,
  };
};
const getAxisPointer = (orient, axisIndex, gap, scale) => {
  const isVertical = orient === "vertical";
  const axisPointerFormatter = (value) => {
    return isVertical
      ? `${value.slice(4, 6)}-${value.slice(6, 8)}`
      : value.toFixed(2);
  };
  return {
    $axisIndex: axisIndex,
    line: {
      style: {
        stroke: "#858585",
        lineWidth: 1 * scale,
      },
    },
    label: {
      gap: gap,
      inside: true,
      inRange: true,
      formatter: axisPointerFormatter,
      style: {
        fill: "#fff",
        textPadding: [3, 4],
        textLineHeight: 12 * scale,
        textBorderRadius: 4,
        textBackgroundColor: "#3366ff",
      },
    },
  };
};
const getMarkArea = (
  axisIndex,
  seriesIndex,
  [start, end],
  isContainShape,
  scale
) => {
  const startXFormatter = (x, bandWidth) => {
    const lineWidth = 1 * scale;
    return x - bandWidth - lineWidth;
  };
  const endXFormatter = (x, bandWidth) => {
    const lineWidth = 1 * scale;
    return x + bandWidth + lineWidth;
  };
  return {
    $axisIndex: axisIndex,
    $seriesIndex: seriesIndex,
    xIndex: start,
    areaStyle: {
      normal: {
        fill: "transparent",
        stroke: "#36f",
        lineDash: [20, 10],
        lineWidth: 1 * scale,
      },
    },
    data: [
      {
        points: [
          {
            xIndex: start,
            y: "top",
            xFormatter: isContainShape ? startXFormatter : undefined,
          },
          {
            xIndex: end,
            y: "bottom",
            xFormatter: isContainShape ? endXFormatter : undefined,
          },
        ],
      },
    ],
  };
};
// 时间水印
const getWaterMarkSeries = (axisIndex, scale) => {
  const renderWaterMark = function(model, globalModel, global) {
    const yAxisIndex = axisIndex[1];
    const xAxisIndex = axisIndex[0];
    const axisModel = globalModel.getComponent("axis");
    const yAxisModel = axisModel[yAxisIndex];
    const xAxisModel = axisModel[xAxisIndex];
    const gridModel = yAxisModel.dependentModels.grid;
    const gridPosition = gridModel.position;
    model.domain = xAxisModel.domain;
    const waterMarkAttr = {
      shape: {
        x: gridPosition.left,
        y: gridPosition.top,
        width: gridPosition.width,
        height: gridPosition.height
      },
      style: {
        fill: 'transparent',
        fontFamily: 'THSJinRongTi-Medium',
        textFill: 'rgba(0,0,0,0.08)',
        text: '',
        fontSize: 68 * scale,
        lineHeight: 80 * scale
      },
      z: 0
    };
    this.setShapeGroup('waterMark', D3Charts.graphic.Rect, [waterMarkAttr]);
  } 
  return {
    type: 'custom',
    name: 'waterMark',
    id: 'waterMark',
    $axisIndex: axisIndex,
    domain: [],
    view: {
      render: renderWaterMark
    }
  }
}
// 右下角公司水印
const getMarkSeries = (axisIndex, scale) => {
  const renderWaterMark = function(model, globalModel, global) {
    const markWidth = 36 * scale;
    const markHeight = 10 * scale;
    // 不与底部分割线重合
    const bottomMargin = 1 * scale;
    const yAxisIndex = axisIndex[1];
    const xAxisIndex = axisIndex[0];
    const axisModel = globalModel.getComponent("axis");
    const yAxisModel = axisModel[yAxisIndex];
    const xAxisModel = axisModel[xAxisIndex];
    const gridModel = yAxisModel.dependentModels.grid;
    const gridPosition = gridModel.position;
    model.domain = xAxisModel.domain;
    const waterMarkAttr = {
      style: {
        x: gridPosition.right - markWidth,
        y: gridPosition.bottom - markHeight - bottomMargin,
        width: markWidth,
        height: markHeight,
        image: waterMarkImages['light']
      },
      z: 0
    };
    this.setShapeGroup('mark', D3Charts.graphic.Image, [waterMarkAttr]);
  } 
  return {
    type: 'custom',
    name: 'waterMark',
    id: 'waterMark',
    $axisIndex: axisIndex,
    domain: [],
    view: {
      render: renderWaterMark
    }
  }
}
//---------------------------------

// 自定义系列
//******************************** */
const getFlagSeries = (name, axisIndex, xIndex, content, scale) => {
  const calcTextWidth = (textAttr) => {
    return new D3Charts.graphic.Text(textAttr);
  };
  const makeLineHeight = (content) => {
    const res = content.replace('\n', '\n{margin|}\n');
    return res
  };
  const renderFlag = function (model, globalModel, global) {
    const xIndex = model.get("xIndex");
    const yAxisIndex = axisIndex[1];
    const axisModel = globalModel.getComponent("axis");
    const xScale = axisModel[0].scale;
    // 旗子距离虚线框第一个数据的边距
    const xSpace = 10 * scale;
    const YScale = axisModel[yAxisIndex].scale;
    const extent = axisModel[yAxisIndex].domain;
    let flagAttr = [];
    const attr = {
      shape: {
        x: xScale(axisModel[0].domain[xIndex]),
        y: YScale(extent[1]),
      },
      style: {
        fontSize: 12 * scale,
        textPadding: 5 * scale,
        textVerticalAlign: 'top',
        textBorderRadius: 2 * scale,
        // lineHeight: 25 * scale,
        textAlign: "left",
        fontFamily: 'THSJinRongTi-Medium',
        textBackgroundColor: "rgba(51, 102, 255, 0.84)",
        textFill: "#fff",
        text: makeLineHeight(content),
        rich: {
          margin: {
            textHeight: 4 * scale
          }
        }
      },
    };
    const text = calcTextWidth(attr);
    attr.style.textOffset = [-text.getBoundingRect().width - xSpace, 0];
    flagAttr.push(attr);
    this.setShapeGroup("flag", D3Charts.graphic.Rect, flagAttr);
  };
  return {
    type: "custom",
    name: name,
    $dataIndex: 0,
    $axisIndex: axisIndex,
    xIndex: xIndex,
    z: 999,
    view: {
      render: renderFlag,
    },
  };
};
//******************************** */
class OptionManager {
  /**
   *
   * @param {*} scale 页面缩放比例
   * @param {*} chartName 图表名称 九个图名字之一
   * @param {*} data 原始数据
   * @param {*} flagContent 旗子的内容
   */
  constructor(scale, chartName, data, flagContent) {
    this.option = null;
    this.scale = scale;
    this.chartName = chartName;
    this.data = data;
    this.flagContent = flagContent;
  }

  getOption() {
    switch (this.chartName) {
      case "BOLL":
        this.option = this.getBOLLChartOption();
        break;
      case "KDJ":
        this.option = this.getKDJChartOption();
        break;
      case "TRIX":
        this.option = this.getTRIXChartOption();
        break;
      case "OBV":
        this.option = this.getOBVChartOption();
        break;
      case "Shrinkage":
        this.option = this.getShrinkageIncreaseChartOption();
        break;
      case "VOL":
        this.option = this.getVOLChartOption();
        break;
      case "ContinuousRising":
        this.option = this.getContinuousRisingChartOption();
        break;
      case "BearishHarami":
        this.option = this.getBearishHaramiChartOption();
        break;
      case "YiYang":
        this.option = this.getYiYangChartOption();
        break;
      default:
        console.log("invalid chart name");
        break;
    }
    return this.option;
  }

  getBOLLChartOption() {
    // 这里是BOLL图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: getLegend(legendLabelMap["BOLL"].data, scale),
      series: [
        getKLineSeries(scale),
        // up线
        getLineSeries("UP", "line1", [0, 2], "#ff2436", scale),
        // mid线
        getLineSeries("MID", "line2", [0, 2], "#3366ff", scale),
        // low线
        getLineSeries("LOW", "line3", [0, 2], "#07ab4b", scale),
        // 下方的柱子
        // getBarSeries("BOLL", "o", [0, 2], "#ff2436", "#07ab4b"),
        getKLineSeries(scale, [0, 2], 'BOLL'),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
        getMarkArea([0, 2], 1, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getKDJChartOption() {
    // 这里是KDJ图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const visibleBar = false;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: getLegend(legendLabelMap["KDJ"].data, scale),
      series: [
        getKLineSeries(scale),
        // up线
        getLineSeries("K", "line1", [0, 2], "#ff9500", scale),
        // mid线
        getLineSeries("D", "line2", [0, 2], "#ff2436", scale),
        // low线
        getLineSeries("J", "line3", [0, 2], "#0f0f0f", scale),
        // 下方的柱子
        getBarSeries("KDJ", "line4", [0, 2], "#ff2436", "#07ab4b", visibleBar),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 3,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 3, dataLen - 1], true, scale),
        getMarkArea([0, 2], 1, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getTRIXChartOption() {
    // 这里是TRIX图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const visible = false;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: getLegend(legendLabelMap["TRIX"].data, scale),
      series: [
        getKLineSeries(scale),
        // up线
        getLineSeries("TRIX", "line1", [0, 2], "#ff9500", scale),
        // mid线
        getLineSeries("TRMA", "line2", [0, 2], "#ff2436", scale),
        // low线
        // getLineSeries("J", "line3", [0, 2], "#0f0f0f", scale),
        // 下方的柱子
        getBarSeries("_trix", "o", [0, 2], "#ff2436", "#07ab4b", visible),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
        getMarkArea([0, 2], 1, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getOBVChartOption() {
    // 这里是OBV图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    // 柱子是否可见
    const visible = false;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: getLegend(legendLabelMap["OBV"].data, scale, false),
      series: [
        getKLineSeries(scale),
        // up线
        getLineSeries("OBV", "line1", [0, 2], "#ff9500", scale),
        // mid线
        // getLineSeries("TRMA", "line2", [0, 2], "#ff2436", scale),
        // low线
        // getLineSeries("J", "line3", [0, 2], "#0f0f0f", scale),
        // 下方的柱子
        getBarSeries(
          "unknownName",
          "o",
          [0, 2],
          "#ff2436",
          "#07ab4b",
          visible
        ),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
        getMarkArea([0, 2], 1, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getShrinkageIncreaseChartOption() {
    // 这里是缩量上涨图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const visible = true;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale, true), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      //getLegend(legendLabelMap["Shrinkage"].top, scale),
      legend: [getLegend(legendLabelMap["Shrinkage"].top, scale, true), getLegend(legendLabelMap["Shrinkage"].mid, scale, false)],
      series: [
        getKLineSeries(scale),
        // MA5线
        getLineSeries("MA5", "line1", [0, 1], "#ff2436", scale),
        // MA10线
        getLineSeries("MA10", "line2", [0, 1], "#000", scale),
        // 换手率
        getLineSeries("turnover", "line3", [0, 2], "transparent", scale),
        // 下方的柱子
        getBarSeries(
          "Shrinkage",
          "o",
          [0, 2],
          "#ff2436",
          "#07ab4b",
          visible
        ),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
        getMarkArea([0, 2], 3, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getVOLChartOption() {
    // 这里是VOL图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const visible = false;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale, true), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: [getLegend(legendLabelMap["VOL"].top, scale, true), getLegend(legendLabelMap["VOL"].mid, scale)],
      series: [
        getKLineSeries(scale),
        // MA24
        getLineSeries("MA24", "line1", [0, 1], "rgba(0, 0, 0, 0.6)", scale),
        // MA72线
        getLineSeries("MA72", "line2", [0, 1], "#ff2436", scale),
        // MA200线
        getLineSeries("MA200", "line3", [0, 1], "#36f", scale),
        // MA5线
        getLineSeries("MA5", "line3", [0, 2], "#000", scale),
        // MA60线
        getLineSeries("MA60", "line4", [0, 2], "#ff9500", scale),
        // 下方的柱子
        getBarSeries("VOL", "o", [0, 2], "#ff2436", "#07ab4b", visible),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
        getMarkArea([0, 2], 6, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getContinuousRisingChartOption() {
    // 这里是ContinuousRising图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const visible = true;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: getLegend(legendLabelMap["ContinuousRising"].data, scale),
      series: [
        getKLineSeries(scale),
        // 下方的柱子
        getBarSeries(
          "ContinuousRising",
          "o",
          [0, 2],
          "#ff2436",
          "#07ab4b",
          visible
        ),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getFlagSeries(
          "barFlag",
          [0, 2],
          dataLen - 1,
          flagContent[1].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
        getMarkArea([0, 2], 1, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }

  getBearishHaramiChartOption() {
    // 这里是BearishHarami图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const isSingleGrid = true;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale, isSingleGrid)],
      axis: [getXAxis([0], scale), getYAxis(0, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1], -4, scale),
      ],
      legend: getLegend(legendLabelMap["BearishHarami"].data, scale, isSingleGrid),
      series: [
        getKLineSeries(scale),
        // MA5线
        getLineSeries("MA5", "line3", [0, 1], "#000", scale),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 2,
          flagContent[0].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 2, dataLen - 1], true, scale),
      ],
    };
  }

  getYiYangChartOption() {
    // 这里是BearishHarami图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace("what");
    }
    const dataLen = this.data.length;
    const isSingleGrid = true;
    return {
      scale: scale,
      animation: false,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale, isSingleGrid)],
      axis: [getXAxis([0], scale), getYAxis(0, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1], -4, scale),
      ],
      legend: getLegend(legendLabelMap["YiYang"].data, scale, isSingleGrid),
      series: [
        getKLineSeries(scale),
        // MA5线
        getLineSeries("MA5", "line3", [0, 1], "rgba(0, 0, 0, 0.6)", scale),
        getLineSeries("MA10", "line1", [0, 1], "#36f", scale),
        getLineSeries("MA20", "line2", [0, 1], "#ff9500", scale),
        getLineSeries("MA30", "line4", [0, 1], "#ff2436", scale),
        getFlagSeries(
          "klineFlag",
          [0, 1],
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale),
        getMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }
}
