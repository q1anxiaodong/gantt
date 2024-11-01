
// 流程扩展
function addGrid(option) {
    console.log('增加了一个grid配置');
    option.grid = {
        top: 10
    }
}

function install(register) {
    register.registerPreprocessor(addGrid);
}

use(install);

/***************************************** */
// 组件扩展
class MyModel {
    static type = 'series.bar';

    render(opt) {
        if (opt && opt.value) {
            console.warn(`这里是${MyModel.type}, 当前这个实例的value是${opt.value}`);
        }
    }
}

function myModelRegister(register) {
    register.registerModel(MyModel);
}

use(myModelRegister);

/***************************************** */


const option = {
    series: {
        type: 'bar',
        value: 15
    }
}

const project = new Project();

project.run(option);



