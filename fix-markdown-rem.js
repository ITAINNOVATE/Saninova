const fs = require('fs');

const replacements = [
  {
    search: `### Stock de cycle\\n\\n> Définition\\n\\nRôle\\n\\nIllustration\\n\\nC'est la quantité de produits consommée entre deux commandes successives.\\n\\nIl représente le stock \\"normal\\" qui entre et sort régulièrement.\\n\\nOn parle aussi de stock d’activité ou de stock de roulement\\n\\nCouvrir la demande courante entre deux livraisons.\\n\\nUne pharmacie commande du Paracétamol toutes les 2 mois. CMM =1 200 comprimés.\\n\\nStock de cycle = 1 200 × 2 = 2 400 comprimés\\n\\nÀ la réception d'une livraison, le stock remonte de 2 400. Il descend progressivement jusqu'à la prochaine commande.\\n\\nC'est ce mouvement de \\"montée-descente\\" qui caractérise le stock de cycle.`,
    replace: `### Stock de cycle\\n\\n| | |\\n| --- | --- |\\n| **Définition** | C'est la quantité de produits consommée entre deux commandes successives.<br/><br/>Il représente le stock \\"normal\\" qui entre et sort régulièrement.<br/><br/>On parle aussi de stock d’activité ou de stock de roulement |\\n| **Rôle** | Couvrir la demande courante entre deux livraisons. |\\n| **Illustration** | Une pharmacie commande du Paracétamol toutes les 2 mois. CMM =1 200 comprimés.<br/><br/>**Stock de cycle = 1 200 × 2 = 2 400 comprimés**<br/><br/>À la réception d'une livraison, le stock remonte de 2 400. Il descend progressivement jusqu'à la prochaine commande.<br/><br/>C'est ce mouvement de \\"montée-descente\\" qui caractérise le stock de cycle. |`
  },
  {
    search: `### Stock en transit\\n\\n> Définition\\n\\nRôle\\n\\nIllustration\\n\\nProduits qui ont quitté le fournisseur ou le niveau supérieur de la chaîne mais qui ne sont pas encore arrivés à destination.\\n\\nIls existent physiquement mais ne sont pas encore disponibles à l’entrepôt.\\n\\nReprésente les ressources \\"en route\\" à prendre en compte dans la planification pour ne pas passer de commandes redondantes.\\n\\nLa Direction Régionale de la Santé a commandé 5 000 boîtes de Cotrimoxazole à la centrale d'achat nationale. La commande a été expédiée il y a 10 jours, le délai total est de 30 jours. Ces 5 000 boîtes constituent son stock en transit.\\n\\nStock effectif = Stock physique + Stock en transit − Commandes en attente`,
    replace: `### Stock en transit\\n\\n| | |\\n| --- | --- |\\n| **Définition** | Produits qui ont quitté le fournisseur ou le niveau supérieur de la chaîne mais qui ne sont pas encore arrivés à destination.<br/><br/>Ils existent physiquement mais ne sont pas encore disponibles à l’entrepôt. |\\n| **Rôle** | Représente les ressources \\"en route\\" à prendre en compte dans la planification pour ne pas passer de commandes redondantes. |\\n| **Illustration** | La Direction Régionale de la Santé a commandé 5 000 boîtes de Cotrimoxazole à la centrale d'achat nationale. La commande a été expédiée il y a 10 jours, le délai total est de 30 jours. Ces 5 000 boîtes constituent son stock en transit.<br/><br/>**Stock effectif = Stock physique + Stock en transit − Commandes en attente** |`
  },
  {
    search: `### Stock spéculatif\\n\\n> Définition\\n\\nRôle\\n\\nIllustration\\n\\nStock constitué volontairement en quantité supérieure à la normale, en anticipation d'une hausse des prix, d'une pénurie annoncée ou d'une rupture prévisible chez le fournisseur.\\n\\nProtéger la structure contre des risques externes connus à l'avance.\\n\\nUn gestionnaire apprend que le seul fabricant mondial d’AL va suspendre sa production pendant 3 mois pour maintenance. CMM = 800 boîtes.\\n\\nStock spéculatif = 800 × 3 = 2 400 boîtes supplémentaires\\n\\nAttention : \\t- Ce type de stock doit rester exceptionnel et justifié.\\n\\n- Mal géré, il génère des surstocks coûteux.`,
    replace: `### Stock spéculatif\\n\\n| | |\\n| --- | --- |\\n| **Définition** | Stock constitué volontairement en quantité supérieure à la normale, en anticipation d'une hausse des prix, d'une pénurie annoncée ou d'une rupture prévisible chez le fournisseur. |\\n| **Rôle** | Protéger la structure contre des risques externes connus à l'avance. |\\n| **Illustration** | Un gestionnaire apprend que le seul fabricant mondial d’AL va suspendre sa production pendant 3 mois pour maintenance. CMM = 800 boîtes.<br/><br/>**Stock spéculatif = 800 × 3 = 2 400 boîtes supplémentaires**<br/><br/>Attention :<br/>- Ce type de stock doit rester exceptionnel et justifié.<br/>- Mal géré, il génère des surstocks coûteux. |`
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
