const fs = require('fs');

const raw = fs.readFileSync('c:/Users/HP/Desktop/ITA/SaniNova/pptx_clean.txt', 'utf8');
const slides = raw.split(/--- SLIDE \d+ ---/).map(s => s.trim()).filter(s => s);

const modulesData = [];
let currentModuleTitle = "Introduction";
let currentModuleObj = {
  id: "gas-m1",
  title: "Module 1 : Introduction",
  chapters: []
};
modulesData.push(currentModuleObj);

let moduleCounter = 2;
let chapterCounter = 1;

const isTableRow = (line) => line.includes(' | ');

const formatSlideContent = (lines) => {
  let md = [];
  let inTable = false;
  let tableCols = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    if (isTableRow(line)) {
      if (!inTable) {
        // Start of table
        const cells = line.split('|').map(c => c.trim());
        tableCols = cells.length;
        md.push('| ' + cells.join(' | ') + ' |');
        md.push('|' + Array(tableCols).fill('---').join('|') + '|');
        inTable = true;
      } else {
        const cells = line.split('|').map(c => c.trim());
        while(cells.length < tableCols) cells.push('');
        md.push('| ' + cells.join(' | ') + ' |');
      }
    } else {
      if (inTable) {
        md.push('');
        inTable = false;
      }
      
      // Auto formatting lists
      if (line.match(/^[a-zA-Z0-9]/) && (lines[i-1] && isTableRow(lines[i-1]))) {
          md.push('\n' + line);
      } else if (line.match(/^[-•]/)) {
          md.push(line);
      } else if (line.length < 80 && !line.includes(':') && i === 0) {
        md.push(`#### ${line}\n`);
      } else {
        md.push(line + '\n');
      }
    }
  }
  return md.join('\n').replace(/\n{3,}/g, '\n\n');
};

for (let slide of slides) {
  const lines = slide.split(/\r?\n/).map(l => l.trim()).filter(l => l);
  if (lines.length < 2) continue;
  
  let titleCandidate = lines[0];
  
  if (titleCandidate.toUpperCase() === "GESTION DES APPROVISIONNEMENTS ET DES STOCKS") {
      titleCandidate = lines[1] || titleCandidate;
      lines.shift();
  }
  
  // Section headers check
  if (titleCandidate !== currentModuleTitle && titleCandidate.length > 5 && titleCandidate.length < 100) {
    // If it's a completely new section
    if (
      titleCandidate.includes("Principes") ||
      titleCandidate.includes("Définitions") ||
      titleCandidate.includes("Types de stocks") ||
      titleCandidate.includes("Indicateurs") ||
      titleCandidate.includes("bonnes pratiques") ||
      titleCandidate.includes("Cycle de commande") ||
      titleCandidate.includes("Sélection et évaluation") ||
      titleCandidate.includes("contrats") ||
      titleCandidate.includes("Outils de suivi") ||
      titleCandidate.includes("Gestion des ruptures")
    ) {
      currentModuleTitle = titleCandidate;
      currentModuleObj = {
        id: `gas-m${moduleCounter}`,
        title: `Module ${moduleCounter} : ${currentModuleTitle}`,
        chapters: []
      };
      modulesData.push(currentModuleObj);
      moduleCounter++;
      chapterCounter = 1;
    }
  }
  
  if (currentModuleObj) {
    const contentLines = lines; // keep the title in the slide content
    const contentMd = formatSlideContent(contentLines);
    if (contentMd.trim() && contentMd.trim() !== "#### Plan") {
       currentModuleObj.chapters.push({
         id: `gas-m${moduleCounter-1}-c${chapterCounter}`,
         title: titleCandidate && titleCandidate.length < 60 ? titleCandidate : `Chapitre ${chapterCounter}`,
         type: "text",
         duration: "10 min",
         content: contentMd
       });
       chapterCounter++;
    }
  }
}

// remove empty modules
const finalModules = modulesData.filter(m => m.chapters.length > 0);

const tsContent = `// Fichier généré automatiquement avec le contenu propre du PPTX
export const gestionApprovisionnementsCourse: any[] = ${JSON.stringify(finalModules, null, 2)};
`;

fs.writeFileSync('c:/Users/HP/Desktop/ITA/SaniNova/src/data/courses/gestionApprovisionnements.ts', tsContent, 'utf8');
console.log("Formatted TS generated successfully.");
