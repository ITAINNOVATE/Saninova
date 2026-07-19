const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `"content": "Méthode min/max : formules et application\\n\\nLa méthode min/max est la méthode de gestion des stocks la plus utilisée dans les systèmes de santé des pays en développement.\\n\\nElle est simple, robuste et adaptée aux contextes où les ressources humaines et les outils informatiques sont limités.\\n\\nSon principe est direct : définir pour chaque produit un niveau minimum en dessous duquel le stock ne doit jamais descendre, et un niveau maximum au-delà duquel il ne doit jamais monter.\\n\\nEntre ces deux bornes, le stock est considéré comme bien géré.\\n"`;

const replaceStr = `"content": "#### Méthode min/max : formules et application\\n\\n- La méthode min/max est la méthode de gestion des stocks la plus utilisée dans les systèmes de santé des pays en développement.\\n- Elle est simple, robuste et adaptée aux contextes où les ressources humaines et les outils informatiques sont limités.\\n- **Son principe est direct :** définir pour chaque produit un niveau minimum en dessous duquel le stock ne doit jamais descendre, et un niveau maximum au-delà duquel il ne doit jamais monter.\\n- **Entre ces deux bornes, le stock est considéré comme bien géré.**\\n"`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Liste à puces et texte en gras appliqués avec succès !');
} else {
  console.log('Erreur : section non trouvée.');
}
