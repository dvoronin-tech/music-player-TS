import { ChangeEvent, FC, FormEvent } from 'react';
import styles from './auth.module.scss';
import Button from '@/components/buttons/buttons';
import { LuInfo } from 'react-icons/lu';
import { Input } from '@/components/inputFields/inputFields';

interface IValidationMessage {
	usernameInvalid: string | null;
	passwordInvalid: string | null;
	emailInvalid: string | null;
}

interface AuthFormProps {
	auth: 'reg' | 'auth';
	validationMessages: IValidationMessage;
	responseColor: string;
	response: string | null;
	showResponse: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmitReg: (e: FormEvent<HTMLFormElement>) => void;
	onSubmitAuth: (e: FormEvent<HTMLFormElement>) => void;
}

export const AuthForm: FC<AuthFormProps> = ({
	auth,
	validationMessages,
	responseColor,
	response,
	showResponse,
	onChange,
	onSubmitReg,
	onSubmitAuth,
}) => {
	const { usernameInvalid, passwordInvalid, emailInvalid } =
		validationMessages;

	return (
		<form
			className={styles.auth_reg_form}
			onSubmit={auth === 'reg' ? onSubmitReg : onSubmitAuth}
		>
			<div className={styles.auth_reg_title}>
				{auth === 'auth' ? (
					<span>
						Войти в{' '}
						<span className={styles.brooklyn_word}>Brooklyn</span>
					</span>
				) : (
					<span>
						Зарегистрироваться в{' '}
						<span className={styles.brooklyn_word}>Brooklyn</span>
					</span>
				)}
			</div>
			<div className={styles.inputs_wrapper}>
				<div className={styles.input_field}>
					<div className={styles.label_icon_wrapper}>
						<label htmlFor="username">Имя пользователя</label>
						<LuInfo
							className={styles.auth_error_icon}
							style={{ opacity: usernameInvalid ? 1 : 0 }}
						/>
					</div>
					<Input
						onChange={onChange}
						type="text"
						id="username"
						name="username"
						placeholder="Имя пользователя"
						required
					/>
					{usernameInvalid && (
						<div className={styles.validation_error}>
							{usernameInvalid}
						</div>
					)}
				</div>
				<div className={styles.input_field}>
					<div className={styles.label_icon_wrapper}>
						<label htmlFor="password">Пароль</label>
						<LuInfo
							className={styles.auth_error_icon}
							style={{ opacity: passwordInvalid ? 1 : 0 }}
						/>
					</div>
					<Input
						onChange={onChange}
						type="password"
						id="password"
						name="password"
						placeholder="Пароль"
						required
					/>
					{passwordInvalid && (
						<div className={styles.validation_error}>
							{passwordInvalid}
						</div>
					)}
				</div>
				{auth === 'reg' && (
					<div className={styles.input_field}>
						<div className={styles.label_icon_wrapper}>
							<label htmlFor="email">Адрес электронной почты</label>
							<LuInfo
								className={styles.auth_error_icon}
								style={{ opacity: emailInvalid ? 1 : 0 }}
							/>
						</div>
						<Input
							onChange={onChange}
							type="email"
							id="email"
							name="email"
							placeholder="Электронная почта"
							required
						/>
						{emailInvalid && (
							<div className={styles.validation_error}>
								{emailInvalid}
							</div>
						)}
					</div>
				)}
			</div>
			<Button
				variant={
					usernameInvalid ||
					passwordInvalid ||
					(auth === 'reg' && emailInvalid)
						? 'disable'
						: 'accent'
				}
				size="xl"
				weight="semibold"
				type={
					!usernameInvalid &&
					!passwordInvalid &&
					(auth === 'reg' || !emailInvalid)
						? 'submit'
						: 'button'
				}
				className={styles.submit_auth_btn}
			>
				{auth === 'reg' ? 'Зарегистрироваться' : 'Войти'}
			</Button>
			{showResponse && response && (
				<div
					className={styles.response_message}
					style={{
						animation: 'reg-auth-data-fade-in 1s ease-out',
						color: responseColor,
					}}
				>
					{response}
				</div>
			)}
		</form>
	);
};
