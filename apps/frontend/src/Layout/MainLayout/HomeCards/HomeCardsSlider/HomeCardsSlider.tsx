import {
	FC,
	memo,
	useRef,
	type TouchEvent,
	useState,
	CSSProperties,
	useEffect,
} from 'react';

import { HomeCard } from '../HomeCard';
import type { HomeCardProps } from '../HomeCard';
import styles from './HomeCardsSlider.module.scss';
import clsx from 'clsx';

interface HomeCardsSliderProps {
	cards: HomeCardProps[];
}

const GAP = 10;
const SWIPE_THRESHOLD = 0.2;
const AUTO_SLIDE_MS = 6000;

export const HomeCardsSlider: FC<HomeCardsSliderProps> = memo(({ cards }) => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [translateX, setTranslateX] = useState(0);
	const [slideWidth, setSlideWidth] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [autoplayKey, setAutoplayKey] = useState(0);

	const startX = useRef(0);
	const originalDeltaX = useRef(0);
	const slideRef = useRef<HTMLDivElement>(null);

	const cardsCount = cards.length;

	useEffect(() => {
		if (!slideRef.current) return;
		setSlideWidth(slideRef.current?.clientWidth + GAP);
	}, []);

	useEffect(() => {
		if (isDragging || cardsCount < 2 || slideWidth === 0) return;

		const timeoutId = window.setTimeout(() => {
			const nextIndex =
				currentSlideIndex >= cardsCount - 1
					? 0
					: currentSlideIndex + 1;

			setCurrentSlideIndex(nextIndex);
			setTranslateX(-nextIndex * slideWidth);
			setIsAnimating(true);
		}, AUTO_SLIDE_MS);

		return () => window.clearTimeout(timeoutId);
	}, [currentSlideIndex, isDragging, cardsCount, slideWidth]);

	const nextSlide = () => {
		if (currentSlideIndex < cardsCount - 1) {
			const nextIndex = currentSlideIndex + 1;
			setCurrentSlideIndex(nextIndex);
			setTranslateX(-nextIndex * slideWidth);
			setIsAnimating(true);
		} else {
			setTranslateX(-currentSlideIndex * slideWidth);
		}
	};

	const prevSlide = () => {
		if (currentSlideIndex > 0) {
			const prevIndex = currentSlideIndex - 1;
			setCurrentSlideIndex(prevIndex);
			setTranslateX(-prevIndex * slideWidth);
			setIsAnimating(true);
		} else {
			setTranslateX(-currentSlideIndex * slideWidth);
		}
	};

	const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		const { clientX } = e.nativeEvent.changedTouches[0];
		startX.current = clientX;
		setIsDragging(true);
	};

	const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		const { clientX } = e.nativeEvent.changedTouches[0];

		originalDeltaX.current = clientX - startX.current;
		const deltaX = originalDeltaX.current;

		setTranslateX(-currentSlideIndex * slideWidth + deltaX / 2);
	};

	const handleTouchEnd = () => {
		const origDeltaX = originalDeltaX.current;
		const threshold = slideWidth * SWIPE_THRESHOLD;

		if (origDeltaX < -threshold) {
			nextSlide();
		} else if (origDeltaX > threshold) {
			prevSlide();
		} else {
			setTranslateX(-currentSlideIndex * slideWidth);
		}

		originalDeltaX.current = 0;
		setIsDragging(false);
		setAutoplayKey((key) => key + 1);
	};

	const handleTransitionEnd = () => {
		setIsAnimating(false);
	};

	return (
		<div
			className={clsx(styles.sliderWrapper, {
				[styles.isDragging]: isDragging,
			})}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchEnd}
			style={
				{
					'--gap': `${GAP}px`,
					'--auto-slide-duration': `${AUTO_SLIDE_MS}ms`,
				} as CSSProperties
			}
			onTransitionEnd={handleTransitionEnd}
		>
			<div
				className={clsx(styles.slider, {
					[styles.isAnimating]: isAnimating,
				})}
				style={{
					translate: `${translateX}px`,
				}}
			>
				{cards.map((card) => (
					<div className={styles.slide} key={card.img} ref={slideRef}>
						<HomeCard {...card} />
					</div>
				))}
			</div>
			<div className={styles.dots}>
				{cards.map((card, index) => {
					const isActive = index === currentSlideIndex;

					return (
						<span
							key={card.img}
							className={clsx(styles.dot, {
								[styles.dotActive]: isActive,
							})}
						>
							{isActive && (
								<span
									key={autoplayKey}
									className={styles.dotFill}
								/>
							)}
						</span>
					);
				})}
			</div>
		</div>
	);
});
