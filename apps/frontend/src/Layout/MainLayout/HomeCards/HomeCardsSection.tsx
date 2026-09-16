import { FC, memo } from 'react';
import type { ApiTrack } from '@music-player/backend';

import { useAppDispatch } from '@/hooks/useTypedRedux';
import { useGetTracksQuery } from '@/api/rtk/tracks';
import { startTrack } from '@/store/slices/player';
import { shuffle } from '@/utils/shuffle';
import styles from './HomeCard.module.scss';
import { HomeCard } from './HomeCard';
import type { HomeCardProps } from './HomeCard';
import { useLayout } from '@/hooks/useLayout';
import { HomeCardsSlider } from './HomeCardsSlider/HomeCardsSlider';

export const HomeCardsSection: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { data: trackList = [] } = useGetTracksQuery();
	const isMobile = useLayout() === 'mobile';

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
		const sortedArr = oldArr.sort((a, b) => b.auditions - a.auditions);
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

	const cards: HomeCardProps[] = [
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
			additionalContent: 'Nikitata, Тринадцать карат, Три дня до...',
			img: '/img/home-card-4.webp',
		},
	];

	if (isMobile) {
		return <HomeCardsSlider cards={cards} />;
	}
	return (
		<div className={styles.home_cards_wrapper}>
			{cards.map((card) => (
				<HomeCard key={card.img} {...card} />
			))}
		</div>
	);
});
