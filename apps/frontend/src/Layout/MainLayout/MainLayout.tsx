import { FC, useEffect, useRef, useState } from 'react';
import styles from './MainLayout.module.scss';
import Button from '@/components/buttons/buttons';
import { HomeCards } from '@/components/homeCard/HomeCards';
import { HomeArtists } from '@/components/artistCards/HomeArtists';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { useGetArtistsQuery } from '@/api/rtk/artists';
import { useGetTracksQuery } from '@/api/rtk/tracks';
import { HomeTracks } from '@/components/homeTrackCards/HomeTracks';
import type { ApiTrack } from '@music-player/backend';
import { startTrack } from '@/store/slices/player';
import { shuffle } from '@/utils/shuffle';

const MainLayout: FC = () => {
	const dispatch = useAppDispatch();

	const {
		data: artists = [],
		error: artistError,
		isLoading: artistLoading,
	} = useGetArtistsQuery();
	const {
		data: trackList = [],
		error: tracksError,
		isLoading: tracksLoading,
	} = useGetTracksQuery();

	const [isButtonShow, setIsButtonShow] = useState<boolean>(false);
	const [translateValue, setTranslateValue] = useState<number>(0);

	const artistLineWrapper = useRef<HTMLDivElement>(null);
	const artistLine = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const artistLineWidth = artistLineWrapper.current?.clientWidth;
		const artistsCardsWidth = 130 * artists.length;

		if (artistLineWidth) {
			setIsButtonShow(
				artistLineWidth >= artistsCardsWidth - translateValue
					? false
					: true,
			);
		}
	}, [artists.length, translateValue]);

	const slideToNextArtistPage = () => {
		setTranslateValue((prevState) => {
			if (artistLineWrapper.current && artistLine.current) {
				const newValue = prevState + 300;
				if (
					newValue >=
					artistLine.current.clientWidth -
						artistLineWrapper.current.clientWidth
				) {
					return (
						artistLine.current.clientWidth -
						artistLineWrapper.current.clientWidth
					);
				}
				return newValue;
			} else {
				return prevState;
			}
		});
	};

	const slideToPrevArtistPage = () => {
		setTranslateValue((prevState) => {
			const newValue = prevState - 300;
			if (newValue <= 0) {
				return 0;
			}
			return newValue;
		});
	};

	const setArtistOfMonthPlayList = () => {
		const tracks = trackList.filter((item) =>
			item.artists.some((artist) => artist.name === 'Тринадцать карат'),
		);
		if (tracks.length > 0) {
			const queue = tracks.sort((a, b) => b.auditions - a.auditions);
			dispatch(startTrack({ queue, trackId: queue[0].id }));
		}
	};

	const setBestInBrooklyn = () => {
		const oldArr = [...trackList];
		const sortedArr = oldArr.sort((a, b) => a.auditions - b.auditions);
		const queue: ApiTrack[] = sortedArr.slice(0, 10);
		if (queue.length > 0) {
			dispatch(startTrack({ queue, trackId: queue[0].id }));
		}
	};

	const setBestInCountry = () => {
		const tracks = trackList.filter((item) =>
			item.artists.some(
				(artist) =>
					artist.name === 'Макс Корж' ||
					artist.name === 'Тима Белорусских',
			),
		);
		if (tracks.length > 0) {
			dispatch(startTrack({ queue: tracks, trackId: tracks[0].id }));
		}
	};

	const bestForYou = () => {
		const queue = shuffle(trackList).slice(0, 10);
		if (queue.length > 0) {
			dispatch(startTrack({ queue, trackId: queue[0].id }));
		}
	};

	return (
		<main className={styles.main}>
			<HomeCards
				cards={[
					{
						onClick: setArtistOfMonthPlayList,
						category: 'Артист месяца',
						content: 'Тринадцать карат',
						additionalContent: '242412 прослушиваний',
						img: '/img/home-card-1.webp',
					},
					{
						onClick: setBestInBrooklyn,
						category: 'Лучшее',
						content: 'в BROOKLYN',
						additionalContent: 'Моргенштерн, Тринадцать карат ...',
						img: '/img/home-card-2.webp',
					},
					{
						onClick: setBestInCountry,
						category: 'ТОП',
						content: 'в Стране',
						additionalContent: 'Тима белорусских, Макс Корж ...',
						img: '/img/home-card-3.webp',
					},
					{
						onClick: bestForYou,
						category: 'Подборка',
						content: 'Для вас',
						additionalContent:
							'Nikitata, Тринадцать карат, Три дня до...',
						img: '/img/home-card-4.webp',
					},
				]}
			/>
			<div className={styles.home_artists_line}>
				<span>Артисты</span>
				{translateValue ? <div className={styles.shade}></div> : null}
				<div ref={artistLineWrapper} className={styles.artists_line}>
					{translateValue ? (
						<Button
							onClick={slideToPrevArtistPage}
							variant="alternative"
							size="3xl"
						>
							{'<'}
						</Button>
					) : null}

					<div
						style={{
							transform: `translate(${-translateValue}px)`,
							justifyContent: artistLoading
								? 'center'
								: 'flex-start',
						}}
						className={styles.artists_line_wrapper}
						ref={artistLine}
					>
						{artistLoading ? (
							<div className="loader"></div>
						) : (
							<HomeArtists
								artists={artists}
								error={artistError}
							/>
						)}
					</div>

					{isButtonShow && (
						<Button
							onClick={slideToNextArtistPage}
							variant="alternative"
							size="3xl"
						>
							{'>'}
						</Button>
					)}
				</div>
			</div>
			<div className={styles.something_new}>
				<span className={styles.something_new_title}>Что-то новое</span>
				<div
					style={{
						justifyContent: tracksLoading
							? 'center'
							: 'space-between',
					}}
					className={styles.home_track_cards_wrapper}
				>
					{tracksLoading ? (
						<div className="loader"></div>
					) : (
						<HomeTracks
							tracks={trackList}
							error={tracksError}
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default MainLayout;
