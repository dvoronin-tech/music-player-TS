import { ChangeEvent, memo } from 'react';
import styles from './auth.module.scss';
import { Input } from '@/components/inputFields/inputFields';
import { AuthFormFieldTooltip } from './AuthFormFieldTooltip';

interface AuthFormFieldProps {
	id: string;
	label: string;
	type: string;
	value: string;
	error?: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthFormField = memo(
	({
		id,
		label,
		type,
		value,
		error,
		placeholder,
		onChange,
	}: AuthFormFieldProps) => {
		return (
			<div className={styles.input_field}>
				<div className={styles.label_icon_wrapper}>
					<label htmlFor={id}>{label}</label>
					<AuthFormFieldTooltip id={id} message={error} />
				</div>
				<Input
					value={value}
					onChange={onChange}
					type={type}
					id={id}
					name={id}
					placeholder={placeholder}
					autoComplete="current-password"
				/>
			</div>
		);
	},
);
