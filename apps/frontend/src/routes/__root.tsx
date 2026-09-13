import {
	createRootRoute,
	Navigate,
	Outlet,
	useRouterState,
} from '@tanstack/react-router';
import Notification from '@/components/notification/notification';
import AuthedShell from '@/Layout/AuthedShell/AuthedShell';
import { getAuthToken } from '@/utils/auth';

function UnknownRouteRedirect() {
	return <Navigate to={getAuthToken() ? '/home' : '/'} replace />;
}

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: UnknownRouteRedirect,
});

function RootComponent() {
	const isPublicPage = useRouterState({
		select: ({ location }) => {
			const path = location.pathname;
			return path === '/' || path === '/auth';
		},
	});

	return (
		<div className="App">
			{isPublicPage ? (
				<Outlet />
			) : (
				<AuthedShell>
					<Outlet />
				</AuthedShell>
			)}
			<Notification considerHeader={!isPublicPage} />
		</div>
	);
}
