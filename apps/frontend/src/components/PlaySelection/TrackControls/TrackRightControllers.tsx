import { FC } from 'react';
import clsx from 'clsx';
import PlaylistIcon from '@/assets/icons/playlist.svg?react';
import ExpandIcon from '@/assets/icons/expand.svg?react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { selectPlayerQueue } from '@/store/slices/player';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import styles from './TrackControls.module.scss';

export const TrackRightControllers: FC = () => {
	const dispatch = useAppDispatch();
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);

	const toggleShowCurrentPlayList = () => {
		if (currentPlayList.length > 0) {
			dispatch(setCurrentPlayListOpen(!showCurrentPlayList));
		}
	};

	return (
		<div className={styles.right_controls}>
			<button
				className={styles.current_play_list_control}
				onClick={toggleShowCurrentPlayList}
			>
				<PlaylistIcon
					className={clsx(
						'icon',
						showCurrentPlayList && 'icon-active',
					)}
				/>
			</button>
			<button
				onClick={() => dispatch(toggleShowFullScreen(true))}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ExpandIcon
					className="icon"
					style={{
						width: 'calc(20px - 35%)',
						height: 'calc(20px - 35%)',
					}}
				/>
			</button>
		</div>
	);
};
