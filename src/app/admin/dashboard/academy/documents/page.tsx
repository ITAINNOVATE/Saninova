"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Folder, Plus, Trash2, Edit2, Download, Search, 
  FileText, ArrowLeft, Loader2, CheckCircle2, AlertCircle, 
  X, ExternalLink, Filter, BookOpen, Calendar, Upload
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CourseDocument {
  id: string;
  training_slug: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  category: string;
  created_at: string;
}

interface TrainingOption {
  slug: string;
  title: string;
}

export default function AdminCourseDocumentsPage() {
  const [documents, setDocuments] = useState<CourseDocument[]>([]);
  const [trainings, setTrainings] = useState<TrainingOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDoc, setEditingDoc] = useState<CourseDocument | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    training_slug: "officine-moderne",
    title: "",
    description: "",
    file_url: "",
    file_type: "PDF",
    category: "Support de cours",
  });

  useEffect(() => {
    fetchTrainingsAndDocs();
  }, []);

  const fetchTrainingsAndDocs = async () => {
    try {
      setLoading(true);

      // 1. Fetch available training courses from academy_trainings & announcements
      const defaultTrainings: TrainingOption[] = [
        { slug: "officine-moderne", title: "Formation Professionnelle : Gestion d’une Officine Moderne" },
        { slug: "formation-expert-supply-chain-pharmaceutique", title: "Certificat Professionnel en Supply Chain Pharmaceutique" },
        { slug: "gouvernance-sanitaire-afrique", title: "Gouvernance Sanitaire et Leadership en Afrique" },
        { slug: "sante-digitale-interoperabilite", title: "Santé Digitale et Interopérabilité en Afrique" },
        { slug: "regulation-pharmaceutique-avancee", title: "Régulation Pharmaceutique Avancée en Afrique" },
      ];

      const mergedMap = new Map<string, string>();
      defaultTrainings.forEach(t => mergedMap.set(t.slug, t.title));

      try {
        const { data: trainDb } = await supabase.from("academy_trainings").select("id, title, slug");
        if (trainDb) {
          trainDb.forEach((t: any) => {
            const s = t.slug || (t.title.includes("Officine") ? "officine-moderne" : t.id);
            mergedMap.set(s, t.title);
          });
        }
      } catch (e) {
        console.warn("Could not fetch academy_trainings:", e);
      }

      const combinedTrainings: TrainingOption[] = Array.from(mergedMap.entries()).map(([slug, title]) => ({
        slug,
        title,
      }));

      setTrainings(combinedTrainings);

      // 2. Fetch documents via dedicated API
      const res = await fetch("/api/academy/documents");
      const json = await res.json();
      if (json.success && json.documents) {
        setDocuments(json.documents);
      }
    } catch (err) {
      console.error("Error fetching course documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingDoc(null);
    setSelectedFile(null);
    setFormData({
      training_slug: selectedSlug !== "all" ? selectedSlug : "officine-moderne",
      title: "",
      description: "",
      file_url: "",
      file_type: "PDF",
      category: "Support de cours",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (doc: CourseDocument) => {
    setEditingDoc(doc);
    setSelectedFile(null);
    setFormData({
      training_slug: doc.training_slug,
      title: doc.title,
      description: doc.description || "",
      file_url: doc.file_url,
      file_type: doc.file_type || "PDF",
      category: doc.category || "Support de cours",
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Veuillez remplir le titre du document.");
      return;
    }

    if (!selectedFile && !formData.file_url.trim()) {
      alert("Veuillez soit sélectionner un fichier à téléverser, soit renseigner un lien/URL.");
      return;
    }

    try {
      setIsSubmitting(true);

      const dataToSend = new FormData();
      dataToSend.append("training_slug", formData.training_slug);
      dataToSend.append("title", formData.title.trim());
      dataToSend.append("description", formData.description.trim());
      dataToSend.append("file_type", formData.file_type);
      dataToSend.append("category", formData.category);
      dataToSend.append("file_url", formData.file_url.trim());
      if (selectedFile) {
        dataToSend.append("file", selectedFile);
      }

      const res = await fetch("/api/academy/documents", {
        method: "POST",
        body: dataToSend,
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Erreur d'enregistrement");
      }

      if (json.document) {
        setDocuments([json.document, ...documents.filter(d => d.id !== json.document.id)]);
      }

      alert("Document enregistré avec succès !");
      setIsAddModalOpen(false);
      setSelectedFile(null);
    } catch (err: any) {
      console.error("Error saving document:", err);
      alert("Erreur lors de l'enregistrement du document : " + (err.message || err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce document ?")) return;

    try {
      const res = await fetch(`/api/academy/documents?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setDocuments(documents.filter(d => d.id !== id));
    } catch (err) {
      console.error("Error deleting document:", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSlug = selectedSlug === "all" || doc.training_slug === selectedSlug;
    const matchesQuery = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSlug && matchesQuery;
  });

  const getTrainingTitle = (slug: string) => {
    const found = trainings.find(t => t.slug === slug);
    return found ? found.title : slug;
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link 
            href="/admin/dashboard/academy" 
            className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Retour SaniNova Academy
          </Link>
          <h1 className="text-3xl font-montserrat font-black text-white flex items-center gap-3">
            <Folder className="w-8 h-8 text-[#00A878]" /> Documents de Formations
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Espace de chargement et gestion des documents réservés exclusivement aux inscrits de chaque formation.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-6 py-3.5 bg-[#00A878] hover:bg-[#008f66] text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-5 h-5" /> Ajouter un Document
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
        {/* Filter by Course */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Sélectionner la formation
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#00A878] transition-all"
          >
            <option value="all">📚 Toutes les formations ({documents.length} documents)</option>
            {trainings.map(t => {
              const count = documents.filter(d => d.training_slug === t.slug).length;
              return (
                <option key={t.slug} value={t.slug}>
                  {t.title} ({count} doc{count > 1 ? "s" : ""})
                </option>
              );
            })}
          </select>
        </div>

        {/* Search Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Rechercher un document
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Titre, catégorie..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A878] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid / Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 text-[#00A878] animate-spin mb-3" />
          <p className="text-sm font-medium">Chargement des documents de cours...</p>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/20 border border-slate-800/80 rounded-3xl p-8">
          <Folder className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Aucun document trouvé</h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto mb-6">
            Aucun document n'a encore été ajouté pour cette formation. Cliquez ci-dessous pour importer le premier support.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Ajouter un document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 rounded-3xl p-6 flex flex-col justify-between transition-all group relative overflow-hidden"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    {doc.category || "Support"}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-md text-[10px] font-mono font-bold">
                    {doc.file_type || "PDF"}
                  </span>
                </div>

                {/* Course Title Badge */}
                <p className="text-[11px] text-slate-400 font-bold mb-2 truncate" title={getTrainingTitle(doc.training_slug)}>
                  🎓 {getTrainingTitle(doc.training_slug)}
                </p>

                {/* Document Title */}
                <h4 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-emerald-400 transition-colors">
                  {doc.title}
                </h4>

                {/* Description */}
                {doc.description && (
                  <p className="text-xs text-slate-400 font-poppins line-clamp-2 mb-4 leading-relaxed">
                    {doc.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-4">
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Télécharger / Voir
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(doc)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-xl font-montserrat font-black text-white flex items-center gap-2">
                  <Folder className="w-5 h-5 text-[#00A878]" />
                  {editingDoc ? "Modifier le Document" : "Ajouter un Document de Formation"}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Training Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                    Formation Destinataire *
                  </label>
                  <select
                    value={formData.training_slug}
                    onChange={(e) => setFormData({ ...formData, training_slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#00A878]"
                  >
                    {trainings.map(t => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                    Titre du document *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Agenda officiel de la formation / Support Module 1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A878]"
                  />
                </div>

                {/* Category & Format */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Catégorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A878]"
                    >
                      <option value="Agenda">Agenda & Planning</option>
                      <option value="Support de cours">Support de cours (PDF/PPT)</option>
                      <option value="Module">Module de formation</option>
                      <option value="Exercices">Exercices & Études de cas</option>
                      <option value="Documentation">Documentation générale</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Format de fichier *
                    </label>
                    <select
                      value={formData.file_type}
                      onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A878]"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX / Word</option>
                      <option value="PPTX">PPTX / PowerPoint</option>
                      <option value="ZIP">ZIP / Archive</option>
                      <option value="LIEN">Lien Externe</option>
                    </select>
                  </div>
                </div>

                {/* File Upload Option */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                    <span>Fichier du document (PDF, Word, etc.)</span>
                    <span className="text-[10px] text-[#00A878] font-bold">Sélection directe</span>
                  </label>
                  <div className="relative border border-dashed border-slate-700 hover:border-[#00A878] bg-slate-950/80 rounded-xl p-4 transition-all">
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSelectedFile(file);
                        if (file && !formData.title) {
                          setFormData({ ...formData, title: file.name.replace(/\.[^/.]+$/, "") });
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex items-center gap-3 pointer-events-none">
                      <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {selectedFile ? selectedFile.name : "Cliquez ou glissez un fichier depuis votre appareil"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} Mo` : "PDF, Word, PPTX, etc."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500 uppercase tracking-widest font-bold my-1">
                  — OU —
                </div>

                {/* File URL */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                    Lien / URL externe du document
                  </label>
                  <input
                    type="text"
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    placeholder="Ex: /documents/mon-cours.pdf ou lien externe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#00A878]"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">
                    Vous pouvez soit sélectionner un fichier ci-dessus, soit coller une URL directe.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                    Note / Description (optionnel)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Précisions pour les apprenants inscrits..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A878]"
                  />
                </div>

                {/* Modal Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#00A878] hover:bg-[#008f66] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...
                      </>
                    ) : (
                      "Enregistrer le document"
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
