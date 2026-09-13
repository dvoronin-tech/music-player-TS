import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type NotificationBase = {
	notificationId: string;
	info: string;
	additionalInfo: string;
};

export type NotificationPayload =
	| (NotificationBase & {
			variant: 'success' | 'error';
	  })
	| (NotificationBase & {
			variant?: never;
			img: string;
	  });

const initialState: NotificationPayload[] = [];

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification(state, action: PayloadAction<NotificationPayload>) {
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
