"use client";

import React, { useState, useEffect } from "react";
import { 
  FileCheck, Star, Send, CheckCircle2, ArrowLeft, 
  HelpCircle, Sparkles, MessageSquare, AlertCircle, RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SATISFACTION_QUESTIONS, 
  SATISFACTION_LEVELS, 
  SatisfactionLevelValue,
  SurveySubmission 
} from "@/lib/surveyData";

interface SurveyFormProps {
  participantName: string;
  participantEmail: string;
  participantRole?: string;
  trainingSlug?: string;
  onSuccess?: () => void;
}

export default function SatisfactionSurveyForm({
  participantName,
  participantEmail,
  participantRole,
  trainingSlug = "officine-moderne",
  onSuccess,
}: SurveyFormProps) {
  const [answers, setAnswers] = useState<Record<number, SatisfactionLevelValue>>({});
  const [suggestions, setSuggestions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState<SurveySubmission | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Vérifier si l'apprenant a déjà répondu
  useEffect(() => {
    const checkExistingSubmission = async () => {
      if (!participantEmail) {
        setLoadingInitial(false);
        return;
      }
      try {
        const res = await fetch(`/api/academy/surveys?training_slug=${trainingSlug}&participant_email=${encodeURIComponent(participantEmail)}`);
        const json = await res.json();
        if (json.success && json.surveys && json.surveys.length > 0) {
          setAlreadyCompleted(json.surveys[0]);
        }
      } catch (e) {
        console.warn("Could not check existing survey:", e);
      } finally {
        setLoadingInitial(false);
      }
    };
    checkExistingSubmission();
  }, [participantEmail, trainingSlug]);

  const handleSelectAnswer = (questionId: number, value: SatisfactionLevelValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = SATISFACTION_QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) {
      alert(`Veuillez répondre à toutes les questions (${answeredCount}/${totalQuestions} répondues).`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Transformer answers { 1: "very_satisfied" } en { "q1": "very_satisfied" }
      const formattedAnswers: Record<string, SatisfactionLevelValue> = {};
      Object.entries(answers).forEach(([qId, val]) => {
        formattedAnswers[`q${qId}`] = val;
      });

      const res = await fetch("/api/academy/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          training_slug: trainingSlug,
          participant_name: participantName,
          participant_email: participantEmail,
          participant_role: participantRole || "",
          answers: formattedAnswers,
          suggestions: suggestions.trim(),
        }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Erreur lors de l'envoi");
      }

      setSubmitted(true);
      setAlreadyCompleted(json.survey);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Survey submission error:", err);
      alert("Une erreur est survenue lors de l'enregistrement de vos réponses : " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-12 text-center">
        <RefreshCw className="w-8 h-8 text-orange animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-xs uppercase font-bold tracking-widest">
          Chargement de l'enquête de satisfaction...
        </p>
      </div>
    );
  }

  // Écran si l'apprenant a déjà complété l'enquête
  if (alreadyCompleted || submitted) {
    return (
      <div className="bg-[#0F1D33] rounded-[36px] border border-emerald-500/30 p-8 md:p-12 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest rounded-full inline-block mb-3">
          Enquête enregistrée
        </span>

        <h3 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-3">
          Merci pour votre retour précieux, {participantName} !
        </h3>

        <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed mb-8">
          Vos réponses à l'enquête de satisfaction pour la formation <strong className="text-white">Gestion d'une Officine Moderne</strong> ont bien été transmises à l'équipe pédagogique SaniNova. Vos remarques nous aident à maintenir l'excellence de nos programmes.
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/50">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Enquête complétée le {alreadyCompleted?.created_at ? new Date(alreadyCompleted.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "aujourd'hui"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Bannière d'en-tête */}
      <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full pointer-events-none" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange/15 border border-orange/30 flex items-center justify-center text-orange flex-shrink-0">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-orange/15 border border-orange/30 text-orange text-[9px] font-black uppercase tracking-widest rounded-full">
                Évaluation Officielle
              </span>
              <span className="text-white/30 text-xs font-semibold">• 10 questions</span>
            </div>
            <h3 className="text-xl md:text-2xl font-montserrat font-black text-white">
              Enquête de Satisfaction • Gestion d'une Officine Moderne
            </h3>
            <p className="text-white/50 text-xs mt-1">
              Objectif : Recueillir votre appréciation afin d'améliorer continuellement la qualité de nos formations.
            </p>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="relative z-10 w-full md:w-auto flex-shrink-0 bg-slate-950/60 border border-white/10 p-3.5 rounded-2xl text-right min-w-[200px]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-white/40">Progression</span>
            <span className={isComplete ? "text-emerald-400" : "text-orange"}>
              {answeredCount} / {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${isComplete ? "bg-emerald-400" : "bg-orange"}`}
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Formulaire Questionnaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {SATISFACTION_QUESTIONS.map((q) => {
            const currentAnswer = answers[q.id];
            return (
              <div 
                key={q.id}
                className={`bg-[#0F1D33] rounded-[24px] border p-5 md:p-6 transition-all shadow-lg ${
                  currentAnswer ? "border-emerald-500/20 bg-emerald-500/[0.02]" : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Numéro et intitulé de la question */}
                  <div className="flex items-start gap-3.5 max-w-xl">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                      currentAnswer ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-white/40 border border-white/10"
                    }`}>
                      {q.id}
                    </span>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white leading-snug">
                        {q.label}
                      </h4>
                      <p className="text-[11px] text-white/30 font-medium mt-0.5">
                        Sélectionnez une seule réponse
                      </p>
                    </div>
                  </div>

                  {/* Choix des 4 niveaux de satisfaction */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
                    {SATISFACTION_LEVELS.map((level) => {
                      const isSelected = currentAnswer === level.value;
                      return (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, level.value)}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? `${level.color} shadow-lg scale-105`
                              : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-current" : "bg-white/20"}`} />
                          <span className="text-[11px]">{level.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Champ Suggestions & Recommandations */}
        <div className="bg-[#0F1D33] rounded-[28px] border border-white/5 p-6 shadow-xl space-y-3">
          <label className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-orange" />
            Suggestions ou recommandations pour améliorer cette formation (Optionnel) :
          </label>
          <textarea
            rows={4}
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            placeholder="Partagez vos impressions, points forts, ou aspects à perfectionner pour les prochaines éditions..."
            className="w-full bg-[#0A1629] border border-white/10 rounded-2xl p-4 text-white text-xs md:text-sm placeholder:text-white/20 focus:border-orange/50 focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Bouton d'envoi */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#0F1D33] rounded-[28px] border border-white/5 shadow-xl">
          <div className="text-xs text-white/50 text-center sm:text-left">
            {isComplete ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4" /> Toutes les questions sont complétées !
              </span>
            ) : (
              <span className="text-orange font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                <AlertCircle className="w-4 h-4" /> Il reste {totalQuestions - answeredCount} question(s) sans réponse
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isComplete || isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-orange hover:bg-orange/90 disabled:opacity-40 disabled:hover:bg-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Transmettre mes réponses
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
