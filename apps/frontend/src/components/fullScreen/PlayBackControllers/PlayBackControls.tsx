import { FC } from 'react';
import { PlayBackLeftControllers } from './PlayBackLeftControllers';
import { PlayBackCenterControllers } from './PlayBackCenterControllers';
import { PlayBackRightControllers } from './PlayBackRightControllers';
import styles from './PlayBackControllers.module.scss';

export const PlayBackControls: FC = () => {
	return (
		<div className={styles.fullscreen_controls}>
			<PlayBackLeftControllers />
			<PlayBackCenterControllers />
			<PlayBackRightControllers />
		</div>
	);
};
