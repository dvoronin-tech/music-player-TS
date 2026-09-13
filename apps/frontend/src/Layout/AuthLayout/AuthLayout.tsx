import { FC } from 'react';
import styles from './AuthLayout.module.scss';
import { AuthForm } from '@/components/auth/AuthForm';

const AuthLayout: FC = () => {
	return (
		<div className={styles.auth}>
			<AuthForm />
		</div>
	);
};

export default AuthLayout;
