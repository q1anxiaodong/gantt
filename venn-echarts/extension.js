const { use } = echarts;

function setVennMapName(option) {
  if (!option) {
    return;
  }
  const geo = option.geo;
  const series = option.series;

  if (geo && geo.map === 'venn') {
    const dimension = geo.dimension;
    geo.map = geo.map + '_' + dimension;
  }

  if (series) {
    const seriesArr = Array.isArray(series) ? series : [series];
    seriesArr.forEach(seriesItem => {
      if (seriesItem.type !== 'map' || seriesItem.map !== 'venn') {
        return;
      }

      const dimension = seriesItem.dimension;
      seriesItem.map = seriesItem.map + '_' + dimension;
      console.log(seriesItem.map);
    })
  }
  
}

function install(registers) {
  registers.registerPreprocessor(setVennMapName);
  registers.registerUpdateLifecycle('series:layoutlabels', layout);
  registers.registerProcessor(
    registers.PRIORITY.PROCESSOR.STATISTIC,
    parseScatterData
);
}

use(install);