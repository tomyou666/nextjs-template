import { APP_COPYRIGHT, APP_VERSION } from '@/lib/share/constants'

export function Footer() {
	return (
		<footer className="border-t px-6 py-4">
			<div className="container mx-auto flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
				<div className="text-muted-foreground text-sm">{APP_COPYRIGHT}</div>
				<div className="text-muted-foreground text-sm">
					バージョン: {APP_VERSION}
				</div>
			</div>
		</footer>
	)
}
