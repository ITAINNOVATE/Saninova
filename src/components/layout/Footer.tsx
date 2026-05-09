"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  return (
    <footer className="bg-primary text-white border-t border-white/10 relative">
      {/* Decorative top wave/glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-white/20 to-primary"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: SaniNova Branding */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="SaniNova"
                className="h-14 w-auto max-w-[200px] object-contain"
                style={{
                  filter: "brightness(0) invert(1)"
                }}
              />
            </div>
            <p className="font-inter text-base sm:text-lg text-white/70 leading-relaxed max-w-sm">
              {t.footer.slogan}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-accent/20 rounded-full transition-colors duration-200 group">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/80 group-hover:text-white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-accent/20 rounded-full transition-colors duration-200 group">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/80 group-hover:text-white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-accent/20 rounded-full transition-colors duration-200 group">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/80 group-hover:text-white">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="font-poppins text-lg font-semibold tracking-wide border-l-4 border-accent pl-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3 font-poppins text-lg text-white/70">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="hover:text-accent transition-colors duration-200">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-accent transition-colors duration-200">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#expertises" onClick={(e) => handleNavClick(e, "#expertises")} className="hover:text-accent transition-colors duration-200">
                  {t.nav.expertises}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, "#services")} className="hover:text-accent transition-colors duration-200">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#publications" onClick={(e) => handleNavClick(e, "#publications")} className="hover:text-accent transition-colors duration-200">
                  {t.nav.publications}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-6">
            <h4 className="font-poppins text-lg font-semibold tracking-wide border-l-4 border-accent pl-3">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-4 font-inter text-base sm:text-lg text-white/70">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Cotonou, Rép du BENIN</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+2290161015495" className="hover:text-accent transition-colors">
                  +229 01 61 01 54 95
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:saninova@gmail.com" className="hover:text-accent transition-colors">
                  saninova@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="font-poppins text-lg font-semibold tracking-wide border-l-4 border-accent pl-3">
              Newsletter
            </h4>
            <p className="font-inter text-base sm:text-lg text-white/70 leading-relaxed">
              Inscrivez-vous pour recevoir nos rapports stratégiques et analyses.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="bg-white/10 text-white placeholder-white/40 border border-white/10 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-accent"
              />
              <button className="bg-accent hover:bg-accent/90 text-white font-poppins font-medium text-sm py-2.5 rounded-xl shadow-lg transition-all duration-200">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll to top */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-poppins gap-4">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} SaniNova. {t.footer.rights}
            </span>
            <span className="hidden md:inline">|</span>
            <span>
              Réalisé par <a href="https://www.itainnovate.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors font-semibold">ITA INNOVATE</a>
            </span>
          </div>
          <button
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 p-2 bg-white/5 hover:bg-accent hover:text-white rounded-full transition-all duration-300 group"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
