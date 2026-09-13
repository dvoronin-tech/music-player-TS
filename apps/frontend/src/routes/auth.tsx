import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthToken } from '@/utils/auth';
import AuthLayout from '@/Layout/AuthLayout/AuthLayout';

export const Route = createFileRoute('/auth')({
	beforeLoad: () => {
		if (getAuthToken()) {
			throw redirect({ to: '/home' });
		}
	},
	component: AuthRouteComponent,
});

function AuthRouteComponent() {
	return <AuthLayout />;
}
