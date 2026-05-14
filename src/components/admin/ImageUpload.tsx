"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, bucket = "academy", label = "Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

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
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      
      {value ? (
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button 
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer group">
          {isUploading ? (
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          ) : (
            <>
              <div className="p-4 rounded-full bg-slate-900 mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-500" />
              </div>
              <p className="text-sm font-bold text-slate-500 group-hover:text-emerald-500">Cliquez pour uploader</p>
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
      )}
    </div>
  );
}
