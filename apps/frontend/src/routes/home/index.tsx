import { createFileRoute } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import AuthedShell from '@/components/layout/AuthedShell';
import Main from '@/pages/Main/Main';

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
			<Main />
		</AuthedShell>
	);
}
