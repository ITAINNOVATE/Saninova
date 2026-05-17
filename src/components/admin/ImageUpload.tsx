"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Upload, X, Loader2, Image as ImageIcon, Folder, Check } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  label?: string;
}

const GALLERY_IMAGES = [
  { name: "Santé Digitale (Publication)", url: "/images/publication_digital_health.png" },
  { name: "Gouvernance (Publication)", url: "/images/publication_governance.png" },
  { name: "Supply Chain (Publication)", url: "/images/publication_supply_chain.png" },
  { name: "Fond Publications 1", url: "/images/bg_publications.png" },
  { name: "Fond Publications 2", url: "/images/bg_publications2.png" },
  { name: "À Propos Section", url: "/images/about_section.png" },
  { name: "Fond À Propos 1", url: "/images/bg_about.png" },
  { name: "Fond À Propos 2", url: "/images/bg_about2.png" },
  { name: "Fond Contact 1", url: "/images/bg_contact.png" },
  { name: "Fond Contact 2", url: "/images/bg_contact2.png" },
  { name: "Fond Expertises 1", url: "/images/bg_expertises.png" },
  { name: "Fond Expertises 2", url: "/images/bg_expertises2.png" },
  { name: "Fond Services 1", url: "/images/bg_services.png" },
  { name: "Fond Services 2", url: "/images/bg_services2.png" },
  { name: "Directeur Général", url: "/images/director.png" },
  { name: "Dr. Hope Akohouvi Amou", url: "/images/photo_hope.png" },
  { name: "Arrière-plan Hero 1", url: "/images/hero_background.png" },
  { name: "Arrière-plan Hero 2", url: "/images/hero_background2.png" },
  { name: "Arrière-plan Hero 3", url: "/images/hero_background3.png" },
  { name: "Logo SaniNova", url: "/images/logo.png" }
];

export default function ImageUpload({ value, onChange, bucket = "academy", label = "Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "gallery">("upload");

  // Automatically switch tab based on initial value type (folder vs custom upload)
  useEffect(() => {
    if (value && value.startsWith("/images/")) {
      setActiveTab("gallery");
    } else if (value) {
      setActiveTab("upload");
    }
  }, [value]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error: any) {
      alert("Erreur lors de l'upload: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
        
        {/* Tab selector */}
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold font-poppins transition-all flex items-center gap-1 ${activeTab === "upload" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
          >
            <Upload className="w-3 h-3" /> Uploader
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`px-3 py-1 rounded-md text-[10px] font-bold font-poppins transition-all flex items-center gap-1 ${activeTab === "gallery" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
          >
            <Folder className="w-3 h-3" /> Choisir du dossier
          </button>
        </div>
      </div>
      
      {activeTab === "upload" ? (
        value ? (
          /* Preview when value exists and upload tab is active */
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
              <button 
                type="button"
                onClick={() => onChange("")}
                className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg font-poppins font-bold text-xs flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Supprimer l'image
              </button>
            </div>
          </div>
        ) : (
          /* Drag and drop/click to upload area */
          <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer group">
            {isUploading ? (
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
            ) : (
              <>
                <div className="p-4 rounded-full bg-slate-900 mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-500" />
                </div>
                <p className="text-sm font-bold text-slate-400 group-hover:text-emerald-500 font-poppins">Cliquez pour uploader</p>
                <p className="text-[10px] text-slate-600 mt-2 font-medium">JPG, PNG, WebP (Max 5MB)</p>
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        )
      ) : (
        /* Gallery Tab: Always render gallery grid so user can select/deselect at any time! */
        <div className="space-y-4 animate-fadeIn">
          {value && (
            <div className="relative aspect-video sm:h-28 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <button 
                  type="button"
                  onClick={() => onChange("")}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all text-[10px] font-bold font-poppins flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Retirer la sélection
                </button>
              </div>
            </div>
          )}
          
          <div className="border border-slate-800 rounded-2xl bg-slate-950/60 p-4 max-h-[240px] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GALLERY_IMAGES.map((img, idx) => {
                const isSelected = value === img.url;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange(img.url)}
                    className={`relative aspect-video rounded-xl overflow-hidden border transition-all text-left group ${isSelected ? "border-[#00A878] ring-1 ring-[#00A878]" : "border-slate-800 hover:border-slate-700"}`}
                  >
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2 flex flex-col justify-between">
                      <div className="flex justify-end">
                        {isSelected && (
                          <span className="p-1 bg-[#00A878] rounded-full text-white">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-white tracking-wide truncate">{img.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
