import rawData from './assets/rawData';
import type { Industry } from '../../src/types/rawData';
import { HashMap } from 'zrender/src/core/util';
import { stringify } from 'zrender/src/tool/color';

const getXAxisData = (raw: Array<Industry>) => {
    let xData = Array.from(new Set(raw.map(item => item.time)));
    xData.sort((a: string, b: string) => {return a > b ? 1: -1});
    // console.log('xData', xData);
    
    return xData;
}

const getYAxisData = () => {
    const count = 10;
    const yData = [];
    for (let i = count; i > 0; i--) {
        yData.push(i + '');
    }
    // console.log('yData', yData);
    
    return yData;
}

const getSeriesData = (raw: Array<Industry>, xData: string[]) => {
    const seriesData = new HashMap<[], string>();
    const extent = [Infinity, -Infinity];

    xData.forEach((x, xIdx) => {
        const curr = raw.filter(item => item.time === x).sort((a, b) => b.value - a.value);
        extent[0] = Math.min(extent[0], curr[curr.length - 1].value);
        extent[1] = Math.max(extent[1], curr[0].value);
    });

    xData.forEach((x, xIdx) => {
        const curr = raw.filter(item => item.time === x).sort((a, b) => b.value - a.value);
        // extent[0] = Math.min(extent[0], curr[curr.length - 1].value);
        // extent[1] = Math.max(extent[1], curr[0].value);
        // console.log('curr', curr);
        curr.forEach((datum, rankIdx) => {
            if (!seriesData.hasKey(datum.name)) {
                const arr = Array.from({length: xData.length});
                seriesData.set(datum.name, arr);
            }
            seriesData.get(datum.name)[xIdx] = {
                name: datum.name,
                data: datum.value,
                rank: rankIdx + 1,
                value: rankIdx + 1 + '',
                time: datum.time,
                extent: extent
            };
        })
    });

    return {seriesData, extent};
}


const main = (raw: Array<Industry>) => {
    const xData = getXAxisData(raw);
    const yData = getYAxisData();
    const {seriesData, extent} = getSeriesData(raw, xData);
    return {
        xData, yData, seriesData, extent
    };
}

export default main(rawData);