import { useEffect, useRef } from 'react';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import { useLayout } from '@/hooks/useLayout';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import {
	nextTrack,
	previousTrack,
	seekBy,
	selectCurrentTrack,
	togglePlayback,
	toggleRepeat,
	toggleShuffle,
} from '@/store/slices/player';
import {
	setAsideBarOpen,
	setCurrentPlayListOpen,
	toggleShowFullScreen,
	toggleShowUserData,
} from '@/store/slices/ui';
import store from '@/store/store';

const SEEK_STEP_SECONDS = 5;

const TYPING_TARGET_SELECTOR =
	'input, textarea, select, [contenteditable]:not([contenteditable="false"])';

function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	return Boolean(target.closest(TYPING_TARGET_SELECTOR));
}

export function useKeyboardShortcuts() {
	const dispatch = useAppDispatch();
	const layout = useLayout();
	const layoutRef = useRef(layout);
	const { data: likedTracks = [] } = useGetLikedTracksQuery();
	const likedTracksRef = useRef(likedTracks);
	const [toggleLikedTrack] = useToggleLikedTrackMutation();

	layoutRef.current = layout;
	likedTracksRef.current = likedTracks;

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.isComposing ||
				event.key === 'Process' ||
				isTypingTarget(event.target) ||
				isTypingTarget(document.activeElement)
			) {
				return;
			}

			const isModified = event.metaKey || event.ctrlKey;
			if (event.altKey || event.shiftKey) {
				return;
			}

			if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
				const isForward = event.code === 'ArrowRight';

				if (isModified) {
					event.preventDefault();
					if (!event.repeat) {
						dispatch(isForward ? nextTrack() : previousTrack());
					}
					return;
				}

				const currentTrack = selectCurrentTrack(store.getState());
				if (!currentTrack) {
					return;
				}

				event.preventDefault();
				dispatch(
					seekBy(isForward ? SEEK_STEP_SECONDS : -SEEK_STEP_SECONDS),
				);
				return;
			}

			if (isModified || event.repeat) {
				return;
			}

			const { player, ui } = store.getState();
			const currentTrack = selectCurrentTrack(store.getState());
			const hasQueue = player.queue.length > 0;
			const isDesktopChrome = layoutRef.current !== 'mobile';

			switch (event.code) {
				case 'KeyK':
					if (!currentTrack) {
						return;
					}
					event.preventDefault();
					dispatch(togglePlayback());
					return;
				case 'KeyS':
					if (!currentTrack) {
						return;
					}
					event.preventDefault();
					dispatch(toggleShuffle());
					return;
				case 'KeyR':
					event.preventDefault();
					dispatch(toggleRepeat());
					return;
				case 'KeyF': {
					if (!currentTrack) {
						return;
					}
					event.preventDefault();
					const isLiked = likedTracksRef.current.some(
						(track) => track.id === currentTrack.id,
					);
					void toggleLikedTrack({
						id: currentTrack.id,
						isLiked,
						track: currentTrack,
					});
					return;
				}
				case 'KeyP':
					if (!hasQueue || !isDesktopChrome || ui.showFullScreen) {
						return;
					}
					event.preventDefault();
					if (!ui.showCurrentPlayList) {
						dispatch(toggleShowUserData(false));
					}
					dispatch(setCurrentPlayListOpen(!ui.showCurrentPlayList));
					return;
				case 'KeyW':
					if (!currentTrack) {
						return;
					}
					event.preventDefault();
					dispatch(toggleShowFullScreen(!ui.showFullScreen));
					return;
				case 'KeyA':
					if (ui.showFullScreen) {
						return;
					}
					event.preventDefault();
					dispatch(toggleShowUserData(!ui.showUserData));
					return;
				case 'KeyQ':
					if (!isDesktopChrome || ui.showFullScreen) {
						return;
					}
					event.preventDefault();
					dispatch(setAsideBarOpen(!ui.showAsideBar));
					return;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [dispatch, toggleLikedTrack]);
}
