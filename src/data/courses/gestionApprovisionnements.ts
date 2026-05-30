// Fichier g+®n+®r+® automatiquement avec le contenu propre du PPTX
export const gestionApprovisionnementsCourse: any[] = [
  {
    "id": "gas-m1",
    "title": "Module 1 : Principes fondamentaux de la gestion des stocks",
    "chapters": [
      {
        "id": "gas-m1-c1",
        "title": "Principes fondamentaux de la gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Principes fondamentaux de la gestion des stocks\n\n![Entrep+¦t de pharmacie moderne](/images/course/stock.png)\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m1-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nD+®finitions et concepts cl+®s\n\nTypes de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\nIndicateurs cl+®s de performance\n\nIntroduction aux bonnes pratiques de gestion des stocks\n"
      },
      {
        "id": "gas-m1-c3",
        "title": "Le Stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Le Stock\n\nEnsemble des produits (m+®dicaments, consommables, r+®actifs) d+®tenus par une structure sanitaire +á un moment donn+®, en attente d'+¬tre utilis+®s ou distribu+®s.\n\nUne pharmacie hospitali+¿re fait le contr+¦le un lundi matin et compte au total :\n\nAmoxicilline 500mg : 2 400 comprim+®s\n\nParac+®tamol 500mg : 5 800 comprim+®s\n\nS+®rum physiologique 500ml : 320 poches\n\nGants d'examen (bo+«tes) : 45 bo+«tes\n\nC'est le stock de cette pharmacie +á ce moment pr+®cis.\n\nIl sera diff+®rent le lendemain selon les sorties et les r+®ceptions.\n\n"
      },
      {
        "id": "gas-m1-c4",
        "title": "Stock de s+®curit+® (SS)",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Stock de s+®curit+® (SS)\n\nQuantit+® minimale de produits conserv+®e en r+®serve pour faire face aux impr+®vus (retards de livraison, hausse soudaine de la demande, ou rupture chez le fournisseur).\n\nFormule : SS = CMM +ù Nombre de mois tampon\n\nLa pharmacie consomme en moyenne 200 comprim+®s d'Amoxicilline par mois (CMM = 200).\n\nElle choisit un tampon de 1,5 mois pour se prot+®ger des al+®as.\n\nSS = 200 +ù 1,5 = 300 comprim+®s\n\nCes 300 comprim+®s ne doivent jamais +¬tre touch+®s en dehors d'une urgence.\n\nSi le stock descend +á ce niveau, la commande aurait d+®j+á d++ +¬tre pass+®e.\n"
      },
      {
        "id": "gas-m1-c5",
        "title": "Stock minimum",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Stock minimum\n\nNiveau de stock qui d+®clenche automatiquement une commande. Quand le stock descend +á ce niveau, il est temps de commander.\n\nFormule :Stock min = CMM +ù D+®lai de livraison + Stock de s+®curit+®\n\nLe d+®lai de livraison de son fournisseur est de 2 mois.\n\nSon stock de s+®curit+® est de 300 comprim+®s.\n\nStock min = 200 +ù 2 + 300 = 700 comprim+®s\n\nD+¿s que le stock d'Amoxicilline passe en dessous de 700 comprim+®s, la pharmacie doit imm+®diatement passer commande. Si elle attend plus longtemps, elle risque de tomber dans son stock de s+®curit+®, voire en rupture.\n"
      },
      {
        "id": "gas-m1-c6",
        "title": "Stock maximum",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Stock maximum\n\nNiveau de stock au-del+á duquel il ne faut pas aller, pour +®viter les surstocks, les p+®remptions et le gaspillage d'espace.\n\nFormule : Stock max = Stock min + Quantit+® +®conomique de commande\n\nLa pharmacie commande en g+®n+®ral 3 mois de consommation\n\nQuantit+® +®conomique de commande = 200 +ù 3 = 600 comprim+®s\n\nSon stock min est de 700\n\nStock max = 700 + 600 = 1 300 comprim+®s\n\nLa pharmacie ne devrait jamais d+®passer 1 300 comprim+®s d'Amoxicilline en stock.\n\nAu-del+á, elle immobilise des fonds inutilement et risque des p+®remptions.\n"
      },
      {
        "id": "gas-m1-c7",
        "title": "Stock disponible",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Stock disponible\n\nQuantit+® r+®ellement utilisable +á un instant T, c'est-+á-dire le stock physique d+®duction faite des produits r+®serv+®s, p+®rim+®s ou endommag+®s.\n\nStock disponible = Stock physique ÔêÆ Produits non utilisables\n\nLa pharmacie a physiquement 950 comprim+®s d'Amoxicilline.\n\nMais en faisant le contr+¦le qualit+®, elle constate que : 80 comprim+®s sont p+®rim+®s, 50 comprim+®s ont un conditionnement endommag+® (non distribuables)\n\nStock disponible = 950 ÔêÆ 80 ÔêÆ 50 = 820 comprim+®s\n\nLa pharmacie ne peut compter que sur 820 comprim+®s, et non 950. C'est ce chiffre qui doit figurer dans le syst+¿me de gestion. Avec un stock min +á 700, elle est encore au-dessus du seuil, mais la marge est faible.\n"
      },
      {
        "id": "gas-m1-c8",
        "title": "Point de commande",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Point de commande\n\nEncore appel+® seuil de r+®approvisionnement : Niveau de stock auquel il faut passer commande pour recevoir la livraison avant d'atteindre le stock de s+®curit+®.\n\nC'est souvent confondu avec le stock min, mais il peut en diff+®rer selon le d+®lai de livraison variable.\n\nLa pharmacie consomme 200 comprim+®s/mois d'Amoxicilline. Son d+®lai de livraison habituel est de 2 mois, mais il peut varier. Son stock de s+®curit+® est de 300.\n\nPoint de commande = 200 +ù 2 + 300 = 700 comprim+®s\n\nSupposons que le d+®lai de livraison soit incertain et fluctue entre 1,5 et 2,5 mois.\n\nLa pharmacie choisit prudemment de travailler avec le d+®lai maximum (2,5 mois)\n\nPoint de commande = 200 +ù 2,5 + 300 = 800 comprim+®s\n\nLa pharmacie commande plus t+¦t pour se couvrir contre les retards variables de son fournisseur.\n"
      },
      {
        "id": "gas-m1-c9",
        "title": "D+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### D+®lai de livraison\n\nTemps +®coul+® entre le moment o+¦ la commande est pass+®e et le moment o+¦ les produits sont effectivement disponibles en stock. Il inclut le temps de traitement, d'exp+®dition et de r+®ception.\n\nLa pharmacie passe une commande de Parac+®tamol le 1er mars.\n\nLes produits arrivent le 28 mars.\n\nLe d+®lai de livraison est de 27 jours, soit environ 1 mois.\n\nLa pharmacie doit int+®grer ce d+®lai dans tous ses calculs de stock.\n\nSi elle attend d'+¬tre +á z+®ro pour commander, elle sera en rupture pendant pr+¿s d'un mois.\n"
      },
      {
        "id": "gas-m1-c10",
        "title": "Consommation Moyenne Mensuelle",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Consommation Moyenne Mensuelle\n\nQuantit+® moyenne de produits consomm+®s par mois sur une p+®riode de r+®f+®rence. C'est la base de tous les calculs de stock.\n\nCMM = Total consomm+® sur la p+®riode +À Nombre de mois de la p+®riode\n\nLa pharmacie rel+¿ve les sorties de Parac+®tamol sur 6 mois : 6 800 comprim+®s\n\nCalcul brut : CMM = 6 800 +À 6 = 1 133 comprim+®s/mois\n\nMais avril a +®t+® marqu+® par une rupture partielle. On exclut ce mois et on recalcule sur 5 mois :\n\nCMM ajust+®e = (6 800 ÔêÆ 800) +À 5 = 1 200 comprim+®s/mois\n\nUtiliser la CMM brute aurait conduit +á sous-commander et +á reproduire la rupture.\n"
      },
      {
        "id": "gas-m1-c11",
        "title": "Taux de rotation des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Taux de rotation des stocks\n\nIndicateur qui mesure la vitesse +á laquelle le stock est renouvel+® sur une p+®riode donn+®e. Un taux +®lev+® indique une bonne gestion ; un taux faible signale un surstock potentiel.\n\nTaux de rotation = Quantit+® consomm+®e +À Stock moyen\n\nSur les 6 derniers mois, la pharmacie a consomm+® 7 200 comprim+®s de S+®rum de R+®hydratation Orale (SRO). Son stock moyen sur la p+®riode +®tait de 1 800 comprim+®s.\n\nTaux de rotation = 7 200 +À 1 800 = 4 fois en 6 mois\n\nCela signifie que le stock se renouvelle enti+¿rement toutes les 6 semaines environ.\n\nLe SRO tourne bien (demande forte, gestion saine).\n\nUn taux de rotation inf+®rieur +á 1 sur 6 mois est un signal d'alerte.\n"
      },
      {
        "id": "gas-m1-c12",
        "title": "Rupture de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Rupture de stock\n\n![Rupture de stock](/images/course/rupture.png)\n\nSituation o+¦ un produit est +®puis+® (stock = 0 ) et ne peut plus r+®pondre +á la demande.\n\nC'est l'un des risques les plus graves.\n\nLa pharmacie a 150 comprim+®s de M+®tronidazole en stock. Sa CMM est de 300 comprim+®s et son d+®lai de livraison est de 2 mois.\n\nElle n'a pas encore command+®.\n\nLa pharmacie est d+®j+á en situation de rupture imminente.\n\nD+®ficit = 600 ÔêÆ 150 = 450 comprim+®s\n\nElle doit d+®clencher une commande d'urgence imm+®diatement.\n"
      },
      {
        "id": "gas-m1-c13",
        "title": "Surstock ou surstockage",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Surstock ou surstockage\n\nSituation o+¦ le stock d+®passe le niveau maximum d+®fini.\n\nCela immobilise des fonds, occupe de l'espace et expose les produits au risque de p+®remption.\n\nLa pharmacie re+ºoit une livraison de 3 000 comprim+®s de Cotrimoxazole (200 d+®j+á en stock).\n\nSa CMM est de 400 comprim+®s et son stock max est de 1 600 comprim+®s (soit 4 mois).\n\nDur+®e de couverture = 3 200 +À 400 = 8 mois de stock\n\nSi la date de p+®remption de ce lot est dans 10 mois, elle dispose d'une marge.\n\nMais si elle est dans 6 mois, elle risque de perdre 800 comprim+®s p+®rim+®s.\n\nC'est une immobilisation ou perte financi+¿re +®vitable.\n"
      },
      {
        "id": "gas-m1-c14",
        "title": "P+®remption (Date de p+®remption)",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### P+®remption (Date de p+®remption)\n\nDate limite au-del+á de laquelle un produit ne doit plus +¬tre utilis+® car son efficacit+® ou son innocuit+® ne peut plus +¬tre garantie.\n\nLa gestion des p+®remptions est une priorit+® absolue.\n\nLa pharmacie re+ºoit deux lots d'Amoxicilline :\n\nLot A : 500 comprim+®s ÔÇö p+®rime le 31 mars 2026\n\nLot B : 800 comprim+®s ÔÇö p+®rime le 30 septembre 2026\n\nSa CMM est de 200 comprim+®s/mois. Nous sommes en janvier 2026.\n\n100 comprim+®s seront perdus si aucune mesure n'est prise.\n\nIl ne faut jamais recevoir des produits dont la dur+®e de vie r+®siduelle est inf+®rieure +á la dur+®e de couverture du stock.\n"
      },
      {
        "id": "gas-m1-c15",
        "title": "FEFO (First Expired, First Out)",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### FEFO (First Expired, First Out)\n\n![R+¿gle FEFO FIFO](/images/course/fefo.png)\n\nPrincipe de gestion selon lequel les produits dont la date de p+®remption est la plus proche doivent +¬tre distribu+®s en premier, ind+®pendamment de la date d'entr+®e en stock.\n\nC'est une r+¿gle d'or en pharmacie.\n\nLa pharmacie a en rayon deux lots de vaccins anti-t+®taniques :\n\nLot X : 50 doses ÔÇö p+®rime le 15 f+®vrier 2026 (arriv+® en d+®cembre)\n\nLot Y : 80 doses ÔÇö p+®rime le 30 juin 2026 (arriv+® en janvier)\n\nUn agent de sant+® vient r+®cup+®rer 20 doses.\n\nBonne pratique (FEFO) ÔåÆ il prend dans le Lot X, car il p+®rime en premier (15 f+®vrier), qu'importe l'ordre d'arriv+®e.\n"
      },
      {
        "id": "gas-m1-c16",
        "title": "FIFO (First In, First Out)",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### FIFO (First In, First Out)\n\nPrincipe selon lequel les produits entr+®s en premier en stock doivent sortir en premier.\n\nUtilis+® quand les dates de p+®remption sont identiques.\n\nLa pharmacie re+ºoit deux livraisons de Parac+®tamol ayant la m+¬me date de p+®remption :\n\nLivraison du 5 janvier : 200 bo+«tes (rang+®es au fond)\n\nLivraison du 20 janvier : 150 bo+«tes (rang+®es devant)\n\nUn infirmier vient prendre des bo+«tes : il doit prendre celles du 5 janvier, qui sont entr+®es en premier, m+¬me si elles sont au fond.\n\nAvec des dates de p+®remption identiques, FIFO et FEFO donnent le m+¬me r+®sultat.\n\nMais l'organisation physique du stock doit faciliter ce geste : rangement par rotation.\n"
      },
      {
        "id": "gas-m1-c17",
        "title": "Inventaire",
        "type": "text",
        "duration": "10 min",
        "content": "#### D+®finitions et concepts cl+®s\n\n### Inventaire\n\n![Inventaire en pharmacie](/images/course/inventaire.png)\n\nOp+®ration de comptage physique de tous les produits en stock +á un moment donn+®, permettant de v+®rifier la concordance entre le stock r+®el et le stock th+®orique enregistr+® dans le syst+¿me.\n\nLa pharmacie utilise un registre manuel. Selon ce registre, le stock th+®orique de Parac+®tamol est de 4 200 comprim+®s. Le jour de l'inventaire, le comptage physique donne 3 850 comprim+®s.\n\n+ëcart = 3 850 ÔêÆ 4 200 = ÔêÆ350 comprim+®s\n\nTaux de pr+®cision de l'inventaire = (3 850 +À 4 200) +ù 100 = 91,7 %\n\nInvestiguer sur les causes des +®carts.\n\nTaux de pr+®cision acceptable : Sup+®rieur ou +®gal +á 95%\n"
      },
      {
        "id": "gas-m1-c18",
        "title": "Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\nDans une cha+«ne pharmaceutique, les produits ne sont pas tous stock+®s pour la m+¬me raison.\n\nChaque type de stock r+®pond +á une logique pr+®cise.\n\nLes conna+«tre permet :\n\nde mieux dimensionner les quantit+®s,\n\nd'+®viter les gaspillages et\n\nd'assurer la continuit+® des soins.\n"
      },
      {
        "id": "gas-m1-c19",
        "title": "Stock de cycle",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Stock de cycle\n\nD+®finition\n\nR+¦le\n\nIllustration\n\nC'est la quantit+® de produits consomm+®e entre deux commandes successives.\n\nIl repr+®sente le stock \"normal\" qui entre et sort r+®guli+¿rement.\n\nOn parle aussi de stock dÔÇÖactivit+® ou de stock de roulement\n\nCouvrir la demande courante entre deux livraisons.\n\nUne pharmacie commande du Parac+®tamol toutes les 2 mois. CMM =1 200 comprim+®s.\n\nStock de cycle = 1 200 +ù 2 = 2 400 comprim+®s\n\n+Ç la r+®ception d'une livraison, le stock remonte de 2 400. Il descend progressivement jusqu'+á la prochaine commande.\n\nC'est ce mouvement de \"mont+®e-descente\" qui caract+®rise le stock de cycle.\n"
      },
      {
        "id": "gas-m1-c20",
        "title": "Stock de s+®curit+®",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Stock de s+®curit+®\n\nD+®finition\n\nR+¦le\n\nIllustration\n\nQuantit+® r+®serv+®e pour faire face aux al+®as : retard fournisseur, hausse impr+®vue de la demande, erreur de commande.\n\nIl ne doit +¬tre utilis+® qu'en dernier recours.\n\nProt+®ger la continuit+® des soins contre les impr+®vus.\n\nLa m+¬me pharmacie a un d+®lai de livraison qui peut varier de 1 +á 3 mois au lieu des 2 mois habituels. Elle choisit de couvrir 1 mois d'incertitude :\n\nStock de s+®curit+® = 1 200 +ù 1 = 1 200 comprim+®s\n\nCes 1 200 comprim+®s ne bougent pas en temps normal. Si la livraison attendue en f+®vrier n'arrive qu'en mars, c'est ce stock qui permet d'+®viter la rupture.\n"
      },
      {
        "id": "gas-m1-c21",
        "title": "Stock en transit",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Stock en transit\n\nD+®finition\n\nR+¦le\n\nIllustration\n\nProduits qui ont quitt+® le fournisseur ou le niveau sup+®rieur de la cha+«ne mais qui ne sont pas encore arriv+®s +á destination.\n\nIls existent physiquement mais ne sont pas encore disponibles +á lÔÇÖentrep+¦t.\n\nRepr+®sente les ressources \"en route\" +á prendre en compte dans la planification pour ne pas passer de commandes redondantes.\n\nLa Direction R+®gionale de la Sant+® a command+® 5 000 bo+«tes de Cotrimoxazole +á la centrale d'achat nationale. La commande a +®t+® exp+®di+®e il y a 10 jours, le d+®lai total est de 30 jours. Ces 5 000 bo+«tes constituent son stock en transit.\n\nStock effectif = Stock physique + Stock en transit ÔêÆ Commandes en attente\n"
      },
      {
        "id": "gas-m1-c22",
        "title": "Stock sp+®culatif",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Stock sp+®culatif\n\nD+®finition\n\nR+¦le\n\nIllustration\n\nStock constitu+® volontairement en quantit+® sup+®rieure +á la normale, en anticipation d'une hausse des prix, d'une p+®nurie annonc+®e ou d'une rupture pr+®visible chez le fournisseur.\n\nProt+®ger la structure contre des risques externes connus +á l'avance.\n\nUn gestionnaire apprend que le seul fabricant mondial dÔÇÖAL va suspendre sa production pendant 3 mois pour maintenance. CMM = 800 bo+«tes.\n\nStock sp+®culatif = 800 +ù 3 = 2 400 bo+«tes suppl+®mentaires\n\nAttention : \t- Ce type de stock doit rester exceptionnel et justifi+®.\n\n- Mal g+®r+®, il g+®n+¿re des surstocks co++teux."
      },
      {
        "id": "gas-m1-c23",
        "title": "Stock mort (ou stock dormant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Stock mort (ou stock dormant)\n\nD+®finition\n\nR+¦le\n\nIllustration\n\nProduits qui ne bougent plus depuis une longue p+®riode, g+®n+®ralement parce qu'ils ne sont plus demand+®s, ont +®t+® remplac+®s par un autre produit, ou sont proches de la p+®remption.\n\nIl n'a aucun r+¦le utile ÔÇö c'est pr+®cis+®ment le probl+¿me.\n\nIl immobilise de l'argent, de l'espace et du personnel.\n\nUne pharmacie d+®tient 3 000 comprim+®s de Chloroquine.\n\nDepuis l'abandon de ce m+®dicament comme traitement de premi+¿re ligne du paludisme dans le pays, la consommation est tomb+®e +á 0 comprim+® par mois depuis 8 mois.\n\nIdentifier et traiter le stock mort est une priorit+® de bonne gestion.\n"
      },
      {
        "id": "gas-m1-c24",
        "title": "Stock de consignation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Stock de consignation\n\nD+®finition\n\nR+¦le\n\nIllustration\n\nProduits mis +á disposition par un fournisseur dans les locaux, mais qui restent la propri+®t+® du fournisseur jusqu'+á leur utilisation effective.\n\nLÔÇÖentrep+¦t ou lÔÇÖ+®tablissement de sant+® ne paie que ce qu'elle consomme.\n\nR+®duire le besoin en tr+®sorerie tout en garantissant la disponibilit+® des produits.\n\nUn fournisseur de r+®actifs de laboratoire d+®pose 200 tests de d+®pistage rapide du VIH en consignation. La pharmacie en utilise 45 le premier mois.\n\nMontant factur+® = 45 +ù 3 500 FCFA = 157 500 FCFA\n\nLes 155 tests restants ne sont pas factur+®s et restent propri+®t+® du fournisseur.\n\nEn fin de contrat, ils sont repris ou factur+®s selon les termes convenus.\n"
      },
      {
        "id": "gas-m1-c25",
        "title": "Synth+¿se",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur r+¦le dans la cha+«ne pharmaceutique\n\n### Synth+¿se\n\n"
      },
      {
        "id": "gas-m1-c26",
        "title": "Indicateurs cl+®s de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\nUn indicateur cl+® de performance (KPI) est une mesure chiffr+®e qui permet d'+®valuer objectivement la qualit+® de la gestion des stocks.\n\nSans KPIs, un gestionnaire travaille +á l'aveugle :\n\nil ne sait pas si sa structure performe bien ou mal,\n\nni o+¦ concentrer ses efforts d'am+®lioration.\n\nLes KPIs r+®pondent +á des questions simples :\n\nAvons-nous des ruptures ?\n\nStockons-nous trop ?\n\nNos donn+®es sont-elles fiables ?\n\nNos produits sont-ils bien g+®r+®s ?\n"
      },
      {
        "id": "gas-m1-c27",
        "title": "Taux de disponibilit+® des produits",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Taux de disponibilit+® des produits\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nPourcentage de produits disponibles en stock par rapport +á la liste des produits attendus, sur une p+®riode donn+®e.\n\n(Nombre de produits disponibles +À Nombre total de produits de la liste) +ù 100\n\nÔëÑ 95 % : Bonne performance\n\n80 % +á 94 % : Performance acceptable, des am+®liorations sont n+®cessaires\n\n< 80 % : Performance insuffisante, situation critique\n"
      },
      {
        "id": "gas-m1-c28",
        "title": "Taux de rupture de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Taux de rupture de stock\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nProportion de jours dans le mois (ou dans l'ann+®e) pendant lesquels un produit +®tait indisponible, alors qu'il aurait d++ l'+¬tre.\n\n(Nombre de jours en rupture +À Nombre de jours de la p+®riode) +ù 100\n\n0 % : Aucune rupture, situation id+®ale\n\n1 % +á 9 % : Ruptures occasionnelles, g+®rables\n\nÔëÑ 10 % : Situation pr+®occupante n+®cessitant une intervention\n"
      },
      {
        "id": "gas-m1-c29",
        "title": "Taux de surstockage",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Taux de surstockage\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nProportion de produits dont le stock d+®passe le niveau maximum d+®fini, sur la liste totale des produits g+®r+®s.\n\n(Nombre de produits en surstock +À Nombre total de produits g+®r+®s) +ù 100\n\n0 % : Aucun surstockage, situation id+®ale\n\nÔëÑ 1 % : Finances immobilis+®s inutilement.\n"
      },
      {
        "id": "gas-m1-c30",
        "title": "Taux de p+®remption",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Taux de p+®remption\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nProportion de la valeur des produits p+®rim+®s par rapport +á la valeur totale des produits re+ºus sur une p+®riode.\n\n(Valeur des produits p+®rim+®s +À Valeur totale des produits re+ºus) +ù 100\n\n< 1 % : Excellente gestion des p+®remptions\n\n1 % +á 2 % : Acceptable\n\nÔëÑ 3 % : Probl+¿me s+®rieux de gestion (surstocks, FEFO non respect+®, mauvaise pr+®vision)\n"
      },
      {
        "id": "gas-m1-c31",
        "title": "Mois de stock disponible",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Mois de stock disponible\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nNombre de mois pendant lesquels le stock actuel peut couvrir la demande, sans nouvelle livraison.\n\nStock disponible +À CMM\n\n< Min : Sous stockage\n\nMin < MSD < Max : Stockage conforme au plan\n\n< Max : Surstockage\n"
      },
      {
        "id": "gas-m1-c32",
        "title": "Taux de satisfaction des besoins",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Taux de satisfaction des besoins\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nMesure la capacit+® +á livrer les besoins exprim+®s, dans les d+®lais convenus.\n\n(Quantit+® livr+®e dans les d+®lais +À Quantit+® demand+®e) +ù 100\n\n(Nombre de d+®signation satisfaite +À Nombre de d+®signation demand+®e) +ù 100\n\nÔëÑ 95 % : Satisfaction fiable\n\n80 % +á 94 % : Performance moyenne, +á am+®liorer\n\n< 80 % : Satisfaction peu fiable, prendre imm+®diatement des mesures correctrices\n"
      },
      {
        "id": "gas-m1-c33",
        "title": "Valeur du stock immobilis+®",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Valeur du stock immobilis+®\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nMontant financier total des produits en surstock ou en stock mort, non utiles +á la demande courante.\n\nQuantit+® en exc+®dent +ù Prix unitaire\n\nPar produit, puis total\n\n< 5 % de la valeur totale du stock : Acceptable\n\n5ÔÇô10 % de la valeur totale du stock : +Ç surveiller\n\n> 10 % de la valeur totale du stock : Perte financi+¿re significative, Correction urgente\n"
      },
      {
        "id": "gas-m1-c34",
        "title": "Taux de rotation des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Taux de rotation des stocks\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nVitesse +á laquelle le stock est enti+¿rement renouvel+® sur une p+®riode donn+®e\n\nQuantit+® consomm+®e sur la p+®riode +À Stock moyen de la p+®riode\n\n4ÔÇô6 rotations/an : Gestion saine\n\n2ÔÇô3 rotations/an : Stock lent, surveiller\n\n< 2 rotations/an : Stock dormant, action requise\n"
      },
      {
        "id": "gas-m1-c35",
        "title": "D+®lai moyen de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### D+®lai moyen de livraison\n\nD+®finition\n\nFormule\n\nInterpr+®tation\n\nTemps moyen +®coul+® entre la date de commande et la date de livraison effective des produits\n\nSomme des d+®lais observ+®s +À Nombre de commandes sur la p+®riode\n\nConforme au contrat : Fournisseur ponctuel\n\nD+®passement < 20 % : Tol+®rable\n\nD+®passement > 20 % : Revoir le plan de distribution ou les m+®+®canismes de livraison\n"
      },
      {
        "id": "gas-m1-c36",
        "title": "Synth+¿se",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs cl+®s de performance\n\n### Synth+¿se\n\nCes indicateurs se lisent ensemble, pas isol+®ment.\n\nUn taux de disponibilit+® faible combin+® +á un taux de couverture +®lev+® indique par exemple que les mauvais produits sont stock+®s en exc+¿s pendant que les produits essentiels manquent.\n\nC'est souvent plus r+®v+®lateur que chaque chiffre pris s+®par+®ment.\n\nLa fr+®quence de mesure recommand+®e est :\n\nMensuelle pour les indicateurs op+®rationnels (disponibilit+®, rupture, couverture) et\n\nTrimestrielle ou annuelle pour les indicateurs strat+®giques (p+®remption, valeur immobilis+®e, satisfaction).\n"
      },
      {
        "id": "gas-m1-c37",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nLes bonnes pratiques de gestion des stocks ne sont pas des r+¿gles abstraites.\n\nCe sont des habitudes concr+¿tes, appliqu+®es au quotidien, qui font la diff+®rence entre une entrep+¦t qui fonctionne bien et un qui accumule les ruptures, les p+®remptions et les pertes financi+¿res.\n\nElles couvrent quatre grands domaines :\n\nl'organisation physique du stock,\n\nla gestion des documents et des donn+®es,\n\nles proc+®dures de commande et de r+®ception et\n\nle suivi r+®gulier des indicateurs.\n"
      },
      {
        "id": "gas-m1-c38",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nBonnes pratiques\n\nOrganiser correctement l'espace de stockage\n\nUn stock bien organis+® physiquement est la premi+¿re condition d'une bonne gestion.\n\nSi on ne retrouve pas facilement un produit, on ne peut pas le g+®rer efficacement.\n\nS+®parer les zones fonctionnelles\n\nRespecter les conditions de conservation\n\nTemp+®rature ambiante (< 25-¦C +á 30-¦C selon le produit) : Comprim+®s, g+®lules\n\nCha+«ne du froid (+2-¦C +á +8-¦C) : Vaccins, insuline, certains r+®actifs\n\n+Ç l'abri de la lumi+¿re : M+®tronidazole injectable, certains sirops\n\n+Ç l'abri de l'humidit+® (Hygrom+®trie < 60 %) : Poudres, comprim+®s effervescents\n\nRanger les produits de fa+ºon logique\n\nAssurer l'accessibilit+® pour la rotation FEFO.\n"
      },
      {
        "id": "gas-m1-c39",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nDocuments\n\nTenir des documents de stock rigoureux et +á jour\n\nOn ne g+¿re bien que ce que l'on mesure. Sans documentation fiable, toutes les d+®cisions de commande et de distribution reposent sur des estimations, et les erreurs s'accumulent.\n\nLa fiche de stock : chaque mouvement (entr+®e ou sortie) doit +¬tre enregistr+® le jour m+¬me, avec la r+®f+®rence du document justificatif. Pas dÔÇÖenregistrement diff+®r+®.\n\nLe registre des commandes : Trace toutes les commandes : date, fournisseur, produits command+®s, quantit+®s, date de livraison attendue, date de r+®ception effective, +®carts.\n\nLe registre des p+®rim+®s et des destructions : Tout produit retir+® du stock pour p+®remption ou d+®t+®rioration doit +¬tre enregistr+®, avec la quantit+®, la valeur, la raison et la signature du responsable. Cela permet le suivi du taux de p+®remption et prot+¿ge le gestionnaire en cas de contr+¦le.\n"
      },
      {
        "id": "gas-m1-c40",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nEn Pratique\n\nAppliquer rigoureusement les r+¿gles FEFO et FIFO\n\nCes deux r+¿gles simples, appliqu+®es syst+®matiquement, permettent d'+®liminer presque enti+¿rement les p+®rim+®s +®vitables.\n\n+Ç chaque r+®ception de produits, v+®rifier les dates de p+®remption des nouveaux lots et les comparer +á ceux d+®j+á en stock.\n\nPlacer les lots +á p+®remption plus proche devant ou en haut.\n\nColler une +®tiquette visible avec la date de p+®remption sur chaque lot si l'emballage ne la mentionne pas clairement.\n"
      },
      {
        "id": "gas-m1-c41",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nEtapes\n\nContr+¦ler rigoureusement chaque r+®ception\n\nTout ce qui entre dans le stock doit +¬tre v+®rifi+® avant d'+¬tre rang+®. Accepter un produit sans contr+¦le, c'est potentiellement introduire un probl+¿me dans le stock.\n\n+ëtape 1 ÔÇö V+®rification documentaire\n\n+ëtape 2 ÔÇö V+®rification quantitative\n\n+ëtape 3 ÔÇö V+®rification qualitative\n\n+ëtape 4 ÔÇö Enregistrement imm+®diat\n"
      },
      {
        "id": "gas-m1-c42",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nBonnes pratiques\n\nG+®rer les commandes de fa+ºon proactive\n\nUne bonne gestion des commandes anticipe les besoins, elle ne r+®agit pas +á la rupture. Commander dans l'urgence co++te plus cher, prend plus de temps et expose davantage aux ruptures.\n\nD+®finir un calendrier fixe de commande (mensuel, bimestriel) et s'y tenir. Les commandes r+®guli+¿res permettent aux fournisseurs de planifier et d'am+®liorer leur taux de service.\n\nToujours calculer les quantit+®s +á commander sur la base de la CMM et des niveaux min/max, et non sur une estimation +á vue d'+ôil.\n\nTenir +á jour la liste des fournisseurs alternatifs pour chaque produit critique. En cas de d+®faillance du fournisseur principal, le temps de trouver une alternative en urgence aggrave toujours la rupture.\n"
      },
      {
        "id": "gas-m1-c43",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nFr+®quences\n\nR+®aliser des inventaires r+®guliers\n\nL'inventaire est le seul moyen de v+®rifier que les donn+®es dans le syst+¿me correspondent +á la r+®alit+® physique. Sans inventaire r+®gulier, les +®carts s'accumulent et les d+®cisions deviennent de moins en moins fiables.\n"
      }
    ]
  },
  {
    "id": "gas-m2",
    "title": "Module 2 : M+®thodes de calcul des niveaux de stock",
    "chapters": [
      {
        "id": "gas-m2-c1",
        "title": "M+®thodes de calcul des niveaux de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### M+®thodes de calcul des niveaux de stock\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m2-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nCalcul de la consommation moyenne mensuelle (CMM)\n\nM+®thode min/max : formules et application\n\nCalcul du point de commande et du d+®lai de livraison\n\nExercices pratiques sur donn+®es r+®elles\n"
      },
      {
        "id": "gas-m2-c3",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLa CMM est le point de d+®part de tout calcul de stock.\n\nC'est elle qui r+®pond +á la question fondamentale : combien de ce produit consomme-t-on en moyenne par mois ?\n\nSans une CMM fiable, tous les autres calculs (stock min, stock max, quantit+® +á commander) seront faux, m+¬me si les formules sont correctement appliqu+®es.\n\nUne bonne CMM repose sur des donn+®es de consommation :\n\nr+®elles,\n\ncollect+®es sur une p+®riode suffisamment longue et\n\ncorrectement ajust+®es.\n"
      },
      {
        "id": "gas-m2-c4",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLa formule de base\n\nQuantit+® totale consomm+®e sur la p+®riode +À Nombre de mois de la p+®riode\n\nExemple simple :\n\nSur 6 mois, une pharmacie a consomm+® 7 200 comprim+®s de Cotrimoxazole.\n\nCMM = 7 200 +À 6 = 1 200 comprim+®s/mois\n\nSimple en apparence, mais cette formule cache plusieurs pi+¿ges qu'il faut savoir +®viter.\n"
      },
      {
        "id": "gas-m2-c5",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLe probl+¿me des mois de rupture\n\nQuand un produit est en rupture de stock, la consommation enregistr+®e est nulle ou r+®duite.\n\nSi on int+¿gre ces mois dans le calcul, la CMM sera sous-estim+®e, ce qui conduira +á commander moins que n+®cessaire et +á reproduire la rupture.\n\nCalcul brut (mauvaise pratique) :\n\nCMM = 2 100 +À 6 = 350 cp/mois\n\nCalcul ajust+® (bonne pratique) :\n\nConsommation extrapol+®e mars = 120 +ù (30 +À 10) = 360 cp\n\nCMM ajust+®e = (480 + 510 + 360 + 490 + 500) +À 5 = 2 340 +À 5 = 468 cp/mois\n\nLa diff+®rence est +®norme : 350 cp/mois vs 468 cp/mois.\n\nCommander sur la base de 350 conduira in+®vitablement +á une nouvelle rupture.\n\nLa CMM ajust+®e de 468 refl+¿te la demande r+®elle.\n"
      },
      {
        "id": "gas-m2-c6",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLe probl+¿me des mois atypiques\n\nCertains mois pr+®sentent des consommations anormalement +®lev+®es dues +á des +®v+®nements exceptionnels : +®pid+®mie, campagne de masse, afflux de r+®fugi+®s, erreur d'enregistrement.\n\nLes inclure gonflerait artificiellement la CMM et conduirait +á des surstocks.\n\nCalcul brut (mauvaise pratique) :\n\nCMM = 3 400 +À 6 = 567 cp/mois\n\nCalcul ajust+® (bonne pratique) :\n\nExclusion du mois atypique\n\nCMM ajust+®e = (300 + 320 + 310 + 290 + 330) +À 5 = 1 550 +À 5 = 310 cp/mois\n\nCommander sur la base de 567 sachets/mois en p+®riode normale conduirait +á un surstock massif.\n\nLa CMM ajust+®e de 310 est repr+®sentative de la demande courante.\n\nLe mois d'+®pid+®mie doit +¬tre g+®r+® s+®par+®ment via un stock de contingence.\n"
      },
      {
        "id": "gas-m2-c7",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLa p+®riode de r+®f+®rence optimale\n\nLa longueur de la p+®riode utilis+®e pour calculer la CMM a un impact important sur sa fiabilit+®.\n\nLe choix se fait selon :\n\nSelon le niveau de la pyramide sanitaire\n\nSelon les cycles de r+®approvisionnement\n\nSelon les param+¿tres min et max\n\nSelon le type de produits et de programme\n"
      },
      {
        "id": "gas-m2-c8",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nCMM bas+®e sur la distribution (DMM) vs CMM bas+®e sur les consommations\n\nDans certains contextes, on distingue deux types de donn+®es :\n\nDonn+®es de distribution : quantit+®s effectivement remises aux structures inf+®rieures. C'est la mesure de la demande satisfaite vers les structures inf+®rieures dispensatrices ou non.\n\nDonn+®es de consommation: quantit+®s r+®ellement consomm+®es par les patients au niveau des points de dispensation\n\nRecommandation :\n\nUtiliser les donn+®es de consommation pour calculer la CMM, car elles refl+¿tent mieux la demande r+®elle des patients.\n\nLes pertes, ajustements et transferts doivent +¬tre enregistr+®s s+®par+®ment.\n"
      },
      {
        "id": "gas-m2-c9",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nR+®capitulatif ÔÇö +ëtapes de calcul d'une CMM fiable\n"
      },
      {
        "id": "gas-m2-c10",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nLa m+®thode min/max est la m+®thode de gestion des stocks la plus utilis+®e dans les syst+¿mes de sant+® des pays en d+®veloppement.\n\nElle est simple, robuste et adapt+®e aux contextes o+¦ les ressources humaines et les outils informatiques sont limit+®s.\n\nSon principe est direct : d+®finir pour chaque produit un niveau minimum en dessous duquel le stock ne doit jamais descendre, et un niveau maximum au-del+á duquel il ne doit jamais monter.\n\nEntre ces deux bornes, le stock est consid+®r+® comme bien g+®r+®.\n"
      },
      {
        "id": "gas-m2-c11",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nLes param+¿tres de base\n\nAvant de calculer le min et le max, trois param+¿tres doivent +¬tre connus avec pr+®cision pour chaque produit :\n\nLa CMM (Consommation Moyenne Mensuelle) : Calcul+®e selon la m+®thode vue au point pr+®c+®dent. C'est le moteur de tous les calculs.\n\nLe D+®lai de Livraison (DL) : Temps moyen entre la date de commande et la date de r+®ception effective. Il doit +¬tre calcul+® sur l'historique r+®el des commandes, pas estim+® +á vue d'+ôil.\n\nLa P+®riode de Commande (PC) : Intervalle de temps entre deux commandes successives. Si la pharmacie commande tous les 2 mois, PC = 2 mois.\n"
      },
      {
        "id": "gas-m2-c12",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nCalcul du Stock de S+®curit+® (SS)\n\nLe stock de s+®curit+® est le socle sur lequel reposent tous les autres calculs. Il repr+®sente la protection contre les al+®as.\n\nSS = CMM +ù Nombre de mois de couverture de s+®curit+®\n\nLe nombre de mois de couverture de s+®curit+® est g+®n+®ralement fix+® par la politique nationale ou par le niveau hi+®rarchique sup+®rieur.\n\nEn l'absence de directive, on recommande :\n\n1 mois pour les produits avec un fournisseur fiable et un d+®lai court\n\n2 mois pour les produits critiques ou avec un fournisseur peu fiable\n"
      },
      {
        "id": "gas-m2-c13",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nCalcul du Stock Minimum (Stock min)\n\nLe stock minimum est le niveau qui d+®clenche la commande.\n\nQuand le stock atteint ce niveau, il faut commander imm+®diatement.\n\nStock min = (CMM +ù D+®lai de livraison) + Stock de s+®curit+®\n"
      },
      {
        "id": "gas-m2-c14",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nCalcul du Stock Maximum (Stock max)\n\nLe stock maximum est le niveau optimal +á atteindre apr+¿s chaque livraison.\n\nIl ne doit pas +¬tre d+®pass+®.\n\nStock max = Stock min + (CMM +ù P+®riode de commande)\n\nCalcul de la Quantit+® +á Commander (Q+áC)\n\nC'est la quantit+® qui doit +¬tre command+®e pour ramener le stock au niveau maximum.\n\nQ+áC = Stock max ÔêÆ Stock disponible actuel\n"
      },
      {
        "id": "gas-m2-c15",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nR+®capitulatif des formules min/max\n"
      },
      {
        "id": "gas-m2-c16",
        "title": "M+®thode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "M+®thode min/max : formules et application\n\nLes limites de la m+®thode min/max et comment les contourner\n"
      },
      {
        "id": "gas-m2-c17",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nLe point de commande et le d+®lai de livraison sont deux concepts +®troitement li+®s.\n\nLe point de commande r+®pond +á la question : +á quel niveau de stock dois-je d+®clencher ma commande ?\n\nLe d+®lai de livraison r+®pond +á : combien de temps s'+®coule entre ma commande et la r+®ception des produits ? L'un ne va pas sans l'autre.\n\nUn point de commande mal calcul+® parce que le d+®lai de livraison est mal estim+® est l'une des causes les plus fr+®quentes de rupture de stock dans les syst+¿mes pharmaceutiques.\n"
      },
      {
        "id": "gas-m2-c18",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nLe d+®lai de livraison ÔÇö Calcul pr+®cis\n\nLe d+®lai de livraison n'est pas une donn+®e fixe. Il varie d'une commande +á l'autre selon les fournisseurs, les saisons, les proc+®dures administratives et les conditions de transport.\n\nIl faut donc le calculer sur l'historique r+®el et comprendre ses composantes.\n"
      },
      {
        "id": "gas-m2-c19",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nLe point de commande ÔÇö D+®finition et formule\n\nLe point de commande (PC) est le niveau de stock auquel il faut d+®clencher la commande pour recevoir les produits avant d'entamer le stock de s+®curit+®.\n\nPoint de commande = (CMM +ù D+®lai de livraison) + Stock de s+®curit+®\n\nCette formule est identique +á celle du stock minimum dans la m+®thode min/max simple. Mais dans une approche plus fine, les deux peuvent diff+®rer selon la variabilit+® du d+®lai de livraison et de la demande.\n"
      },
      {
        "id": "gas-m2-c20",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nLe point de commande avec d+®lai variable\n\nDans la r+®alit+®, le d+®lai de livraison n'est jamais parfaitement stable. Une approche plus rigoureuse int+¿gre cette variabilit+®.\n\nPoint de commande = (CMM +ù DL moyen) + (Z +ù ¤â +ù ÔêÜDL)\n\nZ = facteur de service (1,65 pour un taux de service de 95%)\n\n¤â = +®cart-type de la consommation mensuelle\n\nDL = d+®lai de livraison en mois\n\nCette formule statistique est utilis+®e dans les syst+¿mes informatis+®s.\n\nDans un contexte manuel, on simplifie en utilisant le d+®lai maximum observ+® plut+¦t que la moyenne.\n"
      },
      {
        "id": "gas-m2-c21",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nInteraction entre point de commande et fr+®quence de commande\n\nLe point de commande ne fonctionne pas isol+®ment. Il interagit avec la fr+®quence +á laquelle le gestionnaire v+®rifie son stock.\n\nSyst+¿me +á r+®vision continue : Le stock est v+®rifi+® en permanence (ou tr+¿s fr+®quemment). D+¿s que le stock atteint le point de commande, la commande est d+®clench+®e automatiquement. C'est le syst+¿me id+®al, possible avec un logiciel de gestion.\n\nSyst+¿me +á r+®vision p+®riodique : Le stock est v+®rifi+® +á intervalles fixes (une fois par mois, par exemple). La commande est pass+®e +á chaque r+®vision si le stock est en dessous du point de commande. C'est le syst+¿me le plus courant dans les pharmacies avec gestion manuelle.\n"
      },
      {
        "id": "gas-m2-c22",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nLe point de commande en contexte de livraison programm+®e\n\nDans certains syst+¿mes (notamment les syst+¿mes de distribution int+®gr+®e), les livraisons sont programm+®es +á dates fixes, ind+®pendamment du niveau de stock.\n\nDans ce cas, le point de commande classique est remplac+® par une quantit+® +á commander calcul+®e +á chaque date de livraison programm+®e.\n\nQuantit+® +á commander = (CMM +ù P+®riode jusqu'+á prochaine livraison) + Stock min ÔêÆ Stock disponible actuel\n"
      },
      {
        "id": "gas-m2-c23",
        "title": "Calcul du point de commande et du d+®lai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du d+®lai de livraison\n\nTableau de synth+¿se ÔÇö Point de commande selon les contextes\n\n| Contexte de livraison | Formule du Point de Commande (PC) | Niveau de S+®curit+® |\n|---|---|---|\n| Livraison rapide et fiable | PC = (CMM +ù D+®lai) + Stock Min faible | Bas |\n| D+®lai long (International) | PC = (CMM +ù D+®lai) + Stock Min +®lev+® | Haut |\n| Demande tr+¿s variable | PC = (CMM max +ù D+®lai) + Stock Min +®lev+® | Tr+¿s Haut |\n"
      },
      {
        "id": "gas-m2-c24",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nEXERCICE 1 ÔÇö Calcul de la CMM\n\nDonn+®es\n\nLa Pharmacie du Centre de Sant+® de Bohicon enregistre les sorties de Parac+®tamol 500mg sur 6 mois :\n\nQuestions :\n\nCalculez la CMM brute sur 6 mois.\n\nY a-t-il des ajustements +á faire ? Justifiez.\n\nQuelle CMM retenez-vous pour les calculs suivants ?\n"
      },
      {
        "id": "gas-m2-c25",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 1 ÔÇö Calcul de la CMM\n\nQuestion 1 ÔÇö CMM brute :\n\nTotal consomm+® = 1 450 + 1 380 + 1 510 + 1 420 + 1 390 + 1 480 = 8 630 cp\n\nCMM brute = 8 630 +À 6 = 1 438 cp/mois\n\nQuestion 2 ÔÇö Ajustements :\n\nAucun ajustement n'est n+®cessaire.\n\nTous les mois sont normaux, sans rupture ni +®v+®nement exceptionnel.\n\nLes consommations sont stables et coh+®rentes entre elles (+®cart maximum entre les mois : 130 cp, soit moins de 10%).\n\nQuestion 3 ÔÇö CMM retenue :\n\nCMM = 1 438 cp/mois, arrondie +á 1 440 cp/mois pour faciliter les calculs.\n"
      },
      {
        "id": "gas-m2-c26",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nEXERCICE 2 ÔÇö CMM avec mois de rupture\n\nDonn+®es\n\nLa Pharmacie du District Sanitaire de Glazou+® enregistre les sorties de Cotrimoxazole 480mg sur 8 mois :\n\nQuestions :\n\nIdentifiez les mois +á exclure ou +á ajuster et justifiez chaque d+®cision.\n\nCalculez la CMM ajust+®e.\n\nPourquoi est-il dangereux d'utiliser la CMM brute dans ce cas ?\n"
      },
      {
        "id": "gas-m2-c27",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 2 ÔÇö CMM avec mois de rupture\n\nQuestion 1 ÔÇö Identification des mois +á traiter :\n\nMars ÔåÆ Ajustement : rupture partielle de 18 jours. Le produit n'+®tait disponible que 12 jours sur 30. La consommation enregistr+®e (210 cp) ne refl+¿te que 12/30 de la demande r+®elle.\n\nConsommation extrapol+®e mars = 210 +ù (30 +À 12) = 525 cp\n\nAvril ÔåÆ Exclusion : rupture totale, consommation nulle non repr+®sentative de la demande r+®elle.\n\nMai ÔåÆ Exclusion : rupture totale, m+¬me raison.\n\nJuillet ÔåÆ Exclusion : consommation atypique li+®e +á une campagne exceptionnelle (4 200 cp vs une moyenne d'environ 510 cp en p+®riode normale). Inclure ce mois gonflerait artificiellement la CMM.\n"
      },
      {
        "id": "gas-m2-c28",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 2 ÔÇö CMM avec mois de rupture\n\nQuestion 2 ÔÇö CMM ajust+®e :\n\nMois retenus : janvier, f+®vrier, mars ajust+®, juin, ao++t\n\nCMM ajust+®e = 2 575 +À 5 = 515 cp/mois\n"
      },
      {
        "id": "gas-m2-c29",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 2 ÔÇö CMM avec mois de rupture\n\nQuestion 3 ÔÇö Danger de la CMM brute :\n\nCMM brute = (520 + 490 + 210 + 0 + 0 + 530 + 4 200 + 510) +À 8 = 6 460 +À 8 = 808 cp/mois\n\nLa CMM brute de 808 cp est 57% plus +®lev+®e que la CMM ajust+®e de 515 cp.\n\nCommander sur cette base conduirait +á commander syst+®matiquement 293 cp de trop chaque mois, soit un surstock permanent et une immobilisation inutile de ressources financi+¿res.\n\n+Ç l'inverse, si on avait calcul+® la CMM uniquement sur les mois de rupture, on aurait obtenu un chiffre bien trop bas et reproduit la rupture.\n"
      },
      {
        "id": "gas-m2-c30",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nEXERCICE 3 ÔÇö Calcul complet min/max et quantit+® +á commander\n\nDonn+®es\n\nPharmacie R+®gionale de Parakou ÔÇö Produit : Art+®m+®ther-Lum+®fantrine 20/120mg (bo+«tes de 24 comprim+®s)\n\nQuestions :\n\nCalculez la CMM.\n\nCalculez le d+®lai de livraison ajust+®.\n\nCalculez le stock de s+®curit+®.\n\nCalculez le stock minimum.\n\nCalculez le stock maximum.\n\nLe stock actuel (520 bo+«tes) est-il en dessous du point de commande ? Faut-il commander ?\n\nSi oui, calculez la quantit+® +á commander.\n\nHistorique des d+®lais de livraison (en jours) : 32, 28, 45, 36, 29\n\nPolitique de la Direction R+®gionale :\n\nstock de s+®curit+® = 2 mois,\n\np+®riode de commande = 2 mois.\n\nStock disponible au moment du calcul : 520 bo+«tes\n"
      },
      {
        "id": "gas-m2-c31",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 3 ÔÇö Calcul complet min/max et quantit+® +á commander\n\nQuestion 1 ÔÇö CMM :\n\nTotal = 185 + 170 + 195 + 180 + 190 + 175 = 1 095 bo+«tes\n\nAucun mois atypique ni rupture +á signaler.\n\nCMM = 1 095 +À 6 = 182,5 bo+«tes/mois Ôëê 183 bo+«tes/mois\n\nQuestion 2 ÔÇö D+®lai de livraison ajust+® :\n\nD+®lai moyen = (32 + 28 + 45 + 36 + 29) +À 5 = 170 +À 5 = 34 jours = 1,13 mois\n\nD+®lai ajust+® avec marge de 25% = 1,13 +ù 1,25 = 1,42 mois Ôëê 1,5 mois\n\nQuestion 3 ÔÇö Stock de s+®curit+® :\n\nSS = 183 +ù 2 = 366 bo+«tes\n\nQuestion 4 ÔÇö Stock minimum :\n\nStock min = (183 +ù 1,5) + 366 = 274,5 + 366 = 641 bo+«tes\n"
      },
      {
        "id": "gas-m2-c32",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 3 ÔÇö Calcul complet min/max et quantit+® +á commander\n\nQuestion 5 ÔÇö Stock maximum :\n\nStock max = 641 + (183 +ù 2) = 641 + 366 = 1 007 bo+«tes\n\nQuestion 6 ÔÇö Faut-il commander ?\n\nStock actuel = 520 bo+«tes Stock minimum = 641 bo+«tes\n\n520 < 641 ÔåÆ Oui, le stock est en dessous du point de commande. Il faut commander imm+®diatement.\n\nLa pharmacie ne couvre que 520 +À 183 = 2,84 mois de consommation, ce qui semble confortable, mais le stock de s+®curit+® doit rester intact. Stock utilisable sans toucher au SS = 520 ÔêÆ 366 = 154 bo+«tes, soit seulement 0,84 mois de consommation disponible hors stock de s+®curit+®. Or le d+®lai de livraison est de 1,5 mois. La rupture est imminente si on ne commande pas maintenant.\n\nQuestion 7 ÔÇö Quantit+® +á commander :\n\nQ+áC = Stock max ÔêÆ Stock actuel = 1 007 ÔêÆ 520 = 487 bo+«tes\n"
      },
      {
        "id": "gas-m2-c33",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nEXERCICE 4 ÔÇö Cas complexe multiproduits\n\nDonn+®es\n\nD+®p+¦t de district de Savalou ÔÇö R+®vision mensuelle du stock\n\nParam+¿tres fixes :\n\nd+®lai de livraison = 2 mois,\n\np+®riode de commande = 3 mois,\n\nstock de s+®curit+® = 2 mois.\n\nQuestions :\n\nCalculez le stock de s+®curit+®, le stock minimum et le stock maximum.\n\nD+®terminez le statut du stock (normal, surstock, rupture imminente, commander).\n\nCalculez la quantit+® +á commander si n+®cessaire.\n\nProposez une action concr+¿te pour chaque produit.\n"
      },
      {
        "id": "gas-m2-c34",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 4 ÔÇö Cas complexe multiproduits\n\nProduit 1 ÔÇö Amoxicilline 250mg sirop (CMM = 85 flacons)\n\nStatut : stock actuel (620) > stock max (595) ÔåÆ Surstock l+®ger (+25 flacons)\n\nCouverture = 620 +À 85 = 7,3 mois\n\nAction :\n\nNe pas commander lors de cette r+®vision.\n\nSurveiller la date de p+®remption des flacons en exc+¿s.\n\nSi la p+®remption est proche, envisager une redistribution vers un autre centre de sant+®.\n"
      },
      {
        "id": "gas-m2-c35",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 4 ÔÇö Cas complexe multiproduits\n\nProduit 2 ÔÇö Fer acide folique 200/0,4mg (CMM = 430 cp)\n\nStatut : stock actuel (280) << stock minimum (1 720) ÔåÆ Rupture imminente critique\n\nCouverture = 280 +À 430 = 0,65 mois soit environ 19 jours. Or le d+®lai de livraison est de 2 mois. La pharmacie sera en rupture totale dans 19 jours et ne recevra pas de livraison avant 2 mois.\n\nQ+áC = 3 010 ÔêÆ 280 = 2 730 cp\n\nAction : commande d'urgence imm+®diate. Contacter simultan+®ment le niveau sup+®rieur pour une livraison partielle d'urgence. Identifier si un site voisin dispose d'un exc+®dent pouvant +¬tre redistribu+® en attendant..\n"
      },
      {
        "id": "gas-m2-c36",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 4 ÔÇö Cas complexe multiproduits\n\nProduit 3 ÔÇö Vitamine A 200 000 UI (CMM = 310 capsules)\n\nStatut : stock actuel (2 800) >> stock max (2 170) ÔåÆ Surstock important (+630 capsules)\n\nCouverture = 2 800 +À 310 = 9 mois\n\nAction : ne pas commander. V+®rifier imp+®rativement les dates de p+®remption. Si les capsules p+®riment dans moins de 9 mois, une partie sera perdue. Informer le niveau sup+®rieur et proposer une redistribution vers les sites d+®ficitaires. Investiguer la cause du surstock (erreur de commande pr+®c+®dente ? baisse de la demande ?).\n"
      },
      {
        "id": "gas-m2-c37",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 4 ÔÇö Cas complexe multiproduits\n\nProduit 4 ÔÇö Misoprostol 200mcg (CMM = 95 cp)\n\nStatut : stock actuel (410) > stock minimum (380) et < stock max (665) ÔåÆ Situation normale\n\nCouverture = 410 +À 95 = 4,3 mois. Le stock est dans la zone normale. Pas de commande +á d+®clencher lors de cette r+®vision, mais +á surveiller lors de la prochaine.\n\nLe stock se rapprochera du minimum dans environ 2,3 mois (410 ÔêÆ 380 = 30 cp de marge, soit 30 +À 95 = 0,3 mois... ).\n\nRecalcul : marge au-dessus du stock min = 410 ÔêÆ 380 = 30 cp ÔåÆ 30 +À 95 = 0,3 mois. La prochaine r+®vision est dans 1 mois. +Ç ce moment, le stock sera d'environ 410 ÔêÆ 95 = 315 cp, soit en dessous du stock min (380). Il faudra commander lors de la prochaine r+®vision.\n\nAction : noter dans le calendrier que le Misoprostol sera +á commander lors de la prochaine r+®vision mensuelle.\n"
      },
      {
        "id": "gas-m2-c38",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 4 ÔÇö Cas complexe multiproduits\n\nProduit 5 ÔÇö Gentamicine injectable 80mg (CMM = 40 ampoules)\n\nStatut : stock actuel (55) << stock minimum (160) ÔåÆ Rupture imminente\n\nCouverture = 55 +À 40 = 1,375 mois soit environ 41 jours\n\nLe d+®lai de livraison est de 2 mois (60 jours). La pharmacie sera en rupture dans 41 jours et n'aura pas de livraison avant 60 jours. D+®ficit de 19 jours sans produit.\n\nQ+áC = 280 ÔêÆ 55 = 225 ampoules\n\nAction : commande urgente imm+®diate. La Gentamicine +®tant un antibiotique injectable critique (infections n+®onatales, sepsis), la rupture peut avoir des cons+®quences graves. Contacter le niveau sup+®rieur pour une livraison partielle d'urgence et v+®rifier si des sites voisins peuvent partager temporairement leur stock.\n"
      },
      {
        "id": "gas-m2-c39",
        "title": "Exercices pratiques sur donn+®es r+®elles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur donn+®es r+®elles\n\nCorrection EXERCICE 4 ÔÇö Cas complexe multiproduits\n\nTableau de bord final ÔÇö D+®p+¦t de district de Savalou\n\n| Produit | CMM | Stock Dispo | Mois de Stock | Statut | Quantit+® +á Commander |\n|---|---|---|---|---|---|\n| Parac+®tamol 500mg | 10 000 | 15 000 | 1,5 | Normal | 15 000 |\n| Amoxicilline 250mg | 5 000 | 2 500 | 0,5 | Rupture imminente | 12 500 |\n| CTA Adulte | 2 000 | 8 000 | 4,0 | Surstock | 0 |\n"
      }
    ]
  },
  {
    "id": "gas-m3",
    "title": "Module 3 : Processus de commande et suivi fournisseurs",
    "chapters": [
      {
        "id": "gas-m3-c1",
        "title": "Processus de commande et suivi fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Processus de commande et suivi fournisseurs\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m3-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nCycle de commande : de la quantification +á la r+®ception\n\nS+®lection et +®valuation des fournisseurs\n\nGestion des contrats et des termes de livraison (Incoterms)\n\nOutils de suivi des commandes et tableau de bord fournisseurs\n"
      },
      {
        "id": "gas-m3-c3",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nLe cycle de commande est l'ensemble des +®tapes qui s'encha+«nent depuis le moment o+¦ un besoin en produits est identifi+® jusqu'au moment o+¦ ces produits sont disponibles en stock et pr+¬ts +á +¬tre distribu+®s.\n\nC'est un processus structur+®, document+® et impliquant plusieurs acteurs.\n\nUne d+®faillance +á n'importe quelle +®tape peut retarder la livraison, g+®n+®rer des erreurs de quantit+® ou introduire des produits de mauvaise qualit+® dans le stock.\n\nConna+«tre et ma+«triser chaque +®tape est donc une comp+®tence fondamentale pour tout gestionnaire de pharmacie.\n"
      },
      {
        "id": "gas-m3-c4",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 1 : Quantification des besoins\n\n+ëtape 2 : +ëlaboration du bon de commande\n\n+ëtape 3 : Validation et approbation\n\n+ëtape 4 : Transmission au fournisseur\n\n+ëtape 5 : Traitement par le fournisseur\n\n+ëtape 6 : Exp+®dition et transport\n\n+ëtape 7 : R+®ception et contr+¦le\n\nChaque +®tape a ses acteurs, ses documents et ses d+®lais.\n"
      },
      {
        "id": "gas-m3-c5",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 1 ÔÇö Quantification des besoins\n\nD+®finition : La quantification est le processus de calcul des quantit+®s de chaque produit +á commander pour couvrir les besoins jusqu'+á la prochaine livraison.\n\nQui la fait? : Le gestionnaire de la pharmacie ou du d+®p+¦t, assist+® si possible d'un responsable de programme (paludisme, VIH, CPN, etc.) pour les produits de programmes sp+®cifiques.\n\nComment ? En appliquant la formule : Q+áC = Stock max ÔêÆ Stock disponible actuel\n\nDocuments produits +á cette +®tape : Fiche de collecte des donn+®es de stock et tableau de quantification rempli et sign+®\n\nErreurs fr+®quentes +á +®viter :\n\nQuantifier sur la base du stock th+®orique sans v+®rifier le stock physique\n\nOublier d'int+®grer les commandes d+®j+á en transit\n\nNe pas ajuster la CMM depuis plusieurs mois malgr+® l'+®volution de la demande\n"
      },
      {
        "id": "gas-m3-c6",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 2 ÔÇö +ëlaboration du bon de commande\n\nD+®finition :\n\nLe bon de commande (BC) est le document officiel qui formalise la demande d'approvisionnement.\n\nIl engage la pharmacie et le fournisseur.\n\nIl doit +¬tre pr+®cis, complet et sans ambigu+»t+®.\n"
      },
      {
        "id": "gas-m3-c7",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 3 ÔÇö Validation et approbation\n\nD+®finition :\n\nAvant d'+¬tre transmis au fournisseur, le bon de commande doit +¬tre valid+® par l'autorit+® comp+®tente. Cette +®tape garantit que la commande est justifi+®e, correctement calcul+®e et dans les limites budg+®taires disponibles.\n\nCe que le valideur v+®rifie :\n\nLes quantit+®s sont-elles coh+®rentes avec la CMM et les niveaux de stock ?\n\nLe budget disponible couvre-t-il le montant total de la commande ?\n\nLes produits command+®s figurent-ils sur la liste des m+®dicaments essentiels autoris+®s ?\n\nLa commande est-elle dans le calendrier pr+®vu ?\n"
      },
      {
        "id": "gas-m3-c8",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 4 ÔÇö Transmission au fournisseur\n\nD+®finition :\n\nUne fois valid+®, le bon de commande est transmis au fournisseur. Le mode de transmission doit garantir la tra+ºabilit+® et la confirmation de r+®ception.\n\nBonne pratique : Quelle que soit la m+®thode utilis+®e, toujours obtenir une confirmation +®crite de r+®ception de la commande par le fournisseur, avec le num+®ro de commande et la date de livraison confirm+®e. Sans cette confirmation, la commande peut ne pas avoir +®t+® enregistr+®e.\n"
      },
      {
        "id": "gas-m3-c9",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 5 ÔÇö Traitement par le fournisseur\n\nD+®finition :\n\nUne fois la commande re+ºue, le fournisseur la traite en interne : v+®rification de la disponibilit+® des produits, pr+®paration, contr+¦le qualit+®, conditionnement et +®dition des documents de livraison.\n\nRisques +á cette +®tape :\n\nLe fournisseur peut +¬tre en rupture sur certains produits ÔåÆ livraison partielle\n\nDes substitutions peuvent +¬tre propos+®es (produit diff+®rent du command+®)\n\nDes erreurs de quantit+® peuvent survenir lors de la pr+®paration\n\nCe que le fournisseur produit +á cette +®tape :\n\nBon de livraison (BL) : liste des produits exp+®di+®s avec les quantit+®s r+®elles\n\nFacture : montant +á payer\n\nCertificat d'analyse (pour les produits pharmaceutiques) : preuve de contr+¦le qualit+®\n\nDocuments de transport : pour les livraisons longue distance\n"
      },
      {
        "id": "gas-m3-c10",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 5 ÔÇö Traitement par le fournisseur\n\nBonne pratique :\n\nSi la livraison sera partielle ou retard+®e :\n\nLe fournisseur doit en informer le commanditaire avant l'exp+®dition, pas au moment de la livraison.\n\nCela permet au gestionnaire d'anticiper et de prendre des mesures alternatives.\n"
      },
      {
        "id": "gas-m3-c11",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 6 ÔÇö Exp+®dition et transport\n\nD+®finition :\n\nLes produits sont charg+®s et achemin+®s vers la pharmacie destinataire. Cette +®tape est critique pour les produits thermosensibles (vaccins, insuline) qui exigent une cha+«ne du froid maintenue pendant tout le transport.\n\nDocuments accompagnant la livraison :\n\nBon de livraison sign+® par le transporteur\n\nBon de transport / bordereau d'exp+®dition\n\nCertificats d'analyse des lots\n\nFormulaire de suivi de temp+®rature (pour les produits de la cha+«ne du froid)\n"
      },
      {
        "id": "gas-m3-c12",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 6 ÔÇö Exp+®dition et transport\n\nBonnes pratiques pendant le transport :\n\nPour les produits standards :\n\nEmballages prot+®g+®s contre l'humidit+® et la chaleur excessive\n\nProduits non expos+®s au soleil direct pendant le transport\n\nProduits fragiles (ampoules) emball+®s avec protection anti-choc\n\nPour les produits de la cha+«ne du froid :\n\nTransport dans des glaci+¿res ou v+®hicules r+®frig+®r+®s\n\nPacks de glace en quantit+® suffisante pour la dur+®e du trajet\n\nThermom+¿tre enregistreur dans chaque contenant\n\nPastilles de contr+¦le du vaccin (VVM) v+®rifi+®es avant et apr+¿s transport\n"
      },
      {
        "id": "gas-m3-c13",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 7 ÔÇö R+®ception et contr+¦le\n\nD+®finition :\n\nC'est l'+®tape finale du cycle. Les produits arrivent et doivent +¬tre soigneusement v+®rifi+®s avant d'+¬tre int+®gr+®s au stock.\n\nUne r+®ception b+ócl+®e est la porte d'entr+®e de nombreux probl+¿mes : produits manquants non d+®tect+®s, produits de mauvaise qualit+® accept+®s, erreurs d'enregistrement.\n"
      },
      {
        "id": "gas-m3-c14",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 7 ÔÇö R+®ception et contr+¦le\n\nLes 5 v+®rifications obligatoires +á la r+®ception : :\n\nV+®rification 1 ÔÇö Conformit+® documentaire\n\nComparer le bon de livraison du fournisseur avec le bon de commande initial.\n\nV+®rification 2 ÔÇö Contr+¦le quantitatif\n\nCompter physiquement chaque produit, bo+«te par bo+«te, flacon par flacon.\n\nNe jamais accepter le chiffre du bon de livraison sans v+®rification.\n"
      },
      {
        "id": "gas-m3-c15",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 7 ÔÇö R+®ception et contr+¦le\n\nLes 5 v+®rifications obligatoires +á la r+®ception : :\n\nV+®rification 3 ÔÇö Contr+¦le qualitatif\n\nV+®rification 4 ÔÇö Contr+¦le de la cha+«ne du froid (produits thermosensibles)\n\nV+®rifier le pastillage des vaccins (Vaccine Vial Monitor - VVM).\n\nSi le pastillage indique une rupture de la cha+«ne du froid, placer en quarantaine imm+®diatement.\n"
      },
      {
        "id": "gas-m3-c16",
        "title": "Cycle de commande : de la quantification +á la r+®ception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification +á la r+®ception\n\nVue d'ensemble du cycle de commande\n\n+ëtape 7 ÔÇö R+®ception et contr+¦le\n\nLes 5 v+®rifications obligatoires +á la r+®ception : :\n\nV+®rification 5 ÔÇö Enregistrement imm+®diat\n\nD+¿s que la r+®ception est valid+®e, enregistrer sur :\n\nLa fiche de stock de chaque produit re+ºu\n\nLe registre de r+®ceptions\n\nLe syst+¿me informatis+® si disponible\n\nR+¿gle absolue : aucun produit ne doit +¬tre rang+® dans le stock sans avoir +®t+® enregistr+®.\n"
      },
      {
        "id": "gas-m3-c17",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLe fournisseur est un maillon critique de la cha+«ne pharmaceutique.\n\nUn bon produit mal livr+®, livr+® en retard, ou livr+® en quantit+® insuffisante a les m+¬mes cons+®quences qu'une mauvaise gestion interne :\n\nRupture de stock,\n\nSoins interrompus,\n\nPertes financi+¿res.\n\nChoisir ses fournisseurs avec rigueur et les +®valuer r+®guli+¿rement n'est pas une option, c'est une n+®cessit+®.\n\nDans le secteur pharmaceutique, cette rigueur est d'autant plus importante que la qualit+® des produits a un impact direct sur la sant+® et la vie des patients.\n"
      },
      {
        "id": "gas-m3-c18",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLes crit+¿res de s+®lection d'un fournisseur\n\nCrit+¿re 1 ÔÇö La qualit+® des produits\n\nC'est le crit+¿re le plus important dans le secteur pharmaceutique. Un fournisseur peut +¬tre moins cher que les autres, mais si ses produits sont de mauvaise qualit+®, il ne doit pas +¬tre retenu.\n\nCe qu'on v+®rifie :\n\nLe fournisseur est-il homologu+® par l'autorit+® nationale de r+®glementation pharmaceutique ?\n\nSes produits disposent-ils d'une autorisation de mise sur le march+® (AMM) dans le pays ?\n\nProduit-il selon les Bonnes Pratiques de Fabrication (BPF/GMP) internationalement reconnues ?\n\nPeut-il fournir des certificats d'analyse pour chaque lot livr+® ?\n\nA-t-il d+®j+á eu des rappels de lots ou des alertes qualit+® ?\n"
      },
      {
        "id": "gas-m3-c19",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLes crit+¿res de s+®lection d'un fournisseur\n\nCrit+¿re 2 ÔÇö Le prix et les conditions financi+¿res\n\nLe prix est important mais ne doit jamais +¬tre le seul crit+¿re. Un produit moins cher qui g+®n+¿re des ruptures fr+®quentes ou des probl+¿mes de qualit+® co++te finalement plus cher qu'un produit bien g+®r+® +á prix l+®g+¿rement sup+®rieur.\n\nCe qu'on +®value :\n\nPrix unitaire par produit\n\nRemises quantitatives (r+®ductions pour grandes commandes)\n\nConditions de paiement (d+®lai de paiement, acompte exig+®)\n\nPolitique de retour et d'avoir pour les produits non conformes\n\nFrais de livraison inclus ou non dans le prix\n"
      },
      {
        "id": "gas-m3-c20",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLes crit+¿res de s+®lection d'un fournisseur\n\nCrit+¿re 3 ÔÇö La fiabilit+® des d+®lais de livraison\n\nUn fournisseur qui livre en retard est aussi dangereux qu'un fournisseur qui livre des produits de mauvaise qualit+®. Le respect des d+®lais est mesurable sur l'historique des commandes.\n\nCe qu'on +®value :\n\nD+®lai de livraison annonc+® vs d+®lai r+®ellement observ+®\n\nFr+®quence des retards\n\nAmplitude des retards (quelques jours vs plusieurs semaines)\n\nCapacit+® +á livrer en urgence si besoin\n"
      },
      {
        "id": "gas-m3-c21",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLes crit+¿res de s+®lection d'un fournisseur\n\nCrit+¿re 4 ÔÇö La capacit+® et la disponibilit+® des produits\n\nUn fournisseur peut avoir de bons produits et de bons prix, mais s'il est r+®guli+¿rement en rupture sur les produits command+®s, il ne peut pas +¬tre consid+®r+® comme fiable.\n\nCe qu'on +®value :\n\nTaux de service (quantit+® livr+®e / quantit+® command+®e)\n\nFr+®quence des livraisons partielles\n\nCapacit+® +á absorber des commandes exceptionnelles (urgences, +®pid+®mies)\n\nDiversit+® du catalogue (peut-il fournir tous les produits dont on a besoin ?)\n"
      },
      {
        "id": "gas-m3-c22",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLes crit+¿res de s+®lection d'un fournisseur\n\nCrit+¿re 5 ÔÇö Le service et le support\n\nAu-del+á des produits eux-m+¬mes, la qualit+® de la relation commerciale et du support est un crit+¿re diff+®renciant, particuli+¿rement en situation de crise.\n\nCe qu'on +®value :\n\nR+®activit+® aux demandes d'information et aux r+®clamations\n\nQualit+® de la communication en cas de retard ou de rupture\n\nFlexibilit+® pour les commandes urgentes\n\nSupport technique (information sur les produits, gestion des effets ind+®sirables)\n\nPolitique de gestion des litiges\n"
      },
      {
        "id": "gas-m3-c23",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLa pond+®ration des crit+¿res ÔÇö Syst+¿me de scoring\n\nPour comparer objectivement plusieurs fournisseurs, on utilise un syst+¿me de scoring pond+®r+®. Chaque crit+¿re re+ºoit un poids selon son importance, et chaque fournisseur est not+® sur chaque crit+¿re.\n"
      },
      {
        "id": "gas-m3-c24",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nL'+®valuation p+®riodique des fournisseurs\n\nS+®lectionner un fournisseur est une d+®cision ponctuelle.\n\nL'+®valuer r+®guli+¿rement est une obligation continue.\n\nUn fournisseur qui performait bien il y a deux ans peut s'+¬tre d+®grad+®.\n\n+Ç l'inverse, un fournisseur moyen peut s'+¬tre am+®lior+® apr+¿s des investissements.\n"
      },
      {
        "id": "gas-m3-c25",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLa gestion des fournisseurs alternatifs\n\nD+®pendre d'un seul fournisseur pour un produit critique est un risque majeur.\n\nSi ce fournisseur est en rupture, en gr+¿ve, ou en difficult+® financi+¿re, toute la cha+«ne d'approvisionnement est bloqu+®e.\n\nBonne pratique ÔÇö La r+¿gle des 3 fournisseurs : Pour chaque produit essentiel, identifier et qualifier au minimum :\n\n1 fournisseur principal : celui avec qui on travaille habituellement (meilleur score global)\n\n1 fournisseur secondaire : sollicit+® en cas de d+®faillance du principal\n\n1 fournisseur d'urgence : prix potentiellement plus +®lev+®, mais disponible rapidement en cas de crise\n"
      },
      {
        "id": "gas-m3-c26",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLa gestion des litiges fournisseurs\n\nMalgr+® une bonne s+®lection et un suivi r+®gulier, des litiges surviennent. Il faut savoir les g+®rer de fa+ºon professionnelle et document+®e.\n"
      },
      {
        "id": "gas-m3-c27",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLa gestion des litiges fournisseurs\n\nProc+®dure de gestion d'un litige\n\n+ëtape 1 ÔÇö Documentation imm+®diate :\n\nAu moment de la r+®ception, noter l'anomalie sur le bon de livraison avant de signer.\n\nFaire contresigner par le livreur.\n\nPrendre des photos si possible.\n\n+ëtape 2 ÔÇö Notification formelle\n\nAdresser au fournisseur une r+®clamation +®crite dans les 48 +á 72 heures suivant la r+®ception, avec les +®l+®ments suivants :\n\nNum+®ro de commande et num+®ro de bon de livraison\n\nDescription pr+®cise de l'anomalie\n\nQuantit+® ou valeur concern+®e\n\nAction attendue (remplacement, avoir, remboursement)\n\nD+®lai de r+®ponse attendu\n"
      },
      {
        "id": "gas-m3-c28",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nLa gestion des litiges fournisseurs\n\nProc+®dure de gestion d'un litige\n\n+ëtape 3 ÔÇö Suivi et escalade\n\nSi le fournisseur ne r+®pond pas dans le d+®lai imparti :\n\nEscalader au niveau hi+®rarchique sup+®rieur (direction r+®gionale, minist+¿re) ou\n\nActiver les clauses contractuelles de p+®nalit+®.\n\n+ëtape 4 ÔÇö Enregistrement dans le dossier fournisseur\n\nTout litige, m+¬me r+®solu, doit +¬tre enregistr+® dans le dossier du fournisseur.\n\nCes donn+®es alimentent l'+®valuation p+®riodique et peuvent justifier une d+®cision de changement de fournisseur si les incidents se r+®p+¿tent.\n"
      },
      {
        "id": "gas-m3-c29",
        "title": "S+®lection et +®valuation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### S+®lection et +®valuation des fournisseurs\n\nSynth+¿se ÔÇö S+®lection et +®valuation des fournisseurs\n"
      },
      {
        "id": "gas-m3-c30",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nUn contrat d'approvisionnement est le document juridique qui d+®finit les droits et obligations de chaque partie, prot+¿ge la le client en cas de d+®faillance du fournisseur, et encadre toutes les conditions dans lesquelles les produits seront fournis.\n\nLes Incoterms, quant +á eux, sont des r+¿gles internationales standardis+®es qui pr+®cisent +á quel moment la responsabilit+® des marchandises passe du vendeur +á l'acheteur pendant le transport.\n\nLes ma+«triser permet d'+®viter des litiges co++teux et des pertes de produits non couverts.\n"
      },
      {
        "id": "gas-m3-c31",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nPourquoi un contrat est-il indispensable ?\n\nSans contrat formalis+®, chaque commande est une transaction isol+®e sans garanties. Le fournisseur peut modifier ses prix, ses d+®lais ou ses conditions +á tout moment.\n\nLe client ne dispose d'aucun recours juridique en cas de :\n\nlivraison non conforme,\n\nretard ou de\n\nrupture unilat+®rale.\n\nUn contrat bien r+®dig+® prot+¿ge les deux parties et cr+®e un cadre stable pour une relation durable.\n"
      },
      {
        "id": "gas-m3-c32",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 1 ÔÇö Identification des parties\n\nNom complet, adresse, statut juridique, num+®ro d'enregistrement et repr+®sentant l+®gal de chaque partie.\n\nCette clause para+«t +®vidente mais est souvent b+ócl+®e, ce qui peut poser des probl+¿mes juridiques en cas de litige.\n\nClause 2 ÔÇö Objet du contrat\n\nDescription pr+®cise des produits couverts par le contrat :\n\nd+®nomination commune internationale (DCI),\n\ndosage,\n\nforme pharmaceutique,\n\nconditionnement,\n\nnormes de qualit+® exig+®es.\n"
      },
      {
        "id": "gas-m3-c33",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 3 ÔÇö Prix et conditions de r+®vision\n\nPrix unitaire convenu, devise, modalit+®s de r+®vision du prix en cours de contrat.\n\nClause 4 ÔÇö Quantit+®s et modalit+®s de commande\n\nVolume minimum et maximum garanti sur la dur+®e du contrat, proc+®dure de passation des commandes, d+®lai de confirmation.\n\nLe volume minimum garanti prot+¿ge le fournisseur (il peut planifier sa production).\n\nLe volume maximum prot+¿ge la client (il n'est pas engag+®e au-del+á de ses besoins pr+®visionnels).\n\nClause 5 ÔÇö D+®lais de livraison et p+®nalit+®s de retard\n\nC'est l'une des clauses les plus importantes.\n\nElle fixe le d+®lai contractuel de livraison et les cons+®quences financi+¿res de son non-respect.\n"
      },
      {
        "id": "gas-m3-c34",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 6 ÔÇö Qualit+® et conformit+® des produits\n\nNormes de qualit+® exig+®es, documents de conformit+® obligatoires, proc+®dure en cas de non-conformit+®.\n\nLa clause sur la dur+®e de vie r+®siduelle (18 mois) est particuli+¿rement importante. Elle +®vite de recevoir des produits qui p+®rimeront avant d'+¬tre consomm+®s.\n\nClause 7 ÔÇö Conditions de livraison (Incoterms)\n\nPr+®cise qui est responsable du transport, de l'assurance et des frais douaniers.\n\nNous d+®taillerons cette clause dans la section suivante.\n\nClause 8 ÔÇö Conditions de paiement\n\nD+®lai de paiement, mode de paiement accept+®, p+®nalit+®s de retard de paiement.\n"
      },
      {
        "id": "gas-m3-c35",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 9 ÔÇö Force majeure\n\nD+®finit les +®v+®nements exceptionnels (catastrophes naturelles, guerres, +®pid+®mies) qui exon+¿rent temporairement une partie de ses obligations sans p+®nalit+®s.\n\nLa liste des +®v+®nements constituant un cas de force majeure doit +¬tre explicitement d+®finie dans le contrat.\n\nClause 10 ÔÇö R+®siliation\n\nConditions dans lesquelles chaque partie peut mettre fin au contrat : pr+®avis requis, motifs de r+®siliation imm+®diate (faute grave, non-conformit+® r+®p+®t+®e), indemnit+®s +®ventuelles.\n\nClause 11 ÔÇö R+¿glement des litiges\n\nD+®signe la juridiction comp+®tente en cas de litige non r+®solu +á l'amiable et pr+®voit +®ventuellement une proc+®dure d'arbitrage avant tout recours judiciaire.\n"
      },
      {
        "id": "gas-m3-c36",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nTableau r+®capitulatif des clauses essentielles\n\n| Clause | Description | Impact en cas d'absence |\n|---|---|---|\n| Qualit+® et Sp+®cifications | Normes exig+®es (pharmacop+®e, dur+®e de vie) | R+®ception de produits p+®rim+®s ou non conformes |\n| D+®lais de livraison | Date exacte ou p+®riode maximale de livraison | Ruptures de stock dues aux retards |\n| P+®nalit+®s de retard | % de d+®duction par jour/semaine de retard | Aucun moyen de pression sur le fournisseur |\n| Incoterms | R+®partition des co++ts et risques de transport | Litiges sur le paiement du fret et de l'assurance |\n"
      },
      {
        "id": "gas-m3-c37",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nQu'est-ce qu'un Incoterm ?\n\nIncoterm est la contraction de International Commercial Terms.\n\nCe sont des r+¿gles standardis+®es publi+®es par la Chambre de Commerce Internationale (CCI) et r+®vis+®es p+®riodiquement (derni+¿re version : Incoterms 2020).\n\nElles d+®finissent pr+®cis+®ment :\n\nQui (vendeur ou acheteur) organise et paie le transport\n\nQui organise et paie l'assurance des marchandises\n\nQui se charge des formalit+®s douani+¿res (export et import)\n\n+Ç quel moment le risque de perte ou de dommage passe du vendeur +á l'acheteur\n\nCe dernier point est crucial : si des produits sont endommag+®s ou perdus pendant le transport, l'Incoterm d+®termine qui en supporte la perte financi+¿re.\n"
      },
      {
        "id": "gas-m3-c38",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nLes Incoterms les plus utilis+®s en approvisionnement pharmaceutique\n\nEXW ÔÇö Ex Works (+Ç l'usine)\n\nPrincipe : Le vendeur met les marchandises +á disposition dans ses locaux. L'acheteur prend en charge tout le reste : chargement, transport, assurance, formalit+®s douani+¿res d'export et d'import, livraison finale.\n"
      },
      {
        "id": "gas-m3-c39",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nLes Incoterms les plus utilis+®s en approvisionnement pharmaceutique\n\nFOB ÔÇö Free On Board (Franco +á bord)\n\nPrincipe : Le vendeur livre les marchandises +á bord du navire d+®sign+® par l'acheteur, dans le port d'embarquement convenu. Les formalit+®s douani+¿res d'export sont +á la charge du vendeur. +Ç partir du moment o+¦ les marchandises sont +á bord, le risque et les co++ts passent +á l'acheteur.\n"
      },
      {
        "id": "gas-m3-c40",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nLes Incoterms les plus utilis+®s en approvisionnement pharmaceutique\n\nCIF ÔÇö Cost, Insurance and Freight (Co++t, assurance et fret)\n\nPrincipe : Le vendeur paie le transport et l'assurance jusqu'au port de destination d+®sign+®. Cependant, le risque passe +á l'acheteur d+¿s que les marchandises sont +á bord du navire dans le port d'export (comme en FOB). C'est une distinction importante : le vendeur paie l'assurance mais c'est l'acheteur qui en b+®n+®ficie si un sinistre survient pendant le transport.\n"
      },
      {
        "id": "gas-m3-c41",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nLes Incoterms les plus utilis+®s en approvisionnement pharmaceutique\n\nDDP ÔÇö Delivered Duty Paid (Rendu droits acquitt+®s)\n\nPrincipe : C'est l'Incoterm le plus favorable +á l'acheteur. Le vendeur supporte tous les co++ts et tous les risques jusqu'+á la destination finale convenue, y compris les droits de douane +á l'importation. L'acheteur n'a qu'+á r+®ceptionner les marchandises.\n"
      },
      {
        "id": "gas-m3-c42",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nLes Incoterms les plus utilis+®s en approvisionnement pharmaceutique\n\nDAP ÔÇö Delivered At Place (Rendu au lieu de destination)\n\nPrincipe : Similaire au DDP mais le vendeur ne prend pas en charge les droits de douane +á l'importation, qui restent +á la charge de l'acheteur. Le vendeur livre jusqu'au lieu de destination convenu, pr+¬t +á +¬tre d+®charg+®.\n"
      },
      {
        "id": "gas-m3-c43",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nComparaison synth+®tique des principaux Incoterms\n"
      },
      {
        "id": "gas-m3-c44",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms ÔÇö R+¿gles internationales de livraison\n\nChoisir le bon Incoterm selon le contexte\n"
      },
      {
        "id": "gas-m3-c45",
        "title": "Chapitre 1",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nPasser une commande est une chose. Savoir +á tout moment o+¦ elle en est, si elle sera livr+®e +á temps, et si le fournisseur performe correctement en est une autre.\n\nSans outils de suivi structur+®s, le gestionnaire travaille dans l'incertitude :\n\nil ne sait pas si sa commande a bien +®t+® re+ºue par le fournisseur,\n\nsi l'exp+®dition a eu lieu,\n\nni quand la livraison est attendue.\n\nCette incertitude conduit +á des relances tardives, des ruptures non anticip+®es et des d+®cisions de commande mal calibr+®es.\n\nLes outils de suivi des commandes et le tableau de bord fournisseurs transforment cette incertitude en visibilit+® et cette r+®activit+® subie en anticipation ma+«tris+®e.\n"
      },
      {
        "id": "gas-m3-c46",
        "title": "Chapitre 2",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe registre de suivi des commandes\n\nD+®finition et objectif\n\nLe registre de suivi des commandes est le document de base qui trace le cycle de vie de chaque commande depuis son +®mission jusqu'+á sa cl+¦ture apr+¿s r+®ception et v+®rification.\n\nC'est l'outil minimal indispensable, utilisable m+¬me sans informatique.\n"
      },
      {
        "id": "gas-m3-c47",
        "title": "Chapitre 3",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe registre de suivi des commandes\n\nStructure du registre\n"
      },
      {
        "id": "gas-m3-c48",
        "title": "Chapitre 4",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe tableau de bord des commandes en cours\n\nD+®finition\n\nLe tableau de bord des commandes en cours est une vue synth+®tique et visuelle de toutes les commandes actives +á un instant T.\n\nContrairement au registre (document historique complet), le tableau de bord ne montre que les commandes non encore cl+¦tur+®es.\n\nIl permet au gestionnaire d'identifier en un coup d'+ôil les commandes +á risque.\n"
      },
      {
        "id": "gas-m3-c49",
        "title": "Chapitre 5",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe syst+¿me d'alerte et de relance\n\nPrincipe\n\nUn bon syst+¿me de suivi ne se contente pas d'enregistrer passivement les informations.\n\nIl g+®n+¿re des alertes proactives qui d+®clenchent des actions avant que les probl+¿mes ne surviennent.\n\nDans un syst+¿me manuel, ces alertes sont des rappels inscrits dans un calendrier. Dans un syst+¿me informatis+®, elles sont automatiques.\n"
      },
      {
        "id": "gas-m3-c50",
        "title": "Chapitre 6",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe syst+¿me d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 1 ÔÇö Confirmation de r+®ception de commande (J+2 apr+¿s transmission)*\n\nSi le fournisseur n'a pas confirm+® la r+®ception du bon de commande dans les 48 heures suivant sa transmission, le gestionnaire relance.\n\nPourquoi : une commande non confirm+®e peut ne pas avoir +®t+® enregistr+®e par le fournisseur. Plus on attend pour s'en apercevoir, plus le retard s'accumule.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m3-c51",
        "title": "Chapitre 7",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe syst+¿me d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 2 ÔÇö Suivi d'exp+®dition (JÔêÆ7 avant la date de livraison promise)*\n\nSept jours avant la date de livraison promise, le gestionnaire v+®rifie que les produits ont bien +®t+® exp+®di+®s.\n\nPourquoi : si l'exp+®dition n'a pas encore eu lieu +á JÔêÆ7, la livraison sera tr+¿s probablement en retard. C'est le moment d'anticiper et d'+®valuer l'impact sur le stock.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m3-c52",
        "title": "Chapitre 8",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe syst+¿me d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 3 ÔÇö Retard av+®r+® (J+1 apr+¿s la date de livraison promise)*\n\nSi la livraison n'est pas arriv+®e +á la date promise, le gestionnaire d+®clenche le niveau 3 : notification formelle de retard avec application des p+®nalit+®s contractuelles et +®valuation de l'impact sur le stock.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m3-c53",
        "title": "Chapitre 9",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe syst+¿me d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 4 ÔÇö Retard critique (J+7 et au-del+á)*\n\nSi apr+¿s 7 jours de retard le probl+¿me n'est pas r+®solu, le gestionnaire escalade au niveau hi+®rarchique sup+®rieur, active le fournisseur alternatif si le stock est en danger, et documente formellement en vue d'une +®ventuelle r+®vision du contrat.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m3-c54",
        "title": "Chapitre 10",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe tableau de bord fournisseurs\n\nD+®finition et objectif\n\nLe tableau de bord fournisseurs est l'outil strat+®gique d'+®valuation continue de la performance des fournisseurs.\n\nIl consolide les donn+®es de toutes les commandes pass+®es aupr+¿s d'un fournisseur sur une p+®riode donn+®e et calcule automatiquement ses KPIs.\n\nIl permet de prendre des d+®cisions objectives :\n\nmaintenir,\n\nr+®orienter ou\n\nexclure un fournisseur.\n"
      },
      {
        "id": "gas-m3-c55",
        "title": "Chapitre 11",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe tableau de bord fournisseurs\n\nLes indicateurs du tableau de bord fournisseurs\n\nIndicateur 1 ÔÇö Taux de service\n\n(Quantit+® livr+®e conforme +À Quantit+® command+®e) +ù 100\n\nIndicateur 2 ÔÇö Taux de respect des d+®lais\n\n(Nombre de livraisons dans les d+®lais +À Nombre total de livraisons) +ù 100\n\nIndicateur 3 ÔÇö Taux de conformit+® qualit+®\n\n(Nombre de lots conformes +À Nombre total de lots re+ºus) +ù 100\n\nIndicateur 4 ÔÇö D+®lai moyen de livraison\n\nMoyenne des d+®lais r+®els observ+®s sur la p+®riode\n\nIndicateur 5 ÔÇö Taux de r+®solution des r+®clamations\n\n(R+®clamations r+®solues dans les d+®lais +À Total des r+®clamations) +ù 100\n"
      },
      {
        "id": "gas-m3-c56",
        "title": "Chapitre 12",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nOutils digitaux de suivi\n\nNiveau 1 ÔÇö Manuel (registre papier)\n\nAdapt+® aux structures sans +®lectricit+® fiable ni informatique.\n\nEfficace si rigoureusement tenu. Limite : pas de calculs automatiques, risque d'erreurs de transcription.\n\nNiveau 2 ÔÇö Tableur (Excel, Google Sheets)\n\nLe niveau le plus r+®pandu et le plus accessible.\n\nPermet les calculs automatiques, les graphiques, le filtrage. Un fichier Excel bien construit peut g+®rer l'ensemble du suivi des commandes et des tableaux de bord fournisseurs d'un d+®p+¦t de district.\n\nNiveau 3 ÔÇö Logiciel de gestion (SAGE, Odoo, OpenLMIS)\n\nSyst+¿mes int+®gr+®s qui automatisent le suivi des commandes, g+®n+¿rent les alertes, calculent les KPIs en temps r+®el et permettent la consolidation des donn+®es entre plusieurs sites.\n\nNiveau 4 ÔÇö Syst+¿me d'information logistique national (LMIS)\n\nNiveau le plus avanc+®, utilis+® par les centrales d'achat et les minist+¿res.\n\nPermet une visibilit+® en temps r+®el sur l'ensemble de la cha+«ne d'approvisionnement nationale.\n"
      }
    ]
  },
  {
    "id": "gas-m4",
    "title": "Module 4 : Gestion des ruptures et des surstocks",
    "chapters": [
      {
        "id": "gas-m4-c1",
        "title": "Gestion des ruptures et des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des ruptures et des surstocks\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m4-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nCauses et cons+®quences des ruptures de stock\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nIdentification et traitement des surstocks (redistribution, retour)\n\nPlans de contingence et proc+®dures d'urgence\n"
      },
      {
        "id": "gas-m4-c3",
        "title": "Causes et cons+®quences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et cons+®quences des ruptures de stock\n\nLes causes des ruptures de stock\n\nUne rupture de stock pharmaceutique n'est jamais un simple probl+¿me logistique.\n\nC'est une d+®faillance du syst+¿me de sant+® qui a des cons+®quences directes sur les patients, les soignants et les finances de la structure.\n\nComprendre pourquoi les ruptures surviennent est la premi+¿re +®tape pour les pr+®venir.\n\nLes causes sont multiples, souvent combin+®es, et peuvent se situer +á n'importe quel niveau de la cha+«ne pharmaceutique.\n\nLes ignorer ou les traiter superficiellement conduit in+®vitablement +á la r+®currence des ruptures.\n"
      },
      {
        "id": "gas-m4-c4",
        "title": "Causes et cons+®quences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et cons+®quences des ruptures de stock\n\nLes causes des ruptures de stock\n\nCat+®gorie 1 ÔÇö Causes li+®es +á la pr+®vision et +á la quantification\n\nCMM mal calcul+®e\n\nNon prise en compte de la saisonnalit+®\n\nCat+®gorie 2 ÔÇö Causes li+®es au processus de commande\n\nCommande tardive\n\nCommande rejet+®e ou bloqu+®e administrativement\n\nBudget insuffisant\n"
      },
      {
        "id": "gas-m4-c5",
        "title": "Causes et cons+®quences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et cons+®quences des ruptures de stock\n\nLes causes des ruptures de stock\n\nCat+®gorie 3 ÔÇö Causes li+®es aux fournisseurs\n\nRupture chez le fournisseur\n\nRetard de livraison\n\nCat+®gorie 4 ÔÇö Causes li+®es +á la demande\n\nHausse soudaine et impr+®vue de la demande\n\nAugmentation structurelle de la demande non d+®tect+®e\n\nLivraison partielle\n"
      },
      {
        "id": "gas-m4-c6",
        "title": "Causes et cons+®quences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et cons+®quences des ruptures de stock\n\nLes causes des ruptures de stock\n\nCat+®gorie 5 ÔÇö Causes li+®es +á la gestion physique du stock\n\nPertes physiques non enregistr+®es\n\nMauvaise organisation physique\n"
      },
      {
        "id": "gas-m4-c7",
        "title": "Causes et cons+®quences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et cons+®quences des ruptures de stock\n\nLes cons+®quences des ruptures de stock\n\nNiveau 1 ÔÇö Cons+®quences sanitaires\n\nInterruption de traitements en cours\n\n+ëchec th+®rapeutique et r+®sistances\n\nRecours +á des alternatives moins efficaces ou plus dangereuses\n\nMortalit+® +®vitable\n\nNiveau 2 ÔÇö Cons+®quences organisationnelles\n\nPerte de confiance des patients et des soignants\n\nSurcharge administrative li+®e aux commandes d'urgence\n\nD+®gradation des indicateurs de performance\n"
      },
      {
        "id": "gas-m4-c8",
        "title": "Causes et cons+®quences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et cons+®quences des ruptures de stock\n\nLes cons+®quences des ruptures de stock\n\nNiveau 3 ÔÇö Cons+®quences financi+¿res\n\nSurco++t des commandes d'urgence\n\nPerte de recettes\n\nGaspillage li+® aux produits substitu+®s puis non utilis+®s\n"
      },
      {
        "id": "gas-m4-c9",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nPr+®venir une rupture co++te toujours moins cher que la g+®rer.\n\nMais m+¬me avec les meilleures mesures pr+®ventives, certaines ruptures surviennent malgr+® tout, souvent pour des raisons ext+®rieures au contr+¦le du gestionnaire.\n\nIl faut donc ma+«triser deux registres compl+®mentaires :\n\nles strat+®gies pr+®ventives, qui r+®duisent la probabilit+® et la fr+®quence des ruptures et\n\nles strat+®gies curatives, qui minimisent leur dur+®e et leur impact quand elles surviennent malgr+® tout.\n\nUn gestionnaire comp+®tent ne se contente pas de subir les ruptures. Il les anticipe, les d+®tecte t+¦t et r+®agit vite avec des mesures adapt+®es.\n"
      },
      {
        "id": "gas-m4-c10",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 1 ÔÇö Maintenir une CMM fiable et +á jour\n\nC'est la base de tout.\n\nUne CMM fiable est le meilleur rempart contre les ruptures li+®es +á une mauvaise quantification.\n\nActions concr+¿tes :\n\nR+®viser la CMM tous les trimestres sans exception.\n\nEnregistrer syst+®matiquement toutes les sorties de stock d+¿s qu'elles ont lieu.\n\nAjuster la CMM d+¿s qu'un changement structurel est d+®tect+® (nouveau service, nouveau protocole, +®volution de la population).\n"
      },
      {
        "id": "gas-m4-c11",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 2 ÔÇö Dimensionner correctement le stock de s+®curit+®\n\nUn stock de s+®curit+® bien calibr+® est le filet de protection contre les al+®as.\n\nTrop faible, il ne prot+¿ge pas.\n\nTrop +®lev+®, il immobilise des ressources inutilement.\n"
      },
      {
        "id": "gas-m4-c12",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 3 ÔÇö Respecter rigoureusement le calendrier de commande\n\nLa commande tardive est une cause majeure de rupture +®vitable.\n\nElle doit +¬tre +®limin+®e par la discipline et l'organisation.\n\nActions concr+¿tes :\n\nD+®finir des dates fixes de commande dans un calendrier annuel affich+® et connu de tous.\n\nCr+®er des alertes visuelles dans le registre ou le syst+¿me informatique.\n\nV+®rifier le stock de chaque produit critique au moins deux fois par mois.\n"
      },
      {
        "id": "gas-m4-c13",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 4 ÔÇö Diversifier les sources d'approvisionnement\n\nD+®pendre d'un seul fournisseur pour un produit essentiel est un facteur de risque majeur.\n\nLa diversification r+®duit l'exposition aux d+®faillances d'un fournisseur unique.\n\nActions concr+¿tes :\n\nIdentifier et qualifier au minimum deux fournisseurs pour chaque produit essentiel.\n\nR+®partir les commandes entre les fournisseurs pour maintenir la relation commerciale active avec chacun.\n\nNe jamais d+®passer 70 +á 80% des commandes chez un seul fournisseur pour les produits critiques.\n"
      },
      {
        "id": "gas-m4-c14",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 5 ÔÇö Mettre en place un syst+¿me de surveillance pr+®coce\n\nD+®tecter la tendance +á la rupture avant qu'elle ne se produise permet d'intervenir +á temps.\n\nActions concr+¿tes :\n\nCalculer mensuellement le taux de couverture de chaque produit.\n\nD+®finir des seuils d'alerte +á deux niveaux : alerte jaune et alerte rouge.\n"
      },
      {
        "id": "gas-m4-c15",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 6 ÔÇö Conduire des inventaires r+®guliers\n\nLes inventaires r+®guliers permettent de d+®tecter les +®carts entre stock th+®orique et stock r+®el avant qu'ils ne deviennent critiques.\n"
      },
      {
        "id": "gas-m4-c16",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 1 ÔÇö D+®clarer et +®valuer la rupture\n\n+ëvaluer la criticit+® du produit :\n\n+ëvaluer la dur+®e pr+®visionnelle de la rupture :\n\nDur+®e de rupture estim+®e = D+®lai avant prochaine livraison ÔêÆ Couverture du stock r+®siduel\n"
      },
      {
        "id": "gas-m4-c17",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 2 ÔÇö Alerter la hi+®rarchie et les partenaires\n\nToute rupture av+®r+®e ou imminente sur un produit essentiel doit +¬tre signal+®e imm+®diatement au niveau hi+®rarchique sup+®rieur.\n\nCe signalement doit +¬tre :\n\n+ëcrit (email, rapport, formulaire standardis+®)\n\nFactuel (produit concern+®, stock r+®siduel, dur+®e estim+®e, nombre de patients potentiellement affect+®s)\n\nAccompagn+® d'une proposition de solution\n"
      },
      {
        "id": "gas-m4-c18",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 3 ÔÇö Activer les sources d'approvisionnement d'urgence\n\nOption 1 ÔÇö Redistribution inter-sites (la plus rapide et la moins co++teuse)\n\nIdentifier les sites disposant d'un exc+®dent du produit manquant et organiser un transfert.\n\nOption 2 ÔÇö Commande urgente aupr+¿s du fournisseur alternatif\n\nSi la redistribution inter-sites est insuffisante ou impossible.\n\nOption 3 ÔÇö Achat en pharmacie priv+®e (dernier recours)\n\nPour les cas extr+¬mes o+¦ les autres options ne sont pas disponibles assez rapidement.\n\nLe co++t est g+®n+®ralement tr+¿s +®lev+® mais peut +¬tre justifi+® pour des produits vitaux.\n"
      },
      {
        "id": "gas-m4-c19",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 4 ÔÇö G+®rer la distribution pendant la rupture\n\nQuand le stock r+®siduel est limit+® et qu'une rupture partielle est in+®vitable, le gestionnaire doit rationner la distribution de fa+ºon +®quitable et m+®dicalement justifi+®e.\n\nPrincipes de rationnement :\n\nPrioriser les patients d+®j+á en cours de traitement sur les nouveaux cas.\n\nPrioriser les cas les plus s+®v+¿res sur les cas l+®gers.\n\nInformer les prescripteurs imm+®diatement pour qu'ils adaptent leurs prescriptions (doses r+®duites si m+®dicalement acceptable, substituts th+®rapeutiques).\n"
      },
      {
        "id": "gas-m4-c20",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 5 ÔÇö Analyser les causes et mettre en place des mesures correctives\n\nUne fois la rupture r+®solue, une analyse des causes doit +¬tre conduite pour +®viter la r+®currence. C'est l'+®tape la plus souvent n+®glig+®e mais la plus importante pour progresser.\n"
      },
      {
        "id": "gas-m4-c21",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nPr+®venir une rupture co++te toujours moins cher que la g+®rer.\n\nMais m+¬me avec les meilleures mesures pr+®ventives, certaines ruptures surviennent malgr+® tout, souvent pour des raisons ext+®rieures au contr+¦le du gestionnaire.\n\nIl faut donc ma+«triser deux registres compl+®mentaires :\n\nles strat+®gies pr+®ventives, qui r+®duisent la probabilit+® et la fr+®quence des ruptures et\n\nles strat+®gies curatives, qui minimisent leur dur+®e et leur impact quand elles surviennent malgr+® tout.\n\nUn gestionnaire comp+®tent ne se contente pas de subir les ruptures. Il les anticipe, les d+®tecte t+¦t et r+®agit vite avec des mesures adapt+®es.\n"
      },
      {
        "id": "gas-m4-c22",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 1 ÔÇö Maintenir une CMM fiable et +á jour\n\nC'est la base de tout. Une CMM fiable est le meilleur rempart contre les ruptures li+®es +á une mauvaise quantification.\n\nActions concr+¿tes :\n\nR+®viser la CMM tous les trimestres sans exception.\n\nEnregistrer syst+®matiquement toutes les sorties de stock d+¿s qu'elles ont lieu.\n\nAjuster la CMM d+¿s qu'un changement structurel est d+®tect+® (nouveau service, nouveau protocole, +®volution de la population).\n"
      },
      {
        "id": "gas-m4-c23",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 2 ÔÇö Dimensionner correctement le stock de s+®curit+®\n\nUn stock de s+®curit+® bien calibr+® est le filet de protection contre les al+®as.\n\nTrop faible, il ne prot+¿ge pas.\n\nTrop +®lev+®, il immobilise des ressources inutilement.\n"
      },
      {
        "id": "gas-m4-c24",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 3 ÔÇö Respecter rigoureusement le calendrier de commande\n\nLa commande tardive est une cause majeure de rupture +®vitable. Elle doit +¬tre +®limin+®e par la discipline et l'organisation.\n\nActions concr+¿tes :\n\nD+®finir des dates fixes de commande dans un calendrier annuel affich+® et connu de tous.\n\nCr+®er des alertes visuelles dans le registre ou le syst+¿me informatique.\n\nV+®rifier le stock de chaque produit critique au moins deux fois par mois.\n"
      },
      {
        "id": "gas-m4-c25",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 4 ÔÇö Diversifier les sources d'approvisionnement\n\nD+®pendre d'un seul fournisseur pour un produit essentiel est un facteur de risque majeur. La diversification r+®duit l'exposition aux d+®faillances d'un fournisseur unique.\n\nActions concr+¿tes :\n\nIdentifier et qualifier au minimum deux fournisseurs pour chaque produit essentiel.\n\nR+®partir les commandes entre les fournisseurs pour maintenir la relation commerciale active avec chacun.\n\nNe jamais d+®passer 70 +á 80% des commandes chez un seul fournisseur pour les produits critiques.\n"
      },
      {
        "id": "gas-m4-c26",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 5 ÔÇö Mettre en place un syst+¿me de surveillance pr+®coce\n\nD+®tecter la tendance +á la rupture avant qu'elle ne se produise permet d'intervenir +á temps.\n\nActions concr+¿tes :\n\nCalculer mensuellement le taux de couverture de chaque produit.\n\nD+®finir des seuils d'alerte +á deux niveaux : alerte jaune et alerte rouge.\n"
      },
      {
        "id": "gas-m4-c27",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention des ruptures\n\nStrat+®gie 6 ÔÇö Conduire des inventaires r+®guliers\n\nLes inventaires r+®guliers permettent de d+®tecter les +®carts entre stock th+®orique et stock r+®el avant qu'ils ne deviennent critiques.\n"
      },
      {
        "id": "gas-m4-c28",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 1 ÔÇö D+®clarer et +®valuer la rupture\n\nD+¿s qu'une rupture est constat+®e ou imminente, le gestionnaire doit imm+®diatement :\n\n+ëvaluer la criticit+® du produit\n\n+ëvaluer la dur+®e pr+®visionnelle de la rupture\n\n+ëtape 2 ÔÇö Alerter la hi+®rarchie et les partenaires\n\nToute rupture av+®r+®e ou imminente sur un produit essentiel doit +¬tre signal+®e imm+®diatement au niveau hi+®rarchique sup+®rieur.\n\nCe signalement doit +¬tre :\n\n+ëcrit (email, rapport, formulaire standardis+®)\n\nFactuel (produit concern+®, stock r+®siduel, dur+®e estim+®e, nombre de patients potentiellement affect+®s)\n\nAccompagn+® d'une proposition de solution\n"
      },
      {
        "id": "gas-m4-c29",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 3 ÔÇö Activer les sources d'approvisionnement d'urgence\n\nOption 1 ÔÇö Redistribution inter-sites (la plus rapide et la moins co++teuse)\n\nOption 2 ÔÇö Commande urgente aupr+¿s du fournisseur alternatif\n\nOption 3 ÔÇö Achat en pharmacie priv+®e (dernier recours)\n"
      },
      {
        "id": "gas-m4-c30",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 4 ÔÇö G+®rer la distribution pendant la rupture\n\nQuand le stock r+®siduel est limit+® et qu'une rupture partielle est in+®vitable, le gestionnaire doit rationner la distribution de fa+ºon +®quitable et m+®dicalement justifi+®e.\n\nPrincipes de rationnement :\n\nPrioriser les patients d+®j+á en cours de traitement sur les nouveaux cas.\n\nPrioriser les cas les plus s+®v+¿res sur les cas l+®gers.\n\nInformer les prescripteurs imm+®diatement pour qu'ils adaptent leurs prescriptions (doses r+®duites si m+®dicalement acceptable, substituts th+®rapeutiques).\n"
      },
      {
        "id": "gas-m4-c31",
        "title": "Strat+®gies de pr+®vention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Strat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nStrat+®gies de gestion des ruptures av+®r+®es\n\n+ëtape 5 ÔÇö Analyser les causes et mettre en place des mesures correctives\n\nUne fois la rupture r+®solue, une analyse des causes doit +¬tre conduite pour +®viter la r+®currence. C'est l'+®tape la plus souvent n+®glig+®e mais la plus importante pour progresser.\n"
      },
      {
        "id": "gas-m4-c32",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nLe surstock est souvent per+ºu comme un probl+¿me mineur compar+® +á la rupture. Cette perception est erron+®e.\n\nUn surstock non trait+® co++te de l'argent, occupe de l'espace, immobilise des ressources qui auraient pu financer d'autres produits, et finit fr+®quemment par se transformer en p+®remption, c'est-+á-dire en perte s+¿che.\n\nDans certains syst+¿mes de sant+®, jusqu'+á 10 +á 15% de la valeur des produits pharmaceutiques sont perdus chaque ann+®e par p+®remption, soit des dizaines de millions de francs CFA gaspill+®s.\n\nL'identification pr+®coce et le traitement rapide des surstocks sont donc des actes de gestion +á part enti+¿re, aussi importants que la pr+®vention des ruptures.\n"
      },
      {
        "id": "gas-m4-c33",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nD+®finition op+®rationnelle\n\nUn surstock existe quand le stock disponible d'un produit d+®passe le stock maximum d+®fini. Mais en pratique, on distingue plusieurs degr+®s de surstock selon leur urgence de traitement\n"
      },
      {
        "id": "gas-m4-c34",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 1 ÔÇö L'analyse mensuelle du taux de couverture\n\nLe taux de couverture est le premier signal d'alerte d'un surstock. Tout produit avec un taux de couverture sup+®rieur +á la dur+®e stock max doit +¬tre examin+®.\n"
      },
      {
        "id": "gas-m4-c35",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 2 ÔÇö L'analyse ABC-VEN crois+®e\n\nL'analyse ABC classe les produits par valeur financi+¿re. L'analyse VEN les classe par importance m+®dicale (Vital, Essentiel, Non essentiel). Crois+®es, elles permettent de prioriser les actions sur les surstocks.\n\nAnalyse ABC :\n\nCat+®gorie A : 20% des produits repr+®sentant 80% de la valeur totale du stock\n\nCat+®gorie B : 30% des produits repr+®sentant 15% de la valeur\n\nCat+®gorie C : 50% des produits repr+®sentant 5% de la valeur\n\nAnalyse VEN :\n\nV (Vital) : produit dont l'absence entra+«ne un risque imm+®diat pour la vie du patient\n\nE (Essentiel) : produit important mais dont l'absence n'est pas imm+®diatement mortelle\n\nN (Non essentiel) : produit dont l'absence ne met pas en danger la vie du patient\n"
      },
      {
        "id": "gas-m4-c36",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 2 ÔÇö L'analyse ABC-VEN crois+®e\n\nMatrice de priorit+® pour le traitement des surstocks\n"
      },
      {
        "id": "gas-m4-c37",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 3 ÔÇö La liste des produits proches de p+®remption\n\nUn produit qui p+®rime dans moins de 6 mois doit automatiquement +¬tre consid+®r+® comme un surstock +á traiter, m+¬me si son niveau de stock ne d+®passe pas le stock max.\n"
      },
      {
        "id": "gas-m4-c38",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nCauses des surstocks\n"
      },
      {
        "id": "gas-m4-c39",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 1 ÔÇö Suspension des commandes\n\nC'est la mesure la plus simple et la premi+¿re +á appliquer. Elle ne r+®sout pas le surstock existant mais emp+¬che son aggravation.\n\nR+¿gle : ne jamais commander un produit dont la couverture d+®passe le stock max, sauf en cas de contexte exceptionnel document+®.\n"
      },
      {
        "id": "gas-m4-c40",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 2 ÔÇö Redistribution inter-sites\n\nTransf+®rer l'exc+®dent vers des sites en rupture ou +á stock bas sur le m+¬me produit. C'est la solution la plus rapide, la moins co++teuse et la plus utile d'un point de vue sanitaire.\n\nProcessus de redistribution :\n\n+ëtape 1 : Identifier les sites d+®ficitaires sur le m+¬me produit via le rapport mensuel ou un contact direct.\n\n+ëtape 2 : Calculer la quantit+® redistribuable sans mettre le site donneur en danger.\n\n+ëtape 3 : Obtenir l'autorisation du niveau hi+®rarchique sup+®rieur.\n\n+ëtape 4 : Pr+®parer les documents de transfert (bon de transfert, fiche de stock des deux sites).\n\n+ëtape 5 : Assurer le transport dans de bonnes conditions.\n\n+ëtape 6 : Mettre +á jour les fiches de stock des deux sites.\n"
      },
      {
        "id": "gas-m4-c41",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 3 ÔÇö Retour au fournisseur ou au niveau sup+®rieur\n\nQuand la redistribution inter-sites ne suffit pas, les produits exc+®dentaires peuvent +¬tre retourn+®s au fournisseur ou au niveau hi+®rarchique sup+®rieur (d+®p+¦t r+®gional, centrale d'achat) qui peut les redistribuer +á plus grande +®chelle.\n\nConditions pour un retour fournisseur :\n\nLes produits sont encore dans leur emballage d'origine, non ouverts\n\nLa date de p+®remption est suffisamment +®loign+®e (g+®n+®ralement > 12 mois)\n\nLe contrat avec le fournisseur pr+®voit une clause de retour\n\nL'autorisation du niveau hi+®rarchique sup+®rieur est obtenue\n"
      },
      {
        "id": "gas-m4-c42",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 4 ÔÇö Acc+®l+®ration de la consommation\n\nPour certains produits non critiques disponibles en exc+¿s, il est possible d'augmenter la vitesse d'+®coulement du stock en intensifiant les activit+®s qui consomment ce produit.\n\nActions possibles :\n\nIntensifier les activit+®s de pr+®vention (journ+®es de sensibilisation, distribution communautaire)\n\nPartager l'information avec les prescripteurs pour favoriser la prescription du produit en exc+¿s quand il est m+®dicalement appropri+®\n\nOrganiser des s+®ances de distribution de masse pour les produits dont la distribution est possible (Vitamine A, moustiquaires, SRO)\n"
      },
      {
        "id": "gas-m4-c43",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 5 ÔÇö Don +á une autre structure\n\nQuand le retour au fournisseur est impossible et que la redistribution inter-sites dans le m+¬me syst+¿me ne suffit pas, un don +á une structure partenaire (ONG, structure priv+®e +á but non lucratif, camp de r+®fugi+®s) peut permettre d'utiliser les produits plut+¦t que de les d+®truire.\n\nConditions :\n\nAutorisation obligatoire du niveau hi+®rarchique sup+®rieur et de la direction de la pharmacie\n\nLa structure b+®n+®ficiaire doit +¬tre habilit+®e +á recevoir et g+®rer des produits pharmaceutiques\n\nLes produits doivent +¬tre en bon +®tat et avoir une date de p+®remption suffisante\n\nUn bon de don formalis+® doit +¬tre +®tabli et sign+® par les deux parties\n"
      },
      {
        "id": "gas-m4-c44",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 6 ÔÇö Destruction r+®glementaire\n\nQuand aucune autre option n'est possible (produits p+®rim+®s, endommag+®s, non conformes, irr+®cup+®rables), la destruction est la seule solution. Elle doit +¬tre r+®alis+®e selon des proc+®dures strictes pour prot+®ger l'environnement et la sant+® publique.\n\nProc+®dure de destruction :\n\n+ëtape 1 ÔÇö Constitution du dossier de destruction\n\nListe compl+¿te des produits +á d+®truire (d+®signation, lot, quantit+®, valeur, raison)\n\nAutorisation du niveau hi+®rarchique sup+®rieur\n\nPr+®sence d'au moins deux t+®moins (m+®decin chef, inspecteur de pharmacie)\n"
      },
      {
        "id": "gas-m4-c45",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 6 ÔÇö Destruction r+®glementaire\n\nProc+®dure de destruction :\n\n+ëtape 2 ÔÇö M+®thode de destruction selon le type de produit\n\nJamais : jeter dans une d+®charge +á ciel ouvert, enterrer sans neutralisation, br++ler +á l'air libre (risque toxique)\n"
      },
      {
        "id": "gas-m4-c46",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 6 ÔÇö Destruction r+®glementaire\n\nProc+®dure de destruction :\n\n+ëtape 3 ÔÇö Documentation\n\nProc+¿s-verbal de destruction sign+® par tous les t+®moins pr+®sents\n\nMise +á jour des fiches de stock (sortie pour destruction)\n\nConservation du PV pendant au moins 5 ans\n"
      },
      {
        "id": "gas-m4-c47",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nUn plan de contingence est un dispositif pr+®par+® +á l'avance pour r+®pondre +á des situations exceptionnelles qui perturbent le fonctionnement normal de la cha+«ne d'approvisionnement.\n\nIl r+®pond +á une logique simple :\n\nles crises ne s'improvisent pas.\n\nUne pharmacie qui attend qu'une +®pid+®mie +®clate pour r+®fl+®chir +á comment s'approvisionner en urgence perdra un temps pr+®cieux, paiera des prix excessifs et mettra des vies en danger.\n\nUne pharmacie qui a anticip+® ces sc+®narios dispose de r+®ponses pr+¬tes +á +¬tre activ+®es imm+®diatement.\n\nLa diff+®rence entre les deux peut se mesurer en vies sauv+®es.\n"
      },
      {
        "id": "gas-m4-c48",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nCat+®gorie 1 ÔÇö Crises li+®es +á la demande\n"
      },
      {
        "id": "gas-m4-c49",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nCat+®gorie 2 ÔÇö Crises li+®es +á l'approvisionnement\n"
      },
      {
        "id": "gas-m4-c50",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nStrat+®gies de pr+®vention et de gestion des ruptures\n\nCat+®gorie 3 ÔÇö Crises li+®es +á la structure elle-m+¬me\n"
      },
      {
        "id": "gas-m4-c51",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nStructure d'un plan de contingence\n\nComposante 1 ÔÇö Identification des produits critiques\n\nTous les produits ne n+®cessitent pas le m+¬me niveau de pr+®paration d'urgence.\n\nLe plan de contingence doit se concentrer en priorit+® sur les produits dont la rupture a les cons+®quences sanitaires les plus graves.\n\nM+®thode de priorisation ÔÇö Matrice de criticit+®\n\nComposante 2 ÔÇö Stock de contingence d+®di+®\n\nPour les produits critiques, un stock de contingence suppl+®mentaire est constitu+® et maintenu en dehors du stock de routine.\n\nIl ne doit +¬tre utilis+® qu'en cas de d+®clenchement officiel du plan de contingence.\n\nStock de contingence = CMM +ù Dur+®e estim+®e de la crise la plus probable\n"
      },
      {
        "id": "gas-m4-c52",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nStructure d'un plan de contingence\n\nComposante 3 ÔÇö Liste des fournisseurs d'urgence\n\nPour chaque produit critique, une liste de fournisseurs d'urgence homologu+®s doit +¬tre pr+®par+®e +á l'avance, avec toutes les informations n+®cessaires pour passer une commande imm+®diatement.\n\nR+¿gle de mise +á jour :\n\nLes fiches fournisseurs d'urgence doivent +¬tre v+®rifi+®es et mises +á jour tous les 6 mois minimum.\n\nUn contact t+®l+®phonique de v+®rification suffit.\n\nUn fournisseur d'urgence dont les informations sont obsol+¿tes est un fournisseur inutilisable au moment de la crise.\n"
      },
      {
        "id": "gas-m4-c53",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nStructure d'un plan de contingence\n\nComposante 4 ÔÇö Proc+®dures d'activation du plan\n\nLe plan de contingence ne doit pas rester un document th+®orique. Il doit d+®finir pr+®cis+®ment les conditions de son d+®clenchement, les +®tapes +á suivre et les responsabilit+®s de chacun.\n\nCrit+¿res de d+®clenchement du plan :\n"
      },
      {
        "id": "gas-m4-c54",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nProc+®dures d'urgence sp+®cifiques\n\nProc+®dure d'urgence 1 ÔÇö Rappel de lot (retrait de produits du march+®)\n\nUn rappel de lot survient quand l'autorit+® de r+®glementation pharmaceutique ou le fabricant ordonne le retrait d'un lot sp+®cifique de m+®dicaments en raison d'un probl+¿me de qualit+® d+®tect+® (contamination, mauvais dosage, emballage d+®fectueux).\n\nProc+®dure :\n\n+ëtape 1 ÔÇö R+®ception de l'alerte de rappel :\n\nL'alerte peut venir de la Direction de la Pharmacie, de la DRS, du fournisseur ou de l'OMS.\n\nElle pr+®cise le nom du produit, le num+®ro de lot concern+® et la raison du rappel.\n\n+ëtape 2 ÔÇö Identification et mise en quarantaine imm+®diate :\n\nV+®rifier dans le stock si des unit+®s du lot concern+® sont pr+®sentes.\n\nToute unit+® identifi+®e doit +¬tre imm+®diatement retir+®e du stock et plac+®e en quarantaine (zone s+®par+®e, +®tiquet+®e \"QUARANTAINE ÔÇö NE PAS UTILISER\").\n"
      },
      {
        "id": "gas-m4-c55",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nProc+®dures d'urgence sp+®cifiques\n\nProc+®dure d'urgence 1 ÔÇö Rappel de lot (retrait de produits du march+®)\n\nProc+®dure :\n\n+ëtape 3 ÔÇö V+®rification des distributions pass+®es :\n\nV+®rifier dans le registre si des unit+®s du lot rappel+® ont d+®j+á +®t+® distribu+®es.\n\nSi oui, identifier les patients ou structures ayant re+ºu ces unit+®s et les notifier selon les instructions de l'alerte.\n\n+ëtape 4 ÔÇö Notification et rapport :\n\nNotifier imm+®diatement la DRS et la Direction de la Pharmacie.\n\nEnvoyer un rapport pr+®cisant les quantit+®s identifi+®es, les quantit+®s d+®j+á distribu+®es, et les actions prises.\n\n+ëtape 5 ÔÇö Retour ou destruction :\n\nSelon les instructions de l'alerte, retourner les produits au fournisseur ou +á la Direction de la Pharmacie, ou proc+®der +á la destruction selon le protocole r+®glementaire.\n"
      },
      {
        "id": "gas-m4-c56",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nProc+®dures d'urgence sp+®cifiques\n\nProc+®dure d'urgence 2 ÔÇö Incendie ou inondation du d+®p+¦t\n\nProc+®dure :\n\nImm+®diatement (dans l'heure) :\n\nÔÿÉ Mettre le personnel en s+®curit+®\n\nÔÿÉ Alerter les secours (pompiers, police)\n\nÔÿÉ S+®curiser les documents (registres, fiches de stock) si possible sans danger\n\nÔÿÉ Notifier le m+®decin chef et la DRS\n\nImm+®diatement (dans l'heure) :\n\nÔÿÉ +ëvaluer l'+®tendue des d+®g+óts (produits sauv+®s vs produits d+®truits)\n\nÔÿÉ Trier les produits sauv+®s : conformes vs endommag+®s (chaleur, humidit+®) ÔåÆ mise en quarantaine des produits douteux\n\nÔÿÉ Constituer un stock d'urgence minimum +á partir des produits sauv+®s conformes\n\nÔÿÉ Envoyer une demande d'approvisionnement d'urgence au niveau sup+®rieur\n\nÔÿÉ +ëtablir un rapport de pertes pour les assurances et la comptabilit+®\n"
      },
      {
        "id": "gas-m4-c57",
        "title": "Plans de contingence et proc+®dures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et proc+®dures d'urgence\n\nProc+®dures d'urgence sp+®cifiques\n\nProc+®dure d'urgence 3 ÔÇö D+®part soudain du gestionnaire\n\nProc+®dure :\n\nPr+®paration (avant toute crise) :\n\nÔÿÉ Identifier et former un gestionnaire rempla+ºant capable d'assurer les t+óches critiques\n\nÔÿÉ Tenir les documents de stock +á jour et accessibles au rempla+ºant\n\nÔÿÉ Documenter les contacts fournisseurs et les proc+®dures dans un manuel accessible\n\nÔÿÉ Organiser un inventaire trimestriel cosign+® par le gestionnaire et son rempla+ºant\n\nEn cas de d+®part soudain :\n\nÔÿÉ Passation de service avec inventaire complet dans les 48 heures\n\nÔÿÉ Le rempla+ºant prend en charge les commandes en cours et les alertes de stock\n\nÔÿÉ La hi+®rarchie est notifi+®e pour validation des premi+¿res commandes du rempla+ºant\n"
      }
    ]
  },
  {
    "id": "gas-m5",
    "title": "Module 5 : Syst+¿mes d'inventaire et outils digitaux",
    "chapters": [
      {
        "id": "gas-m5-c1",
        "title": "Syst+¿mes d'inventaire et outils digitaux",
        "type": "text",
        "duration": "10 min",
        "content": "#### Syst+¿mes d'inventaire et outils digitaux\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m5-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nTypes d'inventaires (permanent, p+®riodique, tournant)\n\nProc+®dures de comptage et de r+®conciliation\n\nOutils digitaux de gestion des stocks (logiciels, applications mobiles)\n"
      },
      {
        "id": "gas-m5-c3",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire est l'acte par lequel on v+®rifie que ce qui est dans le registre ou le syst+¿me informatique correspond +á ce qui est physiquement pr+®sent dans le d+®p+¦t.\n\nC'est une op+®ration de contr+¦le fondamentale qui conditionne la fiabilit+® de toutes les d+®cisions de gestion.\n\nUn gestionnaire qui ne fait pas d'inventaire r+®gulier travaille sur des donn+®es dont il ne peut pas garantir l'exactitude. Il commande peut-+¬tre trop, peut-+¬tre trop peu, distribue peut-+¬tre des produits qui n'existent plus physiquement, ou ignore des produits qui dorment dans un coin du d+®p+¦t.\n\nLes trois types d'inventaires ÔÇö permanent, p+®riodique et tournant ÔÇö r+®pondent +á des logiques diff+®rentes et se compl+¿tent. Les conna+«tre permet de choisir le syst+¿me le plus adapt+® au contexte de chaque structure.\n"
      },
      {
        "id": "gas-m5-c4",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire permanent\n\nD+®finition\n\nL'inventaire permanent, aussi appel+® inventaire continu, est un syst+¿me dans lequel le stock th+®orique est mis +á jour en temps r+®el +á chaque mouvement de produit, entr+®e ou sortie.\n\n+Ç tout moment, le gestionnaire peut consulter le stock th+®orique sans avoir besoin de compter physiquement les produits.\n\nPrincipe de fonctionnement : Stock th+®orique au temps T = Stock initial + Total des entr+®es ÔêÆ Total des sorties (depuis le stock initial)\n\nChaque entr+®e (r+®ception de livraison) et chaque sortie (distribution, transfert, perte) est imm+®diatement enregistr+®e sur la fiche de stock ou dans le logiciel.\n\nLe stock th+®orique est donc toujours +á jour.\n"
      },
      {
        "id": "gas-m5-c5",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire permanent\n\nCe que l'inventaire permanent permet :\n\nConna+«tre +á tout moment le stock th+®orique sans compter physiquement\n\nD+®tecter imm+®diatement toute anomalie (sortie sans justificatif)\n\nCalculer automatiquement la CMM +á partir des sorties enregistr+®es\n\nD+®clencher les alertes de stock min en temps r+®el\n\nLimites de l'inventaire permanent :\n\nExige un enregistrement rigoureux et imm+®diat de chaque mouvement\n\nSi un mouvement est oubli+® ou mal enregistr+®, l'+®cart s'accumule sans +¬tre d+®tect+®\n\nNe remplace pas le comptage physique p+®riodique\n"
      },
      {
        "id": "gas-m5-c6",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire permanent\n\nConditions de r+®ussite de l'inventaire permanent\n"
      },
      {
        "id": "gas-m5-c7",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire p+®riodique\n\nD+®finition\n\nL'inventaire p+®riodique est un syst+¿me dans lequel le stock n'est pas suivi en continu mais compt+® physiquement +á intervalles r+®guliers et pr+®d+®finis.\n\nEntre deux inventaires, le gestionnaire ne dispose pas n+®cessairement d'un stock th+®orique fiable.\n\nL'inventaire p+®riodique est souvent utilis+® dans les structures avec des ressources limit+®es ou un volume de produits important.\n\nFr+®quences habituelles :\n"
      },
      {
        "id": "gas-m5-c8",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire p+®riodique\n\nProc+®dure d'inventaire p+®riodique\n\nAvant l'inventaire :\n\nÔÿÉ Fixer la date +á l'avance et la communiquer au personnel\n\nÔÿÉ Suspendre tous les mouvements de stock 2 heures avant le d+®but\n\nÔÿÉ Pr+®parer les formulaires de comptage (un formulaire par produit ou par zone)\n\nÔÿÉ Constituer les +®quipes de comptage (2 personnes minimum par +®quipe : un qui compte, un qui enregistre)\n\nÔÿÉ S'assurer que les registres et fiches de stock sont +á jour jusqu'+á la veille\n"
      },
      {
        "id": "gas-m5-c9",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire p+®riodique\n\nProc+®dure d'inventaire p+®riodique\n\nPendant l'inventaire :\n\nÔÿÉ Chaque +®quipe compte sa zone sans conna+«tre le stock th+®orique (pour +®viter les biais)\n\nÔÿÉ Comptage physique unit+® par unit+®, bo+«te par bo+«te\n\nÔÿÉ Enregistrement imm+®diat de chaque comptage sur le formulaire\n\nÔÿÉ Double-comptage obligatoire pour les produits +á forte valeur ou les +®carts suspects\n\nÔÿÉ Identification et s+®paration physique des produits p+®rim+®s, endommag+®s, en quarantaine\n"
      },
      {
        "id": "gas-m5-c10",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire p+®riodique\n\nProc+®dure d'inventaire p+®riodique\n\nApr+¿s l'inventaire :\n\nÔÿÉ Comparaison entre stock physique compt+® et stock th+®orique\n\nÔÿÉ Calcul des +®carts\n\nÔÿÉ Investigation des +®carts significatifs\n\nÔÿÉ Mise +á jour des fiches de stock avec le stock physique r+®el\n\nÔÿÉ R+®daction du rapport d'inventaire\n"
      },
      {
        "id": "gas-m5-c11",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nDiff+®rences entre inventaire permanent et p+®riodique\n"
      },
      {
        "id": "gas-m5-c12",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire tournant\n\nD+®finition\n\nL'inventaire tournant est un syst+¿me dans lequel l'ensemble du stock est divis+® en segments (par zone, par famille de produits, ou par ordre alphab+®tique), et chaque segment est compt+® +á tour de r+¦le selon un calendrier pr+®d+®fini.\n\n+Ç tout moment de l'ann+®e, une partie du stock a +®t+® r+®cemment v+®rifi+®e.\n\nSur une p+®riode de 12 mois, l'int+®gralit+® du stock est pass+®e en revue plusieurs fois.\n\nPrincipe : Au lieu de tout compter en une seule fois (comme pour l'inventaire p+®riodique), on compte un peu chaque semaine ou chaque mois, de fa+ºon continue et rotative.\n"
      },
      {
        "id": "gas-m5-c13",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire tournant\n\nAvantages de l'inventaire tournant\n\nAvantage 1 ÔÇö D+®tection rapide des +®carts : Un +®cart sera d+®tect+® au plus tard 4 semaines apr+¿s sa survenue (au prochain comptage du Groupe A), alors qu'avec un inventaire semestriel il pourrait rester invisible pendant 6 mois.\n\nAvantage 2 ÔÇö Charge de travail r+®partie : L'inventaire tournant ne mobilise jamais l'ensemble du personnel en m+¬me temps. Chaque semaine, seulement peu de produits sont compt+®s, ce qui prend environ 1 +á 2 heures au lieu de la journ+®e enti+¿re qu'exige un inventaire complet.\n\nAvantage 3 ÔÇö Maintien continu de la fiabilit+® des donn+®es : Avec l'inventaire tournant, les donn+®es de stock des produits r+®cemment compt+®s sont fiables +á tout moment.\n"
      },
      {
        "id": "gas-m5-c14",
        "title": "Types d'inventaires (permanent, p+®riodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, p+®riodique, tournant)\n\nL'inventaire de passation de service\n\nUn type d'inventaire particulier m+®rite une mention sp+®ciale : l'inventaire de passation de service. Il est r+®alis+® +á chaque changement de gestionnaire et prot+¿ge +á la fois le gestionnaire sortant (il n'est pas tenu responsable de pertes survenues apr+¿s son d+®part) et le gestionnaire entrant (il sait exactement ce qu'il prend en charge).\n\nProc+®dure :\n\nÔÿÉ Comptage physique complet de tous les produits en pr+®sence des deux gestionnaires\n\nÔÿÉ V+®rification de tous les documents (registres, bons de commande en cours, fiches de stock)\n\nÔÿÉ Inventaire des +®quipements et du mat+®riel\n\nÔÿÉ R+®daction d'un proc+¿s-verbal de passation cosign+® par les deux gestionnaires et le m+®decin chef\n\nÔÿÉ Conservation d'une copie par chaque partie\n"
      },
      {
        "id": "gas-m5-c15",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nCompter un stock semble +¬tre une op+®ration simple. Dans la pratique, c'est une proc+®dure exigeante qui, mal conduite, produit des r+®sultats aussi peu fiables que l'absence de comptage. Un mauvais comptage donne l'illusion de la ma+«trise sans en avoir la r+®alit+®.\n\nLes erreurs de comptage ÔÇö produits oubli+®s, doubles comptages, mauvaise lecture des quantit+®s, influence du stock th+®orique sur le comptage ÔÇö sont nombreuses et courantes.\n\nLa r+®conciliation, quant +á elle, est l'+®tape qui suit le comptage et qui consiste +á comparer le stock physique obtenu avec le stock th+®orique, analyser les +®carts, en comprendre les causes et corriger les donn+®es.\n\nEnsemble, comptage et r+®conciliation forment le c+ôur du processus d'inventaire.\n"
      },
      {
        "id": "gas-m5-c16",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nPr+®paration du comptage\n\nPrincipe : Le d+®p+¦t doit +¬tre organis+® de fa+ºon +á rendre le comptage syst+®matique et exhaustif. Chaque produit doit avoir une place d+®finie et connue. Les produits de statuts diff+®rents doivent +¬tre physiquement s+®par+®s avant le comptage.\n\nActions pr+®paratoires :\n\nÔÿÉ Regrouper tous les produits de m+¬me type au m+¬me endroit (si ce n'est pas d+®j+á le cas)\n\nÔÿÉ S+®parer physiquement les produits de statuts diff+®rents :\n\nZone de stock actif : produits disponibles +á la distribution\n\nZone de quarantaine : produits suspects, en attente de d+®cision\n\nZone de p+®rim+®s : produits hors d'usage, en attente de destruction\n\nÔÿÉ +ëtiqueter chaque zone clairement\n\nÔÿÉ V+®rifier que tous les produits sont accessibles (rien derri+¿re des palettes inaccessibles, rien sous des +®tag+¿res sans visibilit+®)\n\nOrganisation de l'espace\n"
      },
      {
        "id": "gas-m5-c17",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nPrincipe du double comptage : Chaque produit doit +¬tre compt+® par au moins deux personnes diff+®rentes, ind+®pendamment l'une de l'autre. Les r+®sultats sont compar+®s. En cas de divergence, un troisi+¿me comptage est effectu+®..\n\nComposition recommand+®e des +®quipes :\n\nR+¿gle absolue : Le compteur ne doit pas conna+«tre le stock th+®orique avant de compter\n\nPr+®paration du comptage\n\nConstitution des +®quipes de comptage\n"
      },
      {
        "id": "gas-m5-c18",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nUn formulaire de comptage bien con+ºu facilite le travail et r+®duit les erreurs. Il doit +¬tre pr+®par+® +á l'avance et distribu+® aux +®quipes avant le d+®but du comptage.\n\nPr+®paration du comptage\n\nPr+®paration des formulaires de comptage\n"
      },
      {
        "id": "gas-m5-c19",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nM+®thodes de comptage\n\nC'est la m+®thode la plus pr+®cise. Chaque unit+® (comprim+®, ampoule, flacon, sachet) est compt+®e individuellement.\n\nQuand l'utiliser :\n\nProduits +á forte valeur unitaire (insuline, vaccins, ARV)\n\nProduits avec des +®carts fr+®quents\n\nProduits en petite quantit+® (moins de 500 unit+®s)\n\nTechnique : Regrouper les unit+®s par paquets de 10 ou de 100 pour faciliter le comptage.\n\nComptage par unit+®s\n"
      },
      {
        "id": "gas-m5-c20",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nM+®thodes de comptage\n\nPour les produits en grandes quantit+®s et dont les conditionnements sont scell+®s et inviol+®s, on peut compter les bo+«tes et multiplier par leur contenu.\n\nQuand l'utiliser :\n\nProduits en grandes quantit+®s (> 1 000 unit+®s)\n\nConditionnements scell+®s, non ouverts, avec contenu v+®rifi+® +á la r+®ception\n\nR+¿gle de pr+®caution :\n\nOuvrir et v+®rifier un +®chantillon al+®atoire de bo+«tes pour s'assurer que le contenu correspond bien +á la quantit+® indiqu+®e sur l'+®tiquette.\n\nNe jamais compter les bo+«tes sans v+®rification d'un +®chantillon.\n\nComptage par conditionnements intacts\n"
      },
      {
        "id": "gas-m5-c21",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nM+®thodes de comptage\n\nCertains produits (poudres, coton, certains consommables) peuvent +¬tre pes+®s et convertis en unit+®s sur la base d'un poids unitaire +®tabli.\n\nComptage par pes+®e (pour les produits en vrac)\n\nPour les produits pharmaceutiques, il est indispensable de comptabiliser s+®par+®ment chaque lot avec sa date de p+®remption. Cela permet de d+®tecter les produits proches de p+®remption et d'appliquer le FEFO lors de la distribution.\n\nComptage par lot et par date de p+®remption\n"
      },
      {
        "id": "gas-m5-c22",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nLa r+®conciliation des stocks\n\nFormule : +ëcart = Stock physique ÔêÆ Stock th+®orique\n\nClassification des +®carts\n\nCalcul des +®carts\n"
      },
      {
        "id": "gas-m5-c23",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nLa r+®conciliation des stocks\n\nInvestigation des +®carts\n\n+ëtape 1 ÔÇö V+®rifier le comptage : Avant de conclure +á un +®cart r+®el, s'assurer que le comptage a +®t+® correctement effectu+®. Un recomptage s'impose pour tout +®cart significatif.\n\n+ëtape 2 ÔÇö V+®rifier les documents de la p+®riode : Examiner tous les bons de sortie, bons de r+®ception, bons de transfert et documents de perte de la p+®riode couverte par l'inventaire.\n\n+ëtape 3 ÔÇö Identifier les mouvements non document+®s : Interroger le personnel sur les mouvements de produits qui pourraient ne pas avoir +®t+® enregistr+®s.\n\n+ëtape 4 ÔÇö Analyser l'+®cart r+®siduel inexpliqu+®\n\n+ëtape 5 ÔÇö Mesures correctives : Sur la base de l'investigation, des mesures correctives sont d+®finies et document+®es.\n\nCalcul des +®carts\n"
      },
      {
        "id": "gas-m5-c24",
        "title": "Proc+®dures de comptage et de r+®conciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Proc+®dures de comptage et de r+®conciliation\n\nLa r+®conciliation des stocks\n\nUne fois l'investigation termin+®e, les fiches de stock et le registre sont mis +á jour avec le stock physique r+®el issu du comptage.\n\nProc+®dure de correction :\n\nNe jamais rayer ou effacer l'ancienne valeur dans le registre.\n\nTirer un trait sur l'ancienne valeur et +®crire la nouvelle +á c+¦t+®, avec la date et la signature du gestionnaire.\n\nCr+®er une ligne de r+®gularisation dans la fiche de stock\n\nCorrection des donn+®es et mise +á jour des fiches de stock\n\nLe rapport d'inventaire est le document officiel qui synth+®tise les r+®sultats du comptage et de la r+®conciliation. Il est conserv+® dans les archives de la structure et transmis +á la hi+®rarchie.\n\nLe rapport d'inventaire\n"
      },
      {
        "id": "gas-m5-c25",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nLa gestion manuelle des stocks sur registres papier a longtemps +®t+® la norme dans les syst+¿mes pharmaceutiques des pays +á ressources limit+®es. Elle reste valide et peut +¬tre tr+¿s efficace si elle est rigoureusement appliqu+®e.\n\nMais elle a des limites structurelles :\n\nelle est lente,\n\nexpos+®e aux erreurs humaines,\n\ndifficile +á consolider entre plusieurs sites et\n\nincapable de g+®n+®rer automatiquement des alertes ou des rapports.\n\nLes outils digitaux ne remplacent pas les bonnes pratiques de gestion. Ils les amplifient, les acc+®l+¿rent et les rendent plus fiables.\n\nUn gestionnaire qui g+¿re mal son stock sur papier ne g+¿rera pas mieux avec un logiciel. Mais un gestionnaire qui ma+«trise les principes fondamentaux vus dans les modules pr+®c+®dents verra sa productivit+® et la fiabilit+® de ses donn+®es consid+®rablement am+®lior+®es par les outils digitaux adapt+®s +á son contexte.\n"
      },
      {
        "id": "gas-m5-c26",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCat+®gorie 1 ÔÇö Les tableurs (Excel, Google Sheets, LibreOffice Calc)\n\nDescription :\n\nLes tableurs sont le premier niveau d'outil digital. Ils ne sont pas des logiciels de gestion de stocks au sens strict, mais ils permettent d'automatiser les calculs, de structurer les donn+®es et de g+®n+®rer des tableaux de bord simples.\n\nIls sont disponibles sur presque tous les ordinateurs, ne n+®cessitent pas de connexion internet (pour Excel et LibreOffice), et sont ma+«tris+®s par la plupart des gestionnaires ayant une formation de base en informatique.\n\nCe qu'un tableur bien con+ºu permet de faire :\n\nCalculer automatiquement la CMM, le stock min, le stock max et la quantit+® +á commander\n\nG+®n+®rer des alertes visuelles (code couleur) quand un stock passe sous le stock min\n\nCalculer le TPI apr+¿s inventaire\n\nProduire des graphiques d'+®volution du stock dans le temps\n\nConsolider les donn+®es de plusieurs produits en un seul tableau de bord\n"
      },
      {
        "id": "gas-m5-c27",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCat+®gorie 1 ÔÇö Les tableurs (Excel, Google Sheets, LibreOffice Calc)\n\nLimites des tableurs :\n\nUn fichier par structure (pas de consolidation automatique entre sites)\n\nPas d'alertes automatiques envoy+®es par email ou SMS\n\nRisque d'erreur si les formules sont accidentellement modifi+®es\n\nPas de tra+ºabilit+® des modifications (qui a chang+® quoi et quand)Pas de gestion multi-utilisateurs simultan+®e\n"
      },
      {
        "id": "gas-m5-c28",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCat+®gorie 2 ÔÇö Les logiciels de gestion de stocks pharmaceutiques\n\nDescription : Ce sont des applications sp+®cialement con+ºues pour la gestion des stocks pharmaceutiques. Elles int+¿grent nativement les concepts de CMM, min/max, point de commande, FEFO, gestion par lot, alertes automatiques et rapports standardis+®s.\n\nLes principaux logiciels utilis+®s en Afrique subsaharienne : OpenLMIS (Open Logistics Management Information System)\n\nCaract+®ristiques :\n\nLogiciel open source (gratuit) d+®velopp+® sp+®cifiquement pour les pays +á ressources limit+®es\n\nGestion multi-niveaux (centre de sant+® ÔåÆ district ÔåÆ r+®gion ÔåÆ niveau central)\n\nAlertes automatiques de rupture et de surstock\n\nRapports standardis+®s conformes aux exigences des minist+¿res de la sant+® et des bailleurs\n\nFonctionne sur navigateur web, accessible depuis tout ordinateur avec connexion internet\n\nUtilis+® dans de nombreux pays africains (Zambie, Mozambique, Tanzanie, B+®nin...)\n"
      },
      {
        "id": "gas-m5-c29",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCat+®gorie 2 ÔÇö Les logiciels de gestion de stocks pharmaceutiques\n\nFonctionnalit+®s cl+®s :\n\nSuivi des stocks en temps r+®el pour tous les produits et tous les niveaux\n\nG+®n+®ration automatique des quantit+®s +á commander\n\nTableaux de bord avec indicateurs (taux de disponibilit+®, taux de rupture, taux de couverture)Gestion des commandes de la quantification +á la r+®ception\n\nRapports exportables en Excel ou PDF\n"
      },
      {
        "id": "gas-m5-c30",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCat+®gorie 3 ÔÇö Les applications mobiles\n\nDescription : Les applications mobiles permettent de g+®rer les stocks directement depuis un smartphone ou une tablette. Elles sont particuli+¿rement adapt+®es aux structures +®loign+®es o+¦ l'acc+¿s +á un ordinateur est limit+®, et aux agents de terrain qui collectent des donn+®es lors de visites de supervision.\n\nLes principales applications mobiles utilis+®es :\n\nmSupply Mobile\n\nStockOut Notifier\n\nCommCare\n\nDHIS2 (District Health Information System version 2)\n\nÔÇª\n"
      },
      {
        "id": "gas-m5-c31",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCat+®gorie 4 ÔÇö Les syst+¿mes de codes-barres et RFID\n\nDescription : Ces technologies permettent d'automatiser la saisie des donn+®es de stock en scannant des codes-barres ou des puces RFID (Radio Frequency Identification) plut+¦t qu'en tapant manuellement. Elles r+®duisent consid+®rablement les erreurs de saisie et acc+®l+¿rent les op+®rations de r+®ception et d'inventaire.\n\nCode-barres :\n\nChaque produit pharmaceutique est identifi+® par un code-barres (EAN-13 ou DataMatrix) qui encode le num+®ro de lot, la date de p+®remption et la quantit+®.\n\nUn scanner (pistolet de scan ou application de scan sur smartphone) lit ce code et enregistre automatiquement les informations dans le logiciel.\n"
      },
      {
        "id": "gas-m5-c32",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nCrit+¿res de choix d'un outil digital\n"
      },
      {
        "id": "gas-m5-c33",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nConditions de succ+¿s de la digitalisation\n\nCondition 1 ÔÇö La formation du personnel\n\nPrincipe : Un outil non ma+«tris+® est un outil abandonn+®. La formation doit +¬tre pratique, progressive et r+®p+®t+®e.\n\nCondition 2 ÔÇö La qualit+® des donn+®es saisies\n\nPrincipe GIGO (Garbage In, Garbage Out) : Un logiciel ne peut produire des rapports fiables que si les donn+®es saisies sont correctes. Un logiciel avec de mauvaises donn+®es produit de mauvais rapports plus vite qu'un registre papier, mais les mauvais rapports restent des mauvais rapports.\n\nCondition 3 ÔÇö La maintenance et le support technique\n\nPrincipe : Un syst+¿me informatique tombe en panne. La question n'est pas de savoir si +ºa arrivera, mais quand. Sans plan de maintenance et de support, une panne peut mettre le syst+¿me hors service pendant des semaines.\n"
      },
      {
        "id": "gas-m5-c34",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nConditions de succ+¿s de la digitalisation\n\nCondition 4 ÔÇö La proc+®dure de continuit+® en mode d+®grad+®\n\nQuand le syst+¿me digital est en panne (+®lectricit+®, internet, ordinateur), la gestion ne doit pas s'arr+¬ter. Une proc+®dure de continuit+® en mode d+®grad+® (retour temporaire au papier) doit +¬tre document+®e et connue du personnel.\n\nProc+®dure de continuit+® :\n\nÔÿÉ En cas de panne, imprimer les derni+¿res fiches de stock disponibles (avant la panne) et les utiliser comme base de travail manuel\n\nÔÿÉ Enregistrer tous les mouvements sur des fiches de stock papier pr+®-imprim+®es (toujours disponibles en r+®serve)\n\nÔÿÉ Conserver tous les bons de sortie et de r+®ception papier pendant la panne\n\nÔÿÉ D+¿s le retour du syst+¿me, saisir tous les mouvements enregistr+®s sur papier dans le logiciel\n\nÔÿÉ V+®rifier la coh+®rence du stock th+®orique apr+¿s la reprise de saisie\n"
      },
      {
        "id": "gas-m5-c35",
        "title": "Question?",
        "type": "text",
        "duration": "10 min",
        "content": "#### Question?\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      }
    ]
  }
];
