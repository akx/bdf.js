module.exports = function rasterizeToLines(drawResult, emptyCell = ' ', fullCell = '#') {
  const [minX, minY, maxX, maxY] = drawResult.bbox;
  const buffer = new Set(drawResult.pixels.map(([x, y]) => `${x},${y}`));
  const lines = [];
  for (var y = minY; y <= maxY; y++) {
    const line = [];
    for (var x = minX; x <= maxX; x++) {
      line.push(buffer.has(`${x},${y}`) ? fullCell : emptyCell);
    }
    lines.push(line);
  }
  return lines;
};
