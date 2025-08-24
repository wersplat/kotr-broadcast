import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getPlayers, getTeams } from "@/lib/data";

export default async function PlayersPage() {
	const [players, teams] = await Promise.all([getPlayers(), getTeams()]);
	const teamById = new Map(teams.map((t) => [t.id, t]));
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<PageHeader title="Players" />
			<ul className="divide-y divide-white/10 rounded border border-white/10 bg-white/5">
				{players.map((p) => (
					<li key={p.id} className="px-4 py-3 hover:bg-white/[0.04]">
						<Link href={`/players/${p.id}`} className="flex items-center justify-between">
							<span>{p.name}</span>
							<span className="text-white/60 text-sm">{teamById.get(p.teamId)?.abbrev}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}