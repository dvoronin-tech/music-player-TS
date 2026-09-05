import { FC } from 'react';
import styled from 'styled-components';
import Button from '@/components/buttons/buttons';
import { useNavigate } from '@tanstack/react-router';

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
`;

const NotFoundPage: FC = () => {
	const navigate = useNavigate();

	return (
		<Main>
			<Info>Страница не найдена</Info>
			<ButtonsWrapper>
				<Button
					variant="accent"
					size="xl"
					weight="semibold"
					onClick={() => navigate({ to: '/home' })}
				>
					Перейти на главную
				</Button>
			</ButtonsWrapper>
		</Main>
	);
};

export default NotFoundPage;
