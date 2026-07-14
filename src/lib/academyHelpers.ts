import { certificationsData } from "../data/certificationsData";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatELearningDuration(durationText: string): string {
  if (!durationText) return "10 heures de cours";
  const match = durationText.match(/(\d+)\s*jour/i);
  if (match) {
    const days = parseInt(match[1], 10);
    const hours = days * 5;
    return `${hours} heures de cours`;
  }
  return durationText;
}

export const mapAcademyToCategory = (id: string): string => {
  switch (id) {
    case "supply-chain":
      return "Logistique / Supply Chain";
    case "reglementation":
      return "Réglementation";
    case "sante-digitale":
      return "Santé Digitale";
    case "leadership":
      return "Leadership / Gouvernance";
    case "sante-publique":
      return "Santé Publique";
    case "business":
      return "Business / Management";
    default:
      return "Général";
  }
};

export const getAcademyImage = (id: string): string => {
  switch (id) {
    case "supply-chain":
      return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80";
    case "reglementation":
      return "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80";
    case "sante-digitale":
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80";
    case "leadership":
      return "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80";
    case "sante-publique":
      return "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80";
    case "business":
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80";
    default:
      return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80";
  }
};

// Flatten and map the modules
const allModules = certificationsData.flatMap((academy) => {
  return academy.certifications.flatMap((cert) => {
    return cert.modules.map((mod, modIdx) => {
      const slug = slugify(mod.name);
      return {
        id: `static-mod-${slug}-${modIdx}`,
        title: mod.name,
        slug: slug,
        short_description: `Module de formation en eLearning issu de la certification: ${cert.name}. Apprentissage 100% en ligne et asynchrone avec ressources téléchargeables, quiz interactifs et certificats de réussite officiels.`,
        full_description: `Ce module de formation est conçu pour vous offrir des compétences pointues et immédiatement applicables. Faisant partie intégrante de la certification "${cert.name}", ce module couvre les domaines essentiels de l'Académie "${academy.title}".\n\nGrâce à notre plateforme eLearning innovante, vous pouvez progresser de manière asynchrone, à votre rythme, à travers plusieurs chapitres contenant des cours textuels enrichis, des simulations multimédias et des quiz pour valider vos acquis.`,
        featured_concept: slug === "gestion-des-approvisionnements-et-des-stocks" ? {
          title: "Point de commande",
          text: "Encore appelé seuil de réapprovisionnement : Niveau de stock auquel il faut passer commande pour recevoir la livraison avant d'atteindre le stock de sécurité.\nC'est souvent confondu avec le stock min, mais il peut en différer selon le délai de livraison variable."
        } : null,
        category: mapAcademyToCategory(academy.id),
        price: "120",
        currency: "USD",
        image_url: getAcademyImage(academy.id),
        date: "Disponible immédiatement",
        location: "En ligne (eLearning)",
        duration: formatELearningDuration(mod.duration),
        certificate: "Attestation de Module SaniNova",
        language: "Français",
        objectives: mod.subModules?.map(sub => sub.title) || ["Maîtriser les concepts clés du module", "Appliquer les meilleures pratiques professionnelles"],
        target_audience: ["Professionnels de santé", "Pharmaciens", "Logisticiens", "Administrateurs de soins", "Étudiants en santé"],
        program: mod.subModules?.map((sub, sIdx) => ({
          day: `Chapitre ${sIdx + 1}`,
          title: sub.title,
          details: sub.chapters?.join(", ") || "Détails théoriques et études de cas pratiques."
        })) || [],
        trainers: [
          {
            name: "Dr Hope AKOHOUVI AMOU",
            role: "Directeur Général de SANINOVA",
            bio: "Expert international en systèmes de santé avec une grande expérience sur le terrain.",
            image: "/images/photo_hope.png"
          }
        ],
        isStaticModule: true,
        parentCertification: cert.name,
        parentAcademy: academy.title
      };
    });
  });
});

const tempModules = allModules.filter((mod, index, self) =>
  index === self.findIndex((t) => t.slug === mod.slug)
);

// Reposition "Gestion d'une officine moderne" (gestion-d-une-officine-moderne) to the 3rd position (index 2)
const officineIndex = tempModules.findIndex((m) => m.slug === "gestion-d-une-officine-moderne");
if (officineIndex !== -1) {
  const [officineModule] = tempModules.splice(officineIndex, 1);
  tempModules.splice(2, 0, officineModule);
}

export const staticModules = tempModules.map((mod, index) => {
  const availableSlugs = [
    "gestion-des-approvisionnements-et-des-stocks",
    "quantification-et-previsions",
    "gestion-d-une-officine-moderne"
  ];

  return {
    ...mod,
    isAvailable: availableSlugs.includes(mod.slug)
  };
});
