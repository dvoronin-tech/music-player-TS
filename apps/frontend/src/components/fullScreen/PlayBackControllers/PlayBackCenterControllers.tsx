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
import styles from './PlayBackControllers.module.scss';

export const PlayBackCenterControllers: FC = () => {
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
	const pending = status === 'loading';

	return (
		<div className={styles.center_controllers}>
			<button
				onClick={() => currentTrack && dispatch(toggleShuffle())}
				className={styles.controller_btn}
			>
				<ShuffleIcon
					className={clsx('icon', isRandom && 'icon-active')}
				/>
			</button>
			<button
				className={styles.controller_btn}
				onClick={() => dispatch(previousTrackAction())}
			>
				<RewindIcon className="icon" />
			</button>
			<PlayButton
				pending={pending}
				isPlay={isPlay}
				onClick={() => currentTrack && dispatch(togglePlayback())}
			/>
			<button
				className={styles.controller_btn}
				onClick={() => dispatch(nextTrackAction())}
			>
				<RewindIcon
					className={clsx('icon', styles.fullscreen_next_rewind)}
				/>
			</button>
			<button
				className={styles.controller_btn}
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

interface PlayButtonProps {
	pending: boolean;
	isPlay: boolean;
	onClick: () => void;
}

const PlayButton: FC<PlayButtonProps> = ({ pending, isPlay, onClick }) => {
	return (
		<button className={styles.fullscreen_play_btn} onClick={onClick}>
			{pending ? (
				<div
					className={clsx('loader', styles.fullscreen_play_loader)}
				></div>
			) : isPlay ? (
				<PauseIcon
					className={clsx(
						styles.play_or_pause_icon,
						styles.play_or_pause_icon_playing,
					)}
				/>
			) : (
				<PlayIcon className={styles.play_or_pause_icon} />
			)}
		</button>
	);
};
