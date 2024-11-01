import { util } from '../../util';


const defaultPieOption = {
  title: {
    left: 'center',
    top: 'center',
    textAlign: 'auto'
  }
};
function getDefaultPieSeries(
  seriesIndex: number,
  pieSeries,
  option: Parameters<ThemeParser>[0],
  themeMode: PresetMode,
  optionToken: OptionToken
) {
  const defaultPieSeriesOption = {
    emphasis: {
      focus: 'self',
      scale: false
    },
    blur: {
      itemStyle: {
        opacity: 0.2
      }
    },
    selectedMode: 'single'
  };

  return util.merge(util.clone(optionToken.pie || {}), defaultPieSeriesOption);
}

function parsePieSeries(
  seriesOptions: Parameters<ThemeParser>[0]['series'],
  option: Parameters<ThemeParser>[0],
  themeMode: PresetMode,
  optionToken: OptionToken
) {
  (seriesOptions as []).forEach((series, index) => {
    if (series.type !== 'pie') {
      return;
    }
    const defaultOption = getDefaultPieSeries(index, series, option, themeMode, optionToken);
    seriesOptions[index] = util.merge(defaultOption, series, true);
  });
}

export function pieThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';

  parsePieSeries(option.series, option, themeMode, optionToken);

  util.merge(option, defaultPieOption, true);
}
