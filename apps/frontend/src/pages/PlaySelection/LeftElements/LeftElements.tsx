import { FC, memo, useMemo } from 'react';
import { shallowEqual } from 'react-redux';

import { Loader } from '@/components/loader/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowFullScreen } from '@/store/slices/ui';
import { formatArtistNames } from '@/utils/formatArtists';

import styles from './LeftElements.module.scss';

export const LeftElements: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { currentPlayList, trackId, pending } = useAppSelector(
		({ current, trackState }) => ({
			currentPlayList: current.currentPlayList,
			trackId: current.trackId,
			pending: trackState.pending,
		}),
		shallowEqual,
	);
	const currentTrack = useMemo(
		() => currentPlayList.find((item) => item.id === trackId),
		[currentPlayList, trackId],
	);

	if (!currentTrack) {
		return null;
	}

	const handleToggleFullScreen = () => {
		dispatch(toggleShowFullScreen(true));
	};

	return (
		<div className={styles.left_elements} onClick={handleToggleFullScreen}>
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
			<div className={styles.track_info}>
				<span>{currentTrack.title}</span>
				<span className={styles.artists}>
					{formatArtistNames(currentTrack.artists)}
				</span>
			</div>
		</div>
	);
});
