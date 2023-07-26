<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { markRaw, onMounted, ref, defineProps, watch } from 'vue'
// 存放扩展逻辑、图表各组件配置生成方法的地方
import {
  colors,
  getExampleChartOption,
  getSeries,
  handlePointClick,
  initTimeline,
  myUse
} from './ExampleViewChart'
// import rawData from '../../../public/script/resolveData.js'
// import solvedData from '../../../public/csv/resolveData'

interface ChartProps {
  solvedData: {
    xData: []
    yData: []
    seriesData: Object
  }
  dataName: string
}

const chartDom = ref()
const timelineDom = ref()
let timeline
let exampleChart: EChartsType
const range = 5
let option

const props = defineProps<ChartProps>()

console.log('dd', props.solvedData)

// 绘制图表的方法
const initChart = () => {
  option = {
    grid: {
      left: 35,
      right: 130,
      top: '10%',
      bottom: '5%'
    },
    color: colors,
    xAxis: {
      position: 'top',
      data: props.solvedData.xData,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        interval: 0
      },
      axisLabel: {
        fontSize: 10,
        margin: 15
      },
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        margin: 15
      },
      boundaryGap: false,
      axisTick: {
        show: false,
        alignWithLabel: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false,
        interval: 0,
        lineStyle: {
          opacity: 0.5
        }
      },
      data: props.solvedData.yData
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#3B3B3B',
      stroke: '#3B3B3B',
      confine: true,
      textStyle: {
        color: 'rgba(255, 255, 255, 0.84)',
        fontSize: 12
      },
      extraCssText: 'border-color: transparent;' 
    },
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
    series: [...props.solvedData.seriesData.keys()].slice().map((key, index) => {
      return getSeries(key, props.solvedData.seriesData.get(key), exampleChart)
    }),
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  console.log('option', option)
  exampleChart.setOption(option)
  console.log('afterOption', exampleChart.getOption())
  handlePointClick(exampleChart)
}



watch(
  () => props.solvedData,
  () => {
    timeline && timeline.destroy()
    exampleChart && exampleChart.dispose()
    // 初始化图表实例
    exampleChart = markRaw(echarts.init(chartDom.value))
    // 初始化时间轴实例
    initTimeline(timelineDom.value, exampleChart, range, props.solvedData)
    // 绘制图表
    initChart()
  },
  {
    deep: true
  }
)

onMounted(() => {
  // 插入扩展逻辑
  myUse()
  // 初始化图表实例
  exampleChart = markRaw(echarts.init(chartDom.value))
  // 初始化时间轴实例
  initTimeline(timelineDom.value, exampleChart, range, props.solvedData)
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
  }
  .timeline {
    width: 100%;
    padding: 0 10px;
  }
}
</style>