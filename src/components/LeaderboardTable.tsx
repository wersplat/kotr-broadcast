import Link from "next/link";
import { LeaderRow, Player } from "@/lib/types";

export function LeaderboardTable({
	leaders,
	players,
	title = "League Leaders",
}: {
	leaders: LeaderRow[];
	players: Player[];
	title?: string;
}) {
	const playerById = new Map(players.map((p) => [p.id, p]));
	return (
		<div className="rounded-lg border border-white/10 overflow-hidden">
			<div className="px-4 py-3 bg-white/5 font-medium">{title}</div>
			<table className="w-full text-sm">
				<thead className="bg-white/5">
					<tr>
						<th className="text-left px-4 py-2 w-48">Metric</th>
						<th className="text-left px-4 py-2">Leaders</th>
					</tr>
				</thead>
				<tbody>
					{leaders.map((row) => (
						<tr key={row.metric} className="odd:bg-white/0 even:bg-white/[0.02]">
							<td className="px-4 py-2 font-medium">{row.metric}</td>
							<td className="px-4 py-2">
								<div className="flex flex-wrap gap-3">
									{row.leaderIds.map((id, idx) => {
										const p = playerById.get(id);
										const value = row.values[idx];
										return p ? (
											<Link key={id} href={`/players/${p.id}`} className="inline-flex items-center gap-2 rounded border border-white/10 px-2 py-1 hover:bg-white/5">
												<span className="text-white/80">{p.name}</span>
												<span className="text-white/60">{value}{row.unit ? ` ${row.unit}` : ""}</span>
											</Link>
										) : null;
									})}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}