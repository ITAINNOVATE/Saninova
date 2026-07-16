"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw
} from "lucide-react";
import PageHero from "../../../../../components/ui/PageHero";
import CertificateGenerator from "../../../../../components/academy/CertificateGenerator";

// We import the data based on the slug. 
import { gestionApprovisionnementsEval } from "../../../../../data/evaluations/gestionApprovisionnementsEval";
import { gestionOfficineEval } from "../../../../../data/evaluations/gestionOfficineEval";
import { quantificationBesoinsEval } from "../../../../../data/evaluations/quantificationBesoinsEval";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function EvaluationPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [loading, setLoading] = useState(true);
  const [evalData, setEvalData] = useState<any>(null);
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Initialize the evaluation
  useEffect(() => {
    // Check if the user has completed the course
    // In a real app we would check the API or localStorage
    const savedCompleted = localStorage.getItem(`completed_${slug}`);
    let completedChaptersCount = 0;
    if (savedCompleted) {
      completedChaptersCount = Object.keys(JSON.parse(savedCompleted)).length;
    }
    
    // We assume there are 30 chapters for gestion-approvisionnements.
    // To allow testing, we won't strictly block here, but we could check percent.
    
    // Load specific eval data based on slug
    if (slug === "gestion-approvisionnements" || slug === "gestion-des-approvisionnements-et-des-stocks") {
      const data = gestionApprovisionnementsEval;
      setEvalData(data);
      
      const savedAttempts = parseInt(localStorage.getItem(`eval_attempts_${slug}`) || "0");
      const passed = localStorage.getItem(`eval_passed_${slug}`) === "true";
      setAttempts(savedAttempts);
      
      if (savedAttempts >= data.maxAttempts && !passed) {
        setBlocked(true);
      } else {
        // Shuffle questions and options
        const shuffledQuestions = shuffleArray(data.questions).map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }));
        setQuestions(shuffledQuestions);
        setTimeLeft(data.timeLimit);
      }
      setLoading(false);
    } else if (slug === "gestion-d-une-officine-moderne") {
      const data = gestionOfficineEval;
      setEvalData(data);
      
      const savedAttempts = parseInt(localStorage.getItem(`eval_attempts_${slug}`) || "0");
      const passed = localStorage.getItem(`eval_passed_${slug}`) === "true";
      setAttempts(savedAttempts);
      
      if (savedAttempts >= data.maxAttempts && !passed) {
        setBlocked(true);
      } else {
        const shuffledQuestions = shuffleArray(data.questions).map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }));
        setQuestions(shuffledQuestions);
        setTimeLeft(data.timeLimit);
      }
      setLoading(false);
    } else if (slug === "quantification-des-besoins-en-produits-de-sante" || slug === "quantification-et-previsions") {
      const data = quantificationBesoinsEval;
      setEvalData(data);
      
      const savedAttempts = parseInt(localStorage.getItem(`eval_attempts_${slug}`) || "0");
      const passed = localStorage.getItem(`eval_passed_${slug}`) === "true";
      setAttempts(savedAttempts);
      
      if (savedAttempts >= data.maxAttempts && !passed) {
        setBlocked(true);
      } else {
        const shuffledQuestions = shuffleArray(data.questions).map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }));
        setQuestions(shuffledQuestions);
        setTimeLeft(data.timeLimit);
      }
      setLoading(false);
    } else {
      // Evaluation not found
      setLoading(false);
    }
  }, [slug]);

  // Timer logic
  useEffect(() => {
    if (loading || blocked || isSubmitted || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [loading, blocked, isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    if (window.confirm("Êtes-vous sûr de vouloir soumettre votre évaluation définitivement ?")) {
      submitEvaluation();
    }
  };

  const submitEvaluation = () => {
    setIsSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    
    const passed = localStorage.getItem(`eval_passed_${slug}`) === "true";
    
    // Only increment attempts if they haven't officially passed yet
    if (!passed) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem(`eval_attempts_${slug}`, newAttempts.toString());
    }
    
    // Save score if it's their best score
    const savedScore = parseInt(localStorage.getItem(`eval_score_${slug}`) || "0");
    if (finalScore > savedScore) {
      localStorage.setItem(`eval_score_${slug}`, finalScore.toString());
    }
    
    if (finalScore >= evalData.passingScore) {
      localStorage.setItem(`eval_passed_${slug}`, "true");
    }
  };

  const handleRestart = () => {
    setIsSubmitted(false);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(evalData.timeLimit);
  };

  useEffect(() => {
    // If the user already passed, we can show them the results screen immediately
    const passed = localStorage.getItem(`eval_passed_${slug}`);
    const savedScore = localStorage.getItem(`eval_score_${slug}`);
    if (passed === "true" && savedScore && evalData) {
      setIsSubmitted(true);
      setScore(parseInt(savedScore));
    }
  }, [slug, evalData]);

  if (loading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center text-white">Chargement de l'évaluation...</div>;
  }

  if (!evalData) {
    return <div className="min-h-screen bg-dark flex items-center justify-center text-white">Évaluation introuvable.</div>;
  }

  if (blocked && !isSubmitted) {
    return (
      <>
        <PageHero title="Évaluation Finale" subtitle={evalData.title} backgroundImages={["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"]} />
        <div className="bg-dark min-h-screen pb-24 px-6 pt-12 text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Tentatives épuisées</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Vous avez atteint la limite de {evalData.maxAttempts} tentatives pour cette évaluation. 
            Veuillez contacter le support pour réinitialiser vos tentatives.
          </p>
          <Link href={`/academy/portal`} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors">
            Retour au portail
          </Link>
        </div>
      </>
    );
  }

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const isPassed = score >= evalData.passingScore || (typeof window !== "undefined" && localStorage.getItem(`eval_passed_${slug}`) === "true");
  const studentEmail = typeof window !== "undefined" ? localStorage.getItem("registered_email") || "Étudiant(e)" : "Étudiant(e)";
  const currentDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <>
      <PageHero title="Évaluation Finale" subtitle={evalData.title} backgroundImages={["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"]} />
      
      {reviewMode ? (
        <div className="bg-dark min-h-screen pb-24 px-4 md:px-6 -mt-12 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <button onClick={() => setReviewMode(false)} className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux résultats
              </button>
            </div>
            <div className="space-y-8">
              {questions.map((q, idx) => (
                <div key={q.id} className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6">{idx + 1}. {q.text}</h3>
                  <div className="space-y-3">
                    {q.options.map((opt: string, i: number) => {
                      const isCorrect = opt === q.correctAnswer;
                      const isSelected = answers[q.id] === opt;
                      let btnClass = "border-white/10 text-white/80 bg-white/5";
                      if (isCorrect) {
                        btnClass = "border-green-500 bg-green-500/10 text-white";
                      } else if (isSelected) {
                        btnClass = "border-red-500 bg-red-500/10 text-white";
                      }
                      
                      return (
                        <div key={i} className={`w-full text-left p-4 rounded-xl border-2 flex items-start space-x-4 ${btnClass}`}>
                          <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${isCorrect ? 'border-green-500' : (isSelected ? 'border-red-500' : 'border-white/30')}`}>
                            {(isCorrect || isSelected) && <div className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />}
                          </div>
                          <span className="text-lg leading-tight">{opt}</span>
                          {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500 ml-auto flex-shrink-0" />}
                          {!isCorrect && isSelected && <XCircle className="w-6 h-6 text-red-500 ml-auto flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-dark min-h-screen pb-24 px-4 md:px-6 -mt-12 relative z-20">
          <div className="max-w-4xl mx-auto">
          
          <div className="mb-6 flex items-center justify-between">
            <Link href={`/academy/portal`} className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" /> Quitter l'évaluation
            </Link>
            {!isSubmitted && (
              <div className="flex items-center space-x-2 bg-[#0F1D33] px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-orange'}`} />
                <span className={`font-bold font-mono text-xl ${timeLeft < 300 ? 'text-red-500' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>

          {!isSubmitted ? (
            <div className="bg-[#0F1D33] rounded-[40px] border border-white/5 p-6 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              {/* Progress Bar */}
              <div className="mb-10 relative z-10">
                <div className="flex justify-between text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">
                  <span>Question {currentIndex + 1} / {questions.length}</span>
                  <span>Répondu : {answeredCount} / {questions.length}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="relative z-10 mb-12">
                <h3 className="text-2xl font-bold text-white mb-8">
                  {currentQ?.text}
                </h3>
                
                <div className="space-y-4">
                  {currentQ?.options.map((option: string, idx: number) => {
                    const isSelected = answers[currentQ.id] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(currentQ.id, option)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start space-x-4 ${
                          isSelected 
                            ? 'bg-orange/10 border-orange text-white' 
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                          isSelected ? 'border-orange bg-orange' : 'border-white/30'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-lg leading-tight">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between relative z-10 pt-6 border-t border-white/10">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={isFirstQuestion}
                  className="flex items-center px-6 py-3 rounded-xl font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 text-white"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Précédent
                </button>

                {!isLastQuestion ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors text-white"
                  >
                    Suivant
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={answeredCount < questions.length}
                    className="flex items-center px-8 py-3 bg-accent hover:bg-[#ff7a33] rounded-xl font-bold transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                  >
                    Soumettre l'évaluation
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-8">
              <div className="bg-[#0F1D33] rounded-[40px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                {isPassed ? (
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                ) : (
                  <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                )}

                <h2 className="text-4xl font-black text-white mb-2">
                  {isPassed ? "Félicitations !" : "Évaluation non validée"}
                </h2>
                <p className="text-white/60 mb-10 text-lg">
                  {isPassed 
                    ? "Vous avez réussi l'évaluation avec brio." 
                    : "Votre score est inférieur au seuil requis de 70%."}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full md:w-1/3">
                    <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Votre Score</div>
                    <div className={`text-5xl font-black ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
                      {score}%
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full md:w-1/3">
                    <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Bonnes Réponses</div>
                    <div className="text-5xl font-black text-white">
                      {Math.round((score / 100) * questions.length)} / {questions.length}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full md:w-1/3">
                    <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Tentative</div>
                    <div className="text-5xl font-black text-white">
                      {attempts} / {evalData.maxAttempts}
                    </div>
                  </div>
                </div>

                {!isPassed && attempts < evalData.maxAttempts && (
                  <button 
                    onClick={handleRestart}
                    className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-colors mx-auto"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Retenter l'évaluation</span>
                  </button>
                )}

                {isPassed && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <button 
                      onClick={() => setReviewMode(true)}
                      className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Revoir les questions</span>
                    </button>
                    <button 
                      onClick={handleRestart}
                      className="flex items-center justify-center space-x-2 bg-accent/20 hover:bg-accent/40 text-accent px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto"
                    >
                      <RefreshCw className="w-5 h-5" />
                      <span>Refaire l'évaluation</span>
                    </button>
                  </div>
                )}
                
                {isPassed && (
                  <div className="border-t border-white/10 pt-12 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">Votre Attestation</h3>
                    <p className="text-white/60 mb-8">Téléchargez votre attestation officielle validant vos compétences.</p>
                    <CertificateGenerator 
                      studentName={studentEmail.split('@')[0].replace('.', ' ')} 
                      courseName={evalData.title.replace("Évaluation Finale : ", "")} 
                      score={score} 
                      date={currentDate} 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </>
  );
}
