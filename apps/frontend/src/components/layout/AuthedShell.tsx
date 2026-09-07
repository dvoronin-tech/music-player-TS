import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypedRedux';
import Notification from '@/components/notification/notification';
import AudioModule from '@/pages/audioModule/audioModule';
import Headers from '@/components/headers/headers';
import PlaySelection from '@/pages/PlaySelection/PlaySelection';
import AsideBar from '@/components/asideBar/asideBar';
import CPLSelection from '@/components/CPLSelection/CPLSelection';
import AccountDataBar from '@/components/accountDataBar/accountDataBar';
import FullScreen from '@/pages/fullScreen/fullScreen';
import { showCurrentPlayListAction } from '@/store/slices/current';
import { toggleShowFullScreen } from '@/store/slices/ui';

interface AuthedShellProps {
	children: ReactNode;
}

export default function AuthedShell({ children }: AuthedShellProps) {
	const dispatch = useAppDispatch();
	const { currentTrack, showCurrentPlayList } = useAppSelector(
		(state) => state.current,
	);
	const { showUserData, showFullScreen } = useAppSelector(
		(state) => state.ui,
	);

	useEffect(() => {
		if (showUserData && showCurrentPlayList) {
			dispatch(showCurrentPlayListAction(false));
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
			<div style={{ paddingBottom: currentTrack ? 50 : 0 }}>
				<Headers type="main" />
				{children}
			</div>
			<PlaySelection />
			<AsideBar />
			<CPLSelection />
			<AccountDataBar />
			<Notification />
			<AudioModule />
		</>
	);
}
