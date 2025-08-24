import { cache } from "react";
import playersJson from "@/data/mock.players.json";
import teamsJson from "@/data/mock.teams.json";
import leadersJson from "@/data/mock.leaders.json";
import notablesJson from "@/data/mock.notables.json";
import recapsJson from "@/data/mock.recaps.json";
import type { LeaderRow, Notable, Player, Recap, Team, Match } from "./types";
import { createClient } from "./supabase";
import { DEFAULT_TOURNAMENT_ID } from "./config";

type RosterRow = {
	player_id: string | null;
	gamertag: string | null;
	team_id: string | null;
	position: string | null;
	tournament_id: string | null;
};

// Removed unused TeamStatsRow (replaced by teams + rosters)

type TeamTableRow = {
	id: string | null;
	name: string | null;
	abbrev: string | null;
	logo_url: string | null;
};

type PlayerAggRow = {
	player_id: string | null;
	avg_points: number | null;
	avg_assists: number | null;
	avg_rebounds: number | null;
	avg_steals: number | null;
	avg_blocks: number | null;
	tournament_id: string | null;
};

type NotableRow = {
	id: string | null;
	title: string | null;
	description: string | null;
	value: string | null;
	player_id: string | null;
	team_id: string | null;
	tournament_id: string | null;
};

type RecapRow = {
	id: string | null;
	match_id: string | null;
	title: string | null;
	published_at: string | null;
	snippet: string | null;
	thumbnail_url: string | null;
	tournament_id: string | null;
};

// Removed unused PlayerStatsAggRow

type PlayerStatsTotalsRow = {
	player_id: string | null;
	tournament_id: string | null;
	total_points: number | null;
	total_assists: number | null;
	total_rebounds: number | null;
	total_steals: number | null;
	total_blocks: number | null;
};

