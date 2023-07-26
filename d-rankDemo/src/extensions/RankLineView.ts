// @ts-ignore
import LineView from 'echarts/lib/chart/line/LineView.js';
import * as zrUtil from 'zrender/src/core/util';
import type SymbolDraw from 'echarts/lib/chart/helper/SymbolDraw';
import SymbolClz from 'echarts/lib/chart/helper/Symbol';
import lineAnimationDiff from './lineAnimationDiff';
import * as graphic from 'echarts/lib/util/graphic';
import * as modelUtil from 'echarts/lib/util/model';
import { EPolyline as ECPolyline, ECPolygon } from './poly';
import  ChartView from 'echarts/lib/view/Chart';
import { prepareDataCoordInfo, getStackedOnPoint } from 'echarts/lib/chart/line/helper';
import { createGridClipPath, createPolarClipPath } from './helper/createClipPathFromCoordSys';
import type { RankLineSeriesModelType as LineSeriesModel } from './RankLineSeries';
import type LineSeriesOption from './RankLineSeries';
import type GlobalModel from 'echarts/types/src/model/Global';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI';
// TODO
import type Cartesian2D from 'echarts/types/src/coord/cartesian/Cartesian2D';
import type Polar from 'echarts/types/src/coord/polar/Polar';
import type SeriesData from 'echarts/types/src/data/SeriesData';
import type {
    Payload,
    Dictionary,
    ColorString,
    ECElement,
    DisplayState,
    LabelOption,
    ParsedValue
} from 'echarts/types/src/util/types';
import type OrdinalScale from 'echarts/types/src/scale/Ordinal';
import type Axis2D from 'echarts/types/src/coord/cartesian/Axis2D';
// import { CoordinateSystemClipArea } from 'echarts/lib/coord/CoordinateSystem';
import { setStatesStylesFromModel, setStatesFlag, toggleHoverEmphasis, SPECIAL_STATES } from 'echarts/lib/util/states';
import type Model from 'echarts/types/src/model/Model';
import { setLabelStyle, getLabelStatesModels, labelInner } from 'echarts/lib/label/labelStyle';
import { getDefaultLabel, getDefaultInterpolatedLabel } from 'echarts/lib/chart/helper/labelHelper';

import { getECData } from 'echarts/lib/util/innerStore';
import { createFloat32Array } from 'echarts/lib/util/vendor';
import { convertToColorString } from 'echarts/lib/util/format';
import { lerp } from 'zrender/src/tool/color';
import Element from 'zrender/src/Element';
import type { CoordinateSystem } from 'echarts/types/src/coord/CoordinateSystem';
import { createSymbol } from 'echarts/lib/util/symbol';

// const __DEV__ = undefined;

function isCoordinateSystemType<T extends CoordinateSystem, S = T['type']>(
    coordSys: CoordinateSystem, type: S
): coordSys is T {
    return (coordSys.type as unknown as S) === type;
}

type PolarArea = ReturnType<Polar['getArea']>;
type Cartesian2DArea = ReturnType<Cartesian2D['getArea']>;
interface SymbolExtended extends SymbolClz {
    __temp: boolean,
    isSymbol: true
}

interface ColorStop {
    offset: number
    coord?: number
    color: ColorString
}

function isPointsSame(points1: ArrayLike<number>, points2: ArrayLike<number>) {
    if (points1.length !== points2.length) {
        return;
    }
    for (let i = 0; i < points1.length; i++) {
        if (points1[i] !== points2[i]) {
            return;
        }
    }
    return true;
}

function bboxFromPoints(points: ArrayLike<number>) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < points.length;) {
        const x = points[i++];
        const y = points[i++];
        if (!isNaN(x)) {
            minX = Math.min(x, minX);
            maxX = Math.max(x, maxX);
        }
        if (!isNaN(y)) {
            minY = Math.min(y, minY);
            maxY = Math.max(y, maxY);
        }
    }
    return [
        [minX, minY],
        [maxX, maxY]
    ];
}

function getBoundingDiff(points1: ArrayLike<number>, points2: ArrayLike<number>): number {

    const [min1, max1] = bboxFromPoints(points1);
    const [min2, max2] = bboxFromPoints(points2);

    // Get a max value from each corner of two boundings.
    return Math.max(
        Math.abs(min1[0] - min2[0]),
        Math.abs(min1[1] - min2[1]),

        Math.abs(max1[0] - max2[0]),
        Math.abs(max1[1] - max2[1])
    );
}

function getSmooth(smooth: number | boolean) {
    return zrUtil.isNumber(smooth) ? smooth : (smooth ? 0.5 : 0);
}

function getStackedOnPoints(
    coordSys: Cartesian2D | Polar,
    data: SeriesData,
    dataCoordInfo: ReturnType<typeof prepareDataCoordInfo>
) {
    if (!dataCoordInfo.valueDim) {
        return [];
    }

    const len = data.count();
    const points = createFloat32Array(len * 2);
    for (let idx = 0; idx < len; idx++) {
        const pt = getStackedOnPoint(dataCoordInfo, coordSys, data, idx);
        points[idx * 2] = pt[0];
        points[idx * 2 + 1] = pt[1];
    }

    return points;
}

function turnPointsIntoStep(
    points: ArrayLike<number>,
    coordSys: Cartesian2D | Polar,
    stepTurnAt: 'start' | 'end' | 'middle',
    connectNulls: boolean
): number[] {
    const baseAxis = coordSys.getBaseAxis();
    const baseIndex = baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1;

    const stepPoints: number[] = [];
    let i = 0;
    const stepPt: number[] = [];
    const pt: number[] = [];
    const nextPt: number[] = [];
    const filteredPoints = [];
    if (connectNulls) {
        for (i = 0; i < points.length; i += 2) {
            if (!isNaN(points[i]) && !isNaN(points[i + 1])) {
                filteredPoints.push(points[i], points[i + 1]);
            }
        }
        points = filteredPoints;
    }
    for (i = 0; i < points.length - 2; i += 2) {
        nextPt[0] = points[i + 2];
        nextPt[1] = points[i + 3];
        pt[0] = points[i];
        pt[1] = points[i + 1];
        stepPoints.push(pt[0], pt[1]);

        switch (stepTurnAt) {
            case 'end':
                stepPt[baseIndex] = nextPt[baseIndex];
                stepPt[1 - baseIndex] = pt[1 - baseIndex];
                stepPoints.push(stepPt[0], stepPt[1]);
                break;
            case 'middle':
                const middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
                const stepPt2 = [];
                stepPt[baseIndex] = stepPt2[baseIndex] = middle;
                stepPt[1 - baseIndex] = pt[1 - baseIndex];
                stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
                stepPoints.push(stepPt[0], stepPt[1]);
                stepPoints.push(stepPt2[0], stepPt2[1]);
                break;
            default:
                // default is start
                stepPt[baseIndex] = pt[baseIndex];
                stepPt[1 - baseIndex] = nextPt[1 - baseIndex];
                stepPoints.push(stepPt[0], stepPt[1]);
        }
    }
    // Last points
    stepPoints.push(points[i++], points[i++]);
    return stepPoints;
}

