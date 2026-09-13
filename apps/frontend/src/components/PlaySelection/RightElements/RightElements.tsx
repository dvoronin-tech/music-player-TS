import { FC, memo, SyntheticEvent } from 'react';
import { shallowEqual } from 'react-redux';
import { v4 as randomId } from 'uuid';
import clsx from 'clsx';

import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import HeartIcon from '@/assets/icons/heart.svg?react';
import ShuffleIcon from '@/assets/icons/shuffle.svg?react';
import RewindIcon from '@/assets/icons/rewind.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';
import PauseIcon from '@/assets/icons/pause.svg?react';
import RepeatIcon from '@/assets/icons/repeat.svg?react';
import Repeat1Icon from '@/assets/icons/repeat-1.svg?react';
import PlaylistIcon from '@/assets/icons/playlist.svg?react';
import ExpandIcon from '@/assets/icons/expand.svg?react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { addNotification } from '@/store/slices/notification';
import {
	nextTrack,
	previousTrack,
	seekTo,
	selectCurrentTrack,
	selectPlayerQueue,
	togglePlayback,
	toggleShuffle,
	toggleRepeat,
} from '@/store/slices/player';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import { formatArtistNames } from '@/utils/formatArtists';
import { humanizingNumbers } from '@/utils/humanizingNumbers';
import styles from './RightElements.module.scss';

export const RightElements: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { currentPlayList, currentTrack, showCurrentPlayList } =
		useAppSelector(
			(state) => ({
				currentPlayList: selectPlayerQueue(state),
				currentTrack: selectCurrentTrack(state),
				showCurrentPlayList: state.ui.showCurrentPlayList,
			}),
			shallowEqual,
		);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const {
		status,
		shuffleEnabled: isRandom,
		repeatEnabled: isRepeat,
		currentTime,
		duration,
	} = useAppSelector((state) => state.player);
	const isPlay = status === 'playing';

	const isLiked = likedTrackList.some(
		(track) => track.id === currentTrack?.id,
	);
	const currentWidth = duration ? (currentTime * 100) / duration : 0;

	const toggleIsLiked = () => {
		if (currentTrack) {
			toggleLikedTrack({ id: currentTrack.id, isLiked });
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: currentTrack.albumImg,
					info: `${currentTrack.title} - ${formatArtistNames(currentTrack.artists)}`,
					additionalInfo: isLiked
						? 'Трек удалён из __избранного__'
						: 'Трек добавлен в __избранное__',
				}),
			);
		}
	};

	const toggleIsPlay = () => {
		if (currentTrack) {
			dispatch(togglePlayback());
		}
	};

	const toggleShowCurrentPlayList = () => {
		if (currentPlayList.length > 0) {
			dispatch(setCurrentPlayListOpen(!showCurrentPlayList));
		}
	};

	const toggleIsRepeat = () => {
		dispatch(toggleRepeat());
	};

	const toggleIsRandom = () => {
		if (currentTrack) {
			dispatch(toggleShuffle());
		}
	};

	const prevTrack = () => {
		dispatch(previousTrack());
	};

	const playNextTrack = () => {
		dispatch(nextTrack());
	};

	const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		const offsetX = e.nativeEvent.offsetX;
		const clientWidth = e.currentTarget.clientWidth;
		if (clientWidth && duration) {
			const maxOffsetX = clientWidth - 1;
			const newTime =
				((offsetX > maxOffsetX ? maxOffsetX : offsetX) / clientWidth) *
				duration;
			dispatch(seekTo(newTime));
		}
	};

	if (!currentTrack) {
		return null;
	}

	return (
		<div className={styles.right_elements}>
			<div className={styles.music_controls}>
				<div className={styles.left_controls}>
					<button onClick={toggleIsLiked} className={styles.control}>
						<HeartIcon
							className={clsx(
								'icon',
								isLiked ? 'icon-active' : 'icon-like-idle',
							)}
						/>
					</button>
				</div>
				<div className={styles.center_controls}>
					<button className={styles.control} onClick={toggleIsRandom}>
						<ShuffleIcon
							className={clsx('icon', isRandom && 'icon-active')}
						/>
					</button>
					<button className={styles.control} onClick={prevTrack}>
						<RewindIcon className="icon" />
					</button>
					<button className={styles.control} onClick={toggleIsPlay}>
						{isPlay ? (
							<PauseIcon className="icon icon-active" />
						) : (
							<PlayIcon
								width={18}
								height={18}
								className="icon icon-active"
							/>
						)}
					</button>
					<button
						className={`${styles.control} ${styles.next_rewind}`}
						onClick={playNextTrack}
					>
						<RewindIcon className="icon" />
					</button>
					<button className={styles.control} onClick={toggleIsRepeat}>
						{isRepeat ? (
							<Repeat1Icon className="icon icon-active" />
						) : (
							<RepeatIcon className="icon" />
						)}
					</button>
				</div>
				<div className={styles.right_controls}>
					<button
						className={styles.current_play_list_control}
						onClick={toggleShowCurrentPlayList}
					>
						<PlaylistIcon
							className={clsx(
								'icon',
								showCurrentPlayList && 'icon-active',
							)}
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
						<ExpandIcon
							className="icon"
							style={{
								width: 'calc(20px - 35%)',
								height: 'calc(20px - 35%)',
							}}
						/>
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
