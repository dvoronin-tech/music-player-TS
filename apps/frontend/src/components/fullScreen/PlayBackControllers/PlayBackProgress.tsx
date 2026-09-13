import { FC, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { seekTo } from '@/store/slices/player';
import { humanizingNumbers } from '@/utils/humanizingNumbers';
import { shallowEqual } from 'react-redux';
import styles from '../fullScreen.module.scss';

export const PlayBackProgress: FC = () => {
	const dispatch = useAppDispatch();
	const { currentTime, duration } = useAppSelector(({ player }) => ({
		currentTime: player.currentTime,
		duration: player.duration,
	}), shallowEqual);
	const currentWidth = duration ? (currentTime * 100) / duration : 0;

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

	return (
		<div className={styles.fullscreen_progress_controls}>
			<div className={styles.time_wrapper}>
				<span>{humanizingNumbers(currentTime)}</span>
				<span>{humanizingNumbers(duration)}</span>
			</div>
			<div
				className={styles.progress_bar_wrapper}
				onClick={setCurrentTime}
			>
				<div
					className={styles.progress_bar}
					style={{ width: `${currentWidth}%` }}
				/>
			</div>
		</div>
	);
};
