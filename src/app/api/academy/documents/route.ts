import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

// In-memory / file fallback store for academy documents if Supabase table is not yet migrated
const FALLBACK_FILE = path.join(process.cwd(), "public", "documents", "academy_documents.json");

function getLocalDocuments(): any[] {
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const content = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading local academy documents:", e);
  }
  return [
    {
      id: "doc-officine-01",
      training_slug: "officine-moderne",
      title: "Programme Officiel & Calendrier de la Formation - Gestion d'une Officine Moderne",
      description: "Guide complet du participant, planning des modules et objectifs pédagogiques détaillés.",
      file_url: "/documents/resources/2ws8idp802j_1782039755614.pdf",
      file_type: "PDF",
      category: "Programme",
      created_at: new Date().toISOString()
    }
  ];
}

function saveLocalDocuments(docs: any[]) {
  try {
    const dir = path.dirname(FALLBACK_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(docs, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local academy documents:", e);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trainingSlug = searchParams.get("training_slug");

  try {
    const { data, error } = await supabase
      .from("academy_course_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const filtered = trainingSlug && trainingSlug !== "all" 
        ? data.filter((d: any) => d.training_slug === trainingSlug || d.training_slug === "officine-moderne") 
        : data;
      return NextResponse.json({ success: true, documents: filtered });
    }
  } catch (err) {
    console.warn("Supabase academy_course_documents table fallback:", err);
  }

  // Fallback to local documents store
  const localDocs = getLocalDocuments();
  const filtered = trainingSlug && trainingSlug !== "all"
    ? localDocs.filter((d: any) => d.training_slug === trainingSlug || d.training_slug === "officine-moderne")
    : localDocs;

  return NextResponse.json({ success: true, documents: filtered });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.file_url) {
      return NextResponse.json({ success: false, error: "Titre et fichier/URL requis." }, { status: 400 });
    }

    const payload = {
      training_slug: body.training_slug || "officine-moderne",
      title: body.title,
      description: body.description || "",
      file_url: body.file_url,
      file_type: body.file_type || "PDF",
      category: body.category || "Support de cours",
    };

    // Supabase is the source of truth (Vercel filesystem is read-only)
    const { data, error } = await supabase
      .from("academy_course_documents")
      .insert([payload])
      .select()
      .single();

    if (error || !data) {
      // Local dev fallback only (works when filesystem is writable)
      const localDoc = { id: "doc-" + Date.now(), ...payload, created_at: new Date().toISOString() };
      const saved = (() => {
        try {
          const current = getLocalDocuments();
          saveLocalDocuments([localDoc, ...current]);
          return fs.existsSync(FALLBACK_FILE);
        } catch {
          return false;
        }
      })();

      if (saved && process.env.NODE_ENV !== "production") {
        return NextResponse.json({ success: true, document: localDoc });
      }

      return NextResponse.json({
        success: false,
        error: "Impossible d'enregistrer dans la table Supabase 'academy_course_documents' : " +
          (error?.message || "erreur inconnue") + ". Exécutez le script SQL de création de la table.",
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, document: data });
  } catch (err: any) {
    console.error("Error creating course document:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    try {
      await supabase.from("academy_course_documents").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase delete warning:", e);
    }

    const current = getLocalDocuments();
    saveLocalDocuments(current.filter((d: any) => d.id !== id));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
