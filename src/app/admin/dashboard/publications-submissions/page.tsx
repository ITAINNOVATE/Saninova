"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { Loader2, Search, CheckCircle, Mail, Phone, ExternalLink, Download, FileText, Image as ImageIcon, Edit2, Trash2, X } from "lucide-react";

interface PublicationSubmission {
  id: string;
  structure: string;
  author: string;
  title: string;
  content_file_url: string;
  image_url: string | null;
  email: string;
  contact: string;
  status: string;
  created_at: string;
}

export default function PublicationSubmissionsDashboard() {
  const [submissions, setSubmissions] = useState<PublicationSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  // Edit states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<PublicationSubmission | null>(null);
  const [editFormData, setEditFormData] = useState<any>({
    author: "",
    structure: "",
    title: "",
    email: "",
    contact: "",
    status: "",
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('saninova_publication_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette soumission ?")) return;
    try {
      const { error } = await supabase
        .from('saninova_publication_submissions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setSubmissions(submissions.filter(sub => sub.id !== id));
    } catch (err) {
      console.error("Error deleting submission:", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const openEditModal = (sub: PublicationSubmission) => {
    setEditingSub(sub);
    setEditFormData({
      author: sub.author || "",
      structure: sub.structure || "",
      title: sub.title || "",
      email: sub.email || "",
      contact: sub.contact || "",
      status: sub.status || "Nouveau",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;

    try {
      const { error } = await supabase
        .from('saninova_publication_submissions')
        .update(editFormData)
        .eq('id', editingSub.id);

      if (error) throw error;

      setSubmissions(submissions.map(sub => 
        sub.id === editingSub.id ? { ...sub, ...editFormData } : sub
      ));
      setIsEditModalOpen(false);
      setEditingSub(null);
    } catch (err) {
      console.error("Error updating submission:", err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('saninova_publication_submissions')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdating(null);
    }
  };

  const filteredSubs = submissions.filter(sub => 
    sub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.structure.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#00A878] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-white">Soumissions de Publications</h1>
          <p className="text-slate-400 text-sm mt-1">Examinez les articles et études proposés par les visiteurs.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Rechercher (auteur, titre, structure)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878] outline-none transition-all text-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {filteredSubs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400">Aucune soumission trouvée.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">Auteur & Structure</th>
                  <th className="px-6 py-4 font-medium">Titre de la Publication</th>
                  <th className="px-6 py-4 font-medium">Fichiers</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{sub.author}</div>
                      <div className="text-xs text-slate-400 mt-1">{sub.structure}</div>
                      <div className="flex flex-col gap-1 mt-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1"><Mail className="w-3 h-3"/> {sub.email}</div>
                        {sub.contact && <div className="flex items-center gap-1"><Phone className="w-3 h-3"/> {sub.contact}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-normal min-w-[250px]">
                      <div className="font-medium text-slate-200 line-clamp-2">{sub.title}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Soumis le {new Date(sub.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <a 
                          href={sub.content_file_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1.5 rounded-md w-fit"
                        >
                          <FileText className="w-3.5 h-3.5" /> Télécharger Doc
                        </a>
                        {sub.image_url && (
                          <a 
                            href={sub.image_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2.5 py-1.5 rounded-md w-fit"
                          >
                            <ImageIcon className="w-3.5 h-3.5" /> Voir Image
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        sub.status === 'Examiné' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {sub.status === 'Examiné' ? 'Examiné' : 'Nouveau'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {sub.status !== 'Examiné' && (
                          <button
                            onClick={() => updateStatus(sub.id, 'Examiné')}
                            disabled={updating === sub.id}
                            className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded border border-emerald-500/20 transition-colors disabled:opacity-50"
                            title="Marquer comme examiné"
                          >
                            {updating === sub.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(sub)}
                          className="p-1.5 bg-slate-800 text-slate-300 hover:text-emerald-400 rounded border border-slate-700 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1.5 bg-slate-800 text-slate-300 hover:text-red-400 rounded border border-slate-700 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-montserrat text-white">Modifier la Soumission</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Auteur</label>
                <input
                  type="text"
                  required
                  value={editFormData.author}
                  onChange={(e) => setEditFormData({ ...editFormData, author: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Structure</label>
                <input
                  type="text"
                  required
                  value={editFormData.structure}
                  onChange={(e) => setEditFormData({ ...editFormData, structure: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Titre de la Publication</label>
                <textarea
                  required
                  rows={2}
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Contact</label>
                  <input
                    type="text"
                    value={editFormData.contact}
                    onChange={(e) => setEditFormData({ ...editFormData, contact: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Statut</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                >
                  <option value="Nouveau">Nouveau</option>
                  <option value="Examiné">Examiné</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 font-poppins">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-sm font-bold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00A878] hover:bg-[#00A878]/90 text-sm font-bold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
