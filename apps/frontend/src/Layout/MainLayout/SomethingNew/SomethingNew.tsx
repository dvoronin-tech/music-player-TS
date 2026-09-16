import { FC } from 'react';
import { useGetTracksQuery } from '@/api/rtk/tracks';
import { Loader } from '@/components/loader/Loader';
import { HomeTracks } from '@/components/homeTrackCards/HomeTracks';
import styles from './SomethingNew.module.scss';

export const SomethingNew: FC = () => {
	const {
		data: trackList = [],
		error: tracksError,
		isLoading: tracksLoading,
	} = useGetTracksQuery();

	return (
		<div className={styles.something_new}>
			<span className={styles.something_new_title}>Что-то новое</span>
			<div
				style={{
					justifyContent: tracksLoading
						? 'center'
						: 'space-between',
				}}
				className={styles.home_track_cards_wrapper}
			>
				{tracksLoading ? (
					<Loader />
				) : (
					<HomeTracks
						tracks={trackList}
						error={tracksError}
					/>
				)}
			</div>
		</div>
	);
};
