import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function createClient(): SupabaseClient<Database> | null {
	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		return null;
	}
	return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
		global: {
			headers: {
				"x-client-info": "kotr-broadcast",
			},
		},
	});
}

/**
 * Attempt to call a database RPC named `list_tables`.
 * Some environments expose this helper to introspect available tables/views.
 * This is optional and safe to ignore if it returns an error.
 */
export type TableInfo = { name: string; type?: string };

export async function listTables(): Promise<TableInfo[] | null> {
	const client = createClient();
	if (!client) return null;
	try {
		const rpc = (client as unknown as { rpc: <T>(fn: string) => Promise<{ data: T | null; error: { message: string } | null }> }).rpc<TableInfo[]>("list_tables");
		const { data, error } = await rpc;
		if (error) return null;
		return data ?? null;
	} catch {
		return null;
	}
}