import { NextResponse } from "next/server";
import { runMockSearch } from "@/lib/services/search-service";
import { searchSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = searchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search input", details: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json(runMockSearch(parsed.data));
}
