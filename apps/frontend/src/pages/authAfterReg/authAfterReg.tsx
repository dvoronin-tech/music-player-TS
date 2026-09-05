import { FC, MouseEventHandler } from 'react';
import styles from './authAfterReg.module.scss';
import styled from 'styled-components';
import Button from '@/components/buttons/buttons';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { logoutUser } from '@/store/user/actionsUser';
import { serverUrl } from '@/utils/constants';

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
export const logout = () => {
	try {
		fetch(serverUrl + '/api/users/logout/', {
			method: 'GET',
			headers: {
				Token: JSON.stringify(localStorage.getItem('Token')),
			},
		});
	} catch (err) {
		if (err) {
			const error = err as Error;
			console.log(error.message);
		}
	}
	localStorage.removeItem('Token');
};

const AuthAfterReg: FC = () => {
	const dispatch = useAppDispatch();
	const logOut = () => {
		dispatch(logoutUser());
		logout();
		window.location.reload();
	};

	return (
		<Main>
			<Info>Вы уже вошли в систему</Info>
			<ButtonsWrapper>
				<Button
					variant="accent"
					W={300}
					H={50}
					className={styles.logout_btn}
					size="xl"
					weight="bold"
					onClick={logOut}
				>
					Выйти из аккаунта
				</Button>
				<Button
					variant="accent"
					W={300}
					H={50}
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
