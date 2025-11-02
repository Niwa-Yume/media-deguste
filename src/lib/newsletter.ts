import Brevo from "@getbrevo/brevo";

export type SubscribeResult =
  | { ok: true; status: "subscribed"; message: string }
  | { ok: false; code: "invalid" | "config" | "provider" | "unknown"; message: string };

function getConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdStr = process.env.BREVO_LIST_ID;
  const listId = listIdStr ? Number(listIdStr) : undefined;
  if (!apiKey || !listId || Number.isNaN(listId)) {
    return null;
  }
  return { apiKey, listId } as const;
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, code: "invalid", message: "Email invalide." };
  }

  const cfg = getConfig();
  if (!cfg) {
    console.error("[Newsletter] Config Brevo manquante: définissez BREVO_API_KEY et BREVO_LIST_ID");
    return { ok: false, code: "config", message: "Service indisponible, réessayez plus tard." };
  }

  const api = new Brevo.ContactsApi();
  // Renseigner la clé API
  api.setApiKey(Brevo.ContactsApiApiKeys.apiKey, cfg.apiKey);

  // Préparer le contact (idempotent grâce à updateEnabled)
  const payload = new Brevo.CreateContact();
  payload.email = email.toLowerCase();
  payload.listIds = [cfg.listId];
  payload.updateEnabled = true;

  try {
    const res = await api.createContact(payload);
    // 201 créé, 204 mis à jour (selon SDK). On considère comme inscrit.
    if (res) {
      return { ok: true, status: "subscribed", message: "Inscription prise en compte." };
    }
    return { ok: true, status: "subscribed", message: "Inscription prise en compte." };
  } catch (err: any) {
    const status = err?.response?.status;
    const body = err?.response?.text || err?.response?.body;
    console.error("[Newsletter] Brevo error:", { status, body });
    return { ok: false, code: "provider", message: "Impossible d’inscrire pour le moment." };
  }
}
