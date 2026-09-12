import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './notification.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import {
	deleteNotification,
	type INotificationData,
} from '@/store/slices/notification';
import { RxCross2 } from 'react-icons/rx';

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

interface INotificationItemProps {
	notificationData: INotificationData;
}

const NotificationItem: FC<INotificationItemProps> = ({ notificationData }) => {
	const { img, info, additionalInfo, notificationId } = notificationData;
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
			{typeof img === 'string' ? (
				<img src={img} alt="Фото" />
			) : (
				<div className={styles.notification_icon}>{img}</div>
			)}

			<div className={styles.notification_data}>
				<span className={styles.notification_info}>{info}</span>
				<span
					className={styles.notification_additional_info}
					dangerouslySetInnerHTML={{ __html: additionalInfo }}
				/>
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
