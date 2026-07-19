const officeParser = require('officeparser');
const fs = require('fs');
const path = require('path');

const files = [
  'Lot2_Article2_CentralesAchat_SaniNova.docx',
  'Lot2_Article3_AgencesReglementaires_SaniNova.docx',
  'Lot2_Article4_PTF_SaniNova.docx'
];

async function run() {
  for (const file of files) {
    const filePath = path.join(__dirname, 'Articles', file);
    try {
      const ast = await officeParser.parseOffice(filePath);
      const text = ast.toText();
      const txtPath = path.join(__dirname, file.replace('.docx', '.txt'));
      fs.writeFileSync(txtPath, text);
      console.log(`Successfully wrote extracted text to: ${txtPath}`);
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }
}

run();
