import { FC } from 'react';
import clsx from 'clsx';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import HeartIcon from '@/assets/icons/heart.svg?react';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { selectCurrentTrack } from '@/store/slices/player';
import styles from './PlayBackControllers.module.scss';

export const PlayBackLeftControllers: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const isLiked = likedTrackList.some(
		(track) => track.id === currentTrack?.id,
	);

	const toggleIsLiked = () => {
		if (!currentTrack) {
			return;
		}

		toggleLikedTrack({ id: currentTrack.id, isLiked, track: currentTrack });
	};

	return (
		<div className={styles.left_controllers}>
			<button className={styles.controller_btn} onClick={toggleIsLiked}>
				<HeartIcon
					className={clsx(
						'icon',
						isLiked ? 'icon-active' : 'icon-like-idle',
					)}
				/>
			</button>
		</div>
	);
};
