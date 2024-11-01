import { util } from '../../util';


function parseColor(option: Option, optionToken: OptionToken) {
  optionToken.color = [
    optionToken['color-visualization-primary'],
    optionToken['color-visualization-01'],
    optionToken['color-visualization-02'],
    optionToken['color-visualization-03'],
    optionToken['color-visualization-04'],
    optionToken['color-visualization-05'],
    optionToken['color-visualization-06'],
    optionToken['color-visualization-07'],
    optionToken['color-visualization-08']
  ];
  // token配置合并到用户配置
  option.color = util.merge(option.color || [], optionToken.color || []);
}

export function colorThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';

  parseColor(option, optionToken);
}
