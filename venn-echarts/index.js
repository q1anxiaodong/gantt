const container = document.getElementById('container');
const chartIns = echarts.init(container,undefined, {
  renderer: 'svg'
});

const params = new URLSearchParams(window.location.href.split('?')[1]);
const SVGPath = `./${params.get('dimension') || 5}.svg`;

// 标识数据的字段名
const UNIQUEKEY = 'name';
const colors = ['#FCE7CC','#F1D5FA','#E1D4FC','#D7DBFC','#D1E5FA','#D0F1F2','#FDF1CC'];

$.get(SVGPath, function (svg) {
  echarts.registerMap('venn', { svg: svg });
  const dimension = parseInt(params.get('dimension')) || 5;

  // mock数据
  const mockData = getMockData(dimension);
  const solvedData = parseData(mockData, UNIQUEKEY);

  // 解析地图数据
  const regions = createRegionOptions(dimension, colors);

  // 解析散点数据
  const scatterData = solvedData;

  const scetterOption = {
    type: 'scatter',
    dvType: 'venn',
    coordinateSystem: 'geo',
    geoIndex: 0,
    symbolSize: 5,
    itemStyle: {
      color: '#b02a02'
    },
    encode: {
      tooltip: 2
    },
    data: scatterData
  };
  const option = {
    tooltip: {},
    geo: {
      tooltip: {
        show: true
      },
      map: 'venn',
      roam: true,
      // selectedMode: 'multiple',
      regions: regions,
      label: {
        show: true
      },
      emphasis: {
        focus: 'self',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#3366ff'
        }
      }
    },
    series: [
      scetterOption
    ]
  };

  chartIns.setOption(option);
})