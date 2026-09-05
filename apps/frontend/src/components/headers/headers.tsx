import { FC } from 'react';

import styles from './headers.module.scss';
import Button from '@/components/buttons/buttons';
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router';
import styled from 'styled-components';
import { HiHome } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import { toggleShowUserData } from '@/store/user/actionsUser';
import { UserIcon } from '@/components/icons and tags/icons';

interface IHeadersProp {
	type: 'simple' | 'main';
	className?: string;
	style?: React.CSSProperties;
}

const GoHomeBtn = styled.button`
	width: 40px;
	height: 40px;
	border-radius: 100px;
	background-color: ${({ theme }) => theme.inputsBg};
	cursor: pointer;

	svg {
		position: relative;
		top: 1px;
		color: ${({ theme }) => theme.textDisable};
	}

	@media (hover: hover) {
		&:hover {
			svg {
				color: ${({ theme }) => theme.text};
			}
			transform: scale(1.02);
		}
	}
`;

const Headers: FC<IHeadersProp> = ({ type, className, style }) => {
	const navigate = useNavigate();
	const router = useRouter();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { username, email, user_img } = useAppSelector(
		(state) => state.user.data,
	);
	const { showUserData } = useAppSelector((state) => state.user);

	const goBack = () => {
		router.history.back();
		if (location.pathname === '/' || location.pathname === '/auth') {
			router.history.forward();
		}
	};

	const goForward = () => {
		router.history.forward();
	};

	const goHome = () => {
		navigate({ to: '/home' });
	};

	const toggleSUD = () => {
		dispatch(toggleShowUserData(true));
	};

	if (type === 'main') {
		return (
			<header style={style} className={`${styles.main_header} ${className ?? ''}`}>
				<nav>
					<Button
						variant="alternative"
						H={40}
						W={40}
						size="3xl"
						weight="regular"
						onClick={goBack}
					>
						{'<'}
					</Button>
					<Button
						variant="alternative"
						H={40}
						W={40}
						size="3xl"
						weight="regular"
						onClick={goForward}
					>
						{'>'}
					</Button>
					<GoHomeBtn onClick={goHome}>
						<HiHome />
					</GoHomeBtn>
				</nav>
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
						{user_img ? (
							<img src={user_img} alt="моё фото" />
						) : (
							<UserIcon />
						)}
					</div>
				</div>
			</header>
		);
	} else {
		return (
			<header style={style} className={`${styles.simple_header} ${className ?? ''}`}>
				<span>BROOKLYN</span>
			</header>
		);
	}
};

export default Headers;
