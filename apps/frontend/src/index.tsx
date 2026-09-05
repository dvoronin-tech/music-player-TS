import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';
import store from '@/store/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
