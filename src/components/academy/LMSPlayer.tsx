"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, BookOpen, CheckCircle, Circle, ArrowLeft, ArrowRight, 
  Download, FileText, Video, ExternalLink, HelpCircle, Award, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuizModule from "./QuizModule";

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

const mockCoursesSyllabus: Record<string, Module[]> = {
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

export default function LMSPlayer({ courseTitle, courseSlug, onBackToPortal, onCourseCompleted }: LMSPlayerProps) {
  const [syllabus, setSyllabus] = useState<Module[]>([]);
  const [activeChapterId, setActiveChapterId] = useState("");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Load syllabus based on slug
  useEffect(() => {
    let key = "gouvernance-sanitaire-afrique";
    if (courseSlug.includes("supply") || courseSlug.includes("logistique")) key = "logistique-medicale-dernier-kilometre";
    else if (courseSlug.includes("digital") || courseSlug.includes("interoperabilite")) key = "sante-digitale-interoperabilite";
    
    const modules = mockCoursesSyllabus[key] || mockCoursesSyllabus["gouvernance-sanitaire-afrique"];
    setSyllabus(modules);

    if (modules.length > 0 && modules[0].chapters.length > 0) {
      setActiveChapterId(modules[0].chapters[0].id);
    }

    // Load progress from LocalStorage
    const saved = localStorage.getItem(`progress_${courseSlug}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedChapters(parsed.completed || {});
        setQuizPassed(parsed.quizPassed || false);
      } catch (e) {
        console.error(e);
      }
    }
  }, [courseSlug]);

  const saveProgress = (newCompleted: Record<string, boolean>, qPassed = quizPassed) => {
    setCompletedChapters(newCompleted);
    setQuizPassed(qPassed);
    localStorage.setItem(`progress_${courseSlug}`, JSON.stringify({
      completed: newCompleted,
      quizPassed: qPassed,
      percent: Math.round((Object.keys(newCompleted).length / totalChaptersCount) * 100)
    }));
  };

  // Helper selectors
  const allChapters = syllabus.flatMap(m => m.chapters);
  const totalChaptersCount = allChapters.length;
  const currentChapter = allChapters.find(c => c.id === activeChapterId);
  const currentChapterIndex = allChapters.findIndex(c => c.id === activeChapterId);

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

  const completedCount = Object.keys(completedChapters).filter(k => completedChapters[k]).length;
  const progressPercent = totalChaptersCount > 0 ? Math.round((completedCount / totalChaptersCount) * 100) : 0;

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
          className="inline-flex items-center gap-2 text-white/60 hover:text-orange font-bold text-xs uppercase tracking-widest transition-all bg-white/5 border border-white/5 px-5 py-3 rounded-full hover:bg-white/10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Quitter le cours
        </button>

        <div className="hidden sm:flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/5">
          <div className="text-right">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Progression</span>
            <span className="text-xs font-black text-white">{completedCount} / {totalChaptersCount} Chapitres</span>
          </div>
          <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-orange h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Course Index Sidebar */}
        <div className="lg:col-span-1 bg-[#0F1D33] border border-white/5 rounded-[28px] p-6 h-fit shadow-xl">
          <h4 className="text-white font-montserrat font-black text-base uppercase tracking-wider mb-6 pb-4 border-b border-white/5">
            Syllabus
          </h4>

          <div className="space-y-6">
            {syllabus.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <h5 className="text-[11px] font-extrabold text-orange uppercase tracking-wider line-clamp-2 leading-relaxed">
                  {mod.title}
                </h5>
                <div className="space-y-1.5 pl-1.5 border-l border-white/5 ml-1">
                  {mod.chapters.map((chap) => {
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
                            ? "bg-orange text-white font-bold shadow-md shadow-orange/15" 
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-400"}`} />
                          ) : (
                            <Circle className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </div>
                        <span className="leading-snug line-clamp-2">{chap.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Final Quiz Navigation Tab */}
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={() => setShowQuiz(true)}
                className={`w-full py-4 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer border ${
                  showQuiz 
                    ? "bg-orange border-orange text-white" 
                    : quizPassed 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
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
                className="bg-[#0F1D33] border border-white/5 rounded-[32px] p-6 md:p-10 shadow-2xl overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Lesson Header */}
                <div className="mb-8 flex flex-wrap gap-4 items-center justify-between border-b border-white/5 pb-6">
                  <div>
                    <span className="text-orange font-bold text-xs uppercase tracking-widest block mb-1">
                      {currentChapter.type === "video" ? "Cours Vidéo" : "Support de Cours"} • {currentChapter.duration}
                    </span>
                    <h3 className="text-white font-montserrat font-extrabold text-xl md:text-2xl leading-tight">
                      {currentChapter.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleChapterCompleted(currentChapter.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      completedChapters[currentChapter.id]
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {completedChapters[currentChapter.id] ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" /> Complété
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

                {/* Lesson Rich Content (Markdown layout) */}
                <div className="prose prose-invert prose-orange max-w-none mb-10 text-white/80 leading-relaxed text-sm md:text-base font-medium space-y-4">
                  {currentChapter.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("###")) {
                      return <h4 key={i} className="text-white font-montserrat font-bold text-lg md:text-xl mt-6 mb-3">{para.replace("### ", "")}</h4>;
                    }
                    if (para.startsWith("####")) {
                      return <h5 key={i} className="text-orange font-bold text-sm md:text-base mt-4 mb-2">{para.replace("#### ", "")}</h5>;
                    }
                    if (para.startsWith("-") || para.startsWith("▸")) {
                      return (
                        <ul key={i} className="space-y-2 pl-4 list-disc marker:text-orange my-4">
                          {para.split("\n").map((li, j) => (
                            <li key={j} className="text-white/70">{li.replace(/^[\-▸]\s*/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith(">")) {
                      return (
                        <blockquote key={i} className="border-l-4 border-orange bg-white/5 pl-4 py-3 rounded-r-xl italic text-white/90 my-6">
                          {para.replace(/^>\s*"?|"?$/g, "")}
                        </blockquote>
                      );
                    }
                    if (para.startsWith("```")) {
                      const code = para.replace(/```[a-z]*\n|```/g, "");
                      return (
                        <pre key={i} className="bg-slate-950 p-5 rounded-2xl border border-white/5 font-mono text-xs overflow-x-auto my-6 text-orange/95">
                          <code>{code}</code>
                        </pre>
                      );
                    }
                    return <p key={i} className="text-white/60 leading-relaxed">{para}</p>;
                  })}
                </div>

                {/* Resources Panel */}
                {currentChapter.resources && currentChapter.resources.length > 0 && (
                  <div className="mb-10 bg-white/2 border border-white/5 rounded-2xl p-6">
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Download className="w-4 h-4 text-orange" /> Ressources à télécharger
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentChapter.resources.map((res, rIdx) => (
                        <div key={rIdx} className="bg-white/3 hover:bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white truncate">{res.name}</p>
                              <p className="text-[10px] text-white/40 font-bold mt-0.5">{res.type} • {res.size}</p>
                            </div>
                          </div>
                          <button className="p-2 bg-white/5 hover:bg-orange rounded-lg text-white transition-all cursor-pointer">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lesson Navigation footer */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <button
                    onClick={handlePrev}
                    disabled={currentChapterIndex === 0}
                    className="px-6 py-3.5 text-white/60 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-8 py-3.5 bg-white text-dark font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
                  >
                    {currentChapterIndex < totalChaptersCount - 1 ? (
                      <>
                        Suivant <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Lancer l'évaluation <HelpCircle className="w-4 h-4 text-dark" />
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
