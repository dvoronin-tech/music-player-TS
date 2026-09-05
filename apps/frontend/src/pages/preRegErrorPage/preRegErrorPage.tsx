import { FC } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import Button from "@/components/buttons/buttons";

import styles from './preRegErrorPage.module.scss';

const PreRegErrorPage: FC = () => {
    return (
        <div className={styles.auth_error_page}>
            <main>
                <div>
                    <span>Для прехода на данный ресурс необходимо авторизоваться</span>
                </div>
                <FaUserAltSlash/>
                <Button variant="accent" to="/auth" size="xl" weight="bold">Перейти к авторизации</Button>
            </main>
        </div>
    )
}

export default PreRegErrorPage;