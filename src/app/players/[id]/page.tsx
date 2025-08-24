export const runtime = 'edge';

import { getPlayerById, getTeams } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";

export default async function PlayerDetail({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const player = await getPlayerById(id);
	const teams = await getTeams();
	const team = teams.find((t) => t.id === player?.teamId);
	if (!player) {
		return <div className="mx-auto max-w-4xl px-4 py-8">Player not found</div>;
	}
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<PageHeader title={player.name} description={`${team?.name ?? ""}${player.position ? ` • ${player.position}` : ""}`} />
			<div className="rounded border border-white/10 bg-white/5 p-4">
				<pre className="text-sm whitespace-pre-wrap">{JSON.stringify(player.stats ?? {}, null, 2)}</pre>
			</div>
		</div>
	);
}