import { FC, memo } from 'react';

import styles from './PlaySelection.module.scss';

import { useAppSelector } from '@/hooks/useTypedRedux';

import { LeftElements } from './LeftElements/LeftElements';
import { RightElements } from './RightElements/RightElements';

export interface IKeyInfo {
	keyCode: string;
	shiftKey: boolean;
}

const PlaySelection: FC = () => {
	const trackId = useAppSelector(({ current }) => current.trackId);

	if (!trackId) return null;

	return (
		<div className={styles.play_selection}>
			<LeftElements />
			<RightElements />
		</div>
	);
};

export default memo(PlaySelection);
