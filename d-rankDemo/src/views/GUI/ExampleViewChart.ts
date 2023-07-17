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

export const colors = [
    '#FF9500',
    '#14CCBD',
    '#1A9FFF',
    '#4433FF',
    '#3366FF',
    '#FF33AA ',
    '#CC41D9',
    '#FFAD29',
    '#38D9C6',
    '#42B7FF',
    '#6F5CFF',
    '#5C8AFF',
    '#6F5CFF',
    '#ff5cb6',
    '#df6ae6',
    '#ffc252',
    '#60e6d2',
    '#6bcbff',
    '#85abff',
    '#9785ff',
    '#ff85c4',
    '#f196f2',
    '#ffd57a',
    '#8df2e0',
    '#94ddff',
    '#adcaff',
    '#bcadff',
    '#ffadd5',
    '#ffc7fe',
];


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
        withTimeline: {
            range: [0, 0],
            curIndex: 0,
            maxRange: 5
        },
        name,
        lineStyle: {
            join: 'miter'
        },
        miterLimit: 100,
        type: 'dvLine',
        data: seriesData,
        // connectNulls: true,
        endLabel: {
            show: true,
            valueAnimation: true,
            formatter: (params) => {
                // return name + '  排名 ' + params.data.rank + ' 热度 ' + params.data.data;
                // return name.slice(0, 5)  + (name.length > 5 ? '... ' : ' ') +  ' ' + params.data.rank;
                return `{avatar|${name.slice(0, 1)}}{margin|}{content|${ name.slice(0, 5)  + (name.length > 5 ? '... ' : ' ')  + ' ' + params.data.rank}}`;
            },
            rich: {
                avatar: {
                    // width: 16,
                    // height: 16,
                    padding: [4, 4, 4, 4],
                    borderRadius: 10,
                    backgroundColor: 'inherit',
                },
                margin: {width: 5},
                content: {
                    backgroundColor: 'inherit',
                    padding: 4
                }
            },
            // padding: 4,
            // distance: 5,
            // backgroundColor: 'inherit',
            color: '#fff'
            // color: '#000'
        },
        emphasis: {
            focus: 'series'
        },
        select: {
            itemStyle: {
                color: 'red'
            }
        },
        selectMode: 'single',
        symbol: 'circle',
        showAllSymbol: true,
        labelLayout: {
            labelOverlap: 'shiftY'
        },
        symbolSize: (value, params) => {
            if (value === undefined) {
                return 0;
            }
            const min = 3;
            const max = 20;
            const extent = params.data.extent;
            return 3 + (max - min) * (params.data.stockValue - extent[0]) / (extent[1] - extent[0]) ;
        },
        tooltip: {

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

