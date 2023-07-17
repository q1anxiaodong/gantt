import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

function parseMergeCell(merges, row, row_start, i) {
  let isMerged = false;
  // 判断是否位于合并单元格范围内
  merges.forEach(merge => {
    if (merge.s.r <= row_start && merge.s.c <= i && merge.e.r >= row_start && merge.e.c >= i) {
      row.push(
        typeof merge.v !== 'undefined' && typeof merge.v.v !== 'undefined' ? merge.v.v : null
      );
      isMerged = true;
    }
  });
  if (!isMerged) {
    row.push(null);
  }
  // 数字，这个可能是日期
  // 详见：https://www.npmjs.com/package/xlsx ，搜索“Cell Object”
  // } else if ('n' === cell.t && i === INDEX_OF_DUEDATE) {
  //   // 接口只支持YYYY-MM-DD格式的日期
  //   let date = cell.w.replace(new RegExp('/', 'g'), '-');
  //   row.push(date);
}

/**
 * 解析单个单元格
 */
function parseCell(cell, merges, row_start, row, i) {
  // 合并单元格的最左上角一定就是其值
  if (cell !== undefined && merges) {
    merges.forEach(merge => {
      if (merge.s.r === row_start && merge.s.c === i) {
        merge.v = cell;
      }
    });
  }

  if (cell === undefined) {
    if (merges) {
      parseMergeCell(merges, row, row_start, i);
    } else {
      row.push(null);
    }
  } else {
    row.push(cell.v);
  }
}

/**
 * 解析单个标签页
 * @param {*} sheet
 * @returns
 */
function parseSheet(sheet) {
  if (!sheet['!ref']) {
    console.log('该sheet页无内容，无需解析');
    return null;
  }
  const range = XLSX.utils.decode_range(sheet['!ref']),
    merges = sheet['!merges'],
    // 手动设置下，自动读取的有误，太长了
    row_end = 335,
    col_start = range.s.c,
    col_end = range.e.c,
    rows_data = [];
  let row_start = 0;
  for (; row_start <= row_end; row_start++) {
    const row = [];
    for (let i = col_start; i <= col_end; i++) {
      const addr = XLSX.utils.encode_col(i) + XLSX.utils.encode_row(row_start);
      const cell = sheet[addr];
      parseCell(cell, merges, row_start, row, i);
    }
    rows_data.push(row);
  }
  return rows_data;
}

function parseExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const totalSheets = [];
  workbook.SheetNames.forEach(function (name) {
    const sheet = workbook.Sheets[name];
    const items = parseSheet(sheet);
    if (items) {
      totalSheets.push(items);
    }
  });
  return totalSheets;
}

export { parseExcel };
