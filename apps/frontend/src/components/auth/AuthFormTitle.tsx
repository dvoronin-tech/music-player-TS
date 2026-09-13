import { FC } from 'react';
import styles from './auth.module.scss';

interface AuthFormTitleProps {
	title: string;
}

export const AuthFormTitle: FC<AuthFormTitleProps> = ({ title }) => {
	return (
		<div className={styles.auth_form_title}>
			<span>
				{title} <span className={styles.brooklyn_word}>Brooklyn</span>
			</span>
		</div>
	);
};
