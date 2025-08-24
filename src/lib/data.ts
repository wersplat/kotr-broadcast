import { cache } from "react";
import playersJson from "@/data/mock.players.json";
import teamsJson from "@/data/mock.teams.json";
import leadersJson from "@/data/mock.leaders.json";
import notablesJson from "@/data/mock.notables.json";
import recapsJson from "@/data/mock.recaps.json";
import type { LeaderRow, Notable, Player, Recap, Team } from "./types";
import { createClient } from "./supabase";
import { DEFAULT_TOURNAMENT_ID } from "./config";

type RosterRow = {
	player_id: string;
	gamertag?: string | null;
	player_name?: string | null;
	team_id?: string | null;
	position?: string | null;
	tournament_id: string;
};

type TeamStatsRow = {
	team_id: string;
	team_name: string;
	team_abbrev?: string | null;
	wins?: number | null; // optional alternate name for wins
	losses?: number | null;
	wins2?: number | null; // optional alternate name for wins
	/** Required key */
	tournament_id: string;
	/** Canonical field if present */
	wins_actual?: number | null;
	/** Canonical wins field */
	wins_real?: number | null;
	/** Preferred canonical wins field */
	wins_primary?: number | null;
	/** Standard wins field */
	wins_std?: number | null;
	/** The real wins field we will try to read: */
	wins_final?: number | null;
	/** Real wins */
	wins_truewins?: number | null;
	/** The actual wins key we expect most: */
	wins_count?: number | null;
	/** Fallback wins */
	/***/
	/** Ultimately we only read `wins` and `losses` when present */
};

type TopPerformerRow = {
	metric: string;
	player_id: string;
	value: number | null;
	unit?: string | null;
	tournament_id: string;
};

type NotableRow = {
	id: string;
	title: string;
	description: string;
	value?: string | null;
	player_id?: string | null;
	team_id?: string | null;
	tournament_id: string;
};

type RecapRow = {
	id: string;
	match_id: string;
	title: string;
	published_at: string;
	snippet: string;
	thumbnail_url?: string | null;
	tournament_id: string;
};

type PlayerStatsAggRow = {
	player_id: string;
	tournament_id: string;
	points?: number | null;
	assists?: number | null;
	rebounds?: number | null;
	steals?: number | null;
	blocks?: number | null;
};

