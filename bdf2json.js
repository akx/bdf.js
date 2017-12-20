const fs = require('fs');
const parseBdf = require('./lib/parse-bdf');
const jsonData = parseBdf(fs.readFileSync(process.argv[2], 'UTF-8'));
console.log(JSON.stringify(jsonData, null, 2));
