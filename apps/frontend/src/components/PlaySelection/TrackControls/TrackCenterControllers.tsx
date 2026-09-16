import { FC } from 'react';
import clsx from 'clsx';
import ShuffleIcon from '@/assets/icons/shuffle.svg?react';
import RewindIcon from '@/assets/icons/rewind.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';
import PauseIcon from '@/assets/icons/pause.svg?react';
import RepeatIcon from '@/assets/icons/repeat.svg?react';
import Repeat1Icon from '@/assets/icons/repeat-1.svg?react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	nextTrack as nextTrackAction,
	previousTrack as previousTrackAction,
	selectCurrentTrack,
	togglePlayback,
	toggleShuffle,
	toggleRepeat,
} from '@/store/slices/player';
import { shallowEqual } from 'react-redux';
import styles from './TrackControls.module.scss';

export const TrackCenterControllers: FC = () => {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const { status, isRandom, isRepeat } = useAppSelector(
		({ player }) => ({
			status: player.status,
			isRandom: player.shuffleEnabled,
			isRepeat: player.repeatEnabled,
		}),
		shallowEqual,
	);
	const isPlay = status === 'playing';

	return (
		<div className={styles.center_controls}>
			<button
				className={styles.control}
				onClick={() => currentTrack && dispatch(toggleShuffle())}
			>
				<ShuffleIcon
					className={clsx('icon', isRandom && 'icon-active')}
				/>
			</button>
			<button
				className={styles.control}
				onClick={() => dispatch(previousTrackAction())}
			>
				<RewindIcon className="icon" />
			</button>
			<button
				className={styles.control}
				onClick={() => currentTrack && dispatch(togglePlayback())}
			>
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
				onClick={() => dispatch(nextTrackAction())}
			>
				<RewindIcon className="icon" />
			</button>
			<button
				className={styles.control}
				onClick={() => dispatch(toggleRepeat())}
			>
				{isRepeat ? (
					<Repeat1Icon className="icon icon-active" />
				) : (
					<RepeatIcon className="icon" />
				)}
			</button>
		</div>
	);
};
