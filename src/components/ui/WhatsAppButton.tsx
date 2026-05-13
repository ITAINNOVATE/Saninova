"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <a
      href="https://wa.me/2290161015495"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
      title="Discuter sur WhatsApp"
    >
      {/* Pulse background effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:hidden" />
      <MessageCircle className="w-6 h-6 relative z-10" />
    </a>
  );
};
export default WhatsAppButton;
