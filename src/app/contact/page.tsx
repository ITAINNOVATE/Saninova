"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import ContactQuick from "../../components/home/ContactQuick";

export default function ContactPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.contact}
        subtitle={t.contactPage.subtitle}
        backgroundImage="/images/bg_contact.png"
      />
      
      <div className="bg-white py-12">
        {/* Reusing high-quality form without duplicating section spacing unnecessarily if it exists internally */}
        <ContactQuick />
      </div>
    </>
  );
}
