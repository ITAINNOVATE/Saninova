import { EvaluationData } from "./gestionApprovisionnementsEval";

export const quantificationBesoinsEval: EvaluationData = {
  courseSlug: "quantification-des-besoins-en-produits-de-sante",
  title: "Évaluation Finale : Quantification des besoins en produits de santé",
  timeLimit: 30 * 60, // 30 minutes
  passingScore: 70,
  maxAttempts: 2,
  questions: [
    {
      id: "q_b1",
      text: "La quantification des besoins en produits de santé est un processus logistique qui consiste à :",
      options: [
        "Vendre des médicaments aux formations sanitaires",
        "Estimer les besoins futurs et déterminer les quantités et le calendrier d’approvisionnement nécessaires",
        "Calculer le chiffre d'affaires annuel d'un hôpital",
        "Ranger les produits dans un entrepôt central"
      ],
      correctAnswer: "Estimer les besoins futurs et déterminer les quantités et le calendrier d’approvisionnement nécessaires"
    },
    {
      id: "q_b2",
      text: "Quelles sont les trois composantes principales de l'exercice de quantification ?",
      options: [
        "Achat, Transport, Vente",
        "Préparation, Prévision des besoins, Élaboration du plan d’approvisionnement",
        "Inventaire, Commande, Rangement",
        "Diagnostic, Traitement, Dispensation"
      ],
      correctAnswer: "Préparation, Prévision des besoins, Élaboration du plan d’approvisionnement"
    },
    {
      id: "q_b3",
      text: "La prévision de la demande répond principalement à la question :",
      options: [
        "Combien faut-il commander immédiatement ?",
        "Comment la demande va-t-elle évoluer dans le temps et pourquoi ?",
        "Quel est le prix unitaire d'un médicament ?",
        "Qui est le fournisseur le moins cher ?"
      ],
      correctAnswer: "Comment la demande va-t-elle évoluer dans le temps et pourquoi ?"
    },
    {
      id: "q_b4",
      text: "La méthode basée sur la consommation est recommandée lorsque :",
      options: [
        "Il s'agit d'un nouveau programme de santé sans historique de données",
        "On dispose d'un historique de données de consommation ou de distribution fiable et stable",
        "Les protocoles nationaux de traitement changent radicalement",
        "Le budget disponible est illimité"
      ],
      correctAnswer: "On dispose d'un historique de données de consommation ou de distribution fiable et stable"
    },
    {
      id: "q_b5",
      text: "Lors du calcul de la CMM par la méthode de consommation, comment ajuste-t-on la consommation d'un mois de rupture ?",
      options: [
        "On remplace la valeur par zéro",
        "On multiplie la consommation par 2",
        "On applique la formule d'ajustement : Consommation enregistrée × (Jours du mois ÷ Jours de disponibilité)",
        "On utilise la valeur du mois précédent sans modification"
      ],
      correctAnswer: "On applique la formule d'ajustement : Consommation enregistrée × (Jours du mois ÷ Jours de disponibilité)"
    },
    {
      id: "q_b6",
      text: "Parmi les techniques de prévision quantitatives, laquelle nécessite au moins 24 mois de données historiques ?",
      options: [
        "Moyenne Mobile simple",
        "Régression linéaire simple",
        "Lissage Exponentiel Triple (Holt-Winter)",
        "Moyenne arithmétique simple"
      ],
      correctAnswer: "Lissage Exponentiel Triple (Holt-Winter)"
    },
    {
      id: "q_b7",
      text: "La méthode basée sur la morbidité estime les besoins théoriques à partir de :",
      options: [
        "La quantité moyenne distribuée aux patients l'année passée",
        "Nombre de cas attendus × Taux de traitement × Quantité de médicament par cas traité selon le protocole",
        "Le nombre de lits disponibles dans les hôpitaux",
        "Les commandes passées par les grossistes répartiteurs"
      ],
      correctAnswer: "Nombre de cas attendus × Taux de traitement × Quantité de médicament par cas traité selon le protocole"
    },
    {
      id: "q_b8",
      text: "Quelle méthode de prévision est particulièrement adaptée aux intrants de laboratoire ou aux kits de santé maternelle (ex. CPN) ?",
      options: [
        "Méthode basée sur les cibles de population",
        "Méthode basée sur la consommation historique",
        "Méthode basée sur les services (actes de soins)",
        "Méthode Delphi"
      ],
      correctAnswer: "Méthode basée sur les services (actes de soins)"
    },
    {
      id: "q_b9",
      text: "Quelle méthode convient le mieux aux campagnes de distribution de masse ou aux programmes de vaccination (PEV) ?",
      options: [
        "La méthode basée sur la consommation",
        "La méthode basée sur les cibles de population",
        "La méthode basée sur la morbidité pure",
        "La méthode Delphi"
      ],
      correctAnswer: "La méthode basée sur les cibles de population"
    },
    {
      id: "q_b10",
      text: "Dans le contexte de la triangulation des méthodes, qu’indique un écart compris entre 10% et 25% entre deux estimations ?",
      options: [
        "Une convergence forte, aucune vérification nécessaire",
        "Une convergence acceptable, mais nécessitant des vérifications et des justifications",
        "Une divergence significative nécessitant de revoir toutes les hypothèses",
        "Une divergence majeure, les données doivent être jetées"
      ],
      correctAnswer: "Une convergence acceptable, mais nécessitant des vérifications et des justifications"
    },
    {
      id: "q_b11",
      text: "Qu'est-ce que la triangulation des méthodes de quantification ?",
      options: [
        "L'utilisation d'une seule méthode jugée parfaite",
        "L'application de 2 ou 3 méthodes, la comparaison de leurs résultats et l'analyse des écarts pour converger vers un consensus",
        "La sélection du fournisseur ayant les meilleurs délais de livraison",
        "La répartition des budgets entre trois ministères"
      ],
      correctAnswer: "L'application de 2 ou 3 méthodes, la comparaison de leurs résultats et l'analyse des écarts pour converger vers un consensus"
    },
    {
      id: "q_b12",
      text: "Quel est l’impact d’une sous-estimation systématique dans la prévision de la demande ?",
      options: [
        "Un surstockage important",
        "Des ruptures de stock critiques nuisant aux patients",
        "Une baisse immédiate des prix d'achat",
        "Une amélioration de la trésorerie"
      ],
      correctAnswer: "Des ruptures de stock critiques nuisant aux patients"
    },
    {
      id: "q_b13",
      text: "La technique qualitative Delphi repose sur :",
      options: [
        "L'extrapolation statistique de courbes temporelles",
        "Un processus itératif de questionnaires anonymes soumis à un groupe d'experts",
        "Le recensement démographique national",
        "Les inventaires physiques mensuels"
      ],
      correctAnswer: "Un processus itératif de questionnaires anonymes soumis à un groupe d'experts"
    },
    {
      id: "q_b14",
      text: "La formule de calcul du Besoin prévisionnel de commande est :",
      options: [
        "Quantité = (CMM ajustée × Mois de planification) + Stock de sécurité − Stock disponible − Commandes en transit",
        "Quantité = Stock disponible − Stock de sécurité",
        "Quantité = CMM × Taux de croissance",
        "Quantité = (Seuil de rentabilité ÷ Taux de marge) − Stock"
      ],
      correctAnswer: "Quantité = (CMM ajustée × Mois de planification) + Stock de sécurité − Stock disponible − Commandes en transit"
    },
    {
      id: "q_b15",
      text: "Pourquoi le taux de gaspillage est-il particulièrement important dans la méthode populationnelle ?",
      options: [
        "Parce qu'il permet d'acheter plus de produits inutiles",
        "Parce qu'il compense les pertes techniques (ex. flacons multidoses ouverts, casse, ruptures de chaîne du froid)",
        "Parce qu'il réduit le coût de transport",
        "Parce qu'il remplace le stock de sécurité"
      ],
      correctAnswer: "Parce qu'il compense les pertes techniques (ex. flacons multidoses ouverts, casse, ruptures de chaîne du froid)"
    }
  ]
};
