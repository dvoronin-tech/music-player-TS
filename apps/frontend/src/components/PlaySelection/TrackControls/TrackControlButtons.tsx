import { FC } from 'react';
import { TrackLeftControllers } from './TrackLeftControllers';
import { TrackCenterControllers } from './TrackCenterControllers';
import { TrackRightControllers } from './TrackRightControllers';
import styles from './TrackControls.module.scss';

export const TrackControlButtons: FC = () => {
	return (
		<div className={styles.music_controls}>
			<TrackLeftControllers />
			<TrackCenterControllers />
			<TrackRightControllers />
		</div>
	);
};
