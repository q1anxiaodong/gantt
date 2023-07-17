import * as graphic from 'echarts/lib/util/graphic';
import {round} from 'echarts/lib/util/number';
import type SeriesModel from 'echarts/types/src/model/Series';
import type{ SeriesOption } from 'echarts/types/src/util/types';
import type Cartesian2D from 'echarts/types/src/coord/cartesian/Cartesian2D';
import type Polar from 'echarts/types/src/coord/polar/Polar';
import type { CoordinateSystem } from 'echarts/types/src/coord/CoordinateSystem';
import { isFunction } from 'zrender/src/core/util';

type SeriesModelWithLineWidth = SeriesModel<SeriesOption & {
    lineStyle?: { width?: number },
    withTimeline?: {
        curIndex: number,
        maxRange: number
    }
}>;
function createGridClipPath(
    cartesian: Cartesian2D,
    hasAnimation: boolean,
    seriesModel: SeriesModelWithLineWidth,
    done?: () => void,
    during?: (percent: number, clipRect: graphic.Rect) => void
) {
    const rect = cartesian.getArea();

    let x = rect.x;
    let y = rect.y;
    let width = rect.width;
    let height = rect.height;

    const lineWidth = seriesModel.get(['lineStyle', 'width']) || 2;
    const withTimeLine = seriesModel.get('withTimeline');
    let clipWidthPercent;
    
    if (withTimeLine && !isNaN(withTimeLine.curIndex) && !isNaN(withTimeLine.maxRange)) {
        const { curIndex, maxRange } = withTimeLine;
        clipWidthPercent = curIndex >= maxRange ? 1 : curIndex / maxRange;
    }
    
    
    // Expand the clip path a bit to avoid the border is clipped and looks thinner
    x -= lineWidth / 2;
    y -= lineWidth / 2;
    width += lineWidth;
    height += lineWidth;

    // fix: https://github.com/apache/incubator-echarts/issues/11369
    x = Math.floor(x);
    width = Math.round(width);

    const clipPath = new graphic.Rect({
        shape: {
            x: x,
            y: y,
            width: width,
            height: height
        }
    });
    clipPath.isClipRect = true;

    if (hasAnimation) {
        const baseAxis = cartesian.getBaseAxis();
        const isHorizontal = baseAxis.isHorizontal();
        const isAxisInversed = baseAxis.inverse;

        if (isHorizontal) {
            if (isAxisInversed) {
                clipPath.shape.x += width;
            }
            clipPath.shape.width = 0;
        }
        else {
            if (!isAxisInversed) {
                clipPath.shape.y += height;
            }
            clipPath.shape.height = 0;
        }

        const duringCb = isFunction(during)
            ? (percent: number) => {
                during(percent, clipPath);
            }
            : null;

        graphic.initProps(clipPath, {
            shape: {
                width: !isNaN(clipWidthPercent) ? clipWidthPercent * width : width,
                height: height,
                x: x,
                y: y
            }
        }, seriesModel, null, done, duringCb);
    } else if (!isNaN(clipWidthPercent)) {
        clipPath.attr({
            shape: {
                width: clipWidthPercent * width
            }
        });
        // isFunction(during) && during(0, clipPath);
    }

    return clipPath;
}

function createPolarClipPath(
    polar: Polar,
    hasAnimation: boolean,
    seriesModel: SeriesModelWithLineWidth
) {
    const sectorArea = polar.getArea();
    // Avoid float number rounding error for symbol on the edge of axis extent.

    const r0 = round(sectorArea.r0, 1);
    const r = round(sectorArea.r, 1);
    const clipPath = new graphic.Sector({
        shape: {
            cx: round(polar.cx, 1),
            cy: round(polar.cy, 1),
            r0: r0,
            r: r,
            startAngle: sectorArea.startAngle,
            endAngle: sectorArea.endAngle,
            clockwise: sectorArea.clockwise
        }
    });

    if (hasAnimation) {
        const isRadial = polar.getBaseAxis().dim === 'angle';

        if (isRadial) {
            clipPath.shape.endAngle = sectorArea.startAngle;
        }
        else {
            clipPath.shape.r = r0;
        }

        graphic.initProps(clipPath, {
            shape: {
                endAngle: sectorArea.endAngle,
                r: r
            }
        }, seriesModel);
    }
    return clipPath;
}

function createClipPath(
    coordSys: CoordinateSystem,
    hasAnimation: boolean,
    seriesModel: SeriesModelWithLineWidth,
    done?: () => void,
    during?: (percent: number) => void
) {
    if (!coordSys) {
        return null;
    }
    else if (coordSys.type === 'polar') {
        return createPolarClipPath(coordSys as Polar, hasAnimation, seriesModel);
    }
    else if (coordSys.type === 'cartesian2d') {
        return createGridClipPath(coordSys as Cartesian2D, hasAnimation, seriesModel, done, during);
    }
    return null;
}

export {
    createGridClipPath,
    createPolarClipPath,
    createClipPath
};