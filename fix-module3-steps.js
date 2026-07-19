const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  {
    search: `Vue d'ensemble du cycle de commande\\n\\nÉtape 1 : Quantification des besoins\\n\\nÉtape 2 : Élaboration du bon de commande\\n\\nÉtape 3 : Validation et approbation\\n\\nÉtape 4 : Transmission au fournisseur\\n\\nÉtape 5 : Traitement par le fournisseur\\n\\nÉtape 6 : Expédition et transport\\n\\nÉtape 7 : Réception et contrôle\\n\\nChaque étape a ses acteurs, ses documents et ses délais.`,
    replace: `### Vue d'ensemble du cycle de commande\\n\\n1. **Étape 1 :** Quantification des besoins\\n2. **Étape 2 :** Élaboration du bon de commande\\n3. **Étape 3 :** Validation et approbation\\n4. **Étape 4 :** Transmission au fournisseur\\n5. **Étape 5 :** Traitement par le fournisseur\\n6. **Étape 6 :** Expédition et transport\\n7. **Étape 7 :** Réception et contrôle\\n\\nChaque étape a ses acteurs, ses documents et ses délais.`
  },
  {
    search: `Étape 1 — Quantification des besoins\\n\\nDéfinition : La quantification est le processus de calcul des quantités de chaque produit à commander pour couvrir les besoins jusqu'à la prochaine livraison.\\n\\nQui la fait? : Le gestionnaire de la pharmacie ou du dépôt, assisté si possible d'un responsable de programme (paludisme, VIH, CPN, etc.) pour les produits de programmes spécifiques.\\n\\nComment ? En appliquant la formule : QàC = Stock max − Stock disponible actuel\\n\\nDocuments produits à cette étape : Fiche de collecte des données de stock et tableau de quantification rempli et signé\\n\\nErreurs fréquentes à éviter :`,
    replace: `### Étape 1 — Quantification des besoins\\n\\n- **Définition :** La quantification est le processus de calcul des quantités de chaque produit à commander pour couvrir les besoins jusqu'à la prochaine livraison.\\n- **Qui la fait ? :** Le gestionnaire de la pharmacie ou du dépôt, assisté si possible d'un responsable de programme (paludisme, VIH, CPN, etc.) pour les produits de programmes spécifiques.\\n- **Comment ?** En appliquant la formule : **QàC = Stock max − Stock disponible actuel**\\n- **Documents produits à cette étape :** Fiche de collecte des données de stock et tableau de quantification rempli et signé\\n\\n**Erreurs fréquentes à éviter :**`
  },
  {
    search: `Étape 2 — Élaboration du bon de commande\\n\\nDéfinition :`,
    replace: `### Étape 2 — Élaboration du bon de commande\\n\\n**Définition :**`
  },
  {
    search: `Étape 3 — Validation et approbation\\n\\nDéfinition :\\n\\nAvant d'être transmis au fournisseur, le bon de commande doit être validé par l'autorité compétente. Cette étape garantit que la commande est justifiée, correctement calculée et dans les limites budgétaires disponibles.\\n\\nCe que le valideur vérifie :`,
    replace: `### Étape 3 — Validation et approbation\\n\\n**Définition :**\\n\\nAvant d'être transmis au fournisseur, le bon de commande doit être validé par l'autorité compétente. Cette étape garantit que la commande est justifiée, correctement calculée et dans les limites budgétaires disponibles.\\n\\n**Ce que le valideur vérifie :**`
  }
];

let matchCount = 0;
for (const item of replacements) {
  if (content.includes(item.search)) {
    content = content.replace(item.search, item.replace);
    matchCount++;
  } else {
    console.log("Could not find:\\n" + item.search.substring(0, 50) + "...");
  }
}

fs.writeFileSync(file, content);
console.log('Fixed ' + matchCount + ' formatting issues in Module 3 successfully.');
