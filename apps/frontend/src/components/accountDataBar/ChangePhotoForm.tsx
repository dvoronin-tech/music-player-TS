import { ChangeEvent, FC, useRef, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { v4 as randomId } from 'uuid';
import { useSetMyPhotoMutation } from '@/api/rtk/user';
import Button from '@/components/buttons/buttons';
import { useAppDispatch } from '@/hooks/useTypedRedux';
import { addNotification } from '@/store/slices/notification';
import styles from './accountDataBar.module.scss';


type ChangePhotoFormProps = {
	onBack: () => void;
};

const ChangePhotoForm: FC<ChangePhotoFormProps> = ({ onBack }) => {
	const dispatch = useAppDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState('');
	const [setMyPhoto, { isLoading }] = useSetMyPhotoMutation();

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		e.target.value = '';

		if (!selectedFile || !selectedFile.type.startsWith('image/')) {
			return;
		}

		setFile(selectedFile);

		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			if (typeof fileReader.result === 'string') {
				setPreview(fileReader.result);
			}
		};
		fileReader.readAsDataURL(selectedFile);
	};

	const submitImg = async () => {
		if (!file || isLoading) return;

		try {
			await setMyPhoto(file).unwrap();
			onBack();
		} catch {
			dispatch(
				addNotification({
					notificationId: randomId(),
					img: <MdErrorOutline style={{ color: '#C84141' }} />,
					info: 'Фотография профиля',
					additionalInfo: 'Не удалось <span>загрузить фото</span>',
				}),
			);
		}
	};

	return (
		<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
			<input
				ref={fileInputRef}
				className={styles.file_input}
				type="file"
				accept="image/*"
				tabIndex={-1}
				onChange={handleChangeFileInput}
			/>
			{!preview && (
				<Button
					variant="simple"
					className={styles.file_picker}
					onClick={openFilePicker}
				>
					Выберите файл
				</Button>
			)}
			{preview && (
				<div className={styles.file_img_wrapper}>
					<img src={preview} alt="Предпросмотр" />
					<div className={styles.file_img_wrapper_content}>
						<span>Ваша фотография</span>
						<Button
							variant="alternative"
							size="l"
							weight="medium"
							onClick={openFilePicker}
						>
							Изменить фото
						</Button>
					</div>
				</div>
			)}
			<div className={styles.buttons_selection}>
				<Button
					onClick={submitImg}
					disabled={!file || isLoading}
					variant={file && !isLoading ? 'accent' : 'disable'}
					size="xl"
					weight="semibold"
				>
					{isLoading ? 'Загрузка...' : 'Отправить фото'}
				</Button>
				<Button
					onClick={onBack}
					variant="simple"
					size="xl"
					weight="semibold"
				>
					Назад
				</Button>
			</div>
		</form>
	);
};

export default ChangePhotoForm;
