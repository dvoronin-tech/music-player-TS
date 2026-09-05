import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/api/baseApi";
import likedReducer from "@/store/likedPlayList/reducerLiked";
import currentPlayListReducer from "@/store/current/reducerCurrent";
import userReducer from "@/store/user/reducerUser";
import trackListReducer from "@/store/tracks/reducerTrackList";
import notificationQueueReducer from "@/store/notificationQueue/reducerNotification";
import artistsTracksReducer from "@/store/artistsTracks/reducerArtistsTracks";
import likedArtistsReducer from "@/store/likedArtists/reducerLikedArtists";
import trackStateReducer from "@/store/trackState/reducerTrackState";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        liked: likedReducer,
        current: currentPlayListReducer,
        user: userReducer,
        trackList: trackListReducer,
        notification: notificationQueueReducer,
        artistsTracks: artistsTracksReducer,
        likedArtists: likedArtistsReducer,
        trackState: trackStateReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: false,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
