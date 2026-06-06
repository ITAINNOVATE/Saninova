import { EvaluationData } from "./gestionApprovisionnementsEval";

export const gestionOfficineEval: EvaluationData = {
  courseSlug: "gestion-d-une-officine-moderne",
  title: "Évaluation Finale : Gestion d'une officine moderne",
  timeLimit: 30 * 60, // 30 minutes
  passingScore: 70,
  maxAttempts: 2,
  questions: [
    {
      id: "o1",
      text: "Quel texte constitue aujourd’hui le socle juridique principal de l’ensemble du secteur pharmaceutique béninois ?",
      options: [
        "La Loi n°2021-03 du 1er février 2021",
        "Le Décret n°2024-1296",
        "Le Code Général des Impôts",
        "Les directives de l'OOAS"
      ],
      correctAnswer: "La Loi n°2021-03 du 1er février 2021"
    },
    {
      id: "o2",
      text: "La création d’une officine de pharmacie au Bénin est subordonnée à l’obtention d’une licence délivrée par :",
      options: [
        "Le Président de l'Ordre des Pharmaciens",
        "Le Ministre chargé de la Santé",
        "Le Directeur Général de la SoBAPS SA",
        "L'ARS (Autorité de Régulation de la Santé)"
      ],
      correctAnswer: "Le Ministre chargé de la Santé"
    },
    {
      id: "o3",
      text: "Quelle autorité est responsable de la surveillance du marché, des licences d’établissements et des inspections de conformité au Bénin ?",
      options: [
        "L'ABMed (Agence Béninoise du Médicament et des autres produits de santé)",
        "La SoBAPS SA",
        "L'Ordre National des Pharmaciens",
        "L'OMS Bureau Bénin"
      ],
      correctAnswer: "L'ABMed (Agence Béninoise du Médicament et des autres produits de santé)"
    },
    {
      id: "o4",
      text: "Le principe déontologique de l’exercice personnel de la pharmacie signifie que :",
      options: [
        "Le pharmacien doit gérer ses finances personnelles à part",
        "Le pharmacien doit préparer ou délivrer lui-même les médicaments ou en surveiller l’exécution",
        "L'officine ne peut embaucher aucun assistant",
        "Le pharmacien doit travailler seul sans préparateurs"
      ],
      correctAnswer: "Le pharmacien doit préparer ou délivrer lui-même les médicaments ou en surveiller l’exécution"
    },
    {
      id: "o5",
      text: "Dans le bilan d'une officine, quel poste représente l'actif circulant ?",
      options: [
        "Les immobilisations (local, mobilier)",
        "Les stocks, les créances clients et la trésorerie disponible",
        "Les capitaux propres",
        "Les dettes fournisseurs et fiscales"
      ],
      correctAnswer: "Les stocks, les créances clients et la trésorerie disponible"
    },
    {
      id: "o6",
      text: "Quelle est la formule simplifiée du Besoin en Fonds de Roulement (BFR) ?",
      options: [
        "BFR = Chiffre d'Affaires − Achats",
        "BFR = Stocks + Créances − Dettes fournisseurs",
        "BFR = Actif total − Passif total",
        "BFR = Trésorerie disponible ÷ Charges fixes"
      ],
      correctAnswer: "BFR = Stocks + Créances − Dettes fournisseurs"
    },
    {
      id: "o7",
      text: "Le point mort dans l’analyse financière de l’officine correspond à :",
      options: [
        "Le niveau où les stocks sont complètement périmés",
        "La date à laquelle le seuil de rentabilité est atteint dans l'année",
        "La fermeture définitive de l'établissement pour faillite",
        "Le moment où les créances deviennent irrécouvrables"
      ],
      correctAnswer: "La date à laquelle le seuil de rentabilité est atteint dans l'année"
    },
    {
      id: "o8",
      text: "Dans la classification ABC des stocks, la catégorie A concerne :",
      options: [
        "Les produits représentant 70 à 80% de la valeur totale mais 10 à 20% du nombre d’articles",
        "Les produits périmés ou endommagés à jeter",
        "Les médicaments les moins chers de l'officine",
        "Les produits de parapharmacie à faible rotation"
      ],
      correctAnswer: "Les produits représentant 70 à 80% de la valeur totale mais 10 à 20% du nombre d’articles"
    },
    {
      id: "o9",
      text: "Quelle méthode de gestion des stocks range les lots expirant en premier devant les étagères ?",
      options: [
        "LIFO (Last In, First Out)",
        "FIFO (First In, First Out)",
        "FEFO (First Expired, First Out)",
        "Moyenne Mobile Pondérée"
      ],
      correctAnswer: "FEFO (First Expired, First Out)"
    },
    {
      id: "o10",
      text: "Quelle est la différence fondamentale entre le bénéfice comptable et la trésorerie ?",
      options: [
        "Le bénéfice intègre les ventes facturées non encore encaissées, tandis que la trésorerie ne compte que l'argent réellement disponible",
        "Le bénéfice est toujours supérieur à la trésorerie",
        "La trésorerie intègre les investissements amortis, pas le bénéfice",
        "Il n'y a aucune différence entre les deux"
      ],
      correctAnswer: "Le bénéfice intègre les ventes facturées non encore encaissées, tandis que la trésorerie ne compte que l'argent réellement disponible"
    },
    {
      id: "o11",
      text: "Quel est l’un des principaux leviers pour libérer rapidement de la trésorerie dans une officine ?",
      options: [
        "Augmenter les délais de paiement accordés aux clients",
        "Accélérer la rotation des stocks en réduisant le surstockage",
        "Acheter plus de produits à faible marge",
        "Augmenter les charges fixes de l'établissement"
      ],
      correctAnswer: "Accélérer la rotation des stocks en réduisant le surstockage"
    },
    {
      id: "o12",
      text: "Le rachat, le déplacement ou le changement de titulaire d'une officine au Bénin nécessitent :",
      options: [
        "Une simple notification écrite à l'Ordre",
        "L'autorisation préalable de l'inspecteur du travail",
        "L'obtention d'une nouvelle licence ou autorisation réglementaire",
        "Aucune démarche administrative particulière"
      ],
      correctAnswer: "L'obtention d'une nouvelle licence ou autorisation réglementaire"
    },
    {
      id: "o13",
      text: "Que vérifient en priorité les inspecteurs de l'ABMed concernant la chaîne du froid ?",
      options: [
        "Le contrat d'assurance de l'immeuble",
        "La présence de relevés de température quotidiens documentés et archivés",
        "La marque du réfrigérateur utilisé",
        "Le volume de vaccins vendus par mois"
      ],
      correctAnswer: "La présence de relevés de température quotidiens documentés et archivés"
    },
    {
      id: "o14",
      text: "Dans le cadre de la lutte contre les médicaments falsifiés, si le pharmacien suspecte un produit de contrefaçon, il doit :",
      options: [
        "Le retourner discrètement au fournisseur sans facture",
        "Le vendre à prix réduit pour s'en débarrasser",
        "L'isoler, suspendre sa dispensation et notifier immédiatement les autorités réglementaires",
        "Le jeter directement à la poubelle de l'officine"
      ],
      correctAnswer: "L'isoler, suspendre sa dispensation et notifier immédiatement les autorités réglementaires"
    },
    {
      id: "o15",
      text: "Quelle instance ordinale prononce des sanctions disciplinaires en cas de manquement déontologique (ex: publicité abusive, violation du secret professionnel) ?",
      options: [
        "L'Ordre National des Pharmaciens",
        "Le Ministère de la Justice",
        "La SoBAPS SA",
        "L'ARS"
      ],
      correctAnswer: "L'Ordre National des Pharmaciens"
    }
  ]
};
