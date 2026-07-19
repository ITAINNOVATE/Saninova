const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `Le point de commande et le délai de livraison sont deux concepts étroitement liés.\\n\\nLe point de commande répond à la question : à quel niveau de stock dois-je déclencher ma commande ?\\n\\nLe délai de livraison répond à : combien de temps s'écoule entre ma commande et la réception des produits ? L'un ne va pas sans l'autre.\\n\\nUn point de commande mal calculé parce que le délai de livraison est mal estimé est l'une des causes les plus fréquentes de rupture de stock dans les systèmes pharmaceutiques.`;

const replaceStr = `- Le point de commande et le délai de livraison sont deux concepts étroitement liés.\\n- Le point de commande répond à la question : à quel niveau de stock dois-je déclencher ma commande ?\\n- Le délai de livraison répond à : combien de temps s'écoule entre ma commande et la réception des produits ? L'un ne va pas sans l'autre.\\n- Un point de commande mal calculé parce que le délai de livraison est mal estimé est l'une des causes les plus fréquentes de rupture de stock dans les systèmes pharmaceutiques.`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Liste à puces ajoutée avec succès pour le point de commande !');
} else {
  console.log('Erreur : section non trouvée.');
}
