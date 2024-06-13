const header = `
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="600" height="600" version="1.1"
     xmlns="http://www.w3.org/2000/svg">

`

const footer = `</svg>`

const dimIndex = 7;

const pathAll = path_all[dimIndex - 1];

const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const colors = ['#FCE7CC', '#F1D5FA', '#E1D4FC', '#D7DBFC', '#D1E5FA', '#D0F1F2', '#FDF1CC'];

const data = pathAll.map((p, pId) => {
  const path_group = [];
  const path_color = [];
  Array.from({length: dimIndex}, (_, cId) => {
    if (indices[dimIndex - 1][cId].some(x => x === pId)) {
      path_group.push(labels[cId]);
      path_color.push(colors[cId]);
    }
  });

  return {
    group: path_group,
    color: path_color
  }
});

// const blendColor = data.map((datum) => {
//   function blend(a, b) {
//     // 1.分格式解析颜色
//     // 2.ab两色的rgb分别对应相乘/255
//     return chroma.blend(a, b, 'multiply').hex();
//   }

//   return datum.color.length > 0 ? datum.color.reduce(blend) : undefined;
// });

const content = pathAll.map((p, i) => {

  return `
  <path name="${data[i].group.join('')}" d="${p}"></path>
  `;
}).join('\n');

console.log(header + content + footer);


