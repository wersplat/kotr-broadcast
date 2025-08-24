import { ReactNode } from "react";
import clsx from "clsx";

export function StatCard({
	title,
	value,
	accent = "",
	action,
	className,
}: {
	title: string;
	value: ReactNode;
	accent?: string;
	action?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={clsx(
				"rounded-lg border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6",
				className
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm text-white/60">{title}</p>
					<div className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
						{value}
					</div>
				</div>
				{action}
			</div>
			{accent ? (
				<div className="mt-4 text-xs uppercase text-white/50">{accent}</div>
			) : null}
		</div>
	);
}