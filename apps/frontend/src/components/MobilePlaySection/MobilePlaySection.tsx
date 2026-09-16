import { FC, memo } from 'react';
import clsx from 'clsx';
import { shallowEqual } from 'react-redux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import HeartIcon from '@/assets/icons/heart.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';
import PauseIcon from '@/assets/icons/pause.svg?react';
import { TrackInfo } from '@/components/PlaySelection/TrackInfo/TrackInfo';
import type { AppLayout } from '@/hooks/useLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { selectCurrentTrack, togglePlayback } from '@/store/slices/player';
import styles from './MobilePlaySection.module.scss';

interface MobilePlaySectionProps {
	layout: AppLayout;
}

const MobilePlaySection: FC<MobilePlaySectionProps> = ({ layout }) => {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();

	const { currentTime, duration, isPlaying } = useAppSelector(
		({ player }) => ({
			currentTime: player.currentTime,
			duration: player.duration,
			isPlaying: player.status === 'playing',
		}),
		shallowEqual,
	);

	if (!currentTrack) {
		return null;
	}

	const isLiked = likedTrackList.some(
		(track) => track.id === currentTrack.id,
	);

	const handleToggleLiked = (event: React.MouseEvent) => {
		event.stopPropagation();
		toggleLikedTrack({ id: currentTrack.id, isLiked, track: currentTrack });
	};

	const handleTogglePlay = (event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch(togglePlayback());
	};

	const progressPercent = duration
		? Math.min(100, Math.max(0, (currentTime * 100) / duration))
		: 0;

	return (
		<section
			className={clsx(styles.mobile_play_section, {
				[styles.layout_tablet]: layout === 'tablet',
				[styles.layout_mobile]: layout === 'mobile',
			})}
			aria-label="Мобильный плеер"
		>
			<div
				className={styles.progress_fill}
				style={{ width: `${progressPercent}%` }}
				aria-hidden="true"
			/>
			<TrackInfo className={styles.track_info_compact} />
			<div className={styles.actions}>
				<button
					type="button"
					className={styles.btn}
					onClick={handleToggleLiked}
					aria-label={
						isLiked
							? 'Удалить из избранного'
							: 'Добавить в избранное'
					}
				>
					<HeartIcon
						className={clsx(
							'icon',
							isLiked ? 'icon-active' : 'icon-like-idle',
						)}
					/>
				</button>
				<button
					type="button"
					className={styles.btn}
					onClick={handleTogglePlay}
					aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
				>
					{isPlaying ? (
						<PauseIcon className="icon icon-active" />
					) : (
						<PlayIcon
							className="icon icon-active"
							width={18}
							height={18}
						/>
					)}
				</button>
			</div>
		</section>
	);
};

export default memo(MobilePlaySection);
