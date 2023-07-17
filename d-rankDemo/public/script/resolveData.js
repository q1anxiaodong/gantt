import wineData from "./assets/wineData.js";

const xAxisData = [2013, 2014, 2015, 2016, 2017, 2018, 2019];
const yAxisData = Array(wineData.length).fill(0).map((_, index) => index + 1 + '').reverse();
// console.log('y', yAxisData);
const prePare = () => {

    const incomeMatrix = wineData.map(item => item.incomes);
    incomeMatrix[0].forEach((_, colIndex) => {
        const columData = incomeMatrix.map((item, rowIndex) => {
            return {
                value: item[colIndex],
                row: rowIndex,
            }
        });
        columData.sort((a, b) => {
            return b.value - a.value;
        }).forEach((item, index) => {
            const rowIndex = item.row;
            wineData[rowIndex].incomes[colIndex] = {
                value: index + 1 + '',
                year: xAxisData[colIndex],
                rank: index + 1,
                data: wineData[rowIndex].incomes[colIndex]
            };
        });
    });
}

const mockData = () => {
    let xAxisData = [];
    let tmp = [];
    let seriesData = Array(10).fill(Array(100));
    const yAxisData = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]))
    }

    for (let i = 0; i < 100; i += 1) {
        xAxisData.push('A' + i);
        const arr = shuffleArray(yAxisData.slice()).slice();
        tmp.push(arr);
    }
    tmp = transpose(tmp);
    seriesData.forEach((series, idx) => {
        seriesData[idx] = tmp[idx].map((item, index) => {
            return {
                value: item + '',
                rank: item + '',
                data: item,
                year: xAxisData[index]
            }
        })
    })
    return {
        xAxisData, yAxisData, wineData: seriesData
    }
};
// prePare();

// export default { xAxisData: xAxisData, yAxisData: yAxisData, wineData: wineData };

export default mockData();
