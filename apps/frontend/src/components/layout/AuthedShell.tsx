import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import MainHeader from '@/components/headers/MainHeader';
import PlaySelection from '@/pages/PlaySelection/PlaySelection';
import AsideBar from '@/components/asideBar/asideBar';
import CPLSelection from '@/components/CPLSelection/CPLSelection';
import AccountDataBar from '@/components/accountDataBar/accountDataBar';
import FullScreen from '@/pages/fullScreen/fullScreen';
import {
	setCurrentPlayListOpen,
	toggleShowFullScreen,
} from '@/store/slices/ui';
import { selectCurrentTrack } from '@/store/slices/player';

interface AuthedShellProps {
	children: ReactNode;
}

export default function AuthedShell({ children }: AuthedShellProps) {
	const dispatch = useAppDispatch();
	const currentTrack = useAppSelector(selectCurrentTrack);
	const { showUserData, showFullScreen, showCurrentPlayList } = useAppSelector(
		(state) => state.ui,
	);

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
		<>
			<div style={{ paddingBottom: currentTrack ? 'var(--play-selection-height)' : 0 }}>
				<MainHeader />
				{children}
			</div>
			<PlaySelection />
			<AsideBar />
			<CPLSelection />
			<AccountDataBar />
		</>
	);
}
