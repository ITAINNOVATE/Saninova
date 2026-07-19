const fs = require('fs');

const raw = fs.readFileSync('c:/Users/HP/Desktop/ITA/SaniNova/pptx_clean_quantification.txt', 'utf8');
const slides = raw.split(/--- SLIDE \d+ ---/).map(s => s.trim()).filter(s => s);

const modulesData = [];
let currentModuleTitle = "Introduction";
let currentModuleObj = {
  id: "qb-m1",
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
  
  if (titleCandidate.toUpperCase() === "QUANTIFICATION DES BESOINS") {
      titleCandidate = lines[1] || titleCandidate;
      lines.shift();
  }
  
  // Create a new module if the title looks like a main section
  // For Quantification des besoins, the sections might include:
  // "Principes généraux", "Méthode de la morbidité", "Méthode de la consommation", "Processus de quantification", etc.
  if (titleCandidate !== currentModuleTitle && titleCandidate.length > 5 && titleCandidate.length < 100) {
    if (
      titleCandidate.includes("Principes généraux") ||
      titleCandidate.includes("concept") ||
      titleCandidate.includes("médicaments") ||
      titleCandidate.includes("Méthode") ||
      titleCandidate.includes("Processus") ||
      titleCandidate.includes("Outils") ||
      titleCandidate.includes("Pipeline") ||
      titleCandidate.includes("QAT") ||
      titleCandidate.includes("défis") ||
      titleCandidate.includes("Atelier pratique") ||
      titleCandidate.includes("Triangulation")
    ) {
      currentModuleTitle = titleCandidate;
      currentModuleObj = {
        id: `qb-m${moduleCounter}`,
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
         id: `qb-m${moduleCounter-1}-c${chapterCounter}`,
         title: titleCandidate && titleCandidate.length < 80 ? titleCandidate : `Chapitre ${chapterCounter}`,
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

const tsContent = `// Fichier généré automatiquement avec le contenu propre du PPTX Quantification
export const quantificationBesoinsCourse: any[] = ${JSON.stringify(finalModules, null, 2)};
`;

fs.writeFileSync('c:/Users/HP/Desktop/ITA/SaniNova/src/data/courses/quantificationBesoins.ts', tsContent, 'utf8');
console.log("Formatted TS generated successfully for Quantification.");
