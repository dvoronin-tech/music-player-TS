import { FC, useMemo } from 'react';
import clsx from 'clsx';

import styles from './homeTrackCards.module.scss';
import PlaylistAddIcon from '@/assets/icons/playlist-add.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';
import { PlayingTrackTag } from '@/components/playingTrackTag/PlayingTrackTag';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import {
	addTrackToQueue,
	removeTrackFromQueue,
	selectCurrentTrack,
	selectIsPlaying,
	selectPlayerQueue,
	startTrack,
} from '@/store/slices/player';
import { addNotification } from '@/store/slices/notification';
import { formatArtistNames } from '@/utils/formatArtists';
import type { ApiTrack } from '@music-player/backend';
import { v4 as randomId } from 'uuid';
import { shallowEqual } from 'react-redux';

interface Prop {
	track: ApiTrack;
	playList: ApiTrack[];
	renderedInFullScreen?: boolean;
}

export const HomeTrackCard: FC<Prop> = ({
	track,
	playList,
	renderedInFullScreen,
}) => {
	const dispatch = useAppDispatch();
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();
	const { id, title, albumImg, artists } = track;
	const { currentTrack, currentPlayList, isPlay } = useAppSelector(
		(state) => ({
			currentTrack: selectCurrentTrack(state),
			currentPlayList: selectPlayerQueue(state),
			isPlay: selectIsPlaying(state),
		}),
		shallowEqual,
	);

	const isCurrent = currentTrack?.id === id;

	const isLiked = useMemo(
		() => likedTrackList.some((track) => track.id === id),
		[likedTrackList, id],
	);

	const playTrack = () => {
		dispatch(startTrack({ queue: playList, trackId: id }));
	};

	const toggleIsLiked = () => {
		toggleLikedTrack({ id, isLiked, track });
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

	const deleteTrack = () => {
		dispatch(removeTrackFromQueue(track.id));
	};

	return (
		<div className={styles.home_track_card}>
			<div
				className={clsx(styles.home_track_card_wrapper, {
					[styles.home_track_card_wrapper_current]: isCurrent,
				})}
			>
				<PlayButton isCurrent={isCurrent} isPlaying={isPlay} />
				<img onClick={playTrack} src={albumImg} alt="Фото трека" />
			</div>
			<div className={styles.home_track_card_data}>
				<div className={styles.home_track_card_info}>
					<span>{title}</span>
					<span>{formatArtistNames(artists)}</span>
				</div>
				<div className={styles.home_track_card_buttons}>
					{renderedInFullScreen ? (
						track.id !== currentTrack?.id && (
							<button onClick={deleteTrack}>
								<CloseIcon className="icon" />
							</button>
						)
					) : (
						<button onClick={addToPlayList}>
							<PlaylistAddIcon className="icon" />
						</button>
					)}
					<button onClick={toggleIsLiked}>
						<HeartIcon
							className={clsx(
								'icon',
								isLiked ? 'icon-active' : 'icon-like-idle',
							)}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

const PlayButton: FC<{ isCurrent: boolean; isPlaying: boolean }> = ({
	isCurrent,
	isPlaying,
}) => {
	return (
		<button className={styles.home_track_card_play}>
			{isCurrent ? (
				isPlaying ? (
					<PlayingTrackTag />
				) : (
					<PlayIcon
						style={{ position: 'relative', left: '0' }}
						width={23}
						height={23}
						className="icon-active"
					/>
				)
			) : (
				<PlayIcon
					width={28}
					height={28}
					className={styles.home_track_card_play_icon}
				/>
			)}
		</button>
	);
};
