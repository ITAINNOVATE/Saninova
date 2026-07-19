const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `### Réaliser des inventaires réguliers\\n\\n| | |\\n| --- | --- |\\n| **Principe** | L'inventaire est le seul moyen de vérifier que les données dans le système correspondent à la réalité physique. Sans inventaire régulier, les écarts s'accumulent et les décisions deviennent de moins en moins fiables. |`;

const replaceStr = `### Réaliser des inventaires réguliers\\n\\n| | |\\n| --- | --- |\\n| **Principe** | L'inventaire est le seul moyen de vérifier que les données dans le système correspondent à la réalité physique. Sans inventaire régulier, les écarts s'accumulent et les décisions deviennent de moins en moins fiables. |\\n\\n#### Fréquences\\n\\n| Type d'inventaire | Fréquence | Objectif |\\n| --- | --- | --- |\\n| **Inventaire complet** | 2 fois par an minimum | Vérification globale de tous les produits |\\n| **Inventaire tournant** | Mensuel, Par rotation de zones | Maintien continu de la précision |\\n| **Inventaire de contrôle** | À chaque changement de responsable | Passation de service propre |\\n| **Inventaire d'urgence** | En cas de suspicion de vol ou d'erreur | Vérification ciblée |`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Tableau des fréquences injecté avec succès !');
} else {
  console.log('Erreur : section non trouvée.');
}
