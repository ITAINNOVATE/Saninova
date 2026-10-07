import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullname,
      email,
      phone,
      organization,
      role,
      trainingSlug,
      payment_status = "pending",
      payment_reference,
      notes
    } = body;

    if (!fullname || !email) {
      return NextResponse.json(
        { error: "Le nom complet et l'adresse email sont obligatoires." },
        { status: 400 }
      );
    }

    // Lookup corresponding training if slug or title provided
    let trainingId = null;
    let trainingTitle = "";
    if (trainingSlug) {
      const { data: trainingMatch } = await supabase
        .from("academy_trainings")
        .select("id, title")
        .or(`slug.eq.${trainingSlug},title.ilike.%${trainingSlug}%`)
        .maybeSingle();

      if (trainingMatch) {
        trainingId = trainingMatch.id;
        trainingTitle = trainingMatch.title;
      }
    }

    const formattedEmail = email.trim().toLowerCase();
    const formattedPhone = (phone || "").trim();

    // Check if an existing registration exists with pending status for this email & training
    let existingQuery = supabase
      .from("academy_registrations")
      .select("id")
      .eq("email", formattedEmail);

    if (trainingId) {
      existingQuery = existingQuery.eq("training_id", trainingId);
    }

    const { data: existingReg } = await existingQuery.maybeSingle();

    if (existingReg && payment_status !== "pending") {
      // Update existing record
      const { data: updated, error: updateErr } = await supabase
        .from("academy_registrations")
        .update({
          payment_status,
          payment_reference: payment_reference || null,
          notes: notes || undefined
        })
        .eq("id", existingReg.id)
        .select()
        .single();

      if (updateErr) {
        return NextResponse.json({ error: updateErr.message, details: updateErr }, { status: 500 });
      }

      return NextResponse.json({ success: true, registration: updated, updated: true });
    }

    // Insert new registration
    const { data, error } = await supabase
      .from("academy_registrations")
      .insert([{
        training_id: trainingId,
        fullname: fullname.trim(),
        email: formattedEmail,
        phone: formattedPhone,
        organization: organization || "",
        role: role || "Participant",
        payment_status,
        payment_reference: payment_reference || null,
        notes: notes || (trainingTitle ? `Formation: ${trainingTitle}` : "")
      }])
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error inserting academy registration:", error);
      return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, registration: data });
  } catch (err: any) {
    console.error("API academy register error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
