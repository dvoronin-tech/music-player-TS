import { FC, Suspense, lazy } from 'react';
import clsx from 'clsx';
import { useGetTracksQuery } from '@/api/rtk/tracks';
import { Loader } from '@/components/loader/Loader';
import { useLayout } from '@/hooks/useLayout';
import styles from './SomethingNew.module.scss';

const HomeTracks = lazy(() =>
	import('@/components/homeTrackCards/HomeTracks').then((module) => ({
		default: module.HomeTracks,
	})),
);

const SmallTrackCard = lazy(
	() => import('@/components/smallTrackCard/smallTrackCard'),
);

export const SomethingNew: FC = () => {
	const {
		data: trackList = [],
		error: tracksError,
		isLoading: tracksLoading,
	} = useGetTracksQuery();
	const isMobile = useLayout() === 'mobile';

	const justifyContent = tracksLoading
		? 'center'
		: isMobile
			? undefined
			: 'space-between';

	return (
		<div className={styles.something_new}>
			<span className={styles.something_new_title}>Что-то новое</span>
			<div
				style={{
					justifyContent,
				}}
				className={clsx(
					styles.home_track_cards_wrapper,
					isMobile && !tracksLoading && styles.home_track_cards_list,
				)}
			>
				{tracksLoading ? (
					<Loader />
				) : (
					<Suspense fallback={null}>
						{isMobile && !tracksError ? (
							trackList.map((item) => (
								<SmallTrackCard
									key={item.id}
									track={item}
									playList={trackList}
									showRemoveButton={false}
								/>
							))
						) : (
							<HomeTracks
								tracks={trackList}
								error={tracksError}
							/>
						)}
					</Suspense>
				)}
			</div>
		</div>
	);
};
