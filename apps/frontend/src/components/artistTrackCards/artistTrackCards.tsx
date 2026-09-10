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
import { MdErrorOutline } from 'react-icons/md';
import { shallowEqual } from 'react-redux';

interface IProp {
	playList: ApiTrack[];
	track: ApiTrack;
}

const ArtistTrackCard: FC<IProp> = ({ track, playList }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
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
					? 'Трек удалён из <span>избранного</span>'
					: 'Трек добавлен в <span>избранное</span>',
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
						'Трек добавлен в <span>текущий плейлист</span>',
				}),
			);
		} else {
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: <MdErrorOutline style={{ color: '#C84141' }} />,
					info: `${track.title} - ${formatArtistNames(track.artists)}`,
					additionalInfo:
						'Трек уже добавлен в <span>текущий плейлист</span>',
				}),
			);
		}
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			style={{ flexBasis: isHovered ? '60%' : '35%' }}
			className={styles.popular_track_item}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className={clsx(
					styles.background_img,
					isHovered ? styles.width_hover : styles.width_full,
				)}
				style={{ backgroundImage: `url(${albumImg})` }}
				onClick={setCurrentTrack}
			>
				{currentTrack?.id === id && (
					<div className={styles.playing_tag_wrapper}>
						<PlayingTrackTag height={50} />
					</div>
				)}
				<span
					className={
						isHovered ? styles.title_hidden : styles.title_visible
					}
				>
					{title}
				</span>
			</div>
			<div
				className={clsx(
					styles.track_item_info_panel,
					isHovered ? styles.panel_expanded : styles.panel_collapsed,
				)}
			>
				<>
					<div
						style={{ opacity: isHovered ? 1 : 0 }}
						className={styles.track_item_info}
					>
						<span>{title}</span>
						<span>{auditions} прослушиваний</span>
					</div>
					<div
						style={{ opacity: isHovered ? 1 : 0 }}
						className={styles.track_item_action_buttons}
					>
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
				</>
			</div>
		</div>
	);
};

export default ArtistTrackCard;
