import type { XAXisComponentOption, GridComponentOption, YAXisComponentOption, LineSeriesOption, EChartsOption, EChartsType, ECharts, } from 'echarts';
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
export const getSeries = (name, seriesData, xData) => {
    let picName = undefined;
    let link = undefined;
    seriesData.forEach(item => {
        item.pic ? (picName = item.pic) : null;
        item.link ? (link = item.link) : null;
    });
    return {
        clip: true,
        withTimeline: {
            range: [0, 5],
            curIndex: 5,
            maxRange: 5
        },
        name,
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
                const name = params.name;
                const pic = `{margin|}{margin|}{avatar|}`;
                // console.log('params', params);
                
                // if (Number(params.data.rank) > 10 || params.dataIndex < index) {
                //     return pic;
                // }
                return pic + `{content|${name.slice(0, 3) + (name.length > 3 ? '... ' : ' ') + '' + params.data.stockPercent}}`;
            },
            rich: {
                textAvatar: {
                    backgroundColor: 'inherit',
                    borderRadius: 10,
                    padding: 3,
                    color: '#fff'
                },
                avatar: {
                    width: 20,
                    height: 20,
                    color: '#fff',
                    // borderColor: 'rgba(0,0,0,0.1)',
                    // borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: {
                        image: rootPath + '/' + picName
                    }
                },
                margin: { width: 5 },
                content: {
                    padding: 4
                }
            },
            afterInit: (endLabel, seriesModel) => {
                endLabel.traverse(el => {
                    // 在endLabel重新实例化后，绑定dataIndex和seriesIndex信息，给点击事件回调用
                    el.dataIndex = seriesModel.get(['withTimeline', 'curIndex']);
                    el.seriesIndex = seriesModel.seriesIndex;
                })
            }
        },
        lineStyle: {
            width: 1
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
              borderColor: '#3b3b3b',
              borderWidth: 2
          }
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
        animationDurationUpdate: 1000,
        animationDuration: 1000,
        tooltip: {
            enterable: true,
            alwaysShowContent: true,
            triggerOn: 'click',
            width: 163,
            formatter: (params) => {
                window.tooltipParams = params;
                window.tooltipClickHandler = (params) => {
                    if (!params.data.link) return;
                    window.location.assign(params.data.link);
                }
                const container = document.createElement('div');
                container.innerHTML = `
                    <!-- tooltip包围盒 -->
                    <div onclick="tooltipClickHandler(window.tooltipParams)" style="padding: 0px 0; width: 180px;display: flex;flex-wrap: wrap; id="dvLineTooltip">
                        <!-- tooltip标题-年份 -->
                        <div style="width: 100%;margin-left: 10px;">${params.data.date}</div>
                        <!-- 公司/股东名 和 持股占比 -->
                        <div style="width: 100%;display: flex; justify-content: space-between;">
                            <!-- 名称前面的圆点和名字包围盒 -->
                            <div style="display: flex;justify-content: start;">
                                <div style="width: 6px;height: 6px;margin-right: 6px;margin-top: 7px;background-color: ${params.color}; border-radius: 50%;"></div>
                                <div style="width: 80px;white-space: normal;word-break: break-all;">${params.data.name}</div>
                            </div>
                            <!-- 右边的持股占比 -->
                            <div style="font-size: 12px; color: rgba(255,255,255,0.84);line-height: 16px;">${params.data.stockPercent}</div>
                        </div>
                        <!-- 白色分割线 -->
                        <div style="height: 1px;width: 100%; margin: 8px 0 0 0;background-color: #ffffff10"></div>
                        <!-- 跳转文字 -->
                        <div style="width: 100%;height: 16px;margin-top: 8px;display: flex;justify-content: space-between;align-items: center;font-size: 12px;color: rgba(255,255,255,0.84)">
                            <div style="margin-left: 8px">查看图谱</div>
                            <div style="width: 6px;height: 6px;border-top: 2px solid #ffffff84;border-right: 2px solid #ffffff84; transform: rotate(45deg);"><div>
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

    chart.getZr().on('click', (event) => {
        let dataIndex, seriesIndex;
        let tar = event.target;
        while(tar) {
            if (tar.seriesIndex !== undefined && tar.dataIndex !== undefined) {
                dataIndex = tar.dataIndex;
                seriesIndex = tar.seriesIndex;
                break;
            }
            tar = tar.parent || tar.__hostTarget;
        }
        
        if (seriesIndex !== undefined && dataIndex !== undefined) {
            // console.log('ccc', event, dataIndex, seriesIndex);
            chart.dispatchAction({
                type: 'showTip',
                seriesIndex,
                dataIndex
            })
        }
    })
}

export const initTimeline = (timelineDOM, exampleChart, range, solvedData) => {
   const timeline = new ThsDataVTimeline.Timeline(timelineDOM, {
      theme: 'mobile',
      data: solvedData.xData,
      config: {
        axis: {
        },
        dataIndex: solvedData.xData.length - 1,
        // 动画
        animation: {
          intervalTime: 1000
        }
      }
    })
    timeline.on('change', ({ index, causeBy }) => {
      let opt = {
          animation: causeBy === 'play'
      }
      if (index <= range) {
        opt = {
          dataZoom: [
            {},
            {
              startValue: 0,
              endValue: range
            }
          ],
          series: [...solvedData.seriesData.keys()].slice().map((item) => {
            return {
              clip: 'strict',
              withTimeline: {
                range: [0, index],
                curIndex: index
              },
              endLabel: {
                formatter: (params) => {
                    const name = params.name;
                    const pic = `{margin|}{margin|}{avatar|}`;
                    // console.log('params', params);
                    
                    if (Number(params.data.rank) > 10 || params.dataIndex < index) {
                        return pic;
                    }
                    return pic + `{content|${name.slice(0, 3) + (name.length > 3 ? '... ' : ' ') + '' + params.data.stockPercent}}`;
                },
              }
            }
          })
        }
      } else {
        opt = {
          dataZoom: [
            {},
            {
              startValue: index - range,
              endValue: index
            }
          ],
          series: [...solvedData.seriesData.keys()].slice().map((item) => {
            return {
              clip: 'strict',
              withTimeline: {
                range: [0, range],
                curIndex: index
              },
              endLabel: {
                formatter: (params) => {
                    const name = params.name;
                    const pic = `{margin|}{margin|}{avatar|}`;
                    // console.log('params', params);
                    
                    if (Number(params.data.rank) > 10 || params.dataIndex < index) {
                        return pic;
                    }
                    return pic + `{content|${name.slice(0, 3) + (name.length > 3 ? '... ' : ' ') + '' + params.data.stockPercent}}`;
                },
              }
            }
          })
        }
      }
      exampleChart.setOption(opt)
    })

    return timeline;
}


// ----------------------------------------------------- //

export const myUse = () => {
    use([install]);
}

