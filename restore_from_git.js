const { execSync } = require('child_process');
const fs = require('fs');

// Get the file content from git at the known good commit
const content = execSync('git show a0a1c93:src/data/courses/gestionApprovisionnements.ts').toString('utf8');

// Fix the TypeScript type annotation
const fixed = content.replace(
  'export const gestionApprovisionnementsCourse =',
  'export const gestionApprovisionnementsCourse: any[] ='
);

// Write as UTF-8 without BOM
fs.writeFileSync('src/data/courses/gestionApprovisionnements.ts', fixed, { encoding: 'utf8' });

console.log('Done! Length:', fixed.length);
console.log('Preview:', fixed.substring(0, 200));
