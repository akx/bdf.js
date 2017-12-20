module.exports = function drawText(font, text) {
  let x = 0;
  let y = 0;
  let minX;
  let maxX;
  let minY;
  let maxY;
  const pixels = [];
  const charMap = {};
  font.chars.forEach(ch => (charMap[ch.encoding] = ch));
  for (var i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const char = charMap[charCode];
    const [w, h, dX, dY] = char.bbox;
    const [deviceW, deviceH] = char.dwidth;
    const yAdj = (font.props.ascent || h) - h;
    const bits = char.bitmapBits;
    const charHeight = char.bitmap.length;
    for (var cy = 0; cy < charHeight; cy++) {
      const c = char.bitmap[cy];
      for (var bit = 0; bit < w; bit++) {
        if (c & (1 << (bits - 1 - bit))) {
          const finalX = x + bit + dX;
          const finalY = y + cy + dY + yAdj;
          if (minX === undefined || finalX < minX) minX = finalX;
          if (maxX === undefined || finalX > maxX) maxX = finalX;
          if (minY === undefined || finalY < minY) minY = finalY;
          if (maxY === undefined || finalY > maxY) maxY = finalY;
          pixels.push([finalX, finalY]);
        }
      }
    }
    x += deviceW;
    y += deviceH;
  }
  return { pixels, bbox: [minX, minY, maxX, maxY] };
};
