import Link from "next/link";
import Image from "next/image";
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
						<Link href={`/teams/${t.id}`} className="block card-base p-4 hover:bg-white/[0.04]">
							<div className="flex items-center gap-2">
								{t.logoUrl ? (
									<Image src={t.logoUrl} alt={t.abbrev} width={24} height={24} className="rounded-full object-cover" />
								) : null}
								<div className="font-medium">{t.name}</div>
							</div>
							{t.record ? (
								<div className="text-xs text-white/60">{t.record}</div>
							) : null}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}