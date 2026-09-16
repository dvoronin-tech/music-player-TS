import { FC } from 'react';
import SmallTrackCard from '@/components/smallTrackCard/smallTrackCard';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { selectPlayerQueue, selectPlayQueue } from '@/store/slices/player';
import styles from './fullScreen.module.scss';

export const FullScreenQueue: FC = () => {
	const playQueue = useAppSelector(selectPlayQueue);
	const currentPlayList = useAppSelector(selectPlayerQueue);

	return (
		<div className={styles.queue}>
			{playQueue.map((item) => (
				<SmallTrackCard
					key={item.id}
					track={item}
					playList={currentPlayList}
				/>
			))}
		</div>
	);
};
