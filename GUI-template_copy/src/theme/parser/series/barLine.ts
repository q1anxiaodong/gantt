import { util } from '../../util';


function parseBarLineSeries(
  seriesOptions: (BarSeriesOption | LineSeriesOption)[],
  optionToken: OptionToken
) {
  const defaultLabelOption = {
    label: {
      show: false
    }
  };
  seriesOptions.forEach((series, index) => {
    if (index === 0) {
      return;
    }
    util.merge(series, defaultLabelOption);
  });
}

/**
 * AIGC组件库-柱状图解析器
 */
export function barLineThemeParse(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';
  const { series } = option;
  const barSeries = series.filter(item => item.type === 'bar');
  const lineSeries = series.filter(item => item.type === 'line');
  if (
    series.length < 2 ||
    barSeries.length === 0 ||
    lineSeries.length === 0 ||
    option.grid?.length >= 2
  ) {
    return;
  }
  parseBarLineSeries(option.series as (BarSeriesOption | LineSeriesOption)[], optionToken);
}
