const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  {
    search: `Les paramètres de base\\n\\nAvant de calculer le min et le max, trois paramètres doivent être connus avec précision pour chaque produit :\\n- La CMM (Consommation Moyenne Mensuelle) : Calculée selon la méthode vue au point précédent. C'est le moteur de tous les calculs.\\n\\nLe Délai de Livraison (DL) : Temps moyen entre la date de commande et la date de réception effective. Il doit être calculé sur l'historique réel des commandes, pas estimé à vue d'œil.\\n\\nLa Période de Commande (PC) : Intervalle de temps entre deux commandes successives. Si la pharmacie commande tous les 2 mois, PC = 2 mois.`,
    replace: `### Les paramètres de base\\n\\nAvant de calculer le min et le max, trois paramètres doivent être connus avec précision pour chaque produit :\\n\\n- **La CMM (Consommation Moyenne Mensuelle) :** Calculée selon la méthode vue au point précédent. C'est le moteur de tous les calculs.\\n- **Le Délai de Livraison (DL) :** Temps moyen entre la date de commande et la date de réception effective. Il doit être calculé sur l'historique réel des commandes, pas estimé à vue d'œil.\\n- **La Période de Commande (PC) :** Intervalle de temps entre deux commandes successives. Si la pharmacie commande tous les 2 mois, PC = 2 mois.`
  },
  {
    search: `Calcul du Stock de Sécurité (SS)\\n\\nLe stock de sécurité est le socle sur lequel reposent tous les autres calculs. Il représente la protection contre les aléas.\\n\\nSS = CMM × Nombre de mois de couverture de sécurité\\n\\nLe nombre de mois de couverture de sécurité est généralement fixé par la politique nationale ou par le niveau hiérarchique supérieur.\\n\\nEn l'absence de directive, on recommande :\\n- 1 mois pour les produits avec un fournisseur fiable et un délai court\\n- 2 mois pour les produits critiques ou avec un fournisseur peu fiable`,
    replace: `### Calcul du Stock de Sécurité (SS)\\n\\nLe stock de sécurité est le socle sur lequel reposent tous les autres calculs. Il représente la protection contre les aléas.\\n\\n> **SS = CMM × Nombre de mois de couverture de sécurité**\\n\\nLe nombre de mois de couverture de sécurité est généralement fixé par la politique nationale ou par le niveau hiérarchique supérieur.\\n\\nEn l'absence de directive, on recommande :\\n- **1 mois** pour les produits avec un fournisseur fiable et un délai court\\n- **2 mois** pour les produits critiques ou avec un fournisseur peu fiable`
  },
  {
    search: `Calcul du Stock Minimum (Stock min)\\n\\nLe stock minimum est le niveau qui déclenche la commande.\\n\\nQuand le stock atteint ce niveau, il faut commander immédiatement.\\n\\nStock min = (CMM × Délai de livraison) + Stock de sécurité`,
    replace: `### Calcul du Stock Minimum (Stock min)\\n\\nLe stock minimum est le niveau qui déclenche la commande.\\n\\nQuand le stock atteint ce niveau, il faut commander immédiatement.\\n\\n> **Stock min = (CMM × Délai de livraison) + Stock de sécurité**`
  },
  {
    search: `Calcul du Stock Maximum (Stock max)\\n\\nLe stock maximum est le niveau optimal à atteindre après chaque livraison.\\n\\nIl ne doit pas être dépassé.\\n\\nStock max = Stock min + (CMM × Période de commande)\\n\\nCalcul de la Quantité à Commander (QàC)\\n\\nC'est la quantité qui doit être commandée pour ramener le stock au niveau maximum.\\n\\nQàC = Stock max − Stock disponible actuel`,
    replace: `### Calcul du Stock Maximum (Stock max)\\n\\nLe stock maximum est le niveau optimal à atteindre après chaque livraison. Il ne doit pas être dépassé.\\n\\n> **Stock max = Stock min + (CMM × Période de commande)**\\n\\n### Calcul de la Quantité à Commander (QàC)\\n\\nC'est la quantité qui doit être commandée pour ramener le stock au niveau maximum.\\n\\n> **QàC = Stock max − Stock disponible actuel**`
  },
  {
    search: `"content": "Méthode min/max : formules et application\\n\\nRécapitulatif des formules min/max\\n"`,
    replace: `"content": "#### Méthode min/max : formules et application\\n\\n### Récapitulatif des formules min/max\\n\\n| Paramètre | Formule |\\n| --- | --- |\\n| **Stock de Sécurité (SS)** | CMM × Nombre de mois de couverture de sécurité |\\n| **Stock Minimum** | (CMM × Délai de livraison) + SS |\\n| **Stock Maximum** | Stock min + (CMM × Période de commande) |\\n| **Quantité à Commander (QàC)** | Stock max − Stock disponible actuel |\\n"`
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
console.log('Fixed ' + matchCount + ' formatting issues successfully.');
