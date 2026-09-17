import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
	showUserData: boolean;
	showFullScreen: boolean;
	showCurrentPlayList: boolean;
	showAsideBar: boolean;
	showShortcuts: boolean;
}

const initialState: UiState = {
	showUserData: false,
	showFullScreen: false,
	showCurrentPlayList: false,
	showAsideBar: false,
	showShortcuts: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleShowUserData(state, action: PayloadAction<boolean>) {
			state.showUserData = action.payload;
			if (action.payload) {
				state.showShortcuts = false;
			}
		},
		toggleShowShortcuts(state, action: PayloadAction<boolean>) {
			state.showShortcuts = action.payload;
			if (action.payload) {
				state.showUserData = false;
			}
		},
		toggleShowFullScreen(state, action: PayloadAction<boolean>) {
			state.showFullScreen = action.payload;
		},
		setCurrentPlayListOpen(state, action: PayloadAction<boolean>) {
			state.showCurrentPlayList = action.payload;
		},
		setAsideBarOpen(state, action: PayloadAction<boolean>) {
			state.showAsideBar = action.payload;
		},
	},
});

export const {
	toggleShowUserData,
	toggleShowShortcuts,
	toggleShowFullScreen,
	setCurrentPlayListOpen,
	setAsideBarOpen,
} = uiSlice.actions;
export default uiSlice.reducer;
