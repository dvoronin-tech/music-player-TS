import { FC } from 'react';
import styled from 'styled-components';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import type { ApiTrack } from '@music-player/backend';

const NoDataDiv = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.textDisable};
`;

interface LikedTracksGridProps {
	tracks: ApiTrack[];
	searchStr: string;
	hasLikedTracks: boolean;
}

export const LikedTracksGrid: FC<LikedTracksGridProps> = ({
	tracks,
	searchStr,
	hasLikedTracks,
}) => {
	if (!hasLikedTracks) {
		return (
			<NoDataDiv>
				<span>Вы не добавили ни одного трека</span>
			</NoDataDiv>
		);
	}

	const filteredTracks = searchStr
		? tracks.filter((item) =>
				item.title.toLowerCase().includes(searchStr.toLowerCase()),
			)
		: tracks;

	return filteredTracks.map((item) => (
		<HomeTrackCard key={item.id} track={item} playList={tracks} />
	));
};
