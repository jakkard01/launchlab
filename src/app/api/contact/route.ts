import { NextResponse } from "next/server";
import { deliverContactLead } from "../../../lib/contact/delivery";
import { logger } from "../../../lib/observability/logger";
import { rateLimit } from "../../../lib/security/rateLimit";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function truncateMessage(message: string, maxLength = 200) {
  if (message.length <= maxLength) {
    return message;
  }

  return `${message.slice(0, maxLength)}...`;
}

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id") ?? undefined;
  const ipHeader = request.headers.get("x-forwarded-for");
  const clientIp = ipHeader ? ipHeader.split(",")[0].trim() : "unknown";

  const limitResult = rateLimit({
    key: `contact:${clientIp}`,
    limit: 5,
    windowMs: 60_000,
  });

  if (!limitResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Demasiadas solicitudes. Intenta de nuevo en breve.",
      },
      { status: 429 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch (error) {
    logger.warn("Contact payload invalid JSON", { requestId, clientIp });
    return NextResponse.json(
      { ok: false, message: "Payload invalido." },
      { status: 400 }
    );
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const source =
    typeof payload.source === "string" ? payload.source.trim() : undefined;

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Nombre demasiado corto." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Email invalido." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, message: "Mensaje demasiado corto." },
      { status: 400 }
    );
  }

  logger.info("Contact request received", {
    requestId,
    clientIp,
    name,
    email,
    source,
    messageLength: message.length,
    messagePreview: truncateMessage(message),
  });

  const leadId = `lead-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  try {
    const delivered = await deliverContactLead({
      leadId,
      createdAt,
      name,
      email,
      message,
      source,
      clientIp,
    });

    logger.info("Contact lead delivered", {
      requestId,
      leadId,
      channel: delivered.channel,
    });
  } catch (error) {
    logger.error("Contact lead delivery failed", {
      requestId,
      leadId,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      {
        ok: false,
        message:
          "No pudimos registrar tu solicitud en este momento. Escríbenos por WhatsApp para atención inmediata.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    leadId,
    message:
      "Solicitud recibida y registrada. Te responderemos por email; si urge, escríbenos por WhatsApp.",
  });
}
