import AIGCTokenDark from './token/token.dark';
import AIGCTokenLight from './token/token.light';
import { WaterMarkThemeParser } from './parser/component/dvWaterMark';
import { xAxisThemeParser } from './parser/component/xAxis';
import { barThemeParse } from './parser/series/bar';
import { yAxisThemeParser } from './parser/component/yAxis';
import { lineThemeParser } from './parser/series/line';
import { colorThemeParser } from './parser/component/color';
import { dataZoomThemeParser } from './parser/component/dataZoom';
import { barLineThemeParse } from './parser/series/barLine';
import { pieThemeParser } from './parser/series/pie';

// 解析函数集合
export const AIGCParserArr = [
  barLineThemeParse,
  colorThemeParser,
  WaterMarkThemeParser,
  xAxisThemeParser,
  barThemeParse,
  yAxisThemeParser,
  lineThemeParser,
  pieThemeParser,
  dataZoomThemeParser
];

const AIGCLightTheme = {
  name: 'aigc-app-light' as const,
  parsers: AIGCParserArr,
  token: AIGCTokenLight
};

const AIGCDarkTheme = {
  name: 'aigc-app-dark' as const,
  parsers: AIGCParserArr,
  token: AIGCTokenDark
};

console.log('注册');

window.ThsDataVStandardChart.registerTheme(AIGCLightTheme);
window.ThsDataVStandardChart.registerTheme(AIGCDarkTheme);

export default {
  AIGCLightTheme: AIGCLightTheme.name,
  AIGCDarkTheme: AIGCDarkTheme.name
}
