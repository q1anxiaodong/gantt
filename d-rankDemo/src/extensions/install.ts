import RankLineSeries from './RankLineSeries';
import RankLineView from './RankLineView';
import layoutPoints from './layout/points.js';

import type { LineSeriesOption } from 'echarts';
import type { use } from 'echarts/types/src/extension';
// 根据业务做图表组件类型推断、类型定义的地方 //
type SeriesData = Exclude<LineSeriesOption['data'], undefined>;
/** 获取Register的类型：通过推断USE方法的参数列表，得到echarts扩展安装器的TS类型ECExtensionInstaller */
type ParamsArrOfUse = Parameters<typeof use>[0];
type ElementOf<T> = T extends Array<infer E> ? E : T;
type ECExtensionInstaller = Extract<ElementOf<ParamsArrOfUse>, Function>;

export function install (registers: Parameters<ECExtensionInstaller>[0]) {
    registers.registerChartView(RankLineView);
    registers.registerSeriesModel(RankLineSeries);

    registers.registerLayout(layoutPoints('dvLine', true));
}