export const util = window.ThsDataVStandardChart.echarts.util;

export function normalizeToArray<T>(value?: T | T[]): T[] {
    if (value instanceof Array) {
        return value;
    }
    if (value == null || undefined) {
        return [];
    }
    return [value];
}

export function judgeIsNormalBar(option) {
    if (typeof option?.series === 'undefined') {
        return false;
    }
    const barSeries = option.series.filter(item => item.type === 'bar');
    if (barSeries.length === 0) {
        return false;
    }

    // 若是动态条形图则不进行以下柱状图主题解析
    // if (judgeIsDynamicBar(barSeries)) {
    //   return false;
    // }
    return true;
}