"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

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
import { usePathname } from "next/navigation";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const socialLinks = [
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "https://www.linkedin.com/company/saninova-global-consulting/" },
    { icon: <FacebookIcon className="w-5 h-5" />, href: "https://web.facebook.com/profile.php?id=61589394335585" },
    { icon: <InstagramIcon className="w-5 h-5" />, href: "https://www.instagram.com/saninovagc/" },
    { icon: <YoutubeIcon className="w-5 h-5" />, href: "https://www.youtube.com/@SaniNovaGlobalConsulting" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-accent/20 rounded-full transition-all duration-200 group hover:scale-105"
                >
                  <span className="text-white/80 group-hover:text-white transition-colors duration-200">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="font-poppins text-lg font-semibold tracking-wide border-l-4 border-accent pl-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3 font-poppins text-lg text-white/70">
              <li>
                <Link href="/" className="hover:text-accent transition-colors duration-200">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-200">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/expertises" className="hover:text-accent transition-colors duration-200">
                  {t.nav.expertises}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors duration-200">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-accent transition-colors duration-200">
                  {t.nav.publications}
                </Link>
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
                <a href="mailto:saninovagc@gmail.com" className="hover:text-accent transition-colors">
                  saninovagc@gmail.com
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
