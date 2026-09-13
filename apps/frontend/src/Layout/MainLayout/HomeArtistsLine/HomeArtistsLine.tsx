import { FC, useEffect, useRef, useState, useCallback } from 'react';
import styles from './HomeArtistsLine.module.scss';
import Button from '@/components/buttons/buttons';
import { HomeArtists } from '@/components/artistCards/HomeArtists';
import { useGetArtistsQuery } from '@/api/rtk/artists';

export const HomeArtistsLine: FC = () => {
	const {
		data: artists = [],
		error: artistError,
		isLoading: artistLoading,
	} = useGetArtistsQuery();

	const artistLineWrapper = useRef<HTMLDivElement>(null);
	const artistLine = useRef<HTMLDivElement>(null);
	const [disableLeftButton, setDisableLeftButton] = useState<boolean>(true);
	const [disableRightButton, setDisableRightButton] = useState<boolean>(false);

	const checkShadows = useCallback((wrapper: HTMLDivElement) => {
		const { scrollLeft, clientWidth, scrollWidth } = wrapper;
		setDisableLeftButton(scrollLeft <= 1);
		setDisableRightButton(scrollLeft + clientWidth >= scrollWidth - 1);
	}, []);

	useEffect(() => {
		const wrapper = artistLineWrapper.current;
		if (!wrapper) return;

		const controller = new AbortController();
		if (!artistLoading && artists.length > 0) {
			checkShadows(wrapper);
		}
		wrapper.addEventListener('scroll', () => checkShadows(wrapper), { signal: controller.signal });

		return () => {
			controller.abort();
		};
	}, [checkShadows, artistLoading, artists.length]);

	const slideToNext = () => {
		artistLineWrapper.current?.scrollBy({ left: 500, behavior: 'smooth' });
	};

	const slideToPrev = () => {
		artistLineWrapper.current?.scrollBy({ left: -500, behavior: 'smooth' });
	};

	return (
		<div className={styles.artists_line_section}>
			<div className={styles.artists_line_section_header}>
				<span>Артисты</span>
				<div className={styles.buttons_wrapper}>
					<Button
						className={styles.button}
						onClick={slideToPrev}
						variant="alternative"
						size="3xl"
						disabled={disableLeftButton}
					>
						{'<'}
					</Button>

					<Button
						className={styles.button}
						onClick={slideToNext}
						variant="alternative"
						size="3xl"
						disabled={disableRightButton}
					>
						{'>'}
					</Button>
				</div>
			</div>
			<div
				ref={artistLineWrapper}
				className={styles.artists_line_wrapper}
			>
				<div className={styles.artists_line} ref={artistLine}>
					{artistLoading ? (
						<div className="loader"></div>
					) : (
						<HomeArtists artists={artists} error={artistError} />
					)}
				</div>
			</div>
		</div>
	);
};
