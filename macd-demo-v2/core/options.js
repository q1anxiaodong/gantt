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

//---------------------------------
const getData = (data) => {
  return [{ originData: data }];
};
const getTextStyle = (scale) => {
  return {
    fontSize: 12 * scale,
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
  };
};

const getGrid = (index, scale) => {
  const isMainGrid = index === 0;
  const originHeight = isMainGrid ? 160 : 64;
  const originWidth = 323;
  const originLeft = 10;
  const OriginRight = 10;
  const top = isMainGrid ? 0 : "67%";
  const bottom = isMainGrid ? "38%" : '5%';
  return {
    left: originLeft * scale,
    // top,
    right: OriginRight * scale,
    bottom,
    height: originHeight * scale,
    background: { show: true, borderEnable: 1, style: {fill: index === 0 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)'}}
  };
};

const getXAxis = (gridIndex, scale) => {
  const isMultGrid = !!(
    gridIndex &&
    Array.isArray(gridIndex) &&
    gridIndex.length > 1
  );
  return {
    xOrY: "x",
    $dataIndex: 0,
    $gridIndex: gridIndex,
    dataKey: "t",
    paddingOuter: "0.12",
    splitLine: { show: false },
    label: {
      show: true,
      style: { fill: "rgba(255,255,255,0.6)" },
    },
    line: { show: false },
    tick: { show: false },
    interval: isMultGrid ? 38 : 8,
  };
};

const getYAxis = (gridIndex, scale) => {
  const isMainYAxis = !!(gridIndex === 0);
  const tickValues = (domain) => {
    const intervals = [0, 0.25, 0.5, 0.75, 1];
    const extent = Math.abs(domain[0] - domain[1]);
    const start = Math.min(domain[0], domain[1]);
    console.log('domain', domain);
    return intervals.map(interval => start + interval * extent);
  };
  const labelFormatter = (originVal, index, len) => {
    const value = originVal.toFixed(2);
    if (index !== 0 && index !== len - 1) return `{middle|${value}}`;
    return value;
  }
  return {
    position: "left",
    type: "linear",
    xOrY: "y",
    $gridIndex: gridIndex,
    tickValues,
    splitLine: {
      show: true,
      style: { color: "rgba(255,255,255,0.6)", lineWidth: 1 * scale },
    },
    label: {
      inside: true,
      inRange: true,
      formatter: labelFormatter,
      style: { 
        fill: "rgba(255,255,255,0.6)",
        rich: {
            middle: { textPadding: [12 * scale, 0, 0, 0] }
        }
      },
    },
    line: { show: false },
    tick: { show: false },
    z: 9,
  };
};

const getKLineSeries = (scale) => {
    return {
        type: 'hqbar',
        hqbarType: 'kline',
        compressThreshold: 60,
        $dataIndex: 0,
        $axisIndex: [0, 1],
        hq: {
            up: {fill: 'transparent', lineWidth: 1 * scale},
            down: {lineWidth: 1 * scale},
            up: {lineWidth: 1 * scale},
        }
    }
};
// const 
//---------------------------------

// 布林线策略
// const bulinOption = () => {
//     return {
//         textStyle: getTextStyle(),
//         grid: [getGrid(0), getGird(1)],
//         axis: [getXAxis(), getYAxis(0), getYAxis(1)],
//         series: [getKLine(0, 1)]
//     }
// }
// const chartMap = {
//     bulin: bulinOption,
// }

class OptionManager {
  constructor(scale, chartName, data) {
    this.option = null;
    this.scale = scale;
    this.chartName = chartName;
    this.data = data;
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
    const { scale, data } = this;
    return {
      data: getData(data),
      textStyle: getTextStyle(scale),
      grid: [getGrid(0, scale), getGrid(1, scale)],
      axis: [getXAxis([0, 1], scale), getYAxis(0, scale), getYAxis(1, scale)],
      series: [
        getKLineSeries(scale),

      ],
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
const optionManager = new OptionManager(1.2, "bulin");
console.log(optionManager.getOption());
