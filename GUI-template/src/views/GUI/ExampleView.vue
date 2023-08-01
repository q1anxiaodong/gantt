<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { markRaw, onMounted, ref } from 'vue'
// 存放扩展逻辑、图表各组件配置生成方法的地方
import { getExampleChartOption, myUse } from './ExampleViewChart'
const chartDom = ref()
let exampleChart: EChartsType

// 绘制图表的方法
const initChart = () => {
  const option = getExampleChartOption([2, 5, 1, 7, 3])
  exampleChart.setOption(option)
}

onMounted(() => {
  // 插入扩展逻辑
  myUse()
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
    height: calc(100% - 16px);
    margin: auto;
  }
}
</style>
