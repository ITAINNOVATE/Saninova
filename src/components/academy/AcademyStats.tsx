"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { BookOpen, Users, Star, Globe } from "lucide-react";

const AcademyStats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      id: "trainings",
      value: "25",
      label: t.academy.stats.trainings,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-primary",
      suffix: "+"
    },
    {
      id: "participants",
      value: "5000",
      label: t.academy.stats.participants,
      icon: <Users className="w-6 h-6" />,
      color: "bg-accent",
      suffix: "+"
    },
    {
      id: "experts",
      value: "150",
      label: t.academy.stats.experts,
      icon: <Star className="w-6 h-6" />,
      color: "bg-orange",
      suffix: "+"
    },
    {
      id: "countries",
      value: "15",
      label: t.academy.stats.countries,
      icon: <Globe className="w-6 h-6" />,
      color: "bg-indigo-600",
      suffix: "+"
    },
  ];

  return (
    <section className="relative z-30 -mt-12 mb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center group hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center mb-4 shadow-lg shadow-${stat.color.split('-')[1]}/20 group-hover:rotate-6 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-montserrat font-black text-dark mb-1">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-sm font-semibold text-dark/50 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyStats;
