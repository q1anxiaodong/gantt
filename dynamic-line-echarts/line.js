let dom = document.getElementById("container");
let myChart = echarts.init(dom, null, {
  renderer: "canvas",
});
let option = {
  animationEasing: "linear",
  animationEasingUpdate: "linear",
  animationDurationUpdate: 1000,
  animationDuration: 0,
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  //   dataZoom: {
  //     type: "slider",
  //     startValue: 0,
  //     endValue: 2,
  //     filterMode: "weekfilter",
  //   },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320].map((item) => undefined),
      type: "line",
      smooth: false,
    },
  ],
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

const timelineDom = document.getElementById("timeline");
const timeline = new ThsDataVTimeline.Timeline(timelineDom, {
  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  config: {
    animation: {
      intervalTime: 1e3,
    },
  },
});

timeline.on("change", (params) => {
  //   myChart.dispatchAction({
  //     type: "dataZoom",
  //     startValue: 0,
  //     endValue: params.index,
  //   });
  myChart.setOption({
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320].map((item, index) =>
          index <= params.index ? item : undefined
        ),
      },
    ],
  });
});

window.addEventListener("resize", myChart.resize);
