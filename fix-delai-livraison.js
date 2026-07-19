const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `Le délai de livraison — Calcul précis\\n\\nLe délai de livraison n'est pas une donnée fixe. Il varie d'une commande à l'autre selon les fournisseurs, les saisons, les procédures administratives et les conditions de transport.\\n\\nIl faut donc le calculer sur l'historique réel et comprendre ses composantes.`;

const replaceStr = `### Le délai de livraison — Calcul précis\\n\\n| Composante | Description |\\n| --- | --- |\\n| **Délai administratif interne** | Préparation et validation du bon de commande en interne |\\n| **Délai de traitement fournisseur** | Réception, vérification et mise en préparation par le fournisseur |\\n| **Délai de préparation et conditionnement** | Assemblage de la commande, emballage |\\n| **Délai de transport** | Acheminement jusqu'à la pharmacie |\\n| **Délai de dédouanement** | Pour les importations uniquement |\\n| **Délai de réception et contrôle** | Vérification à l'arrivée avant mise en stock |\\n\\n- Le délai de livraison n'est pas une donnée fixe. Il varie d'une commande à l'autre selon les fournisseurs, les saisons, les procédures administratives et les conditions de transport.\\n- Il faut donc le calculer sur l'historique réel et comprendre ses composantes.`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Tableau du délai de livraison injecté avec succès !');
} else {
  console.log('Erreur : section non trouvée.');
}
