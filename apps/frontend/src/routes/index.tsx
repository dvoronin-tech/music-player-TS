import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthToken } from '@/utils/auth';
import SimpleHeader from '@/components/headers/SimpleHeader';
import PreRegPage from '@/components/preRegPage/PreRegPage';

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
		<>
			<SimpleHeader />
			<PreRegPage />
		</>
	);
}
