import fs from 'fs';
import pkg from 'svg-path-parser';
// 引入svg-arc-to-cubic-bezier库
import arcToBezier from 'svg-arc-to-cubic-bezier';
import { path_all } from './path_all.js';

const { parseSVG, makeAbsolute } = pkg;

// 样本SVG数组
const svgPaths = [
  'M180.18,95.66a164.76,164.76,0,0,1,67.44-73.14l-.24-.15C188.05-12.89,111.15-5.23,58.72,38.92,10.54,79.48-10.72,145.61,5.24,206.55,21.68,269.3,75.72,318.16,139.84,328c37.44,5.76,75.35-2.27,107.31-20.67a184,184,0,0,1-19.09-13C168.54,247.88,148.45,164.21,180.18,95.66Z',
];

function generateSVGPath(commands) {
  return commands
    .map((cmd) => {
      switch (cmd.code) {
        case 'M':
          return `${cmd.code}${cmd.x},${cmd.y}`;
        case 'L':
          return `${cmd.code}${cmd.x},${cmd.y}`;
        case 'H':
          return `${cmd.code}${cmd.x}`;
        case 'V':
          return `${cmd.code}${cmd.y}`;
        case 'C':
          return `${cmd.code}${cmd.x1},${cmd.y1},${cmd.x2},${cmd.y2},${cmd.x},${cmd.y}`;
        case 'S':
          return `${cmd.code}${cmd.x2},${cmd.y2},${cmd.x},${cmd.y}`;
        case 'Q':
          return `${cmd.code}${cmd.x1},${cmd.y1},${cmd.x},${cmd.y}`;
        case 'T':
          return `${cmd.code}${cmd.x},${cmd.y}`;
        case 'A':
          return `${cmd.code}${cmd.rx},${cmd.ry},${cmd.xAxisRotation},${cmd.largeArcFlag},${cmd.sweepFlag},${cmd.x},${cmd.y}`;
        case 'Z':
          return `${cmd.code}`;
        default:
          return '';
      }
    })
    .join(' ');
}

function convertArcToCubicBezier(path) {
  // 将SVG路径解析为绝对路径的命令数组
  const absoluteDefs = makeAbsolute(parseSVG(path));
  // 将弧线转换为若干个贝塞尔曲线
  for (let i = absoluteDefs.length - 1; i >= 0; i--) {
    const def = absoluteDefs[i];
    if (def.code === 'A') {
      const bezierRes = arcToBezier({
        px: def.x0,
        py: def.y0,
        cx: def.x,
        cy: def.y,
        rx: def.rx,
        ry: def.ry,
        xAxisRotation: def.xAxisRotation,
        largeArcFlag: def.largeArc,
        sweepFlag: def.sweep,
      });
      const bezierDefs = bezierRes.map((bezierDef, i) => ({
        code: 'C',
        command: 'curveto',
        x1: bezierDef.x1,
        y1: bezierDef.y1,
        x2: bezierDef.x2,
        y2: bezierDef.y2,
        x: bezierDef.x,
        y: bezierDef.y,
        relative: false,
        x0: i === 0 ? def.x0 : bezierRes[i - 1].x,
        y0: i === 0 ? def.y0 : bezierRes[i - 1].y,
      }));
      // 替换弧线命令为贝塞尔曲线命令
      absoluteDefs.splice(i, 1, ...bezierDefs);
    }
  }
  // 生成新的SVG路径
  return generateSVGPath(absoluteDefs);
}

const result = path_all.map((paths) => {
  return paths.map((path) => {
    return convertArcToCubicBezier(path);
  });
});

// 将结果保存到result.json文件
fs.writeFileSync('./result.json', JSON.stringify(result, null, 2));
