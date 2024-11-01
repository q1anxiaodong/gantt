import { util } from '../../util';
import { judgeIsNormalBar } from '../../util';


/** 继承自移动端设计规范 */
const specification = {
  /** 最小柱高度 */
  barMinHeight: {
    stack: 0,
    normal: 1
  },
  /** 柱标签 */
  label: {
    /** 柱图 */
    distance: 4,
    dvPosition: 'valueDirection'
  }
};
/**
 * 获取柱状图中同一类目下有几根柱子, 相同stack的为一根柱子, 非堆叠的单独占一根柱子
 * @param seriesOptions
 * @returns
 */
function getBarCountInGroup(seriesOptions: BarSeriesOption[]) {
  let barCountInGroup = 0;
  const stackMap = new Map<string, boolean>();
  (seriesOptions as []).forEach(item => {
    if (item.type !== 'bar') {
      return;
    }
    if (item.stack) {
      if (!stackMap.has(item.stack)) {
        stackMap.set(item.stack, true);
        barCountInGroup += 1;
      }
    } else {
      barCountInGroup += 1;
    }
  });

  return barCountInGroup;
}

function getDefaultBarSeries(
  bar: BarSeriesOption,
  index: number,
  length: number,
  barCountInGroup: number,
  stackBarSeriesCount: number
): BarSeriesOption {
  // 柱状图细分类型：stack（堆叠柱图），normal（普通柱图）
  const subType = bar.stack ? 'stack' : 'normal';
  const isStack = subType === 'stack';
  const singleBarWidth = 32;
  const multiBatWidth = 66 / barCountInGroup;
  return {
    // @ts-ignore
    barCategoryGap: index === length - 1 ? '33%' : undefined,
    barGap: '5%',
    barMinHeight: specification.barMinHeight[subType],
    barMaxWidth: barCountInGroup === 1 ? singleBarWidth : multiBatWidth,
    label: {
      ...specification.label,
      show: isStack ? barCountInGroup < 2 : true,
      formatter: params => {
        if (isStack && params.seriesIndex === stackBarSeriesCount - 1) {
          return params.value;
        }
        if (isStack && params.seriesIndex !== stackBarSeriesCount - 1) {
          return '';
        }
      }
    },
    labelLayout: {
      hideOverlap: true
    },
    animation: true
  };
}

/** 移动端主题 */
function setMaxLabelCount() {
  return {
    dvMaxLabelCount: 5
  };
}

function parseBarSeries(seriesOptions: BarSeriesOption[], optionToken: OptionToken) {
  const barCountInGroup = getBarCountInGroup(seriesOptions);
  /** 所有series中 类型为bar的数量 */
  const barSeriesCount = (seriesOptions as []).reduce(
    (total, item) => (item.type === 'bar' && item.dvType !== 'progress' ? total + 1 : total),
    0
  );
  /** 所有series中 类型为bar且为堆叠的数量 */
  const stackBarSeriesCount = (seriesOptions as []).reduce(
    (total, item) =>
      item.type === 'bar' && item.dvType !== 'progress' && typeof item.stack !== 'undefined'
        ? total + 1
        : total,
    0
  );

  seriesOptions.forEach((series, index) => {
    const defaultBarOption = getDefaultBarSeries(
      series,
      index,
      barSeriesCount,
      barCountInGroup,
      stackBarSeriesCount
    );
    const defaultBarOptionWithToken = util.merge(
      util.clone(optionToken?.bar || {}),
      defaultBarOption
    );
    util.merge(series, defaultBarOptionWithToken);
  });
}

/**
 * AIGC组件库-柱状图解析器
 */
export function barThemeParse(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';
  if (!judgeIsNormalBar(option)) {
    return;
  }
  const barSeries = option.series.filter(item => item.type === 'bar');
  parseBarSeries(barSeries, optionToken);
}
