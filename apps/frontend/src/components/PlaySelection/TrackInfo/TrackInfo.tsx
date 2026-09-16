import { FC, memo } from 'react';
import clsx from 'clsx';
import { shallowEqual } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import type { ApiArtistRef } from '@music-player/backend';

import { Loader } from '@/components/loader/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowFullScreen } from '@/store/slices/ui';
import { ArtistButtons } from '@/utils/formatArtists';
import { selectCurrentTrack, selectIsLoading } from '@/store/slices/player';

import styles from './TrackInfo.module.scss';

interface TrackInfoProps {
	className?: string;
}

export const TrackInfo: FC<TrackInfoProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { currentTrack, pending } = useAppSelector(
		(state) => ({
			currentTrack: selectCurrentTrack(state),
			pending: selectIsLoading(state),
		}),
		shallowEqual,
	);

	if (!currentTrack) {
		return null;
	}

	const handleToggleFullScreen = () => {
		dispatch(toggleShowFullScreen(true));
	};

	const handleArtistClick = (
		artist: ApiArtistRef,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.stopPropagation();
		navigate({
			to: '/artist/$artistId',
			params: { artistId: String(artist.id) },
		});
	};

	return (
		<div
			className={clsx(styles.track_info, className)}
			onClick={handleToggleFullScreen}
		>
			<div className={styles.album_img_wrapper}>
				{pending ? (
					<Loader />
				) : (
					<img
						className={styles.album_img}
						src={currentTrack.albumImg}
						alt="album"
					/>
				)}
			</div>
			<div className={styles.meta}>
				<span className={styles.title}>{currentTrack.title}</span>
				<ArtistButtons
					artists={currentTrack.artists}
					className={styles.artists_wrapper}
					buttonClassName={styles.artists}
					onClick={handleArtistClick}
				/>
			</div>
		</div>
	);
});
