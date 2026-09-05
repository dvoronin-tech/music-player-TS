import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';
import store from '@/store/store';

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
