export const runtime = 'edge';

import { PageHeader } from "@/components/PageHeader";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<PageHeader title={`Match ${id}`} description="Match details coming soon" />
			<div className="rounded border border-white/10 bg-white/5 p-4">This page will display match stats and recap.</div>
		</div>
	);
}