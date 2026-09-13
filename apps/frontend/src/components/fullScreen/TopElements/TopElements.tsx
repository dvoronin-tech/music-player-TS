import { FC } from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { selectCurrentTrack } from '@/store/slices/player';
import { FullScreenQueueCarousel } from './FullScreenQueueCarousel';
import { FullScreenTrackInfo } from './FullScreenTrackInfo';
import styles from './TopElements.module.scss';

export const TopElements: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);

	if (!currentTrack) {
		return null;
	}

	return (
		<div className={styles.fullscreen_top_elements}>
			<img
				className={clsx(
					styles.track_img,
					showCurrentPlayList
						? styles.track_img_large
						: styles.track_img_small,
				)}
				src={currentTrack.albumImg}
				alt="фото альбома"
			/>
			<div className={styles.fullscreen_info}>
				<FullScreenQueueCarousel />
				<FullScreenTrackInfo />
			</div>
		</div>
	);
};
