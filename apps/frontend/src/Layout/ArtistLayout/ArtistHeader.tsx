import { FC } from 'react';
import styles from './ArtistLayout.module.scss';
import Button from '@/components/buttons/buttons';
import PlayIcon from '@/assets/icons/play.svg?react';
import UserPlusIcon from '@/assets/icons/user-plus.svg?react';
import UserCheckIcon from '@/assets/icons/user-check.svg?react';
import type { ApiArtist, ApiTrack } from '@music-player/backend';
import {
	useGetLikedArtistsQuery,
	useToggleLikedArtistMutation,
} from '@/api/rtk/liked';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { startTrack } from '@/store/slices/player';

interface ArtistHeaderProps {
	artist: ApiArtist;
	tracks: ApiTrack[];
}

export const ArtistHeader: FC<ArtistHeaderProps> = ({ artist, tracks }) => {
	const dispatch = useAppDispatch();
	const { data: likedArtistList = [] } = useGetLikedArtistsQuery();
	const [toggleLikedArtist] = useToggleLikedArtistMutation();
	const isLiked = likedArtistList.some((item) => item.id === artist.id);

	const onPlay = () => {
		if (tracks.length > 0) {
			dispatch(
				startTrack({
					queue: tracks,
					trackId: tracks[0].id,
				}),
			);
		}
	};

	const onToggleFollow = () => {
		toggleLikedArtist({ id: artist.id, isLiked, artist });
	};

	return (
		<div className={styles.artist_bg} id="bg">
			<img
				className={styles.artist_bg_image}
				src={artist.bigImg}
				alt=""
			/>
			<div className={styles.artist_info}>
				<span className={styles.artist_name}>{artist.name}</span>
				<div className={styles.additional_artist_info}>
					<span>Артист</span>
					<span>{artist.likes} подписчиков</span>
				</div>
			</div>
			<div className={styles.artist_action_buttons}>
				<Button
					variant="accent"
					onClick={onPlay}
				>
					<PlayIcon
						width={24}
						height={24}
						style={{
							color: '#E0DCEA',
							position: 'relative',
							top: 2,
							left: 2,
						}}
					/>
				</Button>
				<Button
					onClick={onToggleFollow}
					variant="simple"
					className={styles.follow_artist_btn}
				>
					{isLiked ? (
						<UserCheckIcon
							width={20}
							height={20}
							style={{
								position: 'relative',
								top: 1,
								left: 1,
							}}
						/>
					) : (
						<UserPlusIcon
							width={20}
							height={20}
							style={{
								position: 'relative',
								top: 1,
								left: 1,
							}}
						/>
					)}
				</Button>
			</div>
		</div>
	);
};
