const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `Le point de commande — Définition et formule\\n\\nLe point de commande (PC) est le niveau de stock auquel il faut déclencher la commande pour recevoir les produits avant d'entamer le stock de sécurité.\\n\\nPoint de commande = (CMM × Délai de livraison) + Stock de sécurité\\n\\nCette formule est identique à celle du stock minimum dans la méthode min/max simple. Mais dans une approche plus fine, les deux peuvent différer selon la variabilité du délai de livraison et de la demande.`;

const replaceStr = `### Le point de commande — Définition et formule\\n\\n- Le point de commande (PC) est le niveau de stock auquel il faut déclencher la commande pour recevoir les produits avant d'entamer le stock de sécurité.\\n\\n- **Point de commande = (CMM × Délai de livraison) + Stock de sécurité**\\n\\n- Cette formule est identique à celle du stock minimum dans la méthode min/max simple. Mais dans une approche plus fine, les deux peuvent différer selon la variabilité du délai de livraison et de la demande.`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Liste à puces ajoutée pour la définition du point de commande !');
} else {
  // Try another variation just in case it was modified before
  const searchStr2 = `Le point de commande — Définition et formule\\n\\nLe point de commande (PC) est le niveau de stock auquel il faut déclencher la commande pour recevoir les produits avant d'entamer le stock de sécurité.\\n\\n**Point de commande = (CMM × Délai de livraison) + Stock de sécurité**\\n\\nCette formule est identique à celle du stock minimum dans la méthode min/max simple. Mais dans une approche plus fine, les deux peuvent différer selon la variabilité du délai de livraison et de la demande.`;
  if (content.includes(searchStr2)) {
    content = content.replace(searchStr2, replaceStr);
    fs.writeFileSync(file, content);
    console.log('Liste à puces ajoutée pour la définition du point de commande (variante 2) !');
  } else {
    console.log('Erreur : section non trouvée.');
  }
}