/**
 * Clip color stops to edge. Avoid creating too large gradients.
 * Which may lead to blurry when GPU acceleration is enabled. See #15680
 *
 * The stops has been sorted from small to large.
 */
function clipColorStops(colorStops: ColorStop[], maxSize: number): ColorStop[] {
    const newColorStops: ColorStop[] = [];
    const len = colorStops.length;
    // coord will always < 0 in prevOutOfRangeColorStop.
    let prevOutOfRangeColorStop: ColorStop;
    let prevInRangeColorStop: ColorStop;

    function lerpStop(stop0: ColorStop, stop1: ColorStop, clippedCoord: number) {
        const coord0 = stop0.coord as number;
        const p = (clippedCoord - coord0) / (stop1.coord as number - coord0);
        const color = lerp(p, [stop0.color, stop1.color]) as string;
        return { coord: clippedCoord, color } as ColorStop;
    }

    for (let i = 0; i < len; i++) {
        const stop = colorStops[i];
        const coord = stop.coord;
        if (coord < 0) {
            prevOutOfRangeColorStop = stop;
        }
        else if (coord > maxSize) {
            if (prevInRangeColorStop) {
                newColorStops.push(lerpStop(prevInRangeColorStop, stop, maxSize));
            }
            else if (prevOutOfRangeColorStop) { // If there are two stops and coord range is between these two stops
                newColorStops.push(
                    lerpStop(prevOutOfRangeColorStop, stop, 0),
                    lerpStop(prevOutOfRangeColorStop, stop, maxSize)
                );
            }
            // All following stop will be out of range. So just ignore them.
            break;
        }
        else {
            if (prevOutOfRangeColorStop) {
                newColorStops.push(lerpStop(prevOutOfRangeColorStop, stop, 0));
                // Reset
                prevOutOfRangeColorStop = null;
            }
            newColorStops.push(stop);
            prevInRangeColorStop = stop;
        }
    }
    return newColorStops;
}

function getVisualGradient(
    data: SeriesData,
    coordSys: Cartesian2D | Polar,
    api: ExtensionAPI
) {
    const visualMetaList = data.getVisual('visualMeta');
    if (!visualMetaList || !visualMetaList.length || !data.count()) {
        // When data.count() is 0, gradient range can not be calculated.
        return;
    }

    if (coordSys.type !== 'cartesian2d') {
        if (__DEV__) {
            console.warn('Visual map on line style is only supported on cartesian2d.');
        }
        return;
    }

    let coordDim: 'x' | 'y';
    let visualMeta;

    for (let i = visualMetaList.length - 1; i >= 0; i--) {
        const dimInfo = data.getDimensionInfo(visualMetaList[i].dimension);
        coordDim = (dimInfo && dimInfo.coordDim) as 'x' | 'y';
        // Can only be x or y
        if (coordDim === 'x' || coordDim === 'y') {
            visualMeta = visualMetaList[i];
            break;
        }
    }

    if (!visualMeta) {
        if (__DEV__) {
            console.warn('Visual map on line style only support x or y dimension.');
        }
        return;
    }

    // If the area to be rendered is bigger than area defined by LinearGradient,
    // the canvas spec prescribes that the color of the first stop and the last
    // stop should be used. But if two stops are added at offset 0, in effect
    // browsers use the color of the second stop to render area outside
    // LinearGradient. So we can only infinitesimally extend area defined in
    // LinearGradient to render `outerColors`.

    const axis = coordSys.getAxis(coordDim);

    // dataToCoord mapping may not be linear, but must be monotonic.
    const colorStops: ColorStop[] = zrUtil.map(visualMeta.stops, function (stop) {
        // offset will be calculated later.
        return {
            coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
            color: stop.color
        } as ColorStop;
    });
    const stopLen = colorStops.length;
    const outerColors = visualMeta.outerColors.slice();

    if (stopLen && (colorStops[0].coord as number) > (colorStops[stopLen - 1].coord as number)) {
        colorStops.reverse();
        outerColors.reverse();
    }
    const colorStopsInRange = clipColorStops(
        colorStops, coordDim === 'x' ? api.getWidth() : api.getHeight()
    );
    const inRangeStopLen = colorStopsInRange.length;
    if (!inRangeStopLen && stopLen) {
        // All stops are out of range. All will be the same color.
        return colorStops[0].coord < 0
            ? (outerColors[1] ? outerColors[1] : colorStops[stopLen - 1].color)
            : (outerColors[0] ? outerColors[0] : colorStops[0].color);
    }

    const tinyExtent = 10; // Arbitrary value: 10px
    const minCoord = (colorStopsInRange[0].coord as number) - tinyExtent;
    const maxCoord = (colorStopsInRange[inRangeStopLen - 1].coord as number) + tinyExtent;
    const coordSpan = maxCoord - minCoord;

    if (coordSpan < 1e-3) {
        return 'transparent';
    }

    zrUtil.each(colorStopsInRange, function (stop) {
        stop.offset = (stop.coord - minCoord) / coordSpan;
    });
    colorStopsInRange.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: inRangeStopLen ? colorStopsInRange[inRangeStopLen - 1].offset : 0.5,
        color: outerColors[1] || 'transparent'
    });
    colorStopsInRange.unshift({ // notice newColorStops.length have been changed.
        offset: inRangeStopLen ? colorStopsInRange[0].offset : 0.5,
        color: outerColors[0] || 'transparent'
    });

    const gradient = new graphic.LinearGradient(0, 0, 0, 0, colorStopsInRange, true);
    gradient[coordDim] = minCoord;
    gradient[coordDim + '2' as 'x2' | 'y2'] = maxCoord;

    return gradient;
}

