import Brevo from "@getbrevo/brevo";

function getMailConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "La Déguste";
  const tmplIdStr = process.env.BREVO_THANKS_TEMPLATE_ID;
  const templateId = tmplIdStr ? Number(tmplIdStr) : undefined;
  if (!apiKey) return null; // Sans API key, on ne peut rien faire
  return { apiKey, senderEmail, senderName, templateId } as const;
}

export async function sendThanksEmail(toEmail: string): Promise<boolean> {
  const cfg = getMailConfig();
  if (!cfg) return false;

  const api = new Brevo.TransactionalEmailsApi();
  api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, cfg.apiKey);

  try {
    if (cfg.templateId && cfg.senderEmail) {
      await api.sendTransacEmail({
        to: [{ email: toEmail }],
        sender: { email: cfg.senderEmail, name: cfg.senderName },
        templateId: cfg.templateId,
      } as any);
      return true;
    }

    if (!cfg.senderEmail) {
      // Pas de sender configuré: on n’envoie pas, mais on ne bloque pas l’inscription
      return false;
    }

    // Envoi sans template (HTML simple)
    await api.sendTransacEmail({
      to: [{ email: toEmail }],
      sender: { email: cfg.senderEmail, name: cfg.senderName },
      subject: "Bienvenue au Cercle — La Déguste",
      htmlContent:
        "<p>Merci pour votre inscription au Cercle de La Déguste.</p><p>À très vite pour nos trouvailles gastronomiques.</p>",
    } as any);
    return true;
  } catch (err: any) {
    const status = err?.response?.status;
    const body = err?.response?.text || err?.response?.body;
    console.error("[Mailer] Brevo transactional error:", { status, body });
    return false;
  }
}

