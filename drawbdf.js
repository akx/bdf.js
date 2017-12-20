const fs = require('fs');
const parseBdf = require('./lib/parse-bdf');
const drawText = require('./lib/draw');
if (process.argv.length <= 2) {
  console.error(`usage: ${process.argv[1]} bdf-file.bdf "text here"`);
  process.exit(1);
}
const fontData = parseBdf(fs.readFileSync(process.argv[2], 'UTF-8'));
const text = process.argv[3] || 'Hi';
const res = drawText(fontData, text);
const [minX, minY, maxX, maxY] = res.bbox;
const buffer = new Set(res.pixels.map(([x, y]) => `${x},${y}`));
for (var y = minY; y <= maxY; y++) {
  const line = [];
  for (var x = minX; x <= maxX; x++) {
    line.push(buffer.has(`${x},${y}`) ? '#' : ' ');
  }
  console.log(line.join(''));
}
