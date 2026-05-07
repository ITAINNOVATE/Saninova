"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Truck,
  Smartphone,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Activity,
  BarChart,
  ArrowRight,
} from "lucide-react";

export const ExpertisesGrid: React.FC = () => {
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const expertises = [
    {
      id: "governance",
      icon: <FileText className="w-6 h-6" />,
      title: t.expertises.list.governance.title,
      desc: t.expertises.list.governance.desc,
    },
    {
      id: "pharma",
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t.expertises.list.pharma.title,
      desc: t.expertises.list.pharma.desc,
    },
    {
      id: "supplyChain",
      icon: <Truck className="w-6 h-6" />,
      title: t.expertises.list.supplyChain.title,
      desc: t.expertises.list.supplyChain.desc,
    },
    {
      id: "digital",
      icon: <Smartphone className="w-6 h-6" />,
      title: t.expertises.list.digital.title,
      desc: t.expertises.list.digital.desc,
    },
    {
      id: "quality",
      icon: <CheckCircle className="w-6 h-6" />,
      title: t.expertises.list.quality.title,
      desc: t.expertises.list.quality.desc,
    },
    {
      id: "financing",
      icon: <TrendingUp className="w-6 h-6" />,
      title: t.expertises.list.financing.title,
      desc: t.expertises.list.financing.desc,
    },
    {
      id: "hr",
      icon: <GraduationCap className="w-6 h-6" />,
      title: t.expertises.list.hr.title,
      desc: t.expertises.list.hr.desc,
    },
    {
      id: "security",
      icon: <Activity className="w-6 h-6" />,
      title: t.expertises.list.security.title,
      desc: t.expertises.list.security.desc,
    },
    {
      id: "evaluation",
      icon: <BarChart className="w-6 h-6" />,
      title: t.expertises.list.evaluation.title,
      desc: t.expertises.list.evaluation.desc,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="expertises" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
            {t.expertises.tag}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {t.expertises.title}
          </h2>
          <p className="font-inter text-lg text-dark/70">
            {t.expertises.subtitle}
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {expertises.map((exp) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className="group bg-white p-8 rounded-2xl border border-dark/5 shadow-md shadow-dark/2 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              {/* Subtle top background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/2 rounded-full filter blur-xl group-hover:bg-accent/5 transition-all duration-300" />

              <div className="flex-grow">
                {/* Icon Container with glowing ring */}
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center p-3 mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                  {exp.icon}
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="font-poppins text-lg font-bold text-primary group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>

              {/* "En savoir plus" CTA */}
              <div className="pt-6 border-t border-light mt-6 flex items-center justify-between">
                <a
                  href="#expertises-details"
                  onClick={(e) => handleNavClick(e, "#expertises-details")}
                  className="font-poppins text-xs font-bold text-primary hover:text-accent flex items-center space-x-1.5 transition-colors"
                >
                  <span>{t.expertises.viewMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};
export default ExpertisesGrid;
