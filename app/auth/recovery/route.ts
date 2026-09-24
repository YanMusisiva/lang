import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const flowId = url.searchParams.get("sb_flow_id");

  if (!code || !isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/auth?error=recovery", url.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(
    code,
    flowId ? { flowId } : undefined,
  );

  if (error) {
    return NextResponse.redirect(new URL("/auth?error=recovery", url.origin));
  }

  const response = NextResponse.redirect(new URL("/auth/reset", url.origin));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
