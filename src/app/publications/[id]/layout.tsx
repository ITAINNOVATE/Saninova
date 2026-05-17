import { Metadata } from "next";
import { supabase } from "../../../lib/supabase";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ id: string }> | { id: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    // Fetch publication details server-side
    const { data: pub } = await supabase
      .from("saninova_publications")
      .select("title_fr, title_en, desc_fr, desc_en, image_url")
      .eq("id", id)
      .single();

    if (!pub) {
      return {
        title: "Publication | SaniNova",
      };
    }

    // Determine the absolute base URL based on the dynamic request host
    const headersList = await headers();
    const host = headersList.get("host") || "www.saninova.org";
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // Make the cover image URL absolute for social crawlers (e.g. LinkedIn, WhatsApp, Facebook)
    let absoluteImageUrl = pub.image_url;
    if (pub.image_url && !pub.image_url.startsWith("http")) {
      absoluteImageUrl = `${baseUrl}${pub.image_url.startsWith("/") ? "" : "/"}${pub.image_url}`;
    }

    const title = pub.title_fr || pub.title_en || "Publication";
    const description = pub.desc_fr || pub.desc_en || "Découvrez notre rapport stratégique sur la santé et la logistique.";

    return {
      title: `${title} | SaniNova`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${baseUrl}/publications/${id}`,
        siteName: "SaniNova",
        images: absoluteImageUrl
          ? [
              {
                url: absoluteImageUrl,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: absoluteImageUrl ? [absoluteImageUrl] : [],
      },
    };
  } catch (err) {
    console.error("Error generating metadata for publication:", err);
    return {
      title: "Publication | SaniNova",
    };
  }
}

export default function PublicationLayout({ children }: Props) {
  return <>{children}</>;
}
