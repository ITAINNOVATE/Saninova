"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Locale } from "../../lib/translations";
import { Menu, X, Globe, PhoneCall } from "lucide-react";

export const Navbar: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.expertises, href: "#expertises" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.publications, href: "#publications" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-between p-2 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            {/* Custom stylized health cross / digital mesh logo */}
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" fill="#00A878" stroke="none" />
            </svg>
          </div>
          <span className="font-montserrat text-2xl font-extrabold tracking-tight">
            <span className={`transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`}>Sani</span>
            <span className="text-accent">Nova</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`font-poppins text-lg font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:height-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                isScrolled ? "text-dark/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right buttons: Languages, Consultation CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Language Selector */}
          <div className={`flex items-center p-1.5 rounded-full border transition-colors duration-300 ${isScrolled ? "bg-light/80 border-dark/5" : "bg-white/10 border-white/10"}`}>
            <button
              onClick={() => setLocale("fr")}
              className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins transition-all duration-200 ${
                locale === "fr"
                  ? "bg-primary text-white shadow-sm"
                  : isScrolled ? "text-dark/60 hover:text-primary" : "text-white/70 hover:text-white"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins transition-all duration-200 ${
                locale === "en"
                  ? "bg-primary text-white shadow-sm"
                  : isScrolled ? "text-dark/60 hover:text-primary" : "text-white/70 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold font-poppins shadow-md shadow-primary/10 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <PhoneCall className="w-4 h-4 text-accent" />
            <span>{t.nav.cta}</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden space-x-4">
          {/* Language Switcher for Mobile */}
          <div className={`flex items-center p-1 rounded-full border transition-colors duration-300 ${isScrolled ? "bg-light/80 border-dark/5" : "bg-white/10 border-white/10"}`}>
            <button
              onClick={() => setLocale("fr")}
              className={`px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${
                locale === "fr"
                  ? "bg-primary text-white"
                  : isScrolled ? "text-dark/60" : "text-white/70"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${
                locale === "en"
                  ? "bg-primary text-white"
                  : isScrolled ? "text-dark/60" : "text-white/70"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? "text-primary hover:bg-light" : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-dark/5 shadow-xl p-6 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-poppins text-lg font-semibold text-dark/80 hover:text-primary py-2 border-b border-light"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-full font-semibold font-poppins shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-accent" />
              <span>{t.nav.cta}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
