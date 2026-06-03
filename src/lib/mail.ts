import nodemailer from "nodemailer";

// SMTP configurations from environment variables
const smtpHost = process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT || "465");
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFromEmail = process.env.SMTP_FROM_EMAIL || "contact@saninovagc.com";
const smtpFromName = process.env.SMTP_FROM_NAME || "SaniNova";

// Fallback application base URL
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.saninovagc.com";

/**
 * Creates and returns the Nodemailer transporter.
 * If credentials are not set, returns null to simulate email logs in console.
 */
function getTransporter() {
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn(
      "⚠️ SMTP credentials not fully configured in env variables (SMTP_HOST, SMTP_USER, SMTP_PASS). Emails will be simulated in the console logs."
    );
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents certificate issues on some SMTP servers
    },
  });
}

interface SendMailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Sends an email using the configured SMTP server or logs a simulation if not configured.
 */
export async function sendEmail({ to, subject, html, text }: SendMailParams) {
  const transporter = getTransporter();
  const from = `"${smtpFromName}" <${smtpFromEmail}>`;

  if (!transporter) {
    console.log("\n=======================================================");
    console.log("💌 [EMAIL SIMULATION]");
    console.log(`To:      ${to}`);
    console.log(`From:    ${from}`);
    console.log(`Subject: ${subject}`);
    console.log("-------------------------------------------------------");
    console.log(html);
    console.log("=======================================================\n");
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });
    console.log(`✉️ Email successfully sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    throw error;
  }
}

/**
 * HTML layout wrapper to maintain brand styling (Navy background header, emerald accents)
 */
function getEmailLayout(contentHtml: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SaniNova</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
        body {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }
        .header {
          background-color: #0f172a;
          padding: 32px 24px;
          text-align: center;
          border-bottom: 3px solid #10b981;
        }
        .header img {
          max-height: 50px;
          width: auto;
        }
        .content {
          padding: 40px 32px;
          color: #334155;
          line-height: 1.6;
        }
        .footer {
          background-color: #0f172a;
          padding: 32px 24px;
          text-align: center;
          color: #94a3b8;
          font-size: 13px;
          border-top: 1px solid #1e293b;
        }
        .footer a {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
        }
        .btn {
          display: inline-block;
          background-color: #10b981;
          color: #0f172a !important;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 15px;
          margin-top: 24px;
          text-align: center;
          transition: background-color 0.2s ease;
        }
        .tag {
          display: inline-block;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        h1, h2, h3 {
          color: #0f172a;
          margin-top: 0;
          font-weight: 800;
        }
        h1 {
          font-size: 24px;
          letter-spacing: -0.02em;
        }
        p {
          margin-bottom: 20px;
          font-size: 15px;
        }
        .divider {
          height: 1px;
          background-color: #f1f5f9;
          margin: 32px 0;
        }
        .social-links {
          margin-top: 16px;
        }
        .social-links a {
          margin: 0 8px;
          color: #94a3b8;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; padding: 40px 10px;">
        <tr>
          <td>
            <div class="container">
              <div class="header">
                <!-- Using absolute URL for SaniNova logo -->
                <img src="${APP_URL}/images/logo.png" alt="SaniNova Logo">
              </div>
              
              <div class="content">
                ${contentHtml}
              </div>
              
              <div class="footer">
                <p style="margin: 0 0 10px 0;"><strong>SaniNova Global Consulting</strong></p>
                <p style="margin: 0 0 16px 0; font-size: 12px; color: #64748b;">
                  Réglementation & Pharmacie | Santé Digitale | Supply Chain & Logistique | Gouvernance & Leadership
                </p>
                <div class="divider" style="margin: 16px 0; background-color: #1e293b;"></div>
                <p style="margin: 0; font-size: 12px; color: #64748b;">
                  Vous recevez cet e-mail car vous êtes abonné à la newsletter de SaniNova.<br>
                  © ${new Date().getFullYear()} SaniNova. Tous droits réservés.
                </p>
                <p style="margin: 12px 0 0 0; font-size: 12px;">
                  <a href="${APP_URL}">Visiter notre site web</a>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Sends a welcome email to a new newsletter subscriber.
 */
export async function sendWelcomeEmail(to: string, locale: string = "fr") {
  const isEn = locale === "en";
  const subject = isEn ? "Welcome to SaniNova Newsletter!" : "Bienvenue dans la communauté SaniNova !";

  const content = isEn
    ? `
      <div class="tag">Welcome</div>
      <h1>Welcome to the SaniNova Community!</h1>
      <p>Hello,</p>
      <p>We are thrilled to count you among our subscribers! By joining the SaniNova newsletter, you will now be the first to receive our key publications, insights, and latest updates in Africa's healthcare sector.</p>
      <p>Our organization is dedicated to promoting:</p>
      <ul>
        <li><strong>Digital Health</strong>: Harnessing technology for better clinical and administrative healthcare outcomes.</li>
        <li><strong>Supply Chain & Logistics</strong>: Optimizing the storage, distribution, and procurement of essential medicines.</li>
        <li><strong>Pharmaceutical Regulation</strong>: Leading pharmacovigilance and standards.</li>
        <li><strong>Governance & Leadership</strong>: Directing health organizations with excellence.</li>
      </ul>
      <p>Explore our latest publications and insights directly on our platform.</p>
      <div style="text-align: center;">
        <a href="${APP_URL}/publications" class="btn">Explore Publications</a>
      </div>
      <p style="margin-top: 28px;">Best regards,<br><strong>The SaniNova Team</strong></p>
    `
    : `
      <div class="tag">Bienvenue</div>
      <h1>Bienvenue dans la communauté SaniNova !</h1>
      <p>Bonjour,</p>
      <p>Nous sommes ravis de vous compter parmi nos abonnés ! En vous inscrivant à la newsletter de SaniNova, vous recevrez en exclusivité nos publications majeures, nos actualités et nos analyses d'experts sur le secteur de la santé en Afrique.</p>
      <p>Notre structure est dédiée à l'avancement de quatre piliers essentiels :</p>
      <ul>
        <li><strong>Santé Digitale</strong> : Accompagnement technologique pour de meilleures performances cliniques et de gestion.</li>
        <li><strong>Supply Chain & Logistique</strong> : Optimisation de l'approvisionnement et de la distribution des intrants de santé.</li>
        <li><strong>Réglementation & Pharmacie</strong> : Vigilance, conformité et conformité aux standards réglementaires.</li>
        <li><strong>Gouvernance & Leadership</strong> : Leadership stratégique pour les systèmes et structures de santé.</li>
      </ul>
      <p>Vous pouvez dès maintenant parcourir nos dernières publications d'experts.</p>
      <div style="text-align: center;">
        <a href="${APP_URL}/publications" class="btn">Parcourir les publications</a>
      </div>
      <p style="margin-top: 28px;">Cordialement,<br><strong>L'équipe SaniNova</strong></p>
    `;

  const html = getEmailLayout(content);
  const text = isEn
    ? "Welcome to SaniNova! Thank you for subscribing. Visit us at " + APP_URL
    : "Bienvenue chez SaniNova ! Merci pour votre abonnement. Retrouvez-nous sur " + APP_URL;

  return sendEmail({ to, subject, html, text });
}

/**
 * Sends a newsletter alert for a new publication.
 */
export async function sendPublicationEmail(
  to: string,
  publication: {
    id: string;
    category: string;
    title_fr: string;
    title_en: string;
    desc_fr: string;
    desc_en: string;
    image_url: string;
    read_time_fr: string;
    read_time_en: string;
  },
  locale: string = "fr"
) {
  const isEn = locale === "en";
  const title = isEn ? publication.title_en : publication.title_fr;
  const desc = isEn ? publication.desc_en : publication.desc_fr;
  const readTime = isEn ? publication.read_time_en : publication.read_time_fr;
  const pubLink = `${APP_URL}/publications/${publication.id}`;

  // Human friendly category names
  const categoryNames: Record<string, string> = {
    digital: isEn ? "Digital Health" : "Santé Digitale",
    governance: isEn ? "Governance & Leadership" : "Gouvernance & Leadership",
    supply_chain: isEn ? "Supply Chain & Logistics" : "Supply Chain & Logistique",
    regulation: isEn ? "Regulation & Pharmacy" : "Réglementation & Pharmacie",
  };
  const categoryLabel = categoryNames[publication.category] || publication.category;

  const subject = isEn 
    ? `New Publication: ${title}` 
    : `Nouvelle Publication : ${title}`;

  // Check cover image absolute URL
  let imageUrl = publication.image_url;
  if (imageUrl && imageUrl.startsWith("/")) {
    imageUrl = `${APP_URL}${imageUrl}`;
  }

  const content = isEn
    ? `
      <div class="tag">${categoryLabel}</div>
      <h1>${title}</h1>
      <p style="font-size: 13px; color: #64748b; margin-top: -10px; margin-bottom: 20px;">
        ⏱️ Reading Time: ${readTime}
      </p>
      
      ${imageUrl ? `<div style="margin-bottom: 24px; text-align: center;"><img src="${imageUrl}" alt="${title}" style="width: 100%; max-width: 540px; height: auto; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);"></div>` : ""}
      
      <p style="font-size: 16px; font-weight: 500; color: #0f172a;">Hello,</p>
      <p>A new research article has just been published on SaniNova. Here is a brief summary of the publication:</p>
      
      <blockquote style="border-left: 4px solid #10b981; padding-left: 16px; margin: 20px 0; color: #475569; font-style: italic;">
        "${desc}"
      </blockquote>
      
      <p>To read the full article, click on the link below:</p>
      
      <div style="text-align: center;">
        <a href="${pubLink}" class="btn">Read the Full Publication</a>
      </div>
      
      <p style="margin-top: 32px; font-size: 13px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        If the button above does not work, copy and paste this link in your browser: <br>
        <a href="${pubLink}" style="color: #10b981; word-break: break-all;">${pubLink}</a>
      </p>
    `
    : `
      <div class="tag">${categoryLabel}</div>
      <h1>${title}</h1>
      <p style="font-size: 13px; color: #64748b; margin-top: -10px; margin-bottom: 20px;">
        ⏱️ Temps de lecture : ${readTime}
      </p>
      
      ${imageUrl ? `<div style="margin-bottom: 24px; text-align: center;"><img src="${imageUrl}" alt="${title}" style="width: 100%; max-width: 540px; height: auto; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);"></div>` : ""}
      
      <p style="font-size: 16px; font-weight: 500; color: #0f172a;">Bonjour,</p>
      <p>Une nouvelle publication vient d'être mise en ligne sur le portail SaniNova. Voici un résumé des thématiques abordées :</p>
      
      <blockquote style="border-left: 4px solid #10b981; padding-left: 16px; margin: 20px 0; color: #475569; font-style: italic;">
        "${desc}"
      </blockquote>
      
      <p>Pour consulter l'intégralité de cet article d'expert, cliquez sur le bouton ci-dessous :</p>
      
      <div style="text-align: center;">
        <a href="${pubLink}" class="btn">Lire la publication complète</a>
      </div>
      
      <p style="margin-top: 32px; font-size: 13px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        Si le bouton ci-dessus ne fonctionne pas, copiez-collez le lien suivant dans votre navigateur : <br>
        <a href="${pubLink}" style="color: #10b981; word-break: break-all;">${pubLink}</a>
      </p>
    `;

  const html = getEmailLayout(content);
  const text = isEn 
    ? `New Publication: ${title}. Read it at: ${pubLink}` 
    : `Nouvelle Publication : ${title}. Lisez la sur : ${pubLink}`;

  return sendEmail({ to, subject, html, text });
}
