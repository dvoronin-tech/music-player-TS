import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './artistTrackCards.module.scss';
import Button from '@/components/buttons/buttons';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import {
	addTrackToQueue,
	selectPlayerQueue,
	startTrack,
} from '@/store/slices/player';
import PlaylistAddIcon from '@/assets/icons/playlist-add.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import { addNotification } from '@/store/slices/notification';
import { formatArtistNames } from '@/utils/formatArtists';
import type { ApiTrack } from '@music-player/backend';
import { v4 as randomId } from 'uuid';

interface Prop {
	playList: ApiTrack[];
	track: ApiTrack;
}

const ArtistTrackCard: FC<Prop> = ({ track, playList }) => {
	const dispatch = useAppDispatch();
	const { albumImg, id, title } = track;

	const setCurrentTrack = () => {
		dispatch(startTrack({ queue: playList, trackId: id }));
	};

	return (
		<div className={styles.popular_track_item}>
			<div className={styles.background_img} onClick={setCurrentTrack}>
				<img src={albumImg} alt={title} draggable={false} />
				<span>{title}</span>
			</div>
			<TrackItemInfo track={track} playList={playList} />
		</div>
	);
};

interface TrackItemInfoProps {
	track: ApiTrack;
	playList: ApiTrack[];
}

const TrackItemInfo: FC<TrackItemInfoProps> = ({ track, playList }) => {
	const dispatch = useAppDispatch();
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { id, title, auditions } = track;

	useEffect(() => {
		setIsLiked(!!likedTrackList.find((likedTrack) => likedTrack.id === id));
	}, [likedTrackList, id]);

	const addToPlayList = () => {
		const isAlreadyInQueue = currentPlayList.some((item) => item.id === id);
		if (!isAlreadyInQueue) {
			dispatch(addTrackToQueue(track));
		}

		const info = `${track.title} - ${formatArtistNames(track.artists)}`;
		dispatch(
			addNotification(
				isAlreadyInQueue
					? {
							notificationId: randomId(),
							info,
							additionalInfo:
								'Трек уже добавлен в __текущий плейлист__',
							variant: 'error',
						}
					: {
							notificationId: randomId(),
							img: track.albumImg,
							info,
							additionalInfo:
								'Трек добавлен в __текущий плейлист__',
						},
			),
		);
	};

	const toggleIsLiked = () => {
		toggleLikedTrack({ id, isLiked, track });
	};

	const setCurrentTrack = () => {
		dispatch(startTrack({ queue: playList, trackId: id }));
	};

	return (
		<div className={styles.track_item_info_panel}>
			<div className={styles.track_item_info}>
				<span>{title}</span>
				<span>{auditions} прослушиваний</span>
			</div>
			<div className={styles.track_item_action_buttons}>
				<div className={styles.buttons_wrapper}>
					<Button
						variant="simple"
						size="xs"
						weight="semibold"
						onClick={addToPlayList}
					>
						<PlaylistAddIcon className="icon" />
					</Button>
					<Button
						variant="simple"
						size="xs"
						weight="semibold"
						onClick={toggleIsLiked}
					>
						<HeartIcon
							className={clsx(
								'icon',
								isLiked ? 'icon-active' : 'icon-like-idle',
							)}
						/>
					</Button>
				</div>
				<Button
                    className={styles.play_button}
					variant="accent"
					onClick={setCurrentTrack}
					size="m"
					weight="semibold"
				>
					Проиграть
				</Button>
			</div>
		</div>
	);
};

export default ArtistTrackCard;
