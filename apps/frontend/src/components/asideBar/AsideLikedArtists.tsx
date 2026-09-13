import { FC, useMemo } from 'react';
import { ArtistCard } from '@/components/artistCards/artistCards';
import type { ApiArtist } from '@music-player/backend';
import styles from './asideBar.module.scss';

interface AsideLikedArtistsProps {
	artists: ApiArtist[];
	isLoading: boolean;
	isPopular: boolean;
}

export const AsideLikedArtists: FC<AsideLikedArtistsProps> = ({
	artists,
	isLoading,
	isPopular,
}) => {
	const displayArtists = useMemo(() => {
		if (!isPopular) {
			return artists;
		}
		return [...artists].sort((a, b) => b.likes - a.likes);
	}, [artists, isPopular]);

	if (isLoading) {
		return <div className="loading"></div>;
	}

	if (artists.length === 0) {
		return (
			<span className={styles.no_data_span}>
				Вы не подписаны ни на одного артиста
			</span>
		);
	}

	return displayArtists.map((item) => (
		<ArtistCard
			key={item.id}
			id={item.id}
			name={item.name}
			img={item.artistImg}
			type="small"
		/>
	));
};
