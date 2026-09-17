import {
	FC,
	useCallback,
	useEffect,
	useRef,
	useState,
	type AnimationEvent,
} from 'react';
import clsx from 'clsx';
import styles from './asideBar.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useGetLikedArtistsQuery,
} from '@/api/rtk/liked';
import Button from '@/components/buttons/buttons';
import { AsideLikedTracks } from './AsideLikedTracks';
import { AsideLikedArtists } from './AsideLikedArtists';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { selectCurrentTrack, selectPlayerQueue } from '@/store/slices/player';
import { setAsideBarOpen } from '@/store/slices/ui';

const canHover = () => window.matchMedia('(hover: hover)').matches;

const AsideBar: FC = () => {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const showAsideBar = useAppSelector((state) => state.ui.showAsideBar);
	const { data: likedTrackList = [], isLoading: tracksLoading } =
		useGetLikedTracksQuery();
	const { data: likedArtists = [], isLoading: artistsLoading } =
		useGetLikedArtistsQuery();

	const asideRef = useRef<HTMLElement>(null);
	const [showPlayList, setShowPlayList] = useState(false);
	const [isPopular, setIsPopular] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [shouldRenderBlur, setShouldRenderBlur] = useState(false);
	const isOpen = isHovered || showAsideBar;

	const closeAsideBar = useCallback(() => {
		if (showAsideBar) {
			dispatch(setAsideBarOpen(false));
		}
	}, [dispatch, showAsideBar]);

	useOutsideClick(asideRef, closeAsideBar);

	useEffect(() => {
		if (currentTrack && currentPlayList.length > 0) {
			setShowPlayList(true);
		} else {
			setShowPlayList(false);
		}
	}, [currentPlayList.length, currentTrack]);

	if (isOpen && !shouldRenderBlur) {
		setShouldRenderBlur(true);
	}

	const handleBlurAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
		if (isOpen || !event.animationName.includes('aside-blur-fade-out')) {
			return;
		}

		setShouldRenderBlur(false);
	};

	return (
		<>
			<aside
				ref={asideRef}
				className={clsx(
					styles.aside_bar,
					showPlayList && styles.with_playlist,
					isOpen && styles.aside_bar_show,
				)}
				onMouseEnter={() => {
					if (canHover()) setIsHovered(true);
				}}
				onMouseLeave={() => {
					if (canHover()) setIsHovered(false);
				}}
			>
				<div className={styles.flex_row}>
					<span>Любимые треки</span>
					<Button to="/home/liked" variant="alternative" size="s">
						Посмотреть всё
					</Button>
				</div>
				<div className={styles.aside_liked_track_list}>
					<AsideLikedTracks
						tracks={likedTrackList}
						isLoading={tracksLoading}
					/>
				</div>
				<div className={styles.flex_row}>
					<span>Любимые артисты</span>
					<Button
						variant={isPopular ? 'accent' : 'alternative'}
						onClick={() => setIsPopular(!isPopular)}
						size="s"
						weight={isPopular ? 'medium' : 'regular'}
						style={{ borderRadius: 100 }}
					>
						Сначала популярные
					</Button>
				</div>
				<div className={styles.aside_artist_list}>
					<div
						className={clsx(
							styles.artists_grid,
							likedArtists.length === 0
								? styles.artists_grid_flex
								: styles.artists_grid_grid,
						)}
					>
						<AsideLikedArtists
							artists={likedArtists}
							isLoading={artistsLoading}
							isPopular={isPopular}
						/>
					</div>
				</div>
			</aside>
			{shouldRenderBlur && (
				<div
					className={clsx(styles.blur_bg, !isOpen && styles.fadeOut)}
					onAnimationEnd={handleBlurAnimationEnd}
				/>
			)}
		</>
	);
};

export default AsideBar;
