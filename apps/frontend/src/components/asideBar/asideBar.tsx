import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './asideBar.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useGetLikedArtistsQuery,
} from '@/api/rtk/liked';
import Button from '@/components/buttons/buttons';
import { AsideLikedTracks } from './AsideLikedTracks';
import { AsideLikedArtists } from './AsideLikedArtists';
import {
	selectCurrentTrack,
	selectPlayerQueue,
} from '@/store/slices/player';

const AsideBar: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const { data: likedTrackList = [], isLoading: tracksLoading } =
		useGetLikedTracksQuery();
	const { data: likedArtists = [], isLoading: artistsLoading } =
		useGetLikedArtistsQuery();

	const [showPlayList, setShowPlayList] = useState(false);
	const [isPopular, setIsPopular] = useState(false);

	useEffect(() => {
		if (currentTrack && currentPlayList.length > 0) {
			setShowPlayList(true);
		} else {
			setShowPlayList(false);
		}
	}, [currentPlayList.length, currentTrack]);

	return (
		<aside
			className={clsx(
				styles.aside_bar,
				showPlayList && styles.aside_bar_playlist,
			)}
		>
			<div className={styles.flex_row}>
				<span>Любимые треки</span>
				<Button
					to="/home/liked"
					variant="alternative"
					size="s"
				>
					Посмотреть всё
				</Button>
			</div>
			<div className={styles.aside_liked_track_list}>
				<AsideLikedTracks
					tracks={likedTrackList}
					isLoading={tracksLoading}
				/>
			</div>
			<div className={clsx(styles.flex_row, styles.flex_row_spaced)}>
				<span>Любимые артисты</span>
				<Button
					variant={isPopular ? 'accent' : 'alternative'}
					onClick={() => setIsPopular(!isPopular)}
					size="s"
					weight={isPopular ? 'medium' : 'regular'}
					style={{ borderRadius: 100 }}
				>
					Сначала популярные
				</Button>
			</div>
			<div className={styles.aside_artist_list}>
				<div
					className={clsx(
						styles.artists_grid,
						likedArtists.length === 0 && styles.artists_grid_empty,
					)}
				>
					<AsideLikedArtists
						artists={likedArtists}
						isLoading={artistsLoading}
						isPopular={isPopular}
					/>
				</div>
			</div>
		</aside>
	);
};

export default AsideBar;
