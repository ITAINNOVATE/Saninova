import { NextResponse } from "next/server";
import { IziPayClient } from "izichangepay-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, firstname, lastname, email, trainingSlug, isPublication, publicationId } = body;

    const apiKey = process.env.IZIPAY_API_KEY_LIVE || process.env.IZIPAY_API_KEY_TEST;

    if (!apiKey) {
      return NextResponse.json(
        { 
          status: false, 
          message: "Clé API IzichangePay non configurée. Veuillez ajouter IZIPAY_API_KEY_LIVE dans votre fichier .env.local" 
        },
        { status: 200 } // Return 200 with status: false so the frontend can gracefully fall back to simulation
      );
    }

    const izipay = new IziPayClient({
      apiKey,
    });

    const origin = request.headers.get("origin") || "https://saninova.com";
    
    // Build redirect URLs based on whether it is an academy course or a publication submission
    let returnUrl = "";
    let memo = "";
    let orderId = "";

    if (isPublication) {
      returnUrl = `${origin}/publications?status=success&id=${publicationId}`;
      memo = `Publication #${publicationId}`;
      orderId = publicationId;
    } else {
      returnUrl = `${origin}/academy/confirmation?training=${trainingSlug}`;
      memo = `Inscription Académie - ${trainingSlug}`;
      orderId = `${trainingSlug}-${Date.now()}`;
    }

    // Call IzichangePay V2 SDK
    const intent = await izipay.paymentIntents.create({
      requestedCurrencyType: 'fiat',
      currencyRequested: 'XOF',
      amountRequested: String(amount),
      acceptedCoins: ["USDT.TRC20", "USDT.BEP20", "BTC", "ETH", "TRX"],
      merchantReference: orderId,
      returnUrl: returnUrl,
      metadata: { 
        isPublication: isPublication ? "true" : "false", 
        firstname: firstname || "Client", 
        lastname: lastname || "SaniNova", 
        email: email || "contact@saninova.com",
        memo 
      },
    });

    console.log("IzichangePay API Response:", intent);

    if (!intent || !intent.paymentUrl) {
      return NextResponse.json(
        { 
          status: false, 
          message: "Impossible de récupérer l'URL de paiement depuis IzichangePay", 
          details: intent 
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ status: true, url: intent.paymentUrl });
  } catch (error: any) {
    console.error("IzichangePay Integration Error:", error);
    return NextResponse.json(
      { 
        status: false, 
        message: error.message || "Une erreur est survenue lors de la création du paiement",
        details: error.response?.data || error
      },
      { status: 200 }
    );
  }
}
