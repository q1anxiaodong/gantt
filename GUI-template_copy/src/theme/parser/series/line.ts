import { util } from '../../util';

function getDefaultLineSeries(
  seriesIndex: number,
  lineSeries,
  option: Parameters<ThemeParser>[0],
  themeMode: PresetMode,
  optionToken: OptionToken
) {
  const defualtLineSeriesOption = {
    /** 折线标签超过五个不显示 */
    dvMaxLabelCount: 5,
    /** 折线节点超过13个不再显示symbol */
    dvShowSymbolStrategy: 13,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: {
      width: 2
    },
    itemStyle: {
      borderColor: option.color?.[seriesIndex],
      borderWidth: 2
    },
    label: {
      show: true,
      distance: 4
    },
    emphasis: {
      scale: false,
      itemStyle: {
        color: themeMode === 'light' ? '#fff' : '#171717',
        borderColor: option.color?.[seriesIndex],
        borderWidth: 2
      }
    },
    areaStyle: lineSeries.areaStyle
      ? {
          origin: 'start',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: 'rgba(38, 95, 252, 0)'
              },
              {
                offset: 0,
                color: 'rgba(38, 95, 252, 0.18)'
              }
            ]
          }
        }
      : null,
    animation: false
  };

  return util.merge(util.clone(optionToken.line || {}), defualtLineSeriesOption);
}

function parseLineSeries(
  seriesOptions: Parameters<ThemeParser>[0]['series'],
  option: Parameters<ThemeParser>[0],
  themeMode: PresetMode,
  optionToken: OptionToken
) {
  (seriesOptions as []).forEach((series, index) => {
    if (series.type !== 'line') {
      return;
    }
    const defaultOption = getDefaultLineSeries(index, series, option, themeMode, optionToken);
    seriesOptions[index] = util.merge(defaultOption, series, true);
  });
}

export function lineThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';

  console.log('line', option.series);

  parseLineSeries(option.series, option, themeMode, optionToken);
}
