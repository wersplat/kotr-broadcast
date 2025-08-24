export const runtime = 'edge';

import Link from "next/link";
import Image from "next/image";
import { getPlayers, getTeamById } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";

export default async function TeamDetail({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const team = await getTeamById(id);
	const players = await getPlayers();
	if (!team) return <div className="mx-auto max-w-4xl px-4 py-8">Team not found</div>;
	const roster = players.filter((p) => p.teamId === team.id);
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="flex items-center gap-3 mb-2">
				{team.logoUrl ? (
					<Image src={team.logoUrl} alt={team.abbrev} width={40} height={40} className="rounded object-cover" />
				) : null}
				<PageHeader title={team.name} description={team.record} />
			</div>
			<div className="mt-4 card-base">
				<div className="px-4 py-2 font-medium">Roster</div>
				<ul className="divide-y divide-white/10">
					{roster.map((p) => (
						<li key={p.id} className="px-4 py-2">
							<Link href={`/players/${p.id}`} className="hover:underline">{p.name}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}