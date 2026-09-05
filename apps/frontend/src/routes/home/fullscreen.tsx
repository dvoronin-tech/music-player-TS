import { createFileRoute, redirect } from '@tanstack/react-router';
import { prefetchAppData, requireAuth } from '@/utils/auth';
import FullScreen from '@/pages/fullScreen/fullScreen';
import Notification from '@/components/notification/notification';
import AudioModule from '@/pages/audioModule/audioModule';
import store from '@/store/store';

export const Route = createFileRoute('/home/fullscreen')({
	beforeLoad: () => {
		requireAuth();
		const trackId = store.getState().current.trackId;
		if (!trackId) {
			throw redirect({ to: '/home' });
		}
	},
	loader: () => prefetchAppData(),
	component: FullscreenRoutePage,
});

function FullscreenRoutePage() {
	return (
		<>
			<div className="app_wrapper" style={{ paddingBottom: 0 }}>
				<FullScreen />
			</div>
			<Notification />
			<AudioModule />
		</>
	);
}
