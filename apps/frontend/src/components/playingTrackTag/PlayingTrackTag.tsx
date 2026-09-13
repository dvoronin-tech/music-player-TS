import { FC } from 'react';
import styles from './playingTrackTag.module.scss';

interface PlayingTrackTagProps {
	height?: number;
}

export const PlayingTrackTag: FC<PlayingTrackTagProps> = ({ height = 30 }) => {
	return (
		<div
			className={styles.playing_tag}
			style={
				{
					'--tag-height': `${height}px`,
					'--bar-width': `${height === 30 ? 7 : 11}px`,
				} as React.CSSProperties
			}
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
