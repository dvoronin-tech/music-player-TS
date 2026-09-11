import { ChangeEvent, FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './likedPage.module.scss';
import { useAppSelector } from '@/hooks/useTypedRedux';
import { useGetLikedTracksQuery } from '@/api/rtk/liked';
import { Input } from '@/components/inputFields/inputFields';
import Button from '@/components/buttons/buttons';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import type { ApiTrack } from '@music-player/backend';
import { selectCurrentTrack } from '@/store/slices/player';

const LikedPage: FC = () => {
	const { data: likedTrackList = [] } = useGetLikedTracksQuery();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const [dataArr, setDataArr] = useState<ApiTrack[]>([]);
	const [searchStr, setSearchStr] = useState('');

	const [isPopular, setIsPopular] = useState(false);

	const renderLikedTrackList = () => {
		if (likedTrackList.length !== 0) {
			if (searchStr) {
				const subDataArr = dataArr.filter((item) =>
					item.title.toLowerCase().includes(searchStr.toLowerCase()),
				);
				return subDataArr.map((item) => {
					return (
						<HomeTrackCard
							key={item.id}
							track={item}
							playList={dataArr}
						/>
					);
				});
			} else {
				return dataArr.map((item) => {
					return (
						<HomeTrackCard
							key={item.id}
							track={item}
							playList={dataArr}
						/>
					);
				});
			}
		} else {
			return (
				<div className={styles.no_data_div}>
					<span>Вы не добавили ни одного трека</span>
				</div>
			);
		}
	};

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

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchStr(e.target.value);
	};

	return (
		<div
			className={styles.liked_page}
			style={{ paddingBottom: currentTrack ? '40px' : 0 }}
		>
			<div className={styles.background}>
				<div className={styles.video_wrapper}>
					<video
						autoPlay
						loop
						muted
						src="/video/liked-video.webm"
					/>
				</div>
				<div className={styles.liked_title_wrapper}>
					<span className={styles.liked_title}>Любимые треки</span>
					<div>
						<span className={styles.liked_brooklyn}>BROOKLYN</span>
						<span>{likedTrackList.length} треков</span>
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
							С начала новые
						</Button>
						<Button
							onClick={() => setIsPopular(true)}
							variant={isPopular ? 'accent' : 'simple'}
							size="l"
							weight="semibold"
						>
							С начала популярные
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
					{renderLikedTrackList()}
				</div>
			</div>
		</div>
	);
};

export default LikedPage;
