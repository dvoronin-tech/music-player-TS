import { FC, memo, SyntheticEvent } from 'react';
import { shallowEqual } from 'react-redux';
import { v4 as randomId } from 'uuid';

import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import {
	CurrentPlayList,
	FullScreen,
	Like,
	PlayOrPause,
	Random,
	Repeat,
	Rewind,
} from '@/components/icons and tags/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { showCurrentPlayListAction } from '@/store/slices/current';
import { addNotification } from '@/store/slices/notification';
import {
	setPause,
	setPlay,
	setRewindCurrentTime,
	switchTrackAction,
	toggleRandom,
	toggleRepeat,
} from '@/store/slices/trackState';
import { toggleShowFullScreen } from '@/store/slices/ui';
import { formatArtistNames } from '@/utils/formatArtists';
import { humanizingNumbers } from '@/utils/humanizingNumbers';
import styles from './RightElements.module.scss';

export const RightElements: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { currentPlayList, trackId, showCurrentPlayList } = useAppSelector(
		({ current }) => ({
			currentPlayList: current.currentPlayList,
			trackId: current.trackId,
			showCurrentPlayList: current.showCurrentPlayList,
		}),
		shallowEqual,
	);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const {
		isRandom,
		isPlay,
		isRepeat,
		trackTimeData: { currentTime, duration },
	} = useAppSelector((state) => state.trackState);

	const currentTrack = currentPlayList.find((item) => item.id === trackId);
	const isLiked = likedTrackList.some((track) => track.id === trackId);
	const currentWidth = duration ? (currentTime * 100) / duration : 0;

	const toggleIsLiked = () => {
		if (trackId && currentTrack) {
			toggleLikedTrack({ id: trackId, isLiked });
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: currentTrack.albumImg,
					info: `${currentTrack.title} - ${formatArtistNames(currentTrack.artists)}`,
					additionalInfo: isLiked
						? 'Трек удалён из <span>избранного</span>'
						: 'Трек добавлен в <span>избранное</span>',
				}),
			);
		}
	};

	const toggleIsPlay = () => {
		if (currentTrack) {
			if (isPlay) {
				dispatch(setPause());
			} else {
				dispatch(setPlay());
			}
		}
	};

	const toggleShowCurrentPlayList = () => {
		if (currentPlayList) {
			dispatch(showCurrentPlayListAction(!showCurrentPlayList));
		}
	};

	const toggleIsRepeat = () => {
		if (isRepeat) {
			dispatch(toggleRepeat(false));
		} else {
			dispatch(toggleRepeat(true));
		}
	};

	const toggleIsRandom = () => {
		if (currentTrack) {
			if (isRandom) {
				dispatch(toggleRandom(false));
			} else {
				dispatch(toggleRandom(true));
			}
		}
	};

	const prevTrack = () => {
		dispatch(switchTrackAction('back'));
	};

	const nextTrack = () => {
		dispatch(switchTrackAction('forward'));
	};

	const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		const offsetX = e.nativeEvent.offsetX;
		const clientWidth = e.currentTarget.clientWidth;
		if (clientWidth && duration) {
			const maxOffsetX = clientWidth - 1;
			const newTime =
				((offsetX > maxOffsetX ? maxOffsetX : offsetX) / clientWidth) *
				duration;
			dispatch(setRewindCurrentTime(newTime));
		}
	};

	if (!currentTrack) {
		return null;
	}

	const controlType = (isActive: boolean) => (isActive ? 'active' : 'idle');

	return (
		<div className={styles.right_elements}>
			<div className={styles.music_controls}>
				<div className={styles.left_controls}>
					<button onClick={toggleIsLiked} className={styles.control}>
						<Like type={isLiked ? 'active' : 'idle'} />
					</button>
				</div>
				<div className={styles.center_controls}>
					<button className={styles.control} onClick={toggleIsRandom}>
						<Random type={controlType(isRandom)} />
					</button>
					<button className={styles.control} onClick={prevTrack}>
						<Rewind type="idle" />
					</button>
					<button className={styles.control} onClick={toggleIsPlay}>
						<PlayOrPause type={controlType(isPlay)} />
					</button>
					<button
						className={`${styles.control} ${styles.next_rewind}`}
						onClick={nextTrack}
					>
						<Rewind type="idle" />
					</button>
					<button className={styles.control} onClick={toggleIsRepeat}>
						<Repeat type={controlType(isRepeat)} />
					</button>
				</div>
				<div className={styles.right_controls}>
					<button
						className={styles.current_play_list_control}
						onClick={toggleShowCurrentPlayList}
					>
						<CurrentPlayList
							type={controlType(showCurrentPlayList)}
						/>
					</button>
					<button
						onClick={() => dispatch(toggleShowFullScreen(true))}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<FullScreen type="idle" />
					</button>
				</div>
			</div>
			<div className={styles.additional_track_info}>
				<span className={styles.time}>
					{humanizingNumbers(currentTime)}
				</span>
				<div className={styles.music_progress} onClick={setCurrentTime}>
					<div
						className={styles.progress_bar}
						style={{ width: currentWidth + '%' }}
					>
						<div className={styles.target_circle}></div>
					</div>
				</div>
				<span className={styles.time}>
					{humanizingNumbers(duration)}
				</span>
			</div>
		</div>
	);
});
