export type Locale = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      expertises: "Expertises",
      services: "Services",
      publications: "Publications",
      contact: "Contact",
      faq: "FAQ",
      academy: "Académie",
      cta: "Demander une consultation",
    },
    common: {
      back: "Retour",
      loading: "Chargement...",
      error: "Une erreur est survenue",
      save: "Enregistrer",
      cancel: "Annuler",
    },
    academy: {
      title: "La référence du développement des compétences stratégiques en santé",
      subtitle: "Formez vos leaders et transformez vos systèmes avec nos 6 académies spécialisées et nos programmes certifiants de haut niveau.",
      ctaTrainings: "Voir les formations",
      ctaRegister: "S’inscrire maintenant",
      nav: {
        home: "Accueil Académie",
        trainings: "eLearning",
        certifications: "Certifications",
        announcements: "Annonces",
        faq: "FAQ"
      },
      stats: {
        trainings: "Formations",
        participants: "Participants formés",
        experts: "Experts",
        countries: "Pays couverts"
      },
      why: {
        tag: "POURQUOI SANINOVA ACADEMY ?",
        title: "L'excellence au service de votre carrière",
        points: [
          { title: "Expertise reconnue", desc: "Un savoir-faire issu du terrain." },
          { title: "Formateurs qualifiés", desc: "Des experts praticiens leaders." },
          { title: "Certifications", desc: "Des programmes certifiants reconnus." },
          { title: "Approche pratique", desc: "Pédagogie axée sur les cas concrets." },
          { title: "Réseau professionnel", desc: "Une communauté d'élite en santé." },
          { title: "Impact réel", desc: "Compétences immédiatement applicables." }
        ]
      },
      vision: {
        tag: "NOTRE AMBITION",
        title: "Devenir la référence du développement des compétences stratégiques en santé",
        desc: "SaniNova Global Consulting ambitionne de devenir une référence dans le développement des compétences stratégiques en systèmes pharmaceutiques, supply chain santé, santé digitale, gouvernance sanitaire, leadership et transformation institutionnelle.",
        targets: [
          "Gouvernements", "Ministères", "Agences de régulation", "Programmes nationaux", 
          "ONG", "Partenaires techniques et financiers", "Pharmaciens", "Établissements de santé", 
          "Entreprises pharmaceutiques", "Consultants", "Universités", "Startups santé"
        ]
      },
      subAcademies: [
        {
          id: "supply-chain",
          title: "Académie de Supply Chain Santé",
          mission: "Former des experts capables de sécuriser la disponibilité des produits de santé à travers des systèmes logistiques performants, résilients et digitalisés.",
          disciplines: [
            "Gestion des approvisionnements et des stocks", "Quantification et prévisions", 
            "Distribution et dernier kilomètre", "Entreposage pharmaceutique", "Chaîne du froid", 
            "LMIS & eSIGL", "Data analytics logistique", "Supply chain humanitaire", "Gestion des urgences sanitaires"
          ],
          certifications: [
            "Certificat professionnel en Supply Chain Pharmaceutique", "Certification avancée en Quantification", 
            "Certification en Gestion des Stocks", "Certification en eLMIS & Data Visibility", 
            "Certification en Distribution Pharmaceutique", "Executive Program en Leadership Supply Chain"
          ]
        },
        {
          id: "regulation",
          title: "Académie Réglementation Pharmaceutique",
          mission: "Développer des compétences avancées en gouvernance pharmaceutique, conformité réglementaire et assurance qualité.",
          disciplines: [
            "Réglementation pharmaceutique", "Gouvernance pharmaceutique", "Assurance qualité", 
            "Pharmacovigilance", "Importation et conformité", "Traçabilité pharmaceutique", 
            "Inspection pharmaceutique", "Gestion réglementaire des produits de santé"
          ],
          certifications: [
            "Certificat en Cadre Réglementaire Pharmaceutique", "Certification en Assurance Qualité", 
            "Certification en Bonnes Pratiques Pharmaceutiques", "Certification en Pharmacovigilance", 
            "Certification en Régulation Pharmaceutique"
          ]
        },
        {
          id: "digital",
          title: "Académie Santé Digitale & Innovation",
          mission: "Former les leaders de la transformation numérique des systèmes de santé africains.",
          disciplines: [
            "Santé numérique", "eLMIS", "Traçabilité des produits de santé", "Gouvernance des données", 
            "Collecte et analyse digitale des données de santé", "Intelligence artificielle appliquée à la santé", 
            "Cybersécurité santé", "Architecture des systèmes santé"
          ],
          certifications: [
            "Certificat en Santé Digitale", "Certification en traçabilité", "Certification en Data Analytics Santé", 
            "Certification Power BI Santé", "Executive Program en Transformation Digitale Santé"
          ]
        },
        {
          id: "leadership",
          title: "Académie Leadership & Gouvernance Sanitaire",
          mission: "Renforcer les capacités de leadership stratégique, gouvernance institutionnelle et pilotage des réformes sanitaires.",
          disciplines: [
            "Leadership exécutif", "Gouvernance sanitaire", "Gestion stratégique", "Gestion des projets santé", 
            "Gestion du changement", "Coordination multisectorielle", "Planification stratégique", 
            "Diplomatie sanitaire", "Gestion des financements de santé"
          ],
          certifications: [
            "Executive Certificate in Health Leadership", "Certification en Gouvernance Sanitaire", 
            "Certification en Gestion des Projets Santé", "Certification en Gestion des financements de Santé", 
            "Certification en Leadership Institutionnel"
          ]
        },
        {
          id: "public-health",
          title: "Académie Santé Publique & Programmes",
          mission: "Former les professionnels à la gestion programmatique et opérationnelle des interventions de santé publique.",
          disciplines: [
            "VIH", "Paludisme", "Tuberculose", "Vaccination", "Santé maternelle", 
            "Nutrition", "Santé communautaire", "Renforcement des systèmes de santé", "CSU"
          ],
          certifications: [
            "Certification en Gestion des Programmes de Santé", "Certification en Santé Publique Opérationnelle", 
            "Certification en Renforcement des Systèmes de Santé"
          ]
        },
        {
          id: "business",
          title: "Académie Business Pharmaceutique & Entrepreneuriat Santé",
          mission: "Développer les compétences entrepreneuriales et managériales du secteur pharmaceutique et santé.",
          disciplines: [
            "Gestion d’officine", "Entrepreneuriat pharmaceutique", "Finance pharmaceutique", 
            "Marketing pharmaceutique", "Business développement santé", "Gestion des cliniques", 
            "Gestion hospitalière", "Innovation santé"
          ],
          certifications: [
            "Certification en Gestion Moderne d’Officine", "Certification en Entrepreneuriat Pharmaceutique", 
            "Certification en Management des Structures de Santé"
          ]
        }
      ],
      pedagogy: {
        tag: "MODÈLE PÉDAGOGIQUE",
        title: "Une approche innovante et contextualisée",
        approaches: [
          {
            title: "Formation pratique et stratégique",
            points: ["Cas réels", "Simulations", "Ateliers", "Exercices terrain"]
          },
          {
            title: "Approche africaine contextualisée",
            points: ["Réalités institutionnelles", "Réglementation régionale", "Cas adaptés"]
          },
          {
            title: "Approche hybride",
            points: ["Présentiel", "Distanciel", "eLearning", "Coaching"]
          }
        ]
      },
      formats: {
        tag: "FORMATS DE FORMATION",
        title: "Des modalités adaptées à vos besoins",
        list: [
          { name: "Atelier court", duration: "1–2 jours" },
          { name: "Certification professionnelle", duration: "5–10 jours" },
          { name: "Executive Program", duration: "3–6 semaines" },
          { name: "Bootcamp intensif", duration: "2–4 semaines" },
          { name: "Masterclass", duration: "Quelques heures" },
          { name: "Formation continue", duration: "Mensuelle" },
          { name: "eLearning", duration: "Flexible" }
        ]
      }
    },
    hero: {
      title: "Transformer durablement les systèmes de santé en Afrique",
      subtitle: "SaniNova accompagne les gouvernements, institutions et partenaires dans la conception et la mise en œuvre de réformes sanitaires ambitieuses, innovantes et durables.",
      ctaPrimary: "Découvrir nos expertises",
      ctaSecondary: "Planifier un rendez-vous",
      scrollText: "Défiler pour découvrir",
    },
    aboutSection: {
      tag: "QUI SOMMES-NOUS",
      title: "Le cabinet de conseil stratégique leader pour la santé en Afrique",
      desc1: "SaniNova est un cabinet de conseil premium spécialisé dans la transformation des systèmes de santé, la gouvernance sanitaire, la santé digitale, la régulation pharmaceutique et le renforcement institutionnel en Afrique.",
      desc2: "Inspirés par l'excellence opérationnelle et les meilleures pratiques internationales, nous allions rigueur stratégique et ancrage local pour relever les défis complexes de la santé publique sur le continent africain.",
      stat1: "15+",
      stat1Label: "Pays d'intervention",
      stat2: "100+",
      stat2Label: "Projets d'impact",
      stat3: "200+",
      stat3Label: "Experts associés",
      cta: "En savoir plus sur notre vision",
    },
    expertises: {
      tag: "DOMAINES D'EXPERTISE",
      title: "Des solutions de pointe pour des systèmes résilients",
      subtitle: "Notre expertise multidisciplinaire couvre l'ensemble des leviers critiques de la performance sanitaire.",
      viewMore: "En savoir plus",
      ctaAll: "Explorer toutes nos expertises",
      list: {
        governance: {
          title: "Gouvernance sanitaire",
          desc: "Appui aux réformes politiques, à la planification stratégique et au renforcement institutionnel des ministères de la Santé.",
        },
        pharma: {
          title: "Régulation pharmaceutique",
          desc: "Optimisation des cadres réglementaires, homologation des médicaments et assurance qualité des produits de santé.",
        },
        supplyChain: {
          title: "Chaîne d'approvisionnement",
          desc: "Modernisation de la logistique médicale, gestion des stocks stratégiques et distribution du dernier kilomètre.",
        },
        digital: {
          title: "Santé digitale",
          desc: "Intégration d'outils de télémédecine, de dossiers patients informatisés et de systèmes d'information sanitaire (DHIS2).",
        },
        quality: {
          title: "Qualité des soins",
          desc: "Établissement de normes d'accréditation hospitalière et de protocoles cliniques standardisés pour la sécurité des patients.",
        },
        financing: {
          title: "Financement de la santé",
          desc: "Conception de mécanismes d'Assurance Maladie Universelle (AMU) et modélisation de financements innovants.",
        },
        hr: {
          title: "Ressources humaines",
          desc: "Ingénierie de la formation, gestion prévisionnelle des effectifs et renforcement des compétences médicales.",
        },
        security: {
          title: "Sécurité sanitaire",
          desc: "Préparation et réponse aux épidémies, surveillance épidémiologique et résilience face aux crises sanitaires.",
        },
        evaluation: {
          title: "Suivi-évaluation",
          desc: "Mesure d'impact des programmes de santé publique, audits de performance et enquêtes nationales de santé.",
        },
      },
    },
    methodology: {
      tag: "APPROCHE MÉTHODOLOGIQUE",
      title: "Une méthode rigoureuse orientée vers l'impact",
      subtitle: "Nous appliquons une méthodologie structurée inspirée des standards internationaux de conseil de haut niveau.",
      steps: [
        {
          num: "01",
          title: "Diagnostic approfondi",
          desc: "Analyse quantitative et qualitative de la situation existante, collecte de données de terrain et identification des goulots d'étranglement.",
        },
        {
          num: "02",
          title: "Co-construction stratégique",
          desc: "Ateliers collaboratifs avec les parties prenantes pour définir une vision partagée, alignée sur les priorités nationales.",
        },
        {
          num: "03",
          title: "Modélisation et conception",
          desc: "Élaboration de solutions sur mesure, chiffrage budgétaire, modélisation de processus et création de prototypes digitaux.",
        },
        {
          num: "04",
          title: "Appui à la mise en œuvre",
          desc: "Accompagnement opérationnel sur le terrain, conduite du changement, gestion de projet (PMO) et déploiement de technologies.",
        },
        {
          num: "05",
          title: "Suivi & évaluation",
          desc: "Mise en place d'indicateurs de performance clés (KPIs), évaluation indépendante de l'impact et transfert de compétences pour la pérennité.",
        },
      ],
    },
    advantages: {
      tag: "AVANTAGES COMPARATIFS",
      title: "Pourquoi choisir SaniNova comme partenaire stratégique ?",
      subtitle: "Notre cabinet se distingue par sa capacité à délivrer des transformations pérennes et mesurables.",
      points: [
        {
          title: "Expertise multidisciplinaire",
          desc: "Une équipe d'élite réunissant médecins, ingénieurs data, logisticiens et économistes de la santé.",
        },
        {
          title: "Vision systémique",
          desc: "Nous n'agissons pas sur les symptômes, mais sur l'ensemble du système pour un impact global.",
        },
        {
          title: "Approche orientée résultats",
          desc: "Des méthodologies axées sur des indicateurs de performance précis et mesurables sur le terrain.",
        },
        {
          title: "Expertise africaine",
          desc: "Une connaissance intime des réalités socioculturelles, économiques et logistiques du continent africain.",
        },
        {
          title: "Innovation digitale",
          desc: "Pionniers de l'implémentation de solutions de santé numériques de dernière génération adaptées au contexte.",
        },
        {
          title: "Double accompagnement",
          desc: "Une transition fluide entre le conseil stratégique de haut niveau et l'exécution opérationnelle.",
        },
      ],
    },
    impact: {
      tag: "IMPACT EN CHIFFRES",
      title: "Notre contribution à l'amélioration de la santé publique",
      stats: [
        { value: "45", label: "Projets majeurs", suffix: "+" },
        { value: "12", label: "Gouvernements accompagnés", suffix: "" },
        { value: "150", label: "Experts mobilisables", suffix: "+" },
        { value: "25", label: "Millions de vies impactées", suffix: "M+" },
        { value: "5000", label: "Professionnels formés", suffix: "+" },
        { value: "98", label: "Taux de satisfaction client", suffix: "%" },
      ],
    },
    publications: {
      tag: "INSIGHTS & PUBLICATIONS",
      title: "Le think-tank de l'innovation sanitaire en Afrique",
      subtitle: "Découvrez nos dernières analyses, études stratégiques et rapports thématiques.",
      viewArticle: "Lire l'analyse",
      allArticles: "Voir toutes les publications",
      categories: {
        all: "Tout",
        digital: "Santé Digitale",
        governance: "Gouvernance",
        reforms: "Réformes Sanitaires",
        supply: "Supply Chain",
        regulation: "Régulation",
        ai: "IA & Santé",
        security: "Sécurité Sanitaire",
      },
      searchPlaceholder: "Rechercher un article, un rapport...",
      noResults: "Aucun article trouvé pour cette recherche.",
      list: [
        {
          id: 1,
          category: "digital",
          title: "Télémédecine rurale : Connecter les zones reculées d'Afrique de l'Ouest",
          desc: "Comment l'implémentation de cliniques mobiles connectées révolutionne l'accès aux soins de premier recours dans les zones rurales isolées.",
          date: "12 Avril 2026",
          readTime: "8 min",
          image: "/images/publication_digital_health.png",
        },
        {
          id: 2,
          category: "governance",
          title: "Gouvernance et résilience : Leçons des réformes sanitaires post-pandémie",
          desc: "Une analyse des meilleures pratiques de gouvernance hospitalière et de décentralisation des soins pour faire face aux futures crises sanitaires.",
          date: "28 Mars 2026",
          readTime: "12 min",
          image: "/images/publication_governance.png",
        },
        {
          id: 3,
          category: "supply",
          title: "Sécuriser le dernier kilomètre : Logistique pharmaceutique intelligente",
          desc: "Optimisation des chaînes d'approvisionnement vaccinales en Afrique subsaharienne grâce aux technologies IoT de suivi de température en temps réel.",
          date: "05 Mars 2026",
          readTime: "10 min",
          image: "/images/publication_supply_chain.png",
        },
      ],
    },
    partners: {
      title: "Ils nous font confiance",
    },
    contactQuick: {
      tag: "CONTACT RAPIDE",
      title: "Discutons de vos projets de transformation",
      subtitle: "Prenez rendez-vous avec nos directeurs associés pour évaluer vos besoins stratégiques.",
      name: "Nom complet",
      institution: "Institution / Entreprise",
      country: "Pays",
      email: "Adresse email",
      subject: "Sujet de consultation",
      message: "Votre message...",
      submit: "Planifier une consultation",
      success: "Votre demande de consultation a été envoyée avec succès ! Notre équipe vous contactera sous 24h.",
    },
    aboutPage: {
      hero: {
        title: "Bâtir les fondations d'une santé d'excellence",
        subtitle: "SaniNova est né de la volonté de doter l'Afrique de capacités de conseil de classe mondiale pour accélérer la transition vers la couverture santé universelle.",
      },
      vision: {
        title: "Notre Vision",
        desc: "Devenir le partenaire stratégique de référence des gouvernements et des institutions internationales pour concevoir, modéliser et opérer les systèmes de santé africains les plus performants, résilients et équitables du XXIe siècle.",
      },
      mission: {
        title: "Notre Mission",
        desc: "Accompagner la transformation durable des écosystèmes de santé en mobilisant une expertise d'élite multidisciplinaire, en promouvant l'innovation technologique et en co-construisant des réformes à fort impact social.",
      },
      values: {
        title: "Nos Valeurs Cardinales",
        list: [
          {
            title: "Intégrité",
            desc: "Nous agissons avec transparence, éthique professionnelle absolue et respect scrupuleux des engagements nationaux.",
          },
          {
            title: "Innovation",
            desc: "Nous croyons au potentiel de la santé digitale et de la data pour sauter les étapes du développement sanitaire classique.",
          },
          {
            title: "Excellence",
            desc: "Nous visons les standards de qualité internationaux les plus élevés dans chacune de nos livraisons de conseil stratégique.",
          },
          {
            title: "Collaboration",
            desc: "Nous ne parachutons pas de solutions toutes faites ; nous co-concevons chaque projet avec les acteurs de terrain.",
          },
          {
            title: "Impact",
            desc: "Nous mesurability-first : notre valeur ajoutée s'évalue uniquement par l'amélioration concrète des indicateurs de santé.",
          },
        ],
      },
      leadership: {
        title: "Notre Équipe",
        desc: "Des leaders d'opinion chevronnés alliant expérience dans la haute fonction publique, cabinets internationaux et recherche médicale.",
        members: [
          {
            name: "Dr. Hope Akohouvi AMOU",
            role: "Président & CEO",
            desc: "Directeur Général de SaniNova, expert international en transformation des systèmes de santé et réformes à fort impact en Afrique.",
          },
          {
            name: "Sophie KABORE",
            role: "Directrice Associée, Santé Digitale",
            desc: "Ingénieure spécialisée dans les systèmes d'information en santé, pionnière des projets e-santé à l'échelle nationale.",
          },
          {
            name: "Prof. Jean-Marie BEHANZIN",
            role: "Conseiller Scientifique Principal",
            desc: "Professeur agrégé en épidémiologie, expert auprès de l'Organisation Mondiale de la Santé (OMS).",
          },
        ],
      },
    },
    director: {
      tag: "DIRECTION GÉNÉRALE",
      name: "Dr. Hope Akohouvi Amou",
      role: "Directeur Général & Expert en Systèmes de Santé",
      description1: "Dr. Hope Akohouvi Amou est le Directeur Général de SaniNova, assurant un leadership stratégique pour la transformation des systèmes de santé à travers l'Afrique. Il conseille les gouvernements et les partenaires au développement sur la conception et la mise en œuvre de réformes à fort impact.",
      description2: "Son expertise couvre la gouvernance sanitaire, la régulation pharmaceutique, la chaîne d'approvisionnement, la santé digitale, le financement de la santé et la sécurité sanitaire. Il dirige SaniNova avec une vision claire axée sur la promotion de systèmes de santé résilients, équitables et performants.",
      description3: "",
      expertiseTitle: "Domaines d'expertise",
      expertises: [
        "Gouvernance sanitaire",
        "Régulation pharmaceutique",
        "Chaîne d'approvisionnement",
        "Santé digitale",
        "Qualité des soins",
        "Financement de la santé",
        "Ressources humaines",
        "Sécurité sanitaire",
        "Suivi-évaluation",
        "Renforcement des systèmes de santé",
        "Évaluation de performance",
        "Études stratégiques"
      ],
      quote: "Transformer les systèmes de santé nécessite une vision stratégique, une gouvernance forte et une capacité d'innovation durable."
    },
    servicesPage: {
      title: "Nos Solutions d'Accompagnement",
      subtitle: "Une offre intégrée pour soutenir les institutions à toutes les étapes de leur développement.",
      list: [
        {
          title: "Conseil stratégique",
          desc: "Aide à la décision de haut niveau pour les gouvernements : rédaction de politiques nationales de santé, plans stratégiques quinquennaux, réformes organisationnelles et études de faisabilité économique pour grands chantiers hospitaliers.",
        },
        {
          title: "Assistance technique",
          desc: "Détachement d'experts de pointe auprès des institutions de régulation, des centrales d'achat de médicaments et des agences de financement de la santé pour optimiser les processus opérationnels au quotidien.",
        },
        {
          title: "Transformation digitale",
          desc: "Audit de l'existant, cahier des charges, choix technologiques, cybersécurité médicale et pilotage du déploiement de solutions e-santé (télémédecine, DHIS2, dossiers de soins informatisés interconnectés).",
        },
        {
          title: "Renforcement des capacités",
          desc: "Développement des compétences stratégiques à travers nos 6 académies spécialisées : Supply Chain, Réglementation, Santé Digitale, Leadership & Gouvernance, Santé Publique, et Business Pharmaceutique.",
        },
        {
          title: "Etude, Recherche & Evaluation",
          desc: "Évaluations externes de mi-parcours ou finales de programmes financés par les bailleurs internationaux, audits d'infrastructures de soins, enquêtes d'envergure nationale et modélisation de tendances de santé publique.",
        },
        {
          title: "Recherche de financement",
          desc: "Identification et mobilisation de financements auprès des bailleurs de fonds internationaux, fonds multilatéraux, partenaires au développement et institutions philanthropiques pour soutenir les projets de santé.",
        },
        {
          title: "Gestion des projets",
          desc: "Pilotage opérationnel de projets de santé de bout en bout : planification, coordination des équipes multidisciplinaires, suivi des indicateurs de performance et reporting aux parties prenantes.",
        },
        {
          title: "Représentation",
          desc: "Représentation des organisations de santé auprès des institutions nationales, régionales et internationales pour défendre leurs intérêts et renforcer leur visibilité stratégique.",
        },
        {
          title: "Plaidoyers institutionnels",
          desc: "Conception et mise en œuvre de stratégies de plaidoyer ciblées pour influencer les décideurs politiques, les partenaires techniques et financiers en faveur de réformes sanitaires structurelles.",
        },
        {
          title: "Communication institutionnelle & événementielle",
          desc: "Élaboration de stratégies de communication institutionnelle, organisation d'événements à fort impact (conférences, forums, ateliers) et gestion de la réputation des organisations de santé.",
        },
      ],
    },
    contactPage: {
      title: "Planifiez un échange avec nos experts",
      subtitle: "Basé à Cotonou, notre cabinet déploie ses experts dans toute l'Afrique sub-saharienne.",
      phone: "Téléphone",
      email: "Adresse Email",
      address: "Adresse Siège",
      followUs: "Suivez-nous",
      mapTitle: "Notre Siège à Cotonou",
      scheduleConsultation: "Choisir un créneau de consultation",
      calendarText: "Prendre rendez-vous en ligne directement via notre agenda sécurisé.",
    },
    footer: {
      slogan: "Bâtir les systèmes de santé de demain.",
      rights: "Tous droits réservés.",
      quickLinks: "Liens rapides",
      contactInfo: "Contact",
    },
    faqPage: {
      title: "FAQ SaniNova Global Consulting",
      subtitle: "Trouvez des réponses à toutes vos questions sur nos expertises, services et formations.",
      searchPlaceholder: "Rechercher une question...",
      noResults: "Aucune question ne correspond à votre recherche.",
      categories: {
        all: "Toutes les questions",
        general: "SaniNova & Vision",
        services: "Expertises & Services",
        digital: "Digitalisation & Santé",
        academy: "Formations & Inscriptions",
      },
      items: [
        {
          category: "general",
          q: "1. C’est quoi SaniNova ?",
          a: "SaniNova est un cabinet international de conseil stratégique spécialisé dans le renforcement des systèmes de santé, la chaîne d’approvisionnement pharmaceutique et sanitaire, la transformation digitale des systèmes de santé, la réglementation pharmaceutique, la gouvernance sanitaire et le développement des capacités institutionnelles.\n\nLe cabinet accompagne les gouvernements, institutions publiques, organisations internationales, programmes de santé, centrales d’achats, agences réglementaires, ONG et entreprises privées dans la conception, l’implémentation et l’amélioration de solutions innovantes adaptées aux réalités locales.\n\nSaniNova intervient notamment dans :\n• la supply chain santé,\n• les systèmes d’information sanitaires,\n• les eLMIS,\n• la traçabilité pharmaceutique,\n• la digitalisation,\n• la réglementation pharmaceutique,\n• les réformes institutionnelles,\n• les formations stratégiques,\n• l’assistance technique,\n• le pilotage de projets complexes."
        },
        {
          category: "general",
          q: "2. Quelle est la vision de SaniNova ?",
          a: "La vision de SaniNova est de contribuer durablement à la transformation et à la modernisation des systèmes de santé à travers des solutions stratégiques, innovantes et adaptées aux réalités locales.\n\nLe cabinet ambitionne de devenir une référence africaine et internationale dans le domaine du conseil en systèmes de santé, supply chain pharmaceutique et transformation digitale sanitaire."
        },
        {
          category: "general",
          q: "3. Quelle est la mission de SaniNova ?",
          a: "La mission de SaniNova est d’accompagner les institutions dans le renforcement de leurs performances à travers :\n• le conseil stratégique,\n• l’assistance technique,\n• la formation,\n• la digitalisation,\n• l’innovation,\n• et le développement des compétences.\n\nL’objectif est d’aider les organisations à améliorer durablement l’accès aux produits et services de santé de qualité."
        },
        {
          category: "services",
          q: "4. Quels sont les domaines d’expertise de SaniNova ?",
          a: "SaniNova intervient principalement dans les domaines suivants :\n\nSupply Chain Santé\n• Quantification et prévision des besoins\n• Planification des approvisionnements\n• Gestion des stocks\n• Distribution des produits de santé\n• Gestion des entrepôts\n• Last Mile Delivery\n• Pipeline monitoring\n• Optimisation des systèmes logistiques\n\nDigitalisation et systèmes d’information sanitaires\n• eLMIS / eSIGL\n• Interopérabilité des systèmes\n• DHIS2\n• Traçabilité pharmaceutique\n• Dashboards décisionnels\n• Business Intelligence\n• Transformation digitale\n• Architecture des systèmes de santé\n\nRéglementation pharmaceutique\n• Renforcement des autorités réglementaires\n• Conformité pharmaceutique\n• Cadres juridiques\n• Traçabilité et sérialisation\n• Gouvernance pharmaceutique\n\nRenforcement des capacités\n• Formations professionnelles\n• Certifications\n• Coaching stratégique\n• Développement des compétences techniques\n• Leadership en santé publique\n\nAssistance technique et conseil stratégique\n• Réformes institutionnelles\n• Gouvernance des systèmes de santé\n• Appui aux ministères\n• Coordination des partenaires\n• Élaboration de politiques et stratégies\n• Études et analyses stratégiques"
        },
        {
          category: "general",
          q: "5. Qui sont les clients cibles de SaniNova ?",
          a: "Les services de SaniNova s’adressent principalement à :\n• Gouvernements\n• Ministères de la Santé\n• Agences réglementaires\n• Centrales d’achat pharmaceutiques\n• Programmes nationaux de santé\n• Organisations internationales\n• ONG internationales\n• Partenaires techniques et financiers\n• Hôpitaux publics et privés\n• Officines de Pharmacies\n• Industries pharmaceutiques\n• Professionnels de santé\n• Consultants et cadres du secteur sanitaire"
        },
        {
          category: "general",
          q: "6. Pourquoi choisir SaniNova ?",
          a: "SaniNova se distingue par plusieurs avantages stratégiques :\n• Une forte expertise terrain dans les systèmes de santé africains\n• Une compréhension approfondie des réalités institutionnelles\n• Une approche orientée résultats\n• Une expertise combinant stratégie, technique et opérationnel\n• Une capacité à accompagner les réformes complexes\n• Une forte expérience dans les projets financés par les bailleurs internationaux\n• Une approche intégrée entre réglementation, digitalisation et supply chain\n• Un accompagnement personnalisé et durable"
        },
        {
          category: "services",
          q: "7. Quels types de services propose SaniNova ?",
          a: "SaniNova propose plusieurs catégories de services :\n• Conseil stratégique\n• Assistance technique\n• Formations professionnelles\n• Certifications spécialisées\n• Études et évaluations\n• Audit organisationnel et opérationnel\n• Digitalisation des systèmes\n• Conception de solutions innovantes\n• Accompagnement des réformes\n• Renforcement institutionnel"
        },
        {
          category: "academy",
          q: "8. Les formations de SaniNova sont-elles certifiantes ?",
          a: "Oui.\n\nSaniNova propose des formations professionnelles et des programmes certifiants spécialisés dans les systèmes de santé, la supply chain pharmaceutique, la réglementation pharmaceutique et la transformation digitale.\n\nLes programmes sont conçus pour répondre aux standards internationaux tout en restant adaptés aux réalités africaines."
        },
        {
          category: "academy",
          q: "9. Les formations sont-elles adaptées aux réalités locales ?",
          a: "Absolument.\n\nToutes les formations de SaniNova intègrent :\n• les réalités institutionnelles locales,\n• les contraintes opérationnelles locales,\n• les réglementations nationales,\n• les enjeux de financement,\n• les défis logistiques,\n• ainsi que des cas pratiques issus du terrain."
        },
        {
          category: "services",
          q: "10. Quels problèmes SaniNova aide-t-il à résoudre ?",
          a: "SaniNova aide les institutions à résoudre des problématiques telles que :\n• les ruptures de stocks,\n• la mauvaise visibilité des données,\n• les difficultés de coordination logistique,\n• les insuffisances réglementaires,\n• les faibles capacités institutionnelles,\n• les problèmes de traçabilité,\n• les difficultés de digitalisation,\n• les inefficacités opérationnelles,\n• les problèmes de gouvernance,\n• et les défis de transformation organisationnelle."
        },
        {
          category: "digital",
          q: "11. Pourquoi la digitalisation des systèmes de santé est-elle importante ?",
          a: "La digitalisation permet :\n• une meilleure visibilité des données,\n• une prise de décision plus rapide,\n• une amélioration du suivi des stocks,\n• une réduction des pertes,\n• une meilleure traçabilité des produits,\n• une amélioration des performances institutionnelles,\n• et un renforcement de la transparence.\n\nAujourd’hui, les systèmes de santé performants reposent fortement sur les données et les outils numériques."
        },
        {
          category: "digital",
          q: "12. Qu’est-ce que la traçabilité pharmaceutique ?",
          a: "La traçabilité pharmaceutique permet de suivre les produits de santé tout au long de la chaîne d’approvisionnement, depuis leur fabrication jusqu’au patient.\n\nElle contribue à :\n• lutter contre les faux médicaments,\n• améliorer la sécurité des patients,\n• renforcer le contrôle réglementaire,\n• améliorer la gestion des stocks,\n• et sécuriser les circuits pharmaceutiques."
        },
        {
          category: "digital",
          q: "13. SaniNova intervient-il dans les projets gouvernementaux ?",
          a: "Oui.\n\nSaniNova accompagne les gouvernements et institutions publiques dans :\n• les réformes stratégiques,\n• les projets de digitalisation,\n• les systèmes de traçabilité,\n• les projets eLMIS,\n• les stratégies pharmaceutiques,\n• les plans de renforcement de capacités,\n• les évaluations institutionnelles,\n• et les projets financés par les partenaires techniques et financiers."
        },
        {
          category: "digital",
          q: "14. SaniNova peut-il accompagner des organisations internationales ?",
          a: "Oui.\n\nLe cabinet peut intervenir comme :\n• consultant,\n• partenaire technique,\n• structure de mise en œuvre,\n• cabinet d’assistance technique,\n• organisme de formation,\n• ou expert en transformation des systèmes de santé."
        },
        {
          category: "academy",
          q: "15. Pourquoi investir dans le renforcement des capacités ?",
          a: "Le renforcement des capacités permet :\n• d’améliorer les performances institutionnelles,\n• de réduire les erreurs opérationnelles,\n• d’augmenter l’efficacité,\n• de renforcer la gouvernance,\n• et de préparer les institutions aux standards internationaux.\n\nLes institutions performantes investissent continuellement dans les compétences de leurs équipes."
        },
        {
          category: "services",
          q: "16. Pourquoi les prestations de SaniNova sont-elles positionnées haut de gamme ?",
          a: "Les prestations de SaniNova reposent sur une forte valeur ajoutée stratégique et technique.\n\nElles mobilisent :\n• des experts spécialisés,\n• une expertise internationale,\n• des méthodologies avancées,\n• un accompagnement personnalisé,\n• des outils techniques spécialisés,\n• et une forte implication opérationnelle.\n\nSaniNova ne vend pas uniquement une prestation. Le cabinet apporte :\n• des résultats,\n• de la transformation,\n• de la performance,\n• et une valeur stratégique durable."
        },
        {
          category: "academy",
          q: "17. Les formations peuvent-elles être organisées sur mesure ?",
          a: "Oui.\n\nSaniNova développe des programmes personnalisés selon :\n• les besoins du client,\n• le niveau technique des participants,\n• les priorités institutionnelles,\n• les objectifs stratégiques,\n• et le contexte réglementaire du pays."
        },
        {
          category: "academy",
          q: "18. Les formations peuvent-elles être organisées en ligne ?",
          a: "Oui.\n\nSaniNova propose :\n• des formations en présentiel,\n• des formations hybrides,\n• et des formations entièrement en ligne.\n\nLes programmes virtuels sont conçus pour offrir une forte interactivité et une expérience pédagogique de qualité."
        },
        {
          category: "services",
          q: "19. Quels sont les bénéfices concrets pour une institution ?",
          a: "Les institutions accompagnées par SaniNova bénéficient notamment :\n• d’une amélioration des performances,\n• d’un renforcement des capacités techniques,\n• d’une meilleure gouvernance,\n• d’une meilleure visibilité des données,\n• d’une optimisation des processus,\n• d’une réduction des risques opérationnels,\n• et d’une amélioration de la disponibilité des produits de santé."
        },
        {
          category: "general",
          q: "20. Qu’est-ce qui différencie SaniNova des autres cabinets ?",
          a: "SaniNova se distingue par :\n• son expertise spécialisée dans les systèmes de santé,\n• sa compréhension des réalités locales,\n• son approche stratégique et opérationnelle,\n• sa maîtrise des enjeux réglementaires,\n• son expertise digitale,\n• son réseau d’experts,\n• et sa capacité à accompagner les grandes réformes.\n\nLe cabinet privilégie des solutions pratiques, réalistes et durables."
        },
        {
          category: "general",
          q: "21. Les services de SaniNova sont-ils uniquement destinés au secteur public ?",
          a: "Non.\n\nSaniNova accompagne également :\n• les structures privées,\n• les cliniques,\n• les industries pharmaceutiques,\n• les officines de pharmacies,\n• les ONG,\n• les cabinets de conseil,\n• et les entreprises intervenant dans le secteur santé."
        },
        {
          category: "digital",
          q: "22. Pourquoi investir maintenant dans la modernisation des systèmes de santé ?",
          a: "Les systèmes de santé évoluent rapidement.\n\nLes institutions doivent aujourd’hui :\n• renforcer leurs capacités,\n• améliorer leurs données,\n• moderniser leurs outils,\n• digitaliser leurs processus,\n• renforcer leur conformité,\n• et améliorer leurs performances.\n\nLes organisations qui anticipent ces transformations prennent une avance stratégique importante."
        },
        {
          category: "services",
          q: "23. Comment se déroule une mission de conseil avec SaniNova ?",
          a: "Une mission suit généralement plusieurs étapes :\n1. Analyse des besoins\n2. Diagnostic technique et institutionnel\n3. Élaboration des recommandations\n4. Mise en œuvre des solutions\n5. Accompagnement technique\n6. Suivi et évaluation\n\nL’approche est collaborative et fortement orientée résultats."
        },
        {
          category: "services",
          q: "24. SaniNova propose-t-il un accompagnement après les formations et missions ?",
          a: "Oui.\n\nLe cabinet privilégie un accompagnement durable.\n\nLes clients et participants bénéficient notamment :\n• d’un suivi technique,\n• d’un accès aux experts,\n• de mises à jour,\n• de partage de ressources,\n• de conseils stratégiques,\n• et d’un réseau professionnel."
        },
        {
          category: "services",
          q: "25. Pourquoi les institutions ont-elles besoin d’assistance technique externe ?",
          a: "Les projets complexes nécessitent souvent :\n• des expertises spécialisées,\n• des méthodologies avancées,\n• des expériences comparatives,\n• une vision stratégique,\n• et des ressources techniques additionnelles.\n\nL’assistance technique permet d’accélérer les résultats et de réduire les risques."
        },
        {
          category: "general",
          q: "26. Comment contacter SaniNova ?",
          a: "Les prospects peuvent contacter SaniNova via :\n• email : saninovagc@gmail.com\n• telephone : +2290161015495\n• LinkedIn : SaniNova Global Consulting\n• site web : www.saninovagc.com\n• ou directement lors des événements professionnels.\n\nToutes les demandes sont prises en charge de manière professionnelle et confidentielle."
        },
        {
          category: "academy",
          q: "27. Comment s'inscrire à une formation ?",
          a: "L'inscription se fait directement en ligne via notre plateforme. Choisissez votre formation, remplissez le formulaire d'inscription et procédez au paiement pour garantir votre place."
        },
        {
          category: "academy",
          q: "28. Quels sont les moyens de paiement acceptés ?",
          a: "Nous acceptons les paiements via Mobile Money, Cartes Bancaires (Visa, Mastercard), PayPal et virement bancaire via nos passerelles sécurisées."
        },
        {
          category: "academy",
          q: "29. Quelle est la politique d'annulation et de remboursement ?",
          a: "Toute annulation effectuée plus de 15 jours avant le début de la formation donne lieu à un remboursement intégral. Entre 15 et 7 jours, 50% sont remboursés. Aucun remboursement n'est possible à moins de 7 jours, mais un report sur une session future peut être envisagé."
        }
      ]
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      expertises: "Expertise",
      services: "Services",
      publications: "Publications",
      contact: "Contact",
      faq: "FAQ",
      academy: "Academy",
      cta: "Request Consultation",
    },
    common: {
      back: "Back",
      loading: "Loading...",
      error: "An error occurred",
      save: "Save",
      cancel: "Cancel",
    },
    academy: {
      title: "The benchmark for strategic health skills development",
      subtitle: "Train your leaders and transform your systems with our 6 specialized academies and high-level certification programs.",
      ctaTrainings: "View Trainings",
      ctaRegister: "Register Now",
      nav: {
        home: "Academy Home",
        trainings: "eLearning",
        certifications: "Certifications",
        announcements: "Announcements",
        faq: "FAQ"
      },
      stats: {
        trainings: "Trainings",
        participants: "Trained Participants",
        experts: "Experts",
        countries: "Countries Covered"
      },
      why: {
        tag: "WHY SANINOVA ACADEMY?",
        title: "Excellence at the service of your career",
        points: [
          { title: "Recognized Expertise", desc: "Know-how from the field." },
          { title: "Qualified Trainers", desc: "Leading practitioner experts." },
          { title: "Certifications", desc: "Recognized certification programs." },
          { title: "Practical Approach", desc: "Pedagogy focused on concrete cases." },
          { title: "Professional Network", desc: "An elite health community." },
          { title: "Real Impact", desc: "Immediately applicable skills." }
        ]
      },
      vision: {
        tag: "OUR AMBITION",
        title: "Becoming the reference for strategic health skills development",
        desc: "SaniNova Global Consulting aims to become a reference in the development of strategic skills in pharmaceutical systems, health supply chain, digital health, health governance, leadership, and institutional transformation.",
        targets: [
          "Governments", "Ministries", "Regulatory Agencies", "National Programs", 
          "NGOs", "Technical and Financial Partners", "Pharmacists", "Health Facilities", 
          "Pharmaceutical Companies", "Consultants", "Universities", "Health Startups"
        ]
      },
      subAcademies: [
        {
          id: "supply-chain",
          title: "Health Supply Chain Academy",
          mission: "To train experts capable of securing the availability of health products through efficient, resilient, and digitalized logistics systems.",
          disciplines: [
            "Procurement and stock management", "Quantification and forecasting", 
            "Distribution and last mile", "Pharmaceutical warehousing", "Cold chain", 
            "LMIS & eSIGL", "Logistics data analytics", "Humanitarian supply chain", "Health emergency management"
          ],
          certifications: [
            "Professional Certificate in Pharmaceutical Supply Chain", "Advanced Certification in Quantification", 
            "Certification in Stock Management", "Certification in eLMIS & Data Visibility", 
            "Certification in Pharmaceutical Distribution", "Executive Program in Supply Chain Leadership"
          ]
        },
        {
          id: "regulation",
          title: "Pharmaceutical Regulation Academy",
          mission: "To develop advanced skills in pharmaceutical governance, regulatory compliance, and quality assurance.",
          disciplines: [
            "Pharmaceutical regulation", "Pharmaceutical governance", "Quality assurance", 
            "Pharmacovigilance", "Import and compliance", "Pharmaceutical traceability", 
            "Pharmaceutical inspection", "Regulatory management of health products"
          ],
          certifications: [
            "Certificate in Pharmaceutical Regulatory Framework", "Certification in Quality Assurance", 
            "Certification in Good Pharmaceutical Practices", "Certification in Pharmacovigilance", 
            "Certification in Pharmaceutical Regulation"
          ]
        },
        {
          id: "digital",
          title: "Digital Health & Innovation Academy",
          mission: "To train leaders of the digital transformation of African health systems.",
          disciplines: [
            "Digital health", "eLMIS", "Traceability of health products", "Data governance", 
            "Digital health data collection and analysis", "Artificial Intelligence applied to health", 
            "Health cybersecurity", "Health systems architecture"
          ],
          certifications: [
            "Certificate in Digital Health", "Certification in Traceability", "Certification in Health Data Analytics", 
            "Health Power BI Certification", "Executive Program in Health Digital Transformation"
          ]
        },
        {
          id: "leadership",
          title: "Leadership & Health Governance Academy",
          mission: "To strengthen strategic leadership, institutional governance, and health reform management capacities.",
          disciplines: [
            "Executive leadership", "Health governance", "Strategic management", "Health project management", 
            "Change management", "Multisectoral coordination", "Strategic planning", 
            "Health diplomacy", "Health financing management"
          ],
          certifications: [
            "Executive Certificate in Health Leadership", "Certification in Health Governance", 
            "Certification in Health Project Management", "Certification in Health Financing Management", 
            "Certification in Institutional Leadership"
          ]
        },
        {
          id: "public-health",
          title: "Public Health & Programs Academy",
          mission: "To train professionals in programmatic and operational management of public health interventions.",
          disciplines: [
            "HIV", "Malaria", "Tuberculosis", "Vaccination", "Maternal health", 
            "Nutrition", "Community health", "Health systems strengthening", "UHC"
          ],
          certifications: [
            "Certification in Health Program Management", "Certification in Operational Public Health", 
            "Certification in Health Systems Strengthening"
          ]
        },
        {
          id: "business",
          title: "Pharmaceutical Business & Health Entrepreneurship Academy",
          mission: "To develop entrepreneurial and managerial skills in the pharmaceutical and health sector.",
          disciplines: [
            "Pharmacy management", "Pharmaceutical entrepreneurship", "Pharmaceutical finance", 
            "Pharmaceutical marketing", "Health business development", "Clinic management", 
            "Hospital management", "Health innovation"
          ],
          certifications: [
            "Certification in Modern Pharmacy Management", "Certification in Pharmaceutical Entrepreneurship", 
            "Certification in Health Facility Management"
          ]
        }
      ],
      pedagogy: {
        tag: "PEDAGOGICAL MODEL",
        title: "An innovative and contextualized approach",
        approaches: [
          {
            title: "Practical and strategic training",
            points: ["Real cases", "Simulations", "Workshops", "Field exercises"]
          },
          {
            title: "Contextualized African approach",
            points: ["Institutional realities", "Regional regulation", "Adapted cases"]
          },
          {
            title: "Hybrid approach",
            points: ["Face-to-face", "Remote", "eLearning", "Coaching"]
          }
        ]
      },
      formats: {
        tag: "TRAINING FORMATS",
        title: "Methods adapted to your needs",
        list: [
          { name: "Short Workshop", duration: "1–2 days" },
          { name: "Professional Certification", duration: "5–10 days" },
          { name: "Executive Program", duration: "3–6 weeks" },
          { name: "Intensive Bootcamp", duration: "2–4 weeks" },
          { name: "Masterclass", duration: "A few hours" },
          { name: "Continuing Education", duration: "Monthly" },
          { name: "eLearning", duration: "Flexible" }
        ]
      }
    },
    hero: {
      title: "Sustainably Transforming Health Systems in Africa",
      subtitle: "SaniNova supports governments, institutions, and partners in designing and implementing ambitious, innovative, and sustainable healthcare reforms.",
      ctaPrimary: "Discover Our Expertise",
      ctaSecondary: "Schedule a Meeting",
      scrollText: "Scroll to discover",
    },
    aboutSection: {
      tag: "ABOUT US",
      title: "The Leading Strategic Consulting Firm for African Healthcare",
      desc1: "SaniNova is a premium consulting firm specializing in health systems transformation, health governance, digital health, pharmaceutical regulation, and institutional strengthening in Africa.",
      desc2: "Inspired by operational excellence and international best practices, we combine strategic rigor with local roots to address complex public health challenges across the African continent.",
      stat1: "15+",
      stat1Label: "Countries of Operation",
      stat2: "100+",
      stat2Label: "Impactful Projects",
      stat3: "200+",
      stat3Label: "Associate Experts",
      cta: "Learn More About Our Vision",
    },
    expertises: {
      tag: "AREAS OF EXPERTISE",
      title: "State-of-the-Art Solutions for Resilient Systems",
      subtitle: "Our multidisciplinary expertise covers all critical levers of healthcare performance.",
      viewMore: "Learn More",
      ctaAll: "Explore All Our Expertise",
      list: {
        governance: {
          title: "Health Governance",
          desc: "Support for policy reforms, strategic planning, and institutional strengthening of Ministries of Health.",
        },
        pharma: {
          title: "Pharmaceutical Regulation",
          desc: "Optimization of regulatory frameworks, drug registration, and quality assurance of health products.",
        },
        supplyChain: {
          title: "Supply Chain Management",
          desc: "Modernization of medical logistics, strategic stock management, and last-mile distribution.",
        },
        digital: {
          title: "Digital Health",
          desc: "Integration of telemedicine tools, electronic patient records, and health information systems (DHIS2).",
        },
        quality: {
          title: "Quality of Care",
          desc: "Establishing hospital accreditation standards and standardized clinical protocols for patient safety.",
        },
        financing: {
          title: "Health Financing",
          desc: "Design of Universal Health Insurance (UHI) mechanisms and modeling of innovative financing.",
        },
        hr: {
          title: "Human Resources",
          desc: "Training engineering, workforce forecasting, and medical skills development.",
        },
        security: {
          title: "Health Security",
          desc: "Epidemic preparedness and response, epidemiological surveillance, and resilience to health crises.",
        },
        evaluation: {
          title: "Monitoring & Evaluation",
          desc: "Impact measurement of public health programs, performance audits, and national health surveys.",
        },
      },
    },
    methodology: {
      tag: "METHODOLOGICAL APPROACH",
      title: "A Rigorous, Impact-Oriented Methodology",
      subtitle: "We apply a structured methodology inspired by high-level international consulting standards.",
      steps: [
        {
          num: "01",
          title: "Thorough Diagnosis",
          desc: "Quantitative and qualitative analysis of the existing situation, field data collection, and bottleneck identification.",
        },
        {
          num: "02",
          title: "Strategic Co-construction",
          desc: "Collaborative workshops with stakeholders to define a shared vision aligned with national priorities.",
        },
        {
          num: "03",
          title: "Modeling and Design",
          desc: "Development of tailor-made solutions, budget costing, process modeling, and digital prototyping.",
        },
        {
          num: "04",
          title: "Implementation Support",
          desc: "Operational support on the ground, change management, project management office (PMO), and technology deployment.",
        },
        {
          num: "05",
          title: "Monitoring & Evaluation",
          desc: "Setting up key performance indicators (KPIs), independent impact assessment, and skills transfer for sustainability.",
        },
      ],
    },
    advantages: {
      tag: "COMPARATIVE ADVANTAGES",
      title: "Why Choose SaniNova as Your Strategic Partner?",
      subtitle: "Our firm stands out for its ability to deliver sustainable and measurable transformations.",
      points: [
        {
          title: "Multidisciplinary Expertise",
          desc: "An elite team bringing together medical doctors, data engineers, logisticians, and health economists.",
        },
        {
          title: "Systemic Vision",
          desc: "We do not treat symptoms; we act on the entire system for a global and long-lasting impact.",
        },
        {
          title: "Results-Oriented Approach",
          desc: "Methodologies focused on precise, measurable, and verified performance indicators on the ground.",
        },
        {
          title: "African Expertise",
          desc: "Intimate knowledge of the sociocultural, economic, and logistical realities of the African continent.",
        },
        {
          title: "Digital Innovation",
          desc: "Pioneers in implementing next-generation digital health solutions tailored to the local context.",
        },
        {
          title: "Dual Support",
          desc: "A seamless transition between high-level strategic consulting and meticulous field execution.",
        },
      ],
    },
    impact: {
      tag: "IMPACT IN FIGURES",
      title: "Our Contribution to Public Health Improvement",
      stats: [
        { value: "45", label: "Major Projects", suffix: "+" },
        { value: "12", label: "Governments Supported", suffix: "" },
        { value: "150", label: "Deployable Experts", suffix: "+" },
        { value: "25", label: "Million Lives Impacted", suffix: "M+" },
        { value: "5000", label: "Professionals Trained", suffix: "+" },
        { value: "98", label: "Client Satisfaction Rate", suffix: "%" },
      ],
    },
    publications: {
      tag: "INSIGHTS & PUBLICATIONS",
      title: "The African Health Innovation Think-Tank",
      subtitle: "Explore our latest analyses, strategic studies, and thematic reports.",
      viewArticle: "Read Analysis",
      allArticles: "View All Publications",
      categories: {
        all: "All",
        digital: "Digital Health",
        governance: "Governance",
        reforms: "Health Reforms",
        supply: "Supply Chain",
        regulation: "Regulation",
        ai: "AI & Health",
        security: "Health Security",
      },
      searchPlaceholder: "Search for articles, reports...",
      noResults: "No articles found matching this search.",
      list: [
        {
          id: 1,
          category: "digital",
          title: "Rural Telemedicine: Connecting Remote Areas of West Africa",
          desc: "How the implementation of connected mobile clinics is revolutionizing primary care access in isolated rural communities.",
          date: "April 12, 2026",
          readTime: "8 min",
          image: "/images/publication_digital_health.png",
        },
        {
          id: 2,
          category: "governance",
          title: "Governance and Resilience: Post-Pandemic Health Reform Lessons",
          desc: "An analysis of best practices in hospital governance and care decentralization to withstand future health crises.",
          date: "March 28, 2026",
          readTime: "12 min",
          image: "/images/publication_governance.png",
        },
        {
          id: 3,
          category: "supply",
          title: "Securing the Last Mile: Intelligent Pharmaceutical Logistics",
          desc: "Optimizing vaccine supply chains in sub-Saharan Africa using IoT real-time temperature tracking technologies.",
          date: "March 05, 2026",
          readTime: "10 min",
          image: "/images/publication_supply_chain.png",
        },
      ],
    },
    partners: {
      title: "Trusted Partners",
    },
    contactQuick: {
      tag: "QUICK CONTACT",
      title: "Let's Discuss Your Transformation Projects",
      subtitle: "Schedule a meeting with our managing partners to assess your strategic needs.",
      name: "Full Name",
      institution: "Institution / Company",
      country: "Country",
      email: "Email Address",
      subject: "Consultation Subject",
      message: "Your message...",
      submit: "Schedule a Consultation",
      success: "Your consultation request has been successfully sent! Our team will contact you within 24h.",
    },
    aboutPage: {
      hero: {
        title: "Building the Foundations of Excellent Healthcare",
        subtitle: "SaniNova was born from the desire to provide Africa with world-class consulting capabilities to accelerate the transition towards universal health coverage.",
      },
      vision: {
        title: "Our Vision",
        desc: "To become the preferred strategic partner for governments and international institutions in designing, modeling, and operating the most efficient, resilient, and equitable African health systems of the 21st century.",
      },
      mission: {
        title: "Our Mission",
        desc: "To support the sustainable transformation of healthcare ecosystems by mobilizing an elite multidisciplinary expertise, promoting technological innovation, and co-building high-impact reforms.",
      },
      values: {
        title: "Our Core Values",
        list: [
          {
            title: "Integrity",
            desc: "We act with complete transparency, absolute professional ethics, and scrupulous respect for national commitments.",
          },
          {
            title: "Innovation",
            desc: "We believe in the power of digital health and data to leapfrog traditional sanitary development barriers.",
          },
          {
            title: "Excellence",
            desc: "We target the highest international quality standards in every strategic consulting engagement we deliver.",
          },
          {
            title: "Collaboration",
            desc: "We do not deploy pre-packaged answers; we co-design every project alongside field actors.",
          },
          {
            title: "Impact",
            desc: "We are impact-first: our added value is only measured by the concrete improvement of health indicators on the ground.",
          },
        ],
      },
      leadership: {
        title: "Our Team",
        desc: "Seasoned thought-leaders combining high public service experience, international consulting background, and medical research.",
        members: [
          {
            name: "Dr. Hope Akohouvi AMOU",
            role: "President & CEO",
            desc: "Managing Director of SaniNova, international expert in health systems transformation and high-impact reforms in Africa.",
          },
          {
            name: "Sophie KABORE",
            role: "Partner, Digital Health",
            desc: "Engineering expert specialized in health information systems, pioneer of national-scale e-health initiatives.",
          },
          {
            name: "Prof. Jean-Marie BEHANZIN",
            role: "Chief Scientific Advisor",
            desc: "Professor in Epidemiology, expert consultant for the World Health Organization (WHO).",
          },
        ],
      },
    },
    director: {
      tag: "EXECUTIVE LEADERSHIP",
      name: "Dr. Hope Akohouvi Amou",
      role: "Managing Director & Health Systems Expert",
      description1: "Dr. Hope Akohouvi Amou is the Managing Director of SaniNova, providing strategic leadership on health systems transformation across Africa. He advises governments and development partners on the design and implementation of high-impact reforms.",
      description2: "His expertise spans health governance, pharmaceutical regulation, supply chain management, digital health, health financing, and health security. He leads SaniNova with a clear focus on advancing resilient, equitable, and high-performing health systems.",
      description3: "",
      expertiseTitle: "Areas of Expertise",
      expertises: [
        "Health Governance",
        "Pharmaceutical Regulation",
        "Supply Chain Management",
        "Digital Health",
        "Quality of Care",
        "Health Financing",
        "Human Resources",
        "Health Security",
        "Monitoring & Evaluation",
        "Health Systems Strengthening",
        "Performance Evaluation",
        "Strategic Studies"
      ],
      quote: "Transforming health systems requires a strategic vision, strong governance, and a capacity for sustainable innovation."
    },
    servicesPage: {
      title: "Our Tailored Solutions",
      subtitle: "An integrated service offering to support institutions throughout their growth.",
      list: [
        {
          title: "Strategic Consulting",
          desc: "High-level decision support for governments: drafting national healthcare policies, five-year strategic plans, organizational reforms, and economic feasibility studies for major hospital developments.",
        },
        {
          title: "Technical Assistance",
          desc: "Secondment of top-tier experts to regulatory agencies, central medicine procurement hubs, and healthcare financing entities to optimize daily operational workflows.",
        },
        {
          title: "Digital Transformation",
          desc: "Audit of current assets, technological roadmapping, health cybersecurity audits, and deployment monitoring for telemedicine, DHIS2, and interconnected electronic healthcare records.",
        },
        {
          title: "Capacity Building",
          desc: "Strategic skills development through our 6 specialized academies: Supply Chain, Regulation, Digital Health, Leadership & Governance, Public Health, and Pharmaceutical Business.",
        },
        {
          title: "Study, Research & Evaluation",
          desc: "External mid-term or final evaluations of donor-funded health programs, healthcare infrastructure audits, nationwide surveys, and public health trend modeling.",
        },
        {
          title: "Funding Research",
          desc: "Identification and mobilization of financing from international donors, multilateral funds, development partners and philanthropic institutions to support health projects.",
        },
        {
          title: "Project Management",
          desc: "End-to-end operational management of health projects: planning, multidisciplinary team coordination, performance indicator monitoring and stakeholder reporting.",
        },
        {
          title: "Representation",
          desc: "Representation of health organizations before national, regional and international institutions to defend their interests and strengthen their strategic visibility.",
        },
        {
          title: "Institutional Advocacy",
          desc: "Design and implementation of targeted advocacy strategies to influence policy makers and technical and financial partners in favor of structural health reforms.",
        },
        {
          title: "Institutional & Event Communication",
          desc: "Development of institutional communication strategies, organization of high-impact events (conferences, forums, workshops) and reputation management for health organizations.",
        },
      ],
    },
    contactPage: {
      title: "Schedule a Discussion with Our Experts",
      subtitle: "Based in Cotonou, our firm deploys its experts across sub-Saharan Africa.",
      phone: "Phone",
      email: "Email Address",
      address: "Headquarters",
      followUs: "Follow Us",
      mapTitle: "Our Office in Cotonou",
      scheduleConsultation: "Select a Consultation Slot",
      calendarText: "Schedule an online meeting directly through our secure booking calendar.",
    },
    footer: {
      slogan: "Building tomorrow's health systems.",
      rights: "All rights reserved.",
      quickLinks: "Quick links",
      contactInfo: "Contact",
    },
    faqPage: {
      title: "SaniNova Global Consulting FAQ",
      subtitle: "Find answers to all your questions about our expertise, services, and training programs.",
      searchPlaceholder: "Search for a question...",
      noResults: "No questions match your search.",
      categories: {
        all: "All Questions",
        general: "SaniNova & Vision",
        services: "Expertise & Services",
        digital: "Digitalization & Health",
        academy: "Training & Registration",
      },
      items: [
        {
          category: "general",
          q: "1. What is SaniNova?",
          a: "SaniNova is an international strategic consulting firm specializing in health systems strengthening, pharmaceutical and healthcare supply chains, digital health transformation, pharmaceutical regulation, health governance, and institutional capacity building.\n\nThe firm supports governments, public institutions, international organizations, health programs, central procurement agencies, regulatory bodies, NGOs, and private companies in the design, implementation, and improvement of innovative solutions tailored to local realities.\n\nSaniNova operates in:\n• health supply chains,\n• health information systems,\n• eLMIS,\n• pharmaceutical traceability,\n• digitalization,\n• pharmaceutical regulation,\n• institutional reforms,\n• strategic training,\n• technical assistance,\n• complex project management."
        },
        {
          category: "general",
          q: "2. What is SaniNova's vision?",
          a: "SaniNova's vision is to contribute sustainably to the transformation and modernization of health systems through strategic, innovative, and locally adapted solutions.\n\nThe firm aims to become an African and international benchmark in health systems consulting, pharmaceutical supply chains, and digital health transformation."
        },
        {
          category: "general",
          q: "3. What is SaniNova's mission?",
          a: "SaniNova's mission is to support institutions in strengthening their performance through:\n• strategic consulting,\n• technical assistance,\n• training,\n• digitalization,\n• innovation,\n• and skills development.\n\nThe ultimate goal is to help organizations sustainably improve access to high-quality health products and services."
        },
        {
          category: "services",
          q: "4. What are SaniNova's areas of expertise?",
          a: "SaniNova operates mainly in the following areas:\n\nHealth Supply Chain\n• Quantification and forecasting\n• Procurement planning\n• Stock management\n• Distribution of health products\n• Warehouse management\n• Last Mile Delivery\n• Pipeline monitoring\n• Logistics systems optimization\n\nDigitalization and Health Information Systems\n• eLMIS / eSIGL\n• Systems interoperability\n• DHIS2\n• Pharmaceutical traceability\n• Decision dashboards\n• Business Intelligence\n• Digital transformation\n• Health systems architecture\n\nPharmaceutical Regulation\n• Strengthening regulatory authorities\n• Pharmaceutical compliance\n• Legal frameworks\n• Traceability and serialization\n• Pharmaceutical governance\n\nCapacity Building\n• Professional training\n• Certifications\n• Strategic coaching\n• Technical skills development\n• Public health leadership\n\nTechnical Assistance and Strategic Consulting\n• Institutional reforms\n• Health systems governance\n• Support to ministries\n• Partner coordination\n• Policy and strategy development\n• Strategic studies and analyses"
        },
        {
          category: "general",
          q: "5. Who are SaniNova's target clients?",
          a: "SaniNova's services are primarily addressed to:\n• Governments\n• Ministries of Health\n• Regulatory agencies\n• Pharmaceutical central purchasing bodies\n• National health programs\n• International organizations\n• International NGOs\n• Technical and financial partners\n• Public and private hospitals\n• Pharmacies\n• Pharmaceutical industries\n• Health professionals\n• Health sector consultants and executives"
        },
        {
          category: "general",
          q: "6. Why choose SaniNova?",
          a: "SaniNova stands out due to several strategic advantages:\n• Strong field expertise in African health systems\n• Deep understanding of institutional realities\n• A results-oriented approach\n• Expertise combining strategy, technique, and operations\n• An ability to support complex reforms\n• Solid experience in projects funded by international donors\n• An integrated approach between regulation, digitalization, and supply chain\n• Personalized and sustainable support"
        },
        {
          category: "services",
          q: "7. What types of services does SaniNova offer?",
          a: "SaniNova offers several categories of services:\n• Strategic consulting\n• Technical assistance\n• Professional training\n• Specialized certifications\n• Studies and evaluations\n• Organizational and operational audits\n• Systems digitalization\n• Design of innovative solutions\n• Support for reforms\n• Institutional strengthening"
        },
        {
          category: "academy",
          q: "8. Are SaniNova's training programs certifiable?",
          a: "Yes.\n\nSaniNova offers professional training and specialized certification programs in health systems, pharmaceutical supply chains, pharmaceutical regulation, and digital transformation.\n\nThese programs are designed to meet international standards while remaining adapted to African realities."
        },
        {
          category: "academy",
          q: "9. Are the training programs adapted to local realities?",
          a: "Absolutely.\n\nAll of SaniNova's training programs integrate:\n• local institutional realities,\n• local operational constraints,\n• national regulations,\n• funding challenges,\n• logistics challenges,\n• and practical field-based case studies."
        },
        {
          category: "services",
          q: "10. What problems does SaniNova help resolve?",
          a: "SaniNova helps institutions resolve issues such as:\n• stockouts,\n• poor data visibility,\n• logistical coordination difficulties,\n• regulatory gaps,\n• weak institutional capacities,\n• traceability issues,\n• digitalization challenges,\n• operational inefficiencies,\n• governance problems,\n• and organizational transformation challenges."
        },
        {
          category: "digital",
          q: "11. Why is the digitalization of health systems important?",
          a: "Digitalization enables:\n• better data visibility,\n• faster decision-making,\n• improved stock monitoring,\n• reduction of losses,\n• better product traceability,\n• enhanced institutional performance,\n• and strengthened transparency.\n\nToday, high-performing health systems rely heavily on data and digital tools."
        },
        {
          category: "digital",
          q: "12. What is pharmaceutical traceability?",
          a: "Pharmaceutical traceability allows health products to be tracked throughout the supply chain, from manufacturing to the patient.\n\nIt helps to:\n• combat counterfeit medicines,\n• improve patient safety,\n• strengthen regulatory control,\n• improve stock management,\n• and secure pharmaceutical distribution channels."
        },
        {
          category: "digital",
          q: "13. Does SaniNova intervene in government projects?",
          a: "Yes.\n\nSaniNova supports governments and public institutions in:\n• strategic reforms,\n• digitalization projects,\n• traceability systems,\n• eLMIS projects,\n• pharmaceutical strategies,\n• capacity building plans,\n• institutional evaluations,\n• and projects funded by technical and financial partners."
        },
        {
          category: "digital",
          q: "14. Can SaniNova support international organizations?",
          a: "Yes.\n\nThe firm can intervene as a:\n• consultant,\n• technical partner,\n• implementing agency,\n• technical assistance provider,\n• training organization,\n• or health systems transformation expert."
        },
        {
          category: "academy",
          q: "15. Why invest in capacity building?",
          a: "Capacity building enables:\n• improving institutional performance,\n• reducing operational errors,\n• increasing efficiency,\n• strengthening governance,\n• and preparing institutions for international standards.\n\nHigh-performing institutions continuously invest in their teams' skills."
        },
        {
          category: "services",
          q: "16. Why are SaniNova's services positioned as high-end?",
          a: "SaniNova's services are based on high strategic and technical added value.\n\nThey mobilize:\n• specialized experts,\n• international expertise,\n• advanced methodologies,\n• personalized support,\n• specialized technical tools,\n• and strong operational involvement.\n\nSaniNova does not just sell a service. The firm brings:\n• results,\n• transformation,\n• performance,\n• and long-term strategic value."
        },
        {
          category: "academy",
          q: "17. Can training programs be customized?",
          a: "Yes.\n\nSaniNova develops customized programs based on:\n• the client's needs,\n• the participants' technical level,\n• institutional priorities,\n• strategic objectives,\n• and the country's regulatory context."
        },
        {
          category: "academy",
          q: "18. Can training programs be organized online?",
          a: "Yes.\n\nSaniNova offers:\n• in-person training,\n• hybrid training,\n• and fully online training.\n\nVirtual programs are designed to offer high interactivity and a high-quality learning experience."
        },
        {
          category: "services",
          q: "19. What are the concrete benefits for an institution?",
          a: "Institutions supported by SaniNova benefit from:\n• improved performance,\n• strengthened technical capacities,\n• better governance,\n• improved data visibility,\n• optimized processes,\n• reduced operational risks,\n• and enhanced availability of health products."
        },
        {
          category: "general",
          q: "20. What differentiates SaniNova from other consulting firms?",
          a: "SaniNova stands out due to:\n• its specialized expertise in health systems,\n• its understanding of local realities,\n• its strategic and operational approach,\n• its mastery of regulatory challenges,\n• its digital expertise,\n• its network of experts,\n• and its capacity to support major reforms.\n\nThe firm prioritizes practical, realistic, and sustainable solutions."
        },
        {
          category: "general",
          q: "21. Are SaniNova's services intended solely for the public sector?",
          a: "No.\n\nSaniNova also supports:\n• private organizations,\n• clinics,\n• pharmaceutical industries,\n• pharmacies,\n• NGOs,\n• consulting firms,\n• and companies operating in the healthcare sector."
        },
        {
          category: "digital",
          q: "22. Why invest now in modernizing health systems?",
          a: "Health systems are evolving rapidly.\n\nInstitutions today must:\n• strengthen their capacities,\n• improve their data,\n• modernize their tools,\n• digitalize their processes,\n• strengthen compliance,\n• and improve performance.\n\nOrganizations that anticipate these transformations gain a major strategic advantage."
        },
        {
          category: "services",
          q: "23. How does a consulting mission with SaniNova proceed?",
          a: "A mission generally follows several stages:\n1. Needs analysis\n2. Technical and institutional diagnosis\n3. Development of recommendations\n4. Implementation of solutions\n5. Technical support\n6. Monitoring and evaluation\n\nOur approach is collaborative and strongly results-oriented."
        },
        {
          category: "services",
          q: "24. Does SaniNova offer support after training and missions?",
          a: "Yes.\n\nThe firm prioritizes long-term support.\n\nClients and participants benefit from:\n• technical follow-up,\n• access to experts,\n• updates,\n• resources sharing,\n• strategic advice,\n• and a professional network."
        },
        {
          category: "services",
          q: "25. Why do institutions need external technical assistance?",
          a: "Complex projects often require:\n• specialized expertise,\n• advanced methodologies,\n• comparative experiences,\n• a strategic vision,\n• and additional technical resources.\n\nTechnical assistance accelerates results and reduces risks."
        },
        {
          category: "general",
          q: "26. How to contact SaniNova?",
          a: "Prospects can contact SaniNova via:\n• email: saninovagc@gmail.com\n• telephone: +2290161015495\n• LinkedIn: SaniNova Global Consulting\n• website: www.saninovagc.com\n• or directly at professional events.\n\nAll requests are handled in a professional and confidential manner."
        },
        {
          category: "academy",
          q: "27. How to register for a training?",
          a: "Registration is done directly online via our platform. Choose your training, fill out the registration form, and proceed with payment to guarantee your spot."
        },
        {
          category: "academy",
          q: "28. What payment methods are accepted?",
          a: "We accept payments via Mobile Money, Bank Cards (Visa, Mastercard), PayPal, and bank transfers through our secure gateways."
        },
        {
          category: "academy",
          q: "29. What is the cancellation and refund policy?",
          a: "Any cancellation made more than 15 days before the start of the training gives rise to a full refund. Between 15 and 7 days, 50% is refunded. No refund is possible less than 7 days, but a transfer to a future session may be considered."
        }
      ]
    },
  },
};
