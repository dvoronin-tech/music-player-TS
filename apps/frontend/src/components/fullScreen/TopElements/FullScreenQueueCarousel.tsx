import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/hooks/useTypedRedux';
import Button from '@/components/buttons/buttons';
import { FullScreenPlayQueue } from './FullScreenPlayQueue';
import {
	selectCurrentTrack,
	selectPlayerQueue,
	selectPlayQueue,
} from '@/store/slices/player';
import styles from './TopElements.module.scss';

const CPL_ITEM_WIDTH = 260;
const CPL_PAGE_STEP = CPL_ITEM_WIDTH * 2;

export const FullScreenQueueCarousel: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const playQueue = useAppSelector(selectPlayQueue);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);

	const [CPLTranslateValue, setCPLTranslateValue] = useState(0);
	const [isCPLLong, setIsCPLLong] = useState(false);
	const CPLSelectionRef = useRef<HTMLDivElement | null>(null);
	const CPLLineRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (CPLSelectionRef.current && CPLLineRef.current) {
			const selection = CPLSelectionRef.current;
			const line = CPLLineRef.current;
			if (selection.clientWidth < line.clientWidth - CPLTranslateValue) {
				setIsCPLLong(true);
			} else {
				setIsCPLLong(false);
			}
		}
	}, [
		CPLSelectionRef.current?.clientWidth,
		CPLLineRef.current?.clientWidth,
		CPLTranslateValue,
	]);

	useEffect(() => {
		if (currentTrack) {
			const trackIndex = playQueue.findIndex(
				(item) => item.id === currentTrack.id,
			);
			if (trackIndex !== 0) {
				setCPLTranslateValue(CPL_ITEM_WIDTH * (trackIndex - 1));
			} else {
				setCPLTranslateValue(CPL_ITEM_WIDTH * trackIndex);
			}
		}
	}, [currentTrack, playQueue]);

	const CPLTranslateToNext = () => {
		setCPLTranslateValue((prevState) => {
			if (CPLSelectionRef.current) {
				const newValue = prevState + CPL_PAGE_STEP;
				if (CPLLineRef.current) {
					if (
						newValue >=
						CPLLineRef.current.clientWidth -
							CPLSelectionRef.current.clientWidth
					) {
						return (
							CPLLineRef.current.clientWidth -
							CPLSelectionRef.current.clientWidth +
							10
						);
					}
				}
				return newValue;
			} else {
				return prevState;
			}
		});
	};

	const CPLTranslateToPrev = () => {
		setCPLTranslateValue((prevState) => {
			const newValue = prevState - CPL_PAGE_STEP;
			if (newValue <= 0) {
				return 0;
			}
			return newValue;
		});
	};

	return (
		<div
			className={clsx(
				styles.cpl_selection,
				{
					[styles.cpl_visible]: showCurrentPlayList,
				},
				{
					[styles.cpl_gradient_end_visible]: isCPLLong,
				},
				{
					[styles.cpl_gradient_start_visible]: !!CPLTranslateValue,
				},
			)}
			ref={CPLSelectionRef}
		>
			<Button
				variant="alternative"
				className={clsx(styles.fullscreen_prev_button, {
					[styles.fullscreen_nav_visible]: !!CPLTranslateValue,
				})}
				size="3xl"
				onClick={CPLTranslateToPrev}
			>
				{'<'}
			</Button>

			<div
				className={styles.cpl_line}
				style={{
					transform: `translate(-${CPLTranslateValue}px)`,
				}}
				ref={CPLLineRef}
			>
				{playQueue.length > 0 && (
					<FullScreenPlayQueue
						playQueue={playQueue}
						currentPlayList={currentPlayList}
					/>
				)}
			</div>

			<Button
				variant="alternative"
				className={clsx(styles.fullscreen_next_button, {
					[styles.fullscreen_nav_visible]: isCPLLong,
				})}
				size="3xl"
				onClick={CPLTranslateToNext}
			>
				{'>'}
			</Button>
		</div>
	);
};
