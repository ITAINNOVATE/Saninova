const fs = require('fs');

const file = 'src/data/courses/gestionApprovisionnements.ts';
let content = fs.readFileSync(file, 'utf8');

const searchStr = `Le problème des mois de rupture\\n\\nQuand un produit est en rupture de stock, la consommation enregistrée est nulle ou réduite.\\n\\nSi on intègre ces mois dans le calcul, la CMM sera sous-estimée, ce qui conduira à commander moins que nécessaire et à reproduire la rupture.\\n\\nCalcul brut (mauvaise pratique) :\\n- CMM = 2 100 ÷ 6 = 350 cp/mois\\n\\nCalcul ajusté (bonne pratique) :\\n\\nConsommation extrapolée mars = 120 × (30 ÷ 10) = 360 cp\\n\\nCMM ajustée = (480 + 510 + 360 + 490 + 500) ÷ 5 = 2 340 ÷ 5 = 468 cp/mois\\n\\nLa différence est énorme : 350 cp/mois vs 468 cp/mois.\\n\\nCommander sur la base de 350 conduira inévitablement à une nouvelle rupture.\\n\\nLa CMM ajustée de 468 reflète la demande réelle.`;

const replaceStr = `### Le problème des mois de rupture\\n\\n- Quand un produit est en rupture de stock, la consommation enregistrée est nulle ou réduite.\\n- Si on intègre ces mois dans le calcul, la CMM sera sous-estimée, ce qui conduira à commander moins que nécessaire et à reproduire la rupture.\\n\\n| Mois | Cons. | Remarque |\\n| --- | --- | --- |\\n| Janvier | 480 cp | Normal |\\n| Février | 510 cp | Normal |\\n| Mars | 120 cp | Rupture partielle (20 jours de rupture sur 30) |\\n| Avril | 0 cp | Rupture totale |\\n| Mai | 490 cp | Normal |\\n| Juin | 500 cp | Normal |\\n| **Total** | **2 100 cp** | |\\n\\n**Calcul brut (mauvaise pratique) :**<br/>CMM = 2 100 ÷ 6 = 350 cp/mois\\n\\n**Calcul ajusté (bonne pratique) :**\\n- Consommation extrapolée mars = 120 × (30 ÷ 10) = 360 cp\\n- **CMM ajustée = (480 + 510 + 360 + 490 + 500) ÷ 5 = 2 340 ÷ 5 = 468 cp/mois**\\n\\n- La différence est énorme : **350 cp/mois vs 468 cp/mois.**\\n- Commander sur la base de 350 conduira inévitablement à une nouvelle rupture.\\n- La CMM ajustée de 468 reflète la demande réelle.`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(file, content);
  console.log('Section CMM mise à jour avec le tableau !');
} else {
  console.log('Erreur : section non trouvée.');
}
