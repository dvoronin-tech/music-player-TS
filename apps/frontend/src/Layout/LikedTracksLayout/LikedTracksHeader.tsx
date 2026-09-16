import { FC } from 'react';
import styles from './LikedTracksLayout.module.scss';
import { humanizeTrackCount } from '@/utils/humanizeTrackCount';

interface LikedTracksHeaderProps {
	trackCount: number;
}

export const LikedTracksHeader: FC<LikedTracksHeaderProps> = ({
	trackCount,
}) => {
	return (
		<div className={styles.background}>
			<div className={styles.video_wrapper}>
				<video
					autoPlay
					loop
					muted
					playsInline
					src="/video/liked-video.webm"
				/>
			</div>
			<div className={styles.liked_title_wrapper}>
				<span className={styles.liked_title}>Любимые треки</span>
				<div className={styles.liked_meta}>
					<span className={styles.liked_brooklyn}>BROOKLYN</span>
					<span className={styles.liked_track_count}>{humanizeTrackCount(trackCount, 'ru')}</span>
				</div>
			</div>
		</div>
	);
};
