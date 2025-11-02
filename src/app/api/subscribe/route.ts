import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { sendThanksEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const result = await subscribeToNewsletter(email);

    if (!result.ok) {
      // 400 pour invalide, 503 pour config/provider, 500 sinon
      const status =
        result.code === "invalid" ? 400 :
        result.code === "config" ? 503 :
        result.code === "provider" ? 503 : 500;
      return NextResponse.json({ error: result.message, code: result.code }, { status });
    }

    // Essayer d’envoyer un email de remerciement (best-effort)
    sendThanksEmail(email).catch(() => {});

    return NextResponse.json({ ok: true, status: result.status, message: result.message });
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
