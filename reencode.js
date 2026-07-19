const fs = require('fs');

// Re-encode both files as clean UTF-8
const files = [
  'src/data/courses/gestionApprovisionnements.ts',
  'src/data/courses/quantificationBesoins.ts'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Remove BOM if present
  content = content.replace(/^\uFEFF/, '');
  // Replace Windows line endings with Unix
  content = content.replace(/\r\n/g, '\n');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Re-encoded: ${file}`);
}
console.log('Done!');
