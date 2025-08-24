import Link from "next/link";
import { Team } from "@/lib/types";

export function TeamChip({ team }: { team: Team }) {
	return (
		<Link href={`/teams/${team.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm hover:bg-white/5">
			<span className="font-medium">{team.abbrev}</span>
			{team.record ? <span className="text-white/60">{team.record}</span> : null}
		</Link>
	);
}