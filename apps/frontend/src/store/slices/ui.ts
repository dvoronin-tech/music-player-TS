import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IUiState {
	showUserData: boolean;
}

const initialState: IUiState = {
	showUserData: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleShowUserData(state, action: PayloadAction<boolean>) {
			state.showUserData = action.payload;
		},
	},
});

export const { toggleShowUserData } = uiSlice.actions;
export default uiSlice.reducer;
