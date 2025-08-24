// Supabase client stub. Real wiring will be added later.
export type SupabaseClient = unknown;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function createClient(): SupabaseClient | null {
	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		return null;
	}
	// Replace with real supabase-js client when wiring env vars
	return null;
}