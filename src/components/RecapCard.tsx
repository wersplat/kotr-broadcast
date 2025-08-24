import { format } from "date-fns";
import Link from "next/link";
import { Recap } from "@/lib/types";

export function RecapCard({ recap }: { recap: Recap }) {
	const date = format(new Date(recap.publishedAt), "MMM d, yyyy");
	return (
		<Link href={`/matches/${recap.matchId}`} className="block rounded-lg overflow-hidden border border-white/10 hover:bg-white/[0.04]">
			{recap.thumbnailUrl ? (
				<div className="aspect-[16/9] bg-white/5" style={{ backgroundImage: `url(${recap.thumbnailUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
			) : null}
			<div className="p-4">
				<div className="text-xs text-white/60">{date}</div>
				<div className="mt-1 font-medium">{recap.title}</div>
				<p className="mt-1 text-sm text-white/70">{recap.snippet}</p>
			</div>
		</Link>
	);
}