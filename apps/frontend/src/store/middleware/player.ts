import type {
	Dispatch,
	Middleware,
	MiddlewareAPI,
	UnknownAction,
} from '@reduxjs/toolkit';
import { tracksApi } from '@/api/rtk/tracks';
import {
	mediaFailed,
	mediaLoading,
	mediaMetadataLoaded,
	mediaPaused,
	mediaPlaying,
	mediaTimeUpdated,
	nextTrack,
	previousTrack,
	seekTo,
	togglePlayback,
	toggleRepeat,
	trackSelectionChanged,
	type PlayerState,
} from '@/store/slices/player';

interface PlayerRootState {
	player: PlayerState;
}

type PlayerMiddlewareApi = MiddlewareAPI<
	Dispatch<UnknownAction>,
	PlayerRootState
>;

type PlayTrackRequest = ReturnType<
	typeof tracksApi.endpoints.playTrack.initiate
>;

function getErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Audio playback failed';
}

export function createPlayerMiddleware(): Middleware {
	let audio: HTMLAudioElement | null = null;
	let loadedTrackId: string | null = null;
	let reportedTrackId: string | null = null;
	let isChangingTrack = false;

	const reportPlayback = (api: PlayerMiddlewareApi) => {
		if (!loadedTrackId || reportedTrackId === loadedTrackId) {
			return;
		}

		reportedTrackId = loadedTrackId;
		const dispatchRequest = api.dispatch as unknown as (
			action: PlayTrackRequest,
		) => unknown;
		dispatchRequest(tracksApi.endpoints.playTrack.initiate(loadedTrackId));
	};

	const getAudio = (api: PlayerMiddlewareApi) => {
		if (audio) {
			return audio;
		}

		audio = new Audio();
		audio.preload = 'metadata';

		audio.addEventListener('loadstart', () => {
			api.dispatch(mediaLoading());
		});
		audio.addEventListener('loadedmetadata', () => {
			if (audio && Number.isFinite(audio.duration)) {
				api.dispatch(mediaMetadataLoaded(audio.duration));
			}
		});
		audio.addEventListener('timeupdate', () => {
			if (audio) {
				api.dispatch(mediaTimeUpdated(audio.currentTime));
			}
		});
		audio.addEventListener('waiting', () => {
			if (audio && !audio.paused) {
				api.dispatch(mediaLoading());
			}
		});
		audio.addEventListener('playing', () => {
			isChangingTrack = false;
			api.dispatch(mediaPlaying());
			reportPlayback(api);
		});
		audio.addEventListener('pause', () => {
			if (!isChangingTrack) {
				api.dispatch(mediaPaused());
			}
		});
		audio.addEventListener('ended', () => {
			if (!api.getState().player.repeatEnabled) {
				api.dispatch(nextTrack());
			}
		});
		audio.addEventListener('error', () => {
			isChangingTrack = false;
			api.dispatch(mediaFailed(audio?.error?.message || 'Audio failed to load'));
		});

		return audio;
	};

	const playCurrentTrack = (
		api: PlayerMiddlewareApi,
		options: { restart?: boolean } = {},
	) => {
		const player = api.getState().player;
		const track = player.queue.find(
			(queueTrack) => queueTrack.id === player.currentTrackId,
		);
		if (!track) {
			return;
		}

		const audioElement = getAudio(api);
		const isNewTrack = loadedTrackId !== track.id;

		if (isNewTrack) {
			isChangingTrack = true;
			loadedTrackId = track.id;
			reportedTrackId = null;
			audioElement.src = track.music;
			audioElement.load();
		} else if (options.restart) {
			isChangingTrack = true;
			reportedTrackId = null;
			audioElement.currentTime = 0;
		}

		audioElement.loop = player.repeatEnabled;
		const requestedTrackId = track.id;
		void audioElement.play().catch((error: unknown) => {
			if (loadedTrackId !== requestedTrackId) {
				return;
			}

			isChangingTrack = false;
			if (error instanceof DOMException && error.name === 'AbortError') {
				return;
			}

			api.dispatch(mediaFailed(getErrorMessage(error)));
		});
	};

	return (untypedApi) => {
		const api = untypedApi as PlayerMiddlewareApi;

		return (next) => (action) => {
			const result = next(action);

			if (trackSelectionChanged.match(action)) {
				playCurrentTrack(api);
			} else if (nextTrack.match(action) || previousTrack.match(action)) {
				playCurrentTrack(api, { restart: true });
			} else if (togglePlayback.match(action)) {
				if (api.getState().player.status === 'paused') {
					isChangingTrack = false;
					audio?.pause();
				} else {
					playCurrentTrack(api);
				}
			} else if (seekTo.match(action) && audio) {
				audio.currentTime = api.getState().player.currentTime;
			} else if (toggleRepeat.match(action) && audio) {
				audio.loop = api.getState().player.repeatEnabled;
			}

			return result;
		};
	};
}
