import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IUiState {
	showUserData: boolean;
	showFullScreen: boolean;
}

const initialState: IUiState = {
	showUserData: false,
	showFullScreen: false,
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
	},
});

export const { toggleShowUserData, toggleShowFullScreen } = uiSlice.actions;
export default uiSlice.reducer;
