"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { Loader2, Search, FileText, CheckCircle, Mail, Phone, ExternalLink, MapPin, Briefcase, Edit2, Trash2, X } from "lucide-react";

interface ExpertApplication {
  id: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  professional_status: string;
  job_title: string;
  institution: string;
  experience_years: string;
  education_level: string;
  domains: string[];
  collaboration_types: string[];
  availability: string;
  languages: string[];
  biography: string;
  cv_link: string;
  status: string;
  created_at: string;
}

export default function ExpertsDashboard() {
  const [applications, setApplications] = useState<ExpertApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  // Edit states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<ExpertApplication | null>(null);
  const [editFormData, setEditFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    professional_status: "",
    job_title: "",
    institution: "",
    availability: "",
    status: "",
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('saninova_expert_applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('saninova_expert_applications')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette candidature d'expert ?")) return;
    try {
      const { error } = await supabase
        .from('saninova_expert_applications')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const openEditModal = (app: ExpertApplication) => {
    setEditingApp(app);
    setEditFormData({
      first_name: app.first_name || "",
      last_name: app.last_name || "",
      email: app.email || "",
      phone: app.phone || "",
      country: app.country || "",
      city: app.city || "",
      professional_status: app.professional_status || "",
      job_title: app.job_title || "",
      institution: app.institution || "",
      availability: app.availability || "",
      status: app.status || "Nouveau",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    try {
      const { error } = await supabase
        .from('saninova_expert_applications')
        .update(editFormData)
        .eq('id', editingApp.id);

      if (error) throw error;

      setApplications(applications.map(app => 
        app.id === editingApp.id ? { ...app, ...editFormData } : app
      ));
      setIsEditModalOpen(false);
      setEditingApp(null);
    } catch (err) {
      console.error("Error updating application:", err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  const filteredApps = applications.filter(app => {
    const searchString = `${app.first_name} ${app.last_name} ${app.email} ${app.domains?.join(' ')} ${app.country}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

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
          <h1 className="text-2xl font-bold font-montserrat text-white">Candidatures d'Experts</h1>
          <p className="text-slate-400 text-sm mt-1">Consultez et gérez les candidatures reçues via le formulaire d'expertise SaniNova 2026.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Rechercher (nom, email, domaine)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878] outline-none transition-all text-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {filteredApps.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400">Aucune candidature trouvée.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">Expert</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Profil & Domaines</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{app.first_name} {app.last_name}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Reçu le {new Date(app.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-300 gap-2 mb-1">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${app.email}`} className="hover:text-emerald-400">{app.email}</a>
                      </div>
                      <div className="flex items-center text-slate-300 gap-2 mb-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{app.phone || 'Non renseigné'}</span>
                      </div>
                      <div className="flex items-center text-slate-400 gap-2 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{app.city ? `${app.city}, ` : ''}{app.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-300 gap-2 mb-2 font-medium">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{app.professional_status === 'En Poste' ? `${app.job_title} chez ${app.institution}` : 'Indépendant'}</span>
                        <span className="text-slate-500 font-normal">({app.experience_years})</span>
                      </div>
                      <div className="flex flex-wrap gap-1 max-w-xs whitespace-normal">
                        {app.domains?.slice(0, 2).map((d, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
                            {d}
                          </span>
                        ))}
                        {app.domains?.length > 2 && (
                          <span className="px-2 py-0.5 bg-slate-800/50 text-slate-400 rounded text-[10px]">
                            +{app.domains.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        app.status === 'Examiné' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {app.status === 'Examiné' ? 'Examiné' : 'Nouveau'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const msg = `PRÉSENTATION:\n${app.biography || 'Non renseignée'}\n\nMODALITÉS:\nCollaborations: ${app.collaboration_types?.join(', ') || 'N/A'}\nDisponibilité: ${app.availability || 'N/A'}\nLangues: ${app.languages?.join(', ') || 'N/A'}\nNiveau: ${app.education_level || 'N/A'}`;
                            alert(msg);
                          }}
                          className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 transition-colors"
                          title="Voir les détails et modalités"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        {app.cv_link && (
                          <a
                            href={app.cv_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-slate-800 text-blue-400 hover:text-blue-300 rounded border border-slate-700 transition-colors"
                            title="Voir le Profil / CV"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {app.status !== 'Examiné' && (
                          <button
                            onClick={() => updateStatus(app.id, 'Examiné')}
                            disabled={updating === app.id}
                            className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded border border-emerald-500/20 transition-colors disabled:opacity-50"
                            title="Marquer comme examiné"
                          >
                            {updating === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(app)}
                          className="p-1.5 bg-slate-800 text-slate-300 hover:text-emerald-400 rounded border border-slate-700 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
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
              <h3 className="text-lg font-bold font-montserrat text-white">Modifier la Candidature</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    value={editFormData.first_name}
                    onChange={(e) => setEditFormData({ ...editFormData, first_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={editFormData.last_name}
                    onChange={(e) => setEditFormData({ ...editFormData, last_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Pays</label>
                  <input
                    type="text"
                    required
                    value={editFormData.country}
                    onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Ville</label>
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Statut Professionnel</label>
                  <input
                    type="text"
                    value={editFormData.professional_status}
                    onChange={(e) => setEditFormData({ ...editFormData, professional_status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Disponibilité</label>
                  <input
                    type="text"
                    value={editFormData.availability}
                    onChange={(e) => setEditFormData({ ...editFormData, availability: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Poste / Rôle</label>
                  <input
                    type="text"
                    value={editFormData.job_title}
                    onChange={(e) => setEditFormData({ ...editFormData, job_title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Institution</label>
                  <input
                    type="text"
                    value={editFormData.institution}
                    onChange={(e) => setEditFormData({ ...editFormData, institution: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Statut d'évaluation</label>
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