export const getPlayers = cache(async (): Promise<Player[]> => {
	const client = createClient();
	if (!client) return playersJson as unknown as Player[];
	try {
		const { data, error } = await client
			.from("tournament_team_rosters")
			.select("player_id, gamertag, team_id, position, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID);
		if (error || !data) return playersJson as unknown as Player[];
		const rows = (data as unknown) as RosterRow[];
		const players: Player[] = rows.filter(r => !!r.player_id).map((row) => ({
			id: row.player_id as string,
			name: row.gamertag ?? "",
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
		// 1) Find tournament team ids from rosters view
		const rosterRes = await client
			.from("tournament_team_rosters")
			.select("team_id, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID);
		const rosterRows = ((rosterRes as unknown) as { data: RosterRow[] | null }).data ?? [];
		const teamIds = Array.from(new Set(rosterRows.map(r => r.team_id).filter((v): v is string => !!v)));
		if (teamIds.length === 0) return teamsJson as unknown as Team[];

		// 2) Load team info from teams table
		const { data: teamsData, error: teamsError } = await client
			.from("teams")
			.select("id, name, abbrev, logo_url")
			.in("id", teamIds);
		if (teamsError || !teamsData) return teamsJson as unknown as Team[];
		const trows = (teamsData as unknown) as TeamTableRow[];
		const teams: Team[] = trows.filter(r => !!r.id).map((row) => ({
			id: row.id as string,
			name: row.name ?? "",
			abbrev: row.abbrev ?? (row.name?.slice(0, 3)?.toUpperCase() ?? ""),
			logoUrl: row.logo_url ?? undefined,
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
			.from("tournament_player_stats")
			.select("player_id, avg_points, avg_assists, avg_rebounds, avg_steals, avg_blocks, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID);
		if (error || !data) return leadersJson as unknown as LeaderRow[];
		const rows = (data as unknown) as PlayerAggRow[];
		function top(metricKey: keyof PlayerAggRow, label: string, unit?: string): LeaderRow {
			const sorted = [...rows]
				.filter(r => (r[metricKey] as number | null) != null && r.player_id)
				.sort((a, b) => Number((b[metricKey] as number | null) ?? 0) - Number((a[metricKey] as number | null) ?? 0))
				.slice(0, 5);
			return {
				metric: label,
				leaderIds: sorted.map(r => r.player_id as string),
				values: sorted.map(r => Number((r[metricKey] as number | null) ?? 0)),
				unit,
			};
		}
		return [
			top("avg_points", "Points", "ppg"),
			top("avg_assists", "Assists", "apg"),
			top("avg_rebounds", "Rebounds", "rpg"),
			top("avg_steals", "Steals", "spg"),
			top("avg_blocks", "Blocks", "bpg"),
		];
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
		const rows = (data as unknown) as NotableRow[];
		const notables: Notable[] = rows.filter(r => !!r.id).map((row) => ({
			id: row.id as string,
			title: row.title ?? "",
			description: row.description ?? "",
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
		const rows = (data as unknown) as RecapRow[];
		const recaps: Recap[] = rows.filter(r => !!r.id && !!r.match_id).map((row) => ({
			id: row.id as string,
			matchId: row.match_id as string,
			title: row.title ?? "",
			publishedAt: row.published_at ?? "",
			snippet: row.snippet ?? "",
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
			.select("player_id, gamertag, team_id, position, tournament_id")
			.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
			.eq("player_id", id)
			.single();
		if (error || !data) return undefined;
		// Try to enrich with tournament_player_stats aggregates
		let stats: Record<string, number> | undefined = undefined;
		try {
			const statsRes = await client
				.from("tournament_player_stats")
				.select("player_id, tournament_id, total_points, total_assists, total_rebounds, total_steals, total_blocks")
				.eq("tournament_id", DEFAULT_TOURNAMENT_ID)
				.eq("player_id", id)
				.single();
			const sdata = ((statsRes as unknown) as { data: PlayerStatsTotalsRow | null }).data;
			if (sdata) {
				stats = {
					points: Number(sdata.total_points ?? 0),
					assists: Number(sdata.total_assists ?? 0),
					rebounds: Number(sdata.total_rebounds ?? 0),
					steals: Number(sdata.total_steals ?? 0),
					blocks: Number(sdata.total_blocks ?? 0),
				};
			}
		} catch {}
		const prow = (data as unknown) as RosterRow;
		if (!prow.player_id) return undefined;
		return {
			id: prow.player_id,
			name: prow.gamertag ?? "",
			teamId: prow.team_id ?? "",
			position: prow.position ?? undefined,
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
			.from("teams")
			.select("id, name, abbrev, logo_url")
			.eq("id", id)
			.single();
		if (error || !data) return undefined;
		const trow = (data as unknown) as TeamTableRow;
		if (!trow.id) return undefined;
		return {
			id: trow.id,
			name: trow.name ?? "",
			abbrev: trow.abbrev ?? trow.name?.slice(0, 3)?.toUpperCase() ?? "",
			logoUrl: trow.logo_url ?? undefined,
		};
	} catch {
		return undefined;
	}
});

// Matches: fetch from `matches` table if available. Fallback: synthesize minimal mock.
type MatchRow = {
	 id: string | null;
	 status: string | null;
	 home_team_id: string | null;
	 away_team_id: string | null;
	 home_score: number | null;
	 away_score: number | null;
	 scheduled_at: string | null;
};

export const getMatchById = cache(async (id: string): Promise<Match | undefined> => {
	const client = createClient();
	if (!client) return undefined;
	try {
		const { data, error } = await client
			.from("matches")
			.select("id, status, home_team_id, away_team_id, home_score, away_score, scheduled_at")
			.eq("id", id)
			.single();
		if (error || !data) return undefined;
		const row = (data as unknown) as MatchRow;
		if (!row.id) return undefined;
		return {
			id: row.id,
			status: row.status ?? undefined,
			homeTeamId: row.home_team_id ?? undefined,
			awayTeamId: row.away_team_id ?? undefined,
			homeScore: row.home_score ?? undefined,
			awayScore: row.away_score ?? undefined,
			scheduledAt: row.scheduled_at ?? undefined,
		};
	} catch {
		return undefined;
	}
});

export const getMatches = cache(async (): Promise<Match[]> => {
    const client = createClient();
    if (!client) return [];
    try {
        const { data, error } = await client
            .from("matches")
            .select("id, status, home_team_id, away_team_id, home_score, away_score, scheduled_at")
            .order("scheduled_at", { ascending: false })
            .limit(50);
        if (error || !data) return [];
        const rows = (data as unknown) as MatchRow[];
        return rows.filter(r => !!r.id).map(row => ({
            id: row.id as string,
            status: row.status ?? undefined,
            homeTeamId: row.home_team_id ?? undefined,
            awayTeamId: row.away_team_id ?? undefined,
            homeScore: row.home_score ?? undefined,
            awayScore: row.away_score ?? undefined,
            scheduledAt: row.scheduled_at ?? undefined,
        }));
    } catch {
        return [];
    }
});

export type MatchPeriod = { period: number; home: number; away: number };

export const getMatchPeriods = cache(async (matchId: string): Promise<MatchPeriod[]> => {
    const client = createClient();
    if (!client) return [];
    try {
        const { data, error } = await client
            .from("match_periods")
            .select("match_id, period_number, home_score, away_score")
            .eq("match_id", matchId)
            .order("period_number", { ascending: true });
        if (error || !data) return [];
        const rows = (data as unknown) as { match_id: string | null; period_number: number | null; home_score: number | null; away_score: number | null }[];
        return rows
            .filter(r => (r.period_number as number | null) != null)
            .map(r => ({ period: Number(r.period_number), home: Number(r.home_score ?? 0), away: Number(r.away_score ?? 0) }));
    } catch {
        return [];
    }
});