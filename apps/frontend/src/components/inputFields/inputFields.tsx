import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './inputFields.module.scss';

export function Input({
	className,
	type = 'text',
	...rest
}: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			type={type}
			className={clsx(styles.input_field_component, className)}
			{...rest}
		/>
	);
}
