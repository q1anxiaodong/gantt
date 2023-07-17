import * as fs from 'fs';
import path from 'path';
import { parseExcel } from './util/excel.js';


const xlsxPath = './public/xlsx/assets/同花顺持股量.xlsx';
const sheets = parseExcel(path.resolve(xlsxPath));

fs.writeFileSync(
    './public/xlsx/assets/sheets.js',
    'export default ' + JSON.stringify(sheets, undefined, 2)
);