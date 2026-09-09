import {
	createSelector,
	createSlice,
	type Dispatch,
	type PayloadAction,
	type UnknownAction,
} from '@reduxjs/toolkit';
import type { ApiTrack } from '@music-player/backend';
import { shuffle } from '@/utils/shuffle';

export type PlayerStatus =
	| 'idle'
	| 'loading'
	| 'playing'
	| 'paused'
	| 'error';

export interface PlayerState {
	queue: ApiTrack[];
	playOrder: string[];
	currentTrackId: string | null;
	status: PlayerStatus;
	currentTime: number;
	duration: number;
	shuffleEnabled: boolean;
	repeatEnabled: boolean;
	error: string | null;
}

interface PlayerRootState {
	player: PlayerState;
}

interface StartTrackPayload {
	queue: ApiTrack[];
	trackId: string;
}

interface TrackSelectionPayload extends StartTrackPayload {
	playOrder: string[];
}

interface ShufflePayload {
	enabled: boolean;
	playOrder: string[];
}

type PlayerThunk = (
	dispatch: Dispatch<UnknownAction>,
	getState: () => PlayerRootState,
) => void;

const initialState: PlayerState = {
	queue: [],
	playOrder: [],
	currentTrackId: null,
	status: 'idle',
	currentTime: 0,
	duration: 0,
	shuffleEnabled: false,
	repeatEnabled: false,
	error: null,
};

function createShuffledOrder(queue: ApiTrack[], currentTrackId: string) {
	const remainingIds = queue
		.map((track) => track.id)
		.filter((trackId) => trackId !== currentTrackId);

	return [currentTrackId, ...shuffle(remainingIds)];
}

function findAdjacentTrackId(
	playOrder: string[],
	currentTrackId: string | null,
	direction: 1 | -1,
) {
	if (playOrder.length === 0) {
		return null;
	}

	const currentIndex = currentTrackId
		? playOrder.indexOf(currentTrackId)
		: -1;
	const startIndex = currentIndex === -1 ? 0 : currentIndex;
	const nextIndex =
		(startIndex + direction + playOrder.length) % playOrder.length;

	return playOrder[nextIndex];
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		trackSelectionChanged(
			state,
			action: PayloadAction<TrackSelectionPayload>,
		) {
			const { queue, trackId, playOrder } = action.payload;
			const isNewTrack = state.currentTrackId !== trackId;

			state.queue = queue;
			state.playOrder = playOrder;
			state.currentTrackId = trackId;
			state.error = null;

			if (isNewTrack) {
				state.currentTime = 0;
				state.duration = 0;
				state.status = 'loading';
			} else if (state.status !== 'playing') {
				state.status = 'loading';
			}
		},
		togglePlayback(state) {
			if (!state.currentTrackId) {
				return;
			}

			state.status =
				state.status === 'playing' || state.status === 'loading'
					? 'paused'
					: 'loading';
			state.error = null;
		},
		nextTrack(state) {
			const nextTrackId = findAdjacentTrackId(
				state.playOrder,
				state.currentTrackId,
				1,
			);

			if (nextTrackId) {
				state.currentTrackId = nextTrackId;
				state.currentTime = 0;
				state.duration = 0;
				state.status = 'loading';
				state.error = null;
			}
		},
		previousTrack(state) {
			const previousTrackId = findAdjacentTrackId(
				state.playOrder,
				state.currentTrackId,
				-1,
			);

			if (previousTrackId) {
				state.currentTrackId = previousTrackId;
				state.currentTime = 0;
				state.duration = 0;
				state.status = 'loading';
				state.error = null;
			}
		},
		seekTo(state, action: PayloadAction<number>) {
			const requestedTime = Math.max(0, action.payload);
			state.currentTime = state.duration
				? Math.min(requestedTime, state.duration)
				: requestedTime;
		},
		shuffleChanged(state, action: PayloadAction<ShufflePayload>) {
			state.shuffleEnabled = action.payload.enabled;
			state.playOrder = action.payload.playOrder;
		},
		toggleRepeat(state) {
			state.repeatEnabled = !state.repeatEnabled;
		},
		addTrackToQueue(state, action: PayloadAction<ApiTrack>) {
			const track = action.payload;
			if (state.queue.some((queueTrack) => queueTrack.id === track.id)) {
				return;
			}

			const currentQueueIndex = state.queue.findIndex(
				(queueTrack) => queueTrack.id === state.currentTrackId,
			);
			const queueInsertIndex =
				currentQueueIndex === -1 ? state.queue.length : currentQueueIndex + 1;
			state.queue.splice(queueInsertIndex, 0, track);

			const currentOrderIndex = state.currentTrackId
				? state.playOrder.indexOf(state.currentTrackId)
				: -1;
			const orderInsertIndex =
				currentOrderIndex === -1
					? state.playOrder.length
					: currentOrderIndex + 1;
			state.playOrder.splice(orderInsertIndex, 0, track.id);
		},
		removeTrackFromQueue(state, action: PayloadAction<string>) {
			if (action.payload === state.currentTrackId) {
				return;
			}

			state.queue = state.queue.filter(
				(track) => track.id !== action.payload,
			);
			state.playOrder = state.playOrder.filter(
				(trackId) => trackId !== action.payload,
			);
		},
		mediaLoading(state) {
			if (state.status !== 'paused') {
				state.status = 'loading';
			}
		},
		mediaPlaying(state) {
			state.status = 'playing';
			state.error = null;
		},
		mediaPaused(state) {
			if (state.status !== 'error') {
				state.status = 'paused';
			}
		},
		mediaTimeUpdated(state, action: PayloadAction<number>) {
			state.currentTime = action.payload;
		},
		mediaMetadataLoaded(state, action: PayloadAction<number>) {
			state.duration = action.payload;
		},
		mediaFailed(state, action: PayloadAction<string>) {
			state.status = 'error';
			state.error = action.payload;
		},
	},
});

