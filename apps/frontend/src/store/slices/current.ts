import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiTrack } from '@music-player/backend';

interface ICurrentState {
	currentTrack: ApiTrack | null;
	currentPlayList: ApiTrack[];
	shuffledArr: ApiTrack[];
	showCurrentPlayList: boolean;
}

const initialState: ICurrentState = {
	currentTrack: null,
	currentPlayList: [],
	shuffledArr: [],
	showCurrentPlayList: false,
};

export const currentSlice = createSlice({
	name: 'current',
	initialState,
	reducers: {
		selectCurrentPlayList(state, action: PayloadAction<ApiTrack[]>) {
			state.currentPlayList = action.payload;
		},
		selectCurrentTrack(state, action: PayloadAction<string>) {
			state.currentTrack =
				state.currentPlayList.find((item) => item.id === action.payload) ??
				null;
		},
		selectShuffledPlayList(state, action: PayloadAction<ApiTrack[]>) {
			state.shuffledArr = action.payload;
		},
		showCurrentPlayListAction(state, action: PayloadAction<boolean>) {
			state.showCurrentPlayList = action.payload;
		},
		deleteCurrentTrack(state, action: PayloadAction<string>) {
			state.currentPlayList = state.currentPlayList.filter(
				(item) => item.id !== action.payload,
			);
			if (state.shuffledArr.length !== 0) {
				state.shuffledArr = state.shuffledArr.filter(
					(item) => item.id !== action.payload,
				);
			}
		},
		addToCurrentPlayList(state, action: PayloadAction<ApiTrack>) {
			const trackIndex = state.currentPlayList.findIndex(
				(item) => item.id === state.currentTrack?.id,
			);
			state.currentPlayList.splice(trackIndex + 1, 0, action.payload);
		},
	},
});

export const {
	selectCurrentPlayList,
	selectCurrentTrack,
	selectShuffledPlayList,
	showCurrentPlayListAction,
	deleteCurrentTrack,
	addToCurrentPlayList,
} = currentSlice.actions;

export default currentSlice.reducer;
