"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { Loader2, Search, FileText, CheckCircle, Mail, Phone, ExternalLink } from "lucide-react";

interface ExpertApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  domain: string;
  cv_link: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ExpertsDashboard() {
  const [applications, setApplications] = useState<ExpertApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

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

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.domain.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold font-montserrat text-white">Candidatures d'Experts</h1>
          <p className="text-slate-400 text-sm mt-1">Consultez et gérez les candidatures reçues via le formulaire d'expertise.</p>
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
                  <th className="px-6 py-4 font-medium">Domaine & Profil</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{app.name}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Reçu le {new Date(app.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-300 gap-2 mb-1">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${app.email}`} className="hover:text-emerald-400">{app.email}</a>
                      </div>
                      {app.phone && (
                        <div className="flex items-center text-slate-300 gap-2">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{app.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-block px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-xs mb-2">
                        {app.domain}
                      </div>
                      {app.cv_link && (
                        <div>
                          <a href={app.cv_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                            Voir le CV/Profil <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
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
                            const msg = `Motivation / Présentation:\n\n${app.message}`;
                            alert(msg);
                          }}
                          className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 transition-colors"
                          title="Lire le message"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
