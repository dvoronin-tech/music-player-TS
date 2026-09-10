import { FC } from 'react';
import styles from './accountDataBar.module.scss';

type AccountInfoProps = {
	username: string;
	email: string;
	regDate: Date;
};

const MONTHS_GENITIVE = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
] as const;

const formatMonthGenitive = (monthIndex: number) => MONTHS_GENITIVE[monthIndex];

const InfoRow: FC<{ label: string; value: string }> = ({ label, value }) => (
	<div className={styles.info_row}>
		<span className={styles.info_label}>{label} </span>
		<span className={styles.info_value}>{value}</span>
	</div>
);

const AccountInfo: FC<AccountInfoProps> = ({ username, email, regDate }) => {
	return (
		<div className={styles.account_info}>
			<InfoRow label="Имя пользователя:" value={username} />
			<InfoRow label="Почта:" value={email} />
			<InfoRow
				label="День регистрации:"
				value={`${regDate.getDate()} ${formatMonthGenitive(regDate.getMonth())}`}
			/>
			<InfoRow
				label="Год регистрации:"
				value={`${regDate.getFullYear()} год`}
			/>
			<InfoRow
				label="Время регистрации:"
				value={`${regDate.getHours()}:${regDate.getMinutes()}`}
			/>
		</div>
	);
};

export default AccountInfo;
