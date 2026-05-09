"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { AlertCircle, HelpCircle, CheckCircle } from "lucide-react";

export const ExpertisesDetails: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("governance");

  const detailedData = {
    governance: {
      title: t.expertises.list.governance.title,
      problem: "Fragmentations réglementaires, manque de coordination intersectorielle, et planification stratégique déconnectée des réalités de terrain.",
      solution: "Élaboration de schémas directeurs nationaux, audits d'efficience institutionnelle, et appui à la rédaction de lois cadres sur la santé publique.",
      result: "Des ministères de la Santé agiles, un pilotage stratégique basé sur la donnée, et une meilleure allocation des ressources publiques."
    },
    pharma: {
      title: t.expertises.list.pharma.title,
      problem: "Prolifération de faux médicaments, lenteur des procédures d'homologation, et laboratoires d'assurance qualité sous-équipés.",
      solution: "Digitalisation des processus d'autorisation de mise sur le marché (AMM), formation des inspecteurs, et mise en place de systèmes de pharmacovigilance connectés.",
      result: "Sécurisation totale du marché du médicament, accréditation internationale des autorités de régulation, et réduction des délais d'homologation."
    },
    supplyChain: {
      title: t.expertises.list.supplyChain.title,
      problem: "Ruptures de stocks fréquentes de vaccins et intrants essentiels, pertes de produits par péremption, et logistique du dernier kilomètre inefficace.",
      solution: "Déploiement de plateformes logistiques prédictives basées sur l'IA, capteurs IoT connectés pour sécuriser la chaîne du froid, et optimisation des circuits de transport régionaux.",
      result: "Zéro rupture de stock sur les produits critiques, réduction des coûts logistiques globaux de 25% et transparence totale des flux d'approvisionnement."
    },
    digital: {
      title: t.expertises.list.digital.title,
      problem: "Dossiers médicaux papier éparpillés, manque d'interopérabilité des systèmes existants, et déserts médicaux privant les populations de spécialistes.",
      solution: "Conception de dossiers patients informatisés uniques et sécurisés, intégration de la télémédecine par satellite pour le diagnostic à distance, et formations au DHIS2.",
      result: "Une prise en charge médicale instantanée et sécurisée, réduction des transferts coûteûx grâce à la télé-expertise, et centralisation fiable des statistiques sanitaires nationales."
    },
    quality: {
      title: t.expertises.list.quality.title,
      problem: "Infections nosocomiales, non-respect des protocoles cliniques de base, et insatisfaction croissante des patients face aux prestations.",
      solution: "Création de référentiels d'accréditation hospitalière adaptés au contexte, audits de sécurité des soins, et mise en œuvre de programmes d'amélioration continue.",
      result: "Réduction drastique des complications évitables, réhabilitation de la confiance des citoyens envers leurs structures sanitaires publiques."
    },
    financing: {
      title: t.expertises.list.financing.title,
      problem: "Dépenses de santé catastrophiques poussant les ménages vers la pauvreté, et sous-financement chronique des soins de santé primaires.",
      solution: "Modélisation financière de régimes de couverture maladie universelle (CMU), structuration de financements innovants (taxes affectées), et gestion axée sur les résultats (FBR).",
      result: "Protection financière des familles vulnérables, viabilité économique des structures hospitalières, et efficience accrue des dépenses publiques de santé."
    },
    hr: {
      title: t.expertises.list.hr.title,
      problem: "Pénurie critique de professionnels formés, mauvaise répartition géographique (concentration urbaine) et fuite des cerveaux médicaux.",
      solution: "Ingénierie de programmes de formation professionnelle continue à distance (e-learning), révision des grilles indiciaires basées sur le mérite, et modélisations prévisionnelles RH.",
      result: "Disponibilité accrue de personnel qualifié en milieu rural, fidélisation durable des talents médicaux locaux, et harmonisation des compétences sanitaires nationales."
    },
    security: {
      title: t.expertises.list.security.title,
      problem: "Détection tardive des épidémies infectieuses, et manque de plans d'urgence sanitaire intégrés et testés à l'échelle du territoire.",
      solution: "Mise en place de réseaux de surveillance épidémiologique communautaire en temps réel par SMS/Web, plans de préparation aux pandémies (One Health), et exercices de simulation.",
      result: "Temps de réaction réduit de moitié face aux alertes sanitaires, confinement rapide des foyers infectieux, et minimisation des impacts socio-économiques des crises."
    },
    evaluation: {
      title: t.expertises.list.evaluation.title,
      problem: "Programmes de santé publique majeurs financés sans indicateurs d'impact réels, et manque de recul indépendant sur l'efficacité des réformes.",
      solution: "Audits d'impact externes basés sur des méthodes mixtes (quantitatives et qualitatives), création de dashboards analytiques en temps réel pour bailleurs et ministères.",
      result: "Redevabilité totale envers les partenaires techniques et financiers, réorientation agile des stratégies sanitaires en cours, et démonstration claire du retour sur investissement social."
    }
  };

  const currentDetails = detailedData[activeTab as keyof typeof detailedData];

  return (
    <section id="expertises" className="py-24 bg-white border-t border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
            {t.expertises.tag}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {t.expertises.title}
          </h2>
          <p className="font-inter text-lg text-dark/70">
            {t.expertises.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Tabs Navigation Menu */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col space-x-3 lg:space-x-0 space-y-0 lg:space-y-2 lg:max-h-[500px] overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto pr-0 lg:pr-2 pb-4 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {Object.keys(detailedData).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`shrink-0 whitespace-nowrap lg:whitespace-normal px-5 py-4 rounded-2xl text-sm font-bold font-poppins text-left transition-all duration-200 ${
                  activeTab === tabKey
                    ? "bg-primary text-white shadow-md"
                    : "bg-light text-dark/70 hover:bg-light/80 hover:text-primary"
                }`}
              >
                {detailedData[tabKey as keyof typeof detailedData].title}
              </button>
            ))}
          </div>

          {/* Right Side: Tab Details Sheet */}
          <div className="lg:col-span-8 bg-light/50 p-8 sm:p-10 rounded-3xl border border-dark/5 shadow-sm space-y-8 min-h-[420px] flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-montserrat text-2xl font-extrabold text-primary border-b border-light pb-4">
                {currentDetails.title}
              </h3>

              {/* Problem */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-xl shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-poppins text-lg font-bold text-primary">Problématiques Identifiées</h4>
                  <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed">{currentDetails.problem}</p>
                </div>
              </div>

              {/* Solution */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-poppins text-lg font-bold text-primary">Notre Accompagnement Stratégique</h4>
                  <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed">{currentDetails.solution}</p>
                </div>
              </div>

              {/* Result */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 text-accent rounded-xl shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-poppins text-lg font-bold text-primary">Résultats Attendus & Impacts</h4>
                  <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed">{currentDetails.result}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-light mt-6 text-right">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white font-poppins font-semibold px-6 py-3 rounded-full text-xs shadow-md transition-all duration-300"
              >
                <span>Planifier une consultation sur ce volet</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertisesDetails;
