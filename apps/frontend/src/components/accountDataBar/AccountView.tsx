import { FC, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from '@tanstack/react-router';
import UserImage from '@/components/userImage/UserImage';
import Button from '@/components/buttons/buttons';
import { logout } from '@/utils/auth';
import styles from './accountDataBar.module.scss';
import AccountInfo from './AccountInfo';

type AccountViewProps = {
	username: string;
	email: string;
	userImg: string | null;
	regDate: Date;
	onChangePhoto: () => void;
};

const AccountView: FC<AccountViewProps> = ({
	username,
	email,
	userImg,
	regDate,
	onChangePhoto,
}) => {
	const navigate = useNavigate();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [startDate, setStartDate] = useState<null | number>(null);

	const onDown = () => {
		setIsLoggingOut(true);
		setStartDate(new Date().getTime());
	};

	const onUp = () => {
		setIsLoggingOut(false);
		const dateOnUp = new Date().getTime();
		if (startDate) {
			if (dateOnUp - startDate >= 1000) {
				const answer = confirm('Вы точно хотите выйти из аккаунта?');
				if (answer) {
					logout();
					navigate({ to: '/auth' });
				}
			}
		}
	};

	const onMouseLeave = () => {
		setIsLoggingOut(false);
	};

	return (
		<>
			<div className={styles.account_data}>
				<div className={styles.img_wrapper}>
					<UserImage userImg={userImg} />
				</div>
				<div className={styles.user_data}>
					<span className={styles.username}>{username}</span>
					<span className={styles.email}>{email}</span>
				</div>
			</div>
			<AccountInfo username={username} email={email} regDate={regDate} />
			<div className={styles.buttons_selection}>
				<Button
					onClick={onChangePhoto}
					variant="accent"
					size="xl"
					weight="semibold"
				>
					Изменить фото
				</Button>
				<Button
					variant="simple"
					size="xl"
					weight="semibold"
					className={clsx(
						styles.logout_btn,
						isLoggingOut && styles.logout_btn_logging_out,
					)}
					onMouseDown={onDown}
					onMouseUp={onUp}
					onMouseLeave={onMouseLeave}
				>
					Выйти из аккаунта
				</Button>
			</div>
		</>
	);
};

export default AccountView;
