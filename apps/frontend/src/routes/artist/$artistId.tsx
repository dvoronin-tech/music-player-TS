import { createFileRoute } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import AuthedShell from '@/components/layout/AuthedShell';
import ArtistLayout from '@/Layout/ArtistLayout/ArtistLayout';

export const Route = createFileRoute('/artist/$artistId')({
	beforeLoad: () => {
		requireAuth();
	},
	loader: () => prefetchAppData(),
	component: ArtistRoutePage,
});

function ArtistRoutePage() {
	return (
		<AuthedShell>
			<ArtistLayout />
		</AuthedShell>
	);
}
