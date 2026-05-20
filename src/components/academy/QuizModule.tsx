"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Award, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModuleProps {
  courseTitle: string;
  courseSlug: string;
  onQuizPassed: () => void;
  onClose: () => void;
}

const mockQuestionsDatabase: Record<string, Question[]> = {
  "supply-chain": [
    {
      id: 1,
      text: "Quelle méthode de gestion des stocks pharmaceutiques privilégie la sortie des produits dont la date de péremption est la plus proche ?",
      options: [
        "FIFO (First In, First Out)",
        "FEFO (First Expired, First Out)",
        "LIFO (Last In, First Out)",
        "Juste-à-temps (JIT)"
      ],
      correctAnswer: 1,
      explanation: "La méthode FEFO (First Expired, First Out) est la règle d'or en logistique pharmaceutique car elle garantit que les produits qui périment en premier sont distribués en premier, réduisant à zéro le gaspillage par péremption."
    },
    {
      id: 2,
      text: "Que signifie le sigle eLMIS dans le cadre des systèmes d'information de santé ?",
      options: [
        "electronic Labor Management Integrated System",
        "efficient Logistics Medicine Information System",
        "electronic Logistics Management Information System",
        "essential Logistic & Medicine Inventory Scheme"
      ],
      correctAnswer: 2,
      explanation: "L'eLMIS (electronic Logistics Management Information System) est un système informatisé permettant de collecter, traiter et transmettre les données de stock et de consommation pour optimiser la chaîne d'approvisionnement en santé."
    },
    {
      id: 3,
      text: "Quelle est la température standard recommandée par l'OMS pour la conservation de la majorité des vaccins dans la chaîne du froid positive ?",
      options: [
        "-20°C à 0°C",
        "0°C à +4°C",
        "+2°C à +8°C",
        "+8°C à +15°C"
      ],
      correctAnswer: 2,
      explanation: "La chaîne du froid positive standard requiert une température rigoureusement maintenue entre +2°C et +8°C pour préserver l'efficacité biologique des vaccins thermosensibles."
    }
  ],
  "gouvernance": [
    {
      id: 1,
      text: "Quel est l'objectif principal du Règlement Sanitaire International (RSI 2005) rédigé par l'OMS ?",
      options: [
        "Standardiser le prix de vente des vaccins mondiaux",
        "Prévenir, protéger et contrôler la propagation internationale des maladies tout en évitant les entraves inutiles au trafic mondial",
        "Sanctionner financièrement les pays ne respectant pas les normes d'hygiène",
        "Créer une armée médicale de réserve mondiale"
      ],
      correctAnswer: 1,
      explanation: "Le RSI (2005) vise à assurer la sécurité sanitaire mondiale par une réponse de santé publique proportionnée et limitée aux risques, sans créer de perturbations majeures pour les voyages et le commerce international."
    },
    {
      id: 2,
      text: "Dans le concept de la Couverture Santé Universelle (CSU), quels sont les trois dimensions représentatives du cube de la CSU ?",
      options: [
        "Budget, Nombre d'hôpitaux, Nombre de médecins",
        "La population couverte, les services inclus, et la proportion des coûts directs pris en charge",
        "Assurance publique, Mutuelles privées, Financements externes",
        "Médicaments, Consultations, Hospitalisations"
      ],
      correctAnswer: 1,
      explanation: "Le cube de la CSU de l'OMS définit la couverture selon : Qui est protégé (population), Quels services sont couverts (prestations), et Combien est pris en charge (protection financière contre le reste à charge)."
    }
  ],
  "digital": [
    {
      id: 1,
      text: "Qu'est-ce que l'interopérabilité sémantique dans un système d'information de santé ?",
      options: [
        "La capacité de deux ordinateurs à se connecter au même réseau Wi-Fi",
        "La garantie que le contenu des données échangées soit compris de la même manière par tous les systèmes récepteurs",
        "La traduction automatique des interfaces logicielles en plusieurs langues",
        "La vitesse de transfert des dossiers médicaux entre serveurs"
      ],
      correctAnswer: 1,
      explanation: "L'interopérabilité sémantique garantit que le sens précis de l'information médicale (codes de diagnostics, prescriptions) est préservé et interprété de manière identique par les différents logiciels de santé."
    },
    {
      id: 2,
      text: "Quel standard international est aujourd'hui la référence mondiale pour l'échange de données de santé et l'interopérabilité des dossiers patients informatisés ?",
      options: [
        "HTTP/2",
        "HL7 FHIR (Fast Healthcare Interoperability Resources)",
        "DICOM V1",
        "ISO 9001"
      ],
      correctAnswer: 1,
      explanation: "FHIR (Fast Healthcare Interoperability Resources), développé par HL7, est le standard moderne basé sur des API REST qui révolutionne l'intégration des systèmes cliniques et des applications de santé."
    }
  ],
  "default": [
    {
      id: 1,
      text: "Quelle attitude définit le mieux le leadership en santé publique pour mobiliser des équipes pluridisciplinaires ?",
      options: [
        "Un management directif basé uniquement sur les règles et les décrets",
        "Un leadership transformationnel axé sur une vision partagée, la collaboration intersectorielle et l'autonomisation",
        "L'externalisation de toutes les prises de décision à des consultants externes",
        "La centralisation absolue des pouvoirs décisionnels"
      ],
      correctAnswer: 1,
      explanation: "Le leadership en santé exige une approche collaborative et transformationnelle pour fédérer des acteurs variés (cliniciens, logisticiens, politiques) autour d'objectifs de santé communs."
    },
    {
      id: 2,
      text: "Quel indicateur permet d'évaluer la qualité et l'efficacité de la prise en charge dans un établissement de santé ?",
      options: [
        "Le taux de rotation du personnel administratif",
        "Le taux de satisfaction des patients associé à la baisse des infections associées aux soins",
        "Le nombre de lits disponibles non occupés",
        "Le budget total alloué aux consommables de bureau"
      ],
      correctAnswer: 1,
      explanation: "Les indicateurs de résultats cliniques (comme le taux d'infections nosocomiales) corrélés aux retours d'expérience patients (satisfaction) sont essentiels pour mesurer la performance de la qualité des soins."
    }
  ]
};

