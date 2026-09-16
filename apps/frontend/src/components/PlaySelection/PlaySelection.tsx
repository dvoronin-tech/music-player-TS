import { FC, memo } from 'react';

import styles from './PlaySelection.module.scss';

import { useAppSelector } from '@/hooks/useTypedRedux';

import { TrackInfo } from './TrackInfo/TrackInfo';
import { TrackControls } from './TrackControls/TrackControls';
import { selectCurrentTrack } from '@/store/slices/player';

const PlaySelection: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);

	if (!currentTrack) return null;

	return (
		<div className={styles.play_selection} data-play-selection>
			<TrackInfo />
			<TrackControls />
		</div>
	);
};

export default memo(PlaySelection);
