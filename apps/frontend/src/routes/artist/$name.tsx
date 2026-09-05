import { createFileRoute } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import AuthedShell from '@/components/layout/AuthedShell';
import Artist from '@/pages/artist/artist';

export const Route = createFileRoute('/artist/$name')({
	beforeLoad: () => {
		requireAuth();
	},
	loader: () => prefetchAppData(),
	component: ArtistRoutePage,
});

function ArtistRoutePage() {
	return (
		<AuthedShell>
			<Artist />
		</AuthedShell>
	);
}
