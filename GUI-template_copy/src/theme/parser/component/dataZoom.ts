import { util } from '../../util';
import lightDataZoomHandler from '../../assets/mobileLightDataZoomHandler.png';
import { normalizeToArray } from '../../util';

const mobileSliderStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  handleIcon: `image://${lightDataZoomHandler as string}`,
  areaColor: '#EDEDED'
};
const dataZoomInside = {
  type: 'inside',
  start: 0,
  end: 100,
  orient: 'horizontal'
};
const dataZoomSlider = {
  type: 'slider',
  bottom: 0,
  left: 11,
  right: 11,
  height: '24px',
  fillerColor: 'rgba(51,102,255,0.08)',
  brushSelect: false,
  borderRadius: 4
};
function parseDataZoom(option: Option, optionToken: OptionToken) {
  const defaultDataZoom = {
    handleIcon: mobileSliderStyle.handleIcon,
    handleSize: 24,
    backgroundColor: mobileSliderStyle.backgroundColor,
    borderColor: 'transparent',
    dataBackground: {
      areaStyle: {
        color: mobileSliderStyle.areaColor,
        opacity: 1
      },
      lineStyle: {
        color: 'transparent'
      }
    },
    selectedDataBackground: {
      areaStyle: {
        color: 'rgba(51,102,255, 0.16)'
      },
      lineStyle: {
        color: 'transparent'
      }
    },
    fillerColor: 'rgba(51, 102, 255, 0.08)',
    showDetail: false
  };

  if (option.dataZoom) {
    (option.dataZoom as unknown as []).forEach(item => {
      if (item.type === 'slider') {
        util.merge(item, dataZoomSlider);
        util.merge(item, defaultDataZoom);
      } else {
        util.merge(item, dataZoomInside);
      }
    });
  }
}

function preprocessDataZoom(option: Parameters<ThemeParser>[0]) {
  option.dataZoom = normalizeToArray(option.dataZoom);
}

export function dataZoomThemeParser(...args: Parameters<ThemeParser>): ReturnType<ThemeParser> {
  const [option, chart, optionToken] = args;
  const themeMode = chart.getModel().getThemeName().includes('light') ? 'light' : 'dark';
  preprocessDataZoom(option);
  parseDataZoom(option, optionToken);
}
