const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `Le point de commande avec délai variable\\n\\nDans la réalité, le délai de livraison n'est jamais parfaitement stable. Une approche plus rigoureuse intègre cette variabilité.\\n\\nPoint de commande = (CMM × DL moyen) + (Z × σ × √DL)\\n\\nZ = facteur de service (1,65 pour un taux de service de 95%)\\n\\nσ = écart-type de la consommation mensuelle\\n\\nDL = délai de livraison en mois\\n\\nCette formule statistique est utilisée dans les systèmes informatisés.\\n\\nDans un contexte manuel, on simplifie en utilisant le délai maximum observé plutôt que la moyenne.`;

const replaceStr = `### Le point de commande avec délai variable\\n\\n- Dans la réalité, le délai de livraison n'est jamais parfaitement stable. Une approche plus rigoureuse intègre cette variabilité.\\n\\n- **Point de commande = (CMM × DL moyen) + (Z × σ × √DL)**\\n  - **Z** = facteur de service (1,65 pour un taux de service de 95%)\\n  - **σ** = écart-type de la consommation mensuelle\\n  - **DL** = délai de livraison en mois\\n\\n- Cette formule statistique est utilisée dans les systèmes informatisés.\\n\\n- Dans un contexte manuel, on simplifie en utilisant le délai maximum observé plutôt que la moyenne.`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Liste à puces avec indentation ajoutée pour le délai variable !');
} else {
  // Option 2, depending on my previous scripts, maybe I formatted some bold before but didn't put bullets? Let's be safe.
  const searchStr2 = `Dans la réalité, le délai de livraison n'est jamais parfaitement stable. Une approche plus rigoureuse intègre cette variabilité.\\n\\n**Point de commande = (CMM × DL moyen) + (Z × σ × √DL)**\\n\\n**Z = facteur de service (1,65 pour un taux de service de 95%)**\\n\\n**σ = écart-type de la consommation mensuelle**\\n\\n**DL = délai de livraison en mois**\\n\\nCette formule statistique est utilisée dans les systèmes informatisés.\\n\\nDans un contexte manuel, on simplifie en utilisant le délai maximum observé plutôt que la moyenne.`;
  if (content.includes(searchStr2)) {
    content = content.replace(searchStr2, replaceStr);
    fs.writeFileSync(file, content);
    console.log('Liste à puces avec indentation ajoutée pour le délai variable (variante 2) !');
  } else {
    // We can also just replace using regex if there are small spaces difference.
    console.log('Erreur : section non trouvée. Verification des regex...');
    content = content.replace(/Le point de commande avec délai variable[\s\S]*?Dans un contexte manuel, on simplifie en utilisant le délai maximum observé plutôt que la moyenne\./g, replaceStr);
    fs.writeFileSync(file, content);
    console.log('Remplacement regex effectué.');
  }
}
