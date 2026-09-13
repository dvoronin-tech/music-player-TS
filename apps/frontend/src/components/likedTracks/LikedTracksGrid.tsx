import { FC } from 'react';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import type { ApiTrack } from '@music-player/backend';
import styles from './LikedTracksGrid.module.scss';

interface LikedTracksGridProps {
	tracks: ApiTrack[];
	searchStr: string;
	hasLikedTracks: boolean;
}

export const LikedTracksGrid: FC<LikedTracksGridProps> = ({
	tracks,
	searchStr,
	hasLikedTracks,
}) => {
	if (!hasLikedTracks) {
		return (
			<div className={styles.no_data_div}>
				<span>Вы не добавили ни одного трека</span>
			</div>
		);
	}

	const filteredTracks = searchStr
		? tracks.filter((item) =>
				item.title.toLowerCase().includes(searchStr.toLowerCase()),
			)
		: tracks;

	return filteredTracks.map((item) => (
		<HomeTrackCard key={item.id} track={item} playList={tracks} />
	));
};
