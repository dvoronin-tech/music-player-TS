import { FC } from 'react';
import clsx from 'clsx';
import { v4 as randomId } from 'uuid';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import HeartIcon from '@/assets/icons/heart.svg?react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { formatArtistNames } from '@/utils/formatArtists';
import { selectCurrentTrack } from '@/store/slices/player';
import { addNotification } from '@/store/slices/notification';
import styles from './PlayBackControllers.module.scss';

export const PlayBackLeftControllers: FC = () => {
	const dispatch = useAppDispatch();
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

		toggleLikedTrack({ id: currentTrack.id, isLiked });
		dispatch(
			addNotification({
				notificationId: randomId(),
				img: currentTrack.albumImg,
				info: `${currentTrack.title} - ${formatArtistNames(currentTrack.artists)}`,
				additionalInfo: isLiked
					? 'Трек удалён из __избранного__'
					: 'Трек добавлен в __избранное__',
			}),
		);
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
