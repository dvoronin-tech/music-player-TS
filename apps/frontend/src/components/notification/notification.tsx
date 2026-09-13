import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';
import styles from './notification.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	deleteNotification,
	type NotificationPayload,
} from '@/store/slices/notification';
import { RxCross2 } from 'react-icons/rx';

function renderHighlightedText(text: string) {
	const nodes: React.ReactNode[] = [];
	let lastIndex = 0;
	let key = 0;

	for (const match of text.matchAll(/__(.+?)__/g)) {
		const index = match.index ?? 0;
		if (index > lastIndex) {
			nodes.push(text.slice(lastIndex, index));
		}
		nodes.push(
			<span key={key++} className={styles.accent}>
				{match[1]}
			</span>,
		);
		lastIndex = index + match[0].length;
	}

	if (lastIndex < text.length) {
		nodes.push(text.slice(lastIndex));
	}

	return nodes;
}

const Notification: FC = () => {
	const notificationList = useAppSelector((state) => state.notification);

	return (
		<div className={styles.notification_wrapper}>
			{notificationList.map((item) => {
				return (
					<NotificationItem
						key={item.notificationId}
						notificationData={item}
					/>
				);
			})}
		</div>
	);
};

export default Notification;

interface NotificationItemProps {
	notificationData: NotificationPayload;
}

const NotificationItem: FC<NotificationItemProps> = ({ notificationData }) => {
	const { img, info, additionalInfo, notificationId, variant } =
		notificationData;
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const [isExiting, setIsExiting] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setIsExiting(true);
		}, 4000);

		return () => void clearTimeout(timerId);
	}, []);

	const handleDelete = () => {
		setIsExiting(true);
	};

	const handleAnimationEnd = (
		event: React.AnimationEvent<HTMLDivElement>,
	) => {
		if (
			!isExiting ||
			!event.animationName.includes('notification-fade-out')
		) {
			return;
		}

		dispatch(deleteNotification(notificationId));
	};

	const deleteBtnOpacity = isDelete ? 1 : 0;

	return (
		<div
			onMouseEnter={() => setIsDelete(true)}
			onMouseLeave={() => setIsDelete(false)}
			onAnimationEnd={handleAnimationEnd}
			className={clsx(styles.notification, isExiting && styles.fadeOut)}
		>
			{variant === 'error' ? (
				<div className={styles.notification_icon}>
					<MdErrorOutline style={{ color: '#C84141' }} />
				</div>
			) : variant === 'success' ? (
				<div className={styles.notification_icon}>
					<MdCheckCircleOutline style={{ color: '#4EBA3C' }} />
				</div>
			) : (
				<img src={img} alt="Фото" />
			)}

			<div className={styles.notification_data}>
				<span className={styles.notification_info}>{info}</span>
				<span className={styles.notification_additional_info}>
					{renderHighlightedText(additionalInfo)}
				</span>
			</div>
			<button
				onClick={handleDelete}
				style={{ opacity: deleteBtnOpacity }}
				className={styles.delete_notification}
			>
				<RxCross2 strokeWidth={1} />
			</button>
		</div>
	);
};
