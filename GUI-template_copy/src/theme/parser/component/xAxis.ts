import { util } from '../../util';

function parseXAxis(option: Option, optionToken: OptionToken) {
  // x轴固定设置
  const defaultXAxis = {
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 0.5
      }
    },
    splitLine: {
      show: false,
      width: 0.5,
      interval: 1
    },
    axisLabel: {
      show: true,
      dvAlignEdge: false,
      dvLayout: 3,
      dvLayoutTakeEffectGreaterThan: 'auto',
      margin: 6
    },
    axisPointer: {
      animation: false,
      show: false,
      lineStyle: {
        type: 'solid',
        width: 1
      },
      shadowStyle: {
        dvMaxWidth: 48
      },
      label: {
        show: true,
        margin: 6,
        // eslint-disable-next-line no-magic-numbers
        padding: [-0.2, 2, -1, 2],
        borderRadius: 4
      }
    }
  };
  // x轴固定设置 + x轴token配置
  const defaultXAxisOptionWithToken = util.merge(
    util.clone(optionToken?.xAxis || {}),
    defaultXAxis
  );

  (option.xAxis as unknown as []).forEach((xAxis, index) => {
    option.xAxis[index] = util.merge(xAxis, defaultXAxisOptionWithToken);
  });
}

export function xAxisThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';

  parseXAxis(option, optionToken);
  console.log('xAxis', option.xAxis);
}
