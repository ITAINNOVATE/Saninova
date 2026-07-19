const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `### Synthèse\\n\\n> "`;
const replaceStr = `### Synthèse\\n\\n| Type de stock | Rôle principal | Signal d'alerte |\\n| --- | --- | --- |\\n| **Stock de cycle** | Couvrir la demande entre deux commandes | Trop court → rupture fréquente |\\n| **Stock de sécurité** | Absorber les imprévus | Trop faible → exposition aux ruptures |\\n| **Stock de transit** | Produits en acheminement | Non comptabilisé → commandes doublées |\\n| **Stock spéculatif** | Anticiper une pénurie connue | Mal géré → surstock coûteux |\\n| **Stock mort** | Aucun — à éliminer | Présence prolongée → perte financière |\\n| **Stock de consignation** | Disponibilité sans immobilisation de trésorerie | Mauvais suivi → désaccords fournisseur |\\n"`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Table Synthèse injectée avec succès !');
} else {
  console.log('Erreur : Chaîne non trouvée. Voici ce qui est présent :');
  const index = content.indexOf('Synthèse');
  console.log(content.substring(index - 50, index + 50));
}
