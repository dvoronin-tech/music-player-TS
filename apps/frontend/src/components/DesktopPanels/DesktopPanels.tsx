import AccountDataBar from '@/components/accountDataBar/accountDataBar';
import AsideBar from '@/components/asideBar/asideBar';
import CPLSelection from '@/components/CPLSelection/CPLSelection';
import PlaySelection from '@/components/PlaySelection/PlaySelection';

export default function DesktopPanels() {
	return (
		<>
			<PlaySelection />
			<AsideBar />
			<CPLSelection />
			<AccountDataBar />
		</>
	);
}
