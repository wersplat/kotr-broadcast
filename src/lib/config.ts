export const DEFAULT_TOURNAMENT_ID = "0880ac2b-6d8d-4849-a22e-c1c32132e6c3";

export function getSupabaseEnv() {
	return {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
	};
}

