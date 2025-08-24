import { PageHeader } from "@/components/PageHeader";
import { RecapCard } from "@/components/RecapCard";
import { getRecaps } from "@/lib/data";

export default async function RecapsPage() {
	const recaps = await getRecaps();
	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<PageHeader title="Recaps" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{recaps.map((r) => (
					<RecapCard key={r.id} recap={r} />
				))}
			</div>
		</div>
	);
}