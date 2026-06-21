"use client";

import React from "react";
import { Download, FileText, Lock, Unlock, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  file_type: string;
  file_url: string;
  is_free: boolean;
  price_usd: number;
}

interface ResourceCardProps {
  resource: Resource;
  onDownloadFree: (resource: Resource) => void;
  onBuy: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownloadFree, onBuy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
    >
      {/* Type badge */}
      <div className="absolute top-6 right-6 bg-slate-100 text-slate-500 font-mono text-xs font-bold px-3 py-1 rounded-lg">
        {resource.file_type}
      </div>

      <div className="flex items-start space-x-4 mb-4">
        <div className={`p-4 rounded-2xl flex items-center justify-center shrink-0 ${resource.is_free ? 'bg-emerald-50 text-emerald-600' : 'bg-orange/10 text-orange'}`}>
          <FileText className="w-8 h-8" />
        </div>
        <div className="pt-1 pr-12">
          <h3 className="font-montserrat font-bold text-lg text-slate-900 leading-tight">
            {resource.title}
          </h3>
          <div className="flex items-center space-x-2 mt-2">
            {resource.is_free ? (
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <Unlock className="w-3 h-3 mr-1" /> Gratuit
              </span>
            ) : (
              <span className="flex items-center text-xs font-semibold text-orange bg-orange/10 px-2 py-0.5 rounded-md">
                <Lock className="w-3 h-3 mr-1" /> Payant ({resource.price_usd} $)
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="font-inter text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
        {resource.description || "Aucune description fournie pour ce document."}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-100">
        {resource.is_free ? (
          <button
            onClick={() => onDownloadFree(resource)}
            className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-poppins font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger (Inscription requise)</span>
          </button>
        ) : (
          <button
            onClick={() => onBuy(resource)}
            className="w-full flex items-center justify-center space-x-2 bg-orange hover:bg-orange/90 text-white py-3 rounded-xl font-poppins font-medium transition-colors shadow-lg shadow-orange/20"
          >
            <CreditCard className="w-4 h-4" />
            <span>Acheter ({resource.price_usd} $)</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
