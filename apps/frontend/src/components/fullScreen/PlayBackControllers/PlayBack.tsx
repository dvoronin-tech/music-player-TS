import { FC } from 'react';
import { PlayBackControls } from './PlayBackControls';
import { PlayBackProgress } from './PlayBackProgress';
import styles from './PlayBackControllers.module.scss';

export const PlayBack: FC = () => {
	return (
		<div className={styles.fullscreen_bottom_elements}>
			<PlayBackControls />
			<PlayBackProgress />
		</div>
	);
};
