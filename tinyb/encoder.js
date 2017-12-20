const chars = {
  '0': '.xx x.x x.x x.x xx.',
  '1': '.x. xx. .x. .x. .x.',
  '2': 'xx. ..x .x. x.. xxx',
  '3': 'xx. ..x .x. ..x xx.',
  '4': 'x.x x.x xxx ..x ..x',
  '5': 'xxx x.. xx. ..x xx.',
  '6': '.xx x.. xxx x.x xxx',
  '7': 'xxx ..x .x. x.. x..',
  '8': 'xxx x.x xxx x.x xxx',
  '9': 'xxx x.x xxx ..x xxx',
  '.': '... ... ... ... .x.',
  '-': '... ... xxx ... ...',
  k: 'x.. x.x xx. xx. x.x'
};

function encode(dots) {
  dots = dots.replace(/\s+/g, '');
  if (dots.length > 15) {
    throw new Error('improper dots: ' + dots);
  }
  let val = 0;
  for (let i = 0; i < dots.length; i++) {
    if (dots[i] !== '.') {
      val |= 1 << i;
    }
  }
  return val;
}

const encoded = {};
Object.keys(chars).forEach(char => {
  encoded[char] = encode(chars[char]);
});
console.log(JSON.stringify(encoded));
