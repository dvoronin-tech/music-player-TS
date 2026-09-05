import { ChangeEvent, FC, FormEvent, useEffect, useState, useRef } from 'react';
import styles from './auth.module.scss';
import Button from '@/components/buttons/buttons';
import { LuInfo } from 'react-icons/lu';
import { FaTelegramPlane } from 'react-icons/fa';
import { Input } from '@/components/inputFields/inputFields';
import { useNavigate } from '@tanstack/react-router';
import { serverUrl } from '@/utils/constants';

interface IFormData {
	username: string | null;
	password: string | null;
	email: string | null;
}

interface IValidationMessage {
	usernameInvalid: string | null;
	passwordInvalid: string | null;
	emailInvalid: string | null;
}

enum Colors {
	success = '#4EBA3C',
	error = '#C84141',
}

const Auth: FC = () => {
	const [auth, setAuth] = useState<'reg' | 'auth'>('reg');
	const [content, setContent] = useState<JSX.Element | null>(null);

	const initialFormState = { username: null, password: null, email: '' };
	const [formData, setFormData] = useState<IFormData>(initialFormState);
	const [responseColor, setResponseColor] = useState<Colors>(Colors.success);
	const navigate = useNavigate();

	const [validationMessages, setValidationMessages] =
		useState<IValidationMessage>({
			usernameInvalid: 'Это поле не должно быть пустым',
			passwordInvalid: 'Это поле не должно быть пустым',
			emailInvalid: 'Это поле не должно быть пустым',
		});

	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState<string | null>(null);
	const prevAuth = useRef<'reg' | 'auth' | null>(null);

	const regUser = async (data) => {
		try {
			const res = await fetch(serverUrl + '/api/users/register/', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			return await res.json();
		} catch (err) {
			if (err) {
				const { message } = err as Error;
				console.log(message);
				setResponse('Неполадки с сервером, попробуйте позже');
				setResponseColor(Colors.error);
			}
		}
	};

	const authUser = async (data) => {
		try {
			const res = await fetch(serverUrl + '/api/users/auth/', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			return await res.json();
		} catch (err) {
			if (err) {
				const { message } = err as Error;
				console.log(message);
				setResponse('Неполадки с сервером, попробуйте позже');
				setResponseColor(Colors.error);
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setResponse(null);
		if (auth === 'reg') {
			switch (name) {
				case 'username':
					if (value) {
						if (value.length <= 4) {
							setValidationMessages((prevState) => ({
								...prevState,
								usernameInvalid:
									'Ваше имя должно быть длиннее 4-х символов',
							}));
						} else if (value.length >= 20) {
							setValidationMessages((prevState) => ({
								...prevState,
								usernameInvalid:
									'Ваше имя должно быть короче 20-ти символов',
							}));
						} else {
							setValidationMessages((prevState) => ({
								...prevState,
								usernameInvalid: null,
							}));
						}
						setFormData((prevState) => ({
							...prevState,
							username: value,
						}));
					} else {
						setValidationMessages((prevState) => ({
							...prevState,
							usernameInvalid: 'Это поле не должно быть пустым',
						}));
					}
					break;
				case 'password':
					if (value) {
						if (value.length <= 6) {
							setValidationMessages((prevState) => ({
								...prevState,
								passwordInvalid:
									'Ваш пароль должен быть длиннее 6-ти символов',
							}));
						} else if (value.length >= 25) {
							setValidationMessages((prevState) => ({
								...prevState,
								passwordInvalid:
									'Ваш пароль должен быть короче 25-ти символов',
							}));
						} else if (!/\d/g.test(value)) {
							setValidationMessages((prevState) => ({
								...prevState,
								passwordInvalid:
									'Ваш пароль должен иметь хотя бы 1 число',
							}));
						} else {
							setValidationMessages((prevState) => ({
								...prevState,
								passwordInvalid: null,
							}));
						}
						setFormData((prevState) => ({
							...prevState,
							password: value,
						}));
					} else {
						setValidationMessages((prevState) => ({
							...prevState,
							passwordInvalid: 'Это поле не должно быть пустым',
						}));
					}
					break;
				case 'email':
					if (value) {
						if (!/@/g.test(value)) {
							setValidationMessages((prevState) => ({
								...prevState,
								emailInvalid: `В почте должен быть знак "@"`,
							}));
						} else {
							setValidationMessages((prevState) => ({
								...prevState,
								emailInvalid: null,
							}));
						}

						setFormData((prevState) => ({
							...prevState,
							email: value,
						}));
					} else {
						setValidationMessages((prevState) => ({
							...prevState,
							emailInvalid: 'Это поле не должно быть пустым',
						}));
					}
					break;
			}
		} else {
			setValidationMessages((prevState) => ({
				...prevState,
				emailInvalid: null,
			}));
			switch (name) {
				case 'username':
					if (value) {
						setValidationMessages((prevState) => ({
							...prevState,
							usernameInvalid: null,
						}));
						setFormData((prevState) => ({
							...prevState,
							username: value,
						}));
					} else {
						setValidationMessages((prevState) => ({
							...prevState,
							usernameInvalid: 'Это поле не должно быть пустым',
						}));
						setFormData((prevState) => ({
							...prevState,
							username: null,
						}));
					}
					break;
				case 'password':
					if (value) {
						setValidationMessages((prevState) => ({
							...prevState,
							passwordInvalid: null,
						}));
						setFormData((prevState) => ({
							...prevState,
							password: value,
						}));
					} else {
						setValidationMessages((prevState) => ({
							...prevState,
							passwordInvalid: 'Это поле не должно быть пустым',
						}));
						setFormData((prevState) => ({
							...prevState,
							password: null,
						}));
					}
					break;
			}
		}
	};

	const handleSubmitReg = (e: FormEvent<HTMLFormElement>) => {
		setValidationMessages({
			usernameInvalid: 'Это поле не должно быть пустым',
			passwordInvalid: 'Это поле не должно быть пустым',
			emailInvalid: 'Это поле не должно быть пустым',
		});
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		let isValid = true;
		for (let value of Object.values(formData)) {
			if (!value) {
				isValid = false;
				break;
			}
		}

		if (isValid) {
			setIsLoading(true);
			regUser(formData).then((data) => {
				if (data.data) {
					setResponse(data.data);
					setResponseColor(Colors.success);
				} else {
					setResponse(data.error);
					setResponseColor(Colors.error);
				}
			});
			setIsLoading(false);
		} else {
			setResponse('Вы заполнили не все поля или заполнили их не верно');
			setResponseColor(Colors.error);
		}
		setFormData(initialFormState);
		form.reset();
	};

	const handleSubmitAuth = (e: FormEvent<HTMLFormElement>) => {
		setValidationMessages({
			usernameInvalid: 'Это поле не должно быть пустым',
			passwordInvalid: 'Это поле не должно быть пустым',
			emailInvalid: 'Это поле не должно быть пустым',
		});
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		setIsLoading(true);

		authUser(formData).then((data) => {
			if (!data.token) {
				data.error && setResponse(data.error);
				setResponseColor(Colors.error);
			} else {
				localStorage.setItem('Token', data.token);
				navigate({ to: '/home' });
				window.location.reload();
			}
		});

		setIsLoading(false);

		setFormData(initialFormState);
		form.reset();
	};

	useEffect(() => {
		const { usernameInvalid, passwordInvalid, emailInvalid } =
			validationMessages;
		setContent(
			<form
				className={styles.auth_reg_form}
				onSubmit={auth === 'reg' ? handleSubmitReg : handleSubmitAuth}
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
							onChange={handleChange}
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
							onChange={handleChange}
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
								<label htmlFor="email">
									Адрес электронной почты
								</label>
								<LuInfo
									className={styles.auth_error_icon}
									style={{ opacity: emailInvalid ? 1 : 0 }}
								/>
							</div>
							<Input
								onChange={handleChange}
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
				{prevAuth.current === auth && response && (
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
			</form>,
		);
		prevAuth.current = auth;
	}, [auth, validationMessages, response, isLoading, responseColor]);
	return (
		<div className={styles.auth}>
			<div className={styles.auth_header}>
				<span className={styles.auth_title}>BROOKLYN</span>
				<div>
					<Button
						variant="simple"
						size="2xl"
						weight="semibold"
						onClick={() => setAuth('reg')}
						style={{ marginRight: '20px' }}
					>
						Регистрация
					</Button>
					<Button
						variant="accent"
						size="2xl"
						weight="semibold"
						onClick={() => setAuth('auth')}
					>
						Войти
					</Button>
				</div>
			</div>
			<div className={styles.auth_wrapper}>{content}</div>
		</div>
	);
};

export default Auth;
