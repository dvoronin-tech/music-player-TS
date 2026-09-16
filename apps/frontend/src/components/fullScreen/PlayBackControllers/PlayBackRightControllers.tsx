import { FC } from 'react';
import ContractIcon from '@/assets/icons/contract.svg?react';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import styles from './PlayBackControllers.module.scss';

export const PlayBackRightControllers: FC = () => {
	const dispatch = useAppDispatch();

	const closeFullScreen = () => {
		dispatch(toggleShowFullScreen(false));
		dispatch(setCurrentPlayListOpen(false));
	};

	return (
		<div className={styles.right_controllers}>
			<button
				className={styles.controller_btn}
				onClick={closeFullScreen}
			>
				<ContractIcon className="icon icon-active" />
			</button>
		</div>
	);
};