export const {
	trackSelectionChanged,
	togglePlayback,
	nextTrack,
	previousTrack,
	seekTo,
	shuffleChanged,
	toggleRepeat,
	addTrackToQueue,
	removeTrackFromQueue,
	mediaLoading,
	mediaPlaying,
	mediaPaused,
	mediaTimeUpdated,
	mediaMetadataLoaded,
	mediaFailed,
} = playerSlice.actions;

export const startTrack =
	({ queue, trackId }: StartTrackPayload): PlayerThunk =>
	(dispatch, getState) => {
		if (!queue.some((track) => track.id === trackId)) {
			return;
		}

		const { shuffleEnabled } = getState().player;
		const playOrder = shuffleEnabled
			? createShuffledOrder(queue, trackId)
			: queue.map((track) => track.id);

		dispatch(trackSelectionChanged({ queue, trackId, playOrder }));
	};

export const toggleShuffle = (): PlayerThunk => (dispatch, getState) => {
	const { queue, currentTrackId, shuffleEnabled } = getState().player;
	if (!currentTrackId) {
		return;
	}

	dispatch(
		shuffleChanged({
			enabled: !shuffleEnabled,
			playOrder: shuffleEnabled
				? queue.map((track) => track.id)
				: createShuffledOrder(queue, currentTrackId),
		}),
	);
};

export const selectPlayerQueue = (state: PlayerRootState) => state.player.queue;
const selectPlayOrder = (state: PlayerRootState) => state.player.playOrder;
const selectCurrentTrackId = (state: PlayerRootState) =>
	state.player.currentTrackId;

export const selectCurrentTrack = createSelector(
	[selectPlayerQueue, selectCurrentTrackId],
	(queue, currentTrackId) =>
		queue.find((track) => track.id === currentTrackId) ?? null,
);

/**
 * Returns the current play queue based on the play order.
 * @param queue - The queue of tracks.
 * @param playOrder - The play order of the tracks.
 * @returns The current play queue.
 */
export const selectPlayQueue = createSelector(
	[selectPlayerQueue, selectPlayOrder],
	(queue, playOrder) => {
		const tracksById = new Map(queue.map((track) => [track.id, track]));
		return playOrder.flatMap((trackId) => {
			const track = tracksById.get(trackId);
			return track ? [track] : [];
		});
	},
);
export const selectIsPlaying = (state: PlayerRootState) =>
	state.player.status === 'playing';
export const selectIsLoading = (state: PlayerRootState) =>
	state.player.status === 'loading';

export default playerSlice.reducer;
