// 图表各组件配置的生成方法定义
const getGrid = (): GridComponentOption => {
    return {};
}

const getXAxis = (): XAXisComponentOption  => {
    return {
        type: 'category'
    };
}

const getYAxis = (): YAXisComponentOption  => {
    return {
        type: 'value'
    };
}
const getSeries = (data: SeriesData): LineSeriesOption => {
    return {
        type: 'bar',
        data: data
    }
}

export const getExampleChartOption = (data: number[]): EChartsOption => {
    return {
        grid: getGrid(),
        xAxis: getXAxis(),
        yAxis: getYAxis(),
        series: getSeries(data)
    }
}

