import { FC, useEffect, useRef, useState } from 'react';
import styles from './Main.module.scss';
import Button from '@/components/buttons/buttons';
import { HomeCard } from '@/components/cards/homeCards/homeCards';
import { ArtistCard } from '@/components/cards/artistCards/artistCards';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { useGetArtistsQuery } from '@/api/rtk/artists';
import { useGetTracksQuery } from '@/api/rtk/tracks';
import { ArtistsError } from '@/components/errorMessages/artistsError';
import { HomeTrackCard } from '@/components/cards/homeTrackCards/homeTrackCards';
import {
	selectCurrentTrack,
	selectPlayList,
} from '@/store/current/actionsCurrent';
import type { ApiTrack } from '@music-player/backend';
import { shuffle } from '@/pages/audioModule/audioModule';
import { publicUrl } from '@/utils/constants';

const Main: FC = () => {
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
	const [rightShadowOpasity, setRightShadowOpacity] = useState<number>(0);

	const artistLineWrapper = useRef<HTMLDivElement>(null);
	const artistLine = useRef<HTMLDivElement>(null);

	useEffect(() => {});

	useEffect(() => {
		const artistLineWidth = artistLineWrapper.current?.clientWidth;
		const artistsCardsWidth = 130 * artists.length;

		if (artistLineWidth) {
			setIsButtonShow(
				artistLineWidth >= artistsCardsWidth - translateValue
					? false
					: true,
			);
			setRightShadowOpacity(1);
		} else {
			setRightShadowOpacity(0);
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
		// if (artistLineWrapper.current) {
		//     const newTranslateValue = translateValue - artistLineWrapper.current.clientWidth + 150
		//     setTranslateValue(newTranslateValue);
		// }

		setTranslateValue((prevState) => {
			const newValue = prevState - 300;
			if (newValue <= 0) {
				return 0;
			}
			return newValue;
		});
	};

	const renderArtists = () => {
		if (artists.length > 0) {
			if (!artistError) {
				return artists.map(({ name, artistImg, id }) => {
					return <ArtistCard key={id} name={name} img={artistImg} />;
				});
			} else {
				const errorMessage =
					artistError && 'data' in artistError && typeof artistError.data === 'string'
						? artistError.data
						: 'При получении артистов произошла ошибка';
				return <ArtistsError errorMessage={errorMessage} />;
			}
		}
		if (artistError) {
			const errorMessage =
				'data' in artistError && typeof artistError.data === 'string'
					? artistError.data
					: 'При получении артистов произошла ошибка';
			return <ArtistsError errorMessage={errorMessage} />;
		}
	};

	const renderTracks = () => {
		if (trackList) {
			if (!tracksError) {
				return trackList.map((item) => {
					return (
						<HomeTrackCard
							key={item.id}
							track={item}
							playList={trackList}
						/>
					);
				});
			} else {
				const errorMessage =
					tracksError &&
					'data' in tracksError &&
					typeof tracksError.data === 'string'
						? tracksError.data
						: 'При получении треков произошла ошибка';
				return <ArtistsError errorMessage={errorMessage} />;
			}
		}
	};

	const setArtistOfMonthPlayList = () => {
		const tracks = trackList.filter((item) =>
			item.artists.some((artist) => artist.name === 'Тринадцать карат'),
		);
		if (tracks) {
			dispatch(
				selectPlayList(
					tracks.sort((a, b) => b.auditions - a.auditions),
				),
			);
			dispatch(selectCurrentTrack(tracks[0].id));
		}
	};

	const setBestInBrooklyn = () => {
		const oldArr = [...trackList];
		const sortedArr = oldArr.sort((a, b) => a.auditions - b.auditions);
		const currentArray: ApiTrack[] = [];
		for (let i = 0; i <= 9; i++) {
			currentArray.push(sortedArr[i]);
		}
		dispatch(selectPlayList(currentArray));
		dispatch(selectCurrentTrack(currentArray[0].id));
	};

	const setBestInCountry = () => {
		const tracks = trackList.filter((item) =>
			item.artists.some(
				(artist) =>
					artist.name === 'Макс корж' ||
					artist.name === 'Тима Белоруских',
			),
		);
		if (tracks) {
			dispatch(selectPlayList(tracks));
			dispatch(selectCurrentTrack(tracks[0].id));
		}
	};

	const bestForYou = () => {
		const shuffledArr = shuffle(trackList);
		const currentArray: ApiTrack[] = [];
		for (let i = 0; i <= 9; i++) {
			currentArray.push(shuffledArr[i]);
		}
		dispatch(selectPlayList(currentArray));
		dispatch(selectCurrentTrack(currentArray[0].id));
	};

	return (
		<>
			<div className={styles.main}>
				<main>
					<div className={styles.cards_wrapper}>
						<div className={styles.cards}>
							<HomeCard
								onClick={setArtistOfMonthPlayList}
								W={800}
								category="Артист месяца"
								content="Тринадцать карат"
								additionalContent="242412 прослушиваний"
								img="/img/home-card-1.webp"
							/>
							<HomeCard
								onClick={setBestInBrooklyn}
								W={530}
								category="Лучшее"
								content="в BROOKLYN"
								additionalContent="Моргенштерн, Тринадцать карат ..."
								img="/img/home-card-2.webp"
							/>
						</div>
						<div className={styles.cards}>
							<HomeCard
								onClick={setBestInCountry}
								W={530}
								category="ТОП"
								content="в Стране"
								additionalContent="Тима белорусских, Макс Корж ..."
								img="/img/home-card-3.webp"
							/>
							<HomeCard
								onClick={bestForYou}
								W={800}
								category="Подборка"
								content="Для вас"
								additionalContent="Nikitata, Тринадцать карат, Три дня до..."
								img="/img/home-card-4.webp"
							/>
						</div>
						<div className={styles.home_artists_line}>
							<span>Артисты</span>
							{translateValue ? (
								<div className={styles.shade}></div>
							) : null}
							<div
								ref={artistLineWrapper}
								className={styles.artists_line}
							>
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
										renderArtists()
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
					</div>
					<div className={styles.something_new}>
						<span className={styles.something_new_title}>
							Что-то новое
						</span>
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
								renderTracks()
							)}
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default Main;
