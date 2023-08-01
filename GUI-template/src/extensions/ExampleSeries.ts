import SeriesModel from 'echarts/lib/model/Series.js'
import createSeriesData from 'echarts/lib/chart/helper/createSeriesData.js'
import type { LineSeriesOption } from 'echarts/types/src/chart/line/LineSeries';
export interface ExampleSeriesOption {
    type: 'dvExample'
}

class ExampleSeriesModel extends SeriesModel<ExampleSeriesOption> {
    static readonly type = 'series.dvExample';
    type = ExampleSeriesModel.type;

    static readonly dependencies = ['grid', 'polar'];

    getInitialData(option) {
        // 初始化seriesData对象，echarts提供现成方法，统一调用
        return createSeriesData(null, this, {
            useEncodeDefaulter: true
        })
    }

    static defaultOption: ExampleSeriesOption = {
        // 配置项默认值
    };
}

export default ExampleSeriesModel;
