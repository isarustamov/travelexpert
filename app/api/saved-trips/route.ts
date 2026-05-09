import { NextResponse } from "next/server";

const memorySavedTrips: unknown[] = [];

export async function GET() {
  return NextResponse.json({ trips: memorySavedTrips, storage: "temporary-memory-mvp" });
}

export async function POST(request: Request) {
  const payload = await request.json();
  memorySavedTrips.push({ ...payload, savedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true, trip: memorySavedTrips[memorySavedTrips.length - 1] }, { status: 201 });
}
