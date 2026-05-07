import type { Metadata } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaniNova | Transformation des Systèmes de Santé en Afrique",
  description: "SaniNova accompagne les gouvernements, institutions et partenaires dans la conception et la mise en œuvre de réformes sanitaires ambitieuses, innovantes et durables en Afrique.",
  keywords: "SaniNova, santé Afrique, conseil santé, transformation sanitaire, santé digitale, régulation pharmaceutique, Cotonou, Bénin",
  openGraph: {
    title: "SaniNova | Transformation des Systèmes de Santé en Afrique",
    description: "SaniNova accompagne les gouvernements, institutions et partenaires dans la conception et la mise en œuvre de réformes sanitaires ambitieuses, innovantes et durables.",
    type: "website",
    locale: "fr_FR",
    siteName: "SaniNova",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-dark font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
