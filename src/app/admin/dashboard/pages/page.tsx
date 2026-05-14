"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { useLanguage } from "../../../../context/LanguageContext";
import { 
  FileText, Save, Check, AlertCircle, Loader2, RefreshCcw, Globe, Code, 
  Layout, Home, Server, Award, MessageSquare, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Group editable fields dynamically to avoid writing 100 manual inputs
const SECTIONS = [
  {
    id: "hero",
    label: "Accueil (Hero)",
    icon: Home,
    fields: [
      { key: "hero.title", label: "Titre principal", type: "input" },
      { key: "hero.subtitle", label: "Sous-titre", type: "textarea" },
      { key: "hero.ctaPrimary", label: "Bouton Principal", type: "input" },
      { key: "hero.ctaSecondary", label: "Bouton Secondaire", type: "input" },
    ]
  },
  {
    id: "about",
    label: "Section À Propos",
    icon: Award,
    fields: [
      { key: "aboutSection.tag", label: "Tag (Surtitre)", type: "input" },
      { key: "aboutSection.title", label: "Grand Titre", type: "textarea" },
      { key: "aboutSection.desc1", label: "Description 1", type: "textarea" },
      { key: "aboutSection.desc2", label: "Description 2", type: "textarea" },
      { key: "aboutSection.cta", label: "Texte Bouton", type: "input" },
    ]
  },
  {
    id: "expertises",
    label: "Expertises Section",
    icon: Layout,
    fields: [
      { key: "expertises.tag", label: "Tag (Surtitre)", type: "input" },
      { key: "expertises.title", label: "Titre", type: "input" },
      { key: "expertises.subtitle", label: "Sous-titre", type: "textarea" },
      { key: "expertises.ctaAll", label: "Bouton tout explorer", type: "input" },
    ]
  },
  {
    id: "footer",
    label: "Navigation & Footer",
    icon: Server,
    fields: [
      { key: "footer.slogan", label: "Slogan Pied de page", type: "textarea" },
      { key: "footer.rights", label: "Droits réservés", type: "input" },
      { key: "nav.cta", label: "Bouton consultation (Navbar)", type: "input" },
    ]
  }
];

// Helper to get nested object value by string path
const getValueByPath = (obj: any, path: string): string => {
  try {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || "";
  } catch (e) {
    return "";
  }
};

// Helper to set nested object value by path mutation
const setValueByPath = (obj: any, path: string, value: any) => {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) current[part] = {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
};

export default function PagesDashboardPage() {
  const { refreshTranslations } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState("hero");
  const [viewMode, setViewMode] = useState<"form" | "json">("form");

  // Dynamic raw objects
  const [frTrans, setFrTrans] = useState<any>({});
  const [enTrans, setEnTrans] = useState<any>({});

  // Raw string editors for expert mode
  const [rawJsonFr, setRawJsonFr] = useState("");
  const [rawJsonEn, setRawJsonEn] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("saninova_site_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data) {
        setFrTrans(data.translations_fr);
        setEnTrans(data.translations_en);
        setRawJsonFr(JSON.stringify(data.translations_fr, null, 2));
        setRawJsonEn(JSON.stringify(data.translations_en, null, 2));
      }
    } catch (err: any) {
      setError("Impossible de charger la configuration : " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (lang: "fr" | "en", path: string, value: string) => {
    if (lang === "fr") {
      const updated = { ...frTrans };
      setValueByPath(updated, path, value);
      setFrTrans(updated);
      setRawJsonFr(JSON.stringify(updated, null, 2));
    } else {
      const updated = { ...enTrans };
      setValueByPath(updated, path, value);
      setEnTrans(updated);
      setRawJsonEn(JSON.stringify(updated, null, 2));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    let finalFr = frTrans;
    let finalEn = enTrans;

    // If saving in JSON mode, parse the text areas
    if (viewMode === "json") {
      try {
        finalFr = JSON.parse(rawJsonFr);
        finalEn = JSON.parse(rawJsonEn);
      } catch (err) {
        setError("Le format JSON saisi comporte des erreurs de syntaxe.");
        setIsSaving(false);
        return;
      }
    }

    try {
      const { error: updateError } = await supabase
        .from("saninova_site_settings")
        .update({
          translations_fr: finalFr,
          translations_en: finalEn,
          updated_at: new Date().toISOString()
        })
        .eq("id", 1);

      if (updateError) throw updateError;

      // Push updates back to global context state instantly
      await refreshTranslations();
      
      setSuccess(true);
      setFrTrans(finalFr);
      setEnTrans(finalEn);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError("Échec de l'enregistrement : " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-10 h-10 text-[#00A878] animate-spin mb-4" />
        <p className="font-poppins text-slate-400">Chargement de l'éditeur de pages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="pt-4">
          <Link href="/admin/dashboard" className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour au Dashboard
          </Link>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FileText className="text-[#00A878]" />
            Gestion des Contenus (Pages)
          </h1>
          <p className="font-inter text-sm text-slate-400 mt-1">
            Modifiez en direct les textes, descriptions et titres de toutes les pages de votre site.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Toggle Buttons */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex">
            <button
              onClick={() => setViewMode("form")}
              className={`px-4 py-2 rounded-lg text-xs font-poppins font-bold flex items-center gap-1.5 transition-all ${viewMode === "form" ? "bg-[#00A878] text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Éditeur Visuel</span>
            </button>
            <button
              onClick={() => setViewMode("json")}
              className={`px-4 py-2 rounded-lg text-xs font-poppins font-bold flex items-center gap-1.5 transition-all ${viewMode === "json" ? "bg-[#00A878] text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Expert JSON</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-[#00A878] hover:bg-[#00A878]/95 text-white font-poppins font-bold text-sm px-6 py-3 rounded-xl active:scale-95 shadow-lg shadow-emerald-950/20 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : success ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{success ? "Modifications Appliquées" : "Enregistrer"}</span>
          </button>
        </div>
      </div>

      {/* Feedback Bars */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-[#00A878] rounded-xl flex items-center gap-3 text-sm font-bold font-poppins animate-pulse">
          <Check className="w-5 h-5" />
          <span>Les changements sont en ligne ! Actualisez le site public pour les voir.</span>
        </div>
      )}

      {viewMode === "form" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation Bar for Tabs */}
          <div className="lg:col-span-1 space-y-1 bg-slate-900/40 p-3 rounded-2xl border border-slate-850 h-fit">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-2">Sections Editables</p>
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-poppins font-medium transition-all ${isActive ? "bg-[#00A878]/10 text-[#00A878] border border-[#00A878]/10" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Content: Fields Editor */}
          <div className="lg:col-span-3 space-y-8 bg-slate-900/40 border border-slate-800 p-6 sm:p-8 rounded-3xl">
            <div className="border-b border-slate-800 pb-4 flex items-center gap-2 text-emerald-400">
              {React.createElement(SECTIONS.find(s => s.id === activeTab)?.icon || Layout, { className: "w-5 h-5" })}
              <h2 className="font-montserrat text-lg font-extrabold text-white">
                {SECTIONS.find(s => s.id === activeTab)?.label}
              </h2>
            </div>

            <div className="space-y-10">
              {SECTIONS.find(s => s.id === activeTab)?.fields.map((field) => (
                <div key={field.key} className="space-y-3">
                  <label className="font-poppins text-xs font-bold text-slate-300 tracking-wide uppercase border-l-2 border-[#00A878] pl-2">
                    {field.label} <span className="text-[10px] text-slate-500 font-normal font-mono block mt-0.5 lowercase">clée: {field.key}</span>
                  </label>

                  {/* Side by side FR / EN inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* FR Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 font-poppins"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Version Française</span>
                      </div>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          value={getValueByPath(frTrans, field.key)}
                          onChange={(e) => handleFieldChange("fr", field.key, e.target.value)}
                          className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878] resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={getValueByPath(frTrans, field.key)}
                          onChange={(e) => handleFieldChange("fr", field.key, e.target.value)}
                          className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                        />
                      )}
                    </div>

                    {/* EN Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-400 flex items-center gap-1 font-poppins"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> English Version</span>
                      </div>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          value={getValueByPath(enTrans, field.key)}
                          onChange={(e) => handleFieldChange("en", field.key, e.target.value)}
                          className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={getValueByPath(enTrans, field.key)}
                          onChange={(e) => handleFieldChange("en", field.key, e.target.value)}
                          className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Expert JSON Code Editor */
        <div className="space-y-6">
          <div className="bg-amber-500/5 border border-amber-500/10 text-amber-400 p-4 rounded-2xl flex gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs leading-relaxed font-poppins">
              <strong>Attention Mode Expert :</strong> Vous modifiez directement la structure brute JSON du dictionnaire du site. Cela vous donne un contrôle **absolu à 100% sur TOUS les textes de toutes les pages**. Veillez à ne pas supprimer de virgules ou de guillemets pour ne pas invalider le format JSON.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-poppins text-xs font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Dictionnaire Français Brut
              </label>
              <textarea
                value={rawJsonFr}
                onChange={(e) => setRawJsonFr(e.target.value)}
                className="w-full h-[500px] bg-slate-950 text-emerald-400 font-mono text-xs p-5 rounded-2xl border border-slate-800 focus:outline-none focus:border-emerald-500 shadow-inner"
                spellCheck={false}
              />
            </div>

            <div className="space-y-2">
              <label className="font-poppins text-xs font-bold text-blue-400 tracking-wider uppercase flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Raw English Dictionary
              </label>
              <textarea
                value={rawJsonEn}
                onChange={(e) => setRawJsonEn(e.target.value)}
                className="w-full h-[500px] bg-slate-950 text-blue-300 font-mono text-xs p-5 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500 shadow-inner"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Area */}
      <div className="pt-8 border-t border-slate-800/50 flex items-center justify-end gap-4">
        <button
          onClick={loadSettings}
          disabled={isSaving}
          className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-bold font-poppins px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all active:scale-95"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Recharger/Annuler</span>
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-[#00A878] hover:bg-[#00A878]/95 text-white font-poppins font-bold text-sm px-8 py-3 rounded-xl active:scale-95 shadow-lg shadow-emerald-950/20 transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{success ? "C'est en ligne !" : "Publier les Changements"}</span>
        </button>
      </div>
    </div>
  );
}
