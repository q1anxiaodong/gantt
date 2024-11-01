const optionPreprocessorFuncs = [];

function registerPreprocessor(preprocessorFunc) {
    optionPreprocessorFuncs.push(preprocessorFunc);
}


class Project {
    

    run(option) {
        // 配置预处理环节
        optionPreprocessorFuncs.forEach(func => {
            func(option);
        })
        const keys = Object.keys(option);
        // 遍历配置项
        keys.forEach(mainType => {
            const modelOpt = option[mainType];
            const subType = modelOpt.type;

             // 获取配置中指定的组件的class
            const ModelClass = Model.getClass(mainType, subType, true);
            const modelIns = new ModelClass();
            modelIns.render(modelOpt);
        })
    }
}