function getIsIgnoreFunc(
    seriesModel: LineSeriesModel,
    data: SeriesData,
    coordSys: Cartesian2D
) {
    const showAllSymbol = seriesModel.get('showAllSymbol');
    const isAuto = showAllSymbol === 'auto';
    const withTimeline = seriesModel.get('withTimeline');
    let isIgnoreFuncForTimeLine: (dataIndex: number) => boolean | undefined;

    if (zrUtil.isObject(withTimeline) && zrUtil.isArray(withTimeline.range)) {
        const timelineRange = withTimeline.range.sort((a, b) => a - b);
        const len = timelineRange.length;
        isIgnoreFuncForTimeLine = (dataIndex: number) => {
            return dataIndex > timelineRange[len - 1] || dataIndex < timelineRange[0];
        }
    }

    if (showAllSymbol && !isAuto) {
        return isIgnoreFuncForTimeLine;
    }

    const categoryAxis = coordSys.getAxesByScale('ordinal')[0];
    if (!categoryAxis) {
        return isIgnoreFuncForTimeLine;
    }

    // Note that category label interval strategy might bring some weird effect
    // in some scenario: users may wonder why some of the symbols are not
    // displayed. So we show all symbols as possible as we can.
    if (isAuto
        // Simplify the logic, do not determine label overlap here.
        && canShowAllSymbolForCategory(categoryAxis, data)
    ) {
        return;
    }

    // Otherwise follow the label interval strategy on category axis.
    const categoryDataDim = data.mapDimension(categoryAxis.dim);
    const labelMap: Dictionary<1> = {};

    zrUtil.each(categoryAxis.getViewLabels(), function (labelItem) {
        const ordinalNumber = (categoryAxis.scale as OrdinalScale)
            .getRawOrdinalNumber(labelItem.tickValue);
        labelMap[ordinalNumber] = 1;
    });

    return function (dataIndex: number) {
        if (!labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex))) {
            return true;
        } else if (typeof isIgnoreFuncForTimeLine === 'undefined') {
            return false;
        } else {
            return isIgnoreFuncForTimeLine(dataIndex);
        }
    };
}

function canShowAllSymbolForCategory(
    categoryAxis: Axis2D,
    data: SeriesData
) {
    // In most cases, line is monotonous on category axis, and the label size
    // is close with each other. So we check the symbol size and some of the
    // label size alone with the category axis to estimate whether all symbol
    // can be shown without overlap.
    const axisExtent = categoryAxis.getExtent();
    let availSize = Math.abs(axisExtent[1] - axisExtent[0]) / (categoryAxis.scale as OrdinalScale).count();
    isNaN(availSize) && (availSize = 0); // 0/0 is NaN.

    // Sampling some points, max 5.
    const dataLen = data.count();
    const step = Math.max(1, Math.round(dataLen / 5));
    for (let dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
        if (SymbolClz.getSymbolSize(
            data, dataIndex
            // Only for cartesian, where `isHorizontal` exists.
        )[categoryAxis.isHorizontal() ? 1 : 0]
            // Empirical number
            * 1.5 > availSize
        ) {
            return false;
        }
    }

    return true;
}

function isPointNull(x: number, y: number) {
    return isNaN(x) || isNaN(y);
}

function getLastIndexNotNull(points: ArrayLike<number>, end?: number) {
    let len = points.length / 2;
    let endRange = end || len;
    for (; endRange > 0; endRange--) {
        if (!isPointNull(points[endRange * 2 - 2], points[endRange * 2 - 1])) {
            break;
        }
    }

    return endRange - 1;
}

function getPointAtIndex(points: ArrayLike<number>, idx: number) {
    return [points[idx * 2], points[idx * 2 + 1]];
}

function getIndexRange(points: ArrayLike<number>, xOrY: number, dim: 'x' | 'y') {
    const len = points.length / 2;

    const dimIdx = dim === 'x' ? 0 : 1;
    let a;
    let b;
    let prevIndex = 0;
    let nextIndex = -1;
    for (let i = 0; i < len; i++) {
        b = points[i * 2 + dimIdx];
        if (isNaN(b) || isNaN(points[i * 2 + 1 - dimIdx])) {
            continue;
        }
        // console.log('找点', xOrY, b, points[i * 2 + 1 - dimIdx]);
        if (i === 0) {
            a = b;
            if (xOrY < a) {
                nextIndex = 0;
                break;
            }
            continue;
        }
        if (a <= xOrY && b >= xOrY || a >= xOrY && b <= xOrY) {
            nextIndex = i;
            break;
        }
        if (Math.round(b - 0.5) === Math.round(xOrY)) {
            prevIndex = i;
            break;
        }

        prevIndex = i;
        a = b;
    }
    if (nextIndex === -1 && xOrY > b) {
        nextIndex = len - 1;
    }

    return {
        range: [prevIndex, nextIndex],
        t: (xOrY - a) / (b - a)
    };
}


function anyStateShowEndLabel(
    seriesModel: LineSeriesModel
) {
    if (seriesModel.get(['endLabel', 'show'])) {
        return true;
    }
    for (let i = 0; i < SPECIAL_STATES.length; i++) {
        if (seriesModel.get([SPECIAL_STATES[i], 'endLabel', 'show'])) {
            return true;
        }
    }
    return false;
}


interface EndLabelAnimationRecord {
    lastFrameIndex: number
    originalX?: number
    originalY?: number
}

function createLineClipPath(
    lineView: LineView,
    coordSys: Cartesian2D | Polar,
    hasAnimation: boolean,
    seriesModel: LineSeriesModel,
    noChangeEndLabel?: boolean
) {
    if (isCoordinateSystemType<Cartesian2D>(coordSys, 'cartesian2d')) {
        const endLabelModel = seriesModel.getModel('endLabel');
        const valueAnimation = endLabelModel.get('valueAnimation');
        const data = seriesModel.getData();

        const labelAnimationRecord: EndLabelAnimationRecord = { lastFrameIndex: 0 };

        const during = anyStateShowEndLabel(seriesModel)
            ? (percent: number, clipRect: graphic.Rect) => {
                lineView._updateEndLabelOnDuring(
                    percent,
                    clipRect,
                    data,
                    labelAnimationRecord,
                    valueAnimation,
                    endLabelModel,
                    coordSys
                );
            }
            : null;

        const isHorizontal = coordSys.getBaseAxis().isHorizontal();
        const clipPath = createGridClipPath(coordSys, hasAnimation, seriesModel, () => {
            const endLabel = lineView._endLabel;
            if (endLabel && hasAnimation && !noChangeEndLabel) {
                if (labelAnimationRecord.originalX != null) {
                    endLabel.attr({
                        x: labelAnimationRecord.originalX,
                        y: labelAnimationRecord.originalY
                    });
                }
            }
        }, during);
        // Expand clip shape to avoid clipping when line value exceeds axis
        if (!seriesModel.get('clip', true)) {
            const rectShape = clipPath.shape;
            const expandSize = Math.max(rectShape.width, rectShape.height);
            if (isHorizontal) {
                rectShape.y -= expandSize;
                rectShape.height += expandSize * 2;
            }
            else {
                rectShape.x -= expandSize;
                rectShape.width += expandSize * 2;
            }
        }

        // Set to the final frame. To make sure label layout is right.
        if (during && !noChangeEndLabel) {
            during(1, clipPath);
        }
        return clipPath;
    }
    else {
        if (__DEV__) {
            if (seriesModel.get(['endLabel', 'show'])) {
                console.warn('endLabel is not supported for lines in polar systems.');
            }
        }
        return createPolarClipPath(coordSys, hasAnimation, seriesModel);
    }

}

