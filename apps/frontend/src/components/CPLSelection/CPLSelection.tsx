import { FC, useCallback, useRef, useState, type AnimationEvent } from 'react';
import clsx from 'clsx';
import styles from './CPLSelection.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import SmallTrackCard from '@/components/smallTrackCard/smallTrackCard';
import { setCurrentPlayListOpen } from '@/store/slices/ui';
import { selectPlayerQueue, selectPlayQueue } from '@/store/slices/player';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const CPLSelection: FC = () => {
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const playQueue = useAppSelector(selectPlayQueue);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);
	const dispatch = useAppDispatch();
	const cplRef = useRef<HTMLElement>(null);
	const [shouldRenderBlur, setShouldRenderBlur] = useState(
		showCurrentPlayList,
	);

	const closeCurrentPlayList = useCallback(
		(event: PointerEvent) => {
			if (!showCurrentPlayList) return;

			const playSelection = document.querySelector('[data-play-selection]');
			const target = event.target;
			if (target instanceof Node && playSelection?.contains(target)) {
				return;
			}

			dispatch(setCurrentPlayListOpen(false));
		},
		[dispatch, showCurrentPlayList],
	);

	useOutsideClick(cplRef, closeCurrentPlayList);

	if (showCurrentPlayList && !shouldRenderBlur) {
		setShouldRenderBlur(true);
	}

	const handleBlurAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
		if (
			showCurrentPlayList ||
			!event.animationName.includes('cpl-blur-fade-out')
		) {
			return;
		}

		setShouldRenderBlur(false);
	};

	return (
		<>
			<aside
				ref={cplRef}
				className={clsx(
					styles.cpl_selection,
					showCurrentPlayList
						? styles.cpl_visible
						: styles.cpl_hidden,
				)}
			>
				<span className={styles.title_span}>Текущий плейлист</span>
				<div className={styles.track_list_wrapper}>
					{playQueue.map((item) => (
						<SmallTrackCard
							key={item.id}
							track={item}
							playList={currentPlayList}
						/>
					))}
				</div>
			</aside>
			{shouldRenderBlur && (
				<div
					className={clsx(
						styles.blur_bg,
						!showCurrentPlayList && styles.fadeOut,
					)}
					onAnimationEnd={handleBlurAnimationEnd}
				/>
			)}
		</>
	);
};

export default CPLSelection;
