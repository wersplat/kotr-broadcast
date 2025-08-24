export const runtime = 'edge';

import { PageHeader } from "@/components/PageHeader";
import { getMatchById, getMatchPeriods, getTeamById } from "@/lib/data";
import { StatusChip } from "@/components/StatusChip";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const match = await getMatchById(id);
	const homeTeam = match?.homeTeamId ? await getTeamById(match.homeTeamId) : undefined;
	const awayTeam = match?.awayTeamId ? await getTeamById(match.awayTeamId) : undefined;
	const periods = match ? await getMatchPeriods(match.id) : [];
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<PageHeader
				title={match ? `${awayTeam?.abbrev ?? awayTeam?.name ?? 'TBD'} @ ${homeTeam?.abbrev ?? homeTeam?.name ?? 'TBD'}` : `Match ${id}`}
				description={match?.scheduledAt ? new Date(match.scheduledAt).toLocaleString() : undefined}
			/>
			<div className="mb-4 flex items-center gap-2">
				<StatusChip status={match?.status} />
			</div>
			<div className="card-base p-4">
				{match ? (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="font-medium">{awayTeam?.name ?? 'Away'}</span>
							<span className="text-white/60">{match.awayScore ?? '-'}</span>
						</div>
						<span className="text-white/40">@</span>
						<div className="flex items-center gap-2">
							<span className="text-white/60">{match.homeScore ?? '-'}</span>
							<span className="font-medium">{homeTeam?.name ?? 'Home'}</span>
						</div>
					</div>
				) : (
					<div>Match not found</div>
				)}
			</div>
			<div className="mt-4 card-base p-4">
				<div className="font-medium mb-2">Periods</div>
				{periods.length > 0 ? (
					<ul className="grid grid-cols-2 gap-y-1 text-sm">
						{periods.map(p => (
							<li key={p.period} className="flex items-center justify-between">
								<span className="text-white/70">Period {p.period}</span>
								<span className="text-white/90">{p.away} - {p.home}</span>
							</li>
						))}
					</ul>
				) : (
					<div className="text-white/60 text-sm">No period data available.</div>
				)}
			</div>
		</div>
	);
}