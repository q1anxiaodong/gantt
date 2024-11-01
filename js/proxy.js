const obj1 = {
  last: {
    seriesName: "",
    xAxisName: "",
  },
};

const handler = {
  set(target, property, value) {
    const oldValue = target[property];
    if (oldValue !== value) {
      console.log(`有新的${property}被赋值，旧：${oldValue}, 新：${value}`);
      target[property] = value;
      return true;
    }
    return false;
  },
};

const obj1Proxy = new Proxy(obj1, handler);

setInterval(() => {
    obj1Proxy.last = 2;
}, 1)
