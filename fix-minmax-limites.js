const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `"content": "Méthode min/max : formules et application\\n\\nLes limites de la méthode min/max et comment les contourner\\n"`;

const replaceStr = `"content": "#### Méthode min/max : formules et application\\n\\n### Les limites de la méthode min/max et comment les contourner\\n\\n| Limite | Impact | Solution |\\n| --- | --- | --- |\\n| **CMM mal calculée** | Tous les niveaux sont faux | Réviser la CMM régulièrement (tous les trimestres) |\\n| **Délai de livraison variable** | Le stock min ne protège pas suffisamment | Utiliser le délai maximum observé, pas la moyenne |\\n| **Changement soudain de la demande** | Stock min/max obsolètes rapidement | Recalculer dès qu'un changement est détecté |\\n| **Produits saisonniers** | Un seul min/max inadapté toute l'année | Calculer des min/max saisonniers |\\n| **Non-respect du calendrier de commande** | Commandes tardives, ruptures | Automatiser les alertes ou afficher les dates limites de commande |\\n"`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Tableau des limites min/max injecté avec succès !');
} else {
  console.log('Erreur : section non trouvée.');
}
