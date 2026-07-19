const fs = require('fs');
const content = fs.readFileSync('src/data/courses/gestionApprovisionnements.ts', 'utf8');
const lines = content.split('\n');

let currentChapter = '';
let inContent = false;
let contentBuffer = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"title":')) {
    currentChapter = line.trim();
  }
  if (line.includes('"content": "')) {
    inContent = true;
    contentBuffer = line.split('"content": "')[1];
  } else if (inContent) {
    contentBuffer += '\n' + line;
  }
  
  if (inContent && line.endsWith('",') || line.endsWith('"\r') || line.endsWith('"')) {
    inContent = false;
    
    // Convert escaped newlines for analysis
    const decoded = contentBuffer.replace(/\\n/g, '\n');
    
    if (decoded.includes('Les paramètres de base') || 
        decoded.includes('Formule') || 
        decoded.includes('Point de commande')) {
      console.log('=== ' + currentChapter + ' ===\n' + decoded.substring(0, 500) + '...\n');
    }
  }
}
