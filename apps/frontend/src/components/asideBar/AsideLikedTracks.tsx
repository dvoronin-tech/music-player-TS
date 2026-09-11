import { FC } from 'react';
import SmallTrackCard from '@/components/smallTrackCard/smallTrackCard';
import type { ApiTrack } from '@music-player/backend';
import styles from './asideBar.module.scss';

interface AsideLikedTracksProps {
	tracks: ApiTrack[];
	isLoading: boolean;
}

export const AsideLikedTracks: FC<AsideLikedTracksProps> = ({
	tracks,
	isLoading,
}) => {
	if (isLoading) {
		return <div className="loading"></div>;
	}

	if (tracks.length === 0) {
		return (
			<span className={styles.no_data}>
				Вы не добавили ни одного трека
			</span>
		);
	}

	return tracks.map((item) => (
		<SmallTrackCard
			track={item}
			playList={tracks}
			showRemoveButton={false}
			key={item.id}
		/>
	));
};
