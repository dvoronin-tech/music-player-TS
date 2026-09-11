import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './asideBar.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useGetLikedArtistsQuery,
} from '@/api/rtk/liked';
import Button from '@/components/buttons/buttons';
import SmallTrackCard from '@/components/smallTrackCard/smallTrackCard';
import { ArtistCard } from '@/components/artistCards/artistCards';
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

	const renderLikedTrackList = () => {
		if (!tracksLoading) {
			if (likedTrackList.length === 0) {
				return (
					<span className={styles.no_data_span}>
						Вы не добавили ни одного трека
					</span>
				);
			} else {
				return likedTrackList.map((item) => {
					return (
						<SmallTrackCard
							track={item}
							playList={likedTrackList}
							showRemoveButton={false}
							key={item.id}
						/>
					);
				});
			}
		} else {
			return <div className="loading"></div>;
		}
	};

	const renderLikedArtists = () => {
		if (!artistsLoading) {
			if (likedArtists.length === 0) {
				return (
					<span className={styles.no_data_span}>
						Вы не подписаны ни на одного артиста
					</span>
				);
			} else {
				if (isPopular) {
					const artistsListCopy = [...likedArtists];
					const sortedArr = artistsListCopy.sort(
						(a, b) => b.likes - a.likes,
					);
					return sortedArr.map((item) => {
						return (
							<ArtistCard
								key={item.id}
								id={item.id}
								name={item.name}
								img={item.artistImg}
								type="small"
							/>
						);
					});
				} else {
					return likedArtists.map((item) => {
						return (
							<ArtistCard
								key={item.id}
								id={item.id}
								name={item.name}
								img={item.artistImg}
								type="small"
							/>
						);
					});
				}
			}
		}
	};

	return (
		<aside
			className={clsx(
				styles.aside_bar,
				showPlayList && styles.with_playlist,
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
				{renderLikedTrackList()}
			</div>
			<div className={styles.flex_row}>
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
						likedArtists.length === 0
							? styles.artists_grid_flex
							: styles.artists_grid_grid,
					)}
				>
					{renderLikedArtists()}
				</div>
			</div>
		</aside>
	);
};

export default AsideBar;
