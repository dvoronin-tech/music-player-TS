import { FC, useEffect, useMemo, useState } from 'react';

import styles from './artist.module.scss';
import { useParams } from '@tanstack/react-router';

import Button from '@/components/buttons/buttons';
import {
	Follow,
	PlayOrPause,
	UnFollow,
} from '@/components/icons and tags/icons';
import ArtistTrackCard from '@/components/artistTrackCards/artistTrackCards';
import { useGetArtistQuery, useGetArtistsQuery } from '@/api/rtk/artists';
import {
	useGetLikedArtistsQuery,
	useToggleLikedArtistMutation,
} from '@/api/rtk/liked';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import { addNotification } from '@/store/slices/notification';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { v4 as randomId } from 'uuid';
import { startTrack } from '@/store/slices/player';

const Artist: FC = () => {
	const { artistId } = useParams({
		from: '/artist/$artistId',
	});
	const dispatch = useAppDispatch();
	const { data: artists = [], isLoading: artistsLoading } =
		useGetArtistsQuery();
	const artistSummary = useMemo(
		() => artists.find((item) => item.id === Number(artistId)),
		[artists, artistId],
	);
	const { data: artistDetail, isLoading } = useGetArtistQuery(
		artistSummary?.id ?? skipToken,
	);
	const artist = artistDetail ?? artistSummary;
	const trackList = artistDetail?.tracks ?? [];
	const { data: likedArtistList = [] } = useGetLikedArtistsQuery();
	const [toggleLikedArtist] = useToggleLikedArtistMutation();

	const [isLikedArtist, setIsLikedArtist] = useState(false);

	useEffect(() => {
		const isLikedArtist = likedArtistList.find(
			(item) => item.name === artistId,
		);
		if (isLikedArtist) {
			setIsLikedArtist(true);
		} else {
			setIsLikedArtist(false);
		}
	}, [artistId, likedArtistList]);

	const renderBetterTracks = (isBetter: boolean) => {
		if (trackList.length !== 0) {
			const newTrackList = [...trackList];
			const sortedTrackList = newTrackList.sort((a, b) => {
				return b.auditions - a.auditions;
			});

			if (isBetter) {
				return (
					<>
						{sortedTrackList.map((item, index) => {
							if (index >= 3) {
								return null;
							} else {
								return (
									<ArtistTrackCard
										key={item.id}
										playList={sortedTrackList}
										track={item}
									/>
								);
							}
						})}
					</>
				);
			} else {
				return (
					<>
						{sortedTrackList.map((item, index) => {
							if (index <= 2) {
								return null;
							} else {
								return (
									<HomeTrackCard
										key={item.id}
										track={item}
										playList={sortedTrackList}
									/>
								);
							}
						})}
					</>
				);
			}
		}
	};

	const setCurrentTrack = () => {
		const newTrackList = [...trackList];
		const sortedTrackList = newTrackList.sort((a, b) => {
			return b.auditions - a.auditions;
		});
		if (sortedTrackList.length > 0) {
			dispatch(
				startTrack({
					queue: sortedTrackList,
					trackId: sortedTrackList[0].id,
				}),
			);
		}
	};

	const toggleIsFollowed = () => {
		if (artist) {
			toggleLikedArtist({ id: artist.id, isLiked: isLikedArtist });
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: artist.artistImg,
					info: artist.name,
					additionalInfo: !isLikedArtist
						? 'Вы <span>подписались</span> на артиста'
						: 'Вы <span>отписались</span> от артиста',
				}),
			);
		}
	};

	if (artistsLoading) {
		return (
			<main className={styles.artist}>
				<div className="loader"></div>
			</main>
		);
	}

	if (artist) {
		return (
			<main className={styles.artist}>
				<div className={styles.artist_bg} id="bg">
					<img
						className={styles.artist_bg_image}
						src={artist.bigImg}
						alt=""
					/>
					<div className={styles.artist_info}>
						<span className={styles.artist_name}>
							{artist.name}
						</span>
						<div className={styles.additional_artist_info}>
							<span>Артист</span>
							<span>{artist.likes} подписчиков</span>
						</div>
					</div>
					<div className={styles.artist_action_buttons}>
						<Button
							variant="accent"
							style={{ borderRadius: 100 }}
							onClick={setCurrentTrack}
						>
							<PlayOrPause
								scale={26}
								style={{
									color: '#E0DCEA',
									position: 'relative',
									top: 2,
									left: 2,
								}}
							/>
						</Button>
						<Button
							onClick={toggleIsFollowed}
							variant="simple"
							style={{ borderRadius: 100 }}
							className={styles.follow_artist_btn}
						>
							{isLikedArtist ? (
								<UnFollow
									scale={20}
									style={{
										position: 'relative',
										top: 1,
										left: 1,
									}}
								/>
							) : (
								<Follow
									scale={20}
									style={{
										position: 'relative',
										top: 1,
										left: 1,
									}}
								/>
							)}
						</Button>
					</div>
				</div>
				<div className={styles.artist_tracks_wrapper}>
					<span className={styles.artist_track_title}>
						Популярные треки
					</span>
					<div className={styles.popular_track_list_wrapper}>
						{isLoading ? (
							<div className="loader"></div>
						) : (
							renderBetterTracks(true)
						)}
					</div>
					<span className={styles.artist_track_title}>
						Другие треки от {artist.name}
					</span>
					<div className={styles.more_tracks_wrapper}>
						{isLoading ? (
							<div className="loader"></div>
						) : (
							renderBetterTracks(false)
						)}
					</div>
				</div>
			</main>
		);
	} else {
		return (
			<main className={styles.artist}>
				<div className={styles.error_block}>
					<span>Артист не найден</span>
				</div>
			</main>
		);
	}
};

export default Artist;
