import { FC } from 'react';
import styles from './authAfterReg.module.scss';
import styled from 'styled-components';
import Button from '@/components/buttons/buttons';
import { logout } from '@/utils/auth';

const Main = styled.main`
	padding-top: 100px;
	background-color: '${({ theme }) => theme.secondBg}';
	height: 100svh;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Info = styled.span`
	font-size: 4rem;
	font-weight: 700;
`;

const ButtonsWrapper = styled.div`
	display: flex;
	margin-top: 30px;

	button {
		&:not(:last-child) {
			margin-right: 20px;
		}
	}
`;
const AuthAfterReg: FC = () => {
	const logOut = async () => {
		await logout();
		window.location.reload();
	};

	return (
		<Main>
			<Info>Вы уже вошли в систему</Info>
			<ButtonsWrapper>
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
			</ButtonsWrapper>
		</Main>
	);
};

export default AuthAfterReg;
