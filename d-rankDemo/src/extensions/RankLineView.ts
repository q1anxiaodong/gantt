import LineView from 'echarts/lib/chart/line/LineView.js';


class RankLineView extends LineView {
    static readonly type = 'dvLine';
    
    init() {
        LineView.prototype.init.apply(this);
    }

    render(seriesModel, ecModel, api) {
        debugger;
        LineView.prototype.render.apply(this, arguments);
        console.log('group', this._lineGroup, seriesModel.getData());
        console.trace('1112222');
        // this.group.add(this._lineGroup);
    }
    
    highlight(...args) {
        LineView.prototype.highlight.apply(this, args);
    }

    downplay(...args) {
        LineView.prototype.downplay.apply(this, args);
    }

    _changePolyState(...args) {
        LineView.prototype._changePolyState.apply(this, args);
    }

    _newPolyline(...args) {
        return LineView.prototype._newPolyline.apply(this, args);
    }

    _newPolygon(...args) {
        return LineView.prototype._newPolygon.apply(this, args);
    }

    _initSymbolLabelAnimation(...args) {
        LineView.prototype._initSymbolLabelAnimation.apply(this, args);
    }

    _initOrUpdateEndLabel(...args) {
        LineView.prototype._initOrUpdateEndLabel.apply(this, args);
    }

    _doUpdateAnimation(...args) {
        LineView.prototype._doUpdateAnimation.apply(this, args);
    }

    remove(...args) {
        LineView.prototype.remove.apply(this, args);
    }
}

export default RankLineView;
