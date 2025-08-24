import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusChip } from "@/components/StatusChip";
import { getMatches, getTeams } from "@/lib/data";

export const runtime = 'edge';

export default async function MatchesIndexPage() {
    const [matches, teams] = await Promise.all([getMatches(), getTeams()]);
    const teamMap = new Map(teams.map(t => [t.id, t] as const));
    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <PageHeader title="Matches" />
            <ul className="space-y-2">
                {matches.map(m => {
                    const home = m.homeTeamId ? teamMap.get(m.homeTeamId) : undefined;
                    const away = m.awayTeamId ? teamMap.get(m.awayTeamId) : undefined;
                    return (
                        <li key={m.id} className="card-base p-3">
                            <Link href={`/matches/${m.id}`} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="font-medium">{away?.abbrev ?? away?.name ?? 'Away'}</div>
                                    <div className="text-white/60">{m.awayScore ?? '-'}</div>
                                    <span className="text-white/40">@</span>
                                    <div className="text-white/60">{m.homeScore ?? '-'}</div>
                                    <div className="font-medium">{home?.abbrev ?? home?.name ?? 'Home'}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <StatusChip status={m.status} />
                                    <span className="text-xs text-white/60">{m.scheduledAt ? new Date(m.scheduledAt).toLocaleString() : null}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


