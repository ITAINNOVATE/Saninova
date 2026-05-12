"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eye, Target, Trophy } from "lucide-react";

export const AboutDetails: React.FC = () => {
  const { t, locale } = useLanguage();

  const mainTitle = locale === "en" ? "Vision, Mission & Values" : "Vision, Mission & Valeurs";

  return (
    <div id="about-details" className="overflow-hidden">
      {/* Dark Banner: Vision, Mission & Values */}
      <section className="bg-primary text-white py-24 relative border-b border-white/5">
        {/* Subtle Background grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-detail" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-detail)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Title */}
            <div className="lg:col-span-3">
              <h2 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                {locale === "en" ? (
                  <>Vision,<br />Mission &amp;<br />Values</>
                ) : (
                  <>Vision,<br />Mission &amp;<br />Valeurs</>
                )}
              </h2>
            </div>

            {/* Right Content Columns */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:divide-x divide-white/20">
              {/* Vision */}
              <div className="md:pl-8 md:pr-4 space-y-6">
                <div className="w-14 h-14 text-orange">
                  <Eye className="w-full h-full" strokeWidth={1.5} />
                </div>
                <h3 className="font-montserrat text-lg font-extrabold uppercase tracking-wider text-white">
                  {t.aboutPage.vision.title}
                </h3>
                <p className="font-inter text-base text-white/80 leading-relaxed">
                  {t.aboutPage.vision.desc}
                </p>
              </div>

              {/* Mission */}
              <div className="md:pl-8 md:pr-4 space-y-6 border-t border-white/20 md:border-t-0 pt-12 md:pt-0">
                <div className="w-14 h-14 text-orange">
                  <Target className="w-full h-full" strokeWidth={1.5} />
                </div>
                <h3 className="font-montserrat text-lg font-extrabold uppercase tracking-wider text-white">
                  {t.aboutPage.mission.title}
                </h3>
                <p className="font-inter text-base text-white/80 leading-relaxed">
                  {t.aboutPage.mission.desc}
                </p>
              </div>

              {/* Values */}
              <div className="md:pl-8 md:pr-4 space-y-6 border-t border-white/20 md:border-t-0 pt-12 md:pt-0">
                <div className="w-14 h-14 text-orange">
                  <Trophy className="w-full h-full" strokeWidth={1.5} />
                </div>
                <h3 className="font-montserrat text-lg font-extrabold uppercase tracking-wider text-white">
                  {t.aboutPage.values.title}
                </h3>
                <ul className="space-y-3">
                  {t.aboutPage.values.list.map((val, index) => (
                    <li key={index} className="flex items-center group cursor-default">
                      <span className="w-2 h-2 rounded-full bg-orange mr-3 flex-shrink-0 transition-transform group-hover:scale-125" />
                      <span className="font-poppins font-bold text-white text-base group-hover:text-orange transition-colors">
                        {val.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDetails;

