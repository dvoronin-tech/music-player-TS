import { FC } from 'react';
import UserIcon from '@/assets/icons/user.svg?react';
import styles from './UserImage.module.scss';

type UserImageProps = {
	userImg: string | null;
};

const UserImage: FC<UserImageProps> = ({ userImg }) => {
	if (userImg) {
		return <img className={styles.photo} src={userImg} alt="моё фото" />;
	}
	return <UserIcon className={styles.icon} />;
};

export default UserImage;
