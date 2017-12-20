const fs = require('fs');

function bdf2json(data) {
  const chars = {};
  let char = null;
  let inBitmap = false;
  const lines = data.split(/[\r\n]+/g).map(line => line.split(' '));
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(line[0] === 'ENDCHAR') {
      char = null;
      inBitmap = false;
      continue;
    }
    if(line[0] == 'STARTCHAR') {
      char = {
        id: line[1],
        bitmap: [],
      };
      chars[char.id] = char;
      inBitmap = false;
      continue;
    }
    if(char && line[0] === 'ENCODING') {
      char.encoding = parseInt(line[1], 10);
      continue;
    }
    if(char && line[0] === 'BBX') {
      char.bbox = line.slice(1).map((c) => parseInt(c, 10));
      continue;
    }
    if(char && (line[0] === 'SWIDTH' || line[0] === 'DWIDTH')) {
      char[line[0].toLowerCase()] = line.slice(1).map((c) => parseInt(c, 10));
      continue;
    }
    if(char && line[0] === 'BITMAP') {
      inBitmap = true;
      continue;
    }
    if(char && inBitmap) {
      char.bitmap.push(parseInt(line[0], 16));
      continue;
    }
  }
  return {chars, props: {}};
}

const inData = fs.readFileSync(process.argv[2], 'UTF-8');
const outData = bdf2json(inData);
console.log(JSON.stringify(outData, null, 2));