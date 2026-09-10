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

	const cutLongString = (string: string): string => {
		if (string.length > 12 && type === 'small') {
			return string.substring(0, 10) + '...';
		}
		return string;
	};

	return (
		<div
			className={clsx(
				styles.artist_home_card,
				type === 'big' ? styles.type_big : styles.type_small,
			)}
			onClick={selectArtist}
		>
			<div
				className={clsx(
					styles.artist_img,
					type === 'big' ? styles.img_big : styles.img_small,
				)}
				style={{ backgroundImage: `url(${img})` }}
			></div>
			<span
				className={clsx(
					styles.artist_name,
					type === 'big' ? styles.name_big : styles.name_small,
				)}
			>
				{cutLongString(name)}
			</span>
		</div>
	);
};
