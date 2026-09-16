import { FC, SyntheticEvent } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { seekTo } from '@/store/slices/player';
import { humanizingNumbers } from '@/utils/humanizingNumbers';
import styles from './TrackControls.module.scss';

export const TrackProgress: FC = () => {
	const dispatch = useAppDispatch();
	const { currentTime, duration } = useAppSelector(
		({ player }) => ({
			currentTime: player.currentTime,
			duration: player.duration,
		}),
		shallowEqual,
	);
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
			<span className={styles.time}>{humanizingNumbers(duration)}</span>
		</div>
	);
};
