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
      cta: "Demander une consultation",
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
            title: "Excellence",
            desc: "Nous visons les standards de qualité internationaux les plus élevés dans chacune de nos livraisons de conseil stratégique.",
          },
          {
            title: "Intégrité",
            desc: "Nous agissons avec transparence, éthique professionnelle absolue et respect scrupuleux des engagements nationaux.",
          },
          {
            title: "Innovation",
            desc: "Nous croyons au potentiel de la santé digitale et de la data pour sauter les étapes du développement sanitaire classique.",
          },
          {
            title: "Impact",
            desc: "Nous mesurability-first : notre valeur ajoutée s'évalue uniquement par l'amélioration concrète des indicateurs de santé.",
          },
          {
            title: "Collaboration",
            desc: "Nous ne parachutons pas de solutions toutes faites ; nous co-concevons chaque projet avec les acteurs de terrain.",
          },
        ],
      },
      leadership: {
        title: "Notre Comité de Direction",
        desc: "Des leaders d'opinion chevronnés alliant expérience dans la haute fonction publique, cabinets internationaux et recherche médicale.",
        members: [
          {
            name: "Dr. Amadou DIALLO",
            role: "Directeur Général Associé",
            desc: "Ancien conseiller ministériel en santé publique, 15 ans d'expérience dans la transformation des politiques sanitaires africaines.",
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
      name: "Dr. Hope AKOHOUVI AMOU",
      role: "Directeur Général – Expert en systèmes de santé",
      description1: "Dr. Hope AKOHOUVI AMOU dirige SaniNova avec une vision ambitieuse de transformation durable des systèmes de santé en Afrique. À travers une approche combinant gouvernance, innovation, digitalisation et excellence opérationnelle, il accompagne les institutions publiques, les partenaires techniques et les acteurs du secteur santé dans la conception et la mise en œuvre de réformes à fort impact.",
      description2: "Son expertise couvre notamment la gouvernance sanitaire, la régulation pharmaceutique, la chaîne d'approvisionnement, la santé digitale, le financement de la santé, la qualité des soins, la sécurité sanitaire et le renforcement des capacités institutionnelles.",
      description3: "À la tête de SaniNova, il porte une vision stratégique orientée vers des systèmes de santé plus performants, plus résilients, plus équitables et pleinement adaptés aux défis contemporains.",
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
          desc: "Conception de modules de formation de pointe en management hospitalier, leadership en santé publique, logistique médicale et régulation pharmaceutique pour cadres supérieurs et équipes de terrain.",
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
      cta: "Request Consultation",
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
            title: "Excellence",
            desc: "We target the highest international quality standards in every strategic consulting engagement we deliver.",
          },
          {
            title: "Integrity",
            desc: "We act with complete transparency, absolute professional ethics, and scrupulous respect for national commitments.",
          },
          {
            title: "Innovation",
            desc: "We believe in the power of digital health and data to leapfrog traditional sanitary development barriers.",
          },
          {
            title: "Impact",
            desc: "We are impact-first: our added value is only measured by the concrete improvement of health indicators on the ground.",
          },
          {
            title: "Collaboration",
            desc: "We do not deploy pre-packaged answers; we co-design every project alongside field actors.",
          },
        ],
      },
      leadership: {
        title: "Our Leadership Team",
        desc: "Seasoned thought-leaders combining high public service experience, international consulting background, and medical research.",
        members: [
          {
            name: "Dr. Amadou DIALLO",
            role: "Managing Partner",
            desc: "Former healthcare policy ministerial advisor, 15 years of experience in transforming African sanitary policies.",
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
      name: "Dr. Hope AKOHOUVI AMOU",
      role: "Managing Director – Health Systems Expert",
      description1: "Dr. Hope AKOHOUVI AMOU leads SaniNova with an ambitious vision for the sustainable transformation of health systems in Africa. Through an approach combining governance, innovation, digitalization, and operational excellence, he supports public institutions, technical partners, and healthcare stakeholders in designing and implementing high-impact reforms.",
      description2: "His expertise covers health governance, pharmaceutical regulation, supply chain management, digital health, health financing, quality of care, health security, and institutional capacity building.",
      description3: "At the helm of SaniNova, he drives a strategic vision aimed at building healthcare systems that are higher performing, more resilient, more equitable, and fully adapted to contemporary challenges.",
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
          desc: "Design of specialized training modules in hospital management, public health leadership, medical logistics, and pharmaceutical regulation for senior managers and field teams.",
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
