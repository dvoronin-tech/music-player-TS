import { FC, memo } from 'react';

import styles from './HomeCard.module.scss';
import { HomeCard, HomeCardProps } from './HomeCard';

interface HomeCardsSectionProps {
	cards: HomeCardProps[];
}

export const HomeCards: FC<HomeCardsSectionProps> = memo(({ cards }) => {
	return (
		<div className={styles.home_cards_wrapper}>
			{cards.map((card) => (
				<HomeCard key={card.img} {...card} />
			))}
		</div>
	);
});
