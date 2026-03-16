import { NextResponse } from "next/server";
import { getStoreOperationalReadiness } from "../../../../lib/mo/data/sheetsStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const readiness = await getStoreOperationalReadiness();
  const status = readiness.ok ? 200 : 503;

  return NextResponse.json(readiness, {
    status,
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=90",
    },
  });
}
