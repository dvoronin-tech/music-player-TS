import { FC, useMemo } from 'react';
import clsx from 'clsx';

import styles from './ArtistLayout.module.scss';
import { useParams } from '@tanstack/react-router';

import { useGetArtistQuery, useGetArtistsQuery } from '@/api/rtk/artists';
import { PopularArtistTracks } from '@/components/artist/PopularArtistTracks';
import { OtherArtistTracks } from '@/components/artist/OtherArtistTracks';
import { ArtistTracksSection } from './ArtistTracksSection';
import { ArtistHeader } from './ArtistHeader';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useLayout } from '@/hooks/useLayout';
import { Loader } from '@/components/loader/Loader';

const ArtistLayout: FC = () => {
	const { artistId } = useParams({
		from: '/artist/$artistId',
	});
	const isMobile = useLayout() === 'mobile';
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

	if (artistsLoading) {
		return (
			<main className={styles.artist}>
				<Loader />
			</main>
		);
	}

	if (artist) {
		return (
			<main className={styles.artist}>
				<ArtistHeader artist={artist} tracks={sortedTrackList} />
				<div className={styles.artist_tracks_wrapper}>
					<ArtistTracksSection
						title="Популярные треки"
						className={styles.popular_track_list_wrapper}
					>
						{isLoading ? (
							<Loader />
						) : (
							<PopularArtistTracks tracks={sortedTrackList} />
						)}
					</ArtistTracksSection>
					<ArtistTracksSection
						title={`Другие треки от ${artist.name}`}
						className={clsx(
							styles.more_tracks_wrapper,
							isMobile && styles.more_tracks_list,
						)}
					>
						{isLoading ? (
							<Loader />
						) : (
							<OtherArtistTracks
								tracks={sortedTrackList}
								isMobile={isMobile}
							/>
						)}
					</ArtistTracksSection>
				</div>
			</main>
		);
	}

	return (
		<main className={styles.artist}>
			<div className={styles.error_block}>
				<span>Артист не найден</span>
			</div>
		</main>
	);
};

export default ArtistLayout;
