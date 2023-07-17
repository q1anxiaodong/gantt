<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { markRaw, onMounted, ref } from 'vue'
// 存放扩展逻辑、图表各组件配置生成方法的地方
import { colors, getExampleChartOption, getSeries, myUse } from './ExampleViewChart'
// import rawData from '../../../public/script/resolveData.js'
// import solvedData from '../../../public/csv/resolveData'
import solvedData from '../../../public/xlsx/resolveData.js'

const chartDom = ref()
const timelineDom = ref()
let exampleChart: EChartsType
const range = 5
let option

console.log('dd', solvedData)

// 绘制图表的方法
const initChart = () => {
  console.log('wineData', solvedData.xData)

  // const option = getExampleChartOption([2, 5, 1, 7, 3]);
  option = {
    grid: {
      left: 35,
      right: 100,
      top: '8%',
      bottom: 0
    },
    color: colors,
    xAxis: {
      position: 'top',
      data: solvedData.xData,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        interval: 0
      },
      axisLabel: {
        // formatter: (value) => {
        //   return value.split(' ')[1]
        // }
      }
      // min: 0,
      // max: range
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 15
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: solvedData.yData
      // min: 11,
      // max: 20
      // data: ['9', '8', '7', '6', '5', '4', '3', '2', '1']
    },
    tooltip: {},
    dataZoom: [
      {
        type: 'slider',
        show: false,
        orient: 'vertical',
        startValue: 11,
        endValue: 20,
        minSpanValue: 20 - 11,
        maxSpanValue: 20 - 11
      },
      {
        type: 'slider',
        show: false,
        startValue: 0,
        endValue: range,
        minSpanValue: range,
        maxSpanValue: range
      }
    ],
    series: [...solvedData.seriesData.keys()].slice().map((key, index) => {
      return getSeries(key, solvedData.seriesData.get(key))
    }),
    // animationDuration: 6000,
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  console.log('option', option);
  
  exampleChart.setOption(option)
}

const initTimeline = () => {
  const TimeLine = new ThsDataVTimeline.Timeline(timelineDom.value, {
    theme: 'mobile-withValueOuter',
    data: solvedData.xData,
    config: {
      axis: {},
      // dataIndex: xAxisData.length - 1,
      dataIndex: 0,
      // 动画
      animation: {
        intervalTime: 1000
      }
    }
  })
  TimeLine.on('change', ({ index }) => {
    // const dataZoomModel = chart.getModel().getComponent('dataZoom', 0);
    // const startValue = dataZoomModel.get('startValue');
    // const endValue = dataZoomModel.get('endValue');
    let opt = {}
    if (index <= range) {
      opt = {
        // xAxis: {
        //   min: 0,
        //   max: range
        // },
        dataZoom: [
          {},
          {
            startValue: 0,
            endValue: range
          }
        ],
        series: [...solvedData.seriesData.keys()].slice().map((item) => {
          return {
            clip: 'strict',
            withTimeline: {
              range: [0, index],
              curIndex: index
            }
          }
        })
        // animation: true
      }
    } else {
      opt = {
        // xAxis: {
        //   min: index - range,
        //   max: index
        // },
        dataZoom: [
          {},
          {
            startValue: index - range,
            endValue: index
          }
        ],
        series: [...solvedData.seriesData.keys()].slice().map((item) => {
          return {
            clip: 'strict',
            withTimeline: {
              range: [0, range],
              curIndex: index
            }
          }
        })
        // animation: true
      }
    }
    exampleChart.setOption(opt)
  })
}

onMounted(() => {
  console.log('ff', chartDom.value.clientHeight);
  
  // 插入扩展逻辑
  myUse()
  initTimeline()
  // 初始化图表实例
  exampleChart = markRaw(echarts.init(chartDom.value))
  // 绘制图表
  initChart()
})
</script>

<template>
  <div class="chartCard">
    <div ref="chartDom" class="chart"></div>
    <div class="timeline" ref="timelineDom"></div>
  </div>
</template>
<style scoped lang="less">
.chartCard {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .chart {
    width: 100%;
    height: 80%;
    // margin: auto;
  }
  .timeline {
    width: 100%;
    // height: 20%;
  }
}
</style>
../../../public/xlsx/resolveData.js