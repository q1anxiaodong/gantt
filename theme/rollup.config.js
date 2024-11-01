import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts', // 输入文件
  output: {
    file: 'dist/bundle.esm.js', // 输出文件
    format: 'esm', // 输出格式，可以是 'cjs', 'esm', 'iife', 'umd' 等
    sourcemap: true, // 是否生成 sourcemap,
    declaration: true,
    declarationDir: 'dist', // 声明文件输出目录
  },
  plugins: [
    resolve(), // 使 Rollup 能够解析 node_modules 中的模块
    commonjs(), // 将 CommonJS 模块转换为 ES6
    typescript(), // 处理 TypeScript 文件
    terser() // 可选：压缩输出文件
  ],
};