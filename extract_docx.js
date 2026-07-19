const officeParser = require('officeparser');
const fs = require('fs');

async function extract() {
  try {
    const data = await officeParser.parseOfficeAsync('Formulaire_Experts_SaniNova_2026.docx');
    fs.writeFileSync('formulaire_experts.txt', data);
    console.log('Extracted successfully');
  } catch (err) {
    console.error(err);
  }
}
extract();
