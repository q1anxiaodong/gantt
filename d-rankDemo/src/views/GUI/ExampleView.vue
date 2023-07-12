<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { markRaw, onMounted, ref } from 'vue'
// 存放扩展逻辑、图表各组件配置生成方法的地方
import { getExampleChartOption, getSeries, myUse } from './ExampleViewChart'
import rawData from '../../../public/script/resolveData.js';

const chartDom = ref()
const timelineDom = ref()
let exampleChart: EChartsType;
const range = 3;
let option;

// 绘制图表的方法
const initChart = () => {
  console.log('wineData', rawData)
  
  // const option = getExampleChartOption([2, 5, 1, 7, 3]);
  option = {
    grid: {
      right: '15%'
    },
    xAxis: {
      data: rawData.xAxisData,
      type: 'category',
      boundaryGap: false,
      // axisTick: {
      //     alignWithLabel: true
      // },
      splitLine: {
        show: true
      },
      min: 0,
      max: range
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      data: rawData.yAxisData,
      min: 10,
      max: 20
      // data: ['9', '8', '7', '6', '5', '4', '3', '2', '1']
    },
    tooltip: {},
    // dataZoom: [
    // {
    //     type: 'inside',
    //     orient: 'vertical',
    //     startValue: 11,
    //     endValue: 20
    // }
    // ],
    series: rawData.wineData.map((item) => {
      return getSeries(item.stockName, item.incomes)
    }),
    // animationDuration: 6000,
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  exampleChart.setOption(option)
}

const initTimeline = () => {
  const TimeLine = new ThsDataVTimeline.Timeline(timelineDom.value, {
    theme: 'mobile-withValueOuter',
    data: rawData.xAxisData,
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
        xAxis: {
          min: 0,
          max: range
        },
        series: rawData.wineData.map((item) => {
          return {
            clip: 'strict',
            withTimeline: {
              range: [0, index],
              curIndex: index
            }
          }
        }),
        animation: true
      }
    } else {
      opt = {
        xAxis: {
          min: index - range,
          max: index
        },
        series: rawData.wineData.map((item) => {
          return {
            clip: 'strict',
            withTimeline: {
              range: [0, range],
              curIndex: index
            }
          }
        }),
        animation: true
      }
    }
    exampleChart.setOption(opt)
  })
}

onMounted(() => {
  // 插入扩展逻辑
  myUse()
  initTimeline();
  // 初始化图表实例
  exampleChart = markRaw(echarts.init(chartDom.value))
  // 绘制图表
  initChart()
})
</script>

<template>
  <div class="chartCard">
    <div class="chartName">示例模板</div>
    <div ref="chartDom" class="chart"></div>
    <div class="timeline" ref="timelineDom"></div>
  </div>
</template>
<style scoped lang="less">
.chartCard {
  width: 100%;
  height: 100%;
  box-shadow: inset;
  .chartName {
    text-align: center;
  }

  .chart {
    width: 100%;
    height: 100%;
    // margin: auto;
  }
}
</style>
