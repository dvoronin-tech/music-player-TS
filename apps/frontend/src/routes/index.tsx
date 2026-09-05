import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthToken } from '@/utils/auth';
import Headers from '@/components/headers/headers';
import PreRegPage from '@/pages/preRegPage/PreRegPage';

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		if (getAuthToken()) {
			throw redirect({ to: '/home' });
		}
	},
	component: IndexPage,
});

function IndexPage() {
	return (
		<div className="app_wrapper">
			<Headers type="simple" />
			<PreRegPage />
		</div>
	);
}
