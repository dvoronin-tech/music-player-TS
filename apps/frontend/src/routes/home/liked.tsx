import { createFileRoute } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import LikedTracksLayout from '@/Layout/LikedTracksLayout/LikedTracksLayout';

export const Route = createFileRoute('/home/liked')({
	beforeLoad: () => {
		requireAuth();
	},
	loader: () => prefetchAppData(),
	component: LikedRoutePage,
});

function LikedRoutePage() {
	return <LikedTracksLayout />;
}
