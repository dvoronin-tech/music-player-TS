import { FC, useEffect, useState } from 'react';
import styles from './artistTrackCards.module.scss';
import Button from '@/components/buttons/buttons';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import {
	addTrackToQueue,
	selectCurrentTrack,
	selectPlayerQueue,
	startTrack,
} from '@/store/slices/player';
import {
	AddToPlayList,
	Like,
	PlayingTrackTag,
} from '@/components/icons and tags/icons';
import { addNotification } from '@/store/slices/notification';
import { formatArtistNames } from '@/utils/formatArtists';
import type { ApiTrack } from '@music-player/backend';
import { v4 as randomId } from 'uuid';
import { shallowEqual } from 'react-redux';

interface Prop {
	playList: ApiTrack[];
	track: ApiTrack;
}

const ArtistTrackCard: FC<Prop> = ({ track, playList }) => {
	const dispatch = useAppDispatch();
	const { currentTrack, currentPlayList } = useAppSelector(
		(state) => ({
			currentTrack: selectCurrentTrack(state),
			currentPlayList: selectPlayerQueue(state),
		}),
		shallowEqual,
	);
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const [isLiked, setIsLiked] = useState<boolean>(false);

	const { albumImg, id, title, auditions } = track;
	const setCurrentTrack = () => {
		dispatch(startTrack({ queue: playList, trackId: id }));
	};

	useEffect(() => {
		setIsLiked(!!likedTrackList.find((track) => track.id === id));
	}, [likedTrackList, id]);

	const toggleIsLiked = () => {
		toggleLikedTrack({ id, isLiked });
		dispatch(
			addNotification({
				notificationId: randomId(),
				img: track.albumImg,
				info: `${track.title} - ${formatArtistNames(track.artists)}`,
				additionalInfo: isLiked
					? 'Трек удалён из __избранного__'
					: 'Трек добавлен в __избранное__',
			}),
		);
	};

	const addToPlayList = () => {
		const arrOfId = currentPlayList.map((item) => item.id);
		if (!arrOfId.includes(id)) {
			dispatch(addTrackToQueue(track));
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: track.albumImg,
					info: `${track.title} - ${formatArtistNames(track.artists)}`,
					additionalInfo:
						'Трек добавлен в __текущий плейлист__',
				}),
			);
		} else {
			dispatch(
				addNotification({
					notificationId: randomId(),
					info: `${track.title} - ${formatArtistNames(track.artists)}`,
					additionalInfo:
						'Трек уже добавлен в __текущий плейлист__',
					variant: 'error',
				}),
			);
		}
	};

	return (
		<div className={styles.popular_track_item}>
			<div className={styles.background_img} onClick={setCurrentTrack}>
				<img src={albumImg} alt={title} draggable={false} />
				{currentTrack?.id === id && (
					<div className={styles.playing_tag_wrapper}>
						<PlayingTrackTag height={50} />
					</div>
				)}
				<span>{title}</span>
			</div>
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
							style={{ marginBottom: 10 }}
							onClick={addToPlayList}
						>
							<AddToPlayList />
						</Button>
						<Button
							variant="simple"
							size="xs"
							weight="semibold"
							style={{ marginBottom: 10 }}
							onClick={toggleIsLiked}
						>
							<Like type={isLiked ? 'active' : 'idle'} />
						</Button>
					</div>
					<Button
						variant="accent"
						style={{ borderRadius: 100 }}
						onClick={setCurrentTrack}
						size="m"
						weight="semibold"
					>
						Проиграть
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ArtistTrackCard;
