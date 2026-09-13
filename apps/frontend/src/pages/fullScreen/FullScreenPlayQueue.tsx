import { FC } from 'react';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import type { ApiTrack } from '@music-player/backend';

interface FullScreenPlayQueueProps {
	playQueue: ApiTrack[];
	currentPlayList: ApiTrack[];
}

export const FullScreenPlayQueue: FC<FullScreenPlayQueueProps> = ({
	playQueue,
	currentPlayList,
}) => {
	return playQueue.map((item) => (
		<HomeTrackCard
			key={item.id}
			renderedInFullScreen
			playList={currentPlayList}
			track={item}
		/>
	));
};
