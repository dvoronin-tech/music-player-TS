import { FC, ReactNode } from 'react';
import styles from './ArtistLayout.module.scss';

interface ArtistTracksSectionProps {
	title: string;
	className?: string;
	children: ReactNode;
}

export const ArtistTracksSection: FC<ArtistTracksSectionProps> = ({
	title,
	className,
	children,
}) => {
	return (
		<>
			<span className={styles.artist_track_title}>{title}</span>
			<div className={className}>{children}</div>
		</>
	);
};
