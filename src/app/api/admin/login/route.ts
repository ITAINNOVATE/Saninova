import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Load from env variables, or use hardcoded fallback for guaranteed operation
    const correctEmail = process.env.ADMIN_EMAIL || "saninovagc@gmail.com";
    const correctPassword = process.env.ADMIN_PASSWORD || "Saninova2026";

    if (!correctEmail || !correctPassword) {
      console.error("Admin credentials not configured.");
      return NextResponse.json(
        { success: false, error: "Configuration serveur incomplète." },
        { status: 500 }
      );
    }

    if (email === correctEmail && password === correctPassword) {
      const cookieStore = await cookies();
      
      // Set a secure, httpOnly session cookie valid for 24 hours
      cookieStore.set("saninova_admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Email ou mot de passe incorrect." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Une erreur interne est survenue." },
      { status: 500 }
    );
  }
}
