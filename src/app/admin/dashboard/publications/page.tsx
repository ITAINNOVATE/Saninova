"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { 
  BookOpen, Plus, Trash2, Edit3, Calendar, Clock, Image as ImageIcon, 
  X, Loader2, Save, AlertCircle, Search, Globe, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Publication {
  id: string;
  created_at: string;
  category: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
  date_fr: string;
  date_en: string;
  read_time_fr: string;
  read_time_en: string;
  image_url: string;
}

const CATEGORIES = [
  { value: "digital", label: "Santé Digitale" },
  { value: "governance", label: "Gouvernance" },
  { value: "supply", label: "Supply Chain" },
  { value: "reforms", label: "Réformes Sanitaires" },
  { value: "ai", label: "IA & Santé" },
  { value: "security", label: "Sécurité Sanitaire" },
];

const INITIAL_FORM = {
  category: "digital",
  title_fr: "",
  title_en: "",
  desc_fr: "",
  desc_en: "",
  date_fr: "",
  date_en: "",
  read_time_fr: "8 min",
  read_time_en: "8 min",
  image_url: "",
};

export default function PublicationsDashboardPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form & Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("saninova_publications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPublications(data || []);
    } catch (err) {
      console.error("Error fetching publications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleOpenModal = (pub?: Publication) => {
    setError(null);
    if (pub) {
      setEditingPub(pub);
      setFormData({
        category: pub.category,
        title_fr: pub.title_fr,
        title_en: pub.title_en,
        desc_fr: pub.desc_fr,
        desc_en: pub.desc_en,
        date_fr: pub.date_fr,
        date_en: pub.date_en,
        read_time_fr: pub.read_time_fr,
        read_time_en: pub.read_time_en,
        image_url: pub.image_url,
      });
    } else {
      setEditingPub(null);
      // Set current date formatted as default fallback
      const today = new Date();
      const formattedFR = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      const formattedEN = today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
      setFormData({
        ...INITIAL_FORM,
        date_fr: formattedFR,
        date_en: formattedEN,
      });
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingPub(null);
    setFormData(INITIAL_FORM);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    // Basic validations
    if (!formData.title_fr || !formData.title_en || !formData.image_url) {
      setError("Veuillez remplir au moins les titres (FR/EN) et le lien de l'image.");
      setIsSaving(false);
      return;
    }

    try {
      if (editingPub) {
        // Update
        const { error: err } = await supabase
          .from("saninova_publications")
          .update(formData)
          .eq("id", editingPub.id);
        if (err) throw err;
      } else {
        // Insert
        const { error: err } = await supabase
          .from("saninova_publications")
          .insert([formData]);
        if (err) throw err;
      }

      await fetchPublications();
      handleCloseModal();
    } catch (err: any) {
      console.error("Save failed:", err);
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette publication ?")) return;
    try {
      const { error } = await supabase.from("saninova_publications").delete().eq("id", id);
      if (error) throw error;
      setPublications(publications.filter(p => p.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  const filteredPublications = publications.filter(
    (p) =>
      p.title_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="text-[#00A878]" />
            Gestionnaire de Publications (CMS)
          </h1>
          <p className="font-inter text-sm text-slate-400 mt-1">
            Ajoutez, modifiez et gérez les actualités, les études et rapports stratégiques de SaniNova.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00A878] to-emerald-600 text-white font-poppins font-bold text-sm px-6 py-3.5 rounded-2xl active:scale-95 shadow-lg shadow-emerald-950/20 hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Publication</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3.5 shadow-lg shadow-black/20">
        <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
        <input
          type="text"
          placeholder="Rechercher une publication par son titre ou sa catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500 w-full font-poppins"
        />
      </div>

      {/* Publications Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[350px] bg-slate-900/50 border border-slate-800 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : filteredPublications.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 py-20 rounded-3xl text-center border-dashed">
          <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="font-poppins font-bold text-slate-400">Aucune publication</h3>
          <p className="font-inter text-xs text-slate-500 mt-1">Commencez par en ajouter une en haut à droite.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub) => (
            <motion.div
              layout
              key={pub.id}
              className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group relative shadow-lg"
            >
              {/* Top image wrapper */}
              <div className="relative h-48 bg-slate-950 overflow-hidden shrink-0">
                <img 
                  src={pub.image_url || "/images/placeholder.png"} 
                  alt={pub.title_fr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur text-[#00A878] border border-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-poppins font-bold tracking-wider uppercase">
                  {CATEGORIES.find(c => c.value === pub.category)?.label || pub.category}
                </div>
              </div>

              {/* Content wrapper */}
              <div className="p-6 flex-1 flex flex-col space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-900/80">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-4 text-[11px] font-poppins text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {pub.date_fr}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pub.read_time_fr}</span>
                  </div>
                  <h3 className="font-montserrat font-extrabold text-slate-100 text-base tracking-tight line-clamp-2 leading-snug">
                    {pub.title_fr}
                  </h3>
                  <p className="font-inter text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {pub.desc_fr}
                  </p>
                </div>

                {/* Language translation badge */}
                <div className="flex items-center space-x-1.5 text-[10px] font-bold tracking-wide text-slate-500">
                  <Globe className="w-3 h-3" /> 
                  <span>Traduction EN :</span>
                  <span className="text-emerald-400">Disponible</span>
                </div>

                {/* Actions footer of the card */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenModal(pub)}
                    className="flex items-center space-x-2 text-xs font-bold font-poppins text-emerald-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-500/5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => handleDelete(pub.id)}
                    className="flex items-center space-x-2 text-xs font-bold font-poppins text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded-lg hover:bg-red-500/5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Publication Form Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40 shrink-0">
                <h2 className="font-montserrat text-lg font-extrabold text-white flex items-center gap-2">
                  <FileText className="text-[#00A878]" />
                  {editingPub ? "Modifier la Publication" : "Nouvelle Publication"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content form */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Section 1: Global Information */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold font-poppins text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                    1. Informations Générales & Média
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-poppins text-xs font-bold text-slate-300 uppercase tracking-wider block">Catégorie</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878]"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value} className="bg-slate-900 text-white">{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-poppins text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-500" /> Lien de l'image (URL)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="/images/publication_custom.png ou https://..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                      />
                    </div>
                  </div>

                  {/* Image preview widget */}
                  {formData.image_url && (
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img src={formData.image_url} alt="Prévisualisation" className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold bg-slate-950/80 text-slate-400 border border-slate-800 px-3 py-1 rounded-full">Prévisualisation du média</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: French Content */}
                <div className="space-y-5 bg-slate-950/30 border border-slate-850 p-6 rounded-2xl">
                  <h3 className="text-xs font-bold font-poppins text-emerald-400 uppercase tracking-widest border-b border-emerald-500/10 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> 2. Contenu Français
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="font-poppins text-xs font-bold text-slate-300 uppercase">Titre (FR)</label>
                    <input
                      type="text"
                      required
                      placeholder="Le titre accrocheur en français..."
                      value={formData.title_fr}
                      onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                      className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-poppins text-xs font-bold text-slate-300 uppercase">Description courte (FR)</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Résumé ou introduction en français..."
                      value={formData.desc_fr}
                      onChange={(e) => setFormData({ ...formData, desc_fr: e.target.value })}
                      className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-poppins text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> Date d'affichage (FR)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: 12 Avril 2026"
                        value={formData.date_fr}
                        onChange={(e) => setFormData({ ...formData, date_fr: e.target.value })}
                        className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-poppins text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> Temps de lecture (FR)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: 8 min"
                        value={formData.read_time_fr}
                        onChange={(e) => setFormData({ ...formData, read_time_fr: e.target.value })}
                        className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: English Content */}
                <div className="space-y-5 bg-slate-950/30 border border-slate-850 p-6 rounded-2xl">
                  <h3 className="text-xs font-bold font-poppins text-blue-400 uppercase tracking-widest border-b border-blue-500/10 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> 3. English Content
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="font-poppins text-xs font-bold text-slate-300 uppercase">Title (EN)</label>
                    <input
                      type="text"
                      required
                      placeholder="The compelling English title..."
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-poppins text-xs font-bold text-slate-300 uppercase">Short Description (EN)</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="English summary or summary details..."
                      value={formData.desc_en}
                      onChange={(e) => setFormData({ ...formData, desc_en: e.target.value })}
                      className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-poppins text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> Display Date (EN)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: April 12, 2026"
                        value={formData.date_en}
                        onChange={(e) => setFormData({ ...formData, date_en: e.target.value })}
                        className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-poppins text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> Reading Time (EN)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: 8 min"
                        value={formData.read_time_en}
                        onChange={(e) => setFormData({ ...formData, read_time_en: e.target.value })}
                        className="w-full bg-slate-850 border border-slate-750 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00A878]"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions Area */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-end space-x-4 shrink-0 bg-slate-900 font-poppins">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 rounded-xl active:scale-95"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-8 py-3 rounded-xl active:scale-95 shadow-lg shadow-emerald-950/20 disabled:opacity-70 transition-all"
                  >
                    {isSaving ? (
                      <>
                        <span>Enregistrement...</span>
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Enregistrer la publication</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
