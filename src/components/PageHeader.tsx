export function PageHeader({ title, description }: { title: string; description?: string }) {
	return (
		<div className="mb-6">
			<h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
			{description ? (
				<p className="mt-1 text-white/70">{description}</p>
			) : null}
		</div>
	);
}