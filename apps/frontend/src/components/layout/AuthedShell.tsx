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
import { showCurrentPlayListAction } from '@/store/slices/current';
import { shallowEqual } from 'react-redux';

interface AuthedShellProps {
	children: ReactNode;
}

export default function AuthedShell({ children }: AuthedShellProps) {
	const dispatch = useAppDispatch();
	const { trackId, showCurrentPlayList } = useAppSelector(
		(state) => state.current,
	);
	const { showUserData } = useAppSelector((state) => state.ui);

	useEffect(() => {
		if (showUserData && showCurrentPlayList) {
			dispatch(showCurrentPlayListAction(false));
		}
	}, [dispatch, showCurrentPlayList, showUserData]);

	return (
		<>
			<div
				className="app_wrapper"
				style={{ paddingBottom: trackId ? 50 : 0 }}
			>
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

