import { FC } from 'react';
import styles from './authAfterReg.module.scss';
import Button from '@/components/buttons/buttons';
import { logout } from '@/utils/auth';

const AuthAfterReg: FC = () => {
	const logOut = async () => {
		await logout();
		window.location.reload();
	};

	return (
		<main className={styles.main}>
			<span className={styles.info}>Вы уже вошли в систему</span>
			<div className={styles.buttons_wrapper}>
				<Button
					variant="accent"
					className={styles.logout_btn}
					size="xl"
					weight="bold"
					onClick={logOut}
				>
					Выйти из аккаунта
				</Button>
				<Button
					variant="accent"
					size="xl"
					weight="bold"
					to="/home"
				>
					Вернуться на главную
				</Button>
			</div>
		</main>
	);
};

export default AuthAfterReg;
