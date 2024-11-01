const extension = [];


const registers = {
    registerModel(modelClass) {
        Model.registerClass(modelClass);
    },

    registerPreprocessor
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function use(ext) {
    if (isArray(ext)) {
        ext.forEach(e => {
            use(e);
        })
    }

    if (extension.indexOf(ext) >= 0) {
        return;
    }

    extension.push(ext);

    if (isFunction(ext)) {
        ext = {
            install: ext
        };
    }
    ext.install(registers)

}