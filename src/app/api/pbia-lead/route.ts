import { NextResponse } from 'next/server';
import type { SalesBotLeadPayload } from '../../lib/sales-bot/types';

const allowedTemperatures = ['cold', 'warm', 'hot'];
const allowedOffers = [
  'mejora_web_express',
  'web_local_base',
  'pack_web_contactos',
  'pack_pro_captacion',
];

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 500) : '';
}

function asBooleanOrNull(value: unknown) {
  if (typeof value === 'boolean') return value;
  return null;
}

function isValidPayload(payload: Partial<SalesBotLeadPayload>) {
  return (
    payload.source === 'poweredbyia.com' &&
    payload.channel === 'sales_bot' &&
    typeof payload.score === 'number' &&
    payload.score >= 0 &&
    allowedTemperatures.includes(String(payload.leadTemperature)) &&
    allowedOffers.includes(String(payload.recommendedOffer))
  );
}

export async function POST(request: Request) {
  let rawPayload: Partial<SalesBotLeadPayload>;

  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  if (!isValidPayload(rawPayload)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  const payload: SalesBotLeadPayload = {
    source: 'poweredbyia.com',
    channel: 'sales_bot',
    leadTemperature: rawPayload.leadTemperature!,
    score: Math.min(Math.round(rawPayload.score || 0), 100),
    recommendedOffer: rawPayload.recommendedOffer!,
    businessType: asString(rawPayload.businessType),
    hasWebsite: asBooleanOrNull(rawPayload.hasWebsite),
    goal: asString(rawPayload.goal),
    message: asString(rawPayload.message),
    ctaClicked: asString(rawPayload.ctaClicked),
    pageUrl: asString(rawPayload.pageUrl),
    createdAt: rawPayload.createdAt || new Date().toISOString(),
    userAgent: asString(request.headers.get('user-agent')),
  };

  const webhookUrl = process.env.PBIA_N8N_WEBHOOK_URL;
  const dryRun = process.env.PBIA_LEAD_DRY_RUN !== 'false';

  if (!webhookUrl || dryRun) {
    return NextResponse.json({
      ok: true,
      mode: 'dry-run',
      leadTemperature: payload.leadTemperature,
      score: payload.score,
      recommendedOffer: payload.recommendedOffer,
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({
        ok: true,
        mode: 'webhook_error',
        forwarded: false,
      });
    }

    return NextResponse.json({
      ok: true,
      mode: 'forwarded',
      forwarded: true,
    });
  } catch {
    return NextResponse.json({
      ok: true,
      mode: 'webhook_error',
      forwarded: false,
    });
  }
}
