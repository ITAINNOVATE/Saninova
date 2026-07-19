const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'data', 'certificationsData.ts');
let content = fs.readFileSync(filePath, 'utf8');
const idx = content.indexOf('certificationsData');
console.log(`idx = ${idx}`);
if (idx !== -1) {
  console.log(content.substring(idx - 50, idx + 250));
}
process.exit(0);
