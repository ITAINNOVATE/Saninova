"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Loader2, Search, FileText, CheckCircle, Mail, Phone, 
  ExternalLink, Briefcase, Edit2, Trash2, X, AlertCircle, 
  ArrowLeft, Download, Filter, Check, Ban, Clock
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface JobApplication {
  id: string;
  announcement_id: string;
  name: string;
  email: string;
  phone: string;
  cv_url: string;
  motivation_letter_url: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface Announcement {
  id: string;
  title: string;
  type: string;
}

export default function JobApplicationsDashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Nouveau",
    message: ""
  });

  const [viewingMessage, setViewingMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Fetch announcements to get titles
      const { data: annData, error: annErr } = await supabase
        .from("academy_announcements")
        .select("id, title, type")
        .eq("type", "Recrutement");
      
      if (annErr) throw annErr;
      setAnnouncements(annData || []);

      // 2. Fetch applications
      const { data: appData, error: appErr } = await supabase
        .from("saninova_job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (appErr) throw appErr;
      setApplications(appData || []);
    } catch (err) {
      console.error("Error fetching job applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("saninova_job_applications")
        .update({ status: newStatus })
        .eq("id", id);
        
      if (error) throw error;
      
      setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      console.error("Error updating application status:", err);
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette candidature ? Cette action est irréversible.")) return;
    try {
      const { error } = await supabase
        .from("saninova_job_applications")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const openEditModal = (app: JobApplication) => {
    setEditingApp(app);
    setEditFormData({
      name: app.name || "",
      email: app.email || "",
      phone: app.phone || "",
      status: app.status || "Nouveau",
      message: app.message || ""
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    try {
      const { error } = await supabase
        .from("saninova_job_applications")
        .update({
          name: editFormData.name.trim(),
          email: editFormData.email.trim().toLowerCase(),
          phone: editFormData.phone.trim(),
          status: editFormData.status,
          message: editFormData.message.trim() || null
        })
        .eq("id", editingApp.id);

      if (error) throw error;

      setApplications(applications.map(app => 
        app.id === editingApp.id 
          ? { 
              ...app, 
              name: editFormData.name.trim(),
              email: editFormData.email.trim().toLowerCase(),
              phone: editFormData.phone.trim(),
              status: editFormData.status,
              message: editFormData.message.trim() || null
            } 
          : app
      ));
      setIsEditModalOpen(false);
      setEditingApp(null);
    } catch (err) {
      console.error("Error editing application:", err);
      alert("Erreur lors de la modification.");
    }
  };

  // Build a lookup map for announcements
  const announcementMap = announcements.reduce((acc, curr) => {
    acc[curr.id] = curr.title;
    return acc;
  }, {} as Record<string, string>);

  const filteredApps = applications.filter(app => {
    const announcementTitle = announcementMap[app.announcement_id] || "Offre supprimée";
    const matchesSearch = `${app.name} ${app.email} ${app.phone} ${announcementTitle}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedAnnouncementId === "all" || app.announcement_id === selectedAnnouncementId;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 py-32">
        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
        <p className="font-poppins">Chargement des candidatures de recrutement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/admin/dashboard/academy" className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour Academy
          </Link>
          <h1 className="text-3xl font-montserrat font-black text-white">Candidatures Recrutement</h1>
          <p className="text-slate-400 text-sm mt-1">Consultez et gérez les dossiers de candidature soumis en ligne pour les offres de recrutement.</p>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Rechercher par nom, email, téléphone ou poste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878] outline-none transition-all text-white font-poppins"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
        </div>

        {/* Dropdown Filter */}
        <div className="relative shrink-0 w-full lg:w-72">
          <select
            value={selectedAnnouncementId}
            onChange={(e) => setSelectedAnnouncementId(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:border-[#00A878] outline-none transition-all font-poppins appearance-none cursor-pointer"
          >
            <option value="all">Toutes les offres de recrutement</option>
            {announcements.map((ann) => (
              <option key={ann.id} value={ann.id}>
                {ann.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <Filter className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {filteredApps.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Briefcase className="w-8 h-8" />
            </div>
            <p className="text-slate-400 font-poppins text-sm">Aucune candidature correspondante.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800/30 text-slate-400 border-b border-slate-800 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-8 py-5">Candidat</th>
                  <th className="px-6 py-5">Poste visé</th>
                  <th className="px-6 py-5">Contact</th>
                  <th className="px-6 py-5">Pièces Jointes</th>
                  <th className="px-6 py-5">Statut</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredApps.map((app) => {
                  const jobTitle = announcementMap[app.announcement_id] || "Offre supprimée";
                  return (
                    <tr key={app.id} className="hover:bg-slate-800/20 transition-colors group">
                      {/* Nom / Date */}
                      <td className="px-8 py-5">
                        <div className="font-bold text-white font-poppins">{app.name}</div>
                        <div className="text-[10px] text-slate-500 mt-1 font-poppins font-medium">
                          Soumis le {new Date(app.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à {new Date(app.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Poste */}
                      <td className="px-6 py-5">
                        <div className="text-slate-200 font-medium font-poppins max-w-xs truncate" title={jobTitle}>
                          {jobTitle}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <div className="flex items-center text-slate-300 gap-2 mb-1 font-poppins text-xs font-semibold">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <a href={`mailto:${app.email}`} className="hover:text-emerald-400 transition-colors">{app.email}</a>
                        </div>
                        <div className="flex items-center text-slate-300 gap-2 font-poppins text-xs font-semibold">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <a href={`tel:${app.phone}`} className="hover:text-emerald-400 transition-colors">{app.phone}</a>
                        </div>
                      </td>

                      {/* Pièces jointes */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1.5">
                          {app.cv_url && (
                            <a
                              href={app.cv_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold font-poppins"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Curriculum Vitae</span>
                              <Download className="w-3 h-3" />
                            </a>
                          )}
                          {app.motivation_letter_url ? (
                            <a
                              href={app.motivation_letter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold font-poppins"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Lettre de Motivation</span>
                              <Download className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-poppins">Lettre non jointe</span>
                          )}
                        </div>
                      </td>

                      {/* Statut */}
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          app.status === 'Nouveau' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          app.status === 'Examiné' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          app.status === 'Accepté' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {app.status || 'Nouveau'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {app.message && (
                            <button
                              onClick={() => setViewingMessage(app.message)}
                              className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-all cursor-pointer"
                              title="Voir le message d'accompagnement"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          )}
                          
                          {/* Quick Status Buttons */}
                          {app.status === 'Nouveau' && (
                            <button
                              onClick={() => updateStatus(app.id, 'Examiné')}
                              disabled={updatingId === app.id}
                              className="p-2 bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg border border-slate-700 transition-all disabled:opacity-50 cursor-pointer"
                              title="Marquer comme Examiné"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => openEditModal(app)}
                            className="p-2 bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg border border-slate-700 transition-all cursor-pointer"
                            title="Modifier les informations"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-2 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-slate-700 transition-all cursor-pointer"
                            title="Supprimer la candidature"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Viewing Message Modal */}
      {viewingMessage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setViewingMessage(null)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-montserrat text-white">Message d'accompagnement</h3>
              <button onClick={() => setViewingMessage(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl text-slate-300 font-poppins text-sm leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
              {viewingMessage}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewingMessage(null)}
                className="px-6 py-2.5 bg-slate-850 hover:bg-slate-800 text-sm font-bold text-white rounded-xl transition-all cursor-pointer font-poppins"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-montserrat text-white">Modifier la Candidature</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 font-poppins">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nom complet</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-sm text-white rounded-xl focus:border-[#00A878] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Adresse Email</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-sm text-white rounded-xl focus:border-[#00A878] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Téléphone</label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-sm text-white rounded-xl focus:border-[#00A878] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Statut de la candidature</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-sm text-white rounded-xl focus:border-[#00A878] outline-none transition-all cursor-pointer"
                >
                  <option value="Nouveau">Nouveau</option>
                  <option value="Examiné">Examiné</option>
                  <option value="Accepté">Accepté</option>
                  <option value="Refusé">Refusé</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message d'accompagnement</label>
                <textarea
                  value={editFormData.message}
                  onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-sm text-white rounded-xl focus:border-[#00A878] outline-none transition-all resize-none"
                  placeholder="Aucun message d'accompagnement..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 font-poppins">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-850 hover:bg-slate-800 text-sm font-bold text-white rounded-xl transition-all cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00A878] hover:bg-[#00A878]/90 text-sm font-bold text-white rounded-xl transition-all cursor-pointer"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