export const getPlayers = cache(async (): Promise<Player[]> => {
	const client = createClient();
	if (!client) return playersJson as unknown as Player[];
	try {
		const { data, error } = await client
			.from("tournament_team_rosters")
			.select("player_id, gamertag, player_name, team_id, position, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID);
		if (error || !data) return playersJson as unknown as Player[];
		const players: Player[] = data.map((row: RosterRow) => ({
			id: row.player_id,
			name: row.gamertag ?? row.player_name ?? "",
			teamId: row.team_id ?? "",
			position: row.position ?? undefined,
		}));
		return players;
	} catch {
		return playersJson as unknown as Player[];
	}
});

export const getTeams = cache(async (): Promise<Team[]> => {
	const client = createClient();
	if (!client) return teamsJson as unknown as Team[];
	try {
		const { data, error } = await client
			.from("tournament_team_stats")
			.select("team_id, team_name, team_abbrev, wins, losses, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID);
		if (error || !data) return teamsJson as unknown as Team[];
		const teams: Team[] = data.map((row: TeamStatsRow) => ({
			id: row.team_id,
			name: row.team_name,
			abbrev: row.team_abbrev ?? row.team_name?.slice(0, 3)?.toUpperCase() ?? "",
			record: row.wins != null && row.losses != null ? `${row.wins}-${row.losses}` : undefined,
		}));
		return teams;
	} catch {
		return teamsJson as unknown as Team[];
	}
});

export const getLeaders = cache(async (): Promise<LeaderRow[]> => {
	const client = createClient();
	if (!client) return leadersJson as unknown as LeaderRow[];
	try {
		const { data, error } = await client
			.from("top_tournament_performers")
			.select("metric, player_id, value, unit, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
			.order("value", { ascending: false });
		if (error || !data) return leadersJson as unknown as LeaderRow[];
		// Group rows by metric and build LeaderRow with arrays
		const byMetric = new Map<string, { leaderIds: string[]; values: number[]; unit?: string }>();
		for (const row of data as TopPerformerRow[]) {
			const key: string = row.metric;
			const existing: { leaderIds: string[]; values: number[]; unit?: string } =
				byMetric.get(key) ?? { leaderIds: [], values: [], unit: row.unit ?? undefined };
			existing.leaderIds.push(row.player_id);
			existing.values.push(Number(row.value ?? 0));
			existing.unit = existing.unit ?? (row.unit ?? undefined);
			byMetric.set(key, existing);
		}
		const leaders: LeaderRow[] = Array.from(byMetric.entries()).map(([metric, agg]) => ({
			metric,
			leaderIds: agg.leaderIds,
			values: agg.values,
			unit: agg.unit,
		}));
		return leaders;
	} catch {
		return leadersJson as unknown as LeaderRow[];
	}
});

export const getNotables = cache(async (): Promise<Notable[]> => {
	const client = createClient();
	if (!client) return notablesJson as unknown as Notable[];
	try {
		const { data, error } = await client
			.from("tournament_notables_view")
			.select("id, title, description, value, player_id, team_id, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID);
		if (error || !data) return notablesJson as unknown as Notable[];
		const notables: Notable[] = data.map((row: NotableRow) => ({
			id: row.id,
			title: row.title,
			description: row.description,
			value: row.value ?? undefined,
			playerId: row.player_id ?? undefined,
			teamId: row.team_id ?? undefined,
		}));
		return notables;
	} catch {
		return notablesJson as unknown as Notable[];
	}
});

export const getRecaps = cache(async (): Promise<Recap[]> => {
	const client = createClient();
	if (!client) return recapsJson as unknown as Recap[];
	try {
		const { data, error } = await client
			.from("tournament_recaps_view")
			.select("id, match_id, title, published_at, snippet, thumbnail_url, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
			.order("published_at", { ascending: false })
			.limit(20);
		if (error || !data) return recapsJson as unknown as Recap[];
		const recaps: Recap[] = data.map((row: RecapRow) => ({
			id: row.id,
			matchId: row.match_id,
			title: row.title,
			publishedAt: row.published_at,
			snippet: row.snippet,
			thumbnailUrl: row.thumbnail_url ?? undefined,
		}));
		return recaps;
	} catch {
		return recapsJson as unknown as Recap[];
	}
});

export const getPlayerById = cache(async (id: string): Promise<Player | undefined> => {
	const client = createClient();
	if (!client) {
		const players = (await getPlayers());
		return players.find(p => p.id === id);
	}
	try {
		const { data, error } = await client
			.from("tournament_team_rosters")
			.select("player_id, gamertag, player_name, team_id, position, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
			.eq("player_id", id)
			.single();
		if (error || !data) return undefined;
		// Try to enrich with tournament_player_stats aggregates
		let stats: Record<string, number> | undefined = undefined;
		try {
			const statsRes = await client
				.from("tournament_player_stats")
				.select("player_id, tournament_id, points, assists, rebounds, steals, blocks")
				.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
				.eq("player_id", id)
				.single();
			if (!statsRes.error && statsRes.data) {
				stats = {
					points: Number(statsRes.data.points ?? 0),
					assists: Number(statsRes.data.assists ?? 0),
					rebounds: Number(statsRes.data.rebounds ?? 0),
					steals: Number(statsRes.data.steals ?? 0),
					blocks: Number(statsRes.data.blocks ?? 0),
				};
			}
		} catch {}
		return {
			id: data.player_id,
			name: data.gamertag ?? data.player_name ?? "",
			teamId: data.team_id ?? "",
			position: data.position ?? undefined,
			stats,
		};
	} catch {
		return undefined;
	}
});

export const getTeamById = cache(async (id: string): Promise<Team | undefined> => {
	const client = createClient();
	if (!client) {
		const teams = (await getTeams());
		return teams.find(t => t.id === id);
	}
	try {
		const { data, error } = await client
			.from("tournament_team_stats")
			.select("team_id, team_name, team_abbrev, wins, losses, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
			.eq("team_id", id)
			.single();
		if (error || !data) return undefined;
		return {
			id: data.team_id,
			name: data.team_name,
			abbrev: data.team_abbrev ?? data.team_name?.slice(0, 3)?.toUpperCase() ?? "",
			record: data.wins != null && data.losses != null ? `${data.wins}-${data.losses}` : undefined,
		};
	} catch {
		return undefined;
	}
});