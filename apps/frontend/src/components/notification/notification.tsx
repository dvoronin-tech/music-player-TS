import React, { FC, useEffect, useRef, useState } from 'react';
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
	const additionalInfoSpan = useRef<HTMLSpanElement>(null);
	const notificationItem = useRef<HTMLDivElement>(null);
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const timerId = setTimeout(() => {
			if (notificationItem.current) {
				notificationItem.current.style.animation =
					'notification-fade-out 0.5s ease';

				setTimeout(() => {
					dispatch(deleteNotification(notificationId));
				}, 495);
			}
		}, 3000);

		return () => void clearTimeout(timerId);
	}, [dispatch]);

	useEffect(() => {
		if (additionalInfoSpan.current) {
			additionalInfoSpan.current.innerHTML = additionalInfo;
		}
	}, [additionalInfo]);

	const handleDelete = () => {
		if (notificationItem.current) {
			notificationItem.current.style.animation =
				'notification-fade-out 0.5s ease';

			setTimeout(() => {
				dispatch(deleteNotification(notificationId));
			}, 450);
		}
	};

	const deleteBtnOpacity = isDelete ? 1 : 0;

	return (
		<div
			ref={notificationItem}
			onMouseEnter={() => setIsDelete(true)}
			onMouseLeave={() => setIsDelete(false)}
			className={styles.notification}
		>
			{typeof img === 'string' ? (
				<img src={img} alt="Фото" />
			) : (
				<div className={styles.notification_icon}>{img}</div>
			)}

			<div className={styles.notification_data}>
				<span className={styles.notification_info}>{info}</span>
				<span
					ref={additionalInfoSpan}
					className={styles.notification_additional_info}
				>
					{additionalInfo}
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
