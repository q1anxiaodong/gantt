class TimeLineHelper {
    /** helper对应的D3Chart图表示例 */
    _D3Ins;
    /** 图表的数据结构信息 */
    seriesInfo;
    constructor(chart, index) {
        this._D3Ins = chart;
        // 获取helper对应的图表的数据结构
        this.getSeriesInfo();
        // 初始化helper
        this.init();
        // 通过helper给图表赋最初状态
        this.initState(index);
    }
    getSeriesInfo() {
        // const D3Ins = this._D3Ins;
        // D3Ins.getModel().eachComponent('series', model => {
        //     const view = D3Ins.getViewOfComponentModel(model);
        //     const grid = model.getAxisModel('y').dependentModels.grid;
        //     const type = model.type;

        //     this.seriesInfo.push({
        //         model, view, grid, type
        //     })
        // });
    }
    init() {}
    initState() {}

}