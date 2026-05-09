"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Locale } from "../../lib/translations";
import { Menu, X, Globe, PhoneCall, Mail, Phone } from "lucide-react";

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
    handleScroll();
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
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Top Info Bar: Collapses on scroll */}
      <div
        className={`bg-[#00A878] text-white transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-28 py-2 sm:max-h-12 sm:py-2.5 border-b border-white/10 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-poppins">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="mailto:saninova@gmail.com" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
              <Mail className="w-3.5 h-3.5 text-white" />
              <span className="font-medium">saninova@gmail.com</span>
            </a>
            <a href="tel:+2290161015495" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
              <Phone className="w-3.5 h-3.5 text-white" />
              <span className="font-medium">+229 01 61 01 54 95</span>
            </a>
          </div>
          
          {/* Right: Social Media Icons in White Circular Badges */}
          <div className="flex items-center space-x-3">
            <a href="#" className="w-7 h-7 rounded-full bg-white text-[#00A878] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-white text-[#00A878] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.93-1.72-.08-.07-.15-.15-.22-.23v6.39c-.04 2.37-.96 4.74-2.73 6.32-1.85 1.71-4.5 2.39-6.93 1.83-2.61-.56-4.94-2.45-5.91-4.99-1.2-3.05-.51-6.84 1.74-9.11 1.72-1.78 4.31-2.52 6.74-1.95v4.09c-1.12-.34-2.39-.17-3.34.52-.96.67-1.52 1.85-1.5 3.04.01 1.25.68 2.45 1.74 3.09 1.09.68 2.51.77 3.65.22.95-.44 1.55-1.41 1.58-2.46.03-2.03.01-4.06.02-6.09.01-2.92.01-5.84.02-8.76z"/>
              </svg>
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-white text-[#00A878] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-white text-[#00A878] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="w-7 h-7 rounded-full bg-white text-[#00A878] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3 0-5 2-5 5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center group">
          {isScrolled ? (
            <img
              key="colored-logo"
              src="/images/logo.png"
              alt="SaniNova"
              className="h-12 w-auto max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <img
              key="white-logo"
              src="/images/logo.png"
              alt="SaniNova"
              className="h-12 w-auto max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105"
              style={{
                filter: "brightness(0) invert(1)"
              }}
            />
          )}
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
