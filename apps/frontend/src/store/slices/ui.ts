import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
	showUserData: boolean;
	showFullScreen: boolean;
	showCurrentPlayList: boolean;
}

const initialState: UiState = {
	showUserData: false,
	showFullScreen: false,
	showCurrentPlayList: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleShowUserData(state, action: PayloadAction<boolean>) {
			state.showUserData = action.payload;
		},
		toggleShowFullScreen(state, action: PayloadAction<boolean>) {
			state.showFullScreen = action.payload;
		},
		setCurrentPlayListOpen(state, action: PayloadAction<boolean>) {
			state.showCurrentPlayList = action.payload;
		},
	},
});

export const {
	toggleShowUserData,
	toggleShowFullScreen,
	setCurrentPlayListOpen,
} = uiSlice.actions;
export default uiSlice.reducer;
