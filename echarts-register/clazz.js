const IS_CONTAINER = '___EC__COMPONENT__CONTAINER___';
const TYPE_DELIMITER = '.';

/**
 * 
 * @param {*} modelType 
 * @returns 将形式为'a.b'的type字符串解析为{main: 'a', sub: 'b'}
 */
function parseClassType(modelType) {
    const ret = {main: '', sub: ''};
    if (modelType) {
        const typeArr = modelType.split(TYPE_DELIMITER);
        ret.main = typeArr[0] || '';
        ret.sub = typeArr[1] || '';
    }
    console.log('ret', ret);
    return ret;
}

function enableClassManagement(target) {

    window.storage = {};

    target.registerClass = function(clz) {
        const modelFullType = clz.type || clz.prototype.type;
        console.log('modelFullType', modelFullType, clz, clz.type);

        if (modelFullType) {

            // check class type  先校验class的type是否合法

            clz.prototype.type = modelFullType;

            // 解析class的type
            const modelTypeInfo = parseClassType(modelFullType);

            if (!modelTypeInfo.sub) {
                // 如果当前class的sub类型为空，说明class是一个容器类(父类)，类似seriesModel，componentModel
                storage[modelTypeInfo.main] = clz;
            } else if (modelTypeInfo.sub !== IS_CONTAINER) {
                // 如果当前class的sub类型不为空，且不为容器类(父类), 说明class是一个具体类
                // 先创建或获取他的容器类，然后将class存放到容器类名下
                const container = makeContainer(modelTypeInfo);
                container[modelTypeInfo.sub] = clz;
            }
        }
        return clz;
    }

    target.getClass = function(mainType, subType, throwWhenNotFound) {
        let clz = storage[mainType];

        if (clz && clz[IS_CONTAINER]) {
            clz = subType ? clz[subType] : null;
        }

        if (throwWhenNotFound && !clz) {
            throw new Error(`没有${mainType}.${subType}这个类`);
        }

        return clz;
    }

    function makeContainer(modelTypeInfo) {
        let container = storage[modelTypeInfo.main];
        if (!container || container[IS_CONTAINER]) {
            container = storage[modelTypeInfo.main] = {};
            container[IS_CONTAINER] = true;
        }
        return container;
    }
}