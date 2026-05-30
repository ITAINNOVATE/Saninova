// Fichier généré automatiquement avec le contenu propre du PPTX
export const gestionApprovisionnementsCourse: any[] = [
  {
    "id": "gas-m1",
    "title": "Module 1 : Introduction",
    "chapters": [
      {
        "id": "gas-m1-c1",
        "title": "ACADEMIE SUPPLY CHAIN SANTE",
        "type": "text",
        "duration": "10 min",
        "content": "#### ACADEMIE SUPPLY CHAIN SANTE\n"
      },
      {
        "id": "gas-m1-c2",
        "title": "Chapitres",
        "type": "text",
        "duration": "10 min",
        "content": "#### Chapitres\n\nPrincipes fondamentaux de la gestion des stocks\n\nMéthodes de calcul des niveaux de stock\n\nProcessus de commande et suivi fournisseurs\n\nGestion des ruptures et des surstocks\n\nSystèmes d'inventaire et outils digitaux\n"
      }
    ]
  },
  {
    "id": "gas-m2",
    "title": "Module 2 : Principes fondamentaux de la gestion des stocks",
    "chapters": [
      {
        "id": "gas-m2-c1",
        "title": "Principes fondamentaux de la gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Principes fondamentaux de la gestion des stocks\n\n![Entrepôt de pharmacie moderne](/images/course/stock.png)\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m2-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nDéfinitions et concepts clés\n\nTypes de stocks et leur rôle dans la chaîne pharmaceutique\n\nIndicateurs clés de performance\n\nIntroduction aux bonnes pratiques de gestion des stocks\n"
      }
    ]
  },
  {
    "id": "gas-m3",
    "title": "Module 3 : Définitions et concepts clés",
    "chapters": [
      {
        "id": "gas-m3-c1",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nEnsemble des produits (médicaments, consommables, réactifs) détenus par une structure sanitaire à un moment donné, en attente d'être utilisés ou distribués.\n\nUne pharmacie hospitalière fait le contrôle un lundi matin et compte au total :\n\nAmoxicilline 500mg : 2 400 comprimés\n\nParacétamol 500mg : 5 800 comprimés\n\nSérum physiologique 500ml : 320 poches\n\nGants d'examen (boîtes) : 45 boîtes\n\nC'est le stock de cette pharmacie à ce moment précis.\n\nIl sera différent le lendemain selon les sorties et les réceptions.\n\nLe Stock\n"
      },
      {
        "id": "gas-m3-c2",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nQuantité minimale de produits conservée en réserve pour faire face aux imprévus (retards de livraison, hausse soudaine de la demande, ou rupture chez le fournisseur).\n\nFormule : SS = CMM × Nombre de mois tampon\n\nStock de sécurité (SS)\n\nLa pharmacie consomme en moyenne 200 comprimés d'Amoxicilline par mois (CMM = 200).\n\nElle choisit un tampon de 1,5 mois pour se protéger des aléas.\n\nSS = 200 × 1,5 = 300 comprimés\n\nCes 300 comprimés ne doivent jamais être touchés en dehors d'une urgence.\n\nSi le stock descend à ce niveau, la commande aurait déjà dû être passée.\n"
      },
      {
        "id": "gas-m3-c3",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nNiveau de stock qui déclenche automatiquement une commande. Quand le stock descend à ce niveau, il est temps de commander.\n\nFormule :Stock min = CMM × Délai de livraison + Stock de sécurité\n\nStock minimum\n\nLe délai de livraison de son fournisseur est de 2 mois.\n\nSon stock de sécurité est de 300 comprimés.\n\nStock min = 200 × 2 + 300 = 700 comprimés\n\nDès que le stock d'Amoxicilline passe en dessous de 700 comprimés, la pharmacie doit immédiatement passer commande. Si elle attend plus longtemps, elle risque de tomber dans son stock de sécurité, voire en rupture.\n"
      },
      {
        "id": "gas-m3-c4",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nNiveau de stock au-delà duquel il ne faut pas aller, pour éviter les surstocks, les péremptions et le gaspillage d'espace.\n\nFormule : Stock max = Stock min + Quantité économique de commande\n\nStock maximum\n\nLa pharmacie commande en général 3 mois de consommation\n\nQuantité économique de commande = 200 × 3 = 600 comprimés\n\nSon stock min est de 700\n\nStock max = 700 + 600 = 1 300 comprimés\n\nLa pharmacie ne devrait jamais dépasser 1 300 comprimés d'Amoxicilline en stock.\n\nAu-delà, elle immobilise des fonds inutilement et risque des péremptions.\n"
      },
      {
        "id": "gas-m3-c5",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nQuantité réellement utilisable à un instant T, c'est-à-dire le stock physique déduction faite des produits réservés, périmés ou endommagés.\n\nStock disponible = Stock physique − Produits non utilisables\n\nStock disponible\n\nLa pharmacie a physiquement 950 comprimés d'Amoxicilline.\n\nMais en faisant le contrôle qualité, elle constate que : 80 comprimés sont périmés, 50 comprimés ont un conditionnement endommagé (non distribuables)\n\nStock disponible = 950 − 80 − 50 = 820 comprimés\n\nLa pharmacie ne peut compter que sur 820 comprimés, et non 950. C'est ce chiffre qui doit figurer dans le système de gestion. Avec un stock min à 700, elle est encore au-dessus du seuil, mais la marge est faible.\n"
      },
      {
        "id": "gas-m3-c6",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nEncore appelé seuil de réapprovisionnement : Niveau de stock auquel il faut passer commande pour recevoir la livraison avant d'atteindre le stock de sécurité.\n\nC'est souvent confondu avec le stock min, mais il peut en différer selon le délai de livraison variable.\n\nPoint de commande\n\nLa pharmacie consomme 200 comprimés/mois d'Amoxicilline. Son délai de livraison habituel est de 2 mois, mais il peut varier. Son stock de sécurité est de 300.\n\nPoint de commande = 200 × 2 + 300 = 700 comprimés\n\nSupposons que le délai de livraison soit incertain et fluctue entre 1,5 et 2,5 mois.\n\nLa pharmacie choisit prudemment de travailler avec le délai maximum (2,5 mois)\n\nPoint de commande = 200 × 2,5 + 300 = 800 comprimés\n\nLa pharmacie commande plus tôt pour se couvrir contre les retards variables de son fournisseur.\n"
      },
      {
        "id": "gas-m3-c7",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nTemps écoulé entre le moment où la commande est passée et le moment où les produits sont effectivement disponibles en stock. Il inclut le temps de traitement, d'expédition et de réception.\n\nDélai de livraison\n\nLa pharmacie passe une commande de Paracétamol le 1er mars.\n\nLes produits arrivent le 28 mars.\n\nLe délai de livraison est de 27 jours, soit environ 1 mois.\n\nLa pharmacie doit intégrer ce délai dans tous ses calculs de stock.\n\nSi elle attend d'être à zéro pour commander, elle sera en rupture pendant près d'un mois.\n"
      },
      {
        "id": "gas-m3-c8",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nQuantité moyenne de produits consommés par mois sur une période de référence. C'est la base de tous les calculs de stock.\n\nCMM = Total consommé sur la période ÷ Nombre de mois de la période\n\nConsommation Moyenne Mensuelle\n\nLa pharmacie relève les sorties de Paracétamol sur 6 mois : 6 800 comprimés\n\nCalcul brut : CMM = 6 800 ÷ 6 = 1 133 comprimés/mois\n\nMais avril a été marqué par une rupture partielle. On exclut ce mois et on recalcule sur 5 mois :\n\nCMM ajustée = (6 800 − 800) ÷ 5 = 1 200 comprimés/mois\n\nUtiliser la CMM brute aurait conduit à sous-commander et à reproduire la rupture.\n"
      },
      {
        "id": "gas-m3-c9",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nIndicateur qui mesure la vitesse à laquelle le stock est renouvelé sur une période donnée. Un taux élevé indique une bonne gestion ; un taux faible signale un surstock potentiel.\n\nTaux de rotation = Quantité consommée ÷ Stock moyen\n\nTaux de rotation des stocks\n\nSur les 6 derniers mois, la pharmacie a consommé 7 200 comprimés de Sérum de Réhydratation Orale (SRO). Son stock moyen sur la période était de 1 800 comprimés.\n\nTaux de rotation = 7 200 ÷ 1 800 = 4 fois en 6 mois\n\nCela signifie que le stock se renouvelle entièrement toutes les 6 semaines environ.\n\nLe SRO tourne bien (demande forte, gestion saine).\n\nUn taux de rotation inférieur à 1 sur 6 mois est un signal d'alerte.\n"
      },
      {
        "id": "gas-m3-c10",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\n![Rupture de stock](/images/course/rupture.png)\n\nSituation où un produit est épuisé (stock = 0 ) et ne peut plus répondre à la demande.\n\nC'est l'un des risques les plus graves.\n\nRupture de stock\n\nLa pharmacie a 150 comprimés de Métronidazole en stock. Sa CMM est de 300 comprimés et son délai de livraison est de 2 mois.\n\nElle n'a pas encore commandé.\n\nLa pharmacie est déjà en situation de rupture imminente.\n\nDéficit = 600 − 150 = 450 comprimés\n\nElle doit déclencher une commande d'urgence immédiatement.\n"
      },
      {
        "id": "gas-m3-c11",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nSituation où le stock dépasse le niveau maximum défini.\n\nCela immobilise des fonds, occupe de l'espace et expose les produits au risque de péremption.\n\nSurstock ou surstockage\n\nLa pharmacie reçoit une livraison de 3 000 comprimés de Cotrimoxazole (200 déjà en stock).\n\nSa CMM est de 400 comprimés et son stock max est de 1 600 comprimés (soit 4 mois).\n\nDurée de couverture = 3 200 ÷ 400 = 8 mois de stock\n\nSi la date de péremption de ce lot est dans 10 mois, elle dispose d'une marge.\n\nMais si elle est dans 6 mois, elle risque de perdre 800 comprimés périmés.\n\nC'est une immobilisation ou perte financière évitable.\n"
      },
      {
        "id": "gas-m3-c12",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nDate limite au-delà de laquelle un produit ne doit plus être utilisé car son efficacité ou son innocuité ne peut plus être garantie.\n\nLa gestion des péremptions est une priorité absolue.\n\nPéremption (Date de péremption)\n\nLa pharmacie reçoit deux lots d'Amoxicilline :\n\nLot A : 500 comprimés — périme le 31 mars 2026\n\nLot B : 800 comprimés — périme le 30 septembre 2026\n\nSa CMM est de 200 comprimés/mois. Nous sommes en janvier 2026.\n\n100 comprimés seront perdus si aucune mesure n'est prise.\n\nIl ne faut jamais recevoir des produits dont la durée de vie résiduelle est inférieure à la durée de couverture du stock.\n"
      },
      {
        "id": "gas-m3-c13",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\n![Règle FEFO FIFO](/images/course/fefo.png)\n\nPrincipe de gestion selon lequel les produits dont la date de péremption est la plus proche doivent être distribués en premier, indépendamment de la date d'entrée en stock.\n\nC'est une règle d'or en pharmacie.\n\nFEFO (First Expired, First Out)\n\nLa pharmacie a en rayon deux lots de vaccins anti-tétaniques :\n\nLot X : 50 doses — périme le 15 février 2026 (arrivé en décembre)\n\nLot Y : 80 doses — périme le 30 juin 2026 (arrivé en janvier)\n\nUn agent de santé vient récupérer 20 doses.\n\nBonne pratique (FEFO) → il prend dans le Lot X, car il périme en premier (15 février), qu'importe l'ordre d'arrivée.\n"
      },
      {
        "id": "gas-m3-c14",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\nPrincipe selon lequel les produits entrés en premier en stock doivent sortir en premier.\n\nUtilisé quand les dates de péremption sont identiques.\n\nFIFO (First In, First Out)\n\nLa pharmacie reçoit deux livraisons de Paracétamol ayant la même date de péremption :\n\nLivraison du 5 janvier : 200 boîtes (rangées au fond)\n\nLivraison du 20 janvier : 150 boîtes (rangées devant)\n\nUn infirmier vient prendre des boîtes : il doit prendre celles du 5 janvier, qui sont entrées en premier, même si elles sont au fond.\n\nAvec des dates de péremption identiques, FIFO et FEFO donnent le même résultat.\n\nMais l'organisation physique du stock doit faciliter ce geste : rangement par rotation.\n"
      },
      {
        "id": "gas-m3-c15",
        "title": "Définitions et concepts clés",
        "type": "text",
        "duration": "10 min",
        "content": "#### Définitions et concepts clés\n\n![Inventaire en pharmacie](/images/course/inventaire.png)\n\nOpération de comptage physique de tous les produits en stock à un moment donné, permettant de vérifier la concordance entre le stock réel et le stock théorique enregistré dans le système.\n\nInventaire\n\nLa pharmacie utilise un registre manuel. Selon ce registre, le stock théorique de Paracétamol est de 4 200 comprimés. Le jour de l'inventaire, le comptage physique donne 3 850 comprimés.\n\nÉcart = 3 850 − 4 200 = −350 comprimés\n\nTaux de précision de l'inventaire = (3 850 ÷ 4 200) × 100 = 91,7 %\n\nInvestiguer sur les causes des écarts.\n\nTaux de précision acceptable : Supérieur ou égal à 95%\n"
      }
    ]
  },
  {
    "id": "gas-m4",
    "title": "Module 4 : Types de stocks et leur rôle dans la chaîne pharmaceutique",
    "chapters": [
      {
        "id": "gas-m4-c1",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDans une chaîne pharmaceutique, les produits ne sont pas tous stockés pour la même raison.\n\nChaque type de stock répond à une logique précise.\n\nLes connaître permet :\n\nde mieux dimensionner les quantités,\n\nd'éviter les gaspillages et\n\nd'assurer la continuité des soins.\n"
      },
      {
        "id": "gas-m4-c2",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDéfinition\n\nRôle\n\nIllustration\n\nStock de cycle\n\nC'est la quantité de produits consommée entre deux commandes successives.\n\nIl représente le stock \"normal\" qui entre et sort régulièrement.\n\nOn parle aussi de stock d’activité ou de stock de roulement\n\nCouvrir la demande courante entre deux livraisons.\n\nUne pharmacie commande du Paracétamol toutes les 2 mois. CMM =1 200 comprimés.\n\nStock de cycle = 1 200 × 2 = 2 400 comprimés\n\nÀ la réception d'une livraison, le stock remonte de 2 400. Il descend progressivement jusqu'à la prochaine commande.\n\nC'est ce mouvement de \"montée-descente\" qui caractérise le stock de cycle.\n"
      },
      {
        "id": "gas-m4-c3",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDéfinition\n\nRôle\n\nIllustration\n\nStock de sécurité\n\nQuantité réservée pour faire face aux aléas : retard fournisseur, hausse imprévue de la demande, erreur de commande.\n\nIl ne doit être utilisé qu'en dernier recours.\n\nProtéger la continuité des soins contre les imprévus.\n\nLa même pharmacie a un délai de livraison qui peut varier de 1 à 3 mois au lieu des 2 mois habituels. Elle choisit de couvrir 1 mois d'incertitude :\n\nStock de sécurité = 1 200 × 1 = 1 200 comprimés\n\nCes 1 200 comprimés ne bougent pas en temps normal. Si la livraison attendue en février n'arrive qu'en mars, c'est ce stock qui permet d'éviter la rupture.\n"
      },
      {
        "id": "gas-m4-c4",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDéfinition\n\nRôle\n\nIllustration\n\nStock en transit\n\nProduits qui ont quitté le fournisseur ou le niveau supérieur de la chaîne mais qui ne sont pas encore arrivés à destination.\n\nIls existent physiquement mais ne sont pas encore disponibles à l’entrepôt.\n\nReprésente les ressources \"en route\" à prendre en compte dans la planification pour ne pas passer de commandes redondantes.\n\nLa Direction Régionale de la Santé a commandé 5 000 boîtes de Cotrimoxazole à la centrale d'achat nationale. La commande a été expédiée il y a 10 jours, le délai total est de 30 jours. Ces 5 000 boîtes constituent son stock en transit.\n\nStock effectif = Stock physique + Stock en transit − Commandes en attente\n"
      },
      {
        "id": "gas-m4-c5",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDéfinition\n\nRôle\n\nIllustration\n\nStock spéculatif\n\nStock constitué volontairement en quantité supérieure à la normale, en anticipation d'une hausse des prix, d'une pénurie annoncée ou d'une rupture prévisible chez le fournisseur.\n\nProtéger la structure contre des risques externes connus à l'avance.\n\nUn gestionnaire apprend que le seul fabricant mondial d’AL va suspendre sa production pendant 3 mois pour maintenance. CMM = 800 boîtes.\n\nStock spéculatif = 800 × 3 = 2 400 boîtes supplémentaires\n\nAttention : \t- Ce type de stock doit rester exceptionnel et justifié.\n\n- Mal géré, il génère des surstocks coûteux."
      },
      {
        "id": "gas-m4-c6",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDéfinition\n\nRôle\n\nIllustration\n\nStock mort (ou stock dormant)\n\nProduits qui ne bougent plus depuis une longue période, généralement parce qu'ils ne sont plus demandés, ont été remplacés par un autre produit, ou sont proches de la péremption.\n\nIl n'a aucun rôle utile — c'est précisément le problème.\n\nIl immobilise de l'argent, de l'espace et du personnel.\n\nUne pharmacie détient 3 000 comprimés de Chloroquine.\n\nDepuis l'abandon de ce médicament comme traitement de première ligne du paludisme dans le pays, la consommation est tombée à 0 comprimé par mois depuis 8 mois.\n\nIdentifier et traiter le stock mort est une priorité de bonne gestion.\n"
      },
      {
        "id": "gas-m4-c7",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nDéfinition\n\nRôle\n\nIllustration\n\nStock de consignation\n\nProduits mis à disposition par un fournisseur dans les locaux, mais qui restent la propriété du fournisseur jusqu'à leur utilisation effective.\n\nL’entrepôt ou l’établissement de santé ne paie que ce qu'elle consomme.\n\nRéduire le besoin en trésorerie tout en garantissant la disponibilité des produits.\n\nUn fournisseur de réactifs de laboratoire dépose 200 tests de dépistage rapide du VIH en consignation. La pharmacie en utilise 45 le premier mois.\n\nMontant facturé = 45 × 3 500 FCFA = 157 500 FCFA\n\nLes 155 tests restants ne sont pas facturés et restent propriété du fournisseur.\n\nEn fin de contrat, ils sont repris ou facturés selon les termes convenus.\n"
      },
      {
        "id": "gas-m4-c8",
        "title": "Types de stocks et leur rôle dans la chaîne pharmaceutique",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types de stocks et leur rôle dans la chaîne pharmaceutique\n\nSynthèse\n"
      }
    ]
  },
  {
    "id": "gas-m5",
    "title": "Module 5 : Indicateurs clés de performance",
    "chapters": [
      {
        "id": "gas-m5-c1",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nUn indicateur clé de performance (KPI) est une mesure chiffrée qui permet d'évaluer objectivement la qualité de la gestion des stocks.\n\nSans KPIs, un gestionnaire travaille à l'aveugle :\n\nil ne sait pas si sa structure performe bien ou mal,\n\nni où concentrer ses efforts d'amélioration.\n\nLes KPIs répondent à des questions simples :\n\nAvons-nous des ruptures ?\n\nStockons-nous trop ?\n\nNos données sont-elles fiables ?\n\nNos produits sont-ils bien gérés ?\n"
      },
      {
        "id": "gas-m5-c2",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nTaux de disponibilité des produits\n\nPourcentage de produits disponibles en stock par rapport à la liste des produits attendus, sur une période donnée.\n\n(Nombre de produits disponibles ÷ Nombre total de produits de la liste) × 100\n\n≥ 95 % : Bonne performance\n\n80 % à 94 % : Performance acceptable, des améliorations sont nécessaires\n\n< 80 % : Performance insuffisante, situation critique\n"
      },
      {
        "id": "gas-m5-c3",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nTaux de rupture de stock\n\nProportion de jours dans le mois (ou dans l'année) pendant lesquels un produit était indisponible, alors qu'il aurait dû l'être.\n\n(Nombre de jours en rupture ÷ Nombre de jours de la période) × 100\n\n0 % : Aucune rupture, situation idéale\n\n1 % à 9 % : Ruptures occasionnelles, gérables\n\n≥ 10 % : Situation préoccupante nécessitant une intervention\n"
      },
      {
        "id": "gas-m5-c4",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nTaux de surstockage\n\nProportion de produits dont le stock dépasse le niveau maximum défini, sur la liste totale des produits gérés.\n\n(Nombre de produits en surstock ÷ Nombre total de produits gérés) × 100\n\n0 % : Aucun surstockage, situation idéale\n\n≥ 1 % : Finances immobilisés inutilement.\n"
      },
      {
        "id": "gas-m5-c5",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nTaux de péremption\n\nProportion de la valeur des produits périmés par rapport à la valeur totale des produits reçus sur une période.\n\n(Valeur des produits périmés ÷ Valeur totale des produits reçus) × 100\n\n< 1 % : Excellente gestion des péremptions\n\n1 % à 2 % : Acceptable\n\n≥ 3 % : Problème sérieux de gestion (surstocks, FEFO non respecté, mauvaise prévision)\n"
      },
      {
        "id": "gas-m5-c6",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nMois de stock disponible\n\nNombre de mois pendant lesquels le stock actuel peut couvrir la demande, sans nouvelle livraison.\n\nStock disponible ÷ CMM\n\n< Min : Sous stockage\n\nMin < MSD < Max : Stockage conforme au plan\n\n< Max : Surstockage\n"
      },
      {
        "id": "gas-m5-c7",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nTaux de satisfaction des besoins\n\nMesure la capacité à livrer les besoins exprimés, dans les délais convenus.\n\n(Quantité livrée dans les délais ÷ Quantité demandée) × 100\n\n(Nombre de désignation satisfaite ÷ Nombre de désignation demandée) × 100\n\n≥ 95 % : Satisfaction fiable\n\n80 % à 94 % : Performance moyenne, à améliorer\n\n< 80 % : Satisfaction peu fiable, prendre immédiatement des mesures correctrices\n"
      },
      {
        "id": "gas-m5-c8",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nValeur du stock immobilisé\n\nMontant financier total des produits en surstock ou en stock mort, non utiles à la demande courante.\n\nQuantité en excédent × Prix unitaire\n\nPar produit, puis total\n\n< 5 % de la valeur totale du stock : Acceptable\n\n5–10 % de la valeur totale du stock : À surveiller\n\n> 10 % de la valeur totale du stock : Perte financière significative, Correction urgente\n"
      },
      {
        "id": "gas-m5-c9",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nTaux de rotation des stocks\n\nVitesse à laquelle le stock est entièrement renouvelé sur une période donnée\n\nQuantité consommée sur la période ÷ Stock moyen de la période\n\n4–6 rotations/an : Gestion saine\n\n2–3 rotations/an : Stock lent, surveiller\n\n< 2 rotations/an : Stock dormant, action requise\n"
      },
      {
        "id": "gas-m5-c10",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nDéfinition\n\nFormule\n\nInterprétation\n\nDélai moyen de livraison\n\nTemps moyen écoulé entre la date de commande et la date de livraison effective des produits\n\nSomme des délais observés ÷ Nombre de commandes sur la période\n\nConforme au contrat : Fournisseur ponctuel\n\nDépassement < 20 % : Tolérable\n\nDépassement > 20 % : Revoir le plan de distribution ou les méécanismes de livraison\n"
      },
      {
        "id": "gas-m5-c11",
        "title": "Indicateurs clés de performance",
        "type": "text",
        "duration": "10 min",
        "content": "#### Indicateurs clés de performance\n\nSynthèse\n\nCes indicateurs se lisent ensemble, pas isolément.\n\nUn taux de disponibilité faible combiné à un taux de couverture élevé indique par exemple que les mauvais produits sont stockés en excès pendant que les produits essentiels manquent.\n\nC'est souvent plus révélateur que chaque chiffre pris séparément.\n\nLa fréquence de mesure recommandée est :\n\nMensuelle pour les indicateurs opérationnels (disponibilité, rupture, couverture) et\n\nTrimestrielle ou annuelle pour les indicateurs stratégiques (péremption, valeur immobilisée, satisfaction).\n"
      }
    ]
  },
  {
    "id": "gas-m6",
    "title": "Module 6 : Introduction aux bonnes pratiques de gestion des stocks",
    "chapters": [
      {
        "id": "gas-m6-c1",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nLes bonnes pratiques de gestion des stocks ne sont pas des règles abstraites.\n\nCe sont des habitudes concrètes, appliquées au quotidien, qui font la différence entre une entrepôt qui fonctionne bien et un qui accumule les ruptures, les péremptions et les pertes financières.\n\nElles couvrent quatre grands domaines :\n\nl'organisation physique du stock,\n\nla gestion des documents et des données,\n\nles procédures de commande et de réception et\n\nle suivi régulier des indicateurs.\n"
      },
      {
        "id": "gas-m6-c2",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nBonnes pratiques\n\nOrganiser correctement l'espace de stockage\n\nUn stock bien organisé physiquement est la première condition d'une bonne gestion.\n\nSi on ne retrouve pas facilement un produit, on ne peut pas le gérer efficacement.\n\nSéparer les zones fonctionnelles\n\nRespecter les conditions de conservation\n\nTempérature ambiante (< 25°C à 30°C selon le produit) : Comprimés, gélules\n\nChaîne du froid (+2°C à +8°C) : Vaccins, insuline, certains réactifs\n\nÀ l'abri de la lumière : Métronidazole injectable, certains sirops\n\nÀ l'abri de l'humidité (Hygrométrie < 60 %) : Poudres, comprimés effervescents\n\nRanger les produits de façon logique\n\nAssurer l'accessibilité pour la rotation FEFO.\n"
      },
      {
        "id": "gas-m6-c3",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nDocuments\n\nTenir des documents de stock rigoureux et à jour\n\nOn ne gère bien que ce que l'on mesure. Sans documentation fiable, toutes les décisions de commande et de distribution reposent sur des estimations, et les erreurs s'accumulent.\n\nLa fiche de stock : chaque mouvement (entrée ou sortie) doit être enregistré le jour même, avec la référence du document justificatif. Pas d’enregistrement différé.\n\nLe registre des commandes : Trace toutes les commandes : date, fournisseur, produits commandés, quantités, date de livraison attendue, date de réception effective, écarts.\n\nLe registre des périmés et des destructions : Tout produit retiré du stock pour péremption ou détérioration doit être enregistré, avec la quantité, la valeur, la raison et la signature du responsable. Cela permet le suivi du taux de péremption et protège le gestionnaire en cas de contrôle.\n"
      },
      {
        "id": "gas-m6-c4",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nEn Pratique\n\nAppliquer rigoureusement les règles FEFO et FIFO\n\nCes deux règles simples, appliquées systématiquement, permettent d'éliminer presque entièrement les périmés évitables.\n\nÀ chaque réception de produits, vérifier les dates de péremption des nouveaux lots et les comparer à ceux déjà en stock.\n\nPlacer les lots à péremption plus proche devant ou en haut.\n\nColler une étiquette visible avec la date de péremption sur chaque lot si l'emballage ne la mentionne pas clairement.\n"
      },
      {
        "id": "gas-m6-c5",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nEtapes\n\nContrôler rigoureusement chaque réception\n\nTout ce qui entre dans le stock doit être vérifié avant d'être rangé. Accepter un produit sans contrôle, c'est potentiellement introduire un problème dans le stock.\n\nÉtape 1 — Vérification documentaire\n\nÉtape 2 — Vérification quantitative\n\nÉtape 3 — Vérification qualitative\n\nÉtape 4 — Enregistrement immédiat\n"
      },
      {
        "id": "gas-m6-c6",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nBonnes pratiques\n\nGérer les commandes de façon proactive\n\nUne bonne gestion des commandes anticipe les besoins, elle ne réagit pas à la rupture. Commander dans l'urgence coûte plus cher, prend plus de temps et expose davantage aux ruptures.\n\nDéfinir un calendrier fixe de commande (mensuel, bimestriel) et s'y tenir. Les commandes régulières permettent aux fournisseurs de planifier et d'améliorer leur taux de service.\n\nToujours calculer les quantités à commander sur la base de la CMM et des niveaux min/max, et non sur une estimation à vue d'œil.\n\nTenir à jour la liste des fournisseurs alternatifs pour chaque produit critique. En cas de défaillance du fournisseur principal, le temps de trouver une alternative en urgence aggrave toujours la rupture.\n"
      },
      {
        "id": "gas-m6-c7",
        "title": "Introduction aux bonnes pratiques de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Introduction aux bonnes pratiques de gestion des stocks\n\nPrincipe\n\nFréquences\n\nRéaliser des inventaires réguliers\n\nL'inventaire est le seul moyen de vérifier que les données dans le système correspondent à la réalité physique. Sans inventaire régulier, les écarts s'accumulent et les décisions deviennent de moins en moins fiables.\n"
      },
      {
        "id": "gas-m6-c8",
        "title": "Méthodes de calcul des niveaux de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Méthodes de calcul des niveaux de stock\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m6-c9",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nCalcul de la consommation moyenne mensuelle (CMM)\n\nMéthode min/max : formules et application\n\nCalcul du point de commande et du délai de livraison\n\nExercices pratiques sur données réelles\n"
      },
      {
        "id": "gas-m6-c10",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLa CMM est le point de départ de tout calcul de stock.\n\nC'est elle qui répond à la question fondamentale : combien de ce produit consomme-t-on en moyenne par mois ?\n\nSans une CMM fiable, tous les autres calculs (stock min, stock max, quantité à commander) seront faux, même si les formules sont correctement appliquées.\n\nUne bonne CMM repose sur des données de consommation :\n\nréelles,\n\ncollectées sur une période suffisamment longue et\n\ncorrectement ajustées.\n"
      },
      {
        "id": "gas-m6-c11",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLa formule de base\n\nQuantité totale consommée sur la période ÷ Nombre de mois de la période\n\nExemple simple :\n\nSur 6 mois, une pharmacie a consommé 7 200 comprimés de Cotrimoxazole.\n\nCMM = 7 200 ÷ 6 = 1 200 comprimés/mois\n\nSimple en apparence, mais cette formule cache plusieurs pièges qu'il faut savoir éviter.\n"
      },
      {
        "id": "gas-m6-c12",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLe problème des mois de rupture\n\nQuand un produit est en rupture de stock, la consommation enregistrée est nulle ou réduite.\n\nSi on intègre ces mois dans le calcul, la CMM sera sous-estimée, ce qui conduira à commander moins que nécessaire et à reproduire la rupture.\n\nCalcul brut (mauvaise pratique) :\n\nCMM = 2 100 ÷ 6 = 350 cp/mois\n\nCalcul ajusté (bonne pratique) :\n\nConsommation extrapolée mars = 120 × (30 ÷ 10) = 360 cp\n\nCMM ajustée = (480 + 510 + 360 + 490 + 500) ÷ 5 = 2 340 ÷ 5 = 468 cp/mois\n\nLa différence est énorme : 350 cp/mois vs 468 cp/mois.\n\nCommander sur la base de 350 conduira inévitablement à une nouvelle rupture.\n\nLa CMM ajustée de 468 reflète la demande réelle.\n"
      },
      {
        "id": "gas-m6-c13",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLe problème des mois atypiques\n\nCertains mois présentent des consommations anormalement élevées dues à des événements exceptionnels : épidémie, campagne de masse, afflux de réfugiés, erreur d'enregistrement.\n\nLes inclure gonflerait artificiellement la CMM et conduirait à des surstocks.\n\nCalcul brut (mauvaise pratique) :\n\nCMM = 3 400 ÷ 6 = 567 cp/mois\n\nCalcul ajusté (bonne pratique) :\n\nExclusion du mois atypique\n\nCMM ajustée = (300 + 320 + 310 + 290 + 330) ÷ 5 = 1 550 ÷ 5 = 310 cp/mois\n\nCommander sur la base de 567 sachets/mois en période normale conduirait à un surstock massif.\n\nLa CMM ajustée de 310 est représentative de la demande courante.\n\nLe mois d'épidémie doit être géré séparément via un stock de contingence.\n"
      },
      {
        "id": "gas-m6-c14",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nLa période de référence optimale\n\nLa longueur de la période utilisée pour calculer la CMM a un impact important sur sa fiabilité.\n\nLe choix se fait selon :\n\nSelon le niveau de la pyramide sanitaire\n\nSelon les cycles de réapprovisionnement\n\nSelon les paramètres min et max\n\nSelon le type de produits et de programme\n"
      },
      {
        "id": "gas-m6-c15",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nCMM basée sur la distribution (DMM) vs CMM basée sur les consommations\n\nDans certains contextes, on distingue deux types de données :\n\nDonnées de distribution : quantités effectivement remises aux structures inférieures. C'est la mesure de la demande satisfaite vers les structures inférieures dispensatrices ou non.\n\nDonnées de consommation: quantités réellement consommées par les patients au niveau des points de dispensation\n\nRecommandation :\n\nUtiliser les données de consommation pour calculer la CMM, car elles reflètent mieux la demande réelle des patients.\n\nLes pertes, ajustements et transferts doivent être enregistrés séparément.\n"
      },
      {
        "id": "gas-m6-c16",
        "title": "Calcul de la consommation moyenne mensuelle (CMM)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul de la consommation moyenne mensuelle (CMM)\n\nRécapitulatif — Étapes de calcul d'une CMM fiable\n"
      },
      {
        "id": "gas-m6-c17",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nLa méthode min/max est la méthode de gestion des stocks la plus utilisée dans les systèmes de santé des pays en développement.\n\nElle est simple, robuste et adaptée aux contextes où les ressources humaines et les outils informatiques sont limités.\n\nSon principe est direct : définir pour chaque produit un niveau minimum en dessous duquel le stock ne doit jamais descendre, et un niveau maximum au-delà duquel il ne doit jamais monter.\n\nEntre ces deux bornes, le stock est considéré comme bien géré.\n"
      },
      {
        "id": "gas-m6-c18",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nLes paramètres de base\n\nAvant de calculer le min et le max, trois paramètres doivent être connus avec précision pour chaque produit :\n\nLa CMM (Consommation Moyenne Mensuelle) : Calculée selon la méthode vue au point précédent. C'est le moteur de tous les calculs.\n\nLe Délai de Livraison (DL) : Temps moyen entre la date de commande et la date de réception effective. Il doit être calculé sur l'historique réel des commandes, pas estimé à vue d'œil.\n\nLa Période de Commande (PC) : Intervalle de temps entre deux commandes successives. Si la pharmacie commande tous les 2 mois, PC = 2 mois.\n"
      },
      {
        "id": "gas-m6-c19",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nCalcul du Stock de Sécurité (SS)\n\nLe stock de sécurité est le socle sur lequel reposent tous les autres calculs. Il représente la protection contre les aléas.\n\nSS = CMM × Nombre de mois de couverture de sécurité\n\nLe nombre de mois de couverture de sécurité est généralement fixé par la politique nationale ou par le niveau hiérarchique supérieur.\n\nEn l'absence de directive, on recommande :\n\n1 mois pour les produits avec un fournisseur fiable et un délai court\n\n2 mois pour les produits critiques ou avec un fournisseur peu fiable\n"
      },
      {
        "id": "gas-m6-c20",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nCalcul du Stock Minimum (Stock min)\n\nLe stock minimum est le niveau qui déclenche la commande.\n\nQuand le stock atteint ce niveau, il faut commander immédiatement.\n\nStock min = (CMM × Délai de livraison) + Stock de sécurité\n"
      },
      {
        "id": "gas-m6-c21",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nCalcul du Stock Maximum (Stock max)\n\nLe stock maximum est le niveau optimal à atteindre après chaque livraison.\n\nIl ne doit pas être dépassé.\n\nStock max = Stock min + (CMM × Période de commande)\n\nCalcul de la Quantité à Commander (QàC)\n\nC'est la quantité qui doit être commandée pour ramener le stock au niveau maximum.\n\nQàC = Stock max − Stock disponible actuel\n"
      },
      {
        "id": "gas-m6-c22",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nRécapitulatif des formules min/max\n"
      },
      {
        "id": "gas-m6-c23",
        "title": "Méthode min/max : formules et application",
        "type": "text",
        "duration": "10 min",
        "content": "Méthode min/max : formules et application\n\nLes limites de la méthode min/max et comment les contourner\n"
      },
      {
        "id": "gas-m6-c24",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nLe point de commande et le délai de livraison sont deux concepts étroitement liés.\n\nLe point de commande répond à la question : à quel niveau de stock dois-je déclencher ma commande ?\n\nLe délai de livraison répond à : combien de temps s'écoule entre ma commande et la réception des produits ? L'un ne va pas sans l'autre.\n\nUn point de commande mal calculé parce que le délai de livraison est mal estimé est l'une des causes les plus fréquentes de rupture de stock dans les systèmes pharmaceutiques.\n"
      },
      {
        "id": "gas-m6-c25",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nLe délai de livraison — Calcul précis\n\nLe délai de livraison n'est pas une donnée fixe. Il varie d'une commande à l'autre selon les fournisseurs, les saisons, les procédures administratives et les conditions de transport.\n\nIl faut donc le calculer sur l'historique réel et comprendre ses composantes.\n"
      },
      {
        "id": "gas-m6-c26",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nLe point de commande — Définition et formule\n\nLe point de commande (PC) est le niveau de stock auquel il faut déclencher la commande pour recevoir les produits avant d'entamer le stock de sécurité.\n\nPoint de commande = (CMM × Délai de livraison) + Stock de sécurité\n\nCette formule est identique à celle du stock minimum dans la méthode min/max simple. Mais dans une approche plus fine, les deux peuvent différer selon la variabilité du délai de livraison et de la demande.\n"
      },
      {
        "id": "gas-m6-c27",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nLe point de commande avec délai variable\n\nDans la réalité, le délai de livraison n'est jamais parfaitement stable. Une approche plus rigoureuse intègre cette variabilité.\n\nPoint de commande = (CMM × DL moyen) + (Z × σ × √DL)\n\nZ = facteur de service (1,65 pour un taux de service de 95%)\n\nσ = écart-type de la consommation mensuelle\n\nDL = délai de livraison en mois\n\nCette formule statistique est utilisée dans les systèmes informatisés.\n\nDans un contexte manuel, on simplifie en utilisant le délai maximum observé plutôt que la moyenne.\n"
      },
      {
        "id": "gas-m6-c28",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nInteraction entre point de commande et fréquence de commande\n\nLe point de commande ne fonctionne pas isolément. Il interagit avec la fréquence à laquelle le gestionnaire vérifie son stock.\n\nSystème à révision continue : Le stock est vérifié en permanence (ou très fréquemment). Dès que le stock atteint le point de commande, la commande est déclenchée automatiquement. C'est le système idéal, possible avec un logiciel de gestion.\n\nSystème à révision périodique : Le stock est vérifié à intervalles fixes (une fois par mois, par exemple). La commande est passée à chaque révision si le stock est en dessous du point de commande. C'est le système le plus courant dans les pharmacies avec gestion manuelle.\n"
      },
      {
        "id": "gas-m6-c29",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nLe point de commande en contexte de livraison programmée\n\nDans certains systèmes (notamment les systèmes de distribution intégrée), les livraisons sont programmées à dates fixes, indépendamment du niveau de stock.\n\nDans ce cas, le point de commande classique est remplacé par une quantité à commander calculée à chaque date de livraison programmée.\n\nQuantité à commander = (CMM × Période jusqu'à prochaine livraison) + Stock min − Stock disponible actuel\n"
      },
      {
        "id": "gas-m6-c30",
        "title": "Calcul du point de commande et du délai de livraison",
        "type": "text",
        "duration": "10 min",
        "content": "#### Calcul du point de commande et du délai de livraison\n\nTableau de synthèse — Point de commande selon les contextes\n"
      },
      {
        "id": "gas-m6-c31",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nEXERCICE 1 — Calcul de la CMM\n\nDonnées\n\nLa Pharmacie du Centre de Santé de Bohicon enregistre les sorties de Paracétamol 500mg sur 6 mois :\n\nQuestions :\n\nCalculez la CMM brute sur 6 mois.\n\nY a-t-il des ajustements à faire ? Justifiez.\n\nQuelle CMM retenez-vous pour les calculs suivants ?\n"
      },
      {
        "id": "gas-m6-c32",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 1 — Calcul de la CMM\n\nQuestion 1 — CMM brute :\n\nTotal consommé = 1 450 + 1 380 + 1 510 + 1 420 + 1 390 + 1 480 = 8 630 cp\n\nCMM brute = 8 630 ÷ 6 = 1 438 cp/mois\n\nQuestion 2 — Ajustements :\n\nAucun ajustement n'est nécessaire.\n\nTous les mois sont normaux, sans rupture ni événement exceptionnel.\n\nLes consommations sont stables et cohérentes entre elles (écart maximum entre les mois : 130 cp, soit moins de 10%).\n\nQuestion 3 — CMM retenue :\n\nCMM = 1 438 cp/mois, arrondie à 1 440 cp/mois pour faciliter les calculs.\n"
      },
      {
        "id": "gas-m6-c33",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nEXERCICE 2 — CMM avec mois de rupture\n\nDonnées\n\nLa Pharmacie du District Sanitaire de Glazoué enregistre les sorties de Cotrimoxazole 480mg sur 8 mois :\n\nQuestions :\n\nIdentifiez les mois à exclure ou à ajuster et justifiez chaque décision.\n\nCalculez la CMM ajustée.\n\nPourquoi est-il dangereux d'utiliser la CMM brute dans ce cas ?\n"
      },
      {
        "id": "gas-m6-c34",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 2 — CMM avec mois de rupture\n\nQuestion 1 — Identification des mois à traiter :\n\nMars → Ajustement : rupture partielle de 18 jours. Le produit n'était disponible que 12 jours sur 30. La consommation enregistrée (210 cp) ne reflète que 12/30 de la demande réelle.\n\nConsommation extrapolée mars = 210 × (30 ÷ 12) = 525 cp\n\nAvril → Exclusion : rupture totale, consommation nulle non représentative de la demande réelle.\n\nMai → Exclusion : rupture totale, même raison.\n\nJuillet → Exclusion : consommation atypique liée à une campagne exceptionnelle (4 200 cp vs une moyenne d'environ 510 cp en période normale). Inclure ce mois gonflerait artificiellement la CMM.\n"
      },
      {
        "id": "gas-m6-c35",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 2 — CMM avec mois de rupture\n\nQuestion 2 — CMM ajustée :\n\nMois retenus : janvier, février, mars ajusté, juin, août\n\nCMM ajustée = 2 575 ÷ 5 = 515 cp/mois\n"
      },
      {
        "id": "gas-m6-c36",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 2 — CMM avec mois de rupture\n\nQuestion 3 — Danger de la CMM brute :\n\nCMM brute = (520 + 490 + 210 + 0 + 0 + 530 + 4 200 + 510) ÷ 8 = 6 460 ÷ 8 = 808 cp/mois\n\nLa CMM brute de 808 cp est 57% plus élevée que la CMM ajustée de 515 cp.\n\nCommander sur cette base conduirait à commander systématiquement 293 cp de trop chaque mois, soit un surstock permanent et une immobilisation inutile de ressources financières.\n\nÀ l'inverse, si on avait calculé la CMM uniquement sur les mois de rupture, on aurait obtenu un chiffre bien trop bas et reproduit la rupture.\n"
      },
      {
        "id": "gas-m6-c37",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nEXERCICE 3 — Calcul complet min/max et quantité à commander\n\nDonnées\n\nPharmacie Régionale de Parakou — Produit : Artéméther-Luméfantrine 20/120mg (boîtes de 24 comprimés)\n\nQuestions :\n\nCalculez la CMM.\n\nCalculez le délai de livraison ajusté.\n\nCalculez le stock de sécurité.\n\nCalculez le stock minimum.\n\nCalculez le stock maximum.\n\nLe stock actuel (520 boîtes) est-il en dessous du point de commande ? Faut-il commander ?\n\nSi oui, calculez la quantité à commander.\n\nHistorique des délais de livraison (en jours) : 32, 28, 45, 36, 29\n\nPolitique de la Direction Régionale :\n\nstock de sécurité = 2 mois,\n\npériode de commande = 2 mois.\n\nStock disponible au moment du calcul : 520 boîtes\n"
      },
      {
        "id": "gas-m6-c38",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 3 — Calcul complet min/max et quantité à commander\n\nQuestion 1 — CMM :\n\nTotal = 185 + 170 + 195 + 180 + 190 + 175 = 1 095 boîtes\n\nAucun mois atypique ni rupture à signaler.\n\nCMM = 1 095 ÷ 6 = 182,5 boîtes/mois ≈ 183 boîtes/mois\n\nQuestion 2 — Délai de livraison ajusté :\n\nDélai moyen = (32 + 28 + 45 + 36 + 29) ÷ 5 = 170 ÷ 5 = 34 jours = 1,13 mois\n\nDélai ajusté avec marge de 25% = 1,13 × 1,25 = 1,42 mois ≈ 1,5 mois\n\nQuestion 3 — Stock de sécurité :\n\nSS = 183 × 2 = 366 boîtes\n\nQuestion 4 — Stock minimum :\n\nStock min = (183 × 1,5) + 366 = 274,5 + 366 = 641 boîtes\n"
      },
      {
        "id": "gas-m6-c39",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 3 — Calcul complet min/max et quantité à commander\n\nQuestion 5 — Stock maximum :\n\nStock max = 641 + (183 × 2) = 641 + 366 = 1 007 boîtes\n\nQuestion 6 — Faut-il commander ?\n\nStock actuel = 520 boîtes Stock minimum = 641 boîtes\n\n520 < 641 → Oui, le stock est en dessous du point de commande. Il faut commander immédiatement.\n\nLa pharmacie ne couvre que 520 ÷ 183 = 2,84 mois de consommation, ce qui semble confortable, mais le stock de sécurité doit rester intact. Stock utilisable sans toucher au SS = 520 − 366 = 154 boîtes, soit seulement 0,84 mois de consommation disponible hors stock de sécurité. Or le délai de livraison est de 1,5 mois. La rupture est imminente si on ne commande pas maintenant.\n\nQuestion 7 — Quantité à commander :\n\nQàC = Stock max − Stock actuel = 1 007 − 520 = 487 boîtes\n"
      },
      {
        "id": "gas-m6-c40",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nEXERCICE 4 — Cas complexe multiproduits\n\nDonnées\n\nDépôt de district de Savalou — Révision mensuelle du stock\n\nParamètres fixes :\n\ndélai de livraison = 2 mois,\n\npériode de commande = 3 mois,\n\nstock de sécurité = 2 mois.\n\nQuestions :\n\nCalculez le stock de sécurité, le stock minimum et le stock maximum.\n\nDéterminez le statut du stock (normal, surstock, rupture imminente, commander).\n\nCalculez la quantité à commander si nécessaire.\n\nProposez une action concrète pour chaque produit.\n"
      },
      {
        "id": "gas-m6-c41",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 4 — Cas complexe multiproduits\n\nProduit 1 — Amoxicilline 250mg sirop (CMM = 85 flacons)\n\nStatut : stock actuel (620) > stock max (595) → Surstock léger (+25 flacons)\n\nCouverture = 620 ÷ 85 = 7,3 mois\n\nAction :\n\nNe pas commander lors de cette révision.\n\nSurveiller la date de péremption des flacons en excès.\n\nSi la péremption est proche, envisager une redistribution vers un autre centre de santé.\n"
      },
      {
        "id": "gas-m6-c42",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 4 — Cas complexe multiproduits\n\nProduit 2 — Fer acide folique 200/0,4mg (CMM = 430 cp)\n\nStatut : stock actuel (280) << stock minimum (1 720) → Rupture imminente critique\n\nCouverture = 280 ÷ 430 = 0,65 mois soit environ 19 jours. Or le délai de livraison est de 2 mois. La pharmacie sera en rupture totale dans 19 jours et ne recevra pas de livraison avant 2 mois.\n\nQàC = 3 010 − 280 = 2 730 cp\n\nAction : commande d'urgence immédiate. Contacter simultanément le niveau supérieur pour une livraison partielle d'urgence. Identifier si un site voisin dispose d'un excédent pouvant être redistribué en attendant..\n"
      },
      {
        "id": "gas-m6-c43",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 4 — Cas complexe multiproduits\n\nProduit 3 — Vitamine A 200 000 UI (CMM = 310 capsules)\n\nStatut : stock actuel (2 800) >> stock max (2 170) → Surstock important (+630 capsules)\n\nCouverture = 2 800 ÷ 310 = 9 mois\n\nAction : ne pas commander. Vérifier impérativement les dates de péremption. Si les capsules périment dans moins de 9 mois, une partie sera perdue. Informer le niveau supérieur et proposer une redistribution vers les sites déficitaires. Investiguer la cause du surstock (erreur de commande précédente ? baisse de la demande ?).\n"
      },
      {
        "id": "gas-m6-c44",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 4 — Cas complexe multiproduits\n\nProduit 4 — Misoprostol 200mcg (CMM = 95 cp)\n\nStatut : stock actuel (410) > stock minimum (380) et < stock max (665) → Situation normale\n\nCouverture = 410 ÷ 95 = 4,3 mois. Le stock est dans la zone normale. Pas de commande à déclencher lors de cette révision, mais à surveiller lors de la prochaine.\n\nLe stock se rapprochera du minimum dans environ 2,3 mois (410 − 380 = 30 cp de marge, soit 30 ÷ 95 = 0,3 mois... ).\n\nRecalcul : marge au-dessus du stock min = 410 − 380 = 30 cp → 30 ÷ 95 = 0,3 mois. La prochaine révision est dans 1 mois. À ce moment, le stock sera d'environ 410 − 95 = 315 cp, soit en dessous du stock min (380). Il faudra commander lors de la prochaine révision.\n\nAction : noter dans le calendrier que le Misoprostol sera à commander lors de la prochaine révision mensuelle.\n"
      },
      {
        "id": "gas-m6-c45",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 4 — Cas complexe multiproduits\n\nProduit 5 — Gentamicine injectable 80mg (CMM = 40 ampoules)\n\nStatut : stock actuel (55) << stock minimum (160) → Rupture imminente\n\nCouverture = 55 ÷ 40 = 1,375 mois soit environ 41 jours\n\nLe délai de livraison est de 2 mois (60 jours). La pharmacie sera en rupture dans 41 jours et n'aura pas de livraison avant 60 jours. Déficit de 19 jours sans produit.\n\nQàC = 280 − 55 = 225 ampoules\n\nAction : commande urgente immédiate. La Gentamicine étant un antibiotique injectable critique (infections néonatales, sepsis), la rupture peut avoir des conséquences graves. Contacter le niveau supérieur pour une livraison partielle d'urgence et vérifier si des sites voisins peuvent partager temporairement leur stock.\n"
      },
      {
        "id": "gas-m6-c46",
        "title": "Exercices pratiques sur données réelles",
        "type": "text",
        "duration": "10 min",
        "content": "#### Exercices pratiques sur données réelles\n\nCorrection EXERCICE 4 — Cas complexe multiproduits\n\nTableau de bord final — Dépôt de district de Savalou\n"
      },
      {
        "id": "gas-m6-c47",
        "title": "Processus de commande et suivi fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Processus de commande et suivi fournisseurs\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m6-c48",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nCycle de commande : de la quantification à la réception\n\nSélection et évaluation des fournisseurs\n\nGestion des contrats et des termes de livraison (Incoterms)\n\nOutils de suivi des commandes et tableau de bord fournisseurs\n"
      }
    ]
  },
  {
    "id": "gas-m7",
    "title": "Module 7 : Cycle de commande : de la quantification à la réception",
    "chapters": [
      {
        "id": "gas-m7-c1",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nLe cycle de commande est l'ensemble des étapes qui s'enchaînent depuis le moment où un besoin en produits est identifié jusqu'au moment où ces produits sont disponibles en stock et prêts à être distribués.\n\nC'est un processus structuré, documenté et impliquant plusieurs acteurs.\n\nUne défaillance à n'importe quelle étape peut retarder la livraison, générer des erreurs de quantité ou introduire des produits de mauvaise qualité dans le stock.\n\nConnaître et maîtriser chaque étape est donc une compétence fondamentale pour tout gestionnaire de pharmacie.\n"
      },
      {
        "id": "gas-m7-c2",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 1 : Quantification des besoins\n\nÉtape 2 : Élaboration du bon de commande\n\nÉtape 3 : Validation et approbation\n\nÉtape 4 : Transmission au fournisseur\n\nÉtape 5 : Traitement par le fournisseur\n\nÉtape 6 : Expédition et transport\n\nÉtape 7 : Réception et contrôle\n\nChaque étape a ses acteurs, ses documents et ses délais.\n"
      },
      {
        "id": "gas-m7-c3",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 1 — Quantification des besoins\n\nDéfinition : La quantification est le processus de calcul des quantités de chaque produit à commander pour couvrir les besoins jusqu'à la prochaine livraison.\n\nQui la fait? : Le gestionnaire de la pharmacie ou du dépôt, assisté si possible d'un responsable de programme (paludisme, VIH, CPN, etc.) pour les produits de programmes spécifiques.\n\nComment ? En appliquant la formule : QàC = Stock max − Stock disponible actuel\n\nDocuments produits à cette étape : Fiche de collecte des données de stock et tableau de quantification rempli et signé\n\nErreurs fréquentes à éviter :\n\nQuantifier sur la base du stock théorique sans vérifier le stock physique\n\nOublier d'intégrer les commandes déjà en transit\n\nNe pas ajuster la CMM depuis plusieurs mois malgré l'évolution de la demande\n"
      },
      {
        "id": "gas-m7-c4",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 2 — Élaboration du bon de commande\n\nDéfinition :\n\nLe bon de commande (BC) est le document officiel qui formalise la demande d'approvisionnement.\n\nIl engage la pharmacie et le fournisseur.\n\nIl doit être précis, complet et sans ambiguïté.\n"
      },
      {
        "id": "gas-m7-c5",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 3 — Validation et approbation\n\nDéfinition :\n\nAvant d'être transmis au fournisseur, le bon de commande doit être validé par l'autorité compétente. Cette étape garantit que la commande est justifiée, correctement calculée et dans les limites budgétaires disponibles.\n\nCe que le valideur vérifie :\n\nLes quantités sont-elles cohérentes avec la CMM et les niveaux de stock ?\n\nLe budget disponible couvre-t-il le montant total de la commande ?\n\nLes produits commandés figurent-ils sur la liste des médicaments essentiels autorisés ?\n\nLa commande est-elle dans le calendrier prévu ?\n"
      },
      {
        "id": "gas-m7-c6",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 4 — Transmission au fournisseur\n\nDéfinition :\n\nUne fois validé, le bon de commande est transmis au fournisseur. Le mode de transmission doit garantir la traçabilité et la confirmation de réception.\n\nBonne pratique : Quelle que soit la méthode utilisée, toujours obtenir une confirmation écrite de réception de la commande par le fournisseur, avec le numéro de commande et la date de livraison confirmée. Sans cette confirmation, la commande peut ne pas avoir été enregistrée.\n"
      },
      {
        "id": "gas-m7-c7",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 5 — Traitement par le fournisseur\n\nDéfinition :\n\nUne fois la commande reçue, le fournisseur la traite en interne : vérification de la disponibilité des produits, préparation, contrôle qualité, conditionnement et édition des documents de livraison.\n\nRisques à cette étape :\n\nLe fournisseur peut être en rupture sur certains produits → livraison partielle\n\nDes substitutions peuvent être proposées (produit différent du commandé)\n\nDes erreurs de quantité peuvent survenir lors de la préparation\n\nCe que le fournisseur produit à cette étape :\n\nBon de livraison (BL) : liste des produits expédiés avec les quantités réelles\n\nFacture : montant à payer\n\nCertificat d'analyse (pour les produits pharmaceutiques) : preuve de contrôle qualité\n\nDocuments de transport : pour les livraisons longue distance\n"
      },
      {
        "id": "gas-m7-c8",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 5 — Traitement par le fournisseur\n\nBonne pratique :\n\nSi la livraison sera partielle ou retardée :\n\nLe fournisseur doit en informer le commanditaire avant l'expédition, pas au moment de la livraison.\n\nCela permet au gestionnaire d'anticiper et de prendre des mesures alternatives.\n"
      },
      {
        "id": "gas-m7-c9",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 6 — Expédition et transport\n\nDéfinition :\n\nLes produits sont chargés et acheminés vers la pharmacie destinataire. Cette étape est critique pour les produits thermosensibles (vaccins, insuline) qui exigent une chaîne du froid maintenue pendant tout le transport.\n\nDocuments accompagnant la livraison :\n\nBon de livraison signé par le transporteur\n\nBon de transport / bordereau d'expédition\n\nCertificats d'analyse des lots\n\nFormulaire de suivi de température (pour les produits de la chaîne du froid)\n"
      },
      {
        "id": "gas-m7-c10",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 6 — Expédition et transport\n\nBonnes pratiques pendant le transport :\n\nPour les produits standards :\n\nEmballages protégés contre l'humidité et la chaleur excessive\n\nProduits non exposés au soleil direct pendant le transport\n\nProduits fragiles (ampoules) emballés avec protection anti-choc\n\nPour les produits de la chaîne du froid :\n\nTransport dans des glacières ou véhicules réfrigérés\n\nPacks de glace en quantité suffisante pour la durée du trajet\n\nThermomètre enregistreur dans chaque contenant\n\nPastilles de contrôle du vaccin (VVM) vérifiées avant et après transport\n"
      },
      {
        "id": "gas-m7-c11",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 7 — Réception et contrôle\n\nDéfinition :\n\nC'est l'étape finale du cycle. Les produits arrivent et doivent être soigneusement vérifiés avant d'être intégrés au stock.\n\nUne réception bâclée est la porte d'entrée de nombreux problèmes : produits manquants non détectés, produits de mauvaise qualité acceptés, erreurs d'enregistrement.\n"
      },
      {
        "id": "gas-m7-c12",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 7 — Réception et contrôle\n\nLes 5 vérifications obligatoires à la réception : :\n\nVérification 1 — Conformité documentaire\n\nComparer le bon de livraison du fournisseur avec le bon de commande initial.\n\nVérification 2 — Contrôle quantitatif\n\nCompter physiquement chaque produit, boîte par boîte, flacon par flacon.\n\nNe jamais accepter le chiffre du bon de livraison sans vérification.\n"
      },
      {
        "id": "gas-m7-c13",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 7 — Réception et contrôle\n\nLes 5 vérifications obligatoires à la réception : :\n\nVérification 3 — Contrôle qualitatif\n\nVérification 4 — Contrôle de la chaîne du froid (produits thermosensibles)\n\nVérifier le pastillage des vaccins (Vaccine Vial Monitor - VVM).\n\nSi le pastillage indique une rupture de la chaîne du froid, placer en quarantaine immédiatement.\n"
      },
      {
        "id": "gas-m7-c14",
        "title": "Cycle de commande : de la quantification à la réception",
        "type": "text",
        "duration": "10 min",
        "content": "Cycle de commande : de la quantification à la réception\n\nVue d'ensemble du cycle de commande\n\nÉtape 7 — Réception et contrôle\n\nLes 5 vérifications obligatoires à la réception : :\n\nVérification 5 — Enregistrement immédiat\n\nDès que la réception est validée, enregistrer sur :\n\nLa fiche de stock de chaque produit reçu\n\nLe registre de réceptions\n\nLe système informatisé si disponible\n\nRègle absolue : aucun produit ne doit être rangé dans le stock sans avoir été enregistré.\n"
      }
    ]
  },
  {
    "id": "gas-m8",
    "title": "Module 8 : Sélection et évaluation des fournisseurs",
    "chapters": [
      {
        "id": "gas-m8-c1",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLe fournisseur est un maillon critique de la chaîne pharmaceutique.\n\nUn bon produit mal livré, livré en retard, ou livré en quantité insuffisante a les mêmes conséquences qu'une mauvaise gestion interne :\n\nRupture de stock,\n\nSoins interrompus,\n\nPertes financières.\n\nChoisir ses fournisseurs avec rigueur et les évaluer régulièrement n'est pas une option, c'est une nécessité.\n\nDans le secteur pharmaceutique, cette rigueur est d'autant plus importante que la qualité des produits a un impact direct sur la santé et la vie des patients.\n"
      },
      {
        "id": "gas-m8-c2",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLes critères de sélection d'un fournisseur\n\nCritère 1 — La qualité des produits\n\nC'est le critère le plus important dans le secteur pharmaceutique. Un fournisseur peut être moins cher que les autres, mais si ses produits sont de mauvaise qualité, il ne doit pas être retenu.\n\nCe qu'on vérifie :\n\nLe fournisseur est-il homologué par l'autorité nationale de réglementation pharmaceutique ?\n\nSes produits disposent-ils d'une autorisation de mise sur le marché (AMM) dans le pays ?\n\nProduit-il selon les Bonnes Pratiques de Fabrication (BPF/GMP) internationalement reconnues ?\n\nPeut-il fournir des certificats d'analyse pour chaque lot livré ?\n\nA-t-il déjà eu des rappels de lots ou des alertes qualité ?\n"
      },
      {
        "id": "gas-m8-c3",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLes critères de sélection d'un fournisseur\n\nCritère 2 — Le prix et les conditions financières\n\nLe prix est important mais ne doit jamais être le seul critère. Un produit moins cher qui génère des ruptures fréquentes ou des problèmes de qualité coûte finalement plus cher qu'un produit bien géré à prix légèrement supérieur.\n\nCe qu'on évalue :\n\nPrix unitaire par produit\n\nRemises quantitatives (réductions pour grandes commandes)\n\nConditions de paiement (délai de paiement, acompte exigé)\n\nPolitique de retour et d'avoir pour les produits non conformes\n\nFrais de livraison inclus ou non dans le prix\n"
      },
      {
        "id": "gas-m8-c4",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLes critères de sélection d'un fournisseur\n\nCritère 3 — La fiabilité des délais de livraison\n\nUn fournisseur qui livre en retard est aussi dangereux qu'un fournisseur qui livre des produits de mauvaise qualité. Le respect des délais est mesurable sur l'historique des commandes.\n\nCe qu'on évalue :\n\nDélai de livraison annoncé vs délai réellement observé\n\nFréquence des retards\n\nAmplitude des retards (quelques jours vs plusieurs semaines)\n\nCapacité à livrer en urgence si besoin\n"
      },
      {
        "id": "gas-m8-c5",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLes critères de sélection d'un fournisseur\n\nCritère 4 — La capacité et la disponibilité des produits\n\nUn fournisseur peut avoir de bons produits et de bons prix, mais s'il est régulièrement en rupture sur les produits commandés, il ne peut pas être considéré comme fiable.\n\nCe qu'on évalue :\n\nTaux de service (quantité livrée / quantité commandée)\n\nFréquence des livraisons partielles\n\nCapacité à absorber des commandes exceptionnelles (urgences, épidémies)\n\nDiversité du catalogue (peut-il fournir tous les produits dont on a besoin ?)\n"
      },
      {
        "id": "gas-m8-c6",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLes critères de sélection d'un fournisseur\n\nCritère 5 — Le service et le support\n\nAu-delà des produits eux-mêmes, la qualité de la relation commerciale et du support est un critère différenciant, particulièrement en situation de crise.\n\nCe qu'on évalue :\n\nRéactivité aux demandes d'information et aux réclamations\n\nQualité de la communication en cas de retard ou de rupture\n\nFlexibilité pour les commandes urgentes\n\nSupport technique (information sur les produits, gestion des effets indésirables)\n\nPolitique de gestion des litiges\n"
      },
      {
        "id": "gas-m8-c7",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLa pondération des critères — Système de scoring\n\nPour comparer objectivement plusieurs fournisseurs, on utilise un système de scoring pondéré. Chaque critère reçoit un poids selon son importance, et chaque fournisseur est noté sur chaque critère.\n"
      },
      {
        "id": "gas-m8-c8",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nL'évaluation périodique des fournisseurs\n\nSélectionner un fournisseur est une décision ponctuelle.\n\nL'évaluer régulièrement est une obligation continue.\n\nUn fournisseur qui performait bien il y a deux ans peut s'être dégradé.\n\nÀ l'inverse, un fournisseur moyen peut s'être amélioré après des investissements.\n"
      },
      {
        "id": "gas-m8-c9",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLa gestion des fournisseurs alternatifs\n\nDépendre d'un seul fournisseur pour un produit critique est un risque majeur.\n\nSi ce fournisseur est en rupture, en grève, ou en difficulté financière, toute la chaîne d'approvisionnement est bloquée.\n\nBonne pratique — La règle des 3 fournisseurs : Pour chaque produit essentiel, identifier et qualifier au minimum :\n\n1 fournisseur principal : celui avec qui on travaille habituellement (meilleur score global)\n\n1 fournisseur secondaire : sollicité en cas de défaillance du principal\n\n1 fournisseur d'urgence : prix potentiellement plus élevé, mais disponible rapidement en cas de crise\n"
      },
      {
        "id": "gas-m8-c10",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLa gestion des litiges fournisseurs\n\nMalgré une bonne sélection et un suivi régulier, des litiges surviennent. Il faut savoir les gérer de façon professionnelle et documentée.\n"
      },
      {
        "id": "gas-m8-c11",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLa gestion des litiges fournisseurs\n\nProcédure de gestion d'un litige\n\nÉtape 1 — Documentation immédiate :\n\nAu moment de la réception, noter l'anomalie sur le bon de livraison avant de signer.\n\nFaire contresigner par le livreur.\n\nPrendre des photos si possible.\n\nÉtape 2 — Notification formelle\n\nAdresser au fournisseur une réclamation écrite dans les 48 à 72 heures suivant la réception, avec les éléments suivants :\n\nNuméro de commande et numéro de bon de livraison\n\nDescription précise de l'anomalie\n\nQuantité ou valeur concernée\n\nAction attendue (remplacement, avoir, remboursement)\n\nDélai de réponse attendu\n"
      },
      {
        "id": "gas-m8-c12",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nLa gestion des litiges fournisseurs\n\nProcédure de gestion d'un litige\n\nÉtape 3 — Suivi et escalade\n\nSi le fournisseur ne répond pas dans le délai imparti :\n\nEscalader au niveau hiérarchique supérieur (direction régionale, ministère) ou\n\nActiver les clauses contractuelles de pénalité.\n\nÉtape 4 — Enregistrement dans le dossier fournisseur\n\nTout litige, même résolu, doit être enregistré dans le dossier du fournisseur.\n\nCes données alimentent l'évaluation périodique et peuvent justifier une décision de changement de fournisseur si les incidents se répètent.\n"
      },
      {
        "id": "gas-m8-c13",
        "title": "Sélection et évaluation des fournisseurs",
        "type": "text",
        "duration": "10 min",
        "content": "#### Sélection et évaluation des fournisseurs\n\nSynthèse — Sélection et évaluation des fournisseurs\n"
      }
    ]
  },
  {
    "id": "gas-m9",
    "title": "Module 9 : Gestion des contrats et des termes de livraison (Incoterms)",
    "chapters": [
      {
        "id": "gas-m9-c1",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nUn contrat d'approvisionnement est le document juridique qui définit les droits et obligations de chaque partie, protège la le client en cas de défaillance du fournisseur, et encadre toutes les conditions dans lesquelles les produits seront fournis.\n\nLes Incoterms, quant à eux, sont des règles internationales standardisées qui précisent à quel moment la responsabilité des marchandises passe du vendeur à l'acheteur pendant le transport.\n\nLes maîtriser permet d'éviter des litiges coûteux et des pertes de produits non couverts.\n"
      },
      {
        "id": "gas-m9-c2",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nPourquoi un contrat est-il indispensable ?\n\nSans contrat formalisé, chaque commande est une transaction isolée sans garanties. Le fournisseur peut modifier ses prix, ses délais ou ses conditions à tout moment.\n\nLe client ne dispose d'aucun recours juridique en cas de :\n\nlivraison non conforme,\n\nretard ou de\n\nrupture unilatérale.\n\nUn contrat bien rédigé protège les deux parties et crée un cadre stable pour une relation durable.\n"
      },
      {
        "id": "gas-m9-c3",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 1 — Identification des parties\n\nNom complet, adresse, statut juridique, numéro d'enregistrement et représentant légal de chaque partie.\n\nCette clause paraît évidente mais est souvent bâclée, ce qui peut poser des problèmes juridiques en cas de litige.\n\nClause 2 — Objet du contrat\n\nDescription précise des produits couverts par le contrat :\n\ndénomination commune internationale (DCI),\n\ndosage,\n\nforme pharmaceutique,\n\nconditionnement,\n\nnormes de qualité exigées.\n"
      },
      {
        "id": "gas-m9-c4",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 3 — Prix et conditions de révision\n\nPrix unitaire convenu, devise, modalités de révision du prix en cours de contrat.\n\nClause 4 — Quantités et modalités de commande\n\nVolume minimum et maximum garanti sur la durée du contrat, procédure de passation des commandes, délai de confirmation.\n\nLe volume minimum garanti protège le fournisseur (il peut planifier sa production).\n\nLe volume maximum protège la client (il n'est pas engagée au-delà de ses besoins prévisionnels).\n\nClause 5 — Délais de livraison et pénalités de retard\n\nC'est l'une des clauses les plus importantes.\n\nElle fixe le délai contractuel de livraison et les conséquences financières de son non-respect.\n"
      },
      {
        "id": "gas-m9-c5",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 6 — Qualité et conformité des produits\n\nNormes de qualité exigées, documents de conformité obligatoires, procédure en cas de non-conformité.\n\nLa clause sur la durée de vie résiduelle (18 mois) est particulièrement importante. Elle évite de recevoir des produits qui périmeront avant d'être consommés.\n\nClause 7 — Conditions de livraison (Incoterms)\n\nPrécise qui est responsable du transport, de l'assurance et des frais douaniers.\n\nNous détaillerons cette clause dans la section suivante.\n\nClause 8 — Conditions de paiement\n\nDélai de paiement, mode de paiement accepté, pénalités de retard de paiement.\n"
      },
      {
        "id": "gas-m9-c6",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nLes clauses essentielles d'un contrat d'approvisionnement\n\nClause 9 — Force majeure\n\nDéfinit les événements exceptionnels (catastrophes naturelles, guerres, épidémies) qui exonèrent temporairement une partie de ses obligations sans pénalités.\n\nLa liste des événements constituant un cas de force majeure doit être explicitement définie dans le contrat.\n\nClause 10 — Résiliation\n\nConditions dans lesquelles chaque partie peut mettre fin au contrat : préavis requis, motifs de résiliation immédiate (faute grave, non-conformité répétée), indemnités éventuelles.\n\nClause 11 — Règlement des litiges\n\nDésigne la juridiction compétente en cas de litige non résolu à l'amiable et prévoit éventuellement une procédure d'arbitrage avant tout recours judiciaire.\n"
      },
      {
        "id": "gas-m9-c7",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLe contrat d'approvisionnement pharmaceutique\n\nTableau récapitulatif des clauses essentielles\n"
      },
      {
        "id": "gas-m9-c8",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nQu'est-ce qu'un Incoterm ?\n\nIncoterm est la contraction de International Commercial Terms.\n\nCe sont des règles standardisées publiées par la Chambre de Commerce Internationale (CCI) et révisées périodiquement (dernière version : Incoterms 2020).\n\nElles définissent précisément :\n\nQui (vendeur ou acheteur) organise et paie le transport\n\nQui organise et paie l'assurance des marchandises\n\nQui se charge des formalités douanières (export et import)\n\nÀ quel moment le risque de perte ou de dommage passe du vendeur à l'acheteur\n\nCe dernier point est crucial : si des produits sont endommagés ou perdus pendant le transport, l'Incoterm détermine qui en supporte la perte financière.\n"
      },
      {
        "id": "gas-m9-c9",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nLes Incoterms les plus utilisés en approvisionnement pharmaceutique\n\nEXW — Ex Works (À l'usine)\n\nPrincipe : Le vendeur met les marchandises à disposition dans ses locaux. L'acheteur prend en charge tout le reste : chargement, transport, assurance, formalités douanières d'export et d'import, livraison finale.\n"
      },
      {
        "id": "gas-m9-c10",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nLes Incoterms les plus utilisés en approvisionnement pharmaceutique\n\nFOB — Free On Board (Franco à bord)\n\nPrincipe : Le vendeur livre les marchandises à bord du navire désigné par l'acheteur, dans le port d'embarquement convenu. Les formalités douanières d'export sont à la charge du vendeur. À partir du moment où les marchandises sont à bord, le risque et les coûts passent à l'acheteur.\n"
      },
      {
        "id": "gas-m9-c11",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nLes Incoterms les plus utilisés en approvisionnement pharmaceutique\n\nCIF — Cost, Insurance and Freight (Coût, assurance et fret)\n\nPrincipe : Le vendeur paie le transport et l'assurance jusqu'au port de destination désigné. Cependant, le risque passe à l'acheteur dès que les marchandises sont à bord du navire dans le port d'export (comme en FOB). C'est une distinction importante : le vendeur paie l'assurance mais c'est l'acheteur qui en bénéficie si un sinistre survient pendant le transport.\n"
      },
      {
        "id": "gas-m9-c12",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nLes Incoterms les plus utilisés en approvisionnement pharmaceutique\n\nDDP — Delivered Duty Paid (Rendu droits acquittés)\n\nPrincipe : C'est l'Incoterm le plus favorable à l'acheteur. Le vendeur supporte tous les coûts et tous les risques jusqu'à la destination finale convenue, y compris les droits de douane à l'importation. L'acheteur n'a qu'à réceptionner les marchandises.\n"
      },
      {
        "id": "gas-m9-c13",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nLes Incoterms les plus utilisés en approvisionnement pharmaceutique\n\nDAP — Delivered At Place (Rendu au lieu de destination)\n\nPrincipe : Similaire au DDP mais le vendeur ne prend pas en charge les droits de douane à l'importation, qui restent à la charge de l'acheteur. Le vendeur livre jusqu'au lieu de destination convenu, prêt à être déchargé.\n"
      },
      {
        "id": "gas-m9-c14",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nComparaison synthétique des principaux Incoterms\n"
      },
      {
        "id": "gas-m9-c15",
        "title": "Gestion des contrats et des termes de livraison (Incoterms)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des contrats et des termes de livraison (Incoterms)\n\nLes Incoterms — Règles internationales de livraison\n\nChoisir le bon Incoterm selon le contexte\n"
      }
    ]
  },
  {
    "id": "gas-m10",
    "title": "Module 10 : Outils de suivi des commandes et tableau de bord fournisseurs",
    "chapters": [
      {
        "id": "gas-m10-c1",
        "title": "Chapitre 1",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nPasser une commande est une chose. Savoir à tout moment où elle en est, si elle sera livrée à temps, et si le fournisseur performe correctement en est une autre.\n\nSans outils de suivi structurés, le gestionnaire travaille dans l'incertitude :\n\nil ne sait pas si sa commande a bien été reçue par le fournisseur,\n\nsi l'expédition a eu lieu,\n\nni quand la livraison est attendue.\n\nCette incertitude conduit à des relances tardives, des ruptures non anticipées et des décisions de commande mal calibrées.\n\nLes outils de suivi des commandes et le tableau de bord fournisseurs transforment cette incertitude en visibilité et cette réactivité subie en anticipation maîtrisée.\n"
      },
      {
        "id": "gas-m10-c2",
        "title": "Chapitre 2",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe registre de suivi des commandes\n\nDéfinition et objectif\n\nLe registre de suivi des commandes est le document de base qui trace le cycle de vie de chaque commande depuis son émission jusqu'à sa clôture après réception et vérification.\n\nC'est l'outil minimal indispensable, utilisable même sans informatique.\n"
      },
      {
        "id": "gas-m10-c3",
        "title": "Chapitre 3",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe registre de suivi des commandes\n\nStructure du registre\n"
      },
      {
        "id": "gas-m10-c4",
        "title": "Chapitre 4",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe tableau de bord des commandes en cours\n\nDéfinition\n\nLe tableau de bord des commandes en cours est une vue synthétique et visuelle de toutes les commandes actives à un instant T.\n\nContrairement au registre (document historique complet), le tableau de bord ne montre que les commandes non encore clôturées.\n\nIl permet au gestionnaire d'identifier en un coup d'œil les commandes à risque.\n"
      },
      {
        "id": "gas-m10-c5",
        "title": "Chapitre 5",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe système d'alerte et de relance\n\nPrincipe\n\nUn bon système de suivi ne se contente pas d'enregistrer passivement les informations.\n\nIl génère des alertes proactives qui déclenchent des actions avant que les problèmes ne surviennent.\n\nDans un système manuel, ces alertes sont des rappels inscrits dans un calendrier. Dans un système informatisé, elles sont automatiques.\n"
      },
      {
        "id": "gas-m10-c6",
        "title": "Chapitre 6",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe système d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 1 — Confirmation de réception de commande (J+2 après transmission)*\n\nSi le fournisseur n'a pas confirmé la réception du bon de commande dans les 48 heures suivant sa transmission, le gestionnaire relance.\n\nPourquoi : une commande non confirmée peut ne pas avoir été enregistrée par le fournisseur. Plus on attend pour s'en apercevoir, plus le retard s'accumule.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m10-c7",
        "title": "Chapitre 7",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe système d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 2 — Suivi d'expédition (J−7 avant la date de livraison promise)*\n\nSept jours avant la date de livraison promise, le gestionnaire vérifie que les produits ont bien été expédiés.\n\nPourquoi : si l'expédition n'a pas encore eu lieu à J−7, la livraison sera très probablement en retard. C'est le moment d'anticiper et d'évaluer l'impact sur le stock.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m10-c8",
        "title": "Chapitre 8",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe système d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 3 — Retard avéré (J+1 après la date de livraison promise)*\n\nSi la livraison n'est pas arrivée à la date promise, le gestionnaire déclenche le niveau 3 : notification formelle de retard avec application des pénalités contractuelles et évaluation de l'impact sur le stock.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m10-c9",
        "title": "Chapitre 9",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe système d'alerte et de relance\n\nLes 4 niveaux d'alerte\n\nAlerte niveau 4 — Retard critique (J+7 et au-delà)*\n\nSi après 7 jours de retard le problème n'est pas résolu, le gestionnaire escalade au niveau hiérarchique supérieur, active le fournisseur alternatif si le stock est en danger, et documente formellement en vue d'une éventuelle révision du contrat.\n\n* : selon les termes du contrat\n"
      },
      {
        "id": "gas-m10-c10",
        "title": "Chapitre 10",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe tableau de bord fournisseurs\n\nDéfinition et objectif\n\nLe tableau de bord fournisseurs est l'outil stratégique d'évaluation continue de la performance des fournisseurs.\n\nIl consolide les données de toutes les commandes passées auprès d'un fournisseur sur une période donnée et calcule automatiquement ses KPIs.\n\nIl permet de prendre des décisions objectives :\n\nmaintenir,\n\nréorienter ou\n\nexclure un fournisseur.\n"
      },
      {
        "id": "gas-m10-c11",
        "title": "Chapitre 11",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nLe tableau de bord fournisseurs\n\nLes indicateurs du tableau de bord fournisseurs\n\nIndicateur 1 — Taux de service\n\n(Quantité livrée conforme ÷ Quantité commandée) × 100\n\nIndicateur 2 — Taux de respect des délais\n\n(Nombre de livraisons dans les délais ÷ Nombre total de livraisons) × 100\n\nIndicateur 3 — Taux de conformité qualité\n\n(Nombre de lots conformes ÷ Nombre total de lots reçus) × 100\n\nIndicateur 4 — Délai moyen de livraison\n\nMoyenne des délais réels observés sur la période\n\nIndicateur 5 — Taux de résolution des réclamations\n\n(Réclamations résolues dans les délais ÷ Total des réclamations) × 100\n"
      },
      {
        "id": "gas-m10-c12",
        "title": "Chapitre 12",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils de suivi des commandes et tableau de bord fournisseurs\n\nOutils digitaux de suivi\n\nNiveau 1 — Manuel (registre papier)\n\nAdapté aux structures sans électricité fiable ni informatique.\n\nEfficace si rigoureusement tenu. Limite : pas de calculs automatiques, risque d'erreurs de transcription.\n\nNiveau 2 — Tableur (Excel, Google Sheets)\n\nLe niveau le plus répandu et le plus accessible.\n\nPermet les calculs automatiques, les graphiques, le filtrage. Un fichier Excel bien construit peut gérer l'ensemble du suivi des commandes et des tableaux de bord fournisseurs d'un dépôt de district.\n\nNiveau 3 — Logiciel de gestion (SAGE, Odoo, OpenLMIS)\n\nSystèmes intégrés qui automatisent le suivi des commandes, génèrent les alertes, calculent les KPIs en temps réel et permettent la consolidation des données entre plusieurs sites.\n\nNiveau 4 — Système d'information logistique national (LMIS)\n\nNiveau le plus avancé, utilisé par les centrales d'achat et les ministères.\n\nPermet une visibilité en temps réel sur l'ensemble de la chaîne d'approvisionnement nationale.\n"
      }
    ]
  },
  {
    "id": "gas-m11",
    "title": "Module 11 : Gestion des ruptures et des surstocks",
    "chapters": [
      {
        "id": "gas-m11-c1",
        "title": "Gestion des ruptures et des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Gestion des ruptures et des surstocks\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m11-c2",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nCauses et conséquences des ruptures de stock\n\nStratégies de prévention et de gestion des ruptures\n\nIdentification et traitement des surstocks (redistribution, retour)\n\nPlans de contingence et procédures d'urgence\n"
      },
      {
        "id": "gas-m11-c3",
        "title": "Causes et conséquences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et conséquences des ruptures de stock\n\nLes causes des ruptures de stock\n\nUne rupture de stock pharmaceutique n'est jamais un simple problème logistique.\n\nC'est une défaillance du système de santé qui a des conséquences directes sur les patients, les soignants et les finances de la structure.\n\nComprendre pourquoi les ruptures surviennent est la première étape pour les prévenir.\n\nLes causes sont multiples, souvent combinées, et peuvent se situer à n'importe quel niveau de la chaîne pharmaceutique.\n\nLes ignorer ou les traiter superficiellement conduit inévitablement à la récurrence des ruptures.\n"
      },
      {
        "id": "gas-m11-c4",
        "title": "Causes et conséquences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et conséquences des ruptures de stock\n\nLes causes des ruptures de stock\n\nCatégorie 1 — Causes liées à la prévision et à la quantification\n\nCMM mal calculée\n\nNon prise en compte de la saisonnalité\n\nCatégorie 2 — Causes liées au processus de commande\n\nCommande tardive\n\nCommande rejetée ou bloquée administrativement\n\nBudget insuffisant\n"
      },
      {
        "id": "gas-m11-c5",
        "title": "Causes et conséquences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et conséquences des ruptures de stock\n\nLes causes des ruptures de stock\n\nCatégorie 3 — Causes liées aux fournisseurs\n\nRupture chez le fournisseur\n\nRetard de livraison\n\nCatégorie 4 — Causes liées à la demande\n\nHausse soudaine et imprévue de la demande\n\nAugmentation structurelle de la demande non détectée\n\nLivraison partielle\n"
      },
      {
        "id": "gas-m11-c6",
        "title": "Causes et conséquences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et conséquences des ruptures de stock\n\nLes causes des ruptures de stock\n\nCatégorie 5 — Causes liées à la gestion physique du stock\n\nPertes physiques non enregistrées\n\nMauvaise organisation physique\n"
      },
      {
        "id": "gas-m11-c7",
        "title": "Causes et conséquences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et conséquences des ruptures de stock\n\nLes conséquences des ruptures de stock\n\nNiveau 1 — Conséquences sanitaires\n\nInterruption de traitements en cours\n\nÉchec thérapeutique et résistances\n\nRecours à des alternatives moins efficaces ou plus dangereuses\n\nMortalité évitable\n\nNiveau 2 — Conséquences organisationnelles\n\nPerte de confiance des patients et des soignants\n\nSurcharge administrative liée aux commandes d'urgence\n\nDégradation des indicateurs de performance\n"
      },
      {
        "id": "gas-m11-c8",
        "title": "Causes et conséquences des ruptures de stock",
        "type": "text",
        "duration": "10 min",
        "content": "#### Causes et conséquences des ruptures de stock\n\nLes conséquences des ruptures de stock\n\nNiveau 3 — Conséquences financières\n\nSurcoût des commandes d'urgence\n\nPerte de recettes\n\nGaspillage lié aux produits substitués puis non utilisés\n"
      },
      {
        "id": "gas-m11-c9",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nPrévenir une rupture coûte toujours moins cher que la gérer.\n\nMais même avec les meilleures mesures préventives, certaines ruptures surviennent malgré tout, souvent pour des raisons extérieures au contrôle du gestionnaire.\n\nIl faut donc maîtriser deux registres complémentaires :\n\nles stratégies préventives, qui réduisent la probabilité et la fréquence des ruptures et\n\nles stratégies curatives, qui minimisent leur durée et leur impact quand elles surviennent malgré tout.\n\nUn gestionnaire compétent ne se contente pas de subir les ruptures. Il les anticipe, les détecte tôt et réagit vite avec des mesures adaptées.\n"
      },
      {
        "id": "gas-m11-c10",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 1 — Maintenir une CMM fiable et à jour\n\nC'est la base de tout.\n\nUne CMM fiable est le meilleur rempart contre les ruptures liées à une mauvaise quantification.\n\nActions concrètes :\n\nRéviser la CMM tous les trimestres sans exception.\n\nEnregistrer systématiquement toutes les sorties de stock dès qu'elles ont lieu.\n\nAjuster la CMM dès qu'un changement structurel est détecté (nouveau service, nouveau protocole, évolution de la population).\n"
      },
      {
        "id": "gas-m11-c11",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 2 — Dimensionner correctement le stock de sécurité\n\nUn stock de sécurité bien calibré est le filet de protection contre les aléas.\n\nTrop faible, il ne protège pas.\n\nTrop élevé, il immobilise des ressources inutilement.\n"
      },
      {
        "id": "gas-m11-c12",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 3 — Respecter rigoureusement le calendrier de commande\n\nLa commande tardive est une cause majeure de rupture évitable.\n\nElle doit être éliminée par la discipline et l'organisation.\n\nActions concrètes :\n\nDéfinir des dates fixes de commande dans un calendrier annuel affiché et connu de tous.\n\nCréer des alertes visuelles dans le registre ou le système informatique.\n\nVérifier le stock de chaque produit critique au moins deux fois par mois.\n"
      },
      {
        "id": "gas-m11-c13",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 4 — Diversifier les sources d'approvisionnement\n\nDépendre d'un seul fournisseur pour un produit essentiel est un facteur de risque majeur.\n\nLa diversification réduit l'exposition aux défaillances d'un fournisseur unique.\n\nActions concrètes :\n\nIdentifier et qualifier au minimum deux fournisseurs pour chaque produit essentiel.\n\nRépartir les commandes entre les fournisseurs pour maintenir la relation commerciale active avec chacun.\n\nNe jamais dépasser 70 à 80% des commandes chez un seul fournisseur pour les produits critiques.\n"
      },
      {
        "id": "gas-m11-c14",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 5 — Mettre en place un système de surveillance précoce\n\nDétecter la tendance à la rupture avant qu'elle ne se produise permet d'intervenir à temps.\n\nActions concrètes :\n\nCalculer mensuellement le taux de couverture de chaque produit.\n\nDéfinir des seuils d'alerte à deux niveaux : alerte jaune et alerte rouge.\n"
      },
      {
        "id": "gas-m11-c15",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 6 — Conduire des inventaires réguliers\n\nLes inventaires réguliers permettent de détecter les écarts entre stock théorique et stock réel avant qu'ils ne deviennent critiques.\n"
      },
      {
        "id": "gas-m11-c16",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 1 — Déclarer et évaluer la rupture\n\nÉvaluer la criticité du produit :\n\nÉvaluer la durée prévisionnelle de la rupture :\n\nDurée de rupture estimée = Délai avant prochaine livraison − Couverture du stock résiduel\n"
      },
      {
        "id": "gas-m11-c17",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 2 — Alerter la hiérarchie et les partenaires\n\nToute rupture avérée ou imminente sur un produit essentiel doit être signalée immédiatement au niveau hiérarchique supérieur.\n\nCe signalement doit être :\n\nÉcrit (email, rapport, formulaire standardisé)\n\nFactuel (produit concerné, stock résiduel, durée estimée, nombre de patients potentiellement affectés)\n\nAccompagné d'une proposition de solution\n"
      },
      {
        "id": "gas-m11-c18",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 3 — Activer les sources d'approvisionnement d'urgence\n\nOption 1 — Redistribution inter-sites (la plus rapide et la moins coûteuse)\n\nIdentifier les sites disposant d'un excédent du produit manquant et organiser un transfert.\n\nOption 2 — Commande urgente auprès du fournisseur alternatif\n\nSi la redistribution inter-sites est insuffisante ou impossible.\n\nOption 3 — Achat en pharmacie privée (dernier recours)\n\nPour les cas extrêmes où les autres options ne sont pas disponibles assez rapidement.\n\nLe coût est généralement très élevé mais peut être justifié pour des produits vitaux.\n"
      },
      {
        "id": "gas-m11-c19",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 4 — Gérer la distribution pendant la rupture\n\nQuand le stock résiduel est limité et qu'une rupture partielle est inévitable, le gestionnaire doit rationner la distribution de façon équitable et médicalement justifiée.\n\nPrincipes de rationnement :\n\nPrioriser les patients déjà en cours de traitement sur les nouveaux cas.\n\nPrioriser les cas les plus sévères sur les cas légers.\n\nInformer les prescripteurs immédiatement pour qu'ils adaptent leurs prescriptions (doses réduites si médicalement acceptable, substituts thérapeutiques).\n"
      },
      {
        "id": "gas-m11-c20",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 5 — Analyser les causes et mettre en place des mesures correctives\n\nUne fois la rupture résolue, une analyse des causes doit être conduite pour éviter la récurrence. C'est l'étape la plus souvent négligée mais la plus importante pour progresser.\n"
      },
      {
        "id": "gas-m11-c21",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nPrévenir une rupture coûte toujours moins cher que la gérer.\n\nMais même avec les meilleures mesures préventives, certaines ruptures surviennent malgré tout, souvent pour des raisons extérieures au contrôle du gestionnaire.\n\nIl faut donc maîtriser deux registres complémentaires :\n\nles stratégies préventives, qui réduisent la probabilité et la fréquence des ruptures et\n\nles stratégies curatives, qui minimisent leur durée et leur impact quand elles surviennent malgré tout.\n\nUn gestionnaire compétent ne se contente pas de subir les ruptures. Il les anticipe, les détecte tôt et réagit vite avec des mesures adaptées.\n"
      },
      {
        "id": "gas-m11-c22",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 1 — Maintenir une CMM fiable et à jour\n\nC'est la base de tout. Une CMM fiable est le meilleur rempart contre les ruptures liées à une mauvaise quantification.\n\nActions concrètes :\n\nRéviser la CMM tous les trimestres sans exception.\n\nEnregistrer systématiquement toutes les sorties de stock dès qu'elles ont lieu.\n\nAjuster la CMM dès qu'un changement structurel est détecté (nouveau service, nouveau protocole, évolution de la population).\n"
      },
      {
        "id": "gas-m11-c23",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 2 — Dimensionner correctement le stock de sécurité\n\nUn stock de sécurité bien calibré est le filet de protection contre les aléas.\n\nTrop faible, il ne protège pas.\n\nTrop élevé, il immobilise des ressources inutilement.\n"
      },
      {
        "id": "gas-m11-c24",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 3 — Respecter rigoureusement le calendrier de commande\n\nLa commande tardive est une cause majeure de rupture évitable. Elle doit être éliminée par la discipline et l'organisation.\n\nActions concrètes :\n\nDéfinir des dates fixes de commande dans un calendrier annuel affiché et connu de tous.\n\nCréer des alertes visuelles dans le registre ou le système informatique.\n\nVérifier le stock de chaque produit critique au moins deux fois par mois.\n"
      },
      {
        "id": "gas-m11-c25",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 4 — Diversifier les sources d'approvisionnement\n\nDépendre d'un seul fournisseur pour un produit essentiel est un facteur de risque majeur. La diversification réduit l'exposition aux défaillances d'un fournisseur unique.\n\nActions concrètes :\n\nIdentifier et qualifier au minimum deux fournisseurs pour chaque produit essentiel.\n\nRépartir les commandes entre les fournisseurs pour maintenir la relation commerciale active avec chacun.\n\nNe jamais dépasser 70 à 80% des commandes chez un seul fournisseur pour les produits critiques.\n"
      },
      {
        "id": "gas-m11-c26",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 5 — Mettre en place un système de surveillance précoce\n\nDétecter la tendance à la rupture avant qu'elle ne se produise permet d'intervenir à temps.\n\nActions concrètes :\n\nCalculer mensuellement le taux de couverture de chaque produit.\n\nDéfinir des seuils d'alerte à deux niveaux : alerte jaune et alerte rouge.\n"
      },
      {
        "id": "gas-m11-c27",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de prévention des ruptures\n\nStratégie 6 — Conduire des inventaires réguliers\n\nLes inventaires réguliers permettent de détecter les écarts entre stock théorique et stock réel avant qu'ils ne deviennent critiques.\n"
      },
      {
        "id": "gas-m11-c28",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 1 — Déclarer et évaluer la rupture\n\nDès qu'une rupture est constatée ou imminente, le gestionnaire doit immédiatement :\n\nÉvaluer la criticité du produit\n\nÉvaluer la durée prévisionnelle de la rupture\n\nÉtape 2 — Alerter la hiérarchie et les partenaires\n\nToute rupture avérée ou imminente sur un produit essentiel doit être signalée immédiatement au niveau hiérarchique supérieur.\n\nCe signalement doit être :\n\nÉcrit (email, rapport, formulaire standardisé)\n\nFactuel (produit concerné, stock résiduel, durée estimée, nombre de patients potentiellement affectés)\n\nAccompagné d'une proposition de solution\n"
      },
      {
        "id": "gas-m11-c29",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 3 — Activer les sources d'approvisionnement d'urgence\n\nOption 1 — Redistribution inter-sites (la plus rapide et la moins coûteuse)\n\nOption 2 — Commande urgente auprès du fournisseur alternatif\n\nOption 3 — Achat en pharmacie privée (dernier recours)\n"
      },
      {
        "id": "gas-m11-c30",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 4 — Gérer la distribution pendant la rupture\n\nQuand le stock résiduel est limité et qu'une rupture partielle est inévitable, le gestionnaire doit rationner la distribution de façon équitable et médicalement justifiée.\n\nPrincipes de rationnement :\n\nPrioriser les patients déjà en cours de traitement sur les nouveaux cas.\n\nPrioriser les cas les plus sévères sur les cas légers.\n\nInformer les prescripteurs immédiatement pour qu'ils adaptent leurs prescriptions (doses réduites si médicalement acceptable, substituts thérapeutiques).\n"
      },
      {
        "id": "gas-m11-c31",
        "title": "Stratégies de prévention et de gestion des ruptures",
        "type": "text",
        "duration": "10 min",
        "content": "#### Stratégies de prévention et de gestion des ruptures\n\nStratégies de prévention et de gestion des ruptures\n\nStratégies de gestion des ruptures avérées\n\nÉtape 5 — Analyser les causes et mettre en place des mesures correctives\n\nUne fois la rupture résolue, une analyse des causes doit être conduite pour éviter la récurrence. C'est l'étape la plus souvent négligée mais la plus importante pour progresser.\n"
      },
      {
        "id": "gas-m11-c32",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nLe surstock est souvent perçu comme un problème mineur comparé à la rupture. Cette perception est erronée.\n\nUn surstock non traité coûte de l'argent, occupe de l'espace, immobilise des ressources qui auraient pu financer d'autres produits, et finit fréquemment par se transformer en péremption, c'est-à-dire en perte sèche.\n\nDans certains systèmes de santé, jusqu'à 10 à 15% de la valeur des produits pharmaceutiques sont perdus chaque année par péremption, soit des dizaines de millions de francs CFA gaspillés.\n\nL'identification précoce et le traitement rapide des surstocks sont donc des actes de gestion à part entière, aussi importants que la prévention des ruptures.\n"
      },
      {
        "id": "gas-m11-c33",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nDéfinition opérationnelle\n\nUn surstock existe quand le stock disponible d'un produit dépasse le stock maximum défini. Mais en pratique, on distingue plusieurs degrés de surstock selon leur urgence de traitement\n"
      },
      {
        "id": "gas-m11-c34",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 1 — L'analyse mensuelle du taux de couverture\n\nLe taux de couverture est le premier signal d'alerte d'un surstock. Tout produit avec un taux de couverture supérieur à la durée stock max doit être examiné.\n"
      },
      {
        "id": "gas-m11-c35",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 2 — L'analyse ABC-VEN croisée\n\nL'analyse ABC classe les produits par valeur financière. L'analyse VEN les classe par importance médicale (Vital, Essentiel, Non essentiel). Croisées, elles permettent de prioriser les actions sur les surstocks.\n\nAnalyse ABC :\n\nCatégorie A : 20% des produits représentant 80% de la valeur totale du stock\n\nCatégorie B : 30% des produits représentant 15% de la valeur\n\nCatégorie C : 50% des produits représentant 5% de la valeur\n\nAnalyse VEN :\n\nV (Vital) : produit dont l'absence entraîne un risque immédiat pour la vie du patient\n\nE (Essentiel) : produit important mais dont l'absence n'est pas immédiatement mortelle\n\nN (Non essentiel) : produit dont l'absence ne met pas en danger la vie du patient\n"
      },
      {
        "id": "gas-m11-c36",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 2 — L'analyse ABC-VEN croisée\n\nMatrice de priorité pour le traitement des surstocks\n"
      },
      {
        "id": "gas-m11-c37",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nLes outils d'identification des surstocks\n\nOutil 3 — La liste des produits proches de péremption\n\nUn produit qui périme dans moins de 6 mois doit automatiquement être considéré comme un surstock à traiter, même si son niveau de stock ne dépasse pas le stock max.\n"
      },
      {
        "id": "gas-m11-c38",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nCauses des surstocks\n"
      },
      {
        "id": "gas-m11-c39",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 1 — Suspension des commandes\n\nC'est la mesure la plus simple et la première à appliquer. Elle ne résout pas le surstock existant mais empêche son aggravation.\n\nRègle : ne jamais commander un produit dont la couverture dépasse le stock max, sauf en cas de contexte exceptionnel documenté.\n"
      },
      {
        "id": "gas-m11-c40",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 2 — Redistribution inter-sites\n\nTransférer l'excédent vers des sites en rupture ou à stock bas sur le même produit. C'est la solution la plus rapide, la moins coûteuse et la plus utile d'un point de vue sanitaire.\n\nProcessus de redistribution :\n\nÉtape 1 : Identifier les sites déficitaires sur le même produit via le rapport mensuel ou un contact direct.\n\nÉtape 2 : Calculer la quantité redistribuable sans mettre le site donneur en danger.\n\nÉtape 3 : Obtenir l'autorisation du niveau hiérarchique supérieur.\n\nÉtape 4 : Préparer les documents de transfert (bon de transfert, fiche de stock des deux sites).\n\nÉtape 5 : Assurer le transport dans de bonnes conditions.\n\nÉtape 6 : Mettre à jour les fiches de stock des deux sites.\n"
      },
      {
        "id": "gas-m11-c41",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 3 — Retour au fournisseur ou au niveau supérieur\n\nQuand la redistribution inter-sites ne suffit pas, les produits excédentaires peuvent être retournés au fournisseur ou au niveau hiérarchique supérieur (dépôt régional, centrale d'achat) qui peut les redistribuer à plus grande échelle.\n\nConditions pour un retour fournisseur :\n\nLes produits sont encore dans leur emballage d'origine, non ouverts\n\nLa date de péremption est suffisamment éloignée (généralement > 12 mois)\n\nLe contrat avec le fournisseur prévoit une clause de retour\n\nL'autorisation du niveau hiérarchique supérieur est obtenue\n"
      },
      {
        "id": "gas-m11-c42",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 4 — Accélération de la consommation\n\nPour certains produits non critiques disponibles en excès, il est possible d'augmenter la vitesse d'écoulement du stock en intensifiant les activités qui consomment ce produit.\n\nActions possibles :\n\nIntensifier les activités de prévention (journées de sensibilisation, distribution communautaire)\n\nPartager l'information avec les prescripteurs pour favoriser la prescription du produit en excès quand il est médicalement approprié\n\nOrganiser des séances de distribution de masse pour les produits dont la distribution est possible (Vitamine A, moustiquaires, SRO)\n"
      },
      {
        "id": "gas-m11-c43",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 5 — Don à une autre structure\n\nQuand le retour au fournisseur est impossible et que la redistribution inter-sites dans le même système ne suffit pas, un don à une structure partenaire (ONG, structure privée à but non lucratif, camp de réfugiés) peut permettre d'utiliser les produits plutôt que de les détruire.\n\nConditions :\n\nAutorisation obligatoire du niveau hiérarchique supérieur et de la direction de la pharmacie\n\nLa structure bénéficiaire doit être habilitée à recevoir et gérer des produits pharmaceutiques\n\nLes produits doivent être en bon état et avoir une date de péremption suffisante\n\nUn bon de don formalisé doit être établi et signé par les deux parties\n"
      },
      {
        "id": "gas-m11-c44",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 6 — Destruction réglementaire\n\nQuand aucune autre option n'est possible (produits périmés, endommagés, non conformes, irrécupérables), la destruction est la seule solution. Elle doit être réalisée selon des procédures strictes pour protéger l'environnement et la santé publique.\n\nProcédure de destruction :\n\nÉtape 1 — Constitution du dossier de destruction\n\nListe complète des produits à détruire (désignation, lot, quantité, valeur, raison)\n\nAutorisation du niveau hiérarchique supérieur\n\nPrésence d'au moins deux témoins (médecin chef, inspecteur de pharmacie)\n"
      },
      {
        "id": "gas-m11-c45",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 6 — Destruction réglementaire\n\nProcédure de destruction :\n\nÉtape 2 — Méthode de destruction selon le type de produit\n\nJamais : jeter dans une décharge à ciel ouvert, enterrer sans neutralisation, brûler à l'air libre (risque toxique)\n"
      },
      {
        "id": "gas-m11-c46",
        "title": "Identification et traitement des surstocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Identification et traitement des surstocks\n\nStratégies de prévention et de gestion des ruptures\n\nOptions de traitement des surstocks\n\nOption 6 — Destruction réglementaire\n\nProcédure de destruction :\n\nÉtape 3 — Documentation\n\nProcès-verbal de destruction signé par tous les témoins présents\n\nMise à jour des fiches de stock (sortie pour destruction)\n\nConservation du PV pendant au moins 5 ans\n"
      },
      {
        "id": "gas-m11-c47",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nUn plan de contingence est un dispositif préparé à l'avance pour répondre à des situations exceptionnelles qui perturbent le fonctionnement normal de la chaîne d'approvisionnement.\n\nIl répond à une logique simple :\n\nles crises ne s'improvisent pas.\n\nUne pharmacie qui attend qu'une épidémie éclate pour réfléchir à comment s'approvisionner en urgence perdra un temps précieux, paiera des prix excessifs et mettra des vies en danger.\n\nUne pharmacie qui a anticipé ces scénarios dispose de réponses prêtes à être activées immédiatement.\n\nLa différence entre les deux peut se mesurer en vies sauvées.\n"
      },
      {
        "id": "gas-m11-c48",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nStratégies de prévention et de gestion des ruptures\n\nCatégorie 1 — Crises liées à la demande\n"
      },
      {
        "id": "gas-m11-c49",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nStratégies de prévention et de gestion des ruptures\n\nCatégorie 2 — Crises liées à l'approvisionnement\n"
      },
      {
        "id": "gas-m11-c50",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nStratégies de prévention et de gestion des ruptures\n\nCatégorie 3 — Crises liées à la structure elle-même\n"
      },
      {
        "id": "gas-m11-c51",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nStructure d'un plan de contingence\n\nComposante 1 — Identification des produits critiques\n\nTous les produits ne nécessitent pas le même niveau de préparation d'urgence.\n\nLe plan de contingence doit se concentrer en priorité sur les produits dont la rupture a les conséquences sanitaires les plus graves.\n\nMéthode de priorisation — Matrice de criticité\n\nComposante 2 — Stock de contingence dédié\n\nPour les produits critiques, un stock de contingence supplémentaire est constitué et maintenu en dehors du stock de routine.\n\nIl ne doit être utilisé qu'en cas de déclenchement officiel du plan de contingence.\n\nStock de contingence = CMM × Durée estimée de la crise la plus probable\n"
      },
      {
        "id": "gas-m11-c52",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nStructure d'un plan de contingence\n\nComposante 3 — Liste des fournisseurs d'urgence\n\nPour chaque produit critique, une liste de fournisseurs d'urgence homologués doit être préparée à l'avance, avec toutes les informations nécessaires pour passer une commande immédiatement.\n\nRègle de mise à jour :\n\nLes fiches fournisseurs d'urgence doivent être vérifiées et mises à jour tous les 6 mois minimum.\n\nUn contact téléphonique de vérification suffit.\n\nUn fournisseur d'urgence dont les informations sont obsolètes est un fournisseur inutilisable au moment de la crise.\n"
      },
      {
        "id": "gas-m11-c53",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nStructure d'un plan de contingence\n\nComposante 4 — Procédures d'activation du plan\n\nLe plan de contingence ne doit pas rester un document théorique. Il doit définir précisément les conditions de son déclenchement, les étapes à suivre et les responsabilités de chacun.\n\nCritères de déclenchement du plan :\n"
      },
      {
        "id": "gas-m11-c54",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nProcédures d'urgence spécifiques\n\nProcédure d'urgence 1 — Rappel de lot (retrait de produits du marché)\n\nUn rappel de lot survient quand l'autorité de réglementation pharmaceutique ou le fabricant ordonne le retrait d'un lot spécifique de médicaments en raison d'un problème de qualité détecté (contamination, mauvais dosage, emballage défectueux).\n\nProcédure :\n\nÉtape 1 — Réception de l'alerte de rappel :\n\nL'alerte peut venir de la Direction de la Pharmacie, de la DRS, du fournisseur ou de l'OMS.\n\nElle précise le nom du produit, le numéro de lot concerné et la raison du rappel.\n\nÉtape 2 — Identification et mise en quarantaine immédiate :\n\nVérifier dans le stock si des unités du lot concerné sont présentes.\n\nToute unité identifiée doit être immédiatement retirée du stock et placée en quarantaine (zone séparée, étiquetée \"QUARANTAINE — NE PAS UTILISER\").\n"
      },
      {
        "id": "gas-m11-c55",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nProcédures d'urgence spécifiques\n\nProcédure d'urgence 1 — Rappel de lot (retrait de produits du marché)\n\nProcédure :\n\nÉtape 3 — Vérification des distributions passées :\n\nVérifier dans le registre si des unités du lot rappelé ont déjà été distribuées.\n\nSi oui, identifier les patients ou structures ayant reçu ces unités et les notifier selon les instructions de l'alerte.\n\nÉtape 4 — Notification et rapport :\n\nNotifier immédiatement la DRS et la Direction de la Pharmacie.\n\nEnvoyer un rapport précisant les quantités identifiées, les quantités déjà distribuées, et les actions prises.\n\nÉtape 5 — Retour ou destruction :\n\nSelon les instructions de l'alerte, retourner les produits au fournisseur ou à la Direction de la Pharmacie, ou procéder à la destruction selon le protocole réglementaire.\n"
      },
      {
        "id": "gas-m11-c56",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nProcédures d'urgence spécifiques\n\nProcédure d'urgence 2 — Incendie ou inondation du dépôt\n\nProcédure :\n\nImmédiatement (dans l'heure) :\n\n☐ Mettre le personnel en sécurité\n\n☐ Alerter les secours (pompiers, police)\n\n☐ Sécuriser les documents (registres, fiches de stock) si possible sans danger\n\n☐ Notifier le médecin chef et la DRS\n\nImmédiatement (dans l'heure) :\n\n☐ Évaluer l'étendue des dégâts (produits sauvés vs produits détruits)\n\n☐ Trier les produits sauvés : conformes vs endommagés (chaleur, humidité) → mise en quarantaine des produits douteux\n\n☐ Constituer un stock d'urgence minimum à partir des produits sauvés conformes\n\n☐ Envoyer une demande d'approvisionnement d'urgence au niveau supérieur\n\n☐ Établir un rapport de pertes pour les assurances et la comptabilité\n"
      },
      {
        "id": "gas-m11-c57",
        "title": "Plans de contingence et procédures d'urgence",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plans de contingence et procédures d'urgence\n\nProcédures d'urgence spécifiques\n\nProcédure d'urgence 3 — Départ soudain du gestionnaire\n\nProcédure :\n\nPréparation (avant toute crise) :\n\n☐ Identifier et former un gestionnaire remplaçant capable d'assurer les tâches critiques\n\n☐ Tenir les documents de stock à jour et accessibles au remplaçant\n\n☐ Documenter les contacts fournisseurs et les procédures dans un manuel accessible\n\n☐ Organiser un inventaire trimestriel cosigné par le gestionnaire et son remplaçant\n\nEn cas de départ soudain :\n\n☐ Passation de service avec inventaire complet dans les 48 heures\n\n☐ Le remplaçant prend en charge les commandes en cours et les alertes de stock\n\n☐ La hiérarchie est notifiée pour validation des premières commandes du remplaçant\n"
      },
      {
        "id": "gas-m11-c58",
        "title": "Systèmes d'inventaire et outils digitaux",
        "type": "text",
        "duration": "10 min",
        "content": "#### Systèmes d'inventaire et outils digitaux\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      },
      {
        "id": "gas-m11-c59",
        "title": "Plan",
        "type": "text",
        "duration": "10 min",
        "content": "#### Plan\n\nTypes d'inventaires (permanent, périodique, tournant)\n\nProcédures de comptage et de réconciliation\n\nOutils digitaux de gestion des stocks (logiciels, applications mobiles)\n"
      },
      {
        "id": "gas-m11-c60",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire est l'acte par lequel on vérifie que ce qui est dans le registre ou le système informatique correspond à ce qui est physiquement présent dans le dépôt.\n\nC'est une opération de contrôle fondamentale qui conditionne la fiabilité de toutes les décisions de gestion.\n\nUn gestionnaire qui ne fait pas d'inventaire régulier travaille sur des données dont il ne peut pas garantir l'exactitude. Il commande peut-être trop, peut-être trop peu, distribue peut-être des produits qui n'existent plus physiquement, ou ignore des produits qui dorment dans un coin du dépôt.\n\nLes trois types d'inventaires — permanent, périodique et tournant — répondent à des logiques différentes et se complètent. Les connaître permet de choisir le système le plus adapté au contexte de chaque structure.\n"
      },
      {
        "id": "gas-m11-c61",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire permanent\n\nDéfinition\n\nL'inventaire permanent, aussi appelé inventaire continu, est un système dans lequel le stock théorique est mis à jour en temps réel à chaque mouvement de produit, entrée ou sortie.\n\nÀ tout moment, le gestionnaire peut consulter le stock théorique sans avoir besoin de compter physiquement les produits.\n\nPrincipe de fonctionnement : Stock théorique au temps T = Stock initial + Total des entrées − Total des sorties (depuis le stock initial)\n\nChaque entrée (réception de livraison) et chaque sortie (distribution, transfert, perte) est immédiatement enregistrée sur la fiche de stock ou dans le logiciel.\n\nLe stock théorique est donc toujours à jour.\n"
      },
      {
        "id": "gas-m11-c62",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire permanent\n\nCe que l'inventaire permanent permet :\n\nConnaître à tout moment le stock théorique sans compter physiquement\n\nDétecter immédiatement toute anomalie (sortie sans justificatif)\n\nCalculer automatiquement la CMM à partir des sorties enregistrées\n\nDéclencher les alertes de stock min en temps réel\n\nLimites de l'inventaire permanent :\n\nExige un enregistrement rigoureux et immédiat de chaque mouvement\n\nSi un mouvement est oublié ou mal enregistré, l'écart s'accumule sans être détecté\n\nNe remplace pas le comptage physique périodique\n"
      },
      {
        "id": "gas-m11-c63",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire permanent\n\nConditions de réussite de l'inventaire permanent\n"
      },
      {
        "id": "gas-m11-c64",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire périodique\n\nDéfinition\n\nL'inventaire périodique est un système dans lequel le stock n'est pas suivi en continu mais compté physiquement à intervalles réguliers et prédéfinis.\n\nEntre deux inventaires, le gestionnaire ne dispose pas nécessairement d'un stock théorique fiable.\n\nL'inventaire périodique est souvent utilisé dans les structures avec des ressources limitées ou un volume de produits important.\n\nFréquences habituelles :\n"
      },
      {
        "id": "gas-m11-c65",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire périodique\n\nProcédure d'inventaire périodique\n\nAvant l'inventaire :\n\n☐ Fixer la date à l'avance et la communiquer au personnel\n\n☐ Suspendre tous les mouvements de stock 2 heures avant le début\n\n☐ Préparer les formulaires de comptage (un formulaire par produit ou par zone)\n\n☐ Constituer les équipes de comptage (2 personnes minimum par équipe : un qui compte, un qui enregistre)\n\n☐ S'assurer que les registres et fiches de stock sont à jour jusqu'à la veille\n"
      },
      {
        "id": "gas-m11-c66",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire périodique\n\nProcédure d'inventaire périodique\n\nPendant l'inventaire :\n\n☐ Chaque équipe compte sa zone sans connaître le stock théorique (pour éviter les biais)\n\n☐ Comptage physique unité par unité, boîte par boîte\n\n☐ Enregistrement immédiat de chaque comptage sur le formulaire\n\n☐ Double-comptage obligatoire pour les produits à forte valeur ou les écarts suspects\n\n☐ Identification et séparation physique des produits périmés, endommagés, en quarantaine\n"
      },
      {
        "id": "gas-m11-c67",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire périodique\n\nProcédure d'inventaire périodique\n\nAprès l'inventaire :\n\n☐ Comparaison entre stock physique compté et stock théorique\n\n☐ Calcul des écarts\n\n☐ Investigation des écarts significatifs\n\n☐ Mise à jour des fiches de stock avec le stock physique réel\n\n☐ Rédaction du rapport d'inventaire\n"
      },
      {
        "id": "gas-m11-c68",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nDifférences entre inventaire permanent et périodique\n"
      },
      {
        "id": "gas-m11-c69",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire tournant\n\nDéfinition\n\nL'inventaire tournant est un système dans lequel l'ensemble du stock est divisé en segments (par zone, par famille de produits, ou par ordre alphabétique), et chaque segment est compté à tour de rôle selon un calendrier prédéfini.\n\nÀ tout moment de l'année, une partie du stock a été récemment vérifiée.\n\nSur une période de 12 mois, l'intégralité du stock est passée en revue plusieurs fois.\n\nPrincipe : Au lieu de tout compter en une seule fois (comme pour l'inventaire périodique), on compte un peu chaque semaine ou chaque mois, de façon continue et rotative.\n"
      },
      {
        "id": "gas-m11-c70",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire tournant\n\nAvantages de l'inventaire tournant\n\nAvantage 1 — Détection rapide des écarts : Un écart sera détecté au plus tard 4 semaines après sa survenue (au prochain comptage du Groupe A), alors qu'avec un inventaire semestriel il pourrait rester invisible pendant 6 mois.\n\nAvantage 2 — Charge de travail répartie : L'inventaire tournant ne mobilise jamais l'ensemble du personnel en même temps. Chaque semaine, seulement peu de produits sont comptés, ce qui prend environ 1 à 2 heures au lieu de la journée entière qu'exige un inventaire complet.\n\nAvantage 3 — Maintien continu de la fiabilité des données : Avec l'inventaire tournant, les données de stock des produits récemment comptés sont fiables à tout moment.\n"
      },
      {
        "id": "gas-m11-c71",
        "title": "Types d'inventaires (permanent, périodique, tournant)",
        "type": "text",
        "duration": "10 min",
        "content": "#### Types d'inventaires (permanent, périodique, tournant)\n\nL'inventaire de passation de service\n\nUn type d'inventaire particulier mérite une mention spéciale : l'inventaire de passation de service. Il est réalisé à chaque changement de gestionnaire et protège à la fois le gestionnaire sortant (il n'est pas tenu responsable de pertes survenues après son départ) et le gestionnaire entrant (il sait exactement ce qu'il prend en charge).\n\nProcédure :\n\n☐ Comptage physique complet de tous les produits en présence des deux gestionnaires\n\n☐ Vérification de tous les documents (registres, bons de commande en cours, fiches de stock)\n\n☐ Inventaire des équipements et du matériel\n\n☐ Rédaction d'un procès-verbal de passation cosigné par les deux gestionnaires et le médecin chef\n\n☐ Conservation d'une copie par chaque partie\n"
      },
      {
        "id": "gas-m11-c72",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nCompter un stock semble être une opération simple. Dans la pratique, c'est une procédure exigeante qui, mal conduite, produit des résultats aussi peu fiables que l'absence de comptage. Un mauvais comptage donne l'illusion de la maîtrise sans en avoir la réalité.\n\nLes erreurs de comptage — produits oubliés, doubles comptages, mauvaise lecture des quantités, influence du stock théorique sur le comptage — sont nombreuses et courantes.\n\nLa réconciliation, quant à elle, est l'étape qui suit le comptage et qui consiste à comparer le stock physique obtenu avec le stock théorique, analyser les écarts, en comprendre les causes et corriger les données.\n\nEnsemble, comptage et réconciliation forment le cœur du processus d'inventaire.\n"
      },
      {
        "id": "gas-m11-c73",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nPréparation du comptage\n\nPrincipe : Le dépôt doit être organisé de façon à rendre le comptage systématique et exhaustif. Chaque produit doit avoir une place définie et connue. Les produits de statuts différents doivent être physiquement séparés avant le comptage.\n\nActions préparatoires :\n\n☐ Regrouper tous les produits de même type au même endroit (si ce n'est pas déjà le cas)\n\n☐ Séparer physiquement les produits de statuts différents :\n\nZone de stock actif : produits disponibles à la distribution\n\nZone de quarantaine : produits suspects, en attente de décision\n\nZone de périmés : produits hors d'usage, en attente de destruction\n\n☐ Étiqueter chaque zone clairement\n\n☐ Vérifier que tous les produits sont accessibles (rien derrière des palettes inaccessibles, rien sous des étagères sans visibilité)\n\nOrganisation de l'espace\n"
      },
      {
        "id": "gas-m11-c74",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nPrincipe du double comptage : Chaque produit doit être compté par au moins deux personnes différentes, indépendamment l'une de l'autre. Les résultats sont comparés. En cas de divergence, un troisième comptage est effectué..\n\nComposition recommandée des équipes :\n\nRègle absolue : Le compteur ne doit pas connaître le stock théorique avant de compter\n\nPréparation du comptage\n\nConstitution des équipes de comptage\n"
      },
      {
        "id": "gas-m11-c75",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nUn formulaire de comptage bien conçu facilite le travail et réduit les erreurs. Il doit être préparé à l'avance et distribué aux équipes avant le début du comptage.\n\nPréparation du comptage\n\nPréparation des formulaires de comptage\n"
      },
      {
        "id": "gas-m11-c76",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nMéthodes de comptage\n\nC'est la méthode la plus précise. Chaque unité (comprimé, ampoule, flacon, sachet) est comptée individuellement.\n\nQuand l'utiliser :\n\nProduits à forte valeur unitaire (insuline, vaccins, ARV)\n\nProduits avec des écarts fréquents\n\nProduits en petite quantité (moins de 500 unités)\n\nTechnique : Regrouper les unités par paquets de 10 ou de 100 pour faciliter le comptage.\n\nComptage par unités\n"
      },
      {
        "id": "gas-m11-c77",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nMéthodes de comptage\n\nPour les produits en grandes quantités et dont les conditionnements sont scellés et inviolés, on peut compter les boîtes et multiplier par leur contenu.\n\nQuand l'utiliser :\n\nProduits en grandes quantités (> 1 000 unités)\n\nConditionnements scellés, non ouverts, avec contenu vérifié à la réception\n\nRègle de précaution :\n\nOuvrir et vérifier un échantillon aléatoire de boîtes pour s'assurer que le contenu correspond bien à la quantité indiquée sur l'étiquette.\n\nNe jamais compter les boîtes sans vérification d'un échantillon.\n\nComptage par conditionnements intacts\n"
      },
      {
        "id": "gas-m11-c78",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nMéthodes de comptage\n\nCertains produits (poudres, coton, certains consommables) peuvent être pesés et convertis en unités sur la base d'un poids unitaire établi.\n\nComptage par pesée (pour les produits en vrac)\n\nPour les produits pharmaceutiques, il est indispensable de comptabiliser séparément chaque lot avec sa date de péremption. Cela permet de détecter les produits proches de péremption et d'appliquer le FEFO lors de la distribution.\n\nComptage par lot et par date de péremption\n"
      },
      {
        "id": "gas-m11-c79",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nLa réconciliation des stocks\n\nFormule : Écart = Stock physique − Stock théorique\n\nClassification des écarts\n\nCalcul des écarts\n"
      },
      {
        "id": "gas-m11-c80",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nLa réconciliation des stocks\n\nInvestigation des écarts\n\nÉtape 1 — Vérifier le comptage : Avant de conclure à un écart réel, s'assurer que le comptage a été correctement effectué. Un recomptage s'impose pour tout écart significatif.\n\nÉtape 2 — Vérifier les documents de la période : Examiner tous les bons de sortie, bons de réception, bons de transfert et documents de perte de la période couverte par l'inventaire.\n\nÉtape 3 — Identifier les mouvements non documentés : Interroger le personnel sur les mouvements de produits qui pourraient ne pas avoir été enregistrés.\n\nÉtape 4 — Analyser l'écart résiduel inexpliqué\n\nÉtape 5 — Mesures correctives : Sur la base de l'investigation, des mesures correctives sont définies et documentées.\n\nCalcul des écarts\n"
      },
      {
        "id": "gas-m11-c81",
        "title": "Procédures de comptage et de réconciliation",
        "type": "text",
        "duration": "10 min",
        "content": "#### Procédures de comptage et de réconciliation\n\nLa réconciliation des stocks\n\nUne fois l'investigation terminée, les fiches de stock et le registre sont mis à jour avec le stock physique réel issu du comptage.\n\nProcédure de correction :\n\nNe jamais rayer ou effacer l'ancienne valeur dans le registre.\n\nTirer un trait sur l'ancienne valeur et écrire la nouvelle à côté, avec la date et la signature du gestionnaire.\n\nCréer une ligne de régularisation dans la fiche de stock\n\nCorrection des données et mise à jour des fiches de stock\n\nLe rapport d'inventaire est le document officiel qui synthétise les résultats du comptage et de la réconciliation. Il est conservé dans les archives de la structure et transmis à la hiérarchie.\n\nLe rapport d'inventaire\n"
      },
      {
        "id": "gas-m11-c82",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nLa gestion manuelle des stocks sur registres papier a longtemps été la norme dans les systèmes pharmaceutiques des pays à ressources limitées. Elle reste valide et peut être très efficace si elle est rigoureusement appliquée.\n\nMais elle a des limites structurelles :\n\nelle est lente,\n\nexposée aux erreurs humaines,\n\ndifficile à consolider entre plusieurs sites et\n\nincapable de générer automatiquement des alertes ou des rapports.\n\nLes outils digitaux ne remplacent pas les bonnes pratiques de gestion. Ils les amplifient, les accélèrent et les rendent plus fiables.\n\nUn gestionnaire qui gère mal son stock sur papier ne gèrera pas mieux avec un logiciel. Mais un gestionnaire qui maîtrise les principes fondamentaux vus dans les modules précédents verra sa productivité et la fiabilité de ses données considérablement améliorées par les outils digitaux adaptés à son contexte.\n"
      },
      {
        "id": "gas-m11-c83",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCatégorie 1 — Les tableurs (Excel, Google Sheets, LibreOffice Calc)\n\nDescription :\n\nLes tableurs sont le premier niveau d'outil digital. Ils ne sont pas des logiciels de gestion de stocks au sens strict, mais ils permettent d'automatiser les calculs, de structurer les données et de générer des tableaux de bord simples.\n\nIls sont disponibles sur presque tous les ordinateurs, ne nécessitent pas de connexion internet (pour Excel et LibreOffice), et sont maîtrisés par la plupart des gestionnaires ayant une formation de base en informatique.\n\nCe qu'un tableur bien conçu permet de faire :\n\nCalculer automatiquement la CMM, le stock min, le stock max et la quantité à commander\n\nGénérer des alertes visuelles (code couleur) quand un stock passe sous le stock min\n\nCalculer le TPI après inventaire\n\nProduire des graphiques d'évolution du stock dans le temps\n\nConsolider les données de plusieurs produits en un seul tableau de bord\n"
      },
      {
        "id": "gas-m11-c84",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCatégorie 1 — Les tableurs (Excel, Google Sheets, LibreOffice Calc)\n\nLimites des tableurs :\n\nUn fichier par structure (pas de consolidation automatique entre sites)\n\nPas d'alertes automatiques envoyées par email ou SMS\n\nRisque d'erreur si les formules sont accidentellement modifiées\n\nPas de traçabilité des modifications (qui a changé quoi et quand)Pas de gestion multi-utilisateurs simultanée\n"
      },
      {
        "id": "gas-m11-c85",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCatégorie 2 — Les logiciels de gestion de stocks pharmaceutiques\n\nDescription : Ce sont des applications spécialement conçues pour la gestion des stocks pharmaceutiques. Elles intègrent nativement les concepts de CMM, min/max, point de commande, FEFO, gestion par lot, alertes automatiques et rapports standardisés.\n\nLes principaux logiciels utilisés en Afrique subsaharienne : OpenLMIS (Open Logistics Management Information System)\n\nCaractéristiques :\n\nLogiciel open source (gratuit) développé spécifiquement pour les pays à ressources limitées\n\nGestion multi-niveaux (centre de santé → district → région → niveau central)\n\nAlertes automatiques de rupture et de surstock\n\nRapports standardisés conformes aux exigences des ministères de la santé et des bailleurs\n\nFonctionne sur navigateur web, accessible depuis tout ordinateur avec connexion internet\n\nUtilisé dans de nombreux pays africains (Zambie, Mozambique, Tanzanie, Bénin...)\n"
      },
      {
        "id": "gas-m11-c86",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCatégorie 2 — Les logiciels de gestion de stocks pharmaceutiques\n\nFonctionnalités clés :\n\nSuivi des stocks en temps réel pour tous les produits et tous les niveaux\n\nGénération automatique des quantités à commander\n\nTableaux de bord avec indicateurs (taux de disponibilité, taux de rupture, taux de couverture)Gestion des commandes de la quantification à la réception\n\nRapports exportables en Excel ou PDF\n"
      },
      {
        "id": "gas-m11-c87",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCatégorie 3 — Les applications mobiles\n\nDescription : Les applications mobiles permettent de gérer les stocks directement depuis un smartphone ou une tablette. Elles sont particulièrement adaptées aux structures éloignées où l'accès à un ordinateur est limité, et aux agents de terrain qui collectent des données lors de visites de supervision.\n\nLes principales applications mobiles utilisées :\n\nmSupply Mobile\n\nStockOut Notifier\n\nCommCare\n\nDHIS2 (District Health Information System version 2)\n\n…\n"
      },
      {
        "id": "gas-m11-c88",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nPanorama des outils digitaux disponibles\n\nCatégorie 4 — Les systèmes de codes-barres et RFID\n\nDescription : Ces technologies permettent d'automatiser la saisie des données de stock en scannant des codes-barres ou des puces RFID (Radio Frequency Identification) plutôt qu'en tapant manuellement. Elles réduisent considérablement les erreurs de saisie et accélèrent les opérations de réception et d'inventaire.\n\nCode-barres :\n\nChaque produit pharmaceutique est identifié par un code-barres (EAN-13 ou DataMatrix) qui encode le numéro de lot, la date de péremption et la quantité.\n\nUn scanner (pistolet de scan ou application de scan sur smartphone) lit ce code et enregistre automatiquement les informations dans le logiciel.\n"
      },
      {
        "id": "gas-m11-c89",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nCritères de choix d'un outil digital\n"
      },
      {
        "id": "gas-m11-c90",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nConditions de succès de la digitalisation\n\nCondition 1 — La formation du personnel\n\nPrincipe : Un outil non maîtrisé est un outil abandonné. La formation doit être pratique, progressive et répétée.\n\nCondition 2 — La qualité des données saisies\n\nPrincipe GIGO (Garbage In, Garbage Out) : Un logiciel ne peut produire des rapports fiables que si les données saisies sont correctes. Un logiciel avec de mauvaises données produit de mauvais rapports plus vite qu'un registre papier, mais les mauvais rapports restent des mauvais rapports.\n\nCondition 3 — La maintenance et le support technique\n\nPrincipe : Un système informatique tombe en panne. La question n'est pas de savoir si ça arrivera, mais quand. Sans plan de maintenance et de support, une panne peut mettre le système hors service pendant des semaines.\n"
      },
      {
        "id": "gas-m11-c91",
        "title": "Outils digitaux de gestion des stocks",
        "type": "text",
        "duration": "10 min",
        "content": "#### Outils digitaux de gestion des stocks\n\nConditions de succès de la digitalisation\n\nCondition 4 — La procédure de continuité en mode dégradé\n\nQuand le système digital est en panne (électricité, internet, ordinateur), la gestion ne doit pas s'arrêter. Une procédure de continuité en mode dégradé (retour temporaire au papier) doit être documentée et connue du personnel.\n\nProcédure de continuité :\n\n☐ En cas de panne, imprimer les dernières fiches de stock disponibles (avant la panne) et les utiliser comme base de travail manuel\n\n☐ Enregistrer tous les mouvements sur des fiches de stock papier pré-imprimées (toujours disponibles en réserve)\n\n☐ Conserver tous les bons de sortie et de réception papier pendant la panne\n\n☐ Dès le retour du système, saisir tous les mouvements enregistrés sur papier dans le logiciel\n\n☐ Vérifier la cohérence du stock théorique après la reprise de saisie\n"
      },
      {
        "id": "gas-m11-c92",
        "title": "Question?",
        "type": "text",
        "duration": "10 min",
        "content": "#### Question?\n\nGESTION DES APPROVISIONNEMENTS ET DES STOCKS\n"
      }
    ]
  }
];
