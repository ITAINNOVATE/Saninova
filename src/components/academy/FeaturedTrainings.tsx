"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const FeaturedTrainings: React.FC = () => {
  // Mockup data for trainings
  const trainings = [
    {
      id: "1",
      slug: "gouvernance-sanitaire-afrique",
      title: "Gouvernance Sanitaire et Leadership en Afrique",
      short_description: "Un programme intensif pour les décideurs souhaitant transformer les politiques de santé publique.",
      date: "15 Juin 2026",
      time: "09:00 - 17:00",
      location: "Cotonou / Hybride",
      price: "250.000",
      currency: "XOF",
      format: "Hybride",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80",
      category: "Gouvernance"
    },
    {
      id: "2",
      slug: "sante-digitale-interoperabilite",
      title: "Santé Digitale et Interopérabilité des Systèmes",
      short_description: "Maîtrisez les standards DHIS2 et l'intégration des dossiers patients informatisés.",
      date: "02 Juillet 2026",
      time: "14:00 - 18:00",
      location: "En ligne",
      price: "150.000",
      currency: "XOF",
      format: "En ligne",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
      category: "Digital"
    },
    {
      id: "3",
      slug: "regulation-pharmaceutique-avancee",
      title: "Régulation Pharmaceutique et Assurance Qualité",
      short_description: "Expertise sur les cadres réglementaires et l'homologation des produits de santé.",
      date: "20 Juillet 2026",
      time: "09:00 - 16:00",
      location: "Dakar / Présentiel",
      price: "350.000",
      currency: "XOF",
      format: "Présentiel",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80",
      category: "Pharma"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {trainings.map((training, index) => (
        <motion.div
          key={training.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-dark/5 flex flex-col h-full hover:shadow-2xl transition-all duration-500"
        >
          {/* Card Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img 
              src={training.image} 
              alt={training.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-orange/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                {training.category}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
              <div className="flex items-center gap-1 font-black text-xl">
                {training.price} <span className="text-sm font-medium">{training.currency}</span>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg">
                {training.format}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-montserrat font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {training.title}
            </h3>
            <p className="text-dark/60 text-sm font-poppins mb-6 line-clamp-3">
              {training.short_description}
            </p>

            <div className="space-y-3 mt-auto border-t border-dark/5 pt-4">
              <div className="flex items-center text-xs font-medium text-dark/70">
                <Calendar className="w-4 h-4 mr-2 text-accent" />
                {training.date}
              </div>
              <div className="flex items-center text-xs font-medium text-dark/70">
                <MapPin className="w-4 h-4 mr-2 text-accent" />
                {training.location}
              </div>
            </div>

            <Link 
              href={`/academy/trainings/${training.slug}`}
              className="mt-6 w-full py-3 bg-dark text-white rounded-xl font-bold flex items-center justify-center group/btn hover:bg-primary transition-all overflow-hidden relative"
            >
              <span className="relative z-10 mr-2">Voir les détails</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedTrainings;
