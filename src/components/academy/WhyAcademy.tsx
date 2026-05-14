"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { CheckCircle2, ShieldCheck, UserCheck, GraduationCap, Laptop, Users, TrendingUp } from "lucide-react";

const WhyAcademy: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <ShieldCheck className="w-8 h-8" />,
    <UserCheck className="w-8 h-8" />,
    <GraduationCap className="w-8 h-8" />,
    <Laptop className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
    <TrendingUp className="w-8 h-8" />,
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-light/30 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange font-bold tracking-widest text-sm uppercase mb-4 block">
            {t.academy.why.tag}
          </span>
          <h2 className="text-3xl md:text-5xl font-montserrat font-black text-dark mb-6 leading-tight">
            {t.academy.why.title}
          </h2>
          <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {t.academy.why.points.map((point: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                {icons[index]}
              </div>
              <h3 className="text-xl font-montserrat font-extrabold text-dark mb-3 group-hover:text-primary transition-colors">
                {point.title}
              </h3>
              <p className="text-dark/60 font-poppins leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAcademy;
