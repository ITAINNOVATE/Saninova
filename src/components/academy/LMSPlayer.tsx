"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, BookOpen, CheckCircle, Circle, ArrowLeft, ArrowRight, 
  Download, FileText, Video, ExternalLink, HelpCircle, Award, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuizModule from "./QuizModule";
import { staticModules, slugify } from "../../lib/academyHelpers";

const renderMarkdownText = (text: string, lightText: boolean = false) => {
  if (!text || typeof text !== 'string') return text;
  
  // Auto-bold specific formula lines
  const formulaKeywords = [
    'Point de commande', 'Stock', 'SS', 'CMM', 'QàC', 'Taux', 'Déficit', 
    'Durée', 'Écart', 'Montant', 'Délai', 'Consommation', 'Quantité', 'Formule',
    'Z ', 'σ ', 'DL ', 'Total ', 'Couverture '
  ];
  
  const trimmedText = text.trim();
  const isEquationLine = trimmedText.includes('=') && formulaKeywords.some(kw => trimmedText.startsWith(kw));

  if (isEquationLine) {
    return <strong style={{ color: lightText ? '#ffffff' : '#0F1D33', fontWeight: 800 }}>{text}</strong>;
  }

  if (!text.includes('**')) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ color: lightText ? '#ffffff' : '#0F1D33', fontWeight: 800 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

interface Chapter {
  id: string;
  title: string;
  type: "video" | "text" | "slides";
  duration: string;
  content: string;
  videoUrl?: string;
  resources?: { name: string; type: string; size: string }[];
}

interface Module {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface LMSPlayerProps {
  courseTitle: string;
  courseSlug: string;
  onBackToPortal: () => void;
  onCourseCompleted: () => void;
}

import { gestionApprovisionnementsCourse } from "../../data/courses/gestionApprovisionnements";
import { quantificationBesoinsCourse } from "../../data/courses/quantificationBesoins";
import { gestionOfficineCourse } from "../../data/courses/gestionOfficine";

const mockCoursesSyllabus: Record<string, Module[]> = {
  "gestion-des-approvisionnements-et-des-stocks": gestionApprovisionnementsCourse,
  "gestion-des-stocks-et-approvisionnements": gestionApprovisionnementsCourse,
  "gestion-d-une-officine-moderne": gestionOfficineCourse,
  "quantification-et-previsions": quantificationBesoinsCourse,
  "quantification-des-besoins-en-produits-de-sante": quantificationBesoinsCourse,
  "gouvernance-sanitaire-afrique": [
    {
      id: "gov-m1",
      title: "Module 1 : Cadres Réglementaires et RSI",
      chapters: [
        {
          id: "gov-c1",
          title: "Introduction à la gouvernance de la santé publique en Afrique",
          type: "video",
          duration: "12 min",
          content: `### Introduction à la Gouvernance en Santé Publique en Afrique

La gouvernance des systèmes de santé en Afrique fait face à des défis complexes mais offre des opportunités d'innovation sans précédent. Ce chapitre aborde les fondations d'un système de santé solide, équitable et performant.

#### Objectifs du chapitre :
1. Comprendre l'architecture de la gouvernance sanitaire africaine.
2. Analyser les facteurs bloquants de la décentralisation des soins.
3. Intégrer les concepts d'équité et de responsabilité sociale dans les politiques publiques de santé.

> "Il ne peut y avoir de développement économique durable sans un système de santé résilient et bien gouverné."`,
          resources: [
            { name: "Guide de Gouvernance Sanitaire OMS 2026.pdf", type: "PDF", size: "2.4 MB" },
            { name: "Fiche d'auto-évaluation ministérielle.docx", type: "DOCX", size: "1.1 MB" }
          ]
        },
        {
          id: "gov-c2",
          title: "Le Règlement Sanitaire International (RSI 2005)",
          type: "text",
          duration: "15 min",
          content: `### Le Règlement Sanitaire International (RSI 2005)

Le Règlement Sanitaire International (2005) est un instrument juridique international qui a force obligatoire dans 196 pays, dont tous les États Membres de l'OMS.

#### Pourquoi le RSI est-il crucial ?
- **Sécurité globale** : Il vise à prévenir la propagation internationale des maladies, à s'en protéger, à la contrôler et à y apporter une réponse de santé publique proportionnée.
- **Limitation des entraves** : Le RSI s'efforce de minimiser les perturbations inutiles pour le trafic international et le commerce.
- **Capacités nationales requises** : Chaque État partie doit développer et maintenir des capacités nationales de base en matière de surveillance, de notification, de vérification et de riposte.

#### Rôle clé de l'OMS et des Centres Nationaux de Liaison (CNL)
Les CNL doivent être joignables 24h/24 et 7j/7 pour notifier en temps réel tout événement de santé publique d'importance internationale.`,
          resources: [
            { name: "Texte Officiel du RSI 2005.pdf", type: "PDF", size: "4.8 MB" }
          ]
        }
      ]
    },
    {
      id: "gov-m2",
      title: "Module 2 : Leadership et Gestion du Changement",
      chapters: [
        {
          id: "gov-c3",
          title: "Styles de leadership transformationnel en santé",
          type: "video",
          duration: "18 min",
          content: `### Styles de Leadership Transformationnel en Santé

Pour réformer les systèmes sanitaires, les managers doivent passer d'un leadership administratif traditionnel à un leadership transformationnel capable d'inspirer les équipes multidisciplinaires.

#### Les 4 dimensions du leadership transformationnel :
1. **Influence idéalisée (Charisme)** : Être un modèle de rigueur éthique et de compétence.
2. **Motivation inspirante** : Formuler une vision claire et captivante de l'avenir de la clinique ou du ministère.
3. **Stimulation intellectuelle** : Encourager l'innovation et la remise en question constructive des anciennes méthodes.
4. **Considération individualisée** : Soutenir la montée en compétences et écouter chaque membre de l'équipe logistique ou soignante.`,
          resources: [
            { name: "Modèle de Leadership Clinique.pdf", type: "PDF", size: "1.8 MB" }
          ]
        }
      ]
    }
  ],
  "sante-digitale-interoperabilite": [
    {
      id: "dig-m1",
      title: "Module 1 : Fondements et Interopérabilité",
      chapters: [
        {
          id: "dig-c1",
          title: "Introduction aux architectures de santé numérique",
          type: "video",
          duration: "14 min",
          content: `### Architecture de la Santé Numérique

L'implémentation de la santé digitale en Afrique requiert une architecture technique claire pour éviter la création de silos d'informations déconnectés les uns des autres.

#### Composants de base :
- **Dossier Patient Unique** : Unification des registres locaux d'identité.
- **Annuaire des Professionnels** : Registre national des médecins certifiés.
- **Répertoire des Établissements (Facility Registry)** : Cartographie géo-référencée des FOSA (Formations Sanitaires).`,
          resources: [
            { name: "Cadre National d'Interopérabilité Numérique.pdf", type: "PDF", size: "3.1 MB" }
          ]
        },
        {
          id: "dig-c2",
          title: "Standards HL7 FHIR et interopérabilité sémantique",
          type: "text",
          duration: "20 min",
          content: `### Standard HL7 FHIR (Fast Healthcare Interoperability Resources)

FHIR est la norme internationale incontournable pour l'échange de données de santé au format JSON ou XML via des API RESTful.

#### Avantages majeurs de FHIR :
- **Orienté Ressources** : Représente les concepts cliniques (Patient, Diagnostic, Médicament) de manière granulaire et réutilisable.
- **Simplicité d'intégration** : Utilise les technologies web standards (GET, POST, JSON) maîtrisées par tous les développeurs informatiques.
- **Adaptation Mobile** : Permet de concevoir facilement des applications de m-santé pour les agents communautaires en milieu rural.

\`\`\`json
{
  "resourceType": "Patient",
  "id": "pat-001",
  "active": true,
  "name": [{
    "family": "Dupont",
    "given": ["Jean"]
  }],
  "gender": "male",
  "birthDate": "1988-05-12"
}
\`\`\`
*Exemple de ressource Patient au standard HL7 FHIR.*`,
          resources: [
            { name: "Aide-mémoire FHIR pour développeurs.pdf", type: "PDF", size: "1.2 MB" },
            { name: "Schema_FHIR_Patient.json", type: "JSON", size: "45 KB" }
          ]
        }
      ]
    }
  ],
  "logistique-medicale-dernier-kilometre": [
    {
      id: "log-m1",
      title: "Module 1 : Optimisation des Stocks et Chaîne du Froid",
      chapters: [
        {
          id: "log-c1",
          title: "Calcul de la Consommation Moyenne Mensuelle (CMM) et FEFO",
          type: "video",
          duration: "15 min",
          content: `### Gestion Intelligente des Approvisionnements

La logistique médicale ne s'improvise pas. Elle nécessite des méthodes quantitatives précises pour éviter les ruptures catastrophiques ou les surstockages coûteux de vaccins et d'antirétroviraux.

#### Calcul de la CMM (Consommation Moyenne Mensuelle) :
La formule standard prend en compte la consommation historique ajustée des jours de rupture :
CMM = Consommation Totale / (Nombre de mois - Mois de rupture)

#### Application de la règle FEFO (First Expired, First Out) :
- Toujours ranger les lots périmant en premier devant les étagères.
- Mettre en place un système de codes couleurs pour repérer visuellement les lots à péremption critique (< 3 mois).`,
          resources: [
            { name: "Calculateur CMM & Min-Max automatique.xlsx", type: "EXCEL", size: "850 KB" },
            { name: "Procédure opérationnelle FEFO SaniNova.pdf", type: "PDF", size: "1.4 MB" }
          ]
        },
        {
          id: "log-c2",
          title: "Bonnes Pratiques de Distribution et d'Entreposage (BPD/BPE)",
          type: "text",
          duration: "12 min",
          content: `### Bonnes Pratiques d'Entreposage (BPE) de l'OMS

L'entreposage des produits de santé doit strictement respecter les directives de l'Organisation Mondiale de la Santé pour garantir la stabilité et la pureté thérapeutique des principes actifs.

#### Points critiques d'audit d'un entrepôt :
1. **Contrôle climatique** : Enregistreurs automatiques de température et d'humidité calibrés.
2. **Gestion de l'espace** : Adressage précis et séparation stricte des produits de quarantaine, des retours et des rebuts.
3. **Mesures d'hygiène** : Plan de lutte contre les nuisibles et entretien quotidien.
4. **Sécurité et accès** : Contrôle strict des entrées et sorties pour prévenir les vols et l'introduction de médicaments contrefaits.`,
          resources: [
            { name: "Checklist audit BPD/BPE OMS 2026.docx", type: "DOCX", size: "1.9 MB" }
          ]
        }
      ]
    }
  ]
};

const getDynamicSyllabus = (modSlug: string): Module[] => {
  const match = staticModules.find(m => m.slug === modSlug);
  if (!match) return [];

  return match.program.map((subMod: any, subIdx: number) => {
    const lessonNames = subMod.details.split(",").map((s: string) => s.trim()).filter((s: string) => s.length > 0).slice(0, 4);
    const chapters: Chapter[] = lessonNames.map((lessonName: string, lessonIdx: number) => {
      const lessonId = `dynamic-c-${subIdx}-${lessonIdx}`;
      const types: ("video" | "text" | "slides")[] = ["video", "text", "slides"];
      const type = types[lessonIdx % 3];
      
      const content = `### ${lessonName}
      
Bienvenue dans ce cours interactif SaniNova sur la thématique : **${lessonName}**. Ce cours fait partie du programme officiel **${match.title}**, intégré au cursus d'excellence de la certification **${match.parentCertification}**.

---

#### 🎯 Objectifs pédagogiques de cette leçon :
1. Assimiler les concepts fondamentaux de : *${lessonName}*.
2. Comprendre les implications pratiques sur le système de santé.
3. Maîtriser les outils et méthodologies recommandés pour une mise en œuvre efficace.
4. Être capable d'identifier et de résoudre les goulots d'étranglement opérationnels.

---

#### 📖 Synthèse du cours & Concepts Clés :

##### 1. Fondations Théoriques
Chaque professionnel de santé doit comprendre que la performance globale de la chaîne d'approvisionnement ou du système digital dépend de la rigueur appliquée à ce niveau. La théorie nous enseigne que la standardisation des processus est le premier vecteur de la qualité.

##### 2. Méthodologie et Application Pratique
Pour implémenter efficacement ces notions sur le terrain :
- **Analyse de situation** : cartographier les forces, faiblesses, opportunités et menaces (SWOT).
- **Planification stratégique** : définir des indicateurs clés de performance (KPI) mesurables et réalistes.
- **Exécution et contrôle** : instaurer des revues périodiques pour valider l'alignement avec les bonnes pratiques internationales.

##### 3. Recommandations de SaniNova Academy
> "L'excellence ne réside pas dans la complexité des outils, mais dans la constance et la rigueur de leur application quotidienne."
Nous vous recommandons de concevoir des aides-mémoires simples (SOP) pour vos équipes opérationnelles afin de pérenniser les acquis de cette formation.

---

#### 🛠️ Exercice pratique & Réflexion :
*Prenez 5 minutes pour réfléchir à la façon dont vous pouvez transposer les notions étudiées aujourd'hui au sein de votre établissement ou de votre département de santé.*
`;

      const resources = [
        { name: `Guide_Pratique_${slugify(lessonName)}.pdf`, type: "PDF", size: "2.8 MB" },
        { name: "Fiche_de_Synthese_SaniNova.docx", type: "DOCX", size: "1.2 MB" }
      ];

      return {
        id: lessonId,
        title: lessonName,
        type: type,
        duration: "10-15 min",
        content: content,
        videoUrl: type === "video" ? "https://www.w3schools.com/html/mov_bbb.mp4" : undefined,
        resources: resources
      };
    });

    return {
      id: `dynamic-m-${subIdx}`,
      title: `${subMod.day} : ${subMod.title}`,
      chapters: chapters
    };
  });
};

export default function LMSPlayer({ courseTitle, courseSlug, onBackToPortal, onCourseCompleted }: LMSPlayerProps) {
  const [syllabus, setSyllabus] = useState<Module[]>([]);
  const [activeChapterId, setActiveChapterId] = useState("");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [visibleChaptersLimit, setVisibleChaptersLimit] = useState(4);

  // Load syllabus based on slug
  // Priority: mockCoursesSyllabus (real PPTX content) > getDynamicSyllabus (generic)
  useEffect(() => {
    let modules: Module[] = [];

    // 1. Check mockCoursesSyllabus first — it contains real course content from uploaded documents
    if (mockCoursesSyllabus[courseSlug]) {
      modules = mockCoursesSyllabus[courseSlug];
    } else {
      // 2. Try to find a key match by partial slug
      const matchedKey = Object.keys(mockCoursesSyllabus).find(k => courseSlug.includes(k) || k.includes(courseSlug));
      if (matchedKey) {
        modules = mockCoursesSyllabus[matchedKey];
      } else {
        // 3. Fall back to dynamic syllabus (generic content from certificationsData)
        const dynamicSyllabus = getDynamicSyllabus(courseSlug);
        if (dynamicSyllabus.length > 0) {
          modules = dynamicSyllabus;
        } else {
          // 4. Last resort: use a default mock
          let key = "gouvernance-sanitaire-afrique";
          if (courseSlug.includes("supply") || courseSlug.includes("logistique")) key = "logistique-medicale-dernier-kilometre";
          else if (courseSlug.includes("digital") || courseSlug.includes("interoperabilite")) key = "sante-digitale-interoperabilite";
          modules = mockCoursesSyllabus[key] || mockCoursesSyllabus["gouvernance-sanitaire-afrique"];
        }
      }
    }

    setSyllabus(modules);

    if (modules.length > 0) {
      setExpandedModule(modules[0].id);
      if (modules[0].chapters.length > 0) {
        setActiveChapterId(modules[0].chapters[0].id);
      }
    }

    // Load progress from LocalStorage
    const saved = localStorage.getItem(`progress_${courseSlug}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const parsedCompleted = parsed.completed || {};
        setCompletedChapters(parsedCompleted);
        setQuizPassed(parsed.quizPassed || false);

        // Recalculate percent based on valid chapters to clean up old data
        const allCurrentChapters = modules.flatMap(m => m.chapters);
        const validCompletedCount = allCurrentChapters.filter(c => parsedCompleted[c.id]).length;
        const newPercent = allCurrentChapters.length > 0 ? Math.min(100, Math.round((validCompletedCount / allCurrentChapters.length) * 100)) : 0;
        
        localStorage.setItem(`progress_${courseSlug}`, JSON.stringify({
          ...parsed,
          percent: newPercent
        }));
      } catch (e) {
        console.error(e);
      }
    }
  }, [courseSlug]);

  // Helper selectors
  const allChapters = syllabus.flatMap(m => m.chapters);
  const totalChaptersCount = allChapters.length;
  const currentChapter = allChapters.find(c => c.id === activeChapterId);
  const currentChapterIndex = allChapters.findIndex(c => c.id === activeChapterId);

  const saveProgress = (newCompleted: Record<string, boolean>, qPassed = quizPassed) => {
    setCompletedChapters(newCompleted);
    setQuizPassed(qPassed);

    const validCompletedCount = allChapters.filter(c => newCompleted[c.id]).length;
    const percent = totalChaptersCount > 0 ? Math.min(100, Math.round((validCompletedCount / totalChaptersCount) * 100)) : 0;

    localStorage.setItem(`progress_${courseSlug}`, JSON.stringify({
      completed: newCompleted,
      quizPassed: qPassed,
      percent: percent
    }));
  };

  const toggleChapterCompleted = (chapterId: string) => {
    const newCompleted = {
      ...completedChapters,
      [chapterId]: !completedChapters[chapterId]
    };
    saveProgress(newCompleted);
  };

  const handleNext = () => {
    // Automatically check current as completed
    if (currentChapter) {
      const newCompleted = {
        ...completedChapters,
        [currentChapter.id]: true
      };
      saveProgress(newCompleted);
    }

    if (currentChapterIndex < totalChaptersCount - 1) {
      setActiveChapterId(allChapters[currentChapterIndex + 1].id);
    } else {
      // Reached end of chapters, launch quiz
      setShowQuiz(true);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setActiveChapterId(allChapters[currentChapterIndex - 1].id);
    }
  };

  const handleQuizSuccess = () => {
    setQuizPassed(true);
    // Mark all chapters as completed if they aren't
    const allComp: Record<string, boolean> = {};
    allChapters.forEach(c => { allComp[c.id] = true; });
    saveProgress(allComp, true);
    
    // Trigger parent callback
    onCourseCompleted();
  };

  const completedCount = allChapters.filter(c => completedChapters[c.id]).length;
  const progressPercent = totalChaptersCount > 0 ? Math.min(100, Math.round((completedCount / totalChaptersCount) * 100)) : 0;

  if (syllabus.length === 0 || !currentChapter) {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-white">
        <p className="animate-pulse font-bold text-lg">Initialisation de la leçon...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 min-h-screen">
      {/* Return button */}
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={onBackToPortal}
          className="inline-flex items-center gap-2 text-white/70 hover:text-orange font-bold text-xs uppercase tracking-widest transition-all bg-white/10 border border-white/15 px-5 py-3 rounded-full hover:bg-white/20 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Quitter le cours
        </button>

        <div className="hidden sm:flex items-center gap-4 bg-white/10 px-6 py-2.5 rounded-full border border-white/15">
          <div className="text-right">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Progression</span>
            <span className="text-xs font-black text-white">{completedCount} / {totalChaptersCount} Chapitres</span>
          </div>
          <div className="w-24 bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-orange h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Course Index Sidebar */}
        <div className="lg:col-span-1 rounded-[28px] p-6 h-fit shadow-md border border-slate-200" style={{ backgroundColor: '#ffffff' }}>
          <h4 className="font-montserrat font-black text-base uppercase tracking-wider mb-6 pb-4 border-b border-slate-200" style={{ color: '#0F1D33' }}>
            Syllabus
          </h4>

          <div className="space-y-6">
            {syllabus.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <button 
                  onClick={() => {
                    setExpandedModule(expandedModule === mod.id ? null : mod.id);
                    setVisibleChaptersLimit(4);
                  }}
                  className="w-full text-left flex items-center justify-between group cursor-pointer"
                >
                  <h5 className="text-[11px] font-extrabold text-orange uppercase tracking-wider line-clamp-2 leading-relaxed flex-1 pr-2">
                    {mod.title}
                  </h5>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${expandedModule === mod.id ? 'border-orange bg-orange/10 text-orange' : 'border-slate-200 text-slate-400 group-hover:border-orange/50 group-hover:text-orange'}`}>
                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedModule === mod.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedModule === mod.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 pl-1.5 border-l border-slate-200 ml-1 mt-3">
                        {mod.chapters.slice(0, visibleChaptersLimit).map((chap) => {
                          const isActive = chap.id === activeChapterId && !showQuiz;
                          const isCompleted = !!completedChapters[chap.id];

                          return (
                            <button
                              key={chap.id}
                              onClick={() => {
                                setActiveChapterId(chap.id);
                                setShowQuiz(false);
                              }}
                              className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                                isActive 
                                  ? "bg-orange text-white font-bold shadow-md shadow-orange/20" 
                                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                              }`}
                            >
                              <div className="shrink-0 mt-0.5">
                                {isCompleted ? (
                                  <CheckCircle className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-500"}`} />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-slate-300" />
                                )}
                              </div>
                              <span className="leading-snug line-clamp-2">{chap.title}</span>
                            </button>
                          );
                        })}
                        
                        {mod.chapters.length > visibleChaptersLimit && (
                          <button
                            onClick={() => setVisibleChaptersLimit(prev => prev + 4)}
                            className="w-full text-center py-2.5 mt-2 text-[10px] font-bold text-slate-400 hover:text-orange uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-t border-slate-100/50 hover:bg-slate-50 rounded-b-xl"
                          >
                            Voir la suite ({mod.chapters.length - visibleChaptersLimit}) <ArrowRight className="w-3 h-3 rotate-90" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Final Quiz Navigation Tab */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={(e) => {
                  const isCompleted = Object.keys(completedChapters).length >= syllabus.reduce((acc: number, mod: any) => acc + mod.chapters.length, 0);
                  if (!isCompleted) {
                    alert("Vous devez terminer tous les chapitres du cours avant de pouvoir passer l'évaluation finale.");
                    e.preventDefault();
                    return;
                  }
                  window.location.href = `/academy/portal/evaluation/${courseSlug}`;
                }}
                className={`w-full py-4 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer border ${
                  quizPassed 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-orange"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 shrink-0" /> ÉVALUATION FINALE
                </span>
                {quizPassed && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 print:text-emerald-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Course Lesson / Quiz Main Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {showQuiz ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <QuizModule 
                  courseTitle={courseTitle}
                  courseSlug={courseSlug}
                  onQuizPassed={handleQuizSuccess}
                  onClose={() => setShowQuiz(false)}
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeChapterId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-[32px] p-6 md:p-10 shadow-2xl overflow-hidden relative border border-slate-200"
                style={{ backgroundColor: '#ffffff', color: '#1e293b' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Lesson Header */}
                <div className="mb-8 flex flex-wrap gap-4 items-center justify-between border-b border-slate-200 pb-6">
                  <div>
                    <span className="text-orange font-bold text-xs uppercase tracking-widest block mb-1">
                      {currentChapter.type === "video" ? "Cours Vidéo" : "Support de Cours"} • {currentChapter.duration}
                    </span>
                    <h3 className="font-montserrat font-extrabold text-xl md:text-2xl leading-tight mt-1" style={{ color: '#0F1D33' }}>
                      {currentChapter.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleChapterCompleted(currentChapter.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      completedChapters[currentChapter.id]
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {completedChapters[currentChapter.id] ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Complété
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" /> Marquer complété
                      </>
                    )}
                  </button>
                </div>

                {/* Video Mock Player */}
                {currentChapter.type === "video" && (
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/60 border border-white/10 mb-8 flex items-center justify-center group shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80" 
                      alt="Thumbnail" 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    
                    <button className="w-16 h-16 rounded-full bg-orange/90 hover:bg-orange text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </button>

                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/60 font-bold z-10">
                      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                        <Video className="w-3.5 h-3.5 text-orange" />
                        <span>SaniNova Virtual Lecture</span>
                      </div>
                      <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">{currentChapter.duration}</span>
                    </div>
                  </div>
                )}

                {/* Lesson Rich Content - PPT Style */}
                <div className="max-w-none mb-10 space-y-5 text-sm md:text-base">
                  {currentChapter.content.split("\n\n").map((para, i) => {
                    // #### Section title (e.g. "Définitions et concepts clés") — orange bar + title
                    if (para.startsWith("####")) {
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem', marginBottom: '1rem' }}>
                          <div style={{ width: '4px', height: '32px', backgroundColor: '#f97316', borderRadius: '9999px', flexShrink: 0 }} />
                          <div style={{ color: '#0F1D33', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.3, margin: 0 }}>
                            {para.replace(/^#+\s*/, "")}
                          </div>
                        </div>
                      );
                    }
                    // ### Concept title (e.g. "Le Stock") — green pill badge
                    if (para.startsWith("###")) {
                      return (
                        <div key={i} style={{ marginTop: '2rem', marginBottom: '-1rem', position: 'relative', zIndex: 10, paddingLeft: '1rem' }}>
                          <span style={{ display: 'inline-block', backgroundColor: '#34A853', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', padding: '0.4rem 1.5rem', borderRadius: '9999px', border: '3px solid white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                            {para.replace(/^#+\s*/, "")}
                          </span>
                        </div>
                      );
                    }
                    // > blockquote — blue definition block (like PPT blue box)
                    if (para.startsWith(">")) {
                      return (
                        <div key={i} style={{ backgroundColor: '#0B4A8E', color: '#ffffff', padding: '2rem 1.5rem 1.5rem', borderRadius: '8px', margin: '0 0 1.5rem 0', lineHeight: 1.7, fontSize: '1.05rem' }}>
                          {renderMarkdownText(para.replace(/^>\s*"?|"?$/g, ""), true)}
                        </div>
                      );
                    }
                    // Bullet lists
                    if (para.startsWith("-") || para.startsWith("\u25b8")) {
                      return (
                        <ul key={i} style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', listStyleType: 'disc' }}>
                          {para.split("\n").map((li, j) => (
                            <li key={j} style={{ color: '#334155', lineHeight: 1.7, marginBottom: '0.375rem' }}>{renderMarkdownText(li.replace(/^[\-\u25b8]\s*/, ""))}</li>
                          ))}
                        </ul>
                      );
                    }
                    // Numbered lists
                    if (/^\d+\./.test(para.trim())) {
                      return (
                        <ol key={i} style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', listStyleType: 'decimal' }}>
                          {para.split("\n").map((li, j) => (
                            <li key={j} style={{ color: '#334155', lineHeight: 1.7, marginBottom: '0.375rem' }}>{renderMarkdownText(li.replace(/^\d+\.\s*/, ""))}</li>
                          ))}
                        </ol>
                      );
                    }
                    // Tables
                    if (para.trim().startsWith("|") && para.includes("\n")) {
                      const rows = para.trim().split("\n");
                      const hasSeparator = rows.length > 1 && rows[1].includes("---");
                      const bodyStartIndex = hasSeparator ? 2 : 1;
                      return (
                        <div key={i} className="my-6 overflow-x-auto rounded-xl border shadow-sm" style={{ borderColor: '#E2E8F0' }}>
                          <table className="w-full text-left text-sm border-collapse">
                            <thead>
                              <tr style={{ backgroundColor: '#1a4ea0', color: '#ffffff' }}>
                                {rows[0].split("|").filter(c => c.trim() !== "").map((cell, cIdx) => (
                                  <th key={cIdx} className="px-5 py-4 font-bold border-r last:border-0" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>{cell.trim()}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.slice(bodyStartIndex).map((row, rIdx) => {
                                if (row.trim() === "") return null;
                                return (
                                  <tr key={rIdx} style={{ backgroundColor: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                                    {row.split("|").filter((c, idx, arr) => {
                                      if ((idx === 0 || idx === arr.length - 1) && c.trim() === "") return false;
                                      return true;
                                    }).map((cell, cIdx) => (
                                      <td key={cIdx} className="px-5 py-4 align-top border-r last:border-r-0" style={{ color: '#334155', borderColor: '#E2E8F0', borderBottom: '1px solid #E2E8F0', fontSize: '15px', lineHeight: '1.7' }}>
                                        {cell.trim().split(/<br\s*\/?>/i).map((line, lIdx, arr) => (
                                          <React.Fragment key={lIdx}>
                                            {renderMarkdownText(line.trim())}
                                            {lIdx < arr.length - 1 && <div className="h-3" />}
                                          </React.Fragment>
                                        ))}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    // Images
                    const imgMatch = para.match(/^!\[(.*?)\]\((.*?)\)$/);
                    if (imgMatch) {
                      return (
                        <div key={i} className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto object-cover max-h-[400px]" />
                        </div>
                      );
                    }
                    // Code blocks
                    if (para.startsWith("```")) {
                      const code = para.replace(/```[a-z]*\n|```/g, "");
                      return (
                        <pre key={i} className="bg-slate-900 p-5 rounded-xl font-mono text-xs overflow-x-auto my-4 text-emerald-400">
                          <code>{code}</code>
                        </pre>
                      );
                    }
                    // Default paragraph
                    return (
                      <div key={i} style={{ color: '#334155', lineHeight: 1.75, margin: '0.5rem 0' }}>
                        {para.split('\n').map((line, lineIndex, arr) => {
                          if (line.trim().startsWith('- ')) {
                            return (
                              <div key={lineIndex} className="flex items-start mt-2 ml-4 mb-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 mr-3 flex-shrink-0"></span>
                                <span>{renderMarkdownText(line.trim().substring(2))}</span>
                              </div>
                            );
                          }
                          return (
                            <span key={lineIndex}>
                              {renderMarkdownText(line)}
                              {lineIndex !== arr.length - 1 && <br />}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Resources Panel */}
                {currentChapter.resources && currentChapter.resources.length > 0 && (
                  <div className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h5 className="text-[#0F1D33] font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Download className="w-4 h-4 text-orange" /> Ressources à télécharger
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentChapter.resources.map((res, rIdx) => (
                        <div key={rIdx} className="bg-white hover:bg-slate-100 border border-slate-200 p-4 rounded-xl flex items-center justify-between gap-4 transition-all shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{res.name}</p>
                              <p className="text-[10px] text-slate-500 font-bold mt-0.5">{res.type} • {res.size}</p>
                            </div>
                          </div>
                          <button className="p-2 bg-slate-100 hover:bg-orange hover:text-white rounded-lg text-slate-600 transition-all cursor-pointer">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lesson Navigation footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <button
                    onClick={handlePrev}
                    disabled={currentChapterIndex === 0}
                    className="px-6 py-3.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-8 py-3.5 bg-orange text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-orange/30 hover:bg-[#d95c00]"
                  >
                    {currentChapterIndex < totalChaptersCount - 1 ? (
                      <>
                        Suivant <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Lancer l'évaluation <HelpCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
