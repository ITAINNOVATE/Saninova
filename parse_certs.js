const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'certificationsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const declIdx = content.indexOf('export const certificationsData');
console.log('declIdx:', declIdx);
const startIdx = content.indexOf(' = [', declIdx) + 3;
console.log('startIdx:', startIdx);
let braceCount = 0;
let endIdx = -1;

for (let i = startIdx; i < content.length; i++) {
  if (content[i] === '[') {
    braceCount++;
  } else if (content[i] === ']') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i;
      break;
    }
  }
}
console.log('endIdx:', endIdx);

const jsonStr = content.substring(startIdx, endIdx + 1);
console.log('jsonStr length:', jsonStr.length);
console.log('jsonStr start:', jsonStr.substring(0, 100));
console.log('jsonStr end:', jsonStr.substring(jsonStr.length - 100));

try {
  const certificationsData = JSON.parse(jsonStr);
  console.log('Parsed successfully! Length:', certificationsData.length);
  
  let totalCerts = 0;
  let totalModules = 0;
  const allModules = [];

  certificationsData.forEach(academy => {
    academy.certifications.forEach(cert => {
      totalCerts++;
      if (cert.modules) {
        cert.modules.forEach(mod => {
          totalModules++;
          allModules.push({
            academyId: academy.id,
            academyTitle: academy.title,
            certificationName: cert.name,
            moduleName: mod.name,
            duration: mod.duration,
            cost: mod.cost,
            chaptersCount: mod.subModules ? mod.subModules.length : 0
          });
        });
      }
    });
  });

  console.log(`Total Academies: ${certificationsData.length}`);
  console.log(`Total Certifications: ${totalCerts}`);
  console.log(`Total Modules: ${totalModules}`);
  console.log('Sample of first 5 modules:');
  console.log(JSON.stringify(allModules.slice(0, 5), null, 2));

} catch (e) {
  console.error("Failed to parse JSON:", e.message);
}
process.exit(0);
