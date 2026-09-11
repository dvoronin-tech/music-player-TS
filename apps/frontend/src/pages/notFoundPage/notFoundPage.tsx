import { FC } from 'react';
import styles from './notFoundPage.module.scss';
import Button from '@/components/buttons/buttons';
import { useNavigate } from '@tanstack/react-router';

const NotFoundPage: FC = () => {
	const navigate = useNavigate();

	return (
		<main className={styles.main}>
			<span className={styles.info}>Страница не найдена</span>
			<div className={styles.buttons_wrapper}>
				<Button
					variant="accent"
					size="xl"
					weight="semibold"
					onClick={() => navigate({ to: '/home' })}
				>
					Перейти на главную
				</Button>
			</div>
		</main>
	);
};

export default NotFoundPage;
