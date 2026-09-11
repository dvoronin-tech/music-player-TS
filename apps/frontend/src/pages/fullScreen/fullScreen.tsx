import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './fullScreen.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
} from '@/api/rtk/liked';
import { formatArtistNames } from '@/utils/formatArtists';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import Button from '@/components/buttons/buttons';
import {
	CurrentPlayList,
	Like,
	PlayOrPause,
	Random,
	Repeat,
	Rewind,
	FullScreen as FullScreenIcon,
} from '@/components/icons and tags/icons';
import {
	nextTrack as nextTrackAction,
	previousTrack as previousTrackAction,
	seekTo,
	selectCurrentTrack,
	selectPlayerQueue,
	selectPlayQueue,
	togglePlayback,
	toggleShuffle,
	toggleRepeat,
} from '@/store/slices/player';
import { humanizingNumbers } from '@/utils/humanizingNumbers';
import { addNotification } from '@/store/slices/notification';
import { v4 as randomId } from 'uuid';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';

const FullScreen: FC = () => {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const playQueue = useAppSelector(selectPlayQueue);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);
	const {
		status,
		shuffleEnabled: isRandom,
		repeatEnabled: isRepeat,
		currentTime,
		duration,
	} = useAppSelector((state) => state.player);
	const isPlay = status === 'playing';
	const pending = status === 'loading';
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const [toggleLikedTrack] = useToggleLikedTrackMutation();

	const [spanTranslateValue, setSpanTranslateValue] = useState(0);
	const [isSpanHovered, setIsSpanHovered] = useState(false);
	const [CPLTranslateValue, setCPLTranslateValue] = useState(0);
	const [isCPLLong, setIsCPLLong] = useState(false);
	const [isPBHovered, setIsPBHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const currentWidth = duration ? (currentTime * 100) / duration : 0;

	const infoDiv = useRef<HTMLDivElement | null>(null);
	const trackTitleSpan = useRef<HTMLSpanElement | null>(null);
	const CPLSelectionRef = useRef<HTMLDivElement | null>(null);
	const CPLLineRef = useRef<HTMLDivElement | null>(null);

	const closeFullScreen = () => {
		dispatch(toggleShowFullScreen(false));
	};

	const renderCurrentPlayList = () => {
		return playQueue.map((item) => (
			<HomeTrackCard
				key={item.id}
				renderedInFullScreen
				playList={currentPlayList}
				track={item}
			/>
		));
	};

	useEffect(() => {
		const likedTrack = likedTrackList.find(
			(track) => track.id === currentTrack?.id,
		);
		if (likedTrack) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [likedTrackList, currentTrack?.id]);

	useEffect(() => {
		if (infoDiv.current && trackTitleSpan.current) {
			const wrapper = infoDiv.current;
			const span = trackTitleSpan.current;

			if (wrapper.clientWidth < span.clientWidth && isSpanHovered) {
				setSpanTranslateValue(wrapper.clientWidth - span.clientWidth);
			} else {
				setSpanTranslateValue(0);
			}
		}
	}, [isSpanHovered]);

	useEffect(() => {
		if (CPLSelectionRef.current && CPLLineRef.current) {
			const selection = CPLSelectionRef.current;
			const line = CPLLineRef.current;
			if (selection.clientWidth < line.clientWidth - CPLTranslateValue) {
				setIsCPLLong(true);
			} else {
				setIsCPLLong(false);
			}
		}
	}, [
		CPLSelectionRef.current?.clientWidth,
		CPLLineRef.current?.clientWidth,
		CPLTranslateValue,
	]);

	useEffect(() => {
		if (currentTrack) {
			const trackIndex = playQueue.findIndex(
				(item) => item.id === currentTrack.id,
			);
			if (trackIndex !== 0) {
				setCPLTranslateValue(260 * (trackIndex - 1));
			} else {
				setCPLTranslateValue(260 * trackIndex);
			}
		}
	}, [currentTrack, playQueue]);

	const CPLTranslateToNext = () => {
		setCPLTranslateValue((prevState) => {
			if (CPLSelectionRef.current) {
				const newValue = prevState + 260 * 2;
				if (CPLLineRef.current) {
					console.log(CPLLineRef.current.clientWidth);
					console.log(newValue);
					if (
						newValue >=
						CPLLineRef.current.clientWidth -
							CPLSelectionRef.current.clientWidth
					) {
						return (
							CPLLineRef.current.clientWidth -
							CPLSelectionRef.current.clientWidth +
							10
						);
					}
				}
				return newValue;
			} else {
				return prevState;
			}
		});
	};

	const CPLTranslateToPrev = () => {
		setCPLTranslateValue((prevState) => {
			const newValue = prevState - 260 * 2;
			if (newValue <= 0) {
				return 0;
			}
			return newValue;
		});
	};

	const toggleIsLiked = () => {
		if (currentTrack) {
			toggleLikedTrack({ id: currentTrack.id, isLiked });
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: currentTrack.albumImg,
					info: `${currentTrack.title} - ${formatArtistNames(currentTrack.artists)}`,
					additionalInfo: isLiked
						? 'Трек удалён из <span>избранного</span>'
						: 'Трек добавлен в <span>избранное</span>',
				}),
			);
		}
	};

	const toggleIsPlay = () => {
		if (currentTrack) {
			dispatch(togglePlayback());
		}
	};

	const toggleShowCurrentPlayList = () => {
		if (currentPlayList.length > 0) {
			dispatch(setCurrentPlayListOpen(!showCurrentPlayList));
		}
	};

	const toggleIsRepeat = () => {
		dispatch(toggleRepeat());
	};

	const toggleIsRandom = () => {
		if (currentTrack) {
			dispatch(toggleShuffle());
		}
	};

	const prevTrack = () => {
		dispatch(previousTrackAction());
	};

	const nextTrack = () => {
		dispatch(nextTrackAction());
	};

	const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		const offsetX = e.nativeEvent.offsetX;
		const clientWidth = e.currentTarget.clientWidth;
		if (clientWidth && duration) {
			const maxOffsetX = clientWidth - 1;
			const newTime =
				((offsetX > maxOffsetX ? maxOffsetX : offsetX) / clientWidth) *
				duration;
			dispatch(seekTo(newTime));
		}
	};

	return (
		<>
			{currentTrack && currentPlayList && (
				<div className={styles.background}>
					<img
						className={styles.background_img}
						src={currentTrack.albumImg}
						alt=""
						draggable={false}
					/>
					<div className={styles.fullscreen_top_elements}>
						<img
							className={clsx(
								styles.track_img,
								showCurrentPlayList
									? styles.track_img_large
									: styles.track_img_small,
							)}
							src={currentTrack.albumImg}
							alt="фото альбома"
						/>
						<div className={styles.fullscreen_info}>
							<div
								className={clsx(
									styles.cpl_selection,
									{
										[styles.cpl_visible]: showCurrentPlayList,
									},
									{
										[styles.cpl_gradient_end_visible]:
											isCPLLong,
									},
									{
										[styles.cpl_gradient_start_visible]:
											!!CPLTranslateValue,
									},
								)}
								ref={CPLSelectionRef}
							>
								<Button
									variant="alternative"
									className={clsx(
										styles.fullscreen_prev_button,
										{
											[styles.fullscreen_nav_visible]:
												!!CPLTranslateValue,
										},
									)}
									size="3xl"
									onClick={CPLTranslateToPrev}
								>
									{'<'}
								</Button>

								<div
									className={styles.cpl_line}
									style={{
										transform: `translate(-${CPLTranslateValue}px)`,
									}}
									ref={CPLLineRef}
								>
									{renderCurrentPlayList()}
								</div>

								<Button
									variant="alternative"
									className={clsx(
										styles.fullscreen_next_button,
										{
											[styles.fullscreen_nav_visible]:
												isCPLLong,
										},
									)}
									size="3xl"
									onClick={CPLTranslateToNext}
								>
									{'>'}
								</Button>
							</div>
							<div
								ref={infoDiv}
								className={styles.fullscreen_track_info}
							>
								<span
									className={styles.track_title}
									style={{ left: spanTranslateValue }}
									onMouseEnter={() => setIsSpanHovered(true)}
									onMouseLeave={() => setIsSpanHovered(false)}
									ref={trackTitleSpan}
								>
									{currentTrack.title}
								</span>
								<span className={styles.fullscreen_artist}>
									{formatArtistNames(currentTrack.artists)}
								</span>
							</div>
						</div>
					</div>
					<div className={styles.fullscreen_bottom_elements}>
						<div className={styles.fullscreen_controls}>
							<div>
								<button onClick={toggleIsLiked}>
									<Like
										type={isLiked ? 'active' : 'idle'}
										scale={40}
									/>
								</button>
							</div>
							<div style={{ height: 70 }}>
								<button onClick={toggleIsRandom}>
									<Random
										type={isRandom ? 'active' : 'idle'}
										scale={30}
									/>
								</button>
								<button onClick={prevTrack}>
									<Rewind scale={40} />
								</button>
								{pending ? (
									<div
										style={{
											marginRight: 40,
											width: 50,
											height: 50,
										}}
										className="loader"
									></div>
								) : (
									<button
										style={{ height: 70 }}
										className={styles.fullscreen_play_btn}
										onClick={toggleIsPlay}
									>
										<PlayOrPause
											type={isPlay ? 'active' : 'idle'}
											style={{ left: isPlay ? 0 : 2 }}
											className={styles.play_or_pause_icon}
											scale={30}
										/>
									</button>
								)}
								<button onClick={nextTrack}>
									<Rewind
										style={{ transform: 'rotate(180deg)' }}
										scale={40}
									/>
								</button>
								<button onClick={toggleIsRepeat}>
									<Repeat
										type={isRepeat ? 'active' : 'idle'}
										scale={30}
									/>
								</button>
							</div>
							<div>
								<button onClick={toggleShowCurrentPlayList}>
									<CurrentPlayList
										type={
											showCurrentPlayList
												? 'active'
												: 'idle'
										}
										scale={35}
									/>
								</button>
								<button onClick={closeFullScreen}>
									<FullScreenIcon type="active" scale={35} />
								</button>
							</div>
						</div>
						<div className={styles.fullscreen_progress_controls}>
							<div className={styles.time_wrapper}>
								<span>{humanizingNumbers(currentTime)}</span>
								<span>{humanizingNumbers(duration)}</span>
							</div>
							<div
								className={styles.progress_bar_wrapper}
								onMouseEnter={() => setIsPBHovered(true)}
								onMouseLeave={() => setIsPBHovered(false)}
								onClick={setCurrentTime}
							>
								<div
									className={clsx(
										styles.progress_bar,
										isPBHovered
											? styles.progress_bar_hovered
											: styles.progress_bar_idle,
									)}
									style={{ width: `${currentWidth}%` }}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FullScreen;
