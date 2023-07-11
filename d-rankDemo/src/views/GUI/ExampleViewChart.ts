import type { XAXisComponentOption, GridComponentOption, YAXisComponentOption, LineSeriesOption, EChartsOption, } from 'echarts';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI';
import type GlobalModel from 'echarts/types/src/model/Global';
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
const getSeries = (data: SeriesData): LineSeriesOption => {
    return {
        type: 'line',
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

// ----------------------------------------------------- //

export const myUse = () => {
    function printSeriesType(ecModel: GlobalModel, chart: ExtensionAPI) {
        const seriesModels = ecModel.getSeries();
        seriesModels.forEach(series => {
            console.log('哈哈', series.type);
        })
    }

    const extensionRegister: ECExtensionInstaller = (register: Parameters<ECExtensionInstaller>[0]) => {
        register.registerUpdateLifecycle('series:afterupdate', (...args) => {
            printSeriesType(args[0], args[1]);
        })
    }

    use([extensionRegister]);
}

