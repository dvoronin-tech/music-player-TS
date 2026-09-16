import { FC, useEffect } from 'react';
import styles from './fullScreen.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { selectCurrentTrack } from '@/store/slices/player';
import { TopElements } from './TopElements/TopElements';
import { FullScreenQueue } from './FullScreenQueue';

const FullScreen: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);

	useEffect(() => {
		const html = document.documentElement;
		const { overflow: htmlOverflow, overscrollBehavior: htmlOverscroll } =
			html.style;
		const { overflow: bodyOverflow, overscrollBehavior: bodyOverscroll } =
			document.body.style;

		html.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		html.style.overscrollBehavior = 'none';
		document.body.style.overscrollBehavior = 'none';

		return () => {
			html.style.overflow = htmlOverflow;
			document.body.style.overflow = bodyOverflow;
			html.style.overscrollBehavior = htmlOverscroll;
			document.body.style.overscrollBehavior = bodyOverscroll;
		};
	}, []);

	if (!currentTrack) {
		return null;
	}

	return (
		<div className={styles.background}>
			<img
				className={styles.background_img}
				src={currentTrack.albumImg}
				alt=""
				draggable={false}
			/>
			<div className={styles.content}>
				<TopElements />
				<FullScreenQueue />
			</div>
		</div>
	);
};

export default FullScreen;