function getEndLabelStateSpecified(endLabelModel: Model, coordSys: Cartesian2D) {
    const baseAxis = coordSys.getBaseAxis();
    const isHorizontal = baseAxis.isHorizontal();
    const isBaseInversed = baseAxis.inverse;
    const align = isHorizontal
        ? (isBaseInversed ? 'right' : 'left')
        : 'center';
    const verticalAlign = isHorizontal
        ? 'middle'
        : (isBaseInversed ? 'top' : 'bottom');

    return {
        normal: {
            align: endLabelModel.get('align') || align,
            verticalAlign: endLabelModel.get('verticalAlign') || verticalAlign
        }
    };
}


class RankLineView extends LineView {
    static readonly type = 'dvLine';

    _symbolDraw: SymbolDraw;
    _endSymbol: SymbolExtended;

    _lineGroup: graphic.Group;
    _coordSys: Cartesian2D | Polar;

    _endLabel: graphic.Text;

    _polyline: ECPolyline;
    _polygon: ECPolygon;

    _stackedOnPoints: ArrayLike<number>;
    _points: ArrayLike<number>;

    _step: LineSeriesOption['step'];
    _valueOrigin: LineSeriesOption['areaStyle']['origin'];

    // _clipShapeForSymbol: CoordinateSystemClipArea;

    _data: SeriesData;

    init() {
        LineView.prototype.init.apply(this);
    }

    render(seriesModel: LineSeriesModel, ecModel: GlobalModel, api: ExtensionAPI) {
        // LineView.prototype.render.apply(this, arguments);
        const coordSys = seriesModel.coordinateSystem;
        const group = this.group;
        const data = seriesModel.getData();
        const withTimeline = seriesModel.get("withTimeline");

        const lineStyleModel = seriesModel.getModel('lineStyle');
        const areaStyleModel = seriesModel.getModel('areaStyle');

        let points = data.getLayout('points') as number[] || [];
        // console.log('points', points.length / 2);


        const isCoordSysPolar = coordSys.type === 'polar';
        const prevCoordSys = this._coordSys;

        const symbolDraw = this._symbolDraw;
        let polyline = this._polyline;
        let polygon = this._polygon;

        const lineGroup = this._lineGroup;

        const hasAnimation = !ecModel.ssr && seriesModel.isAnimationEnabled();

        const isAreaChart = !areaStyleModel.isEmpty();

        const valueOrigin = areaStyleModel.get('origin');
        const dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);

        let stackedOnPoints = isAreaChart && getStackedOnPoints(coordSys, data, dataCoordInfo);

        const showSymbol = seriesModel.get('showSymbol');

        const connectNulls = seriesModel.get('connectNulls');

        const isIgnoreFunc = showSymbol && !isCoordSysPolar
            && getIsIgnoreFunc(seriesModel, data, coordSys as Cartesian2D);

        // Remove temporary symbols
        const oldData = this._data;
        oldData && oldData.eachItemGraphicEl(function (el: SymbolExtended, idx) {
            if (el.__temp) {
                group.remove(el);
                oldData.setItemGraphicEl(idx, null);
            }
        });

        // Remove previous created symbols if showSymbol changed to false
        if (!showSymbol) {
            symbolDraw.remove();
        }

        group.add(lineGroup);

        // FIXME step not support polar
        const step = !isCoordSysPolar ? seriesModel.get('step') : false;
        let clipShapeForSymbol: PolarArea | Cartesian2DArea;
        if (coordSys && coordSys.getArea && seriesModel.get('clip', true)) {
            clipShapeForSymbol = coordSys.getArea();
            // Avoid float number rounding error for symbol on the edge of axis extent.
            // See #7913 and `test/dataZoom-clip.html`.
            if ((clipShapeForSymbol as Cartesian2DArea).width != null) {
                (clipShapeForSymbol as Cartesian2DArea).x -= 0.1;
                (clipShapeForSymbol as Cartesian2DArea).y -= 0.1;
                (clipShapeForSymbol as Cartesian2DArea).width += 0.2;
                (clipShapeForSymbol as Cartesian2DArea).height += 0.2;
            }
            else if ((clipShapeForSymbol as PolarArea).r0) {
                (clipShapeForSymbol as PolarArea).r0 -= 0.5;
                (clipShapeForSymbol as PolarArea).r += 0.5;
            }
        }
        this._clipShapeForSymbol = clipShapeForSymbol;
        const visualColor = getVisualGradient(data, coordSys, api)
            || data.getVisual('style')[data.getVisual('drawType')];
        // Initialization animation or coordinate system changed
        if (
            !(polyline && prevCoordSys?.type === coordSys?.type && step === this._step)
        ) {
            // console.log('入场动画、dataZoom变更');

            showSymbol && symbolDraw.updateData(data, {
                isIgnore: isIgnoreFunc,
                clipShape: clipShapeForSymbol,
                disableAnimation: true,
                getSymbolPoint(idx) {
                    return [points[idx * 2], points[idx * 2 + 1]];
                }
            });

            symbolDraw.eachRendered((el) => {
                if (withTimeline && withTimeline.curIndex) {
                    const pt = getPointAtIndex(points, data.indexOfRawIndex(withTimeline.curIndex));
                    if (!pt || isPointNull(pt[0], pt[1])) {
                        el.attr({
                            style: {
                                fill: '#D1D1D1'
                            }
                        })
                    }
                    if (el.animators && el.animators.length){
                        el.animators[0].delay = 1000
                    }
                }
            })

            hasAnimation && this._initSymbolLabelAnimation(
                data,
                coordSys,
                clipShapeForSymbol
            );

            if (step) {
                // TODO If stacked series is not step
                points = turnPointsIntoStep(points, coordSys, step, connectNulls);

                if (stackedOnPoints) {
                    stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step, connectNulls);
                }
            }

            polyline = this._newPolyline(points);
            if (isAreaChart) {
                polygon = this._newPolygon(
                    points, stackedOnPoints
                );
            }// If areaStyle is removed
            else if (polygon) {
                lineGroup.remove(polygon);
                polygon = this._polygon = null;
            }

