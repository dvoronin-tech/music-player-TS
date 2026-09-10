import { ChangeEvent, FC, useRef, useState } from 'react';
import Button from '@/components/buttons/buttons';
import styles from './accountDataBar.module.scss';

type ChangePhotoFormProps = {
	onBack: () => void;
};

const ChangePhotoForm: FC<ChangePhotoFormProps> = ({ onBack }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState('');

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

	const submitImg = () => {
		if (!file) return;
		onBack();
	};

	return (
		<form
			className={styles.form}
			onSubmit={(e) => e.preventDefault()}
		>
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
					disabled={!file}
					variant={file ? 'accent' : 'disable'}
					size="xl"
					weight="semibold"
				>
					Отправить фото
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
