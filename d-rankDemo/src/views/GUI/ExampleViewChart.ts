import type { XAXisComponentOption, GridComponentOption, YAXisComponentOption, LineSeriesOption, EChartsOption, } from 'echarts';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI';
import type GlobalModel from 'echarts/types/src/model/Global';
import { install } from '@/extensions/install';
import { use } from 'echarts';

// import type { EChartsExtensionInstallRegisters, EChartsExtensionInstaller } from 'echarts/types/src/extension'

// 根据业务做图表组件类型推断、类型定义的地方 //
type SeriesData = Exclude<LineSeriesOption['data'], undefined>;
/** 获取Register的类型：通过推断USE方法的参数列表，得到echarts扩展安装器的TS类型ECExtensionInstaller */
type ParamsArrOfUse = Parameters<typeof use>[0];
type ElementOf<T> = T extends Array<infer E> ? E : T;
type ECExtensionInstaller = Extract<ElementOf<ParamsArrOfUse>, Function>;

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
export const getSeries = (name, seriesData) => {
    return {
        clip: true,
        // withTimeline: {
        //     range: [0, 0],
        //     curIndex: 0,
        //     maxRange: range
        // },
        name,
        lineStyle: {
            join: 'miter'
        },
        miterLimit: 100,
        type: 'dvLine',
        data: seriesData,
        endLabel: {
            show: true,
            valueAnimation: true,
            formatter: (params) => {
                return name + '  排名 ' + params.data.rank + ' 利润 ' + params.data.data;
            },
            backgroundColor: 'inherit',
            padding: 4,
            offset: [20, 0],
            color: '#fff'
        },
        emphasis: {
            focus: 'series'
        },
        select: {
            itemStyle: {
                color: 'red'
            }
        },
        symbol: 'circle',
        showAllSymbol: true,
        labelLayout: {
            labelOverlap: 'shiftY'
        },
        symbolSize: (dataItem) => {
            return 10 / parseFloat(dataItem) + 20;
        },
        animationDurationUpdate: 1000,
        animationDuration: 1000,
    }
};

export const getExampleChartOption = (data: number[]): EChartsOption => {
    return {
        grid: getGrid(),
        xAxis: getXAxis(),
        yAxis: getYAxis(),
        // series: getSeries(data)
    }
}

// ----------------------------------------------------- //

export const myUse = () => {
    use([install]);
}

