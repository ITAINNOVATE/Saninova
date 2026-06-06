export interface Chapter {
  title: string;
  duration: string;
  chapters: string[];
}

export interface Module {
  name: string;
  duration: string;
  cost: string;
  subModules: Chapter[];
}

export interface Certification {
  name: string;
  duration: string;
  cost: string;
  modules: Module[];
}

export interface AcademyData {
  id: string;
  title: string;
  certifications: Certification[];
}

export const certificationsData: AcademyData[] = [
  {
    "id": "supply-chain",
    "title": "ACADÉMIE SUPPLY CHAIN SANTÉ",
    "certifications": [
      {
        "name": "Certificat professionnel en Supply Chain Pharmaceutique",
        "duration": "15 jours",
        "cost": "2800 USD",
        "modules": [
          {
            "name": "Gestion des approvisionnements et des stocks",
            "duration": "5 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Principes fondamentaux de la gestion des stocks",
                "duration": "1 jour",
                "chapters": [
                  "Définitions et concepts clés (stock de sécurité, min, max)",
                  "Types de stocks et leur rôle dans la chaîne pharmaceutique",
                  "Indicateurs clés de performance (taux de rupture, surstockage)",
                  "Introduction aux bonnes pratiques de gestion des stocks"
                ]
              },
              {
                "title": "Méthodes de calcul des niveaux de stock",
                "duration": "1 jour",
                "chapters": [
                  "Calcul de la consommation moyenne mensuelle (CMM)",
                  "Méthode min/max : formules et application",
                  "Calcul du point de commande et du délai de livraison",
                  "Exercices pratiques sur données réelles"
                ]
              },
              {
                "title": "Processus de commande et suivi fournisseurs",
                "duration": "1 jour",
                "chapters": [
                  "Cycle de commande : de la quantification à la réception",
                  "Sélection et évaluation des fournisseurs",
                  "Gestion des contrats et des termes de livraison (Incoterms)",
                  "Outils de suivi des commandes et tableau de bord fournisseurs"
                ]
              },
              {
                "title": "Gestion des ruptures et des surstocks",
                "duration": "1 jour",
                "chapters": [
                  "Causes et conséquences des ruptures de stock",
                  "Stratégies de prévention et de gestion des ruptures",
                  "Identification et traitement des surstocks (redistribution, retour)",
                  "Plans de contingence et procédures d'urgence"
                ]
              },
              {
                "title": "Systèmes d'inventaire et outils digitaux",
                "duration": "1 jour",
                "chapters": [
                  "Types d'inventaires (permanent, périodique, tournant)",
                  "Procédures de comptage et de réconciliation",
                  "Outils digitaux de gestion des stocks (logiciels, applications mobiles)",
                  "Atelier : simulation d'un inventaire complet"
                ]
              }
            ]
          },
          {
            "name": "Quantification et prévisions",
            "duration": "3 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Méthodes de quantification",
                "duration": "1 jour",
                "chapters": [
                  "Méthode basée sur la consommation : collecte et analyse des données",
                  "Méthode basée sur la morbidité : protocoles de traitement et incidence",
                  "Méthode basée sur les cibles de population",
                  "Comparaison et triangulation des méthodes"
                ]
              },
              {
                "title": "Outils de prévision et modélisation de la demande",
                "duration": "1 jour",
                "chapters": [
                  "Principes de la prévision de la demande en santé",
                  "Utilisation de Quantimed, PipeLine, ForLAB, QAT",
                  "Ajustements saisonniers et facteurs contextuels",
                  "Analyse des écarts entre prévisions et consommations réelles"
                ]
              },
              {
                "title": "Atelier pratique : exercices de quantification pays",
                "duration": "1 jour",
                "chapters": [
                  "Étude de cas : quantification nationale d'ARV",
                  "Étude de cas : quantification des intrants paludisme",
                  "Simulation d'un exercice complet de quantification",
                  "Restitution et critique collective des résultats"
                ]
              }
            ]
          },
          {
            "name": "Distribution et dernier kilomètre",
            "duration": "3 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Conception des réseaux de distribution",
                "duration": "1 jour",
                "chapters": [
                  "Modèles de distribution (push, pull, hybride)",
                  "Niveaux de la chaîne de distribution (central, régional, district, FOSA)",
                  "Cartographie des flux logistiques",
                  "Optimisation des routes et des fréquences de livraison"
                ]
              },
              {
                "title": "Stratégies de distribution au dernier kilomètre",
                "duration": "1 jour",
                "chapters": [
                  "Défis spécifiques des zones rurales et enclavées",
                  "Distribution par agents communautaires",
                  "Stratégies mobiles et distribution intégrée",
                  "Exemples africains : Zambie, Rwanda, Éthiopie"
                ]
              },
              {
                "title": "Suivi des livraisons et indicateurs de performance",
                "duration": "1 jour",
                "chapters": [
                  "Outils de suivi des livraisons (bons de livraison, applications mobiles)",
                  "Indicateurs clés : taux de livraison complète, délai moyen, taux de retour",
                  "Tableaux de bord de suivi de la distribution",
                  "Étude de cas et exercices pratiques"
                ]
              }
            ]
          },
          {
            "name": "Entreposage pharmaceutique",
            "duration": "2 jours",
            "cost": "400 USD",
            "subModules": [
              {
                "title": "Normes d'entreposage   (1 jour)",
                "duration": "BPD, OMS",
                "chapters": [
                  "Bonnes pratiques de distribution (BPD) et directives OMS",
                  "Conditions de stockage par catégorie de produits",
                  "Séparation des produits (expirés, endommagés, FEFO)",
                  "Sécurité et contrôle d'accès à l'entrepôt"
                ]
              },
              {
                "title": "Organisation physique et gestion des espaces",
                "duration": "1 jour",
                "chapters": [
                  "Conception et aménagement d'un entrepôt pharmaceutique",
                  "Systèmes de rangement et d'adressage",
                  "Gestion des zones : réception, quarantaine, stockage, expédition",
                  "Maintenance de l'entrepôt et équipements de manutention"
                ]
              }
            ]
          },
          {
            "name": "Chaîne du froid",
            "duration": "2 jours",
            "cost": "400 USD",
            "subModules": [
              {
                "title": "Principes et équipements de la chaîne du froid",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de la chaîne du froid pharmaceutique",
                  "Types d'équipements (réfrigérateurs, congélateurs, chambres froides)",
                  "Normes de qualification des équipements (OMS PQS)",
                  "Procédures de stockage et de transport des produits thermosensibles"
                ]
              },
              {
                "title": "Surveillance des températures et gestion des incidents",
                "duration": "1 jour",
                "chapters": [
                  "Dispositifs de surveillance (thermomètres, enregistreurs, indicateurs)",
                  "Procédures d'alerte et d'intervention en cas d'excursion",
                  "Évaluation de l'impact sur la qualité des produits",
                  "Documentation et traçabilité des incidents de température"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification avancée en Quantification",
        "duration": "6 jours",
        "cost": "1300 USD",
        "modules": [
          {
            "name": "Quantification et prévisions",
            "duration": "3 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Méthodes de quantification",
                "duration": "1 jour",
                "chapters": [
                  "Méthode basée sur la consommation : collecte et analyse des données",
                  "Méthode basée sur la morbidité : protocoles de traitement et incidence",
                  "Méthode basée sur les cibles de population",
                  "Comparaison et triangulation des méthodes"
                ]
              },
              {
                "title": "Outils de prévision et modélisation de la demande",
                "duration": "1 jour",
                "chapters": [
                  "Principes de la prévision de la demande en santé",
                  "Utilisation de Quantimed, PipeLine, ForLAB",
                  "Ajustements saisonniers et facteurs contextuels",
                  "Analyse des écarts entre prévisions et consommations réelles"
                ]
              },
              {
                "title": "Atelier pratique : exercices de quantification pays",
                "duration": "1 jour",
                "chapters": [
                  "Étude de cas : quantification nationale d'ARV",
                  "Étude de cas : quantification des intrants paludisme",
                  "Simulation d'un exercice complet de quantification",
                  "Restitution et critique collective des résultats"
                ]
              }
            ]
          },
          {
            "name": "Data analytics logistique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Collecte et nettoyage des données logistiques",
                "duration": "1 jour",
                "chapters": [
                  "Sources de données logistiques (LMIS, registres, rapports)",
                  "Identification et traitement des données manquantes ou erronées",
                  "Structuration des bases de données logistiques",
                  "Bonnes pratiques de saisie et de validation des données"
                ]
              },
              {
                "title": "Visualisation avec Excel / Power BI",
                "duration": "1 jour",
                "chapters": [
                  "Création de graphiques et tableaux croisés dynamiques sous Excel",
                  "Introduction à Power BI : connexion aux données, modélisation",
                  "Conception de visuels interactifs (courbes de stock, taux de disponibilité)",
                  "Partage et publication des rapports Power BI"
                ]
              },
              {
                "title": "Tableaux de bord et aide à la décision",
                "duration": "1 jour",
                "chapters": [
                  "Conception d'un tableau de bord logistique national",
                  "Indicateurs clés à monitorer (disponibilité, ruptures, couverture)",
                  "Utilisation des données pour les revues de performance",
                  "Atelier : construction d'un tableau de bord complet"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Gestion des Stocks",
        "duration": "9 jours",
        "cost": "1600 USD",
        "modules": [
          {
            "name": "Gestion des approvisionnements et des stocks",
            "duration": "5 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Principes fondamentaux de la gestion des stocks",
                "duration": "1 jour",
                "chapters": [
                  "Définitions et concepts clés (stock de sécurité, min, max)",
                  "Types de stocks et leur rôle dans la chaîne pharmaceutique",
                  "Indicateurs clés de performance (taux de rupture, surstockage)",
                  "Introduction aux bonnes pratiques de gestion des stocks"
                ]
              },
              {
                "title": "Méthodes de calcul des niveaux de stock",
                "duration": "1 jour",
                "chapters": [
                  "Calcul de la consommation moyenne mensuelle (CMM)",
                  "Méthode min/max : formules et application",
                  "Calcul du point de commande et du délai de livraison",
                  "Exercices pratiques sur données réelles"
                ]
              },
              {
                "title": "Processus de commande et suivi fournisseurs",
                "duration": "1 jour",
                "chapters": [
                  "Cycle de commande : de la quantification à la réception",
                  "Sélection et évaluation des fournisseurs",
                  "Gestion des contrats et des termes de livraison (Incoterms)",
                  "Outils de suivi des commandes et tableau de bord fournisseurs"
                ]
              },
              {
                "title": "Gestion des ruptures et des surstocks",
                "duration": "1 jour",
                "chapters": [
                  "Causes et conséquences des ruptures de stock",
                  "Stratégies de prévention et de gestion des ruptures",
                  "Identification et traitement des surstocks (redistribution, retour)",
                  "Plans de contingence et procédures d'urgence"
                ]
              },
              {
                "title": "Systèmes d'inventaire et outils digitaux",
                "duration": "1 jour",
                "chapters": [
                  "Types d'inventaires (permanent, périodique, tournant)",
                  "Procédures de comptage et de réconciliation",
                  "Outils digitaux de gestion des stocks",
                  "Atelier : simulation d'un inventaire complet"
                ]
              }
            ]
          },
          {
            "name": "Entreposage pharmaceutique",
            "duration": "2 jours",
            "cost": "400 USD",
            "subModules": [
              {
                "title": "Normes d'entreposage   (1 jour)",
                "duration": "BPD, OMS",
                "chapters": [
                  "Bonnes pratiques de distribution (BPD) et directives OMS",
                  "Conditions de stockage par catégorie de produits",
                  "Séparation des produits (expirés, endommagés, FEFO)",
                  "Sécurité et contrôle d'accès à l'entrepôt"
                ]
              },
              {
                "title": "Organisation physique et gestion des espaces",
                "duration": "1 jour",
                "chapters": [
                  "Conception et aménagement d'un entrepôt pharmaceutique",
                  "Systèmes de rangement et d'adressage",
                  "Gestion des zones : réception, quarantaine, stockage, expédition",
                  "Maintenance de l'entrepôt et équipements de manutention"
                ]
              }
            ]
          },
          {
            "name": "Chaîne du froid",
            "duration": "2 jours",
            "cost": "400 USD",
            "subModules": [
              {
                "title": "Principes et équipements de la chaîne du froid",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de la chaîne du froid pharmaceutique",
                  "Types d'équipements (réfrigérateurs, congélateurs, chambres froides)",
                  "Normes de qualification des équipements (OMS PQS)",
                  "Procédures de stockage et de transport des produits thermosensibles"
                ]
              },
              {
                "title": "Surveillance des températures et gestion des incidents",
                "duration": "1 jour",
                "chapters": [
                  "Dispositifs de surveillance (thermomètres, enregistreurs)",
                  "Procédures d'alerte et d'intervention en cas d'excursion",
                  "Évaluation de l'impact sur la qualité des produits",
                  "Documentation et traçabilité des incidents de température"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en eLMIS & Data Visibility",
        "duration": "6 jours",
        "cost": "1400 USD",
        "modules": [
          {
            "name": "LMIS & eSIGL",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Architecture des systèmes LMIS",
                "duration": "1 jour",
                "chapters": [
                  "Définition et rôle d'un LMIS dans la supply chain santé",
                  "Composantes d'un LMIS : collecte, transmission, analyse, feedback",
                  "Panorama des systèmes existants (eSIGL, OpenLMIS, DHIS2 logistique)",
                  "Critères de sélection et d'implémentation d'un LMIS"
                ]
              },
              {
                "title": "Paramétrage et utilisation d'eSIGL",
                "duration": "1 jour",
                "chapters": [
                  "Navigation dans l'interface eSIGL",
                  "Saisie des données de stock et des commandes",
                  "Génération des rapports et des ordres de commande automatiques",
                  "Administration des utilisateurs et droits d'accès"
                ]
              },
              {
                "title": "Reporting et analyse des données logistiques",
                "duration": "1 jour",
                "chapters": [
                  "Taux de complétude et de promptitude des rapports",
                  "Analyse des données de stock via eSIGL",
                  "Utilisation des données pour les décisions d'approvisionnement",
                  "Boucle de rétro-information (feedback loop) aux formations sanitaires"
                ]
              }
            ]
          },
          {
            "name": "Data analytics logistique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Collecte et nettoyage des données logistiques",
                "duration": "1 jour",
                "chapters": [
                  "Sources de données logistiques (LMIS, registres, rapports)",
                  "Identification et traitement des données manquantes ou erronées",
                  "Structuration des bases de données logistiques",
                  "Bonnes pratiques de saisie et de validation des données"
                ]
              },
              {
                "title": "Visualisation avec Excel / Power BI",
                "duration": "1 jour",
                "chapters": [
                  "Création de graphiques et tableaux croisés dynamiques sous Excel",
                  "Introduction à Power BI : connexion aux données, modélisation",
                  "Conception de visuels interactifs (courbes de stock, taux de disponibilité)",
                  "Partage et publication des rapports Power BI"
                ]
              },
              {
                "title": "Tableaux de bord et aide à la décision",
                "duration": "1 jour",
                "chapters": [
                  "Conception d'un tableau de bord logistique national",
                  "Indicateurs clés à monitorer (disponibilité, ruptures, couverture)",
                  "Utilisation des données pour les revues de performance",
                  "Atelier : construction d'un tableau de bord complet"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Distribution Pharmaceutique",
        "duration": "7 jours",
        "cost": "1600 USD",
        "modules": [
          {
            "name": "Distribution et dernier kilomètre",
            "duration": "3 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Conception des réseaux de distribution",
                "duration": "1 jour",
                "chapters": [
                  "Modèles de distribution (push, pull, hybride)",
                  "Niveaux de la chaîne de distribution (central, régional, district, FOSA)",
                  "Cartographie des flux logistiques",
                  "Optimisation des routes et des fréquences de livraison"
                ]
              },
              {
                "title": "Stratégies de distribution au dernier kilomètre",
                "duration": "1 jour",
                "chapters": [
                  "Défis spécifiques des zones rurales et enclavées",
                  "Distribution par agents communautaires",
                  "Stratégies mobiles et distribution intégrée",
                  "Exemples africains : Zambie, Rwanda, Éthiopie"
                ]
              },
              {
                "title": "Suivi des livraisons et indicateurs de performance",
                "duration": "1 jour",
                "chapters": [
                  "Outils de suivi des livraisons (bons de livraison, applications mobiles)",
                  "Indicateurs clés : taux de livraison complète, délai moyen, taux de retour",
                  "Tableaux de bord de suivi de la distribution",
                  "Étude de cas et exercices pratiques"
                ]
              }
            ]
          },
          {
            "name": "Supply chain humanitaire",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Spécificités de la logistique humanitaire",
                "duration": "1 jour",
                "chapters": [
                  "Différences entre supply chain commerciale et humanitaire",
                  "Gestion des approvisionnements en contexte de crise",
                  "Acteurs clés de la logistique humanitaire (UNICEF, MSF, OCHA)",
                  "Procédures d'urgence et achats accélérés"
                ]
              },
              {
                "title": "Coordination inter-agences et gestion des clusters",
                "duration": "1 jour",
                "chapters": [
                  "Système des clusters humanitaires (Cluster Santé, Logistique)",
                  "Mécanismes de coordination et partage de l'information",
                  "Gestion des entrepôts humanitaires et des pipelines d'urgence",
                  "Étude de cas : réponse Ebola, COVID-19, crises alimentaires"
                ]
              }
            ]
          },
          {
            "name": "Gestion des urgences sanitaires",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Planification de la réponse aux urgences",
                "duration": "1 jour",
                "chapters": [
                  "Cadres internationaux (RSI 2005, Sendai, NAPHS)",
                  "Évaluation des risques et cartographie des menaces sanitaires",
                  "Plans de préparation et de réponse aux urgences (PPRUC)",
                  "Simulation d'exercice : tabletop exercise"
                ]
              },
              {
                "title": "Mobilisation rapide des stocks et contingences",
                "duration": "1 jour",
                "chapters": [
                  "Stocks prépositionnés et stocks stratégiques nationaux",
                  "Procédures de déclenchement et de libération des stocks d'urgence",
                  "Coordination avec les partenaires (OMS, CEDEAO, Africa CDC)",
                  "Retour d'expérience : leçons apprises des crises récentes"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Executive Program en Leadership Supply Chain",
        "duration": "12 jours",
        "cost": "2500 USD",
        "modules": [
          {
            "name": "Gestion des approvisionnements et des stocks",
            "duration": "5 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Principes fondamentaux de la gestion des stocks",
                "duration": "1 jour",
                "chapters": [
                  "Définitions et concepts clés (stock de sécurité, min, max)",
                  "Types de stocks et leur rôle dans la chaîne pharmaceutique",
                  "Indicateurs clés de performance (taux de rupture, surstockage)",
                  "Introduction aux bonnes pratiques de gestion des stocks"
                ]
              },
              {
                "title": "Méthodes de calcul des niveaux de stock",
                "duration": "1 jour",
                "chapters": [
                  "Calcul de la consommation moyenne mensuelle (CMM)",
                  "Méthode min/max : formules et application",
                  "Calcul du point de commande et du délai de livraison",
                  "Exercices pratiques sur données réelles"
                ]
              },
              {
                "title": "Processus de commande et suivi fournisseurs",
                "duration": "1 jour",
                "chapters": [
                  "Cycle de commande : de la quantification à la réception",
                  "Sélection et évaluation des fournisseurs",
                  "Gestion des contrats et des termes de livraison",
                  "Outils de suivi des commandes et tableau de bord fournisseurs"
                ]
              },
              {
                "title": "Gestion des ruptures et des surstocks",
                "duration": "1 jour",
                "chapters": [
                  "Causes et conséquences des ruptures de stock",
                  "Stratégies de prévention et de gestion des ruptures",
                  "Identification et traitement des surstocks",
                  "Plans de contingence et procédures d'urgence"
                ]
              },
              {
                "title": "Systèmes d'inventaire et outils digitaux",
                "duration": "1 jour",
                "chapters": [
                  "Types d'inventaires (permanent, périodique, tournant)",
                  "Procédures de comptage et de réconciliation",
                  "Outils digitaux de gestion des stocks",
                  "Atelier : simulation d'un inventaire complet"
                ]
              }
            ]
          },
          {
            "name": "Data analytics logistique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Collecte et nettoyage des données logistiques",
                "duration": "1 jour",
                "chapters": [
                  "Sources de données logistiques (LMIS, registres, rapports)",
                  "Identification et traitement des données manquantes ou erronées",
                  "Structuration des bases de données logistiques",
                  "Bonnes pratiques de saisie et de validation des données"
                ]
              },
              {
                "title": "Visualisation avec Excel / Power BI",
                "duration": "1 jour",
                "chapters": [
                  "Création de graphiques et tableaux croisés dynamiques sous Excel",
                  "Introduction à Power BI : connexion aux données, modélisation",
                  "Conception de visuels interactifs",
                  "Partage et publication des rapports Power BI"
                ]
              },
              {
                "title": "Tableaux de bord et aide à la décision",
                "duration": "1 jour",
                "chapters": [
                  "Conception d'un tableau de bord logistique national",
                  "Indicateurs clés à monitorer",
                  "Utilisation des données pour les revues de performance",
                  "Atelier : construction d'un tableau de bord complet"
                ]
              }
            ]
          },
          {
            "name": "Supply chain humanitaire",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Spécificités de la logistique humanitaire",
                "duration": "1 jour",
                "chapters": [
                  "Différences entre supply chain commerciale et humanitaire",
                  "Gestion des approvisionnements en contexte de crise",
                  "Acteurs clés de la logistique humanitaire (UNICEF, MSF, OCHA)",
                  "Procédures d'urgence et achats accélérés"
                ]
              },
              {
                "title": "Coordination inter-agences et gestion des clusters",
                "duration": "1 jour",
                "chapters": [
                  "Système des clusters humanitaires",
                  "Mécanismes de coordination et partage de l'information",
                  "Gestion des entrepôts humanitaires et des pipelines d'urgence",
                  "Étude de cas : réponse Ebola, COVID-19, crises alimentaires"
                ]
              }
            ]
          },
          {
            "name": "Gestion des urgences sanitaires",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Planification de la réponse aux urgences",
                "duration": "1 jour",
                "chapters": [
                  "Cadres internationaux (RSI 2005, Sendai, NAPHS)",
                  "Évaluation des risques et cartographie des menaces sanitaires",
                  "Plans de préparation et de réponse aux urgences",
                  "Simulation d'exercice : tabletop exercise"
                ]
              },
              {
                "title": "Mobilisation rapide des stocks et contingences",
                "duration": "1 jour",
                "chapters": [
                  "Stocks prépositionnés et stocks stratégiques nationaux",
                  "Procédures de déclenchement et de libération des stocks d'urgence",
                  "Coordination avec les partenaires (OMS, CEDEAO, Africa CDC)",
                  "Retour d'expérience : leçons apprises des crises récentes"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "regulation",
    "title": "ACADÉMIE RÉGLEMENTATION PHARMACEUTIQUE",
    "certifications": [
      {
        "name": "Certificat en Cadre Réglementaire Pharmaceutique",
        "duration": "11 jours",
        "cost": "2300 USD",
        "modules": [
          {
            "name": "Réglementation pharmaceutique",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Cadres réglementaires nationaux et régionaux",
                "duration": "1 jour",
                "chapters": [
                  "Structure des systèmes réglementaires pharmaceutiques nationaux",
                  "Rôle de l'ARCA, de la CEDEAO et de l'Union Africaine",
                  "Comparaison des cadres réglementaires (Afrique, Europe, USA)",
                  "Défis de l'harmonisation réglementaire en Afrique"
                ]
              },
              {
                "title": "Enregistrement des médicaments",
                "duration": "1 jour",
                "chapters": [
                  "Processus d'enregistrement : dossier technique, évaluation, décision",
                  "Critères d'évaluation de la qualité, sécurité et efficacité",
                  "Procédures accélérées pour les médicaments essentiels",
                  "Gestion des délais et des rejets de dossiers"
                ]
              },
              {
                "title": "Contrôle de qualité des produits",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de contrôle qualité en laboratoire",
                  "Pharmacopées de référence (BP, USP, Ph. Eur.)",
                  "Plans d'échantillonnage et de surveillance post-commercialisation",
                  "Gestion des résultats hors spécifications (OOS)"
                ]
              },
              {
                "title": "Lutte contre les médicaments falsifiés et sous-standards",
                "duration": "1 jour",
                "chapters": [
                  "Ampleur du problème en Afrique subsaharienne",
                  "Systèmes d'alerte rapide (RAPID ALERT, WHO Global Surveillance)",
                  "Techniques de détection sur le terrain (Minilab, GPHF)",
                  "Cadres juridiques et sanctions applicables"
                ]
              },
              {
                "title": "Harmonisation réglementaire africaine",
                "duration": "1 jour",
                "chapters": [
                  "Initiative d'harmonisation réglementaire africaine (ARIA)",
                  "ZLECAf et ses implications pour la réglementation pharmaceutique",
                  "Procédures de reconnaissance mutuelle entre pays",
                  "Perspectives : Agence africaine du médicament (AMA)"
                ]
              }
            ]
          },
          {
            "name": "Gouvernance pharmaceutique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Politiques pharmaceutiques nationales",
                "duration": "1 jour",
                "chapters": [
                  "Composantes d'une politique pharmaceutique nationale (PPN)",
                  "Élaboration, mise en œuvre et révision des PPN",
                  "Liste nationale des médicaments essentiels (LNME)",
                  "Politique de génériques et accès aux médicaments abordables"
                ]
              },
              {
                "title": "Mécanismes de financement et d'accès",
                "duration": "1 jour",
                "chapters": [
                  "Sources de financement du secteur pharmaceutique",
                  "Mécanismes de prix et de remboursement",
                  "Fonds communs d'achat et centrales d'achats (ACAME, OOAS)",
                  "Partenariats public-privé pour l'accès aux médicaments"
                ]
              },
              {
                "title": "Rôle des agences de régulation",
                "duration": "1 jour",
                "chapters": [
                  "Missions et attributions d'une agence nationale de régulation",
                  "Indépendance, financement et gouvernance des agences",
                  "Inspection et contrôle du marché pharmaceutique",
                  "Benchmarking : NAFDAC, SAHPRA, ANSM"
                ]
              }
            ]
          },
          {
            "name": "Gestion réglementaire des produits de santé",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Dossiers d'enregistrement   (1 jour)",
                "duration": "CTD/ACTD",
                "chapters": [
                  "Structure du dossier technique commun (CTD/eCTD)",
                  "Format africain ACTD : spécificités et exigences",
                  "Modules du CTD : qualité, préclinique, clinique",
                  "Préparation et soumission électronique des dossiers"
                ]
              },
              {
                "title": "Gestion du cycle de vie des produits",
                "duration": "1 jour",
                "chapters": [
                  "Maintien de l'autorisation de mise sur le marché (AMM)",
                  "Gestion des variations (Type I, Type II, extensions de gamme)",
                  "Surveillance post-commercialisation",
                  "Retraits de lot et alertes de sécurité"
                ]
              },
              {
                "title": "Renouvellements, variations et retraits de marché",
                "duration": "1 jour",
                "chapters": [
                  "Procédures de renouvellement des AMM",
                  "Classification et gestion des variations réglementaires",
                  "Procédures de retrait volontaire et obligatoire",
                  "Communication de crise lors d'un retrait de marché"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Assurance Qualité",
        "duration": "10 jours",
        "cost": "2100 USD",
        "modules": [
          {
            "name": "Assurance qualité",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Systèmes de management de la qualité",
                "duration": "1 jour",
                "chapters": [
                  "Principes ISO 9001 appliqués au secteur pharmaceutique",
                  "Bonnes pratiques de fabrication (BPF/GMP) OMS et ICH",
                  "Structure d'un système qualité pharmaceutique (PQS)",
                  "Culture qualité et engagement de la direction"
                ]
              },
              {
                "title": "Audits internes et externes",
                "duration": "1 jour",
                "chapters": [
                  "Planification et conduite d'un audit qualité",
                  "Techniques d'entretien et d'observation lors des audits",
                  "Rédaction des rapports d'audit et des non-conformités",
                  "Suivi des actions correctives et préventives (CAPA)"
                ]
              },
              {
                "title": "Gestion des non-conformités",
                "duration": "1 jour",
                "chapters": [
                  "Identification et classification des non-conformités",
                  "Analyse des causes profondes (diagramme d'Ishikawa, 5 Pourquoi)",
                  "Plan d'actions correctives et préventives (CAPA)",
                  "Évaluation de l'efficacité des actions mises en place"
                ]
              },
              {
                "title": "Qualification et validation",
                "duration": "1 jour",
                "chapters": [
                  "Qualification des équipements (IQ, OQ, PQ)",
                  "Validation des procédés de fabrication et de nettoyage",
                  "Validation des méthodes analytiques",
                  "Gestion des changements (change control)"
                ]
              },
              {
                "title": "Documentation qualité",
                "duration": "1 jour",
                "chapters": [
                  "Hiérarchie documentaire (politiques, SOPs, instructions, enregistrements)",
                  "Rédaction et maîtrise des SOPs",
                  "Gestion électronique des documents (GED)",
                  "Archivage et traçabilité documentaire"
                ]
              }
            ]
          },
          {
            "name": "Inspection pharmaceutique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Méthodologie d'inspection des établissements",
                "duration": "1 jour",
                "chapters": [
                  "Types d'inspections (routine, ciblée, de suivi, inopinée)",
                  "Préparation d'une inspection : checklist et planification",
                  "Conduite de l'inspection : ouverture, visite, clôture",
                  "Droits et obligations des inspecteurs et des inspectés"
                ]
              },
              {
                "title": "Inspection des officines et grossistes",
                "duration": "1 jour",
                "chapters": [
                  "Critères d'inspection des officines (locaux, personnel, stocks)",
                  "Inspection des grossistes-répartiteurs et dépôts",
                  "Vérification des conditions de stockage et de distribution",
                  "Identification des infractions et sanctions applicables"
                ]
              },
              {
                "title": "Rédaction des rapports d'inspection",
                "duration": "1 jour",
                "chapters": [
                  "Structure et contenu d'un rapport d'inspection",
                  "Classification des observations (critique, majeure, mineure)",
                  "Notification aux établissements inspectés",
                  "Suivi des mesures correctives et fermeture des observations"
                ]
              }
            ]
          },
          {
            "name": "Traçabilité pharmaceutique",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Systèmes de sérialisation et track & trace",
                "duration": "1 jour",
                "chapters": [
                  "Principes de la sérialisation des médicaments",
                  "Standards internationaux (GS1, DataMatrix, QR codes)",
                  "Systèmes de track & trace : niveaux (unité, boîte, palette)",
                  "Réglementation internationale (EU FMD, DSCSA USA)"
                ]
              },
              {
                "title": "Outils numériques de traçabilité",
                "duration": "1 jour",
                "chapters": [
                  "Technologies RFID : principes et applications pharmaceutiques",
                  "Codes QR et vérification par smartphone",
                  "Intégration avec les systèmes ERP et LMIS",
                  "Étude de cas : mise en œuvre de la traçabilité en Afrique"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Bonnes Pratiques Pharmaceutiques",
        "duration": "10 jours",
        "cost": "2100 USD",
        "modules": [
          {
            "name": "Assurance qualité",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Systèmes de management de la qualité",
                "duration": "1 jour",
                "chapters": [
                  "Principes ISO 9001 appliqués au secteur pharmaceutique",
                  "Bonnes pratiques de fabrication (BPF/GMP) OMS et ICH",
                  "Structure d'un système qualité pharmaceutique (PQS)",
                  "Culture qualité et engagement de la direction"
                ]
              },
              {
                "title": "Audits internes et externes",
                "duration": "1 jour",
                "chapters": [
                  "Planification et conduite d'un audit qualité",
                  "Techniques d'entretien et d'observation lors des audits",
                  "Rédaction des rapports d'audit et des non-conformités",
                  "Suivi des actions correctives et préventives (CAPA)"
                ]
              },
              {
                "title": "Gestion des non-conformités",
                "duration": "1 jour",
                "chapters": [
                  "Identification et classification des non-conformités",
                  "Analyse des causes profondes (Ishikawa, 5 Pourquoi)",
                  "Plan d'actions correctives et préventives (CAPA)",
                  "Évaluation de l'efficacité des actions mises en place"
                ]
              },
              {
                "title": "Qualification et validation",
                "duration": "1 jour",
                "chapters": [
                  "Qualification des équipements (IQ, OQ, PQ)",
                  "Validation des procédés de fabrication et de nettoyage",
                  "Validation des méthodes analytiques",
                  "Gestion des changements (change control)"
                ]
              },
              {
                "title": "Documentation qualité",
                "duration": "1 jour",
                "chapters": [
                  "Hiérarchie documentaire (politiques, SOPs, instructions)",
                  "Rédaction et maîtrise des SOPs",
                  "Gestion électronique des documents (GED)",
                  "Archivage et traçabilité documentaire"
                ]
              }
            ]
          },
          {
            "name": "Importation et conformité",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Procédures d'importation et de dédouanement",
                "duration": "1 jour",
                "chapters": [
                  "Réglementation douanière applicable aux produits pharmaceutiques",
                  "Documents requis : certificat d'analyse, de conformité, AMM",
                  "Procédures de dédouanement accéléré pour les urgences",
                  "Rôle des transitaires et des courtiers en douane"
                ]
              },
              {
                "title": "Vérification de conformité et certification",
                "duration": "1 jour",
                "chapters": [
                  "Inspection à la réception des produits importés",
                  "Certificats OMS de produit pharmaceutique (CPP)",
                  "Mécanismes de vérification de l'authenticité des documents",
                  "Procédures de retour et de destruction des produits non conformes"
                ]
              }
            ]
          },
          {
            "name": "Inspection pharmaceutique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Méthodologie d'inspection des établissements",
                "duration": "1 jour",
                "chapters": [
                  "Types d'inspections (routine, ciblée, de suivi, inopinée)",
                  "Préparation d'une inspection : checklist et planification",
                  "Conduite de l'inspection : ouverture, visite, clôture",
                  "Droits et obligations des inspecteurs et des inspectés"
                ]
              },
              {
                "title": "Inspection des officines et grossistes",
                "duration": "1 jour",
                "chapters": [
                  "Critères d'inspection des officines (locaux, personnel, stocks)",
                  "Inspection des grossistes-répartiteurs et dépôts",
                  "Vérification des conditions de stockage et de distribution",
                  "Identification des infractions et sanctions applicables"
                ]
              },
              {
                "title": "Rédaction des rapports d'inspection",
                "duration": "1 jour",
                "chapters": [
                  "Structure et contenu d'un rapport d'inspection",
                  "Classification des observations (critique, majeure, mineure)",
                  "Notification aux établissements inspectés",
                  "Suivi des mesures correctives et fermeture des observations"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Pharmacovigilance",
        "duration": "6 jours",
        "cost": "1400 USD",
        "modules": [
          {
            "name": "Pharmacovigilance",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Systèmes de notification des effets indésirables",
                "duration": "1 jour",
                "chapters": [
                  "Définitions : effet indésirable, événement indésirable, signal",
                  "Obligations réglementaires de notification (professionnels, industrie)",
                  "Formulaires de notification et circuits de remontée",
                  "Rôle des centres nationaux de pharmacovigilance"
                ]
              },
              {
                "title": "Analyse de causalité et évaluation des signaux",
                "duration": "1 jour",
                "chapters": [
                  "Algorithmes de causalité (OMS-Uppsala, Naranjo)",
                  "Détection et validation des signaux de sécurité",
                  "Gestion des risques : REMS, plans de gestion des risques (RMP)",
                  "Communication sur les risques médicamenteux"
                ]
              },
              {
                "title": "Reporting national et international",
                "duration": "1 jour",
                "chapters": [
                  "Exigences de reporting aux autorités nationales",
                  "Soumission à la base de données OMS VigiBase",
                  "Rapports périodiques de sécurité (PSUR/PBRER)",
                  "Collaboration avec le Programme OMS de pharmacovigilance"
                ]
              }
            ]
          },
          {
            "name": "Gestion réglementaire des produits de santé",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Dossiers d'enregistrement   (1 jour)",
                "duration": "CTD/ACTD",
                "chapters": [
                  "Structure du dossier technique commun (CTD/eCTD)",
                  "Format africain ACTD : spécificités et exigences",
                  "Modules du CTD : qualité, préclinique, clinique",
                  "Préparation et soumission électronique des dossiers"
                ]
              },
              {
                "title": "Gestion du cycle de vie des produits",
                "duration": "1 jour",
                "chapters": [
                  "Maintien de l'autorisation de mise sur le marché (AMM)",
                  "Gestion des variations (Type I, Type II, extensions de gamme)",
                  "Surveillance post-commercialisation",
                  "Retraits de lot et alertes de sécurité"
                ]
              },
              {
                "title": "Renouvellements, variations et retraits de marché",
                "duration": "1 jour",
                "chapters": [
                  "Procédures de renouvellement des AMM",
                  "Classification et gestion des variations réglementaires",
                  "Procédures de retrait volontaire et obligatoire",
                  "Communication de crise lors d'un retrait de marché"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Régulation Pharmaceutique",
        "duration": "15 jours",
        "cost": "3300 USD",
        "modules": [
          {
            "name": "Réglementation pharmaceutique",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Cadres réglementaires nationaux et régionaux",
                "duration": "1 jour",
                "chapters": [
                  "Structure des systèmes réglementaires pharmaceutiques nationaux",
                  "Rôle de l'ARCA, de la CEDEAO et de l'Union Africaine",
                  "Comparaison des cadres réglementaires (Afrique, Europe, USA)",
                  "Défis de l'harmonisation réglementaire en Afrique"
                ]
              },
              {
                "title": "Enregistrement des médicaments",
                "duration": "1 jour",
                "chapters": [
                  "Processus d'enregistrement : dossier technique, évaluation, décision",
                  "Critères d'évaluation de la qualité, sécurité et efficacité",
                  "Procédures accélérées pour les médicaments essentiels",
                  "Gestion des délais et des rejets de dossiers"
                ]
              },
              {
                "title": "Contrôle de qualité des produits",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de contrôle qualité en laboratoire",
                  "Pharmacopées de référence (BP, USP, Ph. Eur.)",
                  "Plans d'échantillonnage et de surveillance post-commercialisation",
                  "Gestion des résultats hors spécifications (OOS)"
                ]
              },
              {
                "title": "Lutte contre les médicaments falsifiés",
                "duration": "1 jour",
                "chapters": [
                  "Ampleur du problème en Afrique subsaharienne",
                  "Systèmes d'alerte rapide (RAPID ALERT, WHO Global Surveillance)",
                  "Techniques de détection sur le terrain (Minilab, GPHF)",
                  "Cadres juridiques et sanctions applicables"
                ]
              },
              {
                "title": "Harmonisation réglementaire africaine",
                "duration": "1 jour",
                "chapters": [
                  "Initiative d'harmonisation réglementaire africaine (ARIA)",
                  "ZLECAf et ses implications pour la réglementation pharmaceutique",
                  "Procédures de reconnaissance mutuelle entre pays",
                  "Perspectives : Agence africaine du médicament (AMA)"
                ]
              }
            ]
          },
          {
            "name": "Gouvernance pharmaceutique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Politiques pharmaceutiques nationales",
                "duration": "1 jour",
                "chapters": [
                  "Composantes d'une politique pharmaceutique nationale (PPN)",
                  "Élaboration, mise en œuvre et révision des PPN",
                  "Liste nationale des médicaments essentiels (LNME)",
                  "Politique de génériques et accès aux médicaments abordables"
                ]
              },
              {
                "title": "Mécanismes de financement et d'accès",
                "duration": "1 jour",
                "chapters": [
                  "Sources de financement du secteur pharmaceutique",
                  "Mécanismes de prix et de remboursement",
                  "Fonds communs d'achat et centrales d'achats (ACAME, OOAS)",
                  "Partenariats public-privé pour l'accès aux médicaments"
                ]
              },
              {
                "title": "Rôle des agences de régulation",
                "duration": "1 jour",
                "chapters": [
                  "Missions et attributions d'une agence nationale de régulation",
                  "Indépendance, financement et gouvernance des agences",
                  "Inspection et contrôle du marché pharmaceutique",
                  "Benchmarking : NAFDAC, SAHPRA, ANSM"
                ]
              }
            ]
          },
          {
            "name": "Importation et conformité",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Procédures d'importation et de dédouanement",
                "duration": "1 jour",
                "chapters": [
                  "Réglementation douanière applicable aux produits pharmaceutiques",
                  "Documents requis : certificat d'analyse, de conformité, AMM",
                  "Procédures de dédouanement accéléré pour les urgences",
                  "Rôle des transitaires et des courtiers en douane"
                ]
              },
              {
                "title": "Vérification de conformité et certification",
                "duration": "1 jour",
                "chapters": [
                  "Inspection à la réception des produits importés",
                  "Certificats OMS de produit pharmaceutique (CPP)",
                  "Mécanismes de vérification de l'authenticité des documents",
                  "Procédures de retour et de destruction des produits non conformes"
                ]
              }
            ]
          },
          {
            "name": "Traçabilité pharmaceutique",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Systèmes de sérialisation et track & trace",
                "duration": "1 jour",
                "chapters": [
                  "Principes de la sérialisation des médicaments",
                  "Standards internationaux (GS1, DataMatrix, QR codes)",
                  "Systèmes de track & trace : niveaux (unité, boîte, palette)",
                  "Réglementation internationale (EU FMD, DSCSA USA)"
                ]
              },
              {
                "title": "Outils numériques de traçabilité",
                "duration": "1 jour",
                "chapters": [
                  "Technologies RFID : principes et applications pharmaceutiques",
                  "Codes QR et vérification par smartphone",
                  "Intégration avec les systèmes ERP et LMIS",
                  "Étude de cas : mise en œuvre de la traçabilité en Afrique"
                ]
              }
            ]
          },
          {
            "name": "Inspection pharmaceutique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Méthodologie d'inspection des établissements",
                "duration": "1 jour",
                "chapters": [
                  "Types d'inspections (routine, ciblée, de suivi, inopinée)",
                  "Préparation d'une inspection : checklist et planification",
                  "Conduite de l'inspection : ouverture, visite, clôture",
                  "Droits et obligations des inspecteurs et des inspectés"
                ]
              },
              {
                "title": "Inspection des officines et grossistes",
                "duration": "1 jour",
                "chapters": [
                  "Critères d'inspection des officines (locaux, personnel, stocks)",
                  "Inspection des grossistes-répartiteurs et dépôts",
                  "Vérification des conditions de stockage et de distribution",
                  "Identification des infractions et sanctions applicables"
                ]
              },
              {
                "title": "Rédaction des rapports d'inspection",
                "duration": "1 jour",
                "chapters": [
                  "Structure et contenu d'un rapport d'inspection",
                  "Classification des observations (critique, majeure, mineure)",
                  "Notification aux établissements inspectés",
                  "Suivi des mesures correctives et fermeture des observations"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "digital",
    "title": "ACADÉMIE SANTÉ DIGITALE & INNOVATION",
    "certifications": [
      {
        "name": "Certificat en Santé Digitale",
        "duration": "11 jours",
        "cost": "2500 USD",
        "modules": [
          {
            "name": "Santé numérique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Panorama des outils de santé digitale",
                "duration": "1 jour",
                "chapters": [
                  "Écosystème global des outils de santé numérique",
                  "DHIS2 : architecture, modules et cas d'usage",
                  "CommCare et ODK : collecte de données sur le terrain",
                  "Autres outils : OpenMRS, iHRIS, RapidPro"
                ]
              },
              {
                "title": "Stratégies nationales de santé numérique",
                "duration": "1 jour",
                "chapters": [
                  "Composantes d'une stratégie nationale de santé numérique",
                  "Cadre de l'OMS pour la transformation numérique de la santé",
                  "Expériences africaines : Kenya, Sénégal, Rwanda, Éthiopie",
                  "Gouvernance et coordination des initiatives e-santé"
                ]
              },
              {
                "title": "Interopérabilité des systèmes d'information de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de l'interopérabilité en santé",
                  "Standards d'échange de données (HL7, FHIR, ADX)",
                  "Architecture ouverte OpenHIE",
                  "Mise en œuvre d'un cadre d'interopérabilité national"
                ]
              }
            ]
          },
          {
            "name": "Architecture des systèmes santé",
            "duration": "5 jours",
            "cost": "1100 USD",
            "subModules": [
              {
                "title": "Principes d'architecture des systèmes d'information",
                "duration": "1 jour",
                "chapters": [
                  "Concepts fondamentaux : architecture, composants, couches",
                  "Architecture orientée services (SOA) et microservices",
                  "Patterns d'intégration des systèmes d'information",
                  "Documentation d'architecture (UML, ArchiMate)"
                ]
              },
              {
                "title": "Conception d'un SIS national",
                "duration": "1 jour",
                "chapters": [
                  "Cartographie des besoins fonctionnels d'un SIS national",
                  "Composantes d'un SIS : DHIS2, eLMIS, dossier patient électronique",
                  "Approche modulaire et évolutive",
                  "Gouvernance et comité de pilotage d'un SIS"
                ]
              },
              {
                "title": "Standards d'interopérabilité   (1 jour)",
                "duration": "HL7, FHIR, OpenHIE",
                "chapters": [
                  "HL7 FHIR : ressources, API RESTful et cas d'usage",
                  "Standards OpenHIE et profils IHE",
                  "Médiateurs d'intégration (OpenHIM)",
                  "Mise en œuvre pratique d'une interface d'interopérabilité"
                ]
              },
              {
                "title": "Infrastructure cloud et hébergement sécurisé",
                "duration": "1 jour",
                "chapters": [
                  "Modèles cloud (IaaS, PaaS, SaaS) pour la santé",
                  "Souveraineté des données et hébergement local vs cloud",
                  "Sécurisation de l'infrastructure (pare-feu, chiffrement, sauvegardes)",
                  "Dimensionnement et scalabilité des serveurs"
                ]
              },
              {
                "title": "Gouvernance et maintenance des systèmes",
                "duration": "1 jour",
                "chapters": [
                  "Gestion du cycle de vie des systèmes d'information",
                  "Contrats de maintenance et niveaux de service (SLA)",
                  "Gestion des mises à jour et des migrations",
                  "Tableau de bord de monitoring des systèmes"
                ]
              }
            ]
          },
          {
            "name": "Gouvernance des données",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Politique de gestion des données de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de la gouvernance des données",
                  "Propriété, responsabilité et droits sur les données de santé",
                  "Élaboration d'une politique nationale de données de santé",
                  "Rôles : propriétaire, gestionnaire, utilisateur des données"
                ]
              },
              {
                "title": "Protection des données et conformité",
                "duration": "1 jour",
                "chapters": [
                  "Principes du RGPD et leur application en contexte africain",
                  "Législations africaines sur la protection des données (UEMOA, CEDEAO)",
                  "Consentement éclairé et anonymisation des données",
                  "Audit de conformité et mesures de protection"
                ]
              },
              {
                "title": "Qualité et intégrité des données",
                "duration": "1 jour",
                "chapters": [
                  "Dimensions de la qualité des données (exactitude, complétude, cohérence)",
                  "Outils d'évaluation de la qualité des données (RDQA, DQA)",
                  "Processus de validation et de nettoyage des données",
                  "Culture de la qualité des données au sein des organisations"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Traçabilité",
        "duration": "5 jours",
        "cost": "1200 USD",
        "modules": [
          {
            "name": "Traçabilité des produits de santé",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Technologies de traçabilité   (1 jour)",
                "duration": "codes-barres, QR, RFID",
                "chapters": [
                  "Codes-barres 1D et 2D (EAN, DataMatrix) : principes et lecture",
                  "QR codes : génération, encodage et vérification",
                  "RFID : fonctionnement, avantages et limites",
                  "Comparaison des technologies et choix selon le contexte"
                ]
              },
              {
                "title": "Mise en œuvre dans les chaînes d'approvisionnement",
                "duration": "1 jour",
                "chapters": [
                  "Étapes de déploiement d'un système de traçabilité",
                  "Intégration avec les systèmes ERP et LMIS",
                  "Formation des utilisateurs et gestion du changement",
                  "Étude de cas : déploiement en Afrique francophone"
                ]
              }
            ]
          },
          {
            "name": "eLMIS",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Introduction aux systèmes eLMIS",
                "duration": "1 jour",
                "chapters": [
                  "Définition, fonctions et bénéfices d'un eLMIS",
                  "Panorama des solutions disponibles (OpenLMIS, eSIGL, mSupply)",
                  "Critères de sélection d'un eLMIS adapté au contexte national",
                  "Facteurs clés de succès de l'implémentation"
                ]
              },
              {
                "title": "Configuration et administration",
                "duration": "1 jour",
                "chapters": [
                  "Paramétrage d'un eLMIS : produits, établissements, utilisateurs",
                  "Configuration des workflows et des processus métier",
                  "Gestion des droits d'accès et des rôles",
                  "Maintenance et mises à jour du système"
                ]
              },
              {
                "title": "Exploitation des données pour la prise de décision",
                "duration": "1 jour",
                "chapters": [
                  "Extraction et analyse des données de stock depuis l'eLMIS",
                  "Génération de rapports automatisés",
                  "Intégration avec DHIS2 et autres systèmes",
                  "Utilisation des données pour les revues de programme"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Data Analytics Santé",
        "duration": "11 jours",
        "cost": "2600 USD",
        "modules": [
          {
            "name": "Collecte et analyse digitale des données de santé",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Outils de collecte mobile   (1 jour)",
                "duration": "KoboToolbox, ODK",
                "chapters": [
                  "KoboToolbox : conception de formulaires et déploiement",
                  "ODK Collect : installation, paramétrage et synchronisation",
                  "Conception de questionnaires adaptés aux mobiles",
                  "Gestion des données hors connexion et synchronisation"
                ]
              },
              {
                "title": "Nettoyage et structuration des données",
                "duration": "1 jour",
                "chapters": [
                  "Identification des erreurs et des valeurs aberrantes",
                  "Techniques de nettoyage sous Excel et R/Python",
                  "Structuration des bases de données pour l'analyse",
                  "Documentation des procédures de nettoyage"
                ]
              },
              {
                "title": "Analyse et interprétation des résultats",
                "duration": "1 jour",
                "chapters": [
                  "Statistiques descriptives appliquées aux données de santé",
                  "Tests statistiques de base (chi², t-test, corrélation)",
                  "Présentation et communication des résultats",
                  "Rédaction d'un rapport d'analyse de données"
                ]
              }
            ]
          },
          {
            "name": "Gouvernance des données",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Politique de gestion des données de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de la gouvernance des données",
                  "Propriété, responsabilité et droits sur les données de santé",
                  "Élaboration d'une politique nationale de données de santé",
                  "Rôles : propriétaire, gestionnaire, utilisateur des données"
                ]
              },
              {
                "title": "Protection des données et conformité",
                "duration": "1 jour",
                "chapters": [
                  "Principes du RGPD et leur application en contexte africain",
                  "Législations africaines sur la protection des données",
                  "Consentement éclairé et anonymisation des données",
                  "Audit de conformité et mesures de protection"
                ]
              },
              {
                "title": "Qualité et intégrité des données",
                "duration": "1 jour",
                "chapters": [
                  "Dimensions de la qualité des données (exactitude, complétude, cohérence)",
                  "Outils d'évaluation de la qualité des données (RDQA, DQA)",
                  "Processus de validation et de nettoyage des données",
                  "Culture de la qualité des données au sein des organisations"
                ]
              }
            ]
          },
          {
            "name": "Intelligence artificielle appliquée à la santé",
            "duration": "5 jours",
            "cost": "1200 USD",
            "subModules": [
              {
                "title": "Fondamentaux de l'IA et du machine learning",
                "duration": "1 jour",
                "chapters": [
                  "Concepts clés : IA, machine learning, deep learning",
                  "Types d'apprentissage (supervisé, non supervisé, par renforcement)",
                  "Principales familles d'algorithmes et leurs applications",
                  "Environnements de développement (Python, TensorFlow, scikit-learn)"
                ]
              },
              {
                "title": "IA appliquée au diagnostic et à l'imagerie médicale",
                "duration": "1 jour",
                "chapters": [
                  "Réseaux de neurones convolutifs (CNN) pour l'imagerie",
                  "Applications : détection de la malaria, TB, rétinopathie",
                  "Validation clinique des algorithmes d'IA",
                  "Enjeux de l'intégration de l'IA dans le parcours de soins"
                ]
              },
              {
                "title": "IA pour la prédiction épidémiologique",
                "duration": "1 jour",
                "chapters": [
                  "Modèles prédictifs de propagation des épidémies",
                  "Analyse des données de surveillance épidémiologique",
                  "Systèmes d'alerte précoce basés sur l'IA",
                  "Cas d'usage : prédiction du paludisme, choléra, COVID-19"
                ]
              },
              {
                "title": "Enjeux éthiques de l'IA en santé",
                "duration": "1 jour",
                "chapters": [
                  "Biais algorithmiques et équité en santé",
                  "Transparence et explicabilité des modèles d'IA",
                  "Responsabilité médicale et juridique des décisions assistées par IA",
                  "Cadres éthiques internationaux (UNESCO, OMS)"
                ]
              },
              {
                "title": "Atelier pratique : cas d'usage africains",
                "duration": "1 jour",
                "chapters": [
                  "Développement d'un modèle de prédiction simple",
                  "Analyse d'un jeu de données de santé africain",
                  "Présentation et critique des projets développés",
                  "Perspectives de déploiement à l'échelle nationale"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification Power BI Santé",
        "duration": "6 jours",
        "cost": "1400 USD",
        "modules": [
          {
            "name": "Collecte et analyse digitale des données de santé",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Outils de collecte mobile   (1 jour)",
                "duration": "KoboToolbox, ODK",
                "chapters": [
                  "KoboToolbox : conception de formulaires et déploiement",
                  "ODK Collect : installation, paramétrage et synchronisation",
                  "Conception de questionnaires adaptés aux mobiles",
                  "Gestion des données hors connexion et synchronisation"
                ]
              },
              {
                "title": "Nettoyage et structuration des données",
                "duration": "1 jour",
                "chapters": [
                  "Identification des erreurs et des valeurs aberrantes",
                  "Techniques de nettoyage sous Excel et R/Python",
                  "Structuration des bases de données pour l'analyse",
                  "Documentation des procédures de nettoyage"
                ]
              },
              {
                "title": "Analyse et interprétation des résultats",
                "duration": "1 jour",
                "chapters": [
                  "Statistiques descriptives appliquées aux données de santé",
                  "Tests statistiques de base (chi², t-test, corrélation)",
                  "Présentation et communication des résultats",
                  "Rédaction d'un rapport d'analyse de données"
                ]
              }
            ]
          },
          {
            "name": "Gouvernance des données",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Politique de gestion des données de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de la gouvernance des données",
                  "Propriété, responsabilité et droits sur les données de santé",
                  "Élaboration d'une politique nationale de données de santé",
                  "Rôles : propriétaire, gestionnaire, utilisateur des données"
                ]
              },
              {
                "title": "Protection des données et conformité",
                "duration": "1 jour",
                "chapters": [
                  "Principes du RGPD et leur application en contexte africain",
                  "Législations africaines sur la protection des données",
                  "Consentement éclairé et anonymisation des données",
                  "Audit de conformité et mesures de protection"
                ]
              },
              {
                "title": "Qualité et intégrité des données",
                "duration": "1 jour",
                "chapters": [
                  "Dimensions de la qualité des données",
                  "Outils d'évaluation de la qualité des données (RDQA, DQA)",
                  "Processus de validation et de nettoyage des données",
                  "Culture de la qualité des données au sein des organisations"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Executive Program en Transformation Digitale Santé",
        "duration": "16 jours",
        "cost": "3900 USD",
        "modules": [
          {
            "name": "Santé numérique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Panorama des outils de santé digitale",
                "duration": "1 jour",
                "chapters": [
                  "Écosystème global des outils de santé numérique",
                  "DHIS2 : architecture, modules et cas d'usage",
                  "CommCare et ODK : collecte de données sur le terrain",
                  "Autres outils : OpenMRS, iHRIS, RapidPro"
                ]
              },
              {
                "title": "Stratégies nationales de santé numérique",
                "duration": "1 jour",
                "chapters": [
                  "Composantes d'une stratégie nationale de santé numérique",
                  "Cadre de l'OMS pour la transformation numérique de la santé",
                  "Expériences africaines : Kenya, Sénégal, Rwanda, Éthiopie",
                  "Gouvernance et coordination des initiatives e-santé"
                ]
              },
              {
                "title": "Interopérabilité des systèmes d'information de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et enjeux de l'interopérabilité en santé",
                  "Standards d'échange de données (HL7, FHIR, ADX)",
                  "Architecture ouverte OpenHIE",
                  "Mise en œuvre d'un cadre d'interopérabilité national"
                ]
              }
            ]
          },
          {
            "name": "Intelligence artificielle appliquée à la santé",
            "duration": "5 jours",
            "cost": "1200 USD",
            "subModules": [
              {
                "title": "Fondamentaux de l'IA et du machine learning",
                "duration": "1 jour",
                "chapters": [
                  "Concepts clés : IA, machine learning, deep learning",
                  "Types d'apprentissage (supervisé, non supervisé, par renforcement)",
                  "Principales familles d'algorithmes et leurs applications",
                  "Environnements de développement (Python, TensorFlow, scikit-learn)"
                ]
              },
              {
                "title": "IA appliquée au diagnostic et à l'imagerie médicale",
                "duration": "1 jour",
                "chapters": [
                  "Réseaux de neurones convolutifs (CNN) pour l'imagerie",
                  "Applications : détection de la malaria, TB, rétinopathie",
                  "Validation clinique des algorithmes d'IA",
                  "Enjeux de l'intégration de l'IA dans le parcours de soins"
                ]
              },
              {
                "title": "IA pour la prédiction épidémiologique",
                "duration": "1 jour",
                "chapters": [
                  "Modèles prédictifs de propagation des épidémies",
                  "Analyse des données de surveillance épidémiologique",
                  "Systèmes d'alerte précoce basés sur l'IA",
                  "Cas d'usage : prédiction du paludisme, choléra, COVID-19"
                ]
              },
              {
                "title": "Enjeux éthiques de l'IA en santé",
                "duration": "1 jour",
                "chapters": [
                  "Biais algorithmiques et équité en santé",
                  "Transparence et explicabilité des modèles d'IA",
                  "Responsabilité médicale et juridique des décisions assistées par IA",
                  "Cadres éthiques internationaux (UNESCO, OMS)"
                ]
              },
              {
                "title": "Atelier pratique : cas d'usage africains",
                "duration": "1 jour",
                "chapters": [
                  "Développement d'un modèle de prédiction simple",
                  "Analyse d'un jeu de données de santé africain",
                  "Présentation et critique des projets développés",
                  "Perspectives de déploiement à l'échelle nationale"
                ]
              }
            ]
          },
          {
            "name": "Cybersécurité santé",
            "duration": "3 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Menaces et vulnérabilités des systèmes de santé",
                "duration": "1 jour",
                "chapters": [
                  "Panorama des cybermenaces (ransomware, phishing, attaques DDoS)",
                  "Vulnérabilités spécifiques aux systèmes d'information de santé (SIS)",
                  "Incidents majeurs dans le secteur santé : retours d'expérience",
                  "Évaluation des risques cyber dans un établissement de santé"
                ]
              },
              {
                "title": "Politiques de sécurité et bonnes pratiques",
                "duration": "1 jour",
                "chapters": [
                  "Élaboration d'une politique de sécurité des systèmes d'information (PSSI)",
                  "Bonnes pratiques : mots de passe, chiffrement, sauvegardes",
                  "Sécurisation des réseaux et des accès distants (VPN, MFA)",
                  "Sensibilisation et formation du personnel de santé"
                ]
              },
              {
                "title": "Réponse aux incidents et continuité des activités",
                "duration": "1 jour",
                "chapters": [
                  "Plan de réponse aux incidents de sécurité (IRP)",
                  "Procédures de détection, confinement et éradication",
                  "Plan de continuité des activités (PCA) et plan de reprise (PRA)",
                  "Exercice de simulation : gestion d'une cyberattaque hospitalière"
                ]
              }
            ]
          },
          {
            "name": "Architecture des systèmes santé",
            "duration": "5 jours",
            "cost": "1100 USD",
            "subModules": [
              {
                "title": "Principes d'architecture des systèmes d'information",
                "duration": "1 jour",
                "chapters": [
                  "Concepts fondamentaux : architecture, composants, couches",
                  "Architecture orientée services (SOA) et microservices",
                  "Patterns d'intégration des systèmes d'information",
                  "Documentation d'architecture (UML, ArchiMate)"
                ]
              },
              {
                "title": "Conception d'un SIS national",
                "duration": "1 jour",
                "chapters": [
                  "Cartographie des besoins fonctionnels d'un SIS national",
                  "Composantes d'un SIS : DHIS2, eLMIS, dossier patient électronique",
                  "Approche modulaire et évolutive",
                  "Gouvernance et comité de pilotage d'un SIS"
                ]
              },
              {
                "title": "Standards d'interopérabilité   (1 jour)",
                "duration": "HL7, FHIR, OpenHIE",
                "chapters": [
                  "HL7 FHIR : ressources, API RESTful et cas d'usage",
                  "Standards OpenHIE et profils IHE",
                  "Médiateurs d'intégration (OpenHIM)",
                  "Mise en œuvre pratique d'une interface d'interopérabilité"
                ]
              },
              {
                "title": "Infrastructure cloud et hébergement sécurisé",
                "duration": "1 jour",
                "chapters": [
                  "Modèles cloud (IaaS, PaaS, SaaS) pour la santé",
                  "Souveraineté des données et hébergement local vs cloud",
                  "Sécurisation de l'infrastructure (pare-feu, chiffrement, sauvegardes)",
                  "Dimensionnement et scalabilité des serveurs"
                ]
              },
              {
                "title": "Gouvernance et maintenance des systèmes",
                "duration": "1 jour",
                "chapters": [
                  "Gestion du cycle de vie des systèmes d'information",
                  "Contrats de maintenance et niveaux de service (SLA)",
                  "Gestion des mises à jour et des migrations",
                  "Tableau de bord de monitoring des systèmes"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "leadership",
    "title": "ACADÉMIE LEADERSHIP & GOUVERNANCE SANITAIRE",
    "certifications": [
      {
        "name": "Executive Certificate in Health Leadership",
        "duration": "12 jours",
        "cost": "3300 USD",
        "modules": [
          {
            "name": "Leadership exécutif",
            "duration": "5 jours",
            "cost": "1200 USD",
            "subModules": [
              {
                "title": "Styles de leadership et intelligence émotionnelle",
                "duration": "1 jour",
                "chapters": [
                  "Théories du leadership (transformationnel, situationnel, servant leadership)",
                  "Autodiagnostic de son style de leadership",
                  "Intelligence émotionnelle : les 4 composantes (Goleman)",
                  "Développement de l'empathie et de la conscience de soi"
                ]
              },
              {
                "title": "Communication stratégique et influence",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de communication persuasive",
                  "Prise de parole en public et storytelling",
                  "Communication en situation de crise",
                  "Gestion des médias et relations publiques"
                ]
              },
              {
                "title": "Prise de décision en contexte complexe",
                "duration": "1 jour",
                "chapters": [
                  "Cadres de prise de décision (OODA Loop, modèle Cynefin)",
                  "Gestion de l'incertitude et du risque décisionnel",
                  "Biais cognitifs et comment les contourner",
                  "Ateliers de simulation : scénarios de décision complexe"
                ]
              },
              {
                "title": "Leadership en temps de crise",
                "duration": "1 jour",
                "chapters": [
                  "Caractéristiques du leadership de crise",
                  "Gestion des équipes sous pression",
                  "Communication de crise interne et externe",
                  "Retours d'expérience : leaders africains face aux crises sanitaires"
                ]
              },
              {
                "title": "Coaching et développement des équipes",
                "duration": "1 jour",
                "chapters": [
                  "Principes du coaching professionnel",
                  "Techniques de feedback constructif",
                  "Construction et animation d'équipes performantes",
                  "Plans de développement individuel (PDI)"
                ]
              }
            ]
          },
          {
            "name": "Gestion stratégique",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Analyse stratégique   (1 jour)",
                "duration": "SWOT, PESTEL, chaîne de valeur",
                "chapters": [
                  "Analyse SWOT : forces, faiblesses, opportunités, menaces",
                  "Analyse PESTEL appliquée au secteur santé",
                  "Analyse de la chaîne de valeur et des parties prenantes",
                  "Cartographie des risques stratégiques"
                ]
              },
              {
                "title": "Formulation et mise en œuvre de la stratégie",
                "duration": "1 jour",
                "chapters": [
                  "Du diagnostic à la vision stratégique",
                  "Élaboration des objectifs stratégiques (SMART, OKR)",
                  "Déclinaison opérationnelle de la stratégie",
                  "Gestion des priorités et des ressources"
                ]
              },
              {
                "title": "Suivi-évaluation des performances organisationnelles",
                "duration": "1 jour",
                "chapters": [
                  "Tableaux de bord de pilotage stratégique (BSC)",
                  "Indicateurs de performance organisationnelle (KPI)",
                  "Revues de performance et processus d'amélioration continue",
                  "Communication des résultats aux parties prenantes"
                ]
              }
            ]
          },
          {
            "name": "Coordination multisectorielle",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Mécanismes de coordination intersectorielle",
                "duration": "1 jour",
                "chapters": [
                  "Approche One Health : santé humaine, animale, environnementale",
                  "Mécanismes de coordination nationale (comités interministériels)",
                  "Outils de collaboration et partage de l'information intersectorielle",
                  "Exemples africains de coordination multisectorielle réussie"
                ]
              },
              {
                "title": "Partenariats public-privé en santé",
                "duration": "1 jour",
                "chapters": [
                  "Cadres et modèles de PPP en santé",
                  "Négociation et contractualisation avec le secteur privé",
                  "Suivi et redevabilité des partenariats",
                  "Études de cas : PPP en santé en Afrique"
                ]
              }
            ]
          },
          {
            "name": "Diplomatie sanitaire",
            "duration": "2 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Négociation internationale en santé",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de négociation multilatérale",
                  "Processus de l'OMS : Assemblée mondiale de la santé, comités régionaux",
                  "Négociation des traités et accords sanitaires internationaux",
                  "Simulations de négociations diplomatiques"
                ]
              },
              {
                "title": "Enjeux géopolitiques de la santé mondiale",
                "duration": "1 jour",
                "chapters": [
                  "Gouvernance mondiale de la santé (OMS, G20, G7 Santé)",
                  "Enjeux Nord-Sud dans l'accès aux médicaments et vaccins",
                  "Souveraineté sanitaire et sécurité sanitaire mondiale",
                  "Positionnement de l'Afrique dans les négociations sanitaires mondiales"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Gouvernance Sanitaire",
        "duration": "8 jours",
        "cost": "2100 USD",
        "modules": [
          {
            "name": "Gouvernance sanitaire",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Principes de gouvernance des systèmes de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et piliers de la gouvernance sanitaire",
                  "Rôle de l'État, du secteur privé et de la société civile",
                  "Décentralisation et gouvernance locale de la santé",
                  "Cadres de gouvernance sanitaire (OMS, Banque mondiale)"
                ]
              },
              {
                "title": "Redevabilité, transparence et lutte contre la corruption",
                "duration": "1 jour",
                "chapters": [
                  "Mécanismes de redevabilité dans le secteur de la santé",
                  "Transparence dans la gestion des ressources de santé",
                  "Systèmes de contrôle interne et audit",
                  "Lutte contre la corruption dans les achats pharmaceutiques"
                ]
              },
              {
                "title": "Gouvernance décentralisée",
                "duration": "1 jour",
                "chapters": [
                  "Transfert de compétences aux collectivités territoriales",
                  "Rôle des districts sanitaires dans la gouvernance locale",
                  "Mécanismes de planification et budgétisation décentralisées",
                  "Études de cas : expériences africaines de décentralisation"
                ]
              }
            ]
          },
          {
            "name": "Planification stratégique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Diagnostic situationnel et analyse des besoins",
                "duration": "1 jour",
                "chapters": [
                  "Méthodes d'analyse de situation (SWOT, arbre à problèmes)",
                  "Collecte et analyse des données de santé pour la planification",
                  "Analyse des parties prenantes et de leurs intérêts",
                  "Priorisation des problèmes de santé publique"
                ]
              },
              {
                "title": "Élaboration des plans stratégiques de santé",
                "duration": "1 jour",
                "chapters": [
                  "Structure d'un Plan National de Développement Sanitaire (PNDS)",
                  "Définition des axes stratégiques et objectifs",
                  "Chiffrage et planification budgétaire pluriannuelle",
                  "Processus consultatif et validation des plans"
                ]
              },
              {
                "title": "Alignement avec les agendas internationaux",
                "duration": "1 jour",
                "chapters": [
                  "Objectifs de Développement Durable (ODD) en lien avec la santé",
                  "Agenda 2063 de l'Union Africaine et santé",
                  "Cadre de Maputo et autres engagements régionaux",
                  "Mécanismes de reporting international (ODD, UHC)"
                ]
              }
            ]
          },
          {
            "name": "Coordination multisectorielle",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Mécanismes de coordination intersectorielle",
                "duration": "1 jour",
                "chapters": [
                  "Approche One Health : santé humaine, animale, environnementale",
                  "Mécanismes de coordination nationale (comités interministériels)",
                  "Outils de collaboration et partage de l'information intersectorielle",
                  "Exemples africains de coordination multisectorielle réussie"
                ]
              },
              {
                "title": "Partenariats public-privé en santé",
                "duration": "1 jour",
                "chapters": [
                  "Cadres et modèles de PPP en santé",
                  "Négociation et contractualisation avec le secteur privé",
                  "Suivi et redevabilité des partenariats",
                  "Études de cas : PPP en santé en Afrique"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Gestion des Projets Santé",
        "duration": "10 jours",
        "cost": "2200 USD",
        "modules": [
          {
            "name": "Gestion des projets santé",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Cycle de vie d'un projet santé",
                "duration": "1 jour",
                "chapters": [
                  "Phases du cycle de projet (identification, formulation, mise en œuvre, clôture)",
                  "Documents clés : note conceptuelle, document de projet",
                  "Parties prenantes et analyse de leurs intérêts",
                  "Montage institutionnel d'un projet santé"
                ]
              },
              {
                "title": "Cadre logique et théorie du changement",
                "duration": "1 jour",
                "chapters": [
                  "Construction d'une théorie du changement",
                  "Matrice du cadre logique : intrants, activités, extrants, effets, impact",
                  "Indicateurs SMART et sources de vérification",
                  "Hypothèses et risques dans le cadre logique"
                ]
              },
              {
                "title": "Planification opérationnelle et budgétisation",
                "duration": "1 jour",
                "chapters": [
                  "Plan de travail annuel (PTA) et chronogramme d'activités",
                  "Techniques de budgétisation par activité (ABC)",
                  "Gestion des ressources humaines du projet",
                  "Outils de planification : Gantt, MS Project, Monday.com"
                ]
              },
              {
                "title": "Gestion des risques projet",
                "duration": "1 jour",
                "chapters": [
                  "Identification et évaluation des risques (matrice probabilité/impact)",
                  "Stratégies de réponse aux risques (évitement, atténuation, transfert)",
                  "Registre des risques et plan de mitigation",
                  "Gestion des crises et ajustements en cours de projet"
                ]
              },
              {
                "title": "Suivi-évaluation et rapportage bailleur",
                "duration": "1 jour",
                "chapters": [
                  "Systèmes de suivi-évaluation (S&E) des projets santé",
                  "Collecte et analyse des données de suivi",
                  "Rédaction des rapports narratifs et financiers bailleurs",
                  "Capitalisation et leçons apprises en fin de projet"
                ]
              }
            ]
          },
          {
            "name": "Gestion du changement",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Modèles de conduite du changement   (1 jour)",
                "duration": "Kotter, ADKAR",
                "chapters": [
                  "Modèle de Kotter : les 8 étapes du changement",
                  "Modèle ADKAR : Awareness, Desire, Knowledge, Ability, Reinforcement",
                  "Courbe du deuil et gestion des résistances",
                  "Diagnostic de la maturité organisationnelle au changement"
                ]
              },
              {
                "title": "Communication et mobilisation des parties prenantes",
                "duration": "1 jour",
                "chapters": [
                  "Cartographie et analyse des parties prenantes (matrice influence/intérêt)",
                  "Stratégie de communication accompagnant le changement",
                  "Techniques d'engagement et de co-construction",
                  "Pérennisation du changement et ancrage dans la culture organisationnelle"
                ]
              }
            ]
          },
          {
            "name": "Planification stratégique",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Diagnostic situationnel et analyse des besoins",
                "duration": "1 jour",
                "chapters": [
                  "Méthodes d'analyse de situation (SWOT, arbre à problèmes)",
                  "Collecte et analyse des données de santé pour la planification",
                  "Analyse des parties prenantes et de leurs intérêts",
                  "Priorisation des problèmes de santé publique"
                ]
              },
              {
                "title": "Élaboration des plans stratégiques de santé",
                "duration": "1 jour",
                "chapters": [
                  "Structure d'un Plan National de Développement Sanitaire (PNDS)",
                  "Définition des axes stratégiques et objectifs",
                  "Chiffrage et planification budgétaire pluriannuelle",
                  "Processus consultatif et validation des plans"
                ]
              },
              {
                "title": "Alignement avec les agendas internationaux",
                "duration": "1 jour",
                "chapters": [
                  "Objectifs de Développement Durable (ODD) en lien avec la santé",
                  "Agenda 2063 de l'Union Africaine et santé",
                  "Cadre de Maputo et autres engagements régionaux",
                  "Mécanismes de reporting international (ODD, UHC)"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Gestion des Financements de Santé",
        "duration": "6 jours",
        "cost": "1700 USD",
        "modules": [
          {
            "name": "Gestion des financements de santé",
            "duration": "3 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Cartographie des financements de la santé",
                "duration": "1 jour",
                "chapters": [
                  "Principaux bailleurs : Fonds mondial, GAVI, USAID, Banque mondiale, AFD",
                  "Mécanismes de financement innovants (obligations de résultats, blended finance)",
                  "Financement domestique de la santé et mobilisation des ressources internes",
                  "Traçabilité et suivi des flux financiers de la santé"
                ]
              },
              {
                "title": "Mobilisation des ressources et rédaction de propositions",
                "duration": "1 jour",
                "chapters": [
                  "Cycle de financement des principaux bailleurs",
                  "Rédaction de notes conceptuelles et de propositions complètes",
                  "Budgétisation et justification des coûts",
                  "Stratégies de mobilisation des ressources domestiques"
                ]
              },
              {
                "title": "Gestion financière et conformité des grants",
                "duration": "1 jour",
                "chapters": [
                  "Mécanismes de gestion financière des subventions (grants)",
                  "Exigences de conformité et d'audit des bailleurs",
                  "Gestion de la trésorerie et des décaissements",
                  "Clôture financière et audit final des projets"
                ]
              }
            ]
          },
          {
            "name": "Gestion stratégique",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Analyse stratégique   (1 jour)",
                "duration": "SWOT, PESTEL, chaîne de valeur",
                "chapters": [
                  "Analyse SWOT : forces, faiblesses, opportunités, menaces",
                  "Analyse PESTEL appliquée au secteur santé",
                  "Analyse de la chaîne de valeur et des parties prenantes",
                  "Cartographie des risques stratégiques"
                ]
              },
              {
                "title": "Formulation et mise en œuvre de la stratégie",
                "duration": "1 jour",
                "chapters": [
                  "Du diagnostic à la vision stratégique",
                  "Élaboration des objectifs stratégiques (SMART, OKR)",
                  "Déclinaison opérationnelle de la stratégie",
                  "Gestion des priorités et des ressources"
                ]
              },
              {
                "title": "Suivi-évaluation des performances organisationnelles",
                "duration": "1 jour",
                "chapters": [
                  "Tableaux de bord de pilotage stratégique (BSC)",
                  "Indicateurs de performance organisationnelle (KPI)",
                  "Revues de performance et processus d'amélioration continue",
                  "Communication des résultats aux parties prenantes"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Leadership Institutionnel",
        "duration": "10 jours",
        "cost": "2600 USD",
        "modules": [
          {
            "name": "Leadership exécutif",
            "duration": "5 jours",
            "cost": "1200 USD",
            "subModules": [
              {
                "title": "Styles de leadership et intelligence émotionnelle",
                "duration": "1 jour",
                "chapters": [
                  "Théories du leadership (transformationnel, situationnel, servant leadership)",
                  "Autodiagnostic de son style de leadership",
                  "Intelligence émotionnelle : les 4 composantes (Goleman)",
                  "Développement de l'empathie et de la conscience de soi"
                ]
              },
              {
                "title": "Communication stratégique et influence",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de communication persuasive",
                  "Prise de parole en public et storytelling",
                  "Communication en situation de crise",
                  "Gestion des médias et relations publiques"
                ]
              },
              {
                "title": "Prise de décision en contexte complexe",
                "duration": "1 jour",
                "chapters": [
                  "Cadres de prise de décision (OODA Loop, modèle Cynefin)",
                  "Gestion de l'incertitude et du risque décisionnel",
                  "Biais cognitifs et comment les contourner",
                  "Ateliers de simulation : scénarios de décision complexe"
                ]
              },
              {
                "title": "Leadership en temps de crise",
                "duration": "1 jour",
                "chapters": [
                  "Caractéristiques du leadership de crise",
                  "Gestion des équipes sous pression",
                  "Communication de crise interne et externe",
                  "Retours d'expérience : leaders africains face aux crises sanitaires"
                ]
              },
              {
                "title": "Coaching et développement des équipes",
                "duration": "1 jour",
                "chapters": [
                  "Principes du coaching professionnel",
                  "Techniques de feedback constructif",
                  "Construction et animation d'équipes performantes",
                  "Plans de développement individuel (PDI)"
                ]
              }
            ]
          },
          {
            "name": "Gouvernance sanitaire",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Principes de gouvernance des systèmes de santé",
                "duration": "1 jour",
                "chapters": [
                  "Définition et piliers de la gouvernance sanitaire",
                  "Rôle de l'État, du secteur privé et de la société civile",
                  "Décentralisation et gouvernance locale de la santé",
                  "Cadres de gouvernance sanitaire (OMS, Banque mondiale)"
                ]
              },
              {
                "title": "Redevabilité, transparence et lutte contre la corruption",
                "duration": "1 jour",
                "chapters": [
                  "Mécanismes de redevabilité dans le secteur de la santé",
                  "Transparence dans la gestion des ressources de santé",
                  "Systèmes de contrôle interne et audit",
                  "Lutte contre la corruption dans les achats pharmaceutiques"
                ]
              },
              {
                "title": "Gouvernance décentralisée",
                "duration": "1 jour",
                "chapters": [
                  "Transfert de compétences aux collectivités territoriales",
                  "Rôle des districts sanitaires dans la gouvernance locale",
                  "Mécanismes de planification et budgétisation décentralisées",
                  "Études de cas : expériences africaines de décentralisation"
                ]
              }
            ]
          },
          {
            "name": "Gestion du changement",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Modèles de conduite du changement   (1 jour)",
                "duration": "Kotter, ADKAR",
                "chapters": [
                  "Modèle de Kotter : les 8 étapes du changement",
                  "Modèle ADKAR : Awareness, Desire, Knowledge, Ability, Reinforcement",
                  "Courbe du deuil et gestion des résistances",
                  "Diagnostic de la maturité organisationnelle au changement"
                ]
              },
              {
                "title": "Communication et mobilisation des parties prenantes",
                "duration": "1 jour",
                "chapters": [
                  "Cartographie et analyse des parties prenantes (matrice influence/intérêt)",
                  "Stratégie de communication accompagnant le changement",
                  "Techniques d'engagement et de co-construction",
                  "Pérennisation du changement et ancrage dans la culture organisationnelle"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "public-health",
    "title": "ACADÉMIE SANTÉ PUBLIQUE & PROGRAMMES",
    "certifications": [
      {
        "name": "Certification en Gestion des Programmes de Santé",
        "duration": "17 jours",
        "cost": "4000 USD",
        "modules": [
          {
            "name": "VIH",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Épidémiologie et riposte nationale au VIH",
                "duration": "1 jour",
                "chapters": [
                  "Situation épidémiologique mondiale et africaine du VIH",
                  "Modes de transmission et populations clés",
                  "Stratégie 95-95-95 de l'ONUSIDA",
                  "Cadre politique national de lutte contre le VIH"
                ]
              },
              {
                "title": "Gestion des ARV et chaîne d'approvisionnement VIH",
                "duration": "1 jour",
                "chapters": [
                  "Gamme des médicaments ARV et schémas thérapeutiques",
                  "Quantification et approvisionnement en ARV",
                  "Gestion des stocks et prévention des ruptures en ARV",
                  "Suivi de l'observance et de la rétention au traitement"
                ]
              },
              {
                "title": "Suivi-évaluation des programmes VIH",
                "duration": "1 jour",
                "chapters": [
                  "Indicateurs clés des programmes VIH (PEPFAR, Fonds mondial)",
                  "Systèmes de collecte de données (DHIS2, DATIM)",
                  "Analyse des données de performance des programmes",
                  "Rapportage aux bailleurs et aux instances nationales"
                ]
              }
            ]
          },
          {
            "name": "Paludisme",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Stratégies de lutte antipaludique",
                "duration": "1 jour",
                "chapters": [
                  "Épidémiologie du paludisme en Afrique subsaharienne",
                  "Vecteurs et transmission : bases entomologiques",
                  "Stratégies de prévention (MILD, PID, chimioprévention)",
                  "Plan stratégique national de lutte contre le paludisme"
                ]
              },
              {
                "title": "Gestion des intrants   (1 jour)",
                "duration": "ACT, MILD, TDR",
                "chapters": [
                  "Quantification des ACT, MILD et TDR",
                  "Gestion de la chaîne d'approvisionnement paludisme",
                  "Distribution des MILD et couverture universelle",
                  "Gestion des stocks et prévention des ruptures"
                ]
              },
              {
                "title": "Surveillance épidémiologique et reporting",
                "duration": "1 jour",
                "chapters": [
                  "Systèmes de surveillance du paludisme (SNIS, DHIS2)",
                  "Indicateurs de suivi des programmes paludisme",
                  "Gestion des épidémies de paludisme",
                  "Rapportage au Fonds mondial et à l'OMS"
                ]
              }
            ]
          },
          {
            "name": "Tuberculose",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Prise en charge et traitement de la TB",
                "duration": "1 jour",
                "chapters": [
                  "Épidémiologie mondiale de la TB et charge de morbidité",
                  "Diagnostic de la TB (bactériologie, imagerie, GeneXpert)",
                  "Schémas thérapeutiques de la TB sensible",
                  "Stratégie DOTS et DOTS-Plus"
                ]
              },
              {
                "title": "Gestion des médicaments antituberculeux",
                "duration": "1 jour",
                "chapters": [
                  "Gamme des médicaments antituberculeux de 1ère et 2ème ligne",
                  "Quantification et approvisionnement en médicaments TB",
                  "Conditions de stockage des médicaments antituberculeux",
                  "Suivi de l'observance (DOT) et gestion des perdus de vue"
                ]
              },
              {
                "title": "TB-MR et stratégies END TB",
                "duration": "1 jour",
                "chapters": [
                  "Définition et ampleur de la TB multirésistante (TB-MR)",
                  "Diagnostic et traitement de la TB-MR et TB-UR",
                  "Stratégie END TB de l'OMS : objectifs et indicateurs",
                  "Financement et ressources pour les programmes TB"
                ]
              }
            ]
          },
          {
            "name": "Vaccination",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Programmes élargis de vaccination   (1 jour)",
                "duration": "PEV",
                "chapters": [
                  "Historique et principes du PEV",
                  "Calendrier vaccinal national et recommandations OMS",
                  "Nouveaux vaccins et stratégies d'introduction",
                  "Financement des programmes de vaccination (GAVI, État)"
                ]
              },
              {
                "title": "Gestion des vaccins et chaîne du froid",
                "duration": "1 jour",
                "chapters": [
                  "Stockage et manutention des vaccins",
                  "Chaîne du froid vaccinale : équipements et surveillance",
                  "Gestion des stocks de vaccins (FEFO, pertes)",
                  "Système d'information pour la gestion des vaccins"
                ]
              },
              {
                "title": "Stratégies d'atteinte des populations",
                "duration": "1 jour",
                "chapters": [
                  "Stratégies fixes, avancées et mobiles de vaccination",
                  "Couverture vaccinale : mesure et analyse des données",
                  "Identification et ciblage des enfants non vaccinés",
                  "Campagnes de vaccination supplémentaires (CVS)"
                ]
              }
            ]
          },
          {
            "name": "Santé maternelle",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Soins prénatals, accouchement et post-partum",
                "duration": "1 jour",
                "chapters": [
                  "Contenu des consultations prénatales (CPN)",
                  "Accouchement assisté et soins obstétricaux d'urgence (SONU)",
                  "Soins post-partum et prévention des complications",
                  "Soins essentiels du nouveau-né"
                ]
              },
              {
                "title": "Planification familiale et santé reproductive",
                "duration": "1 jour",
                "chapters": [
                  "Méthodes contraceptives : types, efficacité, disponibilité",
                  "Conseil en planification familiale",
                  "Gestion des produits de planification familiale",
                  "Intégration PF/SMI dans les systèmes de santé"
                ]
              },
              {
                "title": "Mortalité maternelle : causes et stratégies de réduction",
                "duration": "1 jour",
                "chapters": [
                  "Principales causes de mortalité maternelle en Afrique",
                  "Audit des décès maternels et prise de décision",
                  "Stratégies pour réduire la mortalité maternelle (3 retards)",
                  "Objectifs mondiaux et indicateurs de suivi (ODD 3.1)"
                ]
              }
            ]
          },
          {
            "name": "Nutrition",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Malnutrition aiguë et chronique : diagnostic et prise en charge",
                "duration": "1 jour",
                "chapters": [
                  "Types de malnutrition (aiguë globale, modérée, sévère, chronique)",
                  "Dépistage et diagnostic de la malnutrition (PB, P/T, oedèmes)",
                  "Protocoles PCIMA (prise en charge intégrée de la malnutrition aiguë)",
                  "Alimentation thérapeutique prête à l'emploi (ATPE)"
                ]
              },
              {
                "title": "Programmes nutritionnels et interventions communautaires",
                "duration": "1 jour",
                "chapters": [
                  "Promotion de l'allaitement maternel exclusif",
                  "Alimentation de complément et diversification alimentaire",
                  "Supplémentation en micronutriments (vitamine A, fer, zinc)",
                  "Rôle des agents de santé communautaires dans la nutrition"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Santé Publique Opérationnelle",
        "duration": "10 jours",
        "cost": "2100 USD",
        "modules": [
          {
            "name": "Santé communautaire",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Rôle des agents de santé communautaire",
                "duration": "1 jour",
                "chapters": [
                  "Définition et profils des agents de santé communautaire (ASC)",
                  "Formation initiale et continue des ASC",
                  "Supervision, motivation et rétention des ASC",
                  "Intégration des ASC dans le système de santé formel"
                ]
              },
              {
                "title": "Mobilisation communautaire et promotion de la santé",
                "duration": "1 jour",
                "chapters": [
                  "Approches de mobilisation et d'engagement communautaire",
                  "Communication pour le changement de comportement (CCC)",
                  "Organisation des comités de santé villageois",
                  "Outils et supports de sensibilisation communautaire"
                ]
              }
            ]
          },
          {
            "name": "Renforcement des systèmes de santé",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Les 6 piliers des systèmes de santé   (1 jour)",
                "duration": "OMS",
                "chapters": [
                  "Prestation de services : disponibilité et qualité des soins",
                  "Ressources humaines pour la santé",
                  "Systèmes d'information sanitaire",
                  "Accès aux médicaments et technologies essentiels",
                  "Financement de la santé et gouvernance"
                ]
              },
              {
                "title": "Ressources humaines pour la santé",
                "duration": "1 jour",
                "chapters": [
                  "Planification des ressources humaines pour la santé",
                  "Formation et développement professionnel continu",
                  "Gestion des performances et motivation du personnel",
                  "Migration et fidélisation des professionnels de santé"
                ]
              },
              {
                "title": "Financement de la santé et CSU",
                "duration": "1 jour",
                "chapters": [
                  "Sources de financement de la santé (État, ménages, bailleurs)",
                  "Mécanismes de protection financière et assurance maladie",
                  "Progrès vers la couverture sanitaire universelle (CSU)",
                  "Espace budgétaire et priorités de financement de la santé"
                ]
              },
              {
                "title": "Systèmes d'information sanitaire",
                "duration": "1 jour",
                "chapters": [
                  "Architecture d'un système national d'information sanitaire",
                  "Collecte, traitement et utilisation des données de routine",
                  "DHIS2 : utilisation et gouvernance",
                  "Culture de la donnée et prise de décision basée sur les preuves"
                ]
              },
              {
                "title": "Gouvernance et leadership des systèmes",
                "duration": "1 jour",
                "chapters": [
                  "Fonctions essentielles de l'État en matière de santé",
                  "Dialogue politique et réforme des systèmes de santé",
                  "Évaluation des systèmes de santé (ESS)",
                  "Partenariats et coordination de l'aide dans le secteur santé"
                ]
              }
            ]
          },
          {
            "name": "CSU",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Principes et mesure de la CSU",
                "duration": "1 jour",
                "chapters": [
                  "Définition et dimensions de la couverture sanitaire universelle",
                  "Indice de couverture des services essentiels (OMS)",
                  "Protection contre les risques financiers : indicateurs et mesure",
                  "Cadre de suivi mondial de la CSU"
                ]
              },
              {
                "title": "Mécanismes de protection financière",
                "duration": "1 jour",
                "chapters": [
                  "Assurance maladie obligatoire et volontaire",
                  "Mutuelles de santé communautaires",
                  "Gratuité ciblée et filets de sécurité sociale",
                  "Fonds d'indigence et exemption des plus vulnérables"
                ]
              },
              {
                "title": "Réformes nationales vers la CSU",
                "duration": "1 jour",
                "chapters": [
                  "Diagnostic des obstacles à la CSU (financiers, géographiques, culturels)",
                  "Stratégies nationales vers la CSU : exemples africains",
                  "Rôle du secteur privé dans l'atteinte de la CSU",
                  "Suivi et évaluation des progrès vers la CSU"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Renforcement des Systèmes de Santé",
        "duration": "10 jours",
        "cost": "2100 USD",
        "modules": [
          {
            "name": "Renforcement des systèmes de santé",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Les 6 piliers des systèmes de santé   (1 jour)",
                "duration": "OMS",
                "chapters": [
                  "Prestation de services : disponibilité et qualité des soins",
                  "Ressources humaines pour la santé",
                  "Systèmes d'information sanitaire",
                  "Accès aux médicaments et technologies essentiels",
                  "Financement de la santé et gouvernance"
                ]
              },
              {
                "title": "Ressources humaines pour la santé",
                "duration": "1 jour",
                "chapters": [
                  "Planification des ressources humaines pour la santé",
                  "Formation et développement professionnel continu",
                  "Gestion des performances et motivation du personnel",
                  "Migration et fidélisation des professionnels de santé"
                ]
              },
              {
                "title": "Financement de la santé et CSU",
                "duration": "1 jour",
                "chapters": [
                  "Sources de financement de la santé (État, ménages, bailleurs)",
                  "Mécanismes de protection financière et assurance maladie",
                  "Progrès vers la couverture sanitaire universelle (CSU)",
                  "Espace budgétaire et priorités de financement de la santé"
                ]
              },
              {
                "title": "Systèmes d'information sanitaire",
                "duration": "1 jour",
                "chapters": [
                  "Architecture d'un système national d'information sanitaire",
                  "Collecte, traitement et utilisation des données de routine",
                  "DHIS2 : utilisation et gouvernance",
                  "Culture de la donnée et prise de décision basée sur les preuves"
                ]
              },
              {
                "title": "Gouvernance et leadership des systèmes",
                "duration": "1 jour",
                "chapters": [
                  "Fonctions essentielles de l'État en matière de santé",
                  "Dialogue politique et réforme des systèmes de santé",
                  "Évaluation des systèmes de santé (ESS)",
                  "Partenariats et coordination de l'aide dans le secteur santé"
                ]
              }
            ]
          },
          {
            "name": "CSU",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Principes et mesure de la CSU",
                "duration": "1 jour",
                "chapters": [
                  "Définition et dimensions de la couverture sanitaire universelle",
                  "Indice de couverture des services essentiels (OMS)",
                  "Protection contre les risques financiers : indicateurs et mesure",
                  "Cadre de suivi mondial de la CSU"
                ]
              },
              {
                "title": "Mécanismes de protection financière",
                "duration": "1 jour",
                "chapters": [
                  "Assurance maladie obligatoire et volontaire",
                  "Mutuelles de santé communautaires",
                  "Gratuité ciblée et filets de sécurité sociale",
                  "Fonds d'indigence et exemption des plus vulnérables"
                ]
              },
              {
                "title": "Réformes nationales vers la CSU",
                "duration": "1 jour",
                "chapters": [
                  "Diagnostic des obstacles à la CSU (financiers, géographiques, culturels)",
                  "Stratégies nationales vers la CSU : exemples africains",
                  "Rôle du secteur privé dans l'atteinte de la CSU",
                  "Suivi et évaluation des progrès vers la CSU"
                ]
              }
            ]
          },
          {
            "name": "Santé communautaire",
            "duration": "2 jours",
            "cost": "500 USD",
            "subModules": [
              {
                "title": "Rôle des agents de santé communautaire",
                "duration": "1 jour",
                "chapters": [
                  "Définition et profils des agents de santé communautaire (ASC)",
                  "Formation initiale et continue des ASC",
                  "Supervision, motivation et rétention des ASC",
                  "Intégration des ASC dans le système de santé formel"
                ]
              },
              {
                "title": "Mobilisation communautaire et promotion de la santé",
                "duration": "1 jour",
                "chapters": [
                  "Approches de mobilisation et d'engagement communautaire",
                  "Communication pour le changement de comportement (CCC)",
                  "Organisation des comités de santé villageois",
                  "Outils et supports de sensibilisation communautaire"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "business",
    "title": "ACADÉMIE BUSINESS PHARMACEUTIQUE & ENTREPRENEURIAT SANTÉ",
    "certifications": [
      {
        "name": "Certification en Gestion Moderne d'Officine",
        "duration": "10 jours",
        "cost": "2300 USD",
        "modules": [
          {
            "name": "Gestion d'une officine moderne",
            "duration": "5 jours",
            "cost": "900 USD",
            "subModules": [
              {
                "title": "Réglementation et gestion administrative de l'officine",
                "duration": "1 jour",
                "chapters": [
                  "Cadre juridique et réglementaire des officines",
                  "Obligations légales du pharmacien titulaire",
                  "Gestion des autorisations et des renouvellements",
                  "Responsabilité professionnelle du pharmacien"
                ]
              },
              {
                "title": "Gestion des stocks et approvisionnements officinaux",
                "duration": "1 jour",
                "chapters": [
                  "Sélection des fournisseurs et grossistes répartiteurs",
                  "Gestion des commandes et des niveaux de stock",
                  "Méthodes d'inventaire et gestion des périmés",
                  "Outils informatiques de gestion officinale (logiciels métier)"
                ]
              },
              {
                "title": "Relation client et conseil pharmaceutique",
                "duration": "1 jour",
                "chapters": [
                  "Techniques d'accueil et de communication avec le patient",
                  "Conseil pharmaceutique : médicaments OTC et prescription",
                  "Gestion des réclamations et des situations difficiles",
                  "Fidélisation de la clientèle"
                ]
              },
              {
                "title": "Comptabilité et rentabilité de l'officine",
                "duration": "1 jour",
                "chapters": [
                  "Lecture et analyse des états financiers d'une officine",
                  "Calcul des marges et du seuil de rentabilité",
                  "Gestion de la trésorerie et du BFR",
                  "Optimisation fiscale et sociale de l'officine"
                ]
              },
              {
                "title": "Marketing et fidélisation de la clientèle",
                "duration": "1 jour",
                "chapters": [
                  "Diagnostic marketing d'une officine",
                  "Aménagement et merchandising de l'espace officinal",
                  "Communication digitale et réseaux sociaux pour l'officine",
                  "Programmes de fidélité et services à valeur ajoutée"
                ]
              }
            ]
          },
          {
            "name": "Finance pharmaceutique",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Analyse financière et rentabilité",
                "duration": "1 jour",
                "chapters": [
                  "Lecture et interprétation du bilan et du compte de résultat",
                  "Calcul et analyse des ratios financiers",
                  "Évaluation de la rentabilité des activités",
                  "Diagnostic financier d'une entreprise pharmaceutique"
                ]
              },
              {
                "title": "Gestion de trésorerie et budgétisation",
                "duration": "1 jour",
                "chapters": [
                  "Plan de trésorerie : élaboration et suivi",
                  "Gestion du besoin en fonds de roulement (BFR)",
                  "Budgets prévisionnels et contrôle budgétaire",
                  "Négociation avec les banques et les établissements de crédit"
                ]
              },
              {
                "title": "Fiscalité et conformité comptable du secteur",
                "duration": "1 jour",
                "chapters": [
                  "Régimes fiscaux applicables au secteur pharmaceutique",
                  "TVA sur les médicaments et produits de santé",
                  "Obligations déclaratives et comptables",
                  "Optimisation fiscale dans le respect des règles en vigueur"
                ]
              }
            ]
          },
          {
            "name": "Marketing pharmaceutique",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Stratégies marketing B2B et B2C en pharma",
                "duration": "1 jour",
                "chapters": [
                  "Spécificités du marketing pharmaceutique (réglementation, éthique)",
                  "Marketing B2B : ciblage des prescripteurs et des institutions",
                  "Marketing B2C : communication grand public et patients",
                  "Stratégies de lancement de produits pharmaceutiques"
                ]
              },
              {
                "title": "Marketing digital et réseaux sociaux en santé",
                "duration": "1 jour",
                "chapters": [
                  "Présence digitale et site web d'une structure de santé",
                  "Réseaux sociaux en santé : usages et bonnes pratiques",
                  "E-réputation et gestion des avis en ligne",
                  "Publicité digitale réglementée pour les produits de santé"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Entrepreneuriat Pharmaceutique",
        "duration": "11 jours",
        "cost": "2900 USD",
        "modules": [
          {
            "name": "Entrepreneuriat pharmaceutique",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Création et structuration d'une entreprise de santé",
                "duration": "1 jour",
                "chapters": [
                  "Formes juridiques adaptées aux entreprises de santé",
                  "Démarches de création et formalités administratives",
                  "Gouvernance et organisation d'une startup santé",
                  "Propriété intellectuelle et protection des innovations"
                ]
              },
              {
                "title": "Business plan et modèle économique santé",
                "duration": "1 jour",
                "chapters": [
                  "Analyse de marché et étude de faisabilité",
                  "Modèles économiques innovants en santé (freemium, B2G, SaaS santé)",
                  "Rédaction d'un business plan convaincant",
                  "Projection financière et valorisation d'une startup santé"
                ]
              },
              {
                "title": "Accès aux financements et levée de fonds",
                "duration": "1 jour",
                "chapters": [
                  "Cartographie des financements pour les startups santé en Afrique",
                  "Business angels, fonds d'investissement et accélérateurs santé",
                  "Techniques de pitch et présentation aux investisseurs",
                  "Due diligence et négociation des termes d'investissement"
                ]
              }
            ]
          },
          {
            "name": "Business développement santé",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Analyse de marché et opportunités d'affaires",
                "duration": "1 jour",
                "chapters": [
                  "Méthodes d'analyse de marché dans le secteur santé",
                  "Identification et qualification des opportunités commerciales",
                  "Veille concurrentielle et positionnement stratégique",
                  "Analyse des besoins non couverts dans les systèmes de santé africains"
                ]
              },
              {
                "title": "Négociation et partenariats commerciaux",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de négociation commerciale en santé",
                  "Structuration des contrats commerciaux et partenariats",
                  "Gestion des relations avec les clients institutionnels (ministères, ONG)",
                  "Gestion des accords de distribution et d'exclusivité"
                ]
              },
              {
                "title": "Expansion et scaling des activités santé",
                "duration": "1 jour",
                "chapters": [
                  "Stratégies d'expansion géographique en Afrique",
                  "Adaptation des produits/services aux marchés locaux",
                  "Gestion de la croissance et maintien de la qualité",
                  "Franchising et modèles de réplication dans le secteur santé"
                ]
              }
            ]
          },
          {
            "name": "Innovation santé",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Design thinking appliqué à la santé",
                "duration": "1 jour",
                "chapters": [
                  "Principes et processus du design thinking",
                  "Empathie et compréhension des besoins des patients",
                  "Idéation et prototypage rapide de solutions santé",
                  "Test et itération avec les utilisateurs finaux"
                ]
              },
              {
                "title": "Écosystème startup santé en Afrique",
                "duration": "1 jour",
                "chapters": [
                  "Panorama de l'écosystème healthtech africain",
                  "Hubs d'innovation, incubateurs et accélérateurs santé en Afrique",
                  "Cas d'usage : mHealth, télémédecine, diagnostic digital",
                  "Perspectives et tendances de l'innovation santé africaine"
                ]
              }
            ]
          },
          {
            "name": "Finance pharmaceutique",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Analyse financière et rentabilité",
                "duration": "1 jour",
                "chapters": [
                  "Lecture et interprétation du bilan et du compte de résultat",
                  "Calcul et analyse des ratios financiers",
                  "Évaluation de la rentabilité des activités",
                  "Diagnostic financier d'une entreprise pharmaceutique"
                ]
              },
              {
                "title": "Gestion de trésorerie et budgétisation",
                "duration": "1 jour",
                "chapters": [
                  "Plan de trésorerie : élaboration et suivi",
                  "Gestion du besoin en fonds de roulement (BFR)",
                  "Budgets prévisionnels et contrôle budgétaire",
                  "Négociation avec les banques et les établissements de crédit"
                ]
              },
              {
                "title": "Fiscalité et conformité comptable du secteur",
                "duration": "1 jour",
                "chapters": [
                  "Régimes fiscaux applicables au secteur pharmaceutique",
                  "TVA sur les médicaments et produits de santé",
                  "Obligations déclaratives et comptables",
                  "Optimisation fiscale dans le respect des règles en vigueur"
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Certification en Management des Structures de Santé",
        "duration": "13 jours",
        "cost": "3100 USD",
        "modules": [
          {
            "name": "Gestion des cliniques",
            "duration": "3 jours",
            "cost": "800 USD",
            "subModules": [
              {
                "title": "Organisation et administration d'une clinique",
                "duration": "1 jour",
                "chapters": [
                  "Cadre réglementaire des établissements de santé privés",
                  "Organigramme et gouvernance d'une clinique",
                  "Gestion administrative : admissions, dossiers patients, facturation",
                  "Accréditation et démarche qualité en clinique privée"
                ]
              },
              {
                "title": "Gestion des ressources humaines médicales",
                "duration": "1 jour",
                "chapters": [
                  "Recrutement et fidélisation du personnel médical et paramédical",
                  "Planification des gardes et des astreintes",
                  "Évaluation des compétences et formation continue",
                  "Gestion des conflits et bien-être au travail"
                ]
              },
              {
                "title": "Qualité des soins et satisfaction patient",
                "duration": "1 jour",
                "chapters": [
                  "Indicateurs de qualité des soins en clinique",
                  "Mesure et analyse de la satisfaction des patients",
                  "Démarche d'amélioration continue des soins (PDCA)",
                  "Gestion des événements indésirables et des plaintes"
                ]
              }
            ]
          },
          {
            "name": "Gestion hospitalière",
            "duration": "5 jours",
            "cost": "1000 USD",
            "subModules": [
              {
                "title": "Gouvernance hospitalière et organigramme",
                "duration": "1 jour",
                "chapters": [
                  "Modes de gouvernance des hôpitaux (publics, privés, PPP)",
                  "Rôle du conseil d'administration et de la direction médicale",
                  "Fonctions et services d'un hôpital général",
                  "Réforme hospitalière et autonomie de gestion"
                ]
              },
              {
                "title": "Gestion des plateaux techniques et équipements",
                "duration": "1 jour",
                "chapters": [
                  "Inventaire et maintenance des équipements biomédicaux",
                  "Gestion du bloc opératoire et des unités critiques",
                  "Laboratoire, imagerie et pharmacie hospitalière",
                  "Plan directeur et investissements en équipements"
                ]
              },
              {
                "title": "Gestion financière et facturation hospitalière",
                "duration": "1 jour",
                "chapters": [
                  "Comptabilité analytique et centre de coûts hospitaliers",
                  "Tarification des actes et groupes homogènes de malades (GHM)",
                  "Recouvrement des créances et gestion des assureurs",
                  "Budget hospitalier : élaboration, exécution et contrôle"
                ]
              },
              {
                "title": "Gestion des ressources humaines hospitalières",
                "duration": "1 jour",
                "chapters": [
                  "Planification des effectifs et des compétences",
                  "Gestion des carrières et des mobilités internes",
                  "Régimes statutaires et contractuels du personnel hospitalier",
                  "Politique sociale et gestion du dialogue social"
                ]
              },
              {
                "title": "Accréditation et qualité hospitalière",
                "duration": "1 jour",
                "chapters": [
                  "Normes d'accréditation hospitalière (JCI, HAS, normes africaines)",
                  "Démarche qualité et sécurité des patients",
                  "Indicateurs de performance hospitalière (taux d'occupation, DMS)",
                  "Audit hospitalier et plan d'amélioration"
                ]
              }
            ]
          },
          {
            "name": "Marketing pharmaceutique",
            "duration": "2 jours",
            "cost": "600 USD",
            "subModules": [
              {
                "title": "Stratégies marketing B2B et B2C en pharma",
                "duration": "1 jour",
                "chapters": [
                  "Spécificités du marketing pharmaceutique (réglementation, éthique)",
                  "Marketing B2B : ciblage des prescripteurs et des institutions",
                  "Marketing B2C : communication grand public et patients",
                  "Stratégies de lancement de produits pharmaceutiques"
                ]
              },
              {
                "title": "Marketing digital et réseaux sociaux en santé",
                "duration": "1 jour",
                "chapters": [
                  "Présence digitale et site web d'une structure de santé",
                  "Réseaux sociaux en santé : usages et bonnes pratiques",
                  "E-réputation et gestion des avis en ligne",
                  "Publicité digitale réglementée pour les produits de santé"
                ]
              }
            ]
          },
          {
            "name": "Business développement santé",
            "duration": "3 jours",
            "cost": "700 USD",
            "subModules": [
              {
                "title": "Analyse de marché et opportunités d'affaires",
                "duration": "1 jour",
                "chapters": [
                  "Méthodes d'analyse de marché dans le secteur santé",
                  "Identification et qualification des opportunités commerciales",
                  "Veille concurrentielle et positionnement stratégique",
                  "Analyse des besoins non couverts dans les systèmes de santé africains"
                ]
              },
              {
                "title": "Négociation et partenariats commerciaux",
                "duration": "1 jour",
                "chapters": [
                  "Techniques de négociation commerciale en santé",
                  "Structuration des contrats commerciaux et partenariats",
                  "Gestion des relations avec les clients institutionnels (ministères, ONG)",
                  "Gestion des accords de distribution et d'exclusivité"
                ]
              },
              {
                "title": "Expansion et scaling des activités santé",
                "duration": "1 jour",
                "chapters": [
                  "Stratégies d'expansion géographique en Afrique",
                  "Adaptation des produits/services aux marchés locaux",
                  "Gestion de la croissance et maintien de la qualité",
                  "Franchising et modèles de réplication dans le secteur santé"
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
