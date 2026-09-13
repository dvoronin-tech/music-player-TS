import { createFileRoute } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import MainLayout from '@/Layout/MainLayout/MainLayout';

export const Route = createFileRoute('/home/')({
	beforeLoad: () => {
		requireAuth();
	},
	loader: () => prefetchAppData(),
	component: HomePage,
});

function HomePage() {
	return <MainLayout />;
}
