import { FC } from 'react';
import styles from './auth.module.scss';
import { AuthForm } from './AuthForm';

const Auth: FC = () => {
	return (
		<div className={styles.auth}>
			<AuthForm />
		</div>
	);
};

export default Auth;
