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
  // const option = getExampleChartOption([2, 5, 1, 7, 3]);
  option = {
    grid: {
      left: 35,
      right: 130,
      top: '10%',
      bottom: '5%'
    },
    color: colors,
    axisPointer: {
      triggerTooltip: false
    },
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
      axisPointer: {
        show: true,
        label: {
          backgroundColor: '#3b3b3b',
          padding: 4,
          fontSize: 10,
          margin: 11
        },
        lineStyle: {
          opacity: 0
        }
      }
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
        show: true,
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
      return getSeries(key, props.solvedData.seriesData.get(key))
    }),
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  console.log('option', option)

  exampleChart.setOption(option)
  handlePointClick(exampleChart)
}

const initTimeline = () => {
  timeline = new ThsDataVTimeline.Timeline(timelineDom.value, {
    theme: 'mobile',
    data: props.solvedData.xData,
    config: {
      axis: {
        tooltip: {
          style: { display: 'none' }
        }
      },
      dataIndex: props.solvedData.xData.length - 1,
      // dataIndex: 0,
      // 动画
      animation: {
        intervalTime: 1000
      }
    }
  })
  timeline.on('change', ({ index }) => {
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
        series: [...props.solvedData.seriesData.keys()].slice().map((item) => {
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
        series: [...props.solvedData.seriesData.keys()].slice().map((item) => {
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

watch(
  () => props.solvedData,
  () => {
    timeline && timeline.destroy()
    exampleChart && exampleChart.dispose()
    initTimeline()
    // 初始化图表实例
    exampleChart = markRaw(echarts.init(chartDom.value))
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