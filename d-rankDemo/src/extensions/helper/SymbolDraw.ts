import * as graphic from 'echarts/lib/util/graphic';
import SymbolClz from 'echarts/types/src/chart/helper/Symbol';
import { isObject } from 'zrender/src/core/util';
import type SeriesData from 'echarts/types/src/data/SeriesData';
import type Displayable from 'zrender/src/graphic/Displayable';
import type {
    StageHandlerProgressParams,
    LabelOption,
    SymbolOptionMixin,
    ItemStyleOption,
    ZRColor,
    AnimationOptionMixin,
    ZRStyleProps,
    StatesOptionMixin,
    BlurScope,
    DisplayState,
    DefaultEmphasisFocus
} from 'echarts/types/src/util/types';
import type { CoordinateSystemClipArea } from 'echarts/types/src/coord/CoordinateSystem';
import type Model from 'echarts/types/src/model/Model';
import type { ScatterSeriesOption } from 'echarts/types/src/scatter/ScatterSeries';
import { getLabelStatesModels } from 'echarts/lib/label/labelStyle';
import Element from 'zrender/src/Element';
import type SeriesModel from 'echarts/types/src/model/Series';
import { Rect } from 'echarts/types/src/util/graphic';

interface UpdateOpt {
    isIgnore?(idx: number): boolean
    clipShape?: CoordinateSystemClipArea & {
        shapeType: 'polar' | 'rect',
        clipMode: 'strict' | boolean
    },
    getSymbolPoint?(idx: number): number[]

    disableAnimation?: boolean
}

interface SymbolLike extends graphic.Group {
    updateData(data: SeriesData, idx: number, scope?: SymbolDrawSeriesScope, opt?: UpdateOpt): void
    fadeOut?(cb: () => void, seriesModel: SeriesModel): void
}

interface SymbolLikeCtor {
    new(data: SeriesData, idx: number, scope?: SymbolDrawSeriesScope, opt?: UpdateOpt): SymbolLike
}

function symbolNeedsDraw(data: SeriesData, point: number[], idx: number, opt: UpdateOpt) {
    return point && !isNaN(point[0]) && !isNaN(point[1])
        && !(opt.isIgnore && opt.isIgnore(idx))
        // We do not set clipShape on group, because it will cut part of
        // the symbol element shape. We use the same clip shape here as
        // the line clip.
        // && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1]))
        && data.getItemVisual(idx, 'symbol') !== 'none';
}

function normalizeUpdateOpt(opt: UpdateOpt) {
    if (opt != null && !isObject(opt)) {
        opt = {isIgnore: opt};
    }
    return opt || {};
}

interface RippleEffectOption {
    period?: number
    /**
     * Scale of ripple
     */
    scale?: number

    brushType?: 'fill' | 'stroke'

    color?: ZRColor,

    /**
     * ripple number
     */
    number?: number
}

interface SymbolDrawStateOption {
    itemStyle?: ItemStyleOption
    label?: LabelOption
}

// TODO Separate series and item?
export interface SymbolDrawItemModelOption extends SymbolOptionMixin<object>,
    StatesOptionMixin<SymbolDrawStateOption, {
        emphasis?: {
            focus?: DefaultEmphasisFocus
            scale?: boolean | number
        }
    }>,
    SymbolDrawStateOption {

    cursor?: string

    // If has ripple effect
    rippleEffect?: RippleEffectOption
}

export interface SymbolDrawSeriesScope {
    emphasisItemStyle?: ZRStyleProps
    blurItemStyle?: ZRStyleProps
    selectItemStyle?: ZRStyleProps

    focus?: DefaultEmphasisFocus
    blurScope?: BlurScope
    emphasisDisabled?: boolean

    labelStatesModels: Record<DisplayState, Model<LabelOption>>

    itemModel?: Model<SymbolDrawItemModelOption>

    hoverScale?: boolean | number

    cursorStyle?: string
    fadeIn?: boolean
}

function makeSeriesScope(data: SeriesData): SymbolDrawSeriesScope {
    const seriesModel = data.hostModel as Model<ScatterSeriesOption>;
    const emphasisModel = seriesModel.getModel('emphasis');
    return {
        emphasisItemStyle: emphasisModel.getModel('itemStyle').getItemStyle(),
        blurItemStyle: seriesModel.getModel(['blur', 'itemStyle']).getItemStyle(),
        selectItemStyle: seriesModel.getModel(['select', 'itemStyle']).getItemStyle(),

        focus: emphasisModel.get('focus'),
        blurScope: emphasisModel.get('blurScope'),
        emphasisDisabled: emphasisModel.get('disabled'),

        hoverScale: emphasisModel.get('scale'),

        labelStatesModels: getLabelStatesModels(seriesModel),

        cursorStyle: seriesModel.get('cursor')
    };
}

export type ListForSymbolDraw = SeriesData<Model<SymbolDrawItemModelOption & AnimationOptionMixin>>;

class SymbolDraw {
    group = new graphic.Group();

    private _data: ListForSymbolDraw;

    private _SymbolCtor: SymbolLikeCtor;

    private _seriesScope: SymbolDrawSeriesScope;

    private _getSymbolPoint: UpdateOpt['getSymbolPoint'];

    private _progressiveEls: SymbolLike[];

    constructor(SymbolCtor?: SymbolLikeCtor) {
        this._SymbolCtor = SymbolCtor || SymbolClz as SymbolLikeCtor;
    }

