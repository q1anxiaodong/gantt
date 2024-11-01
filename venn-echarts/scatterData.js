function createPointInPath(path) {
  const rect = path.getBoundingRect();
  let x, y;
  while (!path.contain(x, y)) {
    x = Math.random() * rect.width + rect.x;
    y = Math.random() * rect.height + rect.y;
  }
  return [x, y];
}


/**
 * 解析mock数据，生成散点的绘图数据
 * @returns {Object[]}
 * @example
 * [
 *    [经度1, 维度1, 所属区块名1, ...元素信息],
 *    [经度2, 维度2, 所属区块名2, ...元素信息],
 *    [经度3, 维度3, 所属区块名3, ...元素信息],
 *    [经度4, 维度4, 所属区块名4, ...元素信息],
 * ]
 */
function parse(seriesModel, ecModel, api) {
  if (seriesModel.get('dvType') !== 'venn') {
    return;
  }

  let data = seriesModel.getData();
  const coordinate = seriesModel.coordinateSystem;
  const newData = data.map([0, 1], function (_, __, indice) {
    const pathName = data.getValues(indice)[3];
    const region = coordinate.getRegion(pathName);
    const regionPath = region._elOnlyForCalculate;
    const pt = createPointInPath(regionPath);
    return [...pt];
  });
  seriesModel.setData(newData)
}

const parseScatterData = {
  seriesType: 'scatter',
  reset: parse
}

function layout(ecModel, api, params) {
  const targetModel = ecModel.getSeriesByType('map').filter(series =>
    series.get('map').match(/^venn_/)
  );
  targetModel.forEach(model => doLayout(model, ecModel, api));
}
const coordOffsetMap = {
  'venn_6': {
    'B': [-45, -5],
    'C': [-30, 25]
  }
};

function doLayout(model, ecModel, api) {
  const coordinate = model.coordinateSystem;
  const resourceType = coordinate.resourceType;
  const mapName = coordinate.map;
  const data = model.getData();
  const dimension = model.get('dimension');
  data.each(indice => {
    const value = data.getRawDataItem(indice);
    console.log('dddddata', model.get('data'), value);
    if (!value.name) {
      return;
    }
    const region = coordinate.getRegion(value.name)
    const center = region.calcCenter();

    if (!region._elOnlyForCalculate.contain(center[0], center[1])) {
      console.log('mapName', mapName);
      const offset = coordOffsetMap[mapName]?.[value.name];
      offset && data.getItemGraphicEl(indice).getTextContent().attr({
        style: {
          x: offset[0],
          y: offset[1]
        }
      })
      
    }

    // console.log(value, region.getCenter());


  })
}