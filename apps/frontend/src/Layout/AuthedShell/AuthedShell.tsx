import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect } from 'react';
import clsx from 'clsx';
import { useLayout } from '@/hooks/useLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import MainHeader from '@/components/headers/MainHeader';
import FullScreen from '@/components/fullScreen/fullScreen';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import { selectCurrentTrack } from '@/store/slices/player';
import styles from './AuthedShell.module.scss';

const PlaySelection = lazy(
	() => import('@/components/PlaySelection/PlaySelection'),
);
const AsideBar = lazy(() => import('@/components/asideBar/asideBar'));
const CPLSelection = lazy(
	() => import('@/components/CPLSelection/CPLSelection'),
);
const AccountDataBar = lazy(
	() => import('@/components/accountDataBar/accountDataBar'),
);
const MobilePlaySection = lazy(
	() => import('@/components/MobilePlaySection/MobilePlaySection'),
);
const MobileNavPanel = lazy(
	() => import('@/components/MobileNavPanel/MobileNavPanel'),
);

interface AuthedShellProps {
	children: ReactNode;
}

export default function AuthedShell({ children }: AuthedShellProps) {
	const layout = useLayout();
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

	const hasTrack = !!currentTrack;

	return (
		<div
			className={clsx(styles.shell, {
				[styles.shell_desktop]: layout === 'desktop',
				[styles.shell_tablet]: layout === 'tablet',
				[styles.shell_mobile]: layout === 'mobile',
				[styles.shell_with_player]: hasTrack,
			})}
		>
			<MainHeader />
			{children}

			<Suspense fallback={null}>
				{layout === 'desktop' && <PlaySelection />}
				{layout !== 'mobile' && (
					<>
						<AsideBar />
						<CPLSelection />
					</>
				)}
				<AccountDataBar />
				{(layout === 'tablet' || layout === 'mobile') && (
					<MobilePlaySection layout={layout} />
				)}
				{layout === 'mobile' && <MobileNavPanel />}
			</Suspense>
		</div>
	);
}
