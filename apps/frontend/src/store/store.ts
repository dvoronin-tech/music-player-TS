import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/api/baseApi';
import uiReducer from '@/store/slices/ui';
import notificationReducer from '@/store/slices/notification';
import playerReducer from '@/store/slices/player';
import { createPlayerMiddleware } from '@/store/middleware/player';

const playerMiddleware = createPlayerMiddleware();

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		ui: uiReducer,
		notification: notificationReducer,
		player: playerReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(playerMiddleware, baseApi.middleware),
	devTools: false,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
