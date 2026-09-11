import { FC } from 'react';
import styled from 'styled-components';
import SmallTrackCard from '@/components/smallTrackCard/smallTrackCard';
import type { ApiTrack } from '@music-player/backend';

const NoDataSpan = styled.span`
	font-size: 1.6rem;
	font-weight: 400;
	color: ${({ theme }) => theme.textSecond};
	margin-top: 10px;
	width: 100%;
	text-align: center;
`;

interface AsideLikedTracksProps {
	tracks: ApiTrack[];
	isLoading: boolean;
}

export const AsideLikedTracks: FC<AsideLikedTracksProps> = ({
	tracks,
	isLoading,
}) => {
	if (isLoading) {
		return <div className="loading"></div>;
	}

	if (tracks.length === 0) {
		return <NoDataSpan>Вы не добавили ни одного трека</NoDataSpan>;
	}

	return tracks.map((item) => (
		<SmallTrackCard
			track={item}
			playList={tracks}
			showRemoveButton={false}
			key={item.id}
		/>
	));
};
