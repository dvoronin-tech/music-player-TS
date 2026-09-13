import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import MainHeader from '@/components/headers/MainHeader';
import PlaySelection from '@/components/PlaySelection/PlaySelection';
import AsideBar from '@/components/asideBar/asideBar';
import CPLSelection from '@/components/CPLSelection/CPLSelection';
import AccountDataBar from '@/components/accountDataBar/accountDataBar';
import FullScreen from '@/components/fullScreen/fullScreen';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import { selectCurrentTrack } from '@/store/slices/player';
import styles from './AuthedShell.module.scss';

interface AuthedShellProps {
	children: ReactNode;
}

export default function AuthedShell({ children }: AuthedShellProps) {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const { showUserData, showFullScreen, showCurrentPlayList } =
		useAppSelector((state) => state.ui);

	useEffect(() => {
		if (showUserData && showCurrentPlayList) {
			dispatch(setCurrentPlayListOpen(false));
		}
	}, [dispatch, showCurrentPlayList, showUserData]);

	useEffect(() => {
		if (showFullScreen && !currentTrack) {
			dispatch(toggleShowFullScreen(false));
		}
	}, [currentTrack, dispatch, showFullScreen]);

	if (showFullScreen) {
		return <FullScreen />;
	}

	return (
		<div
			className={clsx(styles.shell, {
				[styles.shell_with_player]: !!currentTrack,
			})}
		>
			<MainHeader />
			{children}
			<PlaySelection />
			<AsideBar />
			<CPLSelection />
			<AccountDataBar />
		</div>
	);
}
