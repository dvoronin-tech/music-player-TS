import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/api/baseApi";
import uiReducer from "@/store/ui/reducerUi";
import currentPlayListReducer from "@/store/current/reducerCurrent";
import notificationQueueReducer from "@/store/notificationQueue/reducerNotification";
import trackStateReducer from "@/store/trackState/reducerTrackState";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        ui: uiReducer,
        current: currentPlayListReducer,
        notification: notificationQueueReducer,
        trackState: trackStateReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: false,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
