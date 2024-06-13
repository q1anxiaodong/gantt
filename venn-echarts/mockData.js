const rawData = [
  {
    "code": "600866.SH",
    "name": "星湖科技",
    "industry": "基础化工",
    "price_change": -0.982
  },
  {
    "code": "003020.SZ",
    "name": "立方制药",
    "industry": "医药生物",
    "price_change": 1.903
  },
  {
    "code": "600315.SH",
    "name": "上海家化",
    "industry": "美容护理",
    "price_change": 2.134
  },
  {
    "code": "605169.SH",
    "name": "洪通燃气",
    "industry": "公用事业",
    "price_change": -4.686
  },
  {
    "code": "603836.SH",
    "name": "海程邦达",
    "industry": "交通运输",
    "price_change": -2.215
  },
  {
    "code": "003023.SZ",
    "name": "彩虹集团",
    "industry": "家用电器",
    "price_change": -0.604
  },
  {
    "code": "002026.SZ",
    "name": "山东威达",
    "industry": "机械设备",
    "price_change": 1.812
  },
  {
    "code": "002139.SZ",
    "name": "拓邦股份",
    "industry": "电子",
    "price_change": 0
  },
  {
    "code": "832000.BJ",
    "name": "安徽凤凰",
    "industry": "交运设备",
    "price_change": -0.459
  },
  {
    "code": "300532.SZ",
    "name": "今天国际",
    "industry": "计算机",
    "price_change": 2.018
  },
  {
    "code": "600592.SH",
    "name": "龙溪股份",
    "industry": "机械设备",
    "price_change": 0.285
  },
  {
    "code": "301222.SZ",
    "name": "浙江恒威",
    "industry": "电力设备",
    "price_change": -1.454
  },
  {
    "code": "000779.SZ",
    "name": "甘咨询",
    "industry": "建筑装饰",
    "price_change": -2.434
  },
]

/**
 * 模拟数据
 * @param {number} dimension 
 * @returns 
 * @example
 * [
 *    [
 *      {股票1信息},
 *      {股票2信息},
 *      {股票3信息},
 *    ],
 *    [
 *      {股票1信息},
 *      {股票3信息},
 *      {股票4信息},
 *    ],
 *    [
 *      {股票2信息},
 *      {股票4信息},
 *      {股票5信息},
 *    ],
 * ]
 */
function getMockData(dimension) {
  const res = Array.from({length: dimension}, () => {
    let start = Math.floor(Math.random() * rawData.length);
    let end = Math.floor(Math.random() * rawData.length);
    if (start > end) {
      let tmp = start;
      start = end;
      end = tmp;
    }
    return rawData.slice(start, end);
  })
  return res;
}