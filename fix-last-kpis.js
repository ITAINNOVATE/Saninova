const fs = require('fs');

const replacements = [
  {
    search: `### Valeur du stock immobilisé\\n\\n> Définition\\n\\nFormule\\n\\nInterprétation\\n\\nMontant financier total des produits en surstock ou en stock mort, non utiles à la demande courante.\\n\\nQuantité en excédent × Prix unitaire\\n\\nPar produit, puis total\\n\\n< 5 % de la valeur totale du stock : Acceptable\\n\\n5–10 % de la valeur totale du stock : À surveiller\\n\\n> 10 % de la valeur totale du stock : Perte financière significative, Correction urgente`,
    replace: `### Valeur du stock immobilisé\\n\\n| | |\\n| --- | --- |\\n| **Définition** | Montant financier total des produits en surstock ou en stock mort, non utiles à la demande courante. |\\n| **Formule** | Quantité en excédent × Prix unitaire<br/>*(Par produit, puis total)* |\\n| **Interprétation** | **< 5 % de la valeur totale du stock :** Acceptable<br/><br/>**5–10 % de la valeur totale du stock :** À surveiller<br/><br/>**> 10 % de la valeur totale du stock :** Perte financière significative, Correction urgente |`
  },
  {
    search: `### Taux de rotation des stocks\\n\\n> Définition\\n\\nFormule\\n\\nInterprétation\\n\\nVitesse à laquelle le stock est entièrement renouvelé sur une période donnée\\n\\nQuantité consommée sur la période ÷ Stock moyen de la période\\n\\n4–6 rotations/an : Gestion saine\\n\\n2–3 rotations/an : Stock lent, surveiller\\n\\n< 2 rotations/an : Stock dormant, action requise`,
    replace: `### Taux de rotation des stocks\\n\\n| | |\\n| --- | --- |\\n| **Définition** | Vitesse à laquelle le stock est entièrement renouvelé sur une période donnée |\\n| **Formule** | Quantité consommée sur la période ÷ Stock moyen de la période |\\n| **Interprétation** | **4–6 rotations/an :** Gestion saine<br/><br/>**2–3 rotations/an :** Stock lent, surveiller<br/><br/>**< 2 rotations/an :** Stock dormant, action requise |`
  },
  {
    search: `### Délai moyen de livraison\\n\\n> Définition\\n\\nFormule\\n\\nInterprétation\\n\\nTemps moyen écoulé entre la date de commande et la date de livraison effective des produits\\n\\nSomme des délais observés ÷ Nombre de commandes sur la période\\n\\nConforme au contrat : Fournisseur ponctuel\\n\\nDépassement < 20 % : Tolérable\\n\\nDépassement > 20 % : Revoir le plan de distribution ou les méécanismes de livraison`,
    replace: `### Délai moyen de livraison\\n\\n| | |\\n| --- | --- |\\n| **Définition** | Temps moyen écoulé entre la date de commande et la date de livraison effective des produits |\\n| **Formule** | Somme des délais observés ÷ Nombre de commandes sur la période |\\n| **Interprétation** | **Conforme au contrat :** Fournisseur ponctuel<br/><br/>**Dépassement < 20 % :** Tolérable<br/><br/>**Dépassement > 20 % :** Revoir le plan de distribution ou les méécanismes de livraison |`
  }
];

let fileContent = fs.readFileSync('src/data/courses/gestionApprovisionnements.ts', 'utf8');

let matchCount = 0;
for (const item of replacements) {
  if (fileContent.includes(item.search)) {
    fileContent = fileContent.replace(item.search, item.replace);
    matchCount++;
  } else {
    console.log("Could not find:\\n" + item.search.substring(0, 50) + "...");
  }
}

fs.writeFileSync('src/data/courses/gestionApprovisionnements.ts', fileContent);
console.log('Replaced ' + matchCount + ' remaining instances successfully.');
