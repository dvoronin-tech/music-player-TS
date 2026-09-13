import { FC } from 'react';
import ErrorIcon from '@/assets/icons/error.svg?react';
import styles from './artistsError.module.scss';

interface Prop {
    errorMessage: string
}

export const ArtistsError: FC<Prop> = ({errorMessage}) => {
    return (
        <div className={styles.artists_error}>
            <ErrorIcon style={{marginRight: 20}} />
            <span>{errorMessage}</span>
            <ErrorIcon />
        </div>
    )
}