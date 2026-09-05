import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthToken } from '@/utils/auth';
import Auth from '@/pages/auth/auth';

export const Route = createFileRoute('/auth')({
	beforeLoad: () => {
		if (getAuthToken()) {
			throw redirect({ to: '/home' });
		}
	},
	component: AuthRouteComponent,
});

function AuthRouteComponent() {
	return (
		<div className="app_wrapper">
			<Auth />
		</div>
	);
}
