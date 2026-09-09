import { FC, memo } from 'react';
import { shallowEqual } from 'react-redux';

import { Loader } from '@/components/loader/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowFullScreen } from '@/store/slices/ui';
import { formatArtistNames } from '@/utils/formatArtists';
import {
	selectCurrentTrack,
	selectIsLoading,
} from '@/store/slices/player';

import styles from './LeftElements.module.scss';

export const LeftElements: FC = memo(() => {
	const dispatch = useAppDispatch();
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
