import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const filePath = './public/csv/assets/index_data_3d.csv';

const SCHEMA_INDEX = {
    index_code: 2,
    index_name: 3,
    send_time: 5,
    attention_rate: 6,
    mkt_code_quo: 7 
};

const filterData = (raw) => {
    return raw.filter((item) => {
         if (
             isNaN(parseInt(item.index_code))
             || isNaN(parseFloat(item.attention_rate))
             || isNaN(parseFloat(item.mkt_code_quo))
             || item.index_name == null
             || item.send_time == null
             ) {
                 return false;
             }
         if (item.index_code.slice(0, 3) !== '881') {
             return false;
         }
         if (item.mkt_code_quo !== '48') {
             return false;
         }
         return true;
     })
 }
 
 const mapData  = (raw) => {
     return raw.map(item => {
         return {
             code: item.index_code,
             name: item.index_name,
             time: item.send_time,
             value: parseFloat(item.attention_rate)
         }
     })
 }

const jsonData = []; // 用于存储解析后的数据

fs.createReadStream(path.resolve(filePath))
  .pipe(csv())
  .on('data', (row) => {
    // 处理每一行的数据
    jsonData.push(row);
  })
  .on('end', () => {

    // 将数据转换为JSON格式
    const filted = filterData(jsonData);
    const mapped = mapData(filted);
    const jsonContent = JSON.stringify(mapped, null, 2);

    console.log('CSV文件解析完成。');


    // 将JSON数据写入文件
    fs.writeFileSync('./public/csv/assets/rawData.ts',
    "import type { Industry } from '../../../src/types/rawData';\r\nexport default " + 
    jsonContent + " as Array<Industry>",
     (err) => {
      if (err) {
        console.error('写入文件时发生错误：', err);
        return;
      }
      console.log('JSON数据已成功写入output.json文件。');
    });
  });