            // NOTE: Must update _endLabel before setClipPath.
            if (!isCoordSysPolar) {
                // 绑定事件 目前直接在view里绑定事件， 后续要暴露接口
                this._initOrUpdateEndLabel(seriesModel, coordSys as Cartesian2D, convertToColorString(visualColor), api);
                this._endLabel && withTimeline && (this._endLabel.lastWithTimeline = withTimeline);
                if (withTimeline) {
                    if (this._endSymbol) {
                        lineGroup.remove(this._endSymbol)
                    }
                    this._endSymbol = createSymbol('circle', 0, 0, 0, 0, visualColor);
                    this._endSymbol.isSymbol = true;
                    this._endSymbol.__temp = false;

                    this._endSymbol.attr({
                        ignoreClip: true
                    })
                    lineGroup.add(this._endSymbol);
                }
            }

            seriesModel._points = points;
            lineGroup.setClipPath(
                createLineClipPath(this, coordSys, false, seriesModel)
            );
        }
        else {
            // console.log('更新动画');

            //是面积图但没有多边形元素
            if (isAreaChart && !polygon) {
                // If areaStyle is added
                polygon = this._newPolygon(
                    points, stackedOnPoints
                );
            }
            // 不是面积图但还有多边形元素
            else if (polygon && !isAreaChart) {
                // If areaStyle is removed
                lineGroup.remove(polygon);
                polygon = this._polygon = null;
            }

            // NOTE: Must update _endLabel before setClipPath.
            if (!isCoordSysPolar) {
                this._initOrUpdateEndLabel(seriesModel, coordSys as Cartesian2D, convertToColorString(visualColor), api);
                if (withTimeline && !this._endSymbol) {
                    this._endSymbol = new createSymbol('circle', 0, 0, 0, 0, visualColor)

                    this._endSymbol.attr({
                        ignoreClip: true
                    })
                    lineGroup.add(this._endSymbol);
                }
            }


            // Update clipPath
            const oldClipPath = lineGroup.getClipPath();
            seriesModel._points = undefined;
            if (oldClipPath) {
                const newClipPath = createLineClipPath(this, coordSys, false, seriesModel, true);
                const endLabelModel = seriesModel.getModel('endLabel');
                const valueAnimation = endLabelModel.get('valueAnimation');
                const { curIndex, maxRange, range } = withTimeline;

                !this.labelAnimationRecord && (this.labelAnimationRecord = { lastFrameIndex: 0, lastDisplay: true });

                const during = anyStateShowEndLabel(seriesModel)
                    ? (percent: number) => {
                        this._updateEndLabelOnDuring(
                            percent,
                            oldClipPath,
                            data,
                            this.labelAnimationRecord,
                            valueAnimation,
                            endLabelModel,
                            coordSys
                        );
                    }
                    : null;

                graphic.initProps(oldClipPath, {
                    shape: newClipPath.shape
                }, seriesModel, undefined, () => {
                    this.labelAnimationRecord.lastFrameIndex = curIndex;
                }, during);

            }
            else {
                lineGroup.setClipPath(
                    createLineClipPath(this, coordSys, true, seriesModel)
                );
            }

            // Always update, or it is wrong in the case turning on legend
            // because points are not changed.
            showSymbol && symbolDraw.updateData(data, {
                isIgnore: isIgnoreFunc,
                clipShape: clipShapeForSymbol,
                disableAnimation: false,
                getSymbolPoint(idx) {
                    return [points[idx * 2], points[idx * 2 + 1]];
                }
            });

            symbolDraw.eachRendered((el) => {
                if (withTimeline && withTimeline.curIndex) {
                    const pt = getPointAtIndex(points, data.indexOfRawIndex(withTimeline.curIndex));
                    if (!pt || isPointNull(pt[0], pt[1])) {
                        el.attr({
                            style: {
                                fill: '#D1D1D1'
                            }
                        })
                    }
                    // if (el.animators && el.animators.length){
                    //     el.animators[0].when(999, {
                    //         style: {
                    //             opacity: 0
                    //         }
                    //     })
                    // }
                }
            })

            // In the case data zoom triggered refreshing frequently
            // Data may not change if line has a category axis. So it should animate nothing.
            // if (!isPointsSame(this._stackedOnPoints, stackedOnPoints)
            //     || !isPointsSame(this._points, points)
            // ) {
            if (hasAnimation) {
                this._doUpdateAnimation(
                    data, stackedOnPoints, coordSys, api, step, valueOrigin, connectNulls, seriesModel.get('name')
                );
            }
            else {
                // Not do it in update with animation
                if (step) {
                    // TODO If stacked series is not step
                    points = turnPointsIntoStep(points, coordSys, step, connectNulls);
                    if (stackedOnPoints) {
                        stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step, connectNulls);
                    }
                }

                polyline.setShape({
                    points: points
                });
                polygon && polygon.setShape({
                    points: points,
                    stackedOnPoints: stackedOnPoints
                });
            }
            // }
        }

        const emphasisModel = seriesModel.getModel('emphasis');
        const focus = emphasisModel.get('focus');
        const blurScope = emphasisModel.get('blurScope');
        const emphasisDisabled = emphasisModel.get('disabled');

        polyline.useStyle(zrUtil.defaults(
            // Use color in lineStyle first
            lineStyleModel.getLineStyle(),
            {
                fill: 'none',
                stroke: visualColor,
                lineJoin: 'bevel' as CanvasLineJoin
            }
        ));

        setStatesStylesFromModel(polyline, seriesModel, 'lineStyle');

        if (polyline.style.lineWidth > 0 && seriesModel.get(['emphasis', 'lineStyle', 'width']) === 'bolder') {
            const emphasisLineStyle = polyline.getState('emphasis').style;
            emphasisLineStyle.lineWidth = +polyline.style.lineWidth + 1;
        }

        // Needs seriesIndex for focus
        getECData(polyline).seriesIndex = seriesModel.seriesIndex;
        toggleHoverEmphasis(polyline, focus, blurScope, emphasisDisabled);

        const smooth = getSmooth(seriesModel.get('smooth'));
        const smoothMonotone = seriesModel.get('smoothMonotone');

        polyline.setShape({
            smooth,
            smoothMonotone,
            connectNulls
        });

        const pt = getPointAtIndex(points, data.indexOfRawIndex(withTimeline.curIndex));
        if (!pt || isPointNull(pt[0], pt[1])) {
            polyline.attr({
                style: {
                    stroke: '#D1D1D1'
                }
            });
        }


        if (polygon) {
            const stackedOnSeries = data.getCalculationInfo('stackedOnSeries');
            let stackedOnSmooth = 0;

            polygon.useStyle(zrUtil.defaults(
                areaStyleModel.getAreaStyle(),
                {
                    fill: visualColor,
                    opacity: 0.7,
                    lineJoin: 'bevel' as CanvasLineJoin,
                    decal: data.getVisual('style').decal
                }
            ));

            if (stackedOnSeries) {
                stackedOnSmooth = getSmooth(stackedOnSeries.get('smooth'));
            }

            polygon.setShape({
                smooth,
                stackedOnSmooth,
                smoothMonotone,
                connectNulls
            });

            setStatesStylesFromModel(polygon, seriesModel, 'areaStyle');
            // Needs seriesIndex for focus
            getECData(polygon).seriesIndex = seriesModel.seriesIndex;
            toggleHoverEmphasis(polygon, focus, blurScope, emphasisDisabled);
        }

        const changePolyState = (toState: DisplayState) => {
            this._changePolyState(toState);
        };

        data.eachItemGraphicEl(function (el) {
            // Switch polyline / polygon state if element changed its state.
            el && ((el as ECElement).onHoverStateChange = changePolyState);
        });

        (this._polyline as ECElement).onHoverStateChange = changePolyState;

        this._data = data;
        // Save the coordinate system for transition animation when data changed
        this._coordSys = coordSys;
        this._stackedOnPoints = stackedOnPoints;
        this._points = points;
        this._step = step;
        this._valueOrigin = valueOrigin;

        if (seriesModel.get('triggerLineEvent')) {
            this.packEventData(seriesModel, polyline);
            polygon && this.packEventData(seriesModel, polygon);
        }
    }

    highlight(seriesModel, ecModel, api, payload) {
        // LineView.prototype.highlight.apply(this, args);
        const data = seriesModel.getData();
        const dataIndex = modelUtil.queryDataIndex(data, payload);
        const curIndex = seriesModel.get(['withTimeline', 'curIndex']);

        this._changePolyState('emphasis');

        if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
            const points = data.getLayout('points');
            let symbol = data.getItemGraphicEl(dataIndex) as SymbolClz;
            if (!isNaN(curIndex) && dataIndex > curIndex) {
                return;
            } 
            if (!symbol) {
                // Create a temporary symbol if it is not exists
                const x = points[dataIndex * 2];
                const y = points[dataIndex * 2 + 1];
                if (isNaN(x) || isNaN(y)) {
                    // Null data
                    return;
                }
                // fix #11360: shouldn't draw symbol outside clipShapeForSymbol
                if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(x, y)) {
                    return;
                }
                const zlevel = seriesModel.get('zlevel') || 0;
                const z = seriesModel.get('z') || 0;
                symbol = new SymbolClz(data, dataIndex);
                symbol.x = x;
                symbol.y = y;
                symbol.setZ(zlevel, z);

                // ensure label text of the temporary symbol is in front of line and area polygon
                const symbolLabel = symbol.getSymbolPath().getTextContent();
                if (symbolLabel) {
                    symbolLabel.zlevel = zlevel;
                    symbolLabel.z = z;
                    symbolLabel.z2 = this._polyline.z2 + 1;
                }

                (symbol as SymbolExtended).__temp = true;
                data.setItemGraphicEl(dataIndex, symbol);

                // Stop scale animation
                symbol.stopSymbolAnimation(true);

                this.group.add(symbol);
            }
            symbol.highlight();
        }
        else {
            // Highlight whole series
            ChartView.prototype.highlight.call(
                this, seriesModel, ecModel, api, payload
            );
        }
    }

    downplay(...args) {
        LineView.prototype.downplay.apply(this, args);
    }

    _changePolyState(...args) {
        LineView.prototype._changePolyState.apply(this, args);
    }

    _newPolyline(points: ArrayLike<number>) {
        // return LineView.prototype._newPolyline.apply(this, args);
        let polyline = this._polyline;
        // Remove previous created polyline
        if (polyline) {
            this._lineGroup.remove(polyline);
        }

        polyline = new ECPolyline({
            shape: {
                points
            },
            segmentIgnoreThreshold: 2,
            z2: 10
        });

        this._lineGroup.add(polyline);

        this._polyline = polyline;

        return polyline;
    }

    _newPolygon(...args) {
        return LineView.prototype._newPolygon.apply(this, args);
    }

    _initSymbolLabelAnimation(...args) {
        LineView.prototype._initSymbolLabelAnimation.apply(this, args);
    }

    _initOrUpdateEndLabel(seriesModel, coordSys, inheritColor, api) {
        // LineView.prototype._initOrUpdateEndLabel.apply(this, args);
        const endLabelModel = seriesModel.getModel('endLabel');

        if (anyStateShowEndLabel(seriesModel)) {
            const data = seriesModel.getData();
            const polyline = this._polyline;
            // series may be filtered.
            const points = data.getLayout('points');
            if (!points) {
                polyline.removeTextContent();
                this._endLabel = null;
                return;
            }
            let endLabel = this._endLabel;
            if (!endLabel) {
                endLabel = this._endLabel = new graphic.Text({
                    z2: 200 // should be higher than item symbol
                });
                endLabel.ignoreClip = true;
                polyline.setTextContent(this._endLabel);
                (polyline as ECElement).disableLabelAnimation = true;
            }

            // Find last non-NaN data to display data
            const dataIndex = getLastIndexNotNull(points);
            if (dataIndex >= 0) {
                const callback = seriesModel.get(['endLabel', 'afterInit']);
                callback && callback(this._endLabel, seriesModel, api);
                setLabelStyle(
                    polyline,
                    getLabelStatesModels(seriesModel, 'endLabel'),
                    {
                        inheritColor,
                        labelFetcher: seriesModel,
                        labelDataIndex: dataIndex,
                        defaultText(dataIndex, opt, interpolatedValue) {
                            return interpolatedValue != null
                                ? getDefaultInterpolatedLabel(data, interpolatedValue)
                                : getDefaultLabel(data, dataIndex);
                        },
                        enableTextSetter: true
                    },
                    getEndLabelStateSpecified(endLabelModel, coordSys)
                );
                polyline.textConfig.position = null;
            }
        }
        else if (this._endLabel) {
            this._polyline.removeTextContent();
            this._endLabel = null;
        }
    }

    _doUpdateAnimation(
        data: SeriesData,
        stackedOnPoints: ArrayLike<number>,
        coordSys: Cartesian2D | Polar,
        api: ExtensionAPI,
        step: LineSeriesOption['step'],
        valueOrigin: LineSeriesOption['areaStyle']['origin'],
        connectNulls: boolean,
        name: string
    ) {
        // LineView.prototype._doUpdateAnimation.apply(this, args);
        const polyline = this._polyline;
        const polygon = this._polygon;
        const seriesModel = data.hostModel;

        const diff = lineAnimationDiff(
            this._data, data,
            this._stackedOnPoints, stackedOnPoints,
            this._coordSys, coordSys,
            this._valueOrigin, valueOrigin
        );

        let current = diff.current;
        let stackedOnCurrent = diff.stackedOnCurrent;
        let next = diff.next;
        let stackedOnNext = diff.stackedOnNext;
        if (step) {
            // TODO If stacked series is not step
            current = turnPointsIntoStep(diff.current, coordSys, step, connectNulls);
            stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step, connectNulls);
            next = turnPointsIntoStep(diff.next, coordSys, step, connectNulls);
            stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step, connectNulls);
        }
        // Don't apply animation if diff is large.
        // For better result and avoid memory explosion problems like
        // https://github.com/apache/incubator-echarts/issues/12229
        if (getBoundingDiff(current, next) > 3000
            || (polygon && getBoundingDiff(stackedOnCurrent, stackedOnNext) > 3000)
        ) {
            polyline.stopAnimation();
            polyline.setShape({
                points: next
            });
            if (polygon) {
                polygon.stopAnimation();
                polygon.setShape({
                    points: next,
                    stackedOnPoints: stackedOnNext
                });
            }
            return;
        }

        // console.log('cur', current, 'next', next);
        
        (polyline.shape as any).__points = diff.current;
        polyline.shape.points = current;

        const target = {
            shape: {
                points: next
            }
        };
        // Also animate the original points.
        // If points reference is changed when turning into step line.
        if (diff.current !== current) {
            (target.shape as any).__points = diff.next;
        }

        // Stop previous animation.
        polyline.stopAnimation();

        graphic.updateProps(polyline, target, seriesModel);

        if (polygon) {
            polygon.setShape({
                // Reuse the points with polyline.
                points: current,
                stackedOnPoints: stackedOnCurrent
            });
            polygon.stopAnimation();
            graphic.updateProps(polygon, {
                shape: {
                    stackedOnPoints: stackedOnNext
                }
            }, seriesModel);
            // If use attr directly in updateProps.
            if (polyline.shape.points !== polygon.shape.points) {
                polygon.shape.points = polyline.shape.points;
            }
        }

        const updatedDataInfo: {
            el: SymbolExtended,
            ptIdx: number
        }[] = [];
        const diffStatus = diff.status;

        for (let i = 0; i < diffStatus.length; i++) {
            const cmd = diffStatus[i].cmd;
            if (cmd === '=') {
                const el = data.getItemGraphicEl(diffStatus[i].idx1) as SymbolExtended;
                if (el) {
                    updatedDataInfo.push({
                        el: el,
                        ptIdx: i    // Index of points
                    });
                }
            }
        }
        if (polyline.animators && polyline.animators.length) {
            polyline.animators[0].during(function () {
                polygon && polygon.dirtyShape();
                const points = (polyline.shape as any).__points;
                for (let i = 0; i < updatedDataInfo.length; i++) {
                    const el = updatedDataInfo[i].el;
                    const offset = updatedDataInfo[i].ptIdx * 2;
                    el.x = points[offset];
                    el.y = points[offset + 1];
                    el.markRedraw();
                }
            });
        }
    }

    remove(...args) {
        LineView.prototype.remove.apply(this, args);
    }

    _endLabelOnDuring(
        percent: number,
        clipRect: graphic.Rect,
        data: SeriesData,
        animationRecord: EndLabelAnimationRecord,
        valueAnimation: boolean,
        endLabelModel: Model<LabelOption>,
        coordSys: Cartesian2D
    ) {
        const endLabel = this._endLabel;
        const polyline = this._polyline;

        if (endLabel) {
            // NOTE: Don't remove percent < 1. percent === 1 means the first frame during render.
            // The label is not prepared at this time.
            if (percent < 1 && animationRecord.originalX == null) {
                animationRecord.originalX = endLabel.x;
                animationRecord.originalY = endLabel.y;
            }

            const points = data.getLayout('points');

            const seriesModel = data.hostModel as LineSeriesModel;
            const connectNulls = seriesModel.get('connectNulls');
            const precision = endLabelModel.get('precision');
            const distance = endLabelModel.get('distance') || 0;
            const withTimeline = seriesModel.get('withTimeline');

            const baseAxis = coordSys.getBaseAxis();
            const isHorizontal = baseAxis.isHorizontal();
            const isBaseInversed = baseAxis.inverse;
            const clipShape = clipRect.shape;

            const xOrY = isBaseInversed
                ? isHorizontal ? clipShape.x : (clipShape.y + clipShape.height)
                : isHorizontal ? (clipShape.x + clipShape.width) : clipShape.y;
            const distanceX = (isHorizontal ? distance : 0) * (isBaseInversed ? -1 : 1);
            const distanceY = (isHorizontal ? 0 : -distance) * (isBaseInversed ? -1 : 1);
            const dim = isHorizontal ? 'x' : 'y';

            const dataIndexRange = getIndexRange(points, xOrY, dim);
            const indices = dataIndexRange.range;

            const diff = indices[1] - indices[0];
            let value: ParsedValue;
            // if (indices[0] > data.indexOfRawIndex(withTimeline.curIndex)) endLabel.attr({style: {opacity: 0}});
            if (diff >= 1) {
                // diff > 1 && connectNulls, which is on the null data.
                if (diff > 1 && !connectNulls) {
                    const pt = getPointAtIndex(points, indices[0]);
                    endLabel.attr({
                        x: pt[0] + distanceX,
                        y: pt[1] + distanceY
                    });
                    valueAnimation && (value = seriesModel.getRawValue(indices[0]) as ParsedValue);
                }
                else {
                    const pt = polyline.getPointOn(xOrY, dim);
                    pt && endLabel.attr({
                        x: pt[0] + distanceX,
                        y: pt[1] + distanceY
                    });

                    const startValue = seriesModel.getRawValue(indices[0]) as ParsedValue;
                    const endValue = seriesModel.getRawValue(indices[1]) as ParsedValue;
                    valueAnimation && (value = modelUtil.interpolateRawValues(
                        data, precision, startValue, endValue, dataIndexRange.t
                    ) as ParsedValue);
                }
                animationRecord.lastFrameIndex = indices[0];
            }
            else {
                // If diff <= 0, which is the range is not found(Include NaN)
                // Choose the first point or last point.
                const idx = (percent === 1 || animationRecord.lastFrameIndex > 0) ? indices[0] : 0;
                const pt = getPointAtIndex(points, idx);
                valueAnimation && (value = seriesModel.getRawValue(idx) as ParsedValue);
                endLabel.attr({
                    x: pt[0] + distanceX,
                    y: pt[1] + distanceY
                });
            }
            if (valueAnimation) {
                try {
                    labelInner(endLabel).setLabelText(value);
                } catch (err) {
                    console.warn('绘制末尾标签前，请保证折线数据至少有一个数据');
                }
            }
        }
    }

    _updateEndLabelOnDuring(
        percent: number,
        clipRect: graphic.Rect,
        data: SeriesData,
        animationRecord: EndLabelAnimationRecord,
        valueAnimation: boolean,
        endLabelModel: Model<LabelOption>,
        coordSys: Cartesian2D
    ) {
        const endLabel = this._endLabel;
        const polyline = this._polyline;
        const endSymbol = this._endSymbol;

        if (endLabel) {
            // NOTE: Don't remove percent < 1. percent === 1 means the first frame during render.
            // The label is not prepared at this time.

            const points = data.getLayout('points');

            const seriesModel = data.hostModel as LineSeriesModel;
            const connectNulls = seriesModel.get('connectNulls');
            const precision = endLabelModel.get('precision');
            const distance = endLabelModel.get('distance') || 0;
            const withTimeline = seriesModel.get('withTimeline');

            const baseAxis = coordSys.getBaseAxis();
            const isHorizontal = baseAxis.isHorizontal();
            const isBaseInversed = baseAxis.inverse;
            const clipShape = clipRect.shape;

            const xOrY = isBaseInversed
                ? isHorizontal ? clipShape.x : (clipShape.y + clipShape.height)
                : isHorizontal ? (clipShape.x + clipShape.width) : clipShape.y;
            const distanceX = (isHorizontal ? distance : 0) * (isBaseInversed ? -1 : 1);
            const distanceY = (isHorizontal ? 0 : -distance) * (isBaseInversed ? -1 : 1);
            const dim = isHorizontal ? 'x' : 'y';

            const dataIndexRange = getIndexRange(points, xOrY, dim);
            const indices = dataIndexRange.range;

            const diff = indices[1] - indices[0];
            let value: ParsedValue;
            if (withTimeline && endSymbol) {
                // 记录上一周期的标签位置
                if (percent === 0) {
                    animationRecord.originalX = endLabel.x;
                    animationRecord.originalY = endLabel.y;
                }
                const { range, curIndex, maxRange } = withTimeline;
                const lastPt = [animationRecord.originalX, animationRecord.originalY] as [number, number];
                // 上一次curIndex的全局索引
                const lastIndex = animationRecord.lastFrameIndex;

                // 排名curIndex所在的列对应的数据节点的坐标
                const ptOnCurrIndex = getPointAtIndex(points, data.indexOfRawIndex(curIndex));
                // 排名所在的列之前最近的合法节点的索引
                const lastIndexNotNull = getLastIndexNotNull(points, range[1]);
                // 上一次排名所在列的对应节点在本次坐标系的坐标
                const ptOnLastIndex = coordSys.dataToPoint([
                    data.getByRawIndex('x', lastIndex),
                    data.getByRawIndex('y', lastIndex)
                ]);
                const ptOnLastNotNull = coordSys.dataToPoint([
                    data.get('x', lastIndexNotNull),
                    data.get('y', lastIndexNotNull)
                ]);
                // console.log('pts', percent, endLabel.style.text, lastPt, ptOnCurrIndex, ptOnLastIndex, animationRecord.lastFrameIndex);

                function valueAtPercent(source: number, target: number, percent: number) {
                    const diff = target - source;
                    return source + diff * percent;
                }

                // 如果标签在上一状态位于坐标系合法位置，且本状态也在合法位置
                if (!isPointNull(ptOnCurrIndex[0], ptOnCurrIndex[1]) && !isPointNull(lastPt[0], lastPt[1])) {
                    const symbolSize = SymbolClz.getSymbolSize(data, data.indexOfRawIndex(curIndex));

                    const widthInFrame = valueAtPercent(endSymbol.shape.width, symbolSize[0], percent);
                    const heightInFrame = valueAtPercent(endSymbol.shape.height, symbolSize[1], percent);
                    endLabel.attr({
                        x: valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent),
                        y: valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent) + distanceY,
                        ignore: false,
                        style: {
                            opacity: 1
                        }
                    })
                    endSymbol.attr({
                        x: valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent) - widthInFrame / 2,
                        y: valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent) - heightInFrame / 2,
                        ignore: false,
                        shape: {
                            width: widthInFrame,
                            height: heightInFrame
                        },
                        style: {
                            opacity: 1,
                        }
                    })
                }
                // 如果标签在上一状态位于合法位置，且本状态位于坐标系外
                else if (isPointNull(ptOnCurrIndex[0], ptOnCurrIndex[1]) && !isPointNull(lastPt[0], lastPt[1])) {
                    
                    
                    endLabel.attr({
                        x: (valueAtPercent(lastPt[0], ptOnLastNotNull[0], percent)) || ptOnLastIndex[0],
                        y: (valueAtPercent(lastPt[1], ptOnLastNotNull[1], percent) + distanceY) || ptOnLastIndex[1],
                        ignore: lastIndex > curIndex,
                        style: {
                            opacity: 1,
                            text: '{margin|}{margin|}{avatar|}{margin|}'
                        }
                    });
                    endSymbol.attr({
                        x: valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent),
                        y: valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent),
                        ignore: true,
                        style: {
                            opacity: 1 - percent
                        }
                    })
                }
                // 如果标签在上一状态位于坐标系外，且本状态位于合法位置
                else if (!isPointNull(ptOnCurrIndex[0], ptOnCurrIndex[1]) && isPointNull(lastPt[0], lastPt[1])) {
                    endLabel.attr({
                        x: (valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent)) || ptOnCurrIndex[0],
                        y: (valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent) + distanceY) || ptOnCurrIndex[1],
                        ignore: false,
                        style: {
                            opacity: percent
                        }
                    })
                    // endSymbol.attr({
                    //     x: valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent),
                    //     y: valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent),
                    //     ignore: false,
                    //     style: {
                    //         opacity: percent
                    //     }
                    // })
                }
                // 如果标签在上一状态位于坐标系外，且本状态位于坐标系外
                else if (isPointNull(ptOnCurrIndex[0], ptOnCurrIndex[1]) && isPointNull(lastPt[0], lastPt[1])) {
                    endLabel.attr({
                        x: (valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent) + distanceX) || ptOnCurrIndex[0],
                        y: (valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent) + distanceY) || endLabel.y,
                        ignore: true,
                        style: {
                            opacity: 0
                        }
                    });
                    // endSymbol.attr({
                    //     x: valueAtPercent(lastPt[0], ptOnCurrIndex[0], percent) || ptOnCurrIndex[0],
                    //     y: valueAtPercent(lastPt[1], ptOnCurrIndex[1], percent) || endLabel.y,
                    //     ignore: true,
                    //     style: {
                    //         opacity: 0
                    //     }
                    // })
                }
            }
        }
    }
}

export default RankLineView;
