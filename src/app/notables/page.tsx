import { PageHeader } from "@/components/PageHeader";
import { getNotables, getPlayers, getTeams } from "@/lib/data";

export default async function NotablesPage() {
	const [notables, players, teams] = await Promise.all([
		getNotables(),
		getPlayers(),
		getTeams(),
	]);
	const playerById = new Map(players.map((p) => [p.id, p]));
	const teamById = new Map(teams.map((t) => [t.id, t]));
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<PageHeader title="Notable Stats" />
			<ul className="space-y-3">
				{notables.map((n) => (
					<li key={n.id} className="rounded border border-white/10 p-4 bg-white/5">
						<div className="font-medium">{n.title}</div>
						<div className="text-white/80 mt-1">{n.description}</div>
						<div className="text-white/60 text-sm mt-1">
							{n.value ? <span>{n.value} • </span> : null}
							{n.playerId ? <span>{playerById.get(n.playerId)?.name}</span> : null}
							{n.teamId ? <span> {teamById.get(n.teamId)?.name}</span> : null}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}