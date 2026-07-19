const fs = require('fs');
const content = fs.readFileSync('src/data/courses/gestionApprovisionnements.ts', 'utf8');

// Extract the content starting from gas-m2-c20 until the end of the file.
const startIndex = content.indexOf('"id": "gas-m3-c1"');
if (startIndex !== -1) {
    const textToAnalyze = content.substring(startIndex, startIndex + 5000);
    console.log(textToAnalyze);
}