export default function QuizModule({ courseTitle, courseSlug, onQuizPassed, onClose }: QuizModuleProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Pick questions from DB based on course slug or category, default to fallback
  const getQuestions = () => {
    if (courseSlug.includes("supply") || courseSlug.includes("logistique")) return mockQuestionsDatabase["supply-chain"];
    if (courseSlug.includes("gouvernance") || courseSlug.includes("leadership")) return mockQuestionsDatabase["gouvernance"];
    if (courseSlug.includes("digital") || courseSlug.includes("interoperabilite")) return mockQuestionsDatabase["digital"];
    return mockQuestionsDatabase["default"];
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const passingScore = Math.ceil(questions.length * 0.8); // 80% passing

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;
    setIsAnswered(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      if (score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0) >= passingScore) {
        onQuizPassed();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="bg-[#0F1D33] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <span className="text-orange font-bold text-xs uppercase tracking-widest block mb-1">Évaluation Finale</span>
          <h3 className="text-white font-montserrat font-extrabold text-lg md:text-xl line-clamp-1">{courseTitle}</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 cursor-pointer"
        >
          Quitter
        </button>
      </div>

      <div className="p-6 md:p-8">
        {!showResults ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-6 text-sm text-white/40 font-bold">
              <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
              <span>Requis : {passingScore}/{questions.length} (80%)</span>
            </div>

            <div className="w-full bg-white/5 h-2 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="bg-orange h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Text */}
            <h4 className="text-white text-lg md:text-xl font-bold leading-snug mb-8 flex gap-3">
              <HelpCircle className="w-6 h-6 text-orange shrink-0 mt-0.5" />
              {currentQuestion.text}
            </h4>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                let optionStyle = "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20";
                
                if (isAnswered) {
                  if (idx === currentQuestion.correctAnswer) {
                    optionStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                  } else if (idx === selectedAnswer) {
                    optionStyle = "bg-rose-500/20 border-rose-500/50 text-rose-400";
                  } else {
                    optionStyle = "bg-white/2 border-white/5 text-white/30 opacity-50";
                  }
                } else if (idx === selectedAnswer) {
                  optionStyle = "bg-orange/20 border-orange/50 text-orange font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-5 rounded-2xl border text-sm transition-all duration-300 flex items-start gap-4 cursor-pointer ${optionStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-xs font-black ${
                      idx === selectedAnswer ? "bg-orange border-orange text-white" : "border-white/20 text-white/40"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed font-medium">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-6 rounded-2xl border mb-8 flex gap-4 text-sm leading-relaxed ${
                    selectedAnswer === currentQuestion.correctAnswer 
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                      : "bg-rose-950/20 border-rose-500/20 text-rose-300"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white mb-1 uppercase tracking-wider text-xs">
                      {selectedAnswer === currentQuestion.correctAnswer ? "Excellente réponse !" : "Mauvaise réponse"}
                    </h5>
                    <p className="opacity-90">{currentQuestion.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA action bar */}
            <div className="flex justify-end">
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-8 py-4 bg-white text-dark font-black rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
                >
                  Valider ma réponse
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-4 bg-orange text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-orange/20"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Question Suivante" : "Terminer le Quiz"} 
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results Dashboard */
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-orange/10 border border-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 text-orange">
              <Award className="w-10 h-10" />
            </div>

            <h4 className="text-white font-montserrat font-black text-2xl md:text-3xl mb-4">
              {score >= passingScore ? "Félicitations, vous avez réussi !" : "Évaluation non validée"}
            </h4>

            <p className="text-white/60 font-medium text-base mb-8 max-w-md mx-auto">
              {score >= passingScore 
                ? "Vous avez validé vos acquis avec brio. Vous êtes désormais éligible pour obtenir votre certificat officiel SaniNova."
                : `Vous avez obtenu un score de ${score}/${questions.length}. Il vous faut au moins ${passingScore}/${questions.length} bonnes réponses pour valider ce module.`}
            </p>

            {/* Score Ring */}
            <div className="inline-flex items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/5 mb-10">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Votre Score</p>
                <div className="text-4xl font-montserrat font-black text-white">
                  <span className={score >= passingScore ? "text-emerald-400" : "text-rose-400"}>{score}</span>
                  <span className="text-xl text-white/30"> / {questions.length}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {score >= passingScore ? (
                <>
                  <button
                    onClick={onQuizPassed}
                    className="px-8 py-4 bg-orange text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-sm shadow-xl shadow-orange/20 cursor-pointer flex items-center gap-2"
                  >
                    Obtenir mon certificat <Award className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-all text-sm cursor-pointer"
                  >
                    Retour aux cours
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleRetry}
                    className="px-8 py-4 bg-orange text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-sm shadow-xl shadow-orange/20 cursor-pointer flex items-center gap-2"
                  >
                    Réessayer le Quiz <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-all text-sm cursor-pointer"
                  >
                    Quitter l'évaluation
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
