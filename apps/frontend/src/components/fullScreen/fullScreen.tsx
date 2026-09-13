import { FC } from 'react';
import styles from './fullScreen.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { selectCurrentTrack } from '@/store/slices/player';
import { TopElements } from './TopElements/TopElements';
import { PlayBack } from './PlayBackControllers/PlayBack';

const FullScreen: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);

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
			<TopElements />
			<PlayBack />
		</div>
	);
};

export default FullScreen;
