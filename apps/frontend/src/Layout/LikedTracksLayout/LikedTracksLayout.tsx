import {
	ChangeEvent,
	FC,
	Suspense,
	lazy,
	useCallback,
	useEffect,
	useState,
} from 'react';
import clsx from 'clsx';
import styles from './LikedTracksLayout.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { useGetLikedTracksQuery } from '@/api/rtk/liked';
import { Input } from '@/components/inputFields/inputFields';
import Button from '@/components/buttons/buttons';
import type { ApiTrack } from '@music-player/backend';
import { selectCurrentTrack } from '@/store/slices/player';
import { humanizeTrackCount } from '@/utils/humanizeTrackCount';
import { useIsMobileLayout } from '@/hooks/useIsMobileLayout';

const LikedTracksGrid = lazy(() =>
	import('@/components/likedTracks/LikedTracksGrid').then((module) => ({
		default: module.LikedTracksGrid,
	})),
);

const LikedTracksLayout: FC = () => {
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const [dataArr, setDataArr] = useState<ApiTrack[]>([]);
	const [searchStr, setSearchStr] = useState('');
	const isMobile = useIsMobileLayout();

	const [isPopular, setIsPopular] = useState(false);

	useEffect(() => {
		if (likedTrackList.length !== 0) {
			if (isPopular) {
				const oldArr = [...likedTrackList];
				const sortedArr = oldArr.sort(
					(a, b) => b.auditions - a.auditions,
				);
				setDataArr(sortedArr);
			} else {
				setDataArr(likedTrackList);
			}
		}
	}, [isPopular, likedTrackList]);

	const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchStr(e.target.value);
	}, []);

	return (
		<div
			className={styles.liked_tracks}
			style={{ paddingBottom: currentTrack ? '40px' : 0 }}
		>
			<div className={styles.background}>
				<div className={styles.video_wrapper}>
					<video
						autoPlay
						loop
						muted
						playsInline
						src="/video/liked-video.webm"
					/>
				</div>
				<div className={styles.liked_title_wrapper}>
					<span className={styles.liked_title}>Любимые треки</span>
					<div className={styles.liked_meta}>
						<span className={styles.liked_brooklyn}>BROOKLYN</span>
						<span>
							{humanizeTrackCount(likedTrackList.length, 'ru')}
						</span>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.action_row}>
					<Input
						onChange={onSearch}
						type="text"
						placeholder="Поиск"
						className={styles.search}
					/>
					<div className={styles.liked_btns_wrapper}>
						<Button
							onClick={() => setIsPopular(false)}
							variant={isPopular ? 'simple' : 'accent'}
							size="l"
							weight="semibold"
						>
							Новые
						</Button>
						<Button
							onClick={() => setIsPopular(true)}
							variant={isPopular ? 'accent' : 'simple'}
							size="l"
							weight="semibold"
						>
							Популярные
						</Button>
					</div>
				</div>
				<div
					className={clsx(
						styles.grid_container,
						likedTrackList.length === 0
							? styles.grid_block
							: styles.grid_grid,
					)}
				>
					{!isMobile && (
						<Suspense fallback={null}>
							<LikedTracksGrid
								tracks={dataArr}
								searchStr={searchStr}
								hasLikedTracks={likedTrackList.length !== 0}
							/>
						</Suspense>
					)}
				</div>
			</div>
		</div>
	);
};

export default LikedTracksLayout;
