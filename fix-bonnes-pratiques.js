const fs = require('fs');

const replacements = [
  {
    search: `Principe\\n\\nBonnes pratiques\\n\\nOrganiser correctement l'espace de stockage\\n\\nUn stock bien organisé physiquement est la première condition d'une bonne gestion.\\n\\nSi on ne retrouve pas facilement un produit, on ne peut pas le gérer efficacement.\\n\\nSéparer les zones fonctionnelles\\n\\nRespecter les conditions de conservation\\n\\nTempérature ambiante (< 25°C à 30°C selon le produit) : Comprimés, gélules\\n\\nChaîne du froid (+2°C à +8°C) : Vaccins, insuline, certains réactifs\\n\\nÀ l'abri de la lumière : Métronidazole injectable, certains sirops\\n\\nÀ l'abri de l'humidité (Hygrométrie < 60 %) : Poudres, comprimés effervescents\\n\\nRanger les produits de façon logique\\n\\nAssurer l'accessibilité pour la rotation FEFO.`,
    replace: `### Organiser correctement l'espace de stockage\\n\\n| | |\\n| --- | --- |\\n| **Principe** | Un stock bien organisé physiquement est la première condition d'une bonne gestion.<br/><br/>Si on ne retrouve pas facilement un produit, on ne peut pas le gérer efficacement. |\\n| **Bonnes pratiques** | - **Séparer les zones fonctionnelles**<br/>- **Respecter les conditions de conservation**<br/>&nbsp;&nbsp;○ Température ambiante (< 25°C à 30°C selon le produit) : Comprimés, gélules<br/>&nbsp;&nbsp;○ Chaîne du froid (+2°C à +8°C) : Vaccins, insuline, certains réactifs<br/>&nbsp;&nbsp;○ À l'abri de la lumière : Métronidazole injectable, certains sirops<br/>&nbsp;&nbsp;○ À l'abri de l'humidité (Hygrométrie < 60 %) : Poudres, comprimés effervescents<br/>- **Ranger les produits de façon logique**<br/>- **Assurer l'accessibilité pour la rotation FEFO.** |`
  },
  {
    search: `Principe\\n\\nDocuments\\n\\nTenir des documents de stock rigoureux et à jour\\n\\nOn ne gère bien que ce que l'on mesure. Sans documentation fiable, toutes les décisions de commande et de distribution reposent sur des estimations, et les erreurs s'accumulent.\\n\\nLa fiche de stock : chaque mouvement (entrée ou sortie) doit être enregistré le jour même, avec la référence du document justificatif. Pas d’enregistrement différé.\\n\\nLe registre des commandes : Trace toutes les commandes : date, fournisseur, produits commandés, quantités, date de livraison attendue, date de réception effective, écarts.\\n\\nLe registre des périmés et des destructions : Tout produit retiré du stock pour péremption ou détérioration doit être enregistré, avec la quantité, la valeur, la raison et la signature du responsable. Cela permet le suivi du taux de péremption et protège le gestionnaire en cas de contrôle.`,
    replace: `### Tenir des documents de stock rigoureux et à jour\\n\\n| | |\\n| --- | --- |\\n| **Principe** | On ne gère bien que ce que l'on mesure. Sans documentation fiable, toutes les décisions de commande et de distribution reposent sur des estimations, et les erreurs s'accumulent. |\\n| **Documents** | - **La fiche de stock :** chaque mouvement (entrée ou sortie) doit être enregistré le jour même, avec la référence du document justificatif. Pas d’enregistrement différé.<br/><br/>- **Le registre des commandes :** Trace toutes les commandes : date, fournisseur, produits commandés, quantités, date de livraison attendue, date de réception effective, écarts.<br/><br/>- **Le registre des périmés et des destructions :** Tout produit retiré du stock pour péremption ou détérioration doit être enregistré, avec la quantité, la valeur, la raison et la signature du responsable. Cela permet le suivi du taux de péremption et protège le gestionnaire en cas de contrôle. |`
  },
  {
    search: `Principe\\n\\nEn Pratique\\n\\nAppliquer rigoureusement les règles FEFO et FIFO\\n\\nCes deux règles simples, appliquées systématiquement, permettent d'éliminer presque entièrement les périmés évitables.\\n\\nÀ chaque réception de produits, vérifier les dates de péremption des nouveaux lots et les comparer à ceux déjà en stock.\\n\\nPlacer les lots à péremption plus proche devant ou en haut.\\n\\nColler une étiquette visible avec la date de péremption sur chaque lot si l'emballage ne la mentionne pas clairement.`,
    replace: `### Appliquer rigoureusement les règles FEFO et FIFO\\n\\n| | |\\n| --- | --- |\\n| **Principe** | Ces deux règles simples, appliquées systématiquement, permettent d'éliminer presque entièrement les périmés évitables. |\\n| **En Pratique** | - À chaque réception de produits, vérifier les dates de péremption des nouveaux lots et les comparer à ceux déjà en stock.<br/><br/>- Placer les lots à péremption plus proche devant ou en haut.<br/><br/>- Coller une étiquette visible avec la date de péremption sur chaque lot si l'emballage ne la mentionne pas clairement. |`
  },
  {
    search: `Principe\\n\\nEtapes\\n\\nContrôler rigoureusement chaque réception\\n\\nTout ce qui entre dans le stock doit être vérifié avant d'être rangé. Accepter un produit sans contrôle, c'est potentiellement introduire un problème dans le stock.\\n\\nÉtape 1 — Vérification documentaire\\n\\nÉtape 2 — Vérification quantitative\\n\\nÉtape 3 — Vérification qualitative\\n\\nÉtape 4 — Enregistrement immédiat`,
    replace: `### Contrôler rigoureusement chaque réception\\n\\n| | |\\n| --- | --- |\\n| **Principe** | Tout ce qui entre dans le stock doit être vérifié avant d'être rangé. Accepter un produit sans contrôle, c'est potentiellement introduire un problème dans le stock. |\\n| **Etapes** | - Étape 1 — Vérification documentaire<br/><br/>- Étape 2 — Vérification quantitative<br/><br/>- Étape 3 — Vérification qualitative<br/><br/>- Étape 4 — Enregistrement immédiat |`
  },
  {
    search: `Principe\\n\\nBonnes pratiques\\n\\nGérer les commandes de façon proactive\\n\\nUne bonne gestion des commandes anticipe les besoins, elle ne réagit pas à la rupture. Commander dans l'urgence coûte plus cher, prend plus de temps et expose davantage aux ruptures.\\n\\nDéfinir un calendrier fixe de commande (mensuel, bimestriel) et s'y tenir. Les commandes régulières permettent aux fournisseurs de planifier et d'améliorer leur taux de service.\\n\\nToujours calculer les quantités à commander sur la base de la CMM et des niveaux min/max, et non sur une estimation à vue d'œil.\\n\\nTenir à jour la liste des fournisseurs alternatifs pour chaque produit critique. En cas de défaillance du fournisseur principal, le temps de trouver une alternative en urgence aggrave toujours la rupture.`,
    replace: `### Gérer les commandes de façon proactive\\n\\n| | |\\n| --- | --- |\\n| **Principe** | Une bonne gestion des commandes anticipe les besoins, elle ne réagit pas à la rupture. Commander dans l'urgence coûte plus cher, prend plus de temps et expose davantage aux ruptures. |\\n| **Bonnes pratiques** | - Définir un calendrier fixe de commande (mensuel, bimestriel) et s'y tenir. Les commandes régulières permettent aux fournisseurs de planifier et d'améliorer leur taux de service.<br/><br/>- Toujours calculer les quantités à commander sur la base de la CMM et des niveaux min/max, et non sur une estimation à vue d'œil.<br/><br/>- Tenir à jour la liste des fournisseurs alternatifs pour chaque produit critique. En cas de défaillance du fournisseur principal, le temps de trouver une alternative en urgence aggrave toujours la rupture. |`
  },
  {
    search: `Principe\\n\\nFréquences\\n\\nRéaliser des inventaires réguliers\\n\\nL'inventaire est le seul moyen de vérifier que les données dans le système correspondent à la réalité physique. Sans inventaire régulier, les écarts s'accumulent et les décisions deviennent de moins en moins fiables.`,
    replace: `### Réaliser des inventaires réguliers\\n\\n| | |\\n| --- | --- |\\n| **Principe** | L'inventaire est le seul moyen de vérifier que les données dans le système correspondent à la réalité physique. Sans inventaire régulier, les écarts s'accumulent et les décisions deviennent de moins en moins fiables. |`
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
