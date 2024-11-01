<script setup lang="ts">
import { markRaw, onMounted, ref } from 'vue'
// 存放扩展逻辑、图表各组件配置生成方法的地方
import { getExampleChartOption } from './ExampleViewChart'
import AIGCTheme from '../../theme';
const chartDom = ref()
let exampleChart;

// 绘制图表的方法
const initChart = () => {
  const option = getExampleChartOption([2, 5, 1, 7, 3])
  exampleChart.play({option})
}

onMounted(() => {
  // 初始化图表实例
  exampleChart = markRaw(ThsDataVStandardChart.init(chartDom.value, AIGCTheme.AIGCLightTheme))
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
