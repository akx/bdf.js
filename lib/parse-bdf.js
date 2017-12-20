module.exports = function parseBdf(bdfString) {
  const chars = [];
  const props = {};
  let char = null;
  let inBitmap = false;
  let inProps = true;
  const lines = bdfString.split(/[\r\n]+/g).map(line => line.split(' '));
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (inProps) {
      if (line[0] === 'ENDPROPERTIES' || line[0] === 'CHARS') {
        inProps = false;
        continue;
      }
      if (line[0] === 'FONT_ASCENT') {
        props.ascent = parseInt(line[1], 10);
        continue;
      }
      if (line[0] === 'FONT_DESCENT') {
        props.descent = parseInt(line[1], 10);
        continue;
      }
      if (line[0] === 'FONTBOUNDINGBOX') {
        props.bbox = line.slice(1).map(c => parseInt(c, 10));
        continue;
      }
      props[line[0]] = line.slice(1);
      continue;
    }
    if (line[0] === 'ENDCHAR') {
      char = null;
      inBitmap = false;
      continue;
    }
    if (line[0] == 'STARTCHAR') {
      char = {
        id: line.slice(1).join(' '),
        bitmap: [],
        bitmapBits: 0
      };
      chars.push(char);
      inBitmap = false;
      inProps = false;
      continue;
    }
    if (char && line[0] === 'ENCODING') {
      char.encoding = parseInt(line[1], 10);
      continue;
    }
    if (char && line[0] === 'BBX') {
      char.bbox = line.slice(1).map(c => parseInt(c, 10));
      continue;
    }
    if (char && (line[0] === 'SWIDTH' || line[0] === 'DWIDTH')) {
      char[line[0].toLowerCase()] = line.slice(1).map(c => parseInt(c, 10));
      continue;
    }
    if (char && line[0] === 'BITMAP') {
      inBitmap = true;
      continue;
    }
    if (char && inBitmap) {
      const val = parseInt(line[0], 16);
      char.bitmap.push(val);
      // Maximum bit-width for this glyph, rounded up to a byte
      char.bitmapBits = Math.max(char.bitmapBits, Math.ceil(Math.log2(val) / 8) * 8);
      continue;
    }
  }
  return { chars, props };
};
