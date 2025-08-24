import { cache } from "react";
import playersJson from "@/data/mock.players.json";
import teamsJson from "@/data/mock.teams.json";
import leadersJson from "@/data/mock.leaders.json";
import notablesJson from "@/data/mock.notables.json";
import recapsJson from "@/data/mock.recaps.json";
import type { LeaderRow, Notable, Player, Recap, Team } from "./types";

export const getPlayers = cache(async (): Promise<Player[]> => {
	return playersJson as unknown as Player[];
});

export const getTeams = cache(async (): Promise<Team[]> => {
	return teamsJson as unknown as Team[];
});

export const getLeaders = cache(async (): Promise<LeaderRow[]> => {
	return leadersJson as unknown as LeaderRow[];
});

export const getNotables = cache(async (): Promise<Notable[]> => {
	return notablesJson as unknown as Notable[];
});

export const getRecaps = cache(async (): Promise<Recap[]> => {
	return recapsJson as unknown as Recap[];
});

export const getPlayerById = cache(async (id: string): Promise<Player | undefined> => {
	const players = (await getPlayers());
	return players.find(p => p.id === id);
});

export const getTeamById = cache(async (id: string): Promise<Team | undefined> => {
	const teams = (await getTeams());
	return teams.find(t => t.id === id);
});