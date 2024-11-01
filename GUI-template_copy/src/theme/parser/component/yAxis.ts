import { util } from '../../util';


function parseYAxis(option: Option, optionToken: OptionToken) {
  const defaultYAxis = {
    /**
     * 这里的百分比的参考是实际的option.maxmin/data的maxmin(先后顺序表示优先级)的差值 或 min本身(插值为0时)
     * @description 应设计师要求，series绘制占图表上下各90%
     * @change - 设计师要求，series的最小值无需再减少原始区间的10%，
     * 以防止没有跨0轴的数据在图表中y轴跨0轴的奇怪现象
     */
    boundaryGap: [0, '10%'],
    dvSplitLineNumber: 5,
    dvBoundaryGapContainZeroTick: true,
    splitLine: {
      lineStyle: {
        width: 0.5
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true
    }
  };

  const defaultXAxisOptionWithToken = util.merge(
    util.clone(optionToken?.yAxis || {}),
    defaultYAxis
  );

  (option.yAxis as unknown as []).forEach((yAxis, index) => {
    option.yAxis[index] = util.merge(yAxis, defaultXAxisOptionWithToken);
  });
}

export function yAxisThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';

  console.log('yAxis', option.yAxis);

  parseYAxis(option, optionToken);
}
