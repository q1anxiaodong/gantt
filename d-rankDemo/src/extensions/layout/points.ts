import {map} from 'zrender/src/core/util';
import createRenderPlanner from 'echarts/lib/chart/helper/createRenderPlanner';
import {isDimensionStacked} from 'echarts/lib/data/helper/dataStackHelper';
import type SeriesModel from 'echarts/types/src/model/Series';
import type { StageHandler, ParsedValueNumeric } from 'echarts/types/src/util/types';
import { createFloat32Array } from 'echarts/lib/util/vendor';
import SeriesData from 'echarts/lib/data/SeriesData';


export default function pointsLayout(seriesType: string, forceStoreInTypedArray?: boolean): StageHandler {
    return {
        seriesType: seriesType,

        plan: createRenderPlanner(),

        reset: function (seriesModel: SeriesModel) {
            const data = seriesModel.getData();
            const coordSys = seriesModel.coordinateSystem;
            const pipelineContext = seriesModel.pipelineContext;
            const useTypedArray = forceStoreInTypedArray || pipelineContext.large;

            if (!coordSys) {
                return;
            }

            const dims = map(coordSys.dimensions, function (dim) {
                return data.mapDimension(dim);
            }).slice(0, 2);
            const dimLen = dims.length;

            const stackResultDim = data.getCalculationInfo('stackResultDimension');
            if (isDimensionStacked(data, dims[0])) {
                dims[0] = stackResultDim;
            }
            if (isDimensionStacked(data, dims[1])) {
                dims[1] = stackResultDim;
            }
            // data.selectRange({
            //     x: [0, 100],
            //     // y: [0, 10]
            // });
            // const myData = new SeriesData(
            //     data._schama ? data._schema : map(data.dimensions, data._getDimInfo, data),
            //     data.hostModel
            // );
            // const dataDims = data.mapDimensionsAll('x');
            // data.map('x', (value) => {
            //     return isNaN(value) ? 100 : value;
            // });
            // seriesModel.setData(myData);
            const store = data.getStore();
            const dimIdx0 = data.getDimensionIndex(dims[0]);
            const dimIdx1 = data.getDimensionIndex(dims[1]);

            return dimLen && {
                progress(params, data) {
                    const segCount = params.end - params.start;
                    const points = useTypedArray && createFloat32Array(segCount * dimLen);

                    const tmpIn: ParsedValueNumeric[] = [];
                    const tmpOut: number[] = [];
                    // console.log('raw', params.start, params.end);
                    

                    for (let i = 0, offset = 0; i < 100; i++) {
                        let point;

                        if (dimLen === 1) {
                            const x = store.get(dimIdx0, i) as ParsedValueNumeric;
                            // NOTE: Make sure the second parameter is null to use default strategy.
                            point = coordSys.dataToPoint(x, null, tmpOut);
                        }
                        else {
                            tmpIn[0] = store.get(dimIdx0, i) as ParsedValueNumeric;
                            tmpIn[1] = store.get(dimIdx1, i) as ParsedValueNumeric;
                            // Let coordinate system to handle the NaN data.
                            point = coordSys.dataToPoint(tmpIn, null, tmpOut);
                            // console.log('ptttt', point);
                        }

                        if (useTypedArray) {
                            points[offset++] = point[0];
                            points[offset++] = point[1];
                        }
                        else {
                            data.setItemLayout(i, point.slice());
                        }
                    }

                    // console.log('pppp', points,useTypedArray);
                    

                    useTypedArray && data.setLayout('points', points);
                }
            };
        }
    };
};