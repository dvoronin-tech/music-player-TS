import { FC, useEffect, useState } from 'react';
import styles from './smallTrackCard.module.scss';
import { Cross, Like } from '@/components/icons and tags/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import {
	removeTrackFromQueue,
	selectCurrentTrack,
	startTrack,
} from '@/store/slices/player';
import { addNotification } from '@/store/slices/notification';
import { formatArtistNames } from '@/utils/formatArtists';
import type { ApiTrack } from '@music-player/backend';
import { v4 as randomId } from 'uuid';

interface ISmallTrackListProps {
	track: ApiTrack;
	playList: ApiTrack[];
	showRemoveButton?: boolean;
}

const SmallTrackCard: FC<ISmallTrackListProps> = ({
	track,
	playList,
	showRemoveButton = true,
}) => {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const [isLikedTrack, setIsLikedTrack] = useState(false);

	const deleteLike = () => {
		toggleLikedTrack({ id: track.id, isLiked: isLikedTrack });
		dispatch(
			addNotification({
				img: track.albumImg,
				info: `${track.title} - ${formatArtistNames(track.artists)}`,
				additionalInfo: 'Трек удалён из <span>избранного</span>',
				notificationId: randomId(),
			}),
		);
	};

	useEffect(() => {
		const isLikedTrackItem = likedTrackList.find(
			(item) => item.id === track.id,
		);
		if (isLikedTrackItem) {
			setIsLikedTrack(true);
		} else {
			setIsLikedTrack(false);
		}
	}, [likedTrackList, track.id]);

	const deleteCurrent = () => {
		dispatch(removeTrackFromQueue(track.id));
	};

	const setCurrent = () => {
		dispatch(startTrack({ queue: playList, trackId: track.id }));
	};

	return (
		<div className={styles.track_item_wrapper}>
			<div className={styles.track_info_wrapper} onClick={setCurrent}>
				<div className={styles.img_wrapper}>
					<img src={track.albumImg} alt={track.title} draggable={false} />
				</div>
				<div className={styles.small_track_item_info}>
					<span>{track.title}</span>
					<span>{formatArtistNames(track.artists)}</span>
				</div>
			</div>
			{showRemoveButton && currentTrack?.id !== track.id && (
				<button style={{ marginRight: 5 }} onClick={deleteCurrent}>
					<Cross />
				</button>
			)}
			<button onClick={deleteLike}>
				<Like type={isLikedTrack ? 'active' : 'idle'} />
			</button>
		</div>
	);
};

export default SmallTrackCard;
