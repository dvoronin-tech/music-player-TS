import { FC } from 'react';
import styles from './TrackControls.module.scss';
import { TrackControlButtons } from './TrackControlButtons';
import { TrackProgress } from './TrackProgress';

export const TrackControls: FC = () => {
	return (
		<div className={styles.track_controls}>
			<TrackControlButtons />
			<TrackProgress />
		</div>
	);
};
