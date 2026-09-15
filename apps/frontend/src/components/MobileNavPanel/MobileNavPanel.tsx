import { FC, memo } from 'react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';
import { useGetMeQuery } from '@/api/rtk/user';
import UserImage from '@/components/userImage/UserImage';
import styles from './MobileNavPanel.module.scss';

const MobileNavPanel: FC = () => {
	const { data: user } = useGetMeQuery();

	return (
		<nav className={styles.mobile_nav_panel} aria-label="Мобильная навигация">
			<button
				type="button"
				className={`${styles.nav_item} ${styles.account}`}
				aria-label="Аккаунт"
				disabled
			>
				<UserImage userImg={user?.userImg ?? null} />
			</button>
			<button
				type="button"
				className={styles.nav_item}
				aria-label="Главная"
				disabled
			>
				<HomeIcon />
			</button>
			<button
				type="button"
				className={styles.nav_item}
				aria-label="Любимые треки"
				disabled
			>
				<HeartIcon />
			</button>
		</nav>
	);
};

export default memo(MobileNavPanel);
