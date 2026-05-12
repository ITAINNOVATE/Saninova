"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

import { Menu, X, PhoneCall, Mail, Phone } from "lucide-react";

// Custom SVG Components for Brands (since Lucide-React 1.x removed them to avoid bloat)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

import Link from "next/link";

export const Navbar: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialLinks = [
    { icon: <FacebookIcon className="w-3.5 h-3.5" />, href: "https://web.facebook.com/profile.php?id=61589394335585" },
    { icon: <LinkedinIcon className="w-3.5 h-3.5" />, href: "https://www.linkedin.com/company/saninova-global-consulting/" },
    { icon: <InstagramIcon className="w-3.5 h-3.5" />, href: "https://www.instagram.com/saninovagc/" },
    { icon: <YoutubeIcon className="w-3.5 h-3.5" />, href: "https://www.youtube.com/@SaniNovaGlobalConsulting" },
  ];

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
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.expertises, href: "/expertises" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.publications, href: "/publications" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const closeMobile = () => setIsMobileMenuOpen(false);

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
            <a href="mailto:saninovagc@gmail.com" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
              <Mail className="w-3.5 h-3.5 text-white" />
              <span className="font-medium">saninovagc@gmail.com</span>
            </a>
            <a href="tel:+2290161015495" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
              <Phone className="w-3.5 h-3.5 text-white" />
              <span className="font-medium">+229 01 61 01 54 95</span>
            </a>
          </div>
          
          {/* Right: Social Media Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#00A878] hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
        <Link href="/" className="flex items-center group">
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
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-poppins text-lg font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:height-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                isScrolled ? "text-dark/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Language Selector */}
          <div className={`flex items-center p-1.5 rounded-full border transition-colors duration-300 ${isScrolled ? "bg-light/80 border-dark/5" : "bg-white/10 border-white/10"}`}>
            <button onClick={() => setLocale("fr")} className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins transition-all duration-200 ${locale === "fr" ? "bg-primary text-white shadow-sm" : isScrolled ? "text-dark/60 hover:text-primary" : "text-white/70 hover:text-white"}`}>FR</button>
            <button onClick={() => setLocale("en")} className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins transition-all duration-200 ${locale === "en" ? "bg-primary text-white shadow-sm" : isScrolled ? "text-dark/60 hover:text-primary" : "text-white/70 hover:text-white"}`}>EN</button>
          </div>

          {/* CTA Button */}
          <Link href="/contact" className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold font-poppins shadow-md shadow-primary/10 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <PhoneCall className="w-4 h-4 text-orange" />
            <span>{t.nav.cta}</span>
          </Link>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center lg:hidden space-x-4">
          <div className={`flex items-center p-1 rounded-full border transition-colors duration-300 ${isScrolled ? "bg-light/80 border-dark/5" : "bg-white/10 border-white/10"}`}>
            <button onClick={() => setLocale("fr")} className={`px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${locale === "fr" ? "bg-primary text-white" : isScrolled ? "text-dark/60" : "text-white/70"}`}>FR</button>
            <button onClick={() => setLocale("en")} className={`px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${locale === "en" ? "bg-primary text-white" : isScrolled ? "text-dark/60" : "text-white/70"}`}>EN</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-primary hover:bg-light" : "text-white hover:bg-white/10"}`}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-dark/5 shadow-xl p-6 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMobile} className="font-poppins text-lg font-semibold text-dark/80 hover:text-primary py-2 border-b border-light">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={closeMobile} className="flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-full font-semibold font-poppins shadow-md">
              <PhoneCall className="w-4 h-4 text-orange" />
              <span>{t.nav.cta}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
