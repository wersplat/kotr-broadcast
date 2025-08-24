import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { getLeaders, getNotables, getPlayers, getRecaps } from "@/lib/data";

export default async function Home() {
	const [players, leaders, notables, recaps] = await Promise.all([
		getPlayers(),
		getLeaders(),
		getNotables(),
		getRecaps(),
	]);
	const latestRecap = recaps[0];
	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<PageHeader title="KOTR Broadcast" description="Overview dashboard" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<StatCard title="Total Players" value={players.length} accent="Roster size" />
				<StatCard title="Leader Categories" value={leaders.length} accent="Top performers" />
				<StatCard title="Notables" value={notables.length} accent="Interesting stats" />
			</div>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2">
					<LeaderboardTable leaders={leaders} players={players} />
				</div>
				<div className="space-y-4">
					{latestRecap ? (
						<StatCard
							title="Latest Recap"
							value={<Link href={`/matches/${latestRecap.matchId}`}>{latestRecap.title}</Link>}
							accent="Most recent story"
						/>
					) : (
						<StatCard title="Latest Recap" value="No recaps yet" />
					)}
					<StatCard
						title="Notables"
						value={<Link href="/notables">View all</Link>}
						accent="Interesting achievements"
					/>
				</div>
			</div>
		</div>
	);
}
