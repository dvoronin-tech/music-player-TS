import { type FC, useCallback, useEffect, useRef } from 'react';
import CloseIcon from '@/assets/icons/close.svg?react';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { toggleShowShortcuts } from '@/store/slices/ui';
import styles from './ShortcutsModal.module.scss';

type Shortcut = {
	keys: string[];
	action: string;
};

const SHORTCUTS: Shortcut[] = [
	{ keys: ['F'], action: 'Лайк или убрать лайк текущего трека' },
	{ keys: ['K'], action: 'Воспроизведение или пауза' },
	{
		keys: ['Cmd / Ctrl', '← / →'],
		action: 'Предыдущий или следующий трек',
	},
	{
		keys: ['← / →'],
		action: 'Перемотка на 5 секунд, если выбран трек',
	},
	{ keys: ['S'], action: 'Перемешать' },
	{ keys: ['R'], action: 'Повтор вкл / выкл' },
	{ keys: ['P'], action: 'Текущий плейлист вкл / выкл' },
	{ keys: ['W'], action: 'Полный экран вкл / выкл' },
	{ keys: ['A'], action: 'Панель аккаунта вкл / выкл' },
	{ keys: ['Q'], action: 'Левая панель вкл / выкл' },
];

const ShortcutsModal: FC = () => {
	const dispatch = useAppDispatch();
	const dialogRef = useRef<HTMLDivElement>(null);

	const handleClose = useCallback(() => {
		dispatch(toggleShowShortcuts(false));
	}, [dispatch]);

	useEffect(() => {
		dialogRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code !== 'Escape' || event.repeat) {
				return;
			}

			event.preventDefault();
			handleClose();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleClose]);

	return (
		<div className={styles.overlay} onClick={handleClose}>
			<div
				ref={dialogRef}
				className={styles.dialog}
				role="dialog"
				aria-modal="true"
				aria-labelledby="shortcuts-modal-title"
				tabIndex={-1}
				onClick={(event) => event.stopPropagation()}
			>
				<div className={styles.header}>
					<h2 id="shortcuts-modal-title" className={styles.title}>
						Горячие клавиши
					</h2>
					<button
						type="button"
						className={styles.close_btn}
						onClick={handleClose}
						aria-label="Закрыть"
					>
						<CloseIcon className="icon" />
					</button>
				</div>
				<ul className={styles.list}>
					{SHORTCUTS.map((shortcut) => (
						<li key={shortcut.action} className={styles.row}>
							<span className={styles.keys}>
								{shortcut.keys.map((key, index) => (
									<span
										key={key}
										className={styles.key_group}
									>
										{index > 0 && (
											<span className={styles.plus}>
												+
											</span>
										)}
										<kbd className={styles.kbd}>{key}</kbd>
									</span>
								))}
							</span>
							<span className={styles.action}>
								{shortcut.action}
							</span>
						</li>
					))}
				</ul>
				<p className={styles.note}>
					Клавиши считаются по физическому положению, поэтому работают
					и на русской раскладке. На телефоне P и Q не используются. В
					полном экране остаются управление воспроизведением и W.
				</p>
			</div>
		</div>
	);
};

export default ShortcutsModal;
