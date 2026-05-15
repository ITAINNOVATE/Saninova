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
        trainings: "Formations",
        announcements: "Annonces",
        events: "Événements",
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
          title: "Études & évaluations",
          desc: "Évaluations externes de mi-parcours ou finales de programmes financés par les bailleurs internationaux, audits d'infrastructures de soins, enquêtes d'envergure nationale et modélisation de tendances de santé publique.",
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
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      expertises: "Expertise",
      services: "Services",
      publications: "Publications",
      contact: "Contact",
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
        trainings: "Trainings",
        announcements: "Announcements",
        events: "Events",
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
          title: "Studies & Evaluations",
          desc: "External mid-term or final evaluations of donor-funded health programs, healthcare infrastructure audits, nationwide surveys, and public health trend modeling.",
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
  },
};
