export interface EvaluationQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface EvaluationData {
  courseSlug: string;
  title: string;
  timeLimit: number; // in seconds
  passingScore: number;
  maxAttempts: number;
  questions: EvaluationQuestion[];
}

export const gestionApprovisionnementsEval: EvaluationData = {
  courseSlug: "gestion-approvisionnements",
  title: "Évaluation Finale : Gestion des approvisionnements",
  timeLimit: 30 * 60, // 30 minutes
  passingScore: 70,
  maxAttempts: 2,
  questions: [
    {
      id: "q1",
      text: "Le stock de sécurité sert principalement à :",
      options: [
        "Réduire le nombre de fournisseurs",
        "Faire face aux imprévus de consommation ou de livraison",
        "Augmenter les ventes",
        "Réduire les inventaires"
      ],
      correctAnswer: "Faire face aux imprévus de consommation ou de livraison"
    },
    {
      id: "q2",
      text: "La CMM signifie :",
      options: [
        "Coût Moyen Mensuel",
        "Consommation Moyenne Mensuelle",
        "Calcul Moyen de Marchandise",
        "Commande Moyenne Mensuelle"
      ],
      correctAnswer: "Consommation Moyenne Mensuelle"
    },
    {
      id: "q3",
      text: "La formule du stock minimum est :",
      options: [
        "CMM × Période de commande",
        "Stock max − Stock actuel",
        "(CMM × Délai de livraison) + Stock de sécurité",
        "Stock disponible ÷ CMM"
      ],
      correctAnswer: "(CMM × Délai de livraison) + Stock de sécurité"
    },
    {
      id: "q4",
      text: "Le principe FEFO signifie :",
      options: [
        "Premier Entré Premier Sorti",
        "Premier Expédié Premier Utilisé",
        "Premier Expiré Premier Sorti",
        "Premier Commandé Premier Livré"
      ],
      correctAnswer: "Premier Expiré Premier Sorti"
    },
    {
      id: "q5",
      text: "Le taux de rotation mesure :",
      options: [
        "La vitesse de renouvellement du stock",
        "Le nombre de fournisseurs",
        "Le taux de péremption",
        "Le délai de livraison"
      ],
      correctAnswer: "La vitesse de renouvellement du stock"
    },
    {
      id: "q6",
      text: "Quel document doit être mis à jour après chaque mouvement de stock ?",
      options: [
        "Contrat fournisseur",
        "Fiche de stock",
        "Budget annuel",
        "Inventaire physique"
      ],
      correctAnswer: "Fiche de stock"
    },
    {
      id: "q7",
      text: "Un stock qui ne bouge plus depuis plusieurs mois est appelé :",
      options: [
        "Stock de cycle",
        "Stock de sécurité",
        "Stock mort",
        "Stock de transit"
      ],
      correctAnswer: "Stock mort"
    },
    {
      id: "q8",
      text: "Le délai de livraison représente :",
      options: [
        "Le temps entre deux inventaires",
        "Le temps entre la commande et la réception",
        "Le temps entre deux consommations",
        "Le temps de stockage"
      ],
      correctAnswer: "Le temps entre la commande et la réception"
    },
    {
      id: "q9",
      text: "Le taux de disponibilité acceptable est généralement :",
      options: [
        "≥ 95 %",
        "≥ 50 %",
        "≥ 70 %",
        "≥ 80 %"
      ],
      correctAnswer: "≥ 95 %"
    },
    {
      id: "q10",
      text: "Lorsqu'un stock dépasse le stock maximum, on parle de :",
      options: [
        "Rupture",
        "Stock dormant",
        "Surstock",
        "Stock de sécurité"
      ],
      correctAnswer: "Surstock"
    },
    {
      id: "q11",
      text: "Le stock de sécurité doit être utilisé quotidiennement.",
      options: [
        "Vrai",
        "Faux"
      ],
      correctAnswer: "Faux"
    },
    {
      id: "q12",
      text: "Un mois de rupture totale doit être exclu du calcul de la CMM.",
      options: [
        "Vrai",
        "Faux"
      ],
      correctAnswer: "Vrai"
    },
    {
      id: "q13",
      text: "Le respect du FEFO contribue à réduire les pertes par péremption.",
      options: [
        "Vrai",
        "Faux"
      ],
      correctAnswer: "Vrai"
    },
    {
      id: "q14",
      text: "Le stock en transit est déjà disponible pour la distribution.",
      options: [
        "Vrai",
        "Faux"
      ],
      correctAnswer: "Faux"
    },
    {
      id: "q15",
      text: "L'inventaire permet de comparer le stock physique au stock théorique.",
      options: [
        "Vrai",
        "Faux"
      ],
      correctAnswer: "Vrai"
    },
    {
      id: "q16",
      text: "Une pharmacie a consommé 6 000 comprimés en 5 mois. La CMM est :",
      options: [
        "1 000",
        "1 200",
        "1 500",
        "2 000"
      ],
      correctAnswer: "1 200"
    },
    {
      id: "q17",
      text: "Données : CMM = 200, délai = 2 mois, stock de sécurité = 300. Le stock minimum est :",
      options: [
        "400",
        "500",
        "700",
        "900"
      ],
      correctAnswer: "700"
    },
    {
      id: "q18",
      text: "Données : Stock minimum = 700, période de commande = 3 mois, CMM = 200. Le stock maximum est :",
      options: [
        "900",
        "1 000",
        "1 300",
        "1 500"
      ],
      correctAnswer: "1 300"
    },
    {
      id: "q19",
      text: "Le stock théorique est de 2 500 unités et le stock physique est de 2 250 unités. Quel est l'écart ?",
      options: [
        "+250",
        "-250",
        "+150",
        "-150"
      ],
      correctAnswer: "-250"
    },
    {
      id: "q20",
      text: "Si le stock minimum est de 600 unités et le stock actuel de 450 unités, le gestionnaire doit :",
      options: [
        "Ne rien faire",
        "Réduire les commandes",
        "Déclencher une commande",
        "Détruire les produits"
      ],
      correctAnswer: "Déclencher une commande"
    }
  ]
};
