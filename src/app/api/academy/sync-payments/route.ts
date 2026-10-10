import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  return handleSync();
}

export async function POST() {
  return handleSync();
}

async function handleSync() {
  const secretKey = process.env.FEDAPAY_SECRET_KEY || "sk_live_kPU_WAEPqol0WXcMrNHWyqwI";

  try {
    // 1. Fetch approved transactions from FedaPay
    const response = await fetch("https://api.fedapay.com/v1/transactions/search?per_page=50", {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ success: false, error: "Erreur FedaPay: " + errText }, { status: 502 });
    }

    const data = await response.json();
    const transactions = data["v1/transactions"] || data.transactions || [];
    const approvedTxs = transactions.filter((t: any) => t.status === "approved");

    // 2. Fetch pending or all academy registrations
    const { data: registrations, error: regError } = await supabase
      .from("academy_registrations")
      .select("*");

    if (regError) {
      return NextResponse.json({ success: false, error: regError.message }, { status: 500 });
    }

    let updatedCount = 0;
    const syncedDetails: any[] = [];

    // 3. Match transactions with registrations
    for (const reg of registrations || []) {
      // Check if already completed with valid reference
      const regEmail = (reg.email || "").toLowerCase().trim();

      // Find matching approved transaction
      const matchedTx = approvedTxs.find((tx: any) => {
        const txRef = tx.reference || "";
        if (reg.payment_reference && reg.payment_reference === txRef) return true;

        const customerEmail = tx.customer?.email || tx.metadata?.paid_customer?.email || "";
        if (customerEmail && customerEmail.toLowerCase().trim() === regEmail) return true;

        return false;
      });

      if (matchedTx) {
        const isNotCompleted = reg.payment_status !== "completed";
        const needsRefUpdate = !reg.payment_reference;

        if (isNotCompleted || needsRefUpdate) {
          const amountCfa = matchedTx.amount ? matchedTx.amount.toLocaleString("fr-FR") : "75.000";
          const operatorMode = matchedTx.mode ? matchedTx.mode.replace("_", " ").toUpperCase() : "Mobile Money";
          const receiptId = matchedTx.id ? `FEDAR-${matchedTx.id}` : "";
          const noteText = `Paiement total - ${amountCfa} FCFA (${operatorMode}). Reçu ${receiptId}. Réf transaction ${matchedTx.transaction_key || matchedTx.reference}.`;

          const { error: updateErr } = await supabase
            .from("academy_registrations")
            .update({
              payment_status: "completed",
              payment_reference: matchedTx.reference || reg.payment_reference,
              notes: noteText,
            })
            .eq("id", reg.id);

          if (!updateErr) {
            updatedCount++;
            syncedDetails.push({
              fullname: reg.fullname,
              email: reg.email,
              amount: matchedTx.amount,
              reference: matchedTx.reference,
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount: updatedCount,
      approvedTransactionsFound: approvedTxs.length,
      syncedDetails,
    });
  } catch (err: any) {
    console.error("Payment sync error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
