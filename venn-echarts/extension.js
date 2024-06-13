const { use } = echarts;

function install(registers) {
  registers.registerProcessor(
    registers.PRIORITY.PROCESSOR.STATISTIC,
    parseScatterData
);
}

use(install);