import { FC, useEffect, useState } from 'react';
import styles from './smallTrackCard.module.scss';
import styled from 'styled-components';
import { Cross, Like } from '@/components/icons and tags/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import {
	deleteCurrentTrack,
	selectCurrentTrack,
	selectPlayList,
} from '@/store/current/actionsCurrent';
import { addNotification } from '@/store/notificationQueue/actionsNotification';
import { formatArtistNames } from '@/utils/formatArtists';
import type { ApiTrack } from '@music-player/backend';
import { v4 as randomId } from 'uuid';

interface ISmallTrackListProps {
	track: ApiTrack;
	playList: ApiTrack[];
	isLiked?: boolean;
}

const TrackItemWrapper = styled.div<{ $isLiked: boolean }>`
	box-sizing: border-box;
	width: ${({ $isLiked }) => ($isLiked ? '360px' : '410px')};
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	button {
		cursor: pointer;
	}
`;

const ImgWrapper = styled.div<{ $img: string }>`
	width: 40px;
	height: 40px;
	background-image: url(${({ $img }) => $img});
	background-position: center;
	background-size: cover;
	border-radius: 5px;
`;

const TrackInfoWrapper = styled.div`
	flex: 1 0 200px;
	display: flex;
	align-items: center;
`;

const SmallTrackCard: FC<ISmallTrackListProps> = ({
	track,
	playList,
	isLiked = false,
}) => {
	const dispatch = useAppDispatch();
	const currentTrackId = useAppSelector((state) => state.current.trackId);
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
		dispatch(deleteCurrentTrack(track.id));
	};

	const setCurrent = () => {
		dispatch(selectCurrentTrack(track.id));
		dispatch(selectPlayList(playList));
	};

	return (
		<TrackItemWrapper $isLiked={isLiked}>
			<TrackInfoWrapper onClick={setCurrent}>
				<ImgWrapper $img={track.albumImg}></ImgWrapper>
				<div className={styles.small_track_item_info}>
					<span>{track.title}</span>
					<span>{formatArtistNames(track.artists)}</span>
				</div>
			</TrackInfoWrapper>
			{!isLiked && currentTrackId !== track.id && (
				<button style={{ marginRight: 5 }} onClick={deleteCurrent}>
					<Cross />
				</button>
			)}
			<button onClick={deleteLike}>
				<Like type={isLikedTrack ? 'active' : 'idle'} />
			</button>
		</TrackItemWrapper>
	);
};

export default SmallTrackCard;
