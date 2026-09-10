import { FC } from 'react';
import clsx from 'clsx';
import styles from './CPLSelection.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import SmallTrackCard from '@/components/smallTrackCard/smallTrackCard';
import { setCurrentPlayListOpen } from '@/store/slices/ui';
import { selectPlayerQueue, selectPlayQueue } from '@/store/slices/player';

const CPLSelection: FC = () => {
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const playQueue = useAppSelector(selectPlayQueue);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);
	const dispatch = useAppDispatch();

	const setDefaultShowCPL = () => {
		dispatch(setCurrentPlayListOpen(false));
	};

	return (
		<>
			<aside
				className={clsx(
					styles.cpl_selection,
					showCurrentPlayList
						? styles.cpl_visible
						: styles.cpl_hidden,
				)}
			>
				<span className={styles.title_span}>Текущий плейлист</span>
				<div className={styles.track_list_wrapper}>
					{playQueue.map((item) => (
						<SmallTrackCard
							key={item.id}
							track={item}
							playList={currentPlayList}
						/>
					))}
				</div>
			</aside>
			<div
				className={clsx(
					styles.blur_bg,
					showCurrentPlayList
						? styles.blur_visible
						: styles.blur_hidden,
				)}
				onClick={setDefaultShowCPL}
			></div>
		</>
	);
};

export default CPLSelection;
