import { util } from '../../util';
import { imgs } from '../../assets/dvWaterMarkImgs.js';

function parseWaterMark(option: Option, optionToken: OptionToken, themeMode: PresetMode) {
  if (!option?.dvWaterMark || !option?.dvWaterMark?.show) {
    return;
  }

  // dvWaterMark的固定配置
  const defaultWaterMark = {
    id: '$DV_WATER_MARK',
    show: false,
    type: 'image',
    right: 24,
    bottom: 80,
    style: {
      width: 36,
      height: 10,
      image: imgs[themeMode]
    },
    silent: true
  };
  // 固定配置合并到token配置
  optionToken.dvWaterMark = util.merge(optionToken.dvWaterMark || {}, defaultWaterMark);
  // token配置合并到用户配置
  option.dvWaterMark = util.merge(option.dvWaterMark, optionToken.dvWaterMark || {});
}

export function WaterMarkThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';

  parseWaterMark(option, optionToken, themeMode);
}
