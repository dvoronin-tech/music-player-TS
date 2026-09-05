import { createReducer } from "@reduxjs/toolkit";
import type { ApiTrack } from "@music-player/backend";
import { selectCurrentTrack, selectPlayList, selectShuffledPlayList, showCurrentPlayListAction, deleteCurrentTrack, addToCurrentPlayList } from "./actionsCurrent";

const initialState: {
    currentPlayList: ApiTrack[],
    trackId: string | null,
    shuffledArr: ApiTrack[],
    showCurrentPlayList: boolean
} = {
    currentPlayList: [],
    trackId: null,
    shuffledArr: [],
    showCurrentPlayList: false
}

const currentPlayListReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(selectPlayList, (state, {payload}) => {
            state.currentPlayList = payload.currentPlayList;
        })
        .addCase(selectCurrentTrack, (state, {payload}) => {
            state.trackId = payload
        })
        .addCase(selectShuffledPlayList, (state, {payload}) => {
            state.shuffledArr = payload
        })
        .addCase(showCurrentPlayListAction, (state, {payload}) => {
            state.showCurrentPlayList = payload
        })
        .addCase(deleteCurrentTrack, (state, {payload}) => {
            state.currentPlayList = state.currentPlayList.filter(item => item.id !== payload);
            if (state.shuffledArr.length !== 0) {
                state.shuffledArr = state.shuffledArr.filter(item => item.id !== payload);
            }
        })
        .addCase(addToCurrentPlayList, (state, {payload}) => {
            const trackIndex = state.currentPlayList.findIndex(item => item.id === state.trackId);
            state.currentPlayList.splice(trackIndex + 1, 0, payload);
        })
})

export default currentPlayListReducer;