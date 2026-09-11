import { FC, useEffect, useMemo, useState } from 'react';

import styles from './artist.module.scss';
import { useParams } from '@tanstack/react-router';

import { styled } from 'styled-components';
import Button from '@/components/buttons/buttons';
import {
	Follow,
	PlayOrPause,
	UnFollow,
} from '@/components/icons and tags/icons';
import { useGetArtistQuery, useGetArtistsQuery } from '@/api/rtk/artists';
import { PopularArtistTracks } from './PopularArtistTracks';
import { OtherArtistTracks } from './OtherArtistTracks';
import {
	useGetLikedArtistsQuery,
	useToggleLikedArtistMutation,
} from '@/api/rtk/liked';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { addNotification } from '@/store/slices/notification';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { v4 as randomId } from 'uuid';
import { startTrack } from '@/store/slices/player';

const PopularTrackListWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	margin: 20px 0;
`;

const MoreTracksWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
	margin-top: 20px;
`;

const ErrorBlock = styled.div`
	display: flex;
	justify-content: center;

	span {
		font-size: 2rem;
		font-weight: 700;
	}
`;

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
	const sortedTrackList = useMemo(() => {
		if (trackList.length === 0) {
			return [];
		}
		return [...trackList].sort((a, b) => b.auditions - a.auditions);
	}, [trackList]);
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

	const setCurrentTrack = () => {
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
					<PopularTrackListWrapper>
						{isLoading ? (
							<div className="loader"></div>
						) : (
							<PopularArtistTracks tracks={sortedTrackList} />
						)}
					</PopularTrackListWrapper>
					<span className={styles.artist_track_title}>
						Другие треки от {artist.name}
					</span>
					<MoreTracksWrapper>
						{isLoading ? (
							<div className="loader"></div>
						) : (
							<OtherArtistTracks tracks={sortedTrackList} />
						)}
					</MoreTracksWrapper>
				</div>
			</main>
		);
	} else {
		return (
			<main className={styles.artist}>
				<ErrorBlock>
					<span>Артист не найден</span>
				</ErrorBlock>
			</main>
		);
	}
};

export default Artist;
