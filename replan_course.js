const fs = require('fs');

const content = fs.readFileSync('./src/data/courses/gestionApprovisionnements.ts', 'utf8');
const match = content.match(/export const gestionApprovisionnementsCourse: any\[\] = (\[[\s\S]*\]);/);

if (match) {
  const data = JSON.parse(match[1]);
  
  // Flatten all chapters into one array
  let allChapters = [];
  data.forEach(mod => {
    mod.chapters.forEach(c => {
      // Remove any useless Chapitres or Plan if they are literally just saying Plan
      if (c.title === "Chapitres" && c.content.includes("Principes fondamentaux")) {
        return; // skip the intro summary chapter
      }
      if (c.title === "ACADEMIE SUPPLY CHAIN SANTE") return; // skip useless intro
      allChapters.push(c);
    });
  });

  const newModules = [
    { id: 'gas-m1', title: 'Module 1 : Principes fondamentaux de la gestion des stocks', chapters: [] },
    { id: 'gas-m2', title: 'Module 2 : Méthodes de calcul des niveaux de stock', chapters: [] },
    { id: 'gas-m3', title: 'Module 3 : Processus de commande et suivi fournisseurs', chapters: [] },
    { id: 'gas-m4', title: 'Module 4 : Gestion des ruptures et des surstocks', chapters: [] },
    { id: 'gas-m5', title: 'Module 5 : Systèmes d\'inventaire et outils digitaux', chapters: [] }
  ];

  let currentModIndex = 0;

  for (let c of allChapters) {
    let t = c.title || "";
    
    // Check if this chapter marks the beginning of a new module
    if (t === "Méthodes de calcul des niveaux de stock" && currentModIndex < 1) {
      currentModIndex = 1;
    } else if (t === "Processus de commande et suivi fournisseurs" && currentModIndex < 2) {
      currentModIndex = 2;
    } else if (t === "Cycle de commande : de la quantification à la réception" && currentModIndex < 2) {
      currentModIndex = 2;
    } else if (t === "Gestion des ruptures et des surstocks" && currentModIndex < 3) {
      currentModIndex = 3;
    } else if (t === "Systèmes d'inventaire et outils digitaux" && currentModIndex < 4) {
      currentModIndex = 4;
    }
    
    // Re-ID
    c.id = `gas-m${currentModIndex+1}-c${newModules[currentModIndex].chapters.length + 1}`;
    
    // Add to current module
    newModules[currentModIndex].chapters.push(c);
  }

  const newContent = content.replace(match[1], JSON.stringify(newModules, null, 2));
  fs.writeFileSync('./src/data/courses/gestionApprovisionnements.ts', newContent, 'utf8');
  console.log("Course replanned successfully.");
} else {
  console.log("Failed to match JSON array.");
}
