import { NextResponse } from "next/server";
import { getEnv } from "../../../lib/config/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const env = getEnv();

  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    version: env.APP_VERSION ?? null,
    env: env.NODE_ENV,
  });
}
