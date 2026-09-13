import { FC } from 'react';
import styles from './MainLayout.module.scss';
import { HomeCards } from './HomeCards/HomeCards';
import { SomethingNew } from './SomethingNew/SomethingNew';
import { HomeArtistsLine } from './HomeArtistsLine/HomeArtistsLine';

const MainLayout: FC = () => {
	return (
		<main className={styles.main}>
			<HomeCards />
			<HomeArtistsLine />
			<SomethingNew />
		</main>
	);
};

export default MainLayout;
