import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { sendWelcomeEmail } from "../../../../lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "L'adresse email est requise." },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const formattedEmail = email.trim().toLowerCase();
    const subLocale = locale || "fr";

    // Insert subscriber into database
    const { error: dbError } = await supabase
      .from("saninova_newsletter_subscribers")
      .insert([{ email: formattedEmail, locale: subLocale }]);

    if (dbError) {
      // 23505 is PostgreSQL unique constraint violation (already subscribed)
      if (dbError.code === "23505") {
        return NextResponse.json({
          success: true,
          alreadySubscribed: true,
          message:
            subLocale === "en"
              ? "You are already subscribed to our newsletter!"
              : "Vous êtes déjà inscrit à notre newsletter !",
        });
      }
      throw dbError;
    }

    // Try sending welcome email
    try {
      await sendWelcomeEmail(formattedEmail, subLocale);
    } catch (mailError) {
      // Log the error but don't fail the registration request
      console.error(
        `Welcome email failed to send to ${formattedEmail}, subscriber registered anyway:`,
        mailError
      );
    }

    return NextResponse.json({
      success: true,
      message:
        subLocale === "en"
          ? "Thank you for subscribing!"
          : "Merci pour votre abonnement !",
    });
  } catch (err: any) {
    console.error("Newsletter registration error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
