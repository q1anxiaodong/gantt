const getOption = (kData) => {
  return {
    scale: 0.3,
    textStyle: {
      fontSize: 12,
      fontFamily: "sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
    },
    axis: [
      {
        xOrY: "x",
        $dataIndex: 0,
        $gridIndex: [1, 0],
        dataKey: "t",
        paddingOuter: "0.12",
        splitLine: {
          show: false,
        },
        label: {
          show: true,
          style: {
            fill: "rgba(255,255,255,0.6)",
          },
        },
        line: {
          show: false,
        },
        tick: {
          show: false,
        },
        interval: 38,
      },
      {
        position: "left",
        type: "linear",
        xOrY: "y",
        $gridIndex: 0,
        splitLine: {
          show: true,
          style: {
            color: "rgba(255,255,255,0.06)",
            lineWidth: 1,
          },
        },
        label: {
          padding: -28,
          inRange: true,
          style: {
            fill: "rgba(255,255,255,0.6)",
          },
        },
        line: {
          show: false,
        },
        tick: {
          show: false,
        },
        z: 9,
      },
      {
        position: "left",
        type: "linear",
        $gridIndex: 1,
        xOrY: "y",
        splitLine: {
          show: true,
          style: {
            color: "rgba(255,255,255,0.06)",
            lineWidth: 1,
          },
        },
        label: {
          padding: -28,
          inRange: true,
          style: {
            fill: "rgba(255,255,255,0.6)",
          },
        },
        line: {
          show: false,
        },
        tick: {
          show: false,
        },
        z: 9,
      },
    ],
    legend: {
      show: true,
      top: "61%",
      left: 0,
      addLine: false,
      align: "left",
      horizontalGap: 0,
      innerGap: 5,
      symbol: {
        type: "none",
        size: 10,
      },
      textStyle: {
        rich: {
          label: {
            fill: "rgba(255,255,255,0.6)",
            textVerticalAlign: "middle",
            fontSize: 12,
          },
          icon1: {
            fontSize: 12,
            textBackgroundColor: {
              image: "//i.thsi.cn/sns/portfolio-zixun/macdtl.png",
            },
          },
          icon2: {
            fontSize: 12,
            textBackgroundColor: {
              image: "//i.thsi.cn/sns/portfolio-zixun/htl.png",
            },
          },
          icon3: {
            fontSize: 12,
            textBackgroundColor: {
              image: "//i.thsi.cn/sns/portfolio-zixun/ctl.png",
            },
          },
        },
      },
      data: ["MACD", "MACD:0.37", "DEA:0.37"],
    },
    grid: [
      {
        left: 14,
        top: 0,
        right: 14,
        bottom: "43%",
      },
      {
        left: 14,
        top: "67%",
        right: 14,
        bottom: 30,
      },
    ],
    axisPointer: [
      {
        $axisIndex: [2, 1],
        line: {
          style: {
            stroke: "#858585",
            lineWidth: 1,
          },
        },
        label: {
          gap: -4,
          inside: true,
          inRange: true,
          style: {
            fill: "#fff",
            textPadding: [3, 4],
            textBorderRadius: 4,
            textBackgroundColor: "#36f",
          },
        },
      },
      {
        $axisIndex: 0,
        line: {
          style: {
            stroke: "#858585",
            lineWidth: 1,
          },
        },
        label: {
          gap: -24,
          inside: true,
          inRange: true,
          style: {
            fill: "#fff",
            textPadding: [3, 4],
            textBorderRadius: 4,
            textBackgroundColor: "#36f",
          },
        },
      },
    ],
    series: [
      {
        type: "hqbar",
        scale: 0.3,
        hqbarType: "kline",
        compressThreshold: 60,
        $axisIndex: [0, 1],
        $dataIndex: 0,
        hq: {
          up: {
            fill: "transparent",
            lineWidth: 3,
          },
          down: {
            lineWidth: 3,
          },
          eq: {
            lineWidth: 3,
          },
        },
      },
      {
        name: "MACD",
        type: "bar",
        scale: 0.3,
        compressThreshold: 60,
        $axisIndex: [0, 2],
        $dataIndex: 0,
        dataKey: "maCd",
        itemStyle: {},
      },
      {
        name: "MACD:0.37",
        type: "line",
        aliasType: "hqline",
        $dataIndex: 0,
        dataKey: "diff",
        $axisIndex: [0, 2],
        line: {
          show: true,
          style: {
            normal: {
              stroke: "#858585",
              lineWidth: 1,
            },
          },
        },
      },
      {
        name: "DEA:0.37",
        type: "line",
        aliasType: "hqline",
        $dataIndex: 0,
        dataKey: "dea",
        $axisIndex: [0, 2],
        line: {
          show: true,
          style: {
            normal: {
              stroke: "#ff9500",
              lineWidth: 1,
            },
          },
        },
      },
      {
        type: "custom",
        $dataIndex: 0,
        $axisIndex: [0, 1],
        z: 5,
        model: {
          signalIndex: "38",
        },
        view: {},
      },
      {
        type: "custom",
        $dataIndex: 0,
        $axisIndex: [0, 1],
        z: 5,
        model: {
          signalIndex: "38",
        },
        view: {},
      },
      {
        type: "custom",
        $dataIndex: 0,
        $axisIndex: [0, 2],
        z: 5,
        model: {
          signalIndex: "38",
        },
        view: {},
      },
      {
        type: "custom",
        $dataIndex: 0,
        $axisIndex: [0, 2],
        z: 5,
        model: {
          signalIndex: "38",
        },
        view: {},
      },
    ],
    data: [
      {
        originData: kData,
      },
    ],
  };
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
    data: [{ name: "Shrinkage", iconType: "icon_Bar" }, { name: "turnover" }],
  },
  VOL: {
    data: [
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
  ContinuousRising: { fill: "rgba(0, 0, 0, 0.6)" },
};
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
    $gridIndex: gridIndex,
    dataKey: "t",
    // paddingInner: 0.1 * scale,
    // paddingOuter: 0.1 * scale,
    splitLine: { show: false },
    tickValues: axisTickValues,
    label: {
      show: true,
      inRange: true,
      formatter: axisLabelFormatter,
      style: { fill: "rgba(0,0,0,0.6)" },
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
    const value = originVal.toFixed(2);
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
      formatter: labelFormatter,
      style: {
        fill: "rgba(0,0,0,0.6)",
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
  invisibleBar
) => {
  const itemStyleFun = (data) => {
    if (invisibleBar) {
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
    $axisIndex: axisIndex,
    dataKey: dataKey,
    itemStyle: {
      normal: itemStyleFun,
    },
  };
};
const getLegend = (data, scale, isSingleGrid, itemMargin) => {
  const richStyle = JSON.parse(JSON.stringify(legendLabelRichMap));
  // const hasIcon = data.forEach()
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
    top: isSingleGrid ? 8 * scale : "65%",
    padding: [0, 15, 0, 15],
    left: 5 * scale,
    addLine: false,
    horizontalGap: (itemMargin || 45) * scale,
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
//---------------------------------

// 自定义系列
//******************************** */
const getFlagSeries = (name, axisIndex, xIndex, content, scale) => {
  const calcTextWidth = (textAttr) => {
    return new D3Charts.graphic.Text(textAttr);
  };
  const makeLineHeight = (content) => {
    const res = content.replace('\n', '\n{margin|}\n');
    console.log('res', res);
    return res
  };
  const renderFlag = function (model, globalModel, global) {
    const xIndex = model.get("xIndex");
    const yAxisIndex = axisIndex[1];
    const axisModel = globalModel.getComponent("axis");
    const xScale = axisModel[0].scale;
    const YScale = axisModel[yAxisIndex].scale;
    const extent = axisModel[yAxisIndex].domain;
    const offsetY = yAxisIndex === 1 ? 18 : 12;
    let flagAttr = [];
    const attr = {
      shape: {
        x: xScale(axisModel[0].domain[xIndex]),
        y: YScale(extent[1]) + offsetY * scale,
      },
      style: {
        fontSize: 12 * scale,
        textPadding: 5 * scale,
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
    attr.style.textOffset = [-text.getBoundingRect().width - 20, 0];
    flagAttr.push(attr);
    this.setShapeGroup("flag", D3Charts.graphic.Rect, flagAttr);
  };
  return {
    type: "custom",
    name: name,
    $dataIndex: 0,
    $axisIndex: axisIndex,
    xIndex: xIndex,
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
        getWaterMarkSeries([0, 1], scale)
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
    const invisibleBar = true;
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
        getBarSeries("KDJ", "o", [0, 2], "#ff2436", "#07ab4b", invisibleBar),
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
        getWaterMarkSeries([0, 1], scale)
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
    const invisibleBar = true;
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
        getBarSeries("_trix", "o", [0, 2], "#ff2436", "#07ab4b", invisibleBar),
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
        getWaterMarkSeries([0, 1], scale)
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
    const invisibleBar = true;
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
      legend: getLegend(legendLabelMap["OBV"].data, scale),
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
          invisibleBar
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
        getWaterMarkSeries([0, 1], scale)
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
    const invisibleBar = false;
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
      legend: getLegend(legendLabelMap["Shrinkage"].data, scale),
      series: [
        getKLineSeries(scale),
        // up线
        getLineSeries("turnover", "line1", [0, 1], "#ff2436", scale),
        // mid线
        getLineSeries("TRMA", "line2", [0, 1], "#000", scale),
        // low线
        // getLineSeries("J", "line3", [0, 2], "#0f0f0f", scale),
        // 下方的柱子
        getBarSeries(
          "Shrinkage",
          "o",
          [0, 2],
          "#ff2436",
          "#07ab4b",
          invisibleBar
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
        getWaterMarkSeries([0, 1], scale)
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
    const invisibleBar = false;
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
      legend: getLegend(legendLabelMap["VOL"].data, scale),
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
        getBarSeries("VOL", "o", [0, 2], "#ff2436", "#07ab4b", invisibleBar),
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
        getWaterMarkSeries([0, 1], scale)
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
    const invisibleBar = false;
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
          invisibleBar
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
        getWaterMarkSeries([0, 1], scale)
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
          dataLen - 1,
          flagContent[0].label,
          scale
        ),
        getWaterMarkSeries([0, 1], scale)
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
    const itemMargin = 60;
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
      legend: getLegend(legendLabelMap["YiYang"].data, scale, isSingleGrid, itemMargin),
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
        getWaterMarkSeries([0, 1], scale)
      ],
      markArea: [
        getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale),
      ],
    };
  }
}
