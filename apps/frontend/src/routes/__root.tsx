import { createRootRoute, Outlet } from '@tanstack/react-router';
import NotFoundPage from '@/pages/notFoundPage/notFoundPage';

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});

function RootComponent() {
	return (
		<div className="App">
			<Outlet />
		</div>
	);
}
