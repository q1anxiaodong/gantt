import * as fs from 'fs';
import path from 'path';
import { parseExcel } from './util/excel.js';
import { wineMap } from './config/schema.js';

/**
 * Excel转JSON：https://www.bejson.com/json/col2json/
 */

const xlsxPath = './script/assets/公司对比数据.xlsx';
const sheets = parseExcel(path.resolve(xlsxPath));
/** 单表上前两行内容为表头 */
const SCHEMALEN = 2;
const SHEET_INDEX = {
  白酒行业近十年净利润: 0,
  光伏行业近十年总市值: 1,
  半导体行业近十年净利润: 2
};

// 表头-索引映射
const SCHEMA_INDEX = {
  STOCKCODE: 0,
  STOCKNAME: 1,
  CURRPRICE: 2,
  INDUSTRY: 4,
  PROFIT2022: 19,
  PROFIT2021: 20,
  PROFIT2020: 21,
  PROFIT2019: 22,
  PROFIT2018: 23,
  PROFIT2017: 24,
  PROFIT2016: 25,
  PROFIT2015: 26,
  PROFIT2014: 27,
  PROFIT2013: 28,
};

const parse = () => {
  const wineSheet = sheets[SHEET_INDEX.白酒行业近十年净利润].slice(SCHEMALEN);
  const keys = Object.keys(wineMap);

  return wineSheet.map(dataItem => {
    const item = {};
    keys.forEach(key => {
      const idx = wineMap[key];
      if (Array.isArray(idx)) {
        item[key] = idx.map(i => dataItem[i]);
      } else {
        item[key] = dataItem[idx];
      }
    });
    return item;
  }).filter(item => item['stockCode'] != null);
}

const wineData = parse();

fs.writeFileSync(
  './script/assets/wineData.ts',
  'export default ' + JSON.stringify(wineData, 'undefined', 2) + ';'
);

