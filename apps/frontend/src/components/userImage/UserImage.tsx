import { FC } from 'react';
import { FaUser } from 'react-icons/fa';
import styles from './UserImage.module.scss';

type UserImageProps = {
	userImg: string | null;
};

const UserImage: FC<UserImageProps> = ({ userImg }) => {
	if (userImg) {
		return <img className={styles.photo} src={userImg} alt="моё фото" />;
	}
	return <FaUser className={styles.icon} />;
};

export default UserImage;
