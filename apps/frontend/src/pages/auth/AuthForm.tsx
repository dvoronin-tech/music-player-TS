import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from 'react';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';
import { v4 as randomId } from 'uuid';
import { useNavigate } from '@tanstack/react-router';
import styles from './auth.module.scss';
import Button from '@/components/buttons/buttons';
import { useLoginMutation, useRegisterMutation } from '@/api/rtk/auth';
import {
	loginBodySchema,
	registerBodySchema,
} from '@music-player/backend/schemas';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { addNotification } from '@/store/slices/notification';
import { queryErrorMessage } from '@/utils/queryErrorMessage';
import { AuthField, AuthFieldErrors, toFieldErrors } from './authErrors';
import { AuthFormTitle } from './AuthFormTitle';
import { AuthFormField } from './AuthFormField';

interface AuthFormValues {
	username: string;
	password: string;
	email: string;
}

const initialFormValues: AuthFormValues = {
	username: '',
	password: '',
	email: '',
};

export const AuthForm: FC = () => {
	const [auth, setAuth] = useState<'reg' | 'auth'>('reg');
	const [formData, setFormData] = useReducer(
		(prev: AuthFormValues, next: Partial<AuthFormValues>) => ({
			...prev,
			...next,
		}),
		initialFormValues,
	);
	const [errors, setErrors] = useState<AuthFieldErrors>({});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [registerUser, { isLoading: isRegisterLoading }] =
		useRegisterMutation();
	const [loginUser, { isLoading: isLoginLoading }] = useLoginMutation();
	const isLoading = isRegisterLoading || isLoginLoading;

	useEffect(() => {
		setErrors({});
	}, [auth]);

	const sendToast = ({
		info,
		additionalInfo,
		isError,
	}: {
		info: string;
		additionalInfo: string;
		isError: boolean;
	}) => {
		dispatch(
			addNotification({
				notificationId: randomId(),
				img: isError ? (
					<MdErrorOutline style={{ color: '#C84141' }} />
				) : (
					<MdCheckCircleOutline style={{ color: '#4EBA3C' }} />
				),
				info,
				additionalInfo,
			}),
		);
	};

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const field = name as AuthField;

		setFormData({ [field]: value });
		setErrors((prev) => {
			const next = { ...prev };
			delete next[field];
			return next;
		});
	}, []);

	const hasErrors = !!Object.keys(errors).length;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (hasErrors) return;

		if (auth === 'reg') {
			const result = registerBodySchema.safeParse(formData);
			if (!result.success) {
				setErrors(toFieldErrors(result.error));
				return;
			}

			const res = await registerUser(result.data);
			if ('data' in res && res.data) {
				sendToast({
					info: 'Регистрация',
					additionalInfo: 'Регистрация прошла <span>успешно</span>',
					isError: false,
				});
				setFormData(initialFormValues);
			}
			sendToast({
				info: 'Регистрация',
				additionalInfo: queryErrorMessage(res.error),
				isError: true,
			});
		} else {
			const result = loginBodySchema.safeParse(formData);
			if (!result.success) {
				setErrors(toFieldErrors(result.error));
				return;
			}

			const res = await loginUser(result.data);
			if ('data' in res && res.data) {
				localStorage.setItem('Token', res.data.token);
				await navigate({ to: '/home' });
				return;
			}
			sendToast({
				info: 'Вход',
				additionalInfo: queryErrorMessage(res.error),
				isError: true,
			});
		}
	};

	const submitButtonText = isLoading
		? 'Загрузка...'
		: auth === 'reg'
			? 'Зарегистрироваться'
			: 'Войти';

	return (
		<form className={styles.auth_form} onSubmit={handleSubmit} noValidate>
			<AuthFormTitle
				title={auth === 'auth' ? 'Войти в' : 'Зарегистрироваться в'}
			/>
			<div className={styles.inputs_wrapper}>
				<AuthFormField
					id="username"
					label="Имя пользователя"
					type="text"
					value={formData.username}
					error={errors.username}
					placeholder="Имя пользователя"
					onChange={handleChange}
				/>
				<AuthFormField
					id="password"
					label="Пароль"
					type="password"
					value={formData.password}
					error={errors.password}
					placeholder="Пароль"
					onChange={handleChange}
				/>
				{auth === 'reg' && (
					<AuthFormField
						id="email"
						label="Адрес электронной почты"
						type="email"
						value={formData.email}
						error={errors.email}
						placeholder="Электронная почта"
						onChange={handleChange}
					/>
				)}
			</div>
			<div className={styles.auth_form_actions}>
				<Button
					variant="accent"
					size="xl"
					weight="semibold"
					type="submit"
					disabled={isLoading || hasErrors}
					className={styles.submit_auth_btn}
				>
					{submitButtonText}
				</Button>
				<button
					type="button"
					className={styles.switch_auth_btn}
					onClick={() =>
						setAuth((prev) => (prev === 'reg' ? 'auth' : 'reg'))
					}
				>
					{auth === 'reg' ? 'Войти в систему' : 'Создать аккаунт'}
				</button>
			</div>
		</form>
	);
};
