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
    const contentType = req.headers.get("content-type") || "";

    let newDoc: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const title = formData.get("title")?.toString() || "";
      const description = formData.get("description")?.toString() || "";
      const training_slug = formData.get("training_slug")?.toString() || "officine-moderne";
      const category = formData.get("category")?.toString() || "Support de cours";
      const fileType = formData.get("file_type")?.toString() || "PDF";
      const directUrl = formData.get("file_url")?.toString() || "";
      const file = formData.get("file") as File | null;

      let file_url = directUrl;

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const uploadDir = path.join(process.cwd(), "public", "documents", "academy");
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(uploadDir, fileName), buffer);
        file_url = `/documents/academy/${fileName}`;
      }

      newDoc = {
        id: "doc-" + Date.now(),
        training_slug,
        title,
        description,
        file_url,
        file_type: fileType,
        category,
        created_at: new Date().toISOString()
      };
    } else {
      const body = await req.json();
      newDoc = {
        id: "doc-" + Date.now(),
        training_slug: body.training_slug || "officine-moderne",
        title: body.title,
        description: body.description || "",
        file_url: body.file_url,
        file_type: body.file_type || "PDF",
        category: body.category || "Support de cours",
        created_at: new Date().toISOString()
      };
    }

    // Try saving to Supabase first
    try {
      const { data, error } = await supabase
        .from("academy_course_documents")
        .insert([{
          training_slug: newDoc.training_slug,
          title: newDoc.title,
          description: newDoc.description,
          file_url: newDoc.file_url,
          file_type: newDoc.file_type,
          category: newDoc.category,
        }])
        .select()
        .single();

      if (!error && data) {
        newDoc = data;
      }
    } catch (sbErr) {
      console.warn("Could not insert to Supabase, saving locally:", sbErr);
    }

    // Always keep local store in sync
    const current = getLocalDocuments();
    const updated = [newDoc, ...current.filter((d: any) => d.id !== newDoc.id)];
    saveLocalDocuments(updated);

    return NextResponse.json({ success: true, document: newDoc });
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
