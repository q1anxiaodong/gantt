const container = document.getElementById('container');
const chartIns = echarts.init(container, undefined, {
  // renderer: 'svg'
});

const params = new URLSearchParams(window.location.href.split('?')[1]);
const SVGPath = `./${params.get('dimension') || 5}.svg`;

// 标识数据的字段名
const UNIQUEKEY = 'name';
const colors = ['#FCE7CC', '#F1D5FA', '#E1D4FC', '#D7DBFC', '#D1E5FA', '#D0F1F2', '#FDF1CC'];

$.get(SVGPath, function (svg) {
  console.log('svg', svg);
  const dimension = parseInt(params.get('dimension')) || 5;
  echarts.registerMap('venn_' + dimension, { svg: svg });


  // mock数据
  const mockData = getMockData(dimension);
  console.log('mockData', mockData);
  const solvedData = parseData(mockData, UNIQUEKEY);
  console.log('solvedData', solvedData);

  // 解析地图数据
  const regions = createRegionOptions(dimension, colors);

  // 解析散点数据
  const scatterData = solvedData;
  const d = createRegionOptions(dimension, colors).map(item => {
    // const labelOffset = offset[dimension][item.name] || undefined;
    item.itemStyle.areaColor = item.itemStyle.color;
    
    return {
      ...item,
      label: {
        fontSize: 8,
        // offset: labelOffset
        formatter: () => Math.floor(Math.random() * 20 + 1000)

      },
      value: Math.floor(Math.random() * 10 + 20)
    }
  });

  d.push(...labels.map(item => {
    return {
        name: item + '_title',
        label: {
            width: 8 * 12,
            overflow: 'truncate',
            ellipsis: '...',
            align: titleAlignMap?.['venn_' + dimension]?.[item + '_title'] || 'center',
            formatter: () => item + Array(8).fill('国').join('') + '\n' + 'value: 123'
            // formatter: () => item
        },
        value: 0
      }
  }))

  console.log('dd', d);

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

  const vennOption = {
    type: 'map',
    map: 'venn',
    dimension: dimension,
    emphasis: {
      disabled: true,
      // focus: 'self',
      label: {
        color: 'red'
      }
    },
    label: {
      show: true,
      formatter: (params) => {
        return params.value;
      }
    },
    // labelLayout: (params) => {
    //   const ecIns = chartIns;
    //   const ecModel = ecIns.getModel();
    //   const mapModel = ecModel.getSeriesByType('map', 0);
    //   const coordinate = mapModel.coordinateSystem;
    //   console.log('coord', coordinate, mapModel);
    // },
    selectedMode: 'multiple',
    roam: true,
    data: d
  };

  const geoOption = {
    tooltip: {
      show: true
    },
    map: 'venn',
    roam: true,
    // selectedMode: 'multiple',
    regions: regions,
    label: {
      show: false,
      formatter: (...args) => {
        console.log('args', args);
      }
    },
    emphasis: {
      focus: 'self',
      label: {
        show: false
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: '#3366ff'
      }
    }
  };
  const option = {
    // geo: geoOption,
    series: [
      // scetterOption
      vennOption
    ]
  };

  chartIns.setOption(option);
})