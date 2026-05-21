"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { staticModules } from "../../lib/academyHelpers";

const FeaturedTrainings: React.FC = () => {
  // Select 3 premium modules from the staticModules catalogue
  const trainings = staticModules.slice(0, 3).map((m) => ({
    id: m.id,
    slug: m.slug,
    title: m.title,
    short_description: m.short_description,
    date: m.date,
    time: "24h/7 Asynchrone",
    location: m.location,
    price: parseInt(m.price).toLocaleString('fr-FR'),
    currency: m.currency,
    format: "eLearning",
    image: m.image_url,
    category: m.category
  }));

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
          <div className="relative aspect-square overflow-hidden">
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
