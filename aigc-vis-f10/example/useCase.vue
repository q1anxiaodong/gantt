<script setup lang="ts">
interface ChartProps {
    option?: {}
}

const props = defineProps<ChartProps>();

const chart = ref();


// 当前图表用例的预处理函数清单
const themeParser = {
        // x轴：一般的x轴样式
        xAxis: ['xAxis-normal'],
        // y轴：一般的y轴样式
        yAxis: ['yAxis-normal'],
        // dataZoom预处理：1.滑块图形 2.拖动条填充配色
        dataZoom: ['dataZoom-handler', 'dataZoom-area'],
        // series根据对象顺序获取预处理函数
        series: [
            {
                parser: ['line-mainLine', 'line-normal']
            },
            {
                parser: ['line-nomal', 'line-normal']
            }
        ]
    };

const reRender = () => {
    // 用例默认配置项
    const defaultOption = {
        xAxis: {
            id: 'date',
            data: [],
            axisLabel: {
                // 回调函数类型的配置项放在业务组件中，作业务组件的默认配置
                formatter: (value, index) => `day ${value}`,
                dvAlignEdge: false
            }
        },
        yAxis: {},
        series: [
            {
                type: 'line',
                data: []
            },
            {
                type: 'line',
                data: []
            },
        ]
    };

    const option = props.option || defaultOption;
    nextTick(() => {
        const chartIns = ThsDataVStandardChart.init(chart.value, themeParser);
        chartIns.play({option});
    })
}
</script>
<template>
    <div ref="chart"></div>
</template>