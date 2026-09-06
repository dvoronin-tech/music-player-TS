import { FC } from 'react';

import styles from './headers.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowUserData } from '@/store/slices/ui';
import { useGetMeQuery } from '@/api/rtk/user';
import { UserIcon } from '@/components/icons and tags/icons';

interface IHeadersProp {
	type: 'simple' | 'main';
	className?: string;
	style?: React.CSSProperties;
}

const Headers: FC<IHeadersProp> = ({ type, className, style }) => {
	const dispatch = useAppDispatch();

	const { data: user } = useGetMeQuery();
	const { showUserData } = useAppSelector((state) => state.ui);

	const username = user?.username ?? '';
	const email = user?.email ?? '';
	const userImg = user?.userImg ?? null;

	const toggleSUD = () => {
		dispatch(toggleShowUserData(true));
	};

	if (type === 'main') {
		return (
			<header
				style={style}
				className={`${styles.main_header} ${className ?? ''}`}
			>
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
						{userImg ? (
							<img src={userImg} alt="моё фото" />
						) : (
							<UserIcon />
						)}
					</div>
				</div>
			</header>
		);
	} else {
		return (
			<header
				style={style}
				className={`${styles.simple_header} ${className ?? ''}`}
			>
				<span>BROOKLYN</span>
			</header>
		);
	}
};

export default Headers;
