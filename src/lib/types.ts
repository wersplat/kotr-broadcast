export type Player = {
	id: string;
	name: string;
	teamId: string;
	position?: string;
	jerseyNumber?: number;
	stats?: Record<string, number>;
};

export type Team = {
	id: string;
	name: string;
	abbrev: string;
	logoUrl?: string;
	record?: string;
};

export type LeaderRow = {
	metric: string; // e.g. Points, Assists
	leaderIds: string[]; // player ids sorted by rank
	values: number[]; // corresponding values
	unit?: string; // e.g. pts, ast
};

export type Notable = {
	id: string;
	title: string;
	description: string;
	value?: string;
	playerId?: string;
	teamId?: string;
};

export type Recap = {
	id: string;
	matchId: string;
	title: string;
	publishedAt: string; // ISO date
	snippet: string;
	thumbnailUrl?: string;
};

export type Match = {
	id: string;
	status?: string;
	homeTeamId?: string;
	awayTeamId?: string;
	homeScore?: number;
	awayScore?: number;
	scheduledAt?: string; // ISO date
};