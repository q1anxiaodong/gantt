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
  bulin: {
    data: [{ name: "BOLL" }, { name: "MID" }, { name: "UP" }, { name: "LOW" }],
  },
};
const legendLabelRichMap = {
  BOLL: { fill: "rgba(0, 0, 0, 0.6)" },
  MID: { fill: "#36f" },
  UP: { fill: "#ff2436" },
  LOW: { fill: "#07ab4b" },
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

const getGrid = (index, scale) => {
  const isMainGrid = index === 0;
  const originHeight = isMainGrid ? 160 : 64;
  // const originWidth = 323;
  const originLeft = 10;
  const OriginRight = 10;
  // const top = isMainGrid ? 0 : "67%";
  const bottom = isMainGrid ? "38%" : "5%";
  return {
    left: originLeft * scale,
    // top,
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

const getKLineSeries = (scale) => {
  return {
    type: "hqbar",
    hqbarType: "kline",
    compressThreshold: 60,
    $dataIndex: 0,
    $axisIndex: [0, 1],
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
const getBarSeries = (name, dataKey, axisIndex, upBarColor, downBarColor) => {
  const itemStyleFun = (data) => {
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
const getLegend = (data, scale) => {
  const legendFormatter = (label, params) => {
    return `{${label}|${label}}`;
  };
  return {
    show: true,
    top: "65%",
    left: 10 * scale,
    addLine: false,
    horizontalGap: 40 * scale,
    // innerGap: 10 * scale,
    symbol: { type: 'none', size: 10 * scale },
    formatter: legendFormatter,
    textStyle: {
      fontSize: 12 * scale,
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
const getMarkArea = (axisIndex, seriesIndex, [start, end], isContainShape, scale) => {
  const startXFormatter = (x, bandWidth) => {
    const lineWidth = 1 * scale;
    return x - bandWidth - lineWidth;
  };
  const endXFormatter = (x, bandWidth) => {
    const lineWidth = 1 * scale;
    return x + bandWidth + lineWidth;
    ;
  }
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
          { xIndex: start, y: "top", xFormatter: isContainShape ? startXFormatter : undefined },
          { xIndex: end, y: "bottom", xFormatter: isContainShape ? endXFormatter : undefined },
        ],
      },
    ],
  };
};
//---------------------------------

// 自定义系列
//******************************** */
const getFlagSeries = (name, axisIndex, xIndex, content, scale) => {
  const renderFlag = function (model, globalModel, global) {
    const xIndex = model.get("xIndex");
    const yAxisIndex = axisIndex[1];
    const axisModel = globalModel.getComponent('axis');
    const xScale = axisModel[0].scale;
    const YScale = axisModel[yAxisIndex].scale;
    const extent = axisModel[yAxisIndex].domain
    let flagAttr = [];
    flagAttr.push({
      shape: {
        x: xScale(axisModel[0].domain[xIndex]),
        y: YScale(extent[1]) + 12 * scale,
      },
      style: {
        fontSize: 12 * scale,
        textPadding: 5 * scale,
        textBorderRadius: 2 * scale,
        textOffset: [-20, 0],
        textAlign: 'right',
        textBackgroundColor: '#36f',
        textFill: '#fff',
        text: content
      }
    });
    this.setShapeGroup('flag', D3Charts.graphic.Rect, flagAttr);
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
  constructor(scale, chartName, data, flagContent) {
    this.option = null;
    this.scale = scale;
    this.chartName = chartName;
    this.data = data;
    this.flagContent = flagContent;
  }

  getOption() {
    switch (this.chartName) {
      case "bulin":
        this.option = this.getBulinChartOption();
        break;
      case "KDJ":
        this.option = this.getKDJChartOption();
        break;
      default:
        console.log("invalid chart name");
        break;
    }
    return this.option;
  }

  getBulinChartOption() {
    // 这里是bulin图表的option逻辑
    const { scale, data, flagContent } = this;
    if (!data) {
      console.trace('what');
    }
    const dataLen = this.data.length;
    return {
      scale: scale,
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([1, 0], scale), getYAxis(0, scale), getYAxis(1, scale)],
      axisPointer: [
        getAxisPointer("vertical", 0, -48, scale),
        getAxisPointer("horizontal", [1, 2], -4, scale),
      ],
      legend: getLegend(legendLabelMap["bulin"].data, scale),
      series: [
        getKLineSeries(scale),
        // up线
        getLineSeries("UP", "line1", [0, 2], "#ff2436", scale),
        // mid线
        getLineSeries("MID", "line2", [0, 2], "#3366ff", scale),
        // low线
        getLineSeries("LOW", "line3", [0, 2], "#07ab4b", scale),
        // 下方的柱子
        getBarSeries("BOLL", "o", [0, 2], "#ff2436", "#07ab4b"),
        getFlagSeries("klineFlag", [0, 1], dataLen - 1, flagContent[0].label, scale),
        getFlagSeries("barFlag", [0, 2], dataLen - 1, flagContent[1].label, scale),
      ],
      markArea: [getMarkArea([0, 1], 0, [dataLen - 1, dataLen - 1], true, scale), getMarkArea([0, 2], 1, [dataLen - 1, dataLen - 1], true, scale)],
    };
  }

  getKDJChartOption() {
    // 这里是KDJ图表的option逻辑
    const { scale, data } = this;
    return {
      title: {
        text: "KDJ图表",
      },
      tooltip: {},
      xAxis: {},
      yAxis: {},
      series: [
        {
          name: "K值",
          data: [10, 20, 30, 40, 50],
          type: "line",
        },
        {
          name: "D值",
          data: [20, 30, 40, 50, 60],
          type: "line",
        },
        {
          name: "J值",
          data: [30, 40, 50, 60, 70],
          type: "line",
        },
      ],
    };
  }
}

// test
// const optionManager = new OptionManager(1.2, "bulin");
