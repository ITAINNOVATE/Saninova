const fs = require('fs');

const terms = [
  "Le Stock",
  "Stock de sécurité (SS)",
  "Stock minimum",
  "Stock maximum",
  "Stock disponible",
  "Point de commande",
  "Délai de livraison",
  "Consommation Moyenne Mensuelle",
  "Taux de rotation des stocks",
  "Rupture de stock",
  "Surstock ou surstockage",
  "Péremption (Date de péremption)",
  "FEFO (First Expired, First Out)",
  "FIFO (First In, First Out)",
  "Inventaire",
  
  "Stock de cycle",
  "Stock de sécurité",
  "Stock en transit",
  "Stock spéculatif",
  "Stock mort (ou stock dormant)",
  "Stock de consignation",
  
  "Taux de disponibilité des produits",
  "Taux de rupture de stock",
  "Taux de surstockage",
  "Taux de péremption",
  "Mois de stock disponible",
  "Taux de satisfaction des besoins",
  "Valeur du stock immobilisé",
  "Délai moyen de livraison",
  "Synthèse"
];

let content = fs.readFileSync('./src/data/courses/gestionApprovisionnements.ts', 'utf8');

// Match the array export
const match = content.match(/export const gestionApprovisionnementsCourse: any\[\] = (\[[\s\S]*\]);/);
if (match) {
  let data = JSON.parse(match[1]);
  
  for (let mod of data) {
    for (let chap of mod.chapters) {
      let lines = chap.content.split('\n');
      let foundTerm = null;
      let termIndex = -1;
      
      for (let i = 0; i < lines.length; i++) {
        let trimmed = lines[i].trim();
        for (let term of terms) {
          if (trimmed === term) {
            foundTerm = term;
            termIndex = i;
            break;
          }
        }
        if (foundTerm) break;
      }
      
      if (foundTerm) {
        // Remove the term from its original position
        lines.splice(termIndex, 1);
        
        // Find the first header (usually lines[0]) and insert right after it
        let insertIndex = 0;
        if (lines[0] && lines[0].startsWith('####')) {
          insertIndex = 1;
        }
        
        lines.splice(insertIndex, 0, '\n### ' + foundTerm);
        
        // Update the chapter title
        chap.title = foundTerm;
        chap.content = lines.join('\n').replace(/\n{3,}/g, '\n\n');
      }
    }
  }
  
  const newContent = content.replace(match[1], JSON.stringify(data, null, 2));
  fs.writeFileSync('./src/data/courses/gestionApprovisionnements.ts', newContent, 'utf8');
  console.log("Updated terms and titles successfully.");
} else {
  console.log("Could not parse file.");
}
