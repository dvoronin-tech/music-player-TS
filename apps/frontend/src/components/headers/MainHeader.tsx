import { FC, memo } from 'react';
import { FaHome } from 'react-icons/fa';

import styles from './headers.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowUserData } from '@/store/slices/ui';
import { useGetMeQuery } from '@/api/rtk/user';
import Button from '@/components/buttons/buttons';
import UserImage from '@/components/userImage/UserImage';

const MainHeader: FC = () => {
	const dispatch = useAppDispatch();

	const { data: user } = useGetMeQuery();
	const { showUserData } = useAppSelector((state) => state.ui);

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
				<FaHome />
			</Button>
			<div
				style={{ opacity: showUserData ? 0 : 1 }}
				className={styles.header_account}
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
