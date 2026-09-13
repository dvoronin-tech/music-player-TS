import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { formatArtistNames } from '@/utils/formatArtists';
import { selectCurrentTrack } from '@/store/slices/player';
import styles from './TopElements.module.scss';

export const FullScreenTrackInfo: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);
	const [spanTranslateValue, setSpanTranslateValue] = useState(0);
	const [isSpanHovered, setIsSpanHovered] = useState(false);
	const infoDiv = useRef<HTMLDivElement | null>(null);
	const trackTitleSpan = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (infoDiv.current && trackTitleSpan.current) {
			const wrapper = infoDiv.current;
			const span = trackTitleSpan.current;

			if (wrapper.clientWidth < span.clientWidth && isSpanHovered) {
				setSpanTranslateValue(wrapper.clientWidth - span.clientWidth);
			} else {
				setSpanTranslateValue(0);
			}
		}
	}, [isSpanHovered]);

	if (!currentTrack) {
		return null;
	}

	return (
		<div ref={infoDiv} className={styles.fullscreen_track_info}>
			<span
				className={styles.track_title}
				style={{ left: spanTranslateValue }}
				onMouseEnter={() => setIsSpanHovered(true)}
				onMouseLeave={() => setIsSpanHovered(false)}
				ref={trackTitleSpan}
			>
				{currentTrack.title}
			</span>
			<span className={styles.fullscreen_artist}>
				{formatArtistNames(currentTrack.artists)}
			</span>
		</div>
	);
};
