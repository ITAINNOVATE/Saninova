import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const FALLBACK_FILE = path.join(process.cwd(), "public", "documents", "academy_satisfaction_surveys.json");

function getLocalSurveys(): any[] {
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const content = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading local survey fallbacks:", e);
  }
  return [];
}

function saveLocalSurvey(survey: any) {
  try {
    const dir = path.dirname(FALLBACK_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const current = getLocalSurveys();
    const updated = [survey, ...current.filter((s: any) => s.id !== survey.id && s.participant_email !== survey.participant_email)];
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local survey fallback:", e);
  }
}

// GET: Récupère les réponses à l'enquête
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trainingSlug = searchParams.get("training_slug") || "officine-moderne";
  const participantEmail = searchParams.get("participant_email")?.toLowerCase().trim();

  try {
    let query = supabase
      .from("academy_satisfaction_surveys")
      .select("*")
      .order("created_at", { ascending: false });

    if (trainingSlug && trainingSlug !== "all") {
      query = query.eq("training_slug", trainingSlug);
    }

    if (participantEmail) {
      query = query.ilike("participant_email", participantEmail);
    }

    const { data, error } = await query;

    if (!error && data) {
      return NextResponse.json({ success: true, surveys: data });
    }
  } catch (err) {
    console.warn("Supabase satisfaction survey table query error:", err);
  }

  // Fallback local file
  const localSurveys = getLocalSurveys();
  let filtered = localSurveys.filter((s: any) => !trainingSlug || trainingSlug === "all" || s.training_slug === trainingSlug);
  if (participantEmail) {
    filtered = filtered.filter((s: any) => (s.participant_email || "").toLowerCase() === participantEmail);
  }

  return NextResponse.json({ success: true, surveys: filtered });
}

// POST: Enregistre la réponse d'un apprenant à l'enquête
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.participant_email || !body.answers) {
      return NextResponse.json({ success: false, error: "Email et réponses obligatoires." }, { status: 400 });
    }

    const newSurvey: any = {
      id: "survey-" + Date.now(),
      training_slug: body.training_slug || "officine-moderne",
      participant_name: body.participant_name || "Apprenant",
      participant_email: body.participant_email.toLowerCase().trim(),
      participant_role: body.participant_role || "",
      answers: body.answers,
      suggestions: body.suggestions || "",
      created_at: new Date().toISOString(),
    };

    // 1. Tenter d'enregistrer dans Supabase
    try {
      const { data, error } = await supabase
        .from("academy_satisfaction_surveys")
        .insert([{
          training_slug: newSurvey.training_slug,
          participant_name: newSurvey.participant_name,
          participant_email: newSurvey.participant_email,
          participant_role: newSurvey.participant_role,
          answers: newSurvey.answers,
          suggestions: newSurvey.suggestions,
        }])
        .select()
        .maybeSingle();

      if (!error && data) {
        newSurvey.id = data.id;
        newSurvey.created_at = data.created_at;
      } else if (error) {
        console.warn("Supabase insert survey warning, saving local fallback:", error.message);
      }
    } catch (sbErr) {
      console.warn("Supabase insert survey catch:", sbErr);
    }

    // 2. Sauvegarder dans le fallback local
    saveLocalSurvey(newSurvey);

    return NextResponse.json({ success: true, survey: newSurvey });
  } catch (err: any) {
    console.error("Error submitting satisfaction survey:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
