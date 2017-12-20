const data = {
  '0': 15214,
  '1': 9370,
  '2': 29347,
  '3': 14499,
  '4': 18925,
  '5': 14543,
  '6': 31694,
  '7': 4775,
  '8': 31727,
  '9': 31215,
  '.': 8192,
  '-': 448,
  k: 22249
};

function drawText(ctx, x, y, text) {
  const x0 = x;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '.') x--;
    if (c === '\n') {
      y += 6;
      x = x0;
      continue;
    }
    const d = data[c] || 0xffff;
    for (let b = 0; b < 15; b++) {
      if (d & (1 << b)) {
        ctx.fillRect(x + b % 3, y + (0 | (b / 3)), 1, 1);
      }
    }
    x += c === '1' || c === '.' ? 3 : 4;
  }
}
