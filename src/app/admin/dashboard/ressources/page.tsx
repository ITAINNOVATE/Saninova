"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { Plus, Trash2, File, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  file_type: string;
  file_url: string;
  is_free: boolean;
  price_usd: number;
  created_at: string;
}

export default function AdminRessourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("PDF");
  const [isFree, setIsFree] = useState(true);
  const [priceUsd, setPriceUsd] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const fetchResources = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("saninova_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResources(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return alert("Veuillez remplir le titre et sélectionner un fichier.");

    setIsUploading(true);
    try {
      // 1. Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw new Error("Erreur lors de l'upload du fichier: " + uploadError.message);

      const { data: { publicUrl } } = supabase.storage
        .from("resources")
        .getPublicUrl(filePath);

      // 2. Insert into database
      const { error: dbError } = await supabase
        .from("saninova_resources")
        .insert([{
          title,
          description,
          file_type: fileType,
          file_url: publicUrl,
          is_free: isFree,
          price_usd: isFree ? 0 : priceUsd
        }]);

      if (dbError) throw new Error("Erreur base de données: " + dbError.message);

      alert("Ressource ajoutée avec succès !");
      setShowForm(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setIsFree(true);
      setPriceUsd(0);
      fetchResources();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette ressource ?")) return;

    try {
      // Optionnel : Supprimer le fichier du storage (on extrait le nom du fichier depuis l'URL)
      const fileName = fileUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from("resources").remove([fileName]);
      }

      const { error } = await supabase.from("saninova_resources").delete().eq("id", id);
      if (error) throw error;
      
      setResources(resources.filter(r => r.id !== id));
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-montserrat font-bold text-white tracking-tight">Ressources</h1>
          <p className="text-slate-400 mt-1 font-poppins text-sm">Gérez les documents gratuits et payants du site.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-[#00A878] hover:bg-[#009060] text-white px-5 py-2.5 rounded-xl font-poppins font-medium transition-all shadow-lg shadow-[#00A878]/20"
        >
          <Plus className="w-5 h-5" />
          <span>{showForm ? "Fermer" : "Ajouter une ressource"}</span>
        </button>
      </div>

      {/* Formulaire d'ajout */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddResource}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden space-y-6"
          >
            <h2 className="text-lg font-poppins font-semibold text-emerald-400 border-b border-slate-800 pb-4">
              Nouvelle ressource
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Titre du document</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#00A878] outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Type de fichier affiché</label>
                <select
                  value={fileType}
                  onChange={e => setFileType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#00A878] outline-none transition-colors"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOCX">Word (DOCX)</option>
                  <option value="PPTX">PowerPoint (PPTX)</option>
                  <option value="XLSX">Excel (XLSX)</option>
                  <option value="ZIP">Archive (ZIP)</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">Description (Optionnel)</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#00A878] outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tarification</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={isFree}
                      onChange={() => setIsFree(true)}
                      className="text-[#00A878] focus:ring-[#00A878]"
                    />
                    <span className="text-slate-300">Gratuit (Inscription Newsletter)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isFree}
                      onChange={() => setIsFree(false)}
                      className="text-[#00A878] focus:ring-[#00A878]"
                    />
                    <span className="text-slate-300">Payant</span>
                  </label>
                </div>
              </div>

              {!isFree && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Prix (en USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={priceUsd}
                    onChange={e => setPriceUsd(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#00A878] outline-none transition-colors"
                    required={!isFree}
                  />
                  <p className="text-xs text-slate-500 mt-1">Sera converti en FCFA (1 USD = 600 FCFA) lors de l'achat via FedaPay.</p>
                </div>
              )}

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">Fichier à télécharger</label>
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center bg-slate-950/50 hover:bg-slate-950 transition-colors">
                  <input
                    type="file"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-10 h-10 text-slate-500 mb-3" />
                    {file ? (
                      <span className="text-[#00A878] font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {file.name}
                      </span>
                    ) : (
                      <span className="text-slate-400">Cliquez pour parcourir vos fichiers</span>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="submit"
                disabled={isUploading}
                className="bg-[#00A878] hover:bg-[#009060] text-white px-8 py-3 rounded-xl font-poppins font-medium transition-all disabled:opacity-50 flex items-center"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  "Enregistrer la ressource"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Liste des ressources */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#00A878]" />
          </div>
        ) : resources.length === 0 ? (
          <div className="p-12 text-center">
            <File className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 font-poppins">Aucune ressource disponible pour le moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 font-poppins text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Document</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Accès</th>
                  <th className="px-6 py-4 font-medium">Prix</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-poppins font-medium text-white">{res.title}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px] mt-1">{res.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded font-mono">{res.file_type}</span>
                    </td>
                    <td className="px-6 py-4">
                      {res.is_free ? (
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded font-medium">Gratuit</span>
                      ) : (
                        <span className="bg-orange/10 text-orange text-xs px-2 py-1 rounded font-medium">Payant</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300 font-medium">
                        {res.is_free ? "-" : `${res.price_usd} $`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={res.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                          title="Voir le fichier"
                        >
                          <File className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(res.id, res.file_url)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
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
    </div>
  );
}
