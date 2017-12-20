const fs = require('fs');
const bdf2json = require('./lib/bdf2json');
const inData = fs.readFileSync(process.argv[2], 'UTF-8');
const outData = bdf2json(inData);
console.log(JSON.stringify(outData, null, 2));