const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `Le problème des mois atypiques\\n\\nCertains mois présentent des consommations anormalement élevées dues à des événements exceptionnels : épidémie, campagne de masse, afflux de réfugiés, erreur d'enregistrement.\\n\\nLes inclure gonflerait artificiellement la CMM et conduirait à des surstocks.\\n\\nCalcul brut (mauvaise pratique) :\\n- CMM = 3 400 ÷ 6 = 567 cp/mois\\n\\nCalcul ajusté (bonne pratique) :\\n\\nExclusion du mois atypique\\n\\nCMM ajustée = (300 + 320 + 310 + 290 + 330) ÷ 5 = 1 550 ÷ 5 = 310 cp/mois\\n\\nCommander sur la base de 567 sachets/mois en période normale conduirait à un surstock massif.\\n\\nLa CMM ajustée de 310 est représentative de la demande courante.\\n\\nLe mois d'épidémie doit être géré séparément via un stock de contingence.`;

const replaceStr = `### Le problème des mois atypiques\\n\\n- Certains mois présentent des consommations anormalement élevées dues à des événements exceptionnels : épidémie, campagne de masse, afflux de réfugiés, erreur d'enregistrement.\\n- Les inclure gonflerait artificiellement la CMM et conduirait à des surstocks.\\n\\n| Mois | Cons. | Remarque |\\n| --- | --- | --- |\\n| Janvier | 300 cp | Normal |\\n| Février | 320 cp | Normal |\\n| Mars | 310 cp | Normal |\\n| Avril | 1850 cp | Épidémie de choléra |\\n| Mai | 290 cp | Normal |\\n| Juin | 300 cp | Normal |\\n| **Total** | **3 400 cp** | |\\n\\n**Calcul brut (mauvaise pratique) :**<br/>CMM = 3 400 ÷ 6 = 567 cp/mois\\n\\n**Calcul ajusté (bonne pratique) :**\\n- Exclusion du mois atypique\\n- **CMM ajustée = (300 + 320 + 310 + 290 + 330) ÷ 5 = 1 550 ÷ 5 = 310 cp/mois**\\n\\n- Commander sur la base de 567 sachets/mois en période normale conduirait à un surstock massif.\\n- La CMM ajustée de 310 est représentative de la demande courante.\\n- Le mois d'épidémie doit être géré séparément via un stock de contingence.`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Section CMM (mois atypique) mise à jour avec le tableau !');
} else {
  console.log('Erreur : section non trouvée.');
}
