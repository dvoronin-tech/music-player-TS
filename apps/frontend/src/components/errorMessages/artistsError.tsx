import { FC } from 'react';
import { MdOutlineError } from "react-icons/md";
import styles from './artistsError.module.scss';

interface Prop {
    errorMessage: string
}

export const ArtistsError: FC<Prop> = ({errorMessage}) => {
    return (
        <div className={styles.artists_error}>
            <MdOutlineError style={{marginRight: 20}} />
            <span>{errorMessage}</span>
            <MdOutlineError />
        </div>
    )
}