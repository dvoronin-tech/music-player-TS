import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router';
import Notification from '@/components/notification/notification';
import { getAuthToken } from '@/utils/auth';

function UnknownRouteRedirect() {
	return <Navigate to={getAuthToken() ? '/home' : '/'} replace />;
}

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: UnknownRouteRedirect,
});

function RootComponent() {
	return (
		<div className="App">
			<Outlet />
			<Notification />
		</div>
	);
}
