import { FC } from 'react';
import styles from './MainLayout.module.scss';
import { HomeCardsSection } from './HomeCards/HomeCardsSection';
import { SomethingNew } from './SomethingNew/SomethingNew';
import { HomeArtistsLine } from './HomeArtistsLine/HomeArtistsLine';

const MainLayout: FC = () => {
	return (
		<main className={styles.main}>
			<HomeCardsSection />
			<HomeArtistsLine />
			<SomethingNew />
		</main>
	);
};

export default MainLayout;
