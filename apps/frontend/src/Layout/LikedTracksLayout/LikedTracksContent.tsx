import {
	ChangeEvent,
	FC,
	Suspense,
	lazy,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import clsx from 'clsx';
import styles from './LikedTracksLayout.module.scss';
import { Input } from '@/components/inputFields/inputFields';
import Button from '@/components/buttons/buttons';
import type { ApiTrack } from '@music-player/backend';
import { useLayout } from '@/hooks/useLayout';

const LikedTracksGrid = lazy(() =>
	import('@/components/likedTracks/LikedTracksGrid').then((module) => ({
		default: module.LikedTracksGrid,
	})),
);

const SmallTrackCard = lazy(
	() => import('@/components/smallTrackCard/smallTrackCard'),
);

interface LikedTracksContentProps {
	tracks: ApiTrack[];
}

export const LikedTracksContent: FC<LikedTracksContentProps> = ({ tracks }) => {
	const [dataArr, setDataArr] = useState<ApiTrack[]>([]);
	const [searchStr, setSearchStr] = useState('');
	const [isPopular, setIsPopular] = useState(false);
	const isMobile = useLayout() === 'mobile';

	const sortedByPopular = useMemo(
		() => [...tracks].sort((a, b) => b.auditions - a.auditions),
		[tracks],
	);

	useEffect(() => {
		if (tracks.length > 0) {
			setDataArr(isPopular ? sortedByPopular : tracks);
		}
	}, [tracks, isPopular, sortedByPopular]);

	const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchStr(e.target.value);
	}, []);

	const gridContainerClass =
		tracks.length === 0
			? styles.grid_block
			: isMobile
				? styles.list_stack
				: styles.grid_grid;

	return (
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
			<div className={clsx(styles.grid_container, gridContainerClass)}>
				<Suspense fallback={null}>
					<LikedTracksList
						isMobile={isMobile}
						tracks={dataArr}
						searchStr={searchStr}
						hasLikedTracks={tracks.length !== 0}
					/>
				</Suspense>
			</div>
		</div>
	);
};

interface LikedTracksListProps {
	isMobile: boolean;
	tracks: ApiTrack[];
	searchStr: string;
	hasLikedTracks: boolean;
}

const LikedTracksList: FC<LikedTracksListProps> = memo(
	({ isMobile, tracks, searchStr, hasLikedTracks }) => {
		const mobileTracks = useMemo(() => {
			if (!searchStr) {
				return tracks;
			}

			return tracks.filter((item) =>
				item.title.toLowerCase().includes(searchStr.toLowerCase()),
			);
		}, [tracks, searchStr]);

		if (!hasLikedTracks) {
			return (
				<div className={styles.no_data_div}>
					<span>Вы не добавили ни одного трека</span>
				</div>
			);
		}

		if (isMobile) {
			return mobileTracks.map((item) => (
				<SmallTrackCard
					key={item.id}
					track={item}
					playList={tracks}
					showRemoveButton={false}
				/>
			));
		}

		return <LikedTracksGrid tracks={tracks} searchStr={searchStr} />;
	},
);
