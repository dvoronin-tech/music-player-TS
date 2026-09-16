import { FC } from 'react';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { selectCurrentTrack } from '@/store/slices/player';
import { PlayBackControls } from '../PlayBackControllers/PlayBackControls';
import { FullScreenTrackInfo } from './FullScreenTrackInfo';
import PlayBack from '../PlayBack/PlayBack';
import styles from './TopElements.module.scss';

export const TopElements: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);

	if (!currentTrack) {
		return null;
	}

	return (
		<div className={styles.now_playing}>
			<div className={styles.track_info}>
				<div className={styles.cover}>
					<img
						className={styles.track_img}
						src={currentTrack.albumImg}
						alt="фото альбома"
						draggable={false}
					/>
					<div className={styles.cover_overlay}>
						<PlayBackControls />
					</div>
				</div>
				<FullScreenTrackInfo />
			</div>
			<PlayBack />
		</div>
	);
};
