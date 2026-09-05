import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/api/baseApi';
import uiReducer from '@/store/slices/ui';
import currentReducer from '@/store/slices/current';
import notificationReducer from '@/store/slices/notification';
import trackStateReducer from '@/store/slices/trackState';

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		ui: uiReducer,
		current: currentReducer,
		notification: notificationReducer,
		trackState: trackStateReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
	devTools: false,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
