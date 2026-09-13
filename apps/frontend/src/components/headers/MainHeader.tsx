import { FC, memo } from 'react';
import HomeIcon from '@/assets/icons/home.svg?react';

import styles from './headers.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowUserData } from '@/store/slices/ui';
import { useGetMeQuery } from '@/api/rtk/user';
import Button from '@/components/buttons/buttons';
import UserImage from '@/components/userImage/UserImage';
import clsx from 'clsx';

const MainHeader: FC = () => {
	const dispatch = useAppDispatch();

	const { data: user } = useGetMeQuery();
	const showUserData = useAppSelector((state) => state.ui.showUserData);

	const username = user?.username ?? '';
	const email = user?.email ?? '';
	const userImg = user?.userImg ?? null;

	const toggleSUD = () => {
		dispatch(toggleShowUserData(true));
	};

	return (
		<header className={styles.main_header}>
			<Button
				to="/home"
				variant="alternative"
				className={styles.header_home}
				aria-label="На главную"
			>
				<HomeIcon />
			</Button>
			<div
				className={clsx(styles.header_account, {
					[styles.show_user_data]: showUserData,
				})}
				onClick={toggleSUD}
			>
				<div className={styles.header_account_info}>
					<span>{username}</span>
					<span>{email}</span>
				</div>
				<div className={styles.account_photo}>
					<UserImage userImg={userImg} />
				</div>
			</div>
		</header>
	);
};

export default memo(MainHeader);
