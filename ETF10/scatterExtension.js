const ThsDataVStandardChart = window.ThsDataVStandardChart;
console.log('ThsDataVStandardChart', ThsDataVStandardChart);

const { use } = ThsDataVStandardChart.echarts;

let scatterExtension;

function install(registers) {
  registers.registerUpdateLifecycle('series:beforeupdate', scatterExtension)
  registers.registerUpdateLifecycle('beforeupdate', () => console.log('llll'))
}

// 具体实现逻辑
function markerModelFilter(cmpt, index, arr) {
  const data = cmpt.getData();
  const getMarkerModelFromSeries = cmpt.constructor.getMarkerModelFromSeries;
  cmpt.ecModel.eachSeries(seriesModel => {
    const markerModel = getMarkerModelFromSeries(seriesModel, 'markLine');
    console.log('markLine', markerModel, seriesModel);
  })
  console.log('cmpt', cmpt);
  return true;
}

// globalModel, extensionAPI, updateLifecycleParams
scatterExtension = function (globalModel, extensionAPI, updateLifecycleParams) {
  const markLines = globalModel.findComponents({
    mainType: 'markLine',
    filter: cmpt => !!cmpt
  });
  if (!markLines.length) {
    return;
  }

  const getMarkerModelFromSeries = markLines[0].constructor.getMarkerModelFromSeries;
  globalModel.eachSeries(seriesModel => {
    const coordinateSystem = seriesModel.coordinateSystem;
    const mlModel = getMarkerModelFromSeries(seriesModel, 'markLine');
    if (!mlModel) {
      return;
    }
    if (coordinateSystem.type !== 'single') {
      return;
    }

    const mlData = mlModel.get('data');
    console.log('coordinateSystem', coordinateSystem, mlModel, mlData,);
  })




  console.log('散点图扩展', markLines);
}

use([install]);