    /**
     * Update symbols draw by new data
     */
    updateData(data: ListForSymbolDraw, opt?: UpdateOpt) {
        // Remove progressive els.
        this._progressiveEls = null;

        opt = normalizeUpdateOpt(opt);

        const group = this.group;
        const seriesModel = data.hostModel;
        const oldData = this._data;
        const SymbolCtor = this._SymbolCtor;
        const disableAnimation = opt.disableAnimation;

        const seriesScope = makeSeriesScope(data);

        const symbolUpdateOpt = { disableAnimation, delay: 1000 };

        const getSymbolPoint = opt.getSymbolPoint || function (idx: number) {
            return data.getItemLayout(idx);
        };


        let symbolClipShape;
        if (opt.clipShape && opt.clipShape.clipMode === 'strict') {
            if (opt.clipShape.shapeType === 'polar') {
                const {cx, cy, r0, r, startAngle, endAngle, clockwise} = opt.clipShape;
                symbolClipShape = new graphic.Sector({
                    shape: {cx, cy, r0, r, startAngle, endAngle, clockwise}
                })
            } else {
                const {x, y, width, height} = opt.clipShape;
                symbolClipShape = new graphic.Rect({
                    shape: {x, y, width, height}
                });
            }
            this.group.setClipPath(symbolClipShape)
        } else {
            this.group.removeClipPath();
        }

        // There is no oldLineData only when first rendering or switching from
        // stream mode to normal mode, where previous elements should be removed.
        if (!oldData) {
            group.removeAll();
        }

        data.diff(oldData)
            .add(function (newIdx) {
                const point = getSymbolPoint(newIdx);
                if (symbolNeedsDraw(data, point, newIdx, opt)) {
                    const symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
                    symbolEl.setPosition(point);
                    // symbolClipShape && symbolEl.setClipPath(symbolClipShape);
                    data.setItemGraphicEl(newIdx, symbolEl);
                    group.add(symbolEl);
                }
            })
            .update(function (newIdx, oldIdx) {
                let symbolEl = oldData.getItemGraphicEl(oldIdx) as SymbolLike;

                const point = getSymbolPoint(newIdx) as number[];
                if (!symbolNeedsDraw(data, point, newIdx, opt)) {
                    group.remove(symbolEl);
                    return;
                }
                const newSymbolType = data.getItemVisual(newIdx, 'symbol') || 'circle';
                const oldSymbolType = symbolEl
                    && (symbolEl as SymbolClz).getSymbolType
                    && (symbolEl as SymbolClz).getSymbolType();

                if (!symbolEl
                    // Create a new if symbol type changed.
                    || (oldSymbolType && oldSymbolType !== newSymbolType)
                ) {
                    group.remove(symbolEl);
                    symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
                    symbolEl.setPosition(point);
                }
                else {
                    symbolEl.updateData(data, newIdx, seriesScope, symbolUpdateOpt);
                    const target = {
                        x: point[0],
                        y: point[1]
                    };
                    disableAnimation
                        ? symbolEl.attr(target)
                        : graphic.updateProps(symbolEl, target, seriesModel);
                }

                // Add back
                group.add(symbolEl);

                data.setItemGraphicEl(newIdx, symbolEl);
            })
            .remove(function (oldIdx) {
                const el = oldData.getItemGraphicEl(oldIdx) as SymbolLike;
                el && el.fadeOut(function () {
                    group.remove(el);
                }, seriesModel as SeriesModel);
            })
            .execute();

        this._getSymbolPoint = getSymbolPoint;
        this._data = data;
    };

    updateLayout() {
        const data = this._data;
        if (data) {
            // Not use animation
            data.eachItemGraphicEl((el, idx) => {
                const point = this._getSymbolPoint(idx);
                el.setPosition(point);
                el.markRedraw();
            });
        }
    };

    incrementalPrepareUpdate(data: ListForSymbolDraw) {
        this._seriesScope = makeSeriesScope(data);
        this._data = null;
        this.group.removeAll();
    };

    /**
     * Update symbols draw by new data
     */
    incrementalUpdate(taskParams: StageHandlerProgressParams, data: ListForSymbolDraw, opt?: UpdateOpt) {

        // Clear
        this._progressiveEls = [];

        opt = normalizeUpdateOpt(opt);

        function updateIncrementalAndHover(el: Displayable) {
            if (!el.isGroup) {
                el.incremental = true;
                el.ensureState('emphasis').hoverLayer = true;
            }
        }
        for (let idx = taskParams.start; idx < taskParams.end; idx++) {
            const point = data.getItemLayout(idx) as number[];
            if (symbolNeedsDraw(data, point, idx, opt)) {
                const el = new this._SymbolCtor(data, idx, this._seriesScope);
                el.traverse(updateIncrementalAndHover);
                el.setPosition(point);
                this.group.add(el);
                data.setItemGraphicEl(idx, el);
                this._progressiveEls.push(el);
            }
        }
    };

    eachRendered(cb: (el: Element) => boolean | void) {
        graphic.traverseElements(this._progressiveEls || this.group, cb);
    }

    remove(enableAnimation?: boolean) {
        const group = this.group;
        const data = this._data;
        // Incremental model do not have this._data.
        if (data && enableAnimation) {
            data.eachItemGraphicEl(function (el: SymbolLike) {
                el.fadeOut(function () {
                    group.remove(el);
                }, data.hostModel as SeriesModel);
            });
        }
        else {
            group.removeAll();
        }
    };

}

export default SymbolDraw;