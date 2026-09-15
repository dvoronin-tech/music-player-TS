import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect } from 'react';
import clsx from 'clsx';
import { useIsMobileLayout } from '@/hooks/useIsMobileLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import MainHeader from '@/components/headers/MainHeader';
import FullScreen from '@/components/fullScreen/fullScreen';
import MobileNavPanel from '@/components/MobileNavPanel/MobileNavPanel';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import { selectCurrentTrack } from '@/store/slices/player';
import styles from './AuthedShell.module.scss';

const DesktopPanels = lazy(
	() => import('@/components/DesktopPanels/DesktopPanels'),
);

interface AuthedShellProps {
	children: ReactNode;
}

export default function AuthedShell({ children }: AuthedShellProps) {
	const isMobile = useIsMobileLayout();
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

			{isMobile && <MobileNavPanel />}
			{!isMobile && (
				<Suspense fallback={null}>
					<DesktopPanels />
				</Suspense>
			)}
		</div>
	);
}
