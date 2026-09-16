import { FC, memo } from 'react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';
import { useGetMeQuery } from '@/api/rtk/user';
import UserImage from '@/components/userImage/UserImage';
import styles from './MobileNavPanel.module.scss';
import { clsx } from 'clsx';
import { Link, useLocation } from '@tanstack/react-router';

const MobileNavPanel: FC = () => {
	const { data: user } = useGetMeQuery();

	const { pathname } = useLocation();

	const activeLiked = pathname === '/home/liked';
	const activeHome = pathname === '/home';

	return (
		<nav
			className={styles.mobile_nav_panel}
			aria-label="Мобильная навигация"
		>
			<button
				type="button"
				className={clsx(styles.nav_item, styles.account)}
				aria-label="Аккаунт"
				disabled
			>
				<UserImage userImg={user?.userImg ?? null} />
			</button>
			<Link
				to="/home"
				className={clsx(styles.nav_item, {
					[styles.active]: activeHome,
				})}
				aria-label="Главная"
			>
				<HomeIcon />
			</Link>
			<Link
				to="/home/liked"
				className={clsx(styles.nav_item, {
					[styles.active]: activeLiked,
				})}
				aria-label="Любимые треки"
			>
				<HeartIcon />
			</Link>
		</nav>
	);
};

export default memo(MobileNavPanel);
