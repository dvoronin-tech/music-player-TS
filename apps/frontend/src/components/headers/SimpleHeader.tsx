import { FC, memo } from 'react';

import styles from './headers.module.scss';

const SimpleHeader: FC = () => {
	return (
		<header className={styles.simple_header}>
			<span>BROOKLYN</span>
		</header>
	);
};

export default memo(SimpleHeader);
