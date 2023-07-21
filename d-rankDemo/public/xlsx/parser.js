import * as fs from 'fs';
import path from 'path';
import { parseExcel } from './util/excel.js';


const xlsxPathMap = {
    ths: './public/xlsx/assets/同花顺十大股东.xlsx',
    rb: './public/xlsx/assets/日播时尚十大股东数据.xlsx',
    kl: './public/xlsx/assets/昆仑万维.xlsx',
};

Object.keys(xlsxPathMap).forEach(key => {
    const sheetPath = xlsxPathMap[key];
    const sheets = parseExcel(path.resolve(sheetPath));

    fs.writeFileSync(
        `./public/xlsx/assets/sheet_${key}.js`,
        'export default ' + JSON.stringify(sheets, undefined, 2)
    );
})