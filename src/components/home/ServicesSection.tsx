"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Briefcase, HelpCircle, Laptop, GraduationCap, BarChart } from "lucide-react";

import Link from "next/link";

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const serviceIcons = [
    <Briefcase className="w-6 h-6" />,
    <HelpCircle className="w-6 h-6" />,
    <Laptop className="w-6 h-6" />,
    <GraduationCap className="w-6 h-6" />,
    <BarChart className="w-6 h-6" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-orange tracking-widest uppercase border-b-2 border-orange pb-1">
            SERVICES
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {t.servicesPage.title}
          </h2>
          <p className="font-inter text-base sm:text-lg text-dark/70">
            {t.servicesPage.subtitle}
          </p>
        </div>

        {/* Services List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {t.servicesPage.list.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="w-full md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] flex-grow-0 flex-shrink-0 bg-light/40 p-6 sm:p-8 rounded-3xl border border-dark/2 hover:border-primary/10 hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.01] transition-all duration-300 flex flex-col items-center text-center justify-between"
            >
              <div className="space-y-6">
                {/* Round icon with ring */}
                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shadow-inner mx-auto">
                  {serviceIcons[index] || <Briefcase className="w-6 h-6" />}
                </div>

                <div className="space-y-3">
                  <h3 className="font-poppins text-lg font-bold text-primary">
                    {service.title}
                  </h3>
                  <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed text-justify">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-light mt-6 w-full">
                <Link
                  href="/contact"
                  className="font-poppins text-xs font-bold text-orange hover:text-primary transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Prendre rendez-vous</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default ServicesSection;
