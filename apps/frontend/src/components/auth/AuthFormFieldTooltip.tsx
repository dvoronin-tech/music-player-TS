import { memo, useEffect, useRef, useState } from 'react';
import { LuInfo } from 'react-icons/lu';
import clsx from 'clsx';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import styles from './auth.module.scss';

interface AuthFormFieldTooltipProps {
	id: string;
	message?: string;
}

const canHover = () => window.matchMedia('(hover: hover)').matches;

export const AuthFormFieldTooltip = memo(
	({ id, message }: AuthFormFieldTooltipProps) => {
		const tooltipRef = useRef<HTMLDivElement>(null);
		const [isTooltipOpen, setIsTooltipOpen] = useState(false);

		useEffect(() => {
			if (!message) setIsTooltipOpen(false);
		}, [message]);

		useOutsideClick(tooltipRef, () => setIsTooltipOpen(false));

		const handleIconClick = () => {
			if (!message || canHover()) return;
			setIsTooltipOpen((open) => !open);
		};

		return (
			<div
				ref={tooltipRef}
				className={clsx(
					styles.auth_error_tooltip,
					isTooltipOpen && styles.auth_error_tooltip_open,
				)}
			>
				<button
					type="button"
					className={clsx(
						styles.auth_error_icon_btn,
						message && styles.auth_error_icon_visible,
					)}
					aria-label={message}
					aria-expanded={isTooltipOpen}
					aria-describedby={message ? `${id}-error` : undefined}
					disabled={!message}
					tabIndex={message ? 0 : -1}
					onClick={handleIconClick}
				>
					<LuInfo className={styles.auth_error_icon} />
				</button>
				{message && (
					<div
						id={`${id}-error`}
						className={styles.validation_error}
						role="tooltip"
					>
						{message}
					</div>
				)}
			</div>
		);
	},
);
