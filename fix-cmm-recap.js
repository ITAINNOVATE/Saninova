const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `"content": "#### Calcul de la consommation moyenne mensuelle (CMM)\\n\\nRécapitulatif — Étapes de calcul d'une CMM fiable\\n"`;

const replaceStr = `"content": "#### Calcul de la consommation moyenne mensuelle (CMM)\\n\\n### Récapitulatif — Étapes de calcul d'une CMM fiable\\n\\n| Étape | Action |\\n| --- | --- |\\n| **1** | Collecter les données de consommation sur 3, 6 ou 12 mois |\\n| **2** | Identifier les mois de rupture totale et les exclure |\\n| **3** | Identifier les mois de rupture partielle et extrapoler la consommation réelle |\\n| **4** | Identifier les mois atypiques (épidémies, événements exceptionnels) et les exclure |\\n| **5** | Calculer la CMM sur les mois valides restants |\\n| **6** | Vérifier si le produit est saisonnier et calculer des CMM saisonnières si nécessaire |\\n| **7** | Réviser la CMM tous les trimestres ou semestres |\\n"`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Tableau récapitulatif CMM injecté !');
} else {
  console.log('Erreur : section non trouvée.');
}
