const getOption = (kData) => {
    return {
        "scale": 0.3,
        "textStyle": {
            "fontSize": 12,
            "fontFamily": "sans-serif",
            "fontStyle": "normal",
            "fontWeight": "normal"
        },
        "axis": [
            {
                "xOrY": "x",
                "$dataIndex": 0,
                "$gridIndex": [
                    1,
                    0
                ],
                "dataKey": "t",
                "paddingOuter": "0.12",
                "splitLine": {
                    "show": false
                },
                "label": {
                    "show": true,
                    "style": {
                        "fill": "rgba(255,255,255,0.6)"
                    }
                },
                "line": {
                    "show": false
                },
                "tick": {
                    "show": false
                },
                "interval": 38
            },
            {
                "position": "left",
                "type": "linear",
                "xOrY": "y",
                "$gridIndex": 0,
                "splitLine": {
                    "show": true,
                    "style": {
                        "color": "rgba(255,255,255,0.06)",
                        "lineWidth": 1
                    }
                },
                "label": {
                    "padding": -28,
                    "inRange": true,
                    "style": {
                        "fill": "rgba(255,255,255,0.6)"
                    }
                },
                "line": {
                    "show": false
                },
                "tick": {
                    "show": false
                },
                "z": 9
            },
            {
                "position": "left",
                "type": "linear",
                "$gridIndex": 1,
                "xOrY": "y",
                "splitLine": {
                    "show": true,
                    "style": {
                        "color": "rgba(255,255,255,0.06)",
                        "lineWidth": 1
                    }
                },
                "label": {
                    "padding": -28,
                    "inRange": true,
                    "style": {
                        "fill": "rgba(255,255,255,0.6)"
                    }
                },
                "line": {
                    "show": false
                },
                "tick": {
                    "show": false
                },
                "z": 9
            }
        ],
        "legend": {
            "show": true,
            "top": "61%",
            "left": 0,
            "addLine": false,
            "align": "left",
            "horizontalGap": 0,
            "innerGap": 5,
            "symbol": {
                "type": "none",
                "size": 10
            },
            "textStyle": {
                "rich": {
                    "label": {
                        "fill": "rgba(255,255,255,0.6)",
                        "textVerticalAlign": "middle",
                        "fontSize": 12
                    },
                    "icon1": {
                        "fontSize": 12,
                        "textBackgroundColor": {
                            "image": "//i.thsi.cn/sns/portfolio-zixun/macdtl.png"
                        }
                    },
                    "icon2": {
                        "fontSize": 12,
                        "textBackgroundColor": {
                            "image": "//i.thsi.cn/sns/portfolio-zixun/htl.png"
                        }
                    },
                    "icon3": {
                        "fontSize": 12,
                        "textBackgroundColor": {
                            "image": "//i.thsi.cn/sns/portfolio-zixun/ctl.png"
                        }
                    }
                }
            },
            "data": [
                "MACD",
                "MACD:0.37",
                "DEA:0.37"
            ]
        },
        "grid": [
            {
                "left": 14,
                "top": 0,
                "right": 14,
                "bottom": "43%"
            },
            {
                "left": 14,
                "top": "67%",
                "right": 14,
                "bottom": 30
            }
        ],
        "axisPointer": [
            {
                "$axisIndex": [
                    2,
                    1
                ],
                "line": {
                    "style": {
                        "stroke": "#858585",
                        "lineWidth": 1
                    }
                },
                "label": {
                    "gap": -4,
                    "inside": true,
                    "inRange": true,
                    "style": {
                        "fill": "#fff",
                        "textPadding": [
                            3,
                            4
                        ],
                        "textBorderRadius": 4,
                        "textBackgroundColor": "#36f"
                    }
                }
            },
            {
                "$axisIndex": 0,
                "line": {
                    "style": {
                        "stroke": "#858585",
                        "lineWidth": 1
                    }
                },
                "label": {
                    "gap": -24,
                    "inside": true,
                    "inRange": true,
                    "style": {
                        "fill": "#fff",
                        "textPadding": [
                            3,
                            4
                        ],
                        "textBorderRadius": 4,
                        "textBackgroundColor": "#36f"
                    }
                }
            }
        ],
        "series": [
            {
                "type": "hqbar",
                "scale": 0.3,
                "hqbarType": "kline",
                "compressThreshold": 60,
                "$axisIndex": [
                    0,
                    1
                ],
                "$dataIndex": 0,
                "hq": {
                    "up": {
                        "fill": "transparent",
                        "lineWidth": 3
                    },
                    "down": {
                        "lineWidth": 3
                    },
                    "eq": {
                        "lineWidth": 3
                    }
                }
            },
            {
                "name": "MACD",
                "type": "bar",
                "scale": 0.3,
                "compressThreshold": 60,
                "$axisIndex": [
                    0,
                    2
                ],
                "$dataIndex": 0,
                "dataKey": "maCd",
                "itemStyle": {}
            },
            {
                "name": "MACD:0.37",
                "type": "line",
                "aliasType": "hqline",
                "$dataIndex": 0,
                "dataKey": "diff",
                "$axisIndex": [
                    0,
                    2
                ],
                "line": {
                    "show": true,
                    "style": {
                        "normal": {
                            "stroke": "#858585",
                            "lineWidth": 1
                        }
                    }
                }
            },
            {
                "name": "DEA:0.37",
                "type": "line",
                "aliasType": "hqline",
                "$dataIndex": 0,
                "dataKey": "dea",
                "$axisIndex": [
                    0,
                    2
                ],
                "line": {
                    "show": true,
                    "style": {
                        "normal": {
                            "stroke": "#ff9500",
                            "lineWidth": 1
                        }
                    }
                }
            },
            {
                "type": "custom",
                "$dataIndex": 0,
                "$axisIndex": [
                    0,
                    1
                ],
                "z": 5,
                "model": {
                    "signalIndex": "38"
                },
                "view": {}
            },
            {
                "type": "custom",
                "$dataIndex": 0,
                "$axisIndex": [
                    0,
                    1
                ],
                "z": 5,
                "model": {
                    "signalIndex": "38"
                },
                "view": {}
            },
            {
                "type": "custom",
                "$dataIndex": 0,
                "$axisIndex": [
                    0,
                    2
                ],
                "z": 5,
                "model": {
                    "signalIndex": "38"
                },
                "view": {}
            },
            {
                "type": "custom",
                "$dataIndex": 0,
                "$axisIndex": [
                    0,
                    2
                ],
                "z": 5,
                "model": {
                    "signalIndex": "38"
                },
                "view": {}
            }
        ],
        "data": [
            {
                "originData": kData
            }
        ]
    }
}

//---------------------------------
const getTextStyle = () => {
    return {
        "fontSize": 12,
        "fontFamily": "sans-serif",
        "fontStyle": "normal",
        "fontWeight": "normal"
    };
}

const getGrid = (index) => {
    const height = index === 0 ? 160 : 64;
    const top = index === 0 ? 0 : '67%';
    const bottom = index === 0 ? '43%' : 30;
    return grid = {
        left: 10,
        top,
        right: 10,
        bottom,
        height,
        width: 323
    };
}

//---------------------------------


// 布林线策略
const bulinOption = () => {
    return {
        textStyle: getTextStyle(),
        grid: [getGrid(0), getGird(1)],
        axis: [getXAxis(), getYAxis(0), getYAxis(1)],
        series: [getKLine(0, 1)]
    }
}
const chartMap = {
    bulin: bulinOption,
}

class OptionManager {
    _scale;
    _optionName;
    _option;
    constructor(scale, baseOptionName) {
        this._scale = scale || 1;
        this._optionName = baseOptionName || 'bulin';
        this.init();
    }

    init() {
        const originOption = chartMap[this._optionName]();
        this._option = originOption;
    }

    getScaledOption() {
        // const 
    }
}


