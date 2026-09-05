import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TrackDirection = 'back' | 'idle' | 'forward';

interface ITrackState {
	isRandom: boolean;
	isRepeat: boolean;
	isPlay: boolean;
	audioData: null | string;
	rewind: TrackDirection;
	rewindCurrentTime: number;
	trackTimeData: {
		currentTime: number;
		duration: number;
	};
	switchTrack: TrackDirection;
	pending: boolean;
}

const initialState: ITrackState = {
	isRandom: false,
	isRepeat: false,
	isPlay: false,
	audioData: null,
	rewind: 'idle',
	trackTimeData: {
		currentTime: 0,
		duration: 0,
	},
	switchTrack: 'idle',
	rewindCurrentTime: -1,
	pending: false,
};

export const trackStateSlice = createSlice({
	name: 'trackState',
	initialState,
	reducers: {
		setAudioData(state, action: PayloadAction<string>) {
			state.audioData = action.payload;
		},
		setPause(state) {
			state.isPlay = false;
		},
		setPlay(state) {
			state.isPlay = true;
		},
		rewindBack(state) {
			state.rewind = 'back';
		},
		rewindForward(state) {
			state.rewind = 'forward';
		},
		toggleRandom(state, action: PayloadAction<boolean>) {
			state.isRandom = action.payload;
		},
		toggleRepeat(state, action: PayloadAction<boolean>) {
			state.isRepeat = action.payload;
		},
		resetSomeStateData(state) {
			state.rewindCurrentTime = -1;
			state.rewind = 'idle';
			state.switchTrack = 'idle';
		},
		setCurrentTime(state, action: PayloadAction<number>) {
			state.trackTimeData.currentTime = action.payload;
		},
		setDuration(state, action: PayloadAction<number>) {
			state.trackTimeData.duration = action.payload;
		},
		switchTrackAction(state, action: PayloadAction<TrackDirection>) {
			state.switchTrack = action.payload;
		},
		setRewindCurrentTime(state, action: PayloadAction<number>) {
			state.rewindCurrentTime = action.payload;
		},
		setPending(state, action: PayloadAction<boolean>) {
			state.pending = action.payload;
		},
	},
});

export const {
	setAudioData,
	setPause,
	setPlay,
	rewindBack,
	rewindForward,
	toggleRandom,
	toggleRepeat,
	resetSomeStateData,
	setCurrentTime,
	setDuration,
	switchTrackAction,
	setRewindCurrentTime,
	setPending,
} = trackStateSlice.actions;

export default trackStateSlice.reducer;
