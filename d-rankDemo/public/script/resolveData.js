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
prePare();

export default { xAxisData: xAxisData, yAxisData: yAxisData, wineData: wineData };
