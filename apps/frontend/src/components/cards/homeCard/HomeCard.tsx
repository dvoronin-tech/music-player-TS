import { FC, memo } from 'react';

import styles from './HomeCard.module.scss';
import Button from '@/components/buttons/buttons';
import { PlayOrPause } from '@/components/icons and tags/icons';
import { FaPlay } from 'react-icons/fa';

interface IProp  {
	img: string;
	category: string;
	content: string;
	additionalContent: string;
	onClick?: any;
	style?: React.CSSProperties;
}

export const HomeCard: FC<IProp> = memo(
	({ style, img, category, content, onClick, additionalContent }) => {
		return (
			<div
				className={styles.home_card}
				style={style}
				onClick={onClick}
			>
				<div className={styles.home_card_wrapper}>
					<div className={styles.home_card_info}>
						<div className={styles.home_card_info_data}>
							<span className={styles.home_card_category}>
								{category}
							</span>
							<span className={styles.home_card_content}>
								{content}
							</span>
						</div>
						<span className={styles.home_card_additional}>
							{additionalContent}
						</span>
					</div>
					<Button variant="alternative" onClick={onClick} className={styles.home_card_button}>
						<FaPlay />
					</Button>
				</div>
				<img
					className={styles.home_card_image}
					src={img}
					alt=""
					draggable={false}
				/>
			</div>
		);
	},
);
