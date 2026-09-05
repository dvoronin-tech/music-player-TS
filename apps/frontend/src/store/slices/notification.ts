import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

export interface INotificationData {
	img: string | ReactNode;
	info: string;
	additionalInfo: string;
	notificationId: string;
}

const initialState: INotificationData[] = [];

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification(state, action: PayloadAction<INotificationData>) {
			state.push(action.payload);
		},
		deleteNotification(state, action: PayloadAction<string>) {
			return state.filter(
				(item) => item.notificationId !== action.payload,
			);
		},
	},
});

export const { addNotification, deleteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
