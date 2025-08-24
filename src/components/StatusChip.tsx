type Props = { status?: string };

const STATUS_STYLES: Record<string, string> = {
  scheduled: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "in progress": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  approved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  reviewed: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "under review": "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export function StatusChip({ status }: Props) {
  if (!status) return null;
  const key = status.toLowerCase();
  const style = STATUS_STYLES[key] ?? "bg-white/10 text-white/70 border-white/20";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${style}`}>
      {status}
    </span>
  );
}


