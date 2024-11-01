function parseData (rawData, key) {
  const map = new Map();
  let dimension = rawData.length;

  for(let i = 0; i < dimension; i++) {
    const curDim = labels[i];
    const curList = rawData[i];
    const curListLen = curList.length;
    for(let j = 0; j < curListLen; j++) {
      const elKey = curList[j][key];
      const el = curList[j];
      if (!elKey) {
        continue;
      }
      if (map.has(elKey)) {
        map.set(elKey, map.get(elKey) + curDim);
      } else {
        map.set(elKey, curDim);
      }
    }
  }

  console.log('map', map);
  const mapArr = Array.from(map);
  return Array.from({length: map.size}, (_, idx) => [undefined, undefined, ...mapArr[idx]]);
}