import { LeaderboardTable } from "@/components/LeaderboardTable";
import { PageHeader } from "@/components/PageHeader";
import { getLeaders, getPlayers } from "@/lib/data";

export default async function LeadersPage() {
	const [players, leaders] = await Promise.all([getPlayers(), getLeaders()]);
	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<PageHeader title="League Leaders" />
			<LeaderboardTable leaders={leaders} players={players} />
		</div>
	);
}