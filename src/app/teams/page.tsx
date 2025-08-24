import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getTeams } from "@/lib/data";

export default async function TeamsPage() {
	const teams = await getTeams();
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<PageHeader title="Teams" />
			<ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{teams.map((t) => (
					<li key={t.id}>
						<Link href={`/teams/${t.id}`} className="block rounded border border-white/10 bg-white/5 p-4 hover:bg-white/[0.04]">
							<div className="font-medium">{t.name}</div>
							<div className="text-xs text-white/60">{t.record}</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}