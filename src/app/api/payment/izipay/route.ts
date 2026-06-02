import { NextResponse } from "next/server";
const { IziChangePayClient } = require("izichangepay");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, firstname, lastname, email, trainingSlug, isPublication, publicationId } = body;

    const apiKey = process.env.IZIPAY_API_KEY_TEST || process.env.IZIPAY_API_KEY_LIVE;
    const secretKey = process.env.IZIPAY_SECRET_KEY_TEST || process.env.IZIPAY_SECRET_KEY_LIVE;

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { 
          status: false, 
          message: "Clés API IzichangePay non configurées. Veuillez ajouter IZIPAY_API_KEY_TEST et IZIPAY_SECRET_KEY_TEST dans votre fichier .env.local" 
        },
        { status: 200 } // Return 200 with status: false so the frontend can gracefully fall back to simulation
      );
    }

    const environment = apiKey.startsWith("sk_live_") ? "live" : "sandbox";

    const client = new IziChangePayClient({
      apiKey,
      secretKey,
      environment,
    });

    const origin = request.headers.get("origin") || "https://saninova.com";
    
    // Build redirect URLs based on whether it is an academy course or a publication submission
    let successUrl = "";
    let canceledUrl = "";
    let failedUrl = "";
    let memo = "";

    if (isPublication) {
      successUrl = `${origin}/publications?status=success&id=${publicationId}`;
      canceledUrl = `${origin}/publications?status=canceled&id=${publicationId}`;
      failedUrl = `${origin}/publications?status=failed&id=${publicationId}`;
      memo = `Publication #${publicationId}`;
    } else {
      successUrl = `${origin}/academy/confirmation?training=${trainingSlug}`;
      canceledUrl = `${origin}/academy/payment?training=${trainingSlug}&status=canceled`;
      failedUrl = `${origin}/academy/payment?training=${trainingSlug}&status=failed`;
      memo = `Inscription Académie - ${trainingSlug}`;
    }

    // Call IzichangePay SDK
    const response = await client.generatePayinRedirectUrlWithCustomer({
      amount: String(amount),
      coin: "usdt.trc20", // Default crypto asset
      acceptedCoins: ["usdt.trc20", "usdt.bep20", "btc", "eth", "trx"],
      successUrl,
      canceledUrl,
      failedUrl,
      firstname: firstname || "Client",
      lastname: lastname || "SaniNova",
      email: email || "contact@saninova.com",
      memo,
    });

    console.log("IzichangePay API Response:", response);

    // Extract redirect URL safely
    const redirectUrl = response.url || 
                        response.redirectUrl || 
                        response.redirect_url || 
                        (response.data && (
                          (response.data as any).url || 
                          (response.data as any).redirectUrl || 
                          (response.data as any).redirect_url || 
                          (response.data as any).payment_url
                        ));

    if (!redirectUrl) {
      return NextResponse.json(
        { 
          status: false, 
          message: "Impossible de récupérer l'URL de paiement depuis IzichangePay", 
          details: response 
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ status: true, url: redirectUrl });
  } catch (error: any) {
    console.error("IzichangePay Integration Error:", error);
    return NextResponse.json(
      { 
        status: false, 
        message: error.message || "Une erreur est survenue lors de la création du paiement",
        details: error.response?.data || null
      },
      { status: 200 }
    );
  }
}
