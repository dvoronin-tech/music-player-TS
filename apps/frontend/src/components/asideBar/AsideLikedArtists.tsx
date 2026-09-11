import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { ArtistCard } from '@/components/artistCards/artistCards';
import type { ApiArtist } from '@music-player/backend';

const NoDataSpan = styled.span`
	font-size: 1.6rem;
	font-weight: 400;
	color: ${({ theme }) => theme.textSecond};
	margin-top: 10px;
	width: 100%;
	text-align: center;
`;

interface AsideLikedArtistsProps {
	artists: ApiArtist[];
	isLoading: boolean;
	isPopular: boolean;
}

export const AsideLikedArtists: FC<AsideLikedArtistsProps> = ({
	artists,
	isLoading,
	isPopular,
}) => {
	const displayArtists = useMemo(() => {
		if (!isPopular) {
			return artists;
		}
		return [...artists].sort((a, b) => b.likes - a.likes);
	}, [artists, isPopular]);

	if (isLoading) {
		return <div className="loading"></div>;
	}

	if (artists.length === 0) {
		return (
			<NoDataSpan>Вы не подписаны ни на одного артиста</NoDataSpan>
		);
	}

	return displayArtists.map((item) => (
		<ArtistCard
			key={item.id}
			id={item.id}
			name={item.name}
			img={item.artistImg}
			type="small"
		/>
	));
};
