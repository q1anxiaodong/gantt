import * as fs from 'fs';
import path from 'path';
import sheetThs from './assets/sheet_ths.js'
import sheetRb from './assets/sheet_rb.js'
import sheetKl from './assets/sheet_kl.js'

// console.log('xlsx', sheets[0]);

/** 表格前一行内容为表头 */
const SCHEMALEN = 1;
// 静态数据集映射表
const sheetMap = {
    ths: sheetThs,
    rb: sheetRb,
    kl: sheetKl
};
const dataMap = {
    date: 0,
    name: 1,
    stockValue: 2,
    stockPercent: 3,
    link: 4,
    pic: 5
};

function getDateAfter18991230(nDays) {
    const baseDate = new Date(1899, 11, 30);

    const resultDate = new Date(baseDate);
    resultDate.setDate(baseDate.getDate() + nDays);

    const yyyy = resultDate.getFullYear();
    const mm = (resultDate.getMonth() + 1).toString().padStart(2, '0');
    const dd = resultDate.getDate().toString().padStart(2, '0');

    return `${yyyy}/${mm}/${dd}`;
}

const parse = (sheets) => {
    const dataSheet = sheets[0].slice(SCHEMALEN);
    const keys = Object.keys(dataMap);
    const baseDate = new Date();
    baseDate.setFullYear(1899, 12, 30);
    let rank = 0;
    let curr;
    return dataSheet.filter(item => item[0] != null && item[1] != null && item[2] != null && item[3] != null)
        .map((dataItem, index) => {
            if (curr !== dataItem[0]) {
                curr = dataItem[0];
                rank = 1;
            }
            const item = {
                rank: '' + rank++
            };
            keys.forEach(key => {
                const idx = dataMap[key];
                item[key] = dataItem[idx];
                if (key === 'stockValue') {
                    item[key] = Number(item[key].replace(/,/g, ''));
                }
                if (key === 'date') {
                    const currDate = new Date();
                    currDate.setDate(baseDate.getDate() + item[key]);
                    item[key] = getDateAfter18991230(item[key]);
                    // console.log('date', item[key], dataItem[idx]);
                }
                if (key === 'rank') {
                    item[key] = '' + item[key];
                }
                if (key === 'link') {
                    item[key] = item[key] === 42 ? null : item[key];
                }
            });
            return item;
        })
}

const getXAxisData = (raw) => {
    let xData = Array.from(new Set(raw.map(item => item['date'])));
    xData.sort((a, b) => a.date > b.date);
    return xData;
}

const getYAxisData = (raw) => {
    const count = 20;
    const yData = [];
    for (let i = count; i > 0; i--) {
        yData.push(i + '');
    }
    return yData;
}

const getSeriesData = (raw, xData) => {
    const seriesData = new Map();
    const seriesNames = [...new Set(raw.map(obj => obj.name))];
    const extent = [Infinity, -Infinity];


    xData.forEach((x, xIdx) => {
        // const curr = raw.filter(item => item['date'] === x).sort((a, b) => a['rank'] - b['rank']);
        const curr = raw.filter(item => item['date'] === x);
        const curLen = curr.length;
        extent[0] = Math.min(extent[0], curr[curLen - 1]['stockValue']);
        extent[1] = Math.max(extent[1], curr[0]['stockValue']);
    })

    seriesNames.forEach(name => {
        const arr = Array.from({length: xData.length}).fill({
            name: name,
            value: seriesNames.length + '',
            extent: extent
        });
        seriesData.set(name, arr);
    })


    xData.forEach((x, xIdx) => {
        const curr = raw.filter(item => item['date'] === x);
        curr.forEach((datum, rankIdx) => {
            seriesData.get(datum['name'])[xIdx] = {
                ...datum,
                value: datum['rank'],
                extent: extent
            };
        })
    });

    return { seriesData, extent };
}

const main = (sheetKey) => {
    const sheet = sheetMap[sheetKey]; 
    console.log('sheet', sheet);
    const rawData = parse(sheet);
    const xData = getXAxisData(rawData);
    const yData = getYAxisData(rawData);
    const { seriesData, extent } = getSeriesData(rawData, xData);
    return {
        xData, yData, seriesData, extent
    }
};

export default main;

