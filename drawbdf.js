const fs = require('fs');
const parseBdf = require('./lib/parse-bdf');
const drawText = require('./lib/draw');
const rasterizeToLines = require('./lib/raster');
if (process.argv.length <= 2) {
  console.error(`usage: ${process.argv[1]} bdf-file.bdf "text here"`);
  process.exit(1);
}
const fontData = parseBdf(fs.readFileSync(process.argv[2], 'UTF-8'));
const text = process.argv[3] || 'Hi';
const res = drawText(fontData, text);
const lines = rasterizeToLines(res, ' ', '#');
lines.forEach(line => {
  console.log(line.join(' '));
});
