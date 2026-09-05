import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'styled-components';
import { baseTheme } from '@/utils/theme';
import NotFoundPage from '@/pages/notFoundPage/notFoundPage';

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});

function RootComponent() {
	return (
		<div className="App">
			<ThemeProvider theme={baseTheme}>
				<Outlet />
			</ThemeProvider>
		</div>
	);
}
