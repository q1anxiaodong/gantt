const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function getCombinations(num) {
  const arr = Array.from({ length: num }, (_, index) => index);
  const res = [];
  const path = [];

  function dfs(i) {
    if (i === num) {
      res.push(path.slice());
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

function blendColors(colors, arr) {
  if (!arr.length) {
    return;
  }
  const itemColor = arr.map(idx => colors[idx]);
  return itemColor.reduce(blend);
}

function createRegionOptions(dimension, colors) {
  const combinations = getCombinations(dimension);
  const regions = combinations.map(item => {
    const name = item.map(idx => labels[idx]).join('');
    const blendColor = blendColors(colors, item);
    return {
      name,
      itemStyle: {
        color: blendColor,
        borderColor: 'transparent',
      }
    }
  })

  return regions;
}
