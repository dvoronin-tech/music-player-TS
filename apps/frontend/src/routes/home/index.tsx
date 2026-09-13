import { createFileRoute } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import AuthedShell from '@/components/layout/AuthedShell';
import MainLayout from '@/Layout/MainLayout/MainLayout';

export const Route = createFileRoute('/home/')({
	beforeLoad: () => {
		requireAuth();
	},
	loader: () => prefetchAppData(),
	component: HomePage,
});

function HomePage() {
	return (
		<AuthedShell>
			<MainLayout />
		</AuthedShell>
	);
}
