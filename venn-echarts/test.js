/** 集合的标签(最多7个) */
const labels = ["A", "B", "C", "D", "E", "F", "G"];

/** 获取集合交集标签的全组合 */
function getCombinations(arr) {
  const len = arr.length;
  const res = [];
  const path = [];

  function dfs(i) {
    if (i === len) {
      res.push(path.slice().join(""));
      return;
    }

    // 不选
    dfs(i + 1);

    // 选
    path.push(arr[i]);
    dfs(i + 1);
    path.pop();
  }

  dfs(0);
  return res;
}

/** 根据指定的键(我这里是name)遍历数据(股票)  复杂度大约是m * n */
function parseData(rawData, key) {
  // 股票到交集的映射
  const stockToCombinationMap = new Map();
  // 交集到股票的映射
  const combinationToStockMap = new Map();
  let dimension = rawData.length;
  


  // 遍历所有集合
  for (let i = 0; i < dimension; i++) {
    // 记录当前集合下的标签
    const curDim = labels[i];
    const curList = rawData[i];
    const curListLen = curList.length;
    // 遍历当前集合下的股票
    for (let j = 0; j < curListLen; j++) {
      // 获取当前股票的指定键值
      const elKey = curList[j][key];
      if (!elKey) {
        // 如果当前股票没有指定键值，则默认当前股票数据无效
        continue;
      }
      // 如果map中已经有该股票，则获取该股票对应的交集，并将当前集合对应的标签添加到交集
      if (stockToCombinationMap.has(elKey)) {
        stockToCombinationMap.set(elKey, stockToCombinationMap.get(elKey) + curDim);
      } else {
        // 如果map中没有该股票，则将当前集合对应的标签作为交集
        stockToCombinationMap.set(elKey, curDim);
      }
    }
  }

  // 翻转map (股票到交集的映射)到(交集到股票的映射)
  for (const [stock, combination] of stockToCombinationMap) {
    if (!combinationToStockMap.has(combination)) {
      combinationToStockMap.set(combination, [stock]);
    } else {
      combinationToStockMap.get(combination).push(stock);
    }
  }

  

  console.log("交集到股票的映射", combinationToStockMap);
  console.log("股票到交集的映射", stockToCombinationMap);
  return combinationToStockMap;
}

// 获取集合标签的全组合
console.log('集合标签的全组合', getCombinations(labels));

// 解析模拟的数据
// 模拟的数据是一个二维数组，外层表示集合，内层表示集合中的股票
parseData(getMockData(7), 'name');
