import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	CSSProperties,
} from 'react';
import clsx from 'clsx';
import styles from './buttons.module.scss';

import { Link, LinkProps } from '@tanstack/react-router';

type ButtonVariant = 'accent' | 'simple' | 'alternative' | 'disable';
type ButtonTextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl';
type ButtonTextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface SharedProps {
	variant: ButtonVariant;
	W: number;
	H: number;
	size?: ButtonTextSize;
	weight?: ButtonTextWeight;
	className?: string;
	style?: CSSProperties;
}

type AsButtonProps = SharedProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
		to?: undefined;
	};

type AsLinkProps = SharedProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
		to: NonNullable<LinkProps['to']>;
	};

function Button(props: AsLinkProps): JSX.Element;
function Button(props: AsButtonProps): JSX.Element;
function Button({
	variant,
	W,
	H,
	size,
	weight,
	className,
	style,
	children,
	...rest
}: AsButtonProps | AsLinkProps) {
	const classNames = clsx(
		styles[variant],
		'to' in rest && rest.to ? styles.general_link : styles.general_btn,
		size && styles[`size_${size}`],
		weight && styles[`weight_${weight}`],
		className,
	);
	const mergedStyle = {
		width: `${W}px`,
		height: `${H}px`,
		...style,
	};

	if ('to' in rest && rest.to) {
		const { to, ...linkRest } = rest;

		return (
			<Link className={classNames} style={mergedStyle} to={to} {...linkRest}>
				{children}
			</Link>
		);
	}

	const { type = 'button', ...buttonRest } = rest;

	return (
		<button
			type={type}
			className={classNames}
			style={mergedStyle}
			{...buttonRest}
		>
			{children}
		</button>
	);
}

export default Button;
