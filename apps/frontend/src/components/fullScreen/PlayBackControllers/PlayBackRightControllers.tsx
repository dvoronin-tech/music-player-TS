import { FC } from 'react';
import clsx from 'clsx';
import PlaylistIcon from '@/assets/icons/playlist.svg?react';
import ContractIcon from '@/assets/icons/contract.svg?react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { selectPlayerQueue } from '@/store/slices/player';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import styles from './PlayBackControllers.module.scss';

export const PlayBackRightControllers: FC = () => {
	const dispatch = useAppDispatch();
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const showCurrentPlayList = useAppSelector(
		(state) => state.ui.showCurrentPlayList,
	);

	const closeFullScreen = () => {
		dispatch(toggleShowFullScreen(false));
        dispatch(setCurrentPlayListOpen(false));
	};

	const toggleShowCurrentPlayList = () => {
		if (currentPlayList.length > 0) {
			dispatch(setCurrentPlayListOpen(!showCurrentPlayList));
		}
	};

	return (
		<div className={styles.right_controllers}>
			<button
				className={styles.controller_btn}
				onClick={toggleShowCurrentPlayList}
			>
				<PlaylistIcon
					className={clsx('icon', showCurrentPlayList && 'icon-active')}
				/>
			</button>
			<button
				className={styles.controller_btn}
				onClick={closeFullScreen}
			>
				<ContractIcon className="icon icon-active" />
			</button>
		</div>
	);
};
