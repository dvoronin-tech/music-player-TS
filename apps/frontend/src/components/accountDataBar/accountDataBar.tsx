import {
	type AnimationEvent,
	type TransitionEvent,
	type FC,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import CloseIcon from '@/assets/icons/close.svg?react';
import { toggleShowUserData } from '@/store/slices/ui';
import { useGetMeQuery } from '@/api/rtk/user';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import styles from './accountDataBar.module.scss';
import AccountView from './AccountView';
import ChangePhotoForm from './ChangePhotoForm';

const AccountDataBar: FC = () => {
	const dispatch = useAppDispatch();
	const { showUserData } = useAppSelector((state) => state.ui);
	const { data: user } = useGetMeQuery();

	const username = user?.username ?? '';
	const email = user?.email ?? '';
	const userImg = user?.userImg ?? null;
	const regDate = user?.regDate ? new Date(user.regDate) : new Date();

	const [changePhoto, setChangePhoto] = useState(false);
	const [shouldRenderBlur, setShouldRenderBlur] = useState(showUserData);

	const accountBarRef = useRef<HTMLDivElement>(null);

	const handleCloseAccountBar = () => {
		dispatch(toggleShowUserData(false));
	};

	useOutsideClick(accountBarRef, handleCloseAccountBar);

	if (showUserData && !shouldRenderBlur) {
		setShouldRenderBlur(true);
	}

	const handleTransitionEnd = (e: TransitionEvent) => {
		if (!showUserData) {
			if (e.target === accountBarRef.current) {
				setChangePhoto(false);
			}
		}
	};

	const handleBlurAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
		if (
			showUserData ||
			!event.animationName.includes('account-blur-fade-out')
		) {
			return;
		}

		setShouldRenderBlur(false);
	};

	return (
		<>
			<aside
				className={clsx(
					styles.account_bar,
					showUserData && styles.account_bar_show,
				)}
				ref={accountBarRef}
				onTransitionEnd={handleTransitionEnd}
			>
				<div className={styles.header}>
					<span className={styles.title}>Аккаунт</span>
					<button
						className={styles.back_btn}
						onClick={handleCloseAccountBar}
					>
						<CloseIcon className="icon" />
					</button>
				</div>
				{changePhoto ? (
					<ChangePhotoForm onBack={() => setChangePhoto(false)} />
				) : (
					<AccountView
						username={username}
						email={email}
						userImg={userImg}
						regDate={regDate}
						onChangePhoto={() => setChangePhoto(true)}
					/>
				)}
			</aside>
			{shouldRenderBlur && (
				<div
					className={clsx(
						styles.blur_bg,
						!showUserData && styles.fadeOut,
					)}
					onAnimationEnd={handleBlurAnimationEnd}
				/>
			)}
		</>
	);
};

export default AccountDataBar;
