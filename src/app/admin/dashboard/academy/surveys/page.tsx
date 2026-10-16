"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, ArrowLeft, Search, Download, RefreshCw, 
  CheckCircle2, MessageSquare, Users, Award, TrendingUp, 
  X, Eye, BarChart3, ChevronRight, ThumbsUp, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SATISFACTION_QUESTIONS, 
  SATISFACTION_LEVELS, 
  SatisfactionLevelValue,
  SurveySubmission 
} from "@/lib/surveyData";

const LEVEL_MAP: Record<string, { label: string; score: number; color: string; badge: string }> = {
  very_satisfied: { label: "Très satisfait", score: 4, color: "bg-emerald-500", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  satisfied: { label: "Satisfait", score: 3, color: "bg-blue-500", badge: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  little_satisfied: { label: "Peu satisfait", score: 2, color: "bg-orange-500", badge: "text-orange bg-orange/10 border-orange/20" },
  not_satisfied: { label: "Pas du tout satisfait", score: 1, color: "bg-red-500", badge: "text-red-400 bg-red-500/10 border-red-500/20" },
};

export default function AdminAcademySurveysPage() {
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<SurveySubmission | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "submissions">("overview");

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/academy/surveys?training_slug=all");
      const json = await res.json();
      if (json.success && json.surveys) {
        setSurveys(json.surveys);
      }
    } catch (err) {
      console.error("Error fetching surveys:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper pour calculer la note globale d'une soumission individuelle
  const getSubmissionAverage = (answers: Record<string, SatisfactionLevelValue> | undefined) => {
    if (!answers) return 0;
    const values = Object.values(answers);
    if (values.length === 0) return 0;
    const totalScore = values.reduce((sum, val) => sum + (LEVEL_MAP[val]?.score || 0), 0);
    return totalScore / values.length;
  };

  // Statistiques globales
  const totalResponses = surveys.length;
  
  const overallAverageScore = totalResponses > 0
    ? surveys.reduce((sum, s) => sum + getSubmissionAverage(s.answers), 0) / totalResponses
    : 0;

  const satisfactionPercentage = Math.round((overallAverageScore / 4) * 100);

  const totalSuggestions = surveys.filter(s => s.suggestions && s.suggestions.trim().length > 0).length;

  // Calcul statistique par question
  const questionStats = SATISFACTION_QUESTIONS.map(q => {
    const counts: Record<string, number> = {
      very_satisfied: 0,
      satisfied: 0,
      little_satisfied: 0,
      not_satisfied: 0,
    };

    let questionScoreSum = 0;
    let answerCount = 0;

    surveys.forEach(s => {
      const val = s.answers?.[q.id] || s.answers?.[`q${q.id}`];
      if (val && LEVEL_MAP[val]) {
        counts[val] = (counts[val] || 0) + 1;
        questionScoreSum += LEVEL_MAP[val].score;
        answerCount++;
      }
    });

    const average = answerCount > 0 ? questionScoreSum / answerCount : 0;
    const percent = Math.round((average / 4) * 100);

    return {
      ...q,
      counts,
      average,
      percent,
      answerCount,
    };
  });

  // Export CSV
  const handleExportCSV = () => {
    if (surveys.length === 0) return;

    const headers = [
      "Date",
      "Nom",
      "Email",
      "Profil / Rôle",
      "Formation",
      "Score Moyen (/4)",
      ...SATISFACTION_QUESTIONS.map(q => `Q${q.id}: ${q.label}`),
      "Suggestions & Recommandations",
    ];

    const rows = surveys.map(s => {
      const dateStr = s.created_at ? new Date(s.created_at).toLocaleDateString("fr-FR") : "";
      const avg = getSubmissionAverage(s.answers).toFixed(2);
      const qAnswers = SATISFACTION_QUESTIONS.map(q => {
        const val = s.answers?.[q.id] || s.answers?.[`q${q.id}`];
        return val ? LEVEL_MAP[val]?.label || val : "";
      });
      const escape = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;

      return [
        escape(dateStr),
        escape(s.participant_name),
        escape(s.participant_email),
        escape(s.participant_role || ""),
        escape(s.training_slug),
        avg,
        ...qAnswers.map(ans => escape(ans)),
        escape(s.suggestions || ""),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.map(h => `"${h}"`).join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Enquetes_Satisfaction_Officine_Moderne_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSurveys = surveys.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      (s.participant_name || "").toLowerCase().includes(q) ||
      (s.participant_email || "").toLowerCase().includes(q) ||
      (s.participant_role || "").toLowerCase().includes(q) ||
      (s.suggestions || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="pt-4">
          <Link 
            href="/admin/dashboard/academy" 
            className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la gestion Academy
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-5xl font-montserrat font-black text-white">
              Enquêtes de Satisfaction
            </h1>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
              Officine Moderne
            </span>
          </div>
          <p className="text-slate-400 mt-2 font-inter max-w-2xl">
            Analyse détaillée des retours d'évaluation des apprenants sur les 10 critères pédagogiques et logistiques.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSurveys}
            disabled={loading}
            className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-orange" : ""}`} /> Actualiser
          </button>
          <button
            onClick={handleExportCSV}
            disabled={surveys.length === 0}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Exporter en CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0F1D33] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Réponses reçues</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-montserrat font-black text-white">
            {totalResponses}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Apprenants ayant complété l'enquête
          </p>
        </div>

        <div className="bg-[#0F1D33] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Note Moyenne Globale</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-montserrat font-black text-white">
              {overallAverageScore > 0 ? overallAverageScore.toFixed(2) : "—"}
            </div>
            <span className="text-sm font-bold text-slate-500">/ 4.0</span>
          </div>
          <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Évaluation globale
          </p>
        </div>

        <div className="bg-[#0F1D33] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Taux de Satisfaction</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ThumbsUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-montserrat font-black text-emerald-400">
            {satisfactionPercentage > 0 ? `${satisfactionPercentage}%` : "—"}
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${satisfactionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-[#0F1D33] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Suggestions reçues</span>
            <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-montserrat font-black text-white">
            {totalSuggestions}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Recommandations textuelles pour s'améliorer
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === "overview" ? "text-orange" : "text-white/40 hover:text-white"
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Analyse par Critère (10 Questions)
          {activeTab === "overview" && (
            <motion.div layoutId="tab-underline-survey" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`pb-3 text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === "submissions" ? "text-orange" : "text-white/40 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" /> Réponses Détaillées des Apprenants ({surveys.length})
          {activeTab === "submissions" && (
            <motion.div layoutId="tab-underline-survey" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
          )}
        </button>
      </div>

      {/* Tab 1: Analyse Question par Question */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-[#0F1D33] rounded-3xl border border-white/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
              <div>
                <h3 className="text-xl font-montserrat font-bold text-white">
                  Évaluation des 10 Critères du Questionnaire
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Scores basés sur l'échelle officielle : 4 = Très satisfait, 3 = Satisfait, 2 = Peu satisfait, 1 = Pas du tout satisfait
                </p>
              </div>

              {/* Légende */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {SATISFACTION_LEVELS.map(lvl => (
                  <div key={lvl.value} className="flex items-center gap-1.5 text-slate-300">
                    <span className={`w-3 h-3 rounded-full ${LEVEL_MAP[lvl.value].color}`} />
                    <span>{lvl.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {totalResponses === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="font-bold text-white text-base">Aucune réponse pour le moment</p>
                <p className="text-xs max-w-sm mx-auto mt-1">
                  Dès que les apprenants soumettront leur enquête depuis leur espace étudiant, les statistiques apparaîtront ici automatiquement.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {questionStats.map((qs) => {
                  const totalAns = qs.answerCount || 1;
                  const pVery = Math.round(((qs.counts.very_satisfied || 0) / totalAns) * 100);
                  const pSat = Math.round(((qs.counts.satisfied || 0) / totalAns) * 100);
                  const pLit = Math.round(((qs.counts.little_satisfied || 0) / totalAns) * 100);
                  const pNot = Math.round(((qs.counts.not_satisfied || 0) / totalAns) * 100);

                  return (
                    <div 
                      key={qs.id} 
                      className="p-5 rounded-2xl bg-[#081220] border border-white/5 hover:border-white/10 transition-all space-y-3"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-orange/15 border border-orange/30 text-orange font-black text-xs flex items-center justify-center shrink-0">
                            {qs.id}
                          </span>
                          <div>
                            <h4 className="text-white font-bold text-sm leading-snug">
                              {qs.label}
                            </h4>
                            <span className="text-[11px] text-slate-500">
                              {qs.answerCount} réponse{qs.answerCount > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <span className="text-white font-black text-base">
                              {qs.average.toFixed(2)}
                            </span>
                            <span className="text-slate-500 text-xs font-bold"> / 4.0</span>
                            <div className="text-[11px] text-emerald-400 font-bold">
                              {qs.percent}% satisfaction
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stacked Progress Bar */}
                      <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/5">
                        {pVery > 0 && (
                          <div 
                            style={{ width: `${pVery}%` }} 
                            className="bg-emerald-500 h-full transition-all" 
                            title={`Très satisfait: ${qs.counts.very_satisfied} (${pVery}%)`}
                          />
                        )}
                        {pSat > 0 && (
                          <div 
                            style={{ width: `${pSat}%` }} 
                            className="bg-blue-500 h-full transition-all" 
                            title={`Satisfait: ${qs.counts.satisfied} (${pSat}%)`}
                          />
                        )}
                        {pLit > 0 && (
                          <div 
                            style={{ width: `${pLit}%` }} 
                            className="bg-orange-500 h-full transition-all" 
                            title={`Peu satisfait: ${qs.counts.little_satisfied} (${pLit}%)`}
                          />
                        )}
                        {pNot > 0 && (
                          <div 
                            style={{ width: `${pNot}%` }} 
                            className="bg-red-500 h-full transition-all" 
                            title={`Pas du tout satisfait: ${qs.counts.not_satisfied} (${pNot}%)`}
                          />
                        )}
                      </div>

                      {/* Percentage breakdown details */}
                      <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1 text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Très satisfait : <strong className="text-white">{qs.counts.very_satisfied} ({pVery}%)</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          Satisfait : <strong className="text-white">{qs.counts.satisfied} ({pSat}%)</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          Peu satisfait : <strong className="text-white">{qs.counts.little_satisfied} ({pLit}%)</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          Pas du tout : <strong className="text-white">{qs.counts.not_satisfied} ({pNot}%)</strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Réponses détaillées */}
      {activeTab === "submissions" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par apprenant, email ou suggestion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F1D33] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          <div className="bg-[#0F1D33] rounded-3xl border border-white/5 overflow-hidden shadow-xl">
            {filteredSurveys.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="font-bold text-white text-base">Aucune réponse trouvée</p>
                <p className="text-xs text-slate-500 mt-1">
                  Aucun résultat ne correspond aux critères de recherche.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="py-4 px-6 font-bold">Apprenant</th>
                      <th className="py-4 px-6 font-bold">Rôle / Profil</th>
                      <th className="py-4 px-6 font-bold">Date</th>
                      <th className="py-4 px-6 font-bold">Note Globale</th>
                      <th className="py-4 px-6 font-bold">Recommandations</th>
                      <th className="py-4 px-6 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredSurveys.map((survey) => {
                      const avg = getSubmissionAverage(survey.answers);
                      const hasSuggestions = survey.suggestions && survey.suggestions.trim().length > 0;

                      return (
                        <tr 
                          key={survey.id || survey.participant_email} 
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="font-bold text-white">{survey.participant_name}</div>
                            <div className="text-xs text-slate-500">{survey.participant_email}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs rounded-lg font-medium">
                              {survey.participant_role || "Participant"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-400">
                            {survey.created_at ? new Date(survey.created_at).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            }) : "—"}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${
                                avg >= 3.5 
                                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" 
                                  : avg >= 2.5 
                                    ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                    : "bg-orange/15 border-orange/30 text-orange"
                              }`}>
                                {avg.toFixed(2)} / 4.0
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-xs">
                            {hasSuggestions ? (
                              <p className="text-xs text-slate-400 line-clamp-1 italic">
                                "{survey.suggestions}"
                              </p>
                            ) : (
                              <span className="text-xs text-slate-600">—</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setSelectedSurvey(survey)}
                              className="px-3.5 py-2 bg-white/5 hover:bg-orange hover:text-white text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Voir le détail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Détail Réponse Apprenant */}
      <AnimatePresence>
        {selectedSurvey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0F1D33] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-orange uppercase tracking-wider">
                    Détail de l'enquête de satisfaction
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedSurvey.participant_name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{selectedSurvey.participant_email}</span>
                    {selectedSurvey.participant_role && (
                      <>
                        <span>•</span>
                        <span>{selectedSurvey.participant_role}</span>
                      </>
                    )}
                    {selectedSurvey.created_at && (
                      <>
                        <span>•</span>
                        <span>{new Date(selectedSurvey.created_at).toLocaleDateString("fr-FR")}</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Score moyen résumé */}
                <div className="p-4 rounded-2xl bg-[#081220] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Note Moyenne de l'Apprenant</span>
                    <div className="text-xl font-black text-white mt-0.5">
                      {getSubmissionAverage(selectedSurvey.answers).toFixed(2)} / 4.0
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Taux de Satisfaction</span>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">
                      {Math.round((getSubmissionAverage(selectedSurvey.answers) / 4) * 100)}%
                    </div>
                  </div>
                </div>

                {/* Liste des 10 critères */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Réponses aux 10 critères d'évaluation
                  </h4>
                  {SATISFACTION_QUESTIONS.map(q => {
                    const ansVal = selectedSurvey.answers?.[q.id] || selectedSurvey.answers?.[`q${q.id}`];
                    const lvl = ansVal ? LEVEL_MAP[ansVal] : null;

                    return (
                      <div 
                        key={q.id}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-white/5 text-slate-400 text-xs font-bold flex items-center justify-center shrink-0">
                            {q.id}
                          </span>
                          <span className="text-xs font-medium text-white">
                            {q.label}
                          </span>
                        </div>

                        {lvl ? (
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold border shrink-0 ${lvl.badge}`}>
                            {lvl.label} ({lvl.score}/4)
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600 italic">Non renseigné</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Suggestions & Recommandations */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Suggestions ou recommandations pour améliorer cette formation
                  </h4>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 leading-relaxed">
                    {selectedSurvey.suggestions && selectedSurvey.suggestions.trim().length > 0 ? (
                      selectedSurvey.suggestions
                    ) : (
                      <span className="text-slate-600 italic">Aucune suggestion laissée.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
