// 色彩重叠策略1 直接叠加
function multiply(a, b) {
  return a * b / 255;
}

function blend(a, b) {
  const arr1 = zrender.color.parse(a);
  const arr2 = zrender.color.parse(b);
  let val = '';
  for(let i = 0; i < 3; i++) {
    val += multiply(arr1[i], arr2[i]) + ', '
  }
  const res = `rgba(${val}1)`;
  return res;
}