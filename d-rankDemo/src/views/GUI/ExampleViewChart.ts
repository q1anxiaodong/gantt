import type { XAXisComponentOption, GridComponentOption, YAXisComponentOption, LineSeriesOption, EChartsOption, EChartsType, } from 'echarts';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI';
import type GlobalModel from 'echarts/types/src/model/Global';
import { install } from '@/extensions/install';
import { use } from 'echarts';
import { showDialog } from 'vant';

const rootPath = 'https://t.zhouchangju.com/test/qianxiaodong/assets'

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

const getXAxis = (): XAXisComponentOption => {
    return {
        type: 'category'
    };
}

const getYAxis = (): YAXisComponentOption => {
    return {
        type: 'value'
    };
}
export const getSeries = (name, seriesData, index) => {
    let picName = undefined;
    let link = undefined;
    seriesData.forEach(item => {
        item.pic ? (picName = item.pic) : null;
        item.link ? (link = item.link) : null;
    });
    let markPoint;
    if (seriesData.markPointData) {
        markPoint = {
            symbolSize: 20,
            data: seriesData.markPointData,
            itemStyle: {
                opacity: 0,
            },
            label: {
                formatter: (params) => {
                    return params.data.value;
                },
                backgroundColor: '#fff',
                borderRadius: 2,
                borderColor: 'rgba(99, 99, 99, 0.8)',
                borderWidth: 0.5,
                padding: 4,
                fontSize: 10,
                opacity: 0.8,
                offset: [0, -5],
            }
        }
    }
    return {
        clip: true,
        withTimeline: {
            range: [0, 5],
            curIndex: 5,
            maxRange: 5
        },
        name,
        lineStyle: {
            join: 'miter'
        },
        miterLimit: 100,
        type: 'dvLine',
        data: seriesData,
        label: {
            show: true,
            formatter: (params) => {
                return params.data.event ? `{label|${params.data.event}}` : null;
            },
            rich: {
                label: {
                    padding: 4
                }
            },
            backgroundColor: '#fff',
            borderRadius: 2,
            borderColor: 'rgba(99, 99, 99, 0.8)',
            borderWidth: 0.5,
            fontSize: 10,
            opacity: 0.8,
            offset: [0, -5],
        },

        // connectNulls: true,
        endLabel: {
            show: true,
            valueAnimation: true,
            formatter: (params) => {
                // return name + '  排名 ' + params.data.rank + ' 热度 ' + params.data.data;
                // return name.slice(0, 5)  + (name.length > 5 ? '... ' : ' ') +  ' ' + params.data.rank;
                const pic = picName == null ? `{margin|}{margin|}{textAvatar|${name.slice(0, 1)}}{margin|}` : `{margin|}{margin|}{avatar|}{margin|}`;
                return pic + `{content|${name.slice(0, 3) + (name.length > 3 ? '... ' : ' ') + ' ' + params.data.stockPercent}}`;
            },
            rich: {
                textAvatar: {
                    backgroundColor: 'inherit',
                    borderRadius: 10,
                    padding: 3,
                    color: '#fff'
                },
                avatar: {
                    width: 16,
                    height: 16,
                    color: '#fff',
                    // padding: 4,
                    borderRadius: 10,
                    // backgroundColor: 'inherit',
                    backgroundColor: {
                        image: rootPath + '/' + picName
                    }
                },
                margin: { width: 5 },
                content: {
                    // backgroundColor: 'inherit',
                    padding: 4
                }
            },
            // padding: 4,
            distance: 1,
            afterInit: (endLabel) => {
                if (!link) return;
                endLabel.on('click', () => {
                    window.location.assign(link);
                })
            }
        },
        lineStyle: {
            width: 1
        },
        emphasis: {
            focus: 'series',
            itemStyle: {
                borderColor: '#000',
                borderWidth: 0.5
            },
            // label: {show: true},
        },
        symbol: 'circle',
        showAllSymbol: true,
        labelLayout: {
            labelOverlap: 'shiftY'
        },
        symbolSize: (value, params) => {
            if (value === undefined) {
                return 0;
            }
            const min = 6;
            const max = 20;
            const extent = params.data.extent;
            return 6 + (max - min) * (params.data.stockValue - extent[0]) / (extent[1] - extent[0]);
        },
        // markPoint: markPoint,
        animationDurationUpdate: 1000,
        animationDuration: 1000,
        tooltip: {
            formatter: (params) => {
                const container = document.createElement('div');
                container.innerHTML = `
                    <div style="padding: 8px; width: 180px;display: flex;flex-wrap: wrap; ">
                        <div style="">${params.data.date}</div>
                        <div style="">${params.data.name}</div>
                        <div style="display: flex;width: 100%; justify-content: space-between;">
                            <div style="">持股占比</div>
                            <div style="">${params.data.stockPercent}</div>
                        </div>
                    </div>
                `;
                return container;
            },
        }
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



export function handlePointClick(chart: EChartsType) {
    chart.on('click', { seriesType: 'dvLine', }, params => {
        console.log('label', params);
        
        if (!params.data.content) {
            return;
        }
        showDialog({
            title: params.data.event,
            message: params.data.content,
            theme: 'round-button',
            messageAlign: 'left',
            confirmButtonText: '我知道了'
        })
    });
}

// ----------------------------------------------------- //

export const myUse = () => {
    use([install]);
}

