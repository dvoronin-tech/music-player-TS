import { FC } from 'react';
import styles from './PreRegPage.module.scss';
import Button from '@/components/buttons/buttons';

const PreRegPage: FC = () => {
	return (
		<div className={styles.pre_reg_main}>
			<div className={styles.main_content}>
				<h1>
					Добро пожаловать в <span>BROOKLYN</span>
				</h1>
				<div className={styles.content_selection}>
					<div className={styles.warning} id="warning">
						<p className={styles.warning_lead}>
							Убедительно не рекомендую использовать свои
							настоящие данные для регистрации!!!
						</p>
					</div>
					<h2>Об этом приложении</h2>
					<p>
						Данное приложение написано на React с использованием{' '}
						<b>
							Vite, TypeScript, TanStack Router, Redux Toolkit +
							RTK Query и SCSS modules
						</b>
						. Серверная часть приложения написана на{' '}
						<b>TypeScript</b> с использованием фреймворка{' '}
						<b>Hono</b> и находится в этом же монорепозитории.
					</p>
					<p>
						В приложении можно прослушивать музыку из заранее
						заготовленного плейлиста треков, лайкать их, изучать
						карточки музыкантов, а так же, при желании, добавить
						фотографию пользователя. Для просмотра понравившихся
						треков необходимо увести мышку в крайнее левое положение
						экрана, после чего слева направо "вылетит" окно для
						просмотра понравившихся композиций и список артистов, на
						которых вы подписаны.
					</p>
					<h2>История создания</h2>
					<p>
						Приложение разрабатывалось на протяжении 3-х месяцев.
						Сначала оно писалось на JavaScript без Redux, из-за чего
						было много ошибок из-за отсутствия типизации и сложно
						масштабировать код. Затем проект полностью переписали на
						TypeScript и Redux.
					</p>
					<p>
						Позже маршрутизацию сменили с React Router на TanStack
						Router, стили — со styled-components на SCSS modules, а
						сервер — с Python/Django на TypeScript Hono. Сейчас
						приложение закончено и готово к тестам.
					</p>
					<h2>Заключение</h2>
					<p>
						В заключение я бы хотел сказать, что это приложение я
						старался писать не как обычный пет проект, а как
						стартап. Архитектура приложения продумана так, что бы в
						случаи чего, данное приложение можно было масштабировать
						и расширять дальше.
					</p>
					<p>
						<b>Приятного использования!!!</b>
					</p>
					<p className={styles.developer}>
						Разработчик: Воронин Денис
					</p>
				</div>
				<div className={styles.action_links}>
					<Button
						variant="accent"
						size="xl"
						weight="bold"
						to="/auth"
					>
						Перейти к авторизации
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PreRegPage;
