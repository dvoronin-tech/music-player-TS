import { FC } from 'react';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { formatArtistNames } from '@/utils/formatArtists';
import { selectCurrentTrack } from '@/store/slices/player';
import styles from './TopElements.module.scss';

export const FullScreenTrackInfo: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);

	if (!currentTrack) {
		return null;
	}

	const artistNames = formatArtistNames(currentTrack.artists);

	return (
		<div className={styles.fullscreen_track_info}>
			<span className={styles.track_title} title={currentTrack.title}>
				{currentTrack.title}
			</span>
			<span className={styles.fullscreen_artist} title={artistNames}>
				{artistNames}
			</span>
		</div>
	);
};
