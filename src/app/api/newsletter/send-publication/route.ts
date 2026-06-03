import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "../../../../lib/supabase";
import { sendPublicationEmail } from "../../../../lib/mail";

export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin session
    const cookieStore = await cookies();
    const session = cookieStore.get("saninova_admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { success: false, error: "Non autorisé. Accès administrateur requis." },
        { status: 401 }
      );
    }

    // 2. Parse request parameters
    const body = await req.json();
    const { publicationId } = body;

    if (!publicationId) {
      return NextResponse.json(
        { success: false, error: "ID de publication requis." },
        { status: 400 }
      );
    }

    // 3. Fetch publication details from Supabase
    const { data: publication, error: pubError } = await supabase
      .from("saninova_publications")
      .select("*")
      .eq("id", publicationId)
      .single();

    if (pubError || !publication) {
      console.error("Publication fetch error:", pubError);
      return NextResponse.json(
        { success: false, error: "Publication introuvable." },
        { status: 404 }
      );
    }

    // 4. Fetch all subscribers from database
    const { data: subscribers, error: subsError } = await supabase
      .from("saninova_newsletter_subscribers")
      .select("email, locale");

    if (subsError) {
      console.error("Subscribers fetch error:", subsError);
      return NextResponse.json(
        { success: false, error: "Impossible de charger la liste des abonnés." },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        sentCount: 0,
        message: "Aucun abonné enregistré pour la newsletter.",
      });
    }

    console.log(`Starting publication broadcast to ${subscribers.length} subscribers...`);

    // 5. Send notification to all subscribers
    let successCount = 0;
    let failureCount = 0;

    // Run parallel or sequential mailing
    // Sequential with Promise.allSettled is safe and handles individual failures
    const mailPromises = subscribers.map(async (sub) => {
      const locale = sub.locale || "fr";
      try {
        await sendPublicationEmail(sub.email, publication, locale);
        successCount++;
      } catch (err) {
        console.error(`Failed to send newsletter to ${sub.email}:`, err);
        failureCount++;
      }
    });

    await Promise.allSettled(mailPromises);

    console.log(
      `Broadcast finished. Success: ${successCount}, Failures: ${failureCount}`
    );

    return NextResponse.json({
      success: true,
      sentCount: successCount,
      failureCount: failureCount,
      message: `La publication a été envoyée à ${successCount} abonnés avec succès.`,
    });
  } catch (err: any) {
    console.error("Newsletter broadcast error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
