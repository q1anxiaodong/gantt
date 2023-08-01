import ChartView from 'echarts/lib/view/Chart.js';
import * as graphic from 'echarts/lib/util/graphic.js';


class ExampleView extends ChartView {
    static readonly type = 'dvExample';

    _exampleGroup: graphic.Group;
    init() {
        const exampleGroup = new graphic.Group();
        this._exampleGroup = exampleGroup;
    }

    render(seriesModel, ecModel, api) {
        // 更新、初始化视图元素
        const exampleRect = new graphic.Text({
            x: 300,
            y: 200,
            style: {
                fill: '#fff',
                text: '你已经扩展了一个新的echarts系列',
                fontSize: 20,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                padding: 50
            }
        });
        this._exampleGroup.add(exampleRect);
        this.group.add(this._exampleGroup);
        console.log('渲染完成啦！', this.group);
    }

    highlight(...args) {
        // 处理高亮
    }

    downplay(...args) {
        // 处理淡化
    }

    remove(...args) {
        // 处理对象销毁
    }
}

export default ExampleView;
