import { FC } from 'react';
import clsx from 'clsx';
import styles from './artistCards.module.scss';
import { useNavigate } from '@tanstack/react-router';

interface IProp {
	img: string;
	name: string;
	type?: 'small' | 'big';
	id: number;
}

export const ArtistCard: FC<IProp> = ({
	img,
	name,
	type = 'big',
	id,
}) => {
	const navigate = useNavigate();

	const selectArtist = () => {
		navigate({ to: '/artist/$artistId', params: { artistId: String(id) } });
	};

	return (
		<div
			className={clsx(
				styles.artist_home_card,
				type === 'big' ? styles.type_big : styles.type_small,
			)}
			onClick={selectArtist}
		>
			<div className={styles.artist_img}>
				<img src={img} alt={name} draggable={false} />
			</div>
			<span className={styles.artist_name}>{name}</span>
		</div>
	);
};
