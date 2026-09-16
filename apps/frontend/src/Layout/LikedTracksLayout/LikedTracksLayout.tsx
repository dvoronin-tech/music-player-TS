import { FC, memo } from 'react';
import styles from './LikedTracksLayout.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { useGetLikedTracksQuery } from '@/api/rtk/liked';
import { selectCurrentTrack } from '@/store/slices/player';
import { LikedTracksHeader } from './LikedTracksHeader';
import { LikedTracksContent } from './LikedTracksContent';

const LikedTracksLayout: FC = () => {
    const currentTrackId = useAppSelector(s => s.player.currentTrackId);
	const { data: likedTrackList = [], isFetching } = useGetLikedTracksQuery();

	return (
		<div
			className={styles.liked_tracks}
			style={{ paddingBottom: currentTrackId ? '40px' : 0 }}
		>
			<LikedTracksHeader trackCount={likedTrackList.length} />
			<LikedTracksContent tracks={likedTrackList} />
		</div>
	);
};

export default memo(LikedTracksLayout);
