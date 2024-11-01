function parseRgbaToArray(color) {
    const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/;
    const match = (color).match(rgbaRegex);
  
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const a = parseFloat(match[4]);
    return [r, g, b, a];
  }
  
function parseColor(color, background = 'rgba(255, 255, 255, 1)') {
    let [r, g, b, a] = parseRgbaToArray(color);
    const [br, bg, bb] = parseRgbaToArray(background);
    r = Math.min(r * a + br * (1 - a), 255);
    g = Math.min(g * a + bg * (1 - a), 255);
    b = Math.min(b * a + bb * (1 - a), 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }


  console.log(parseColor('rgba(255, 149, 0, 0.15)'), '255, 239, 217');
  