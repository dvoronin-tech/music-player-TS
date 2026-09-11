import { FC, useEffect, useState } from 'react';
import styles from './asideBar.module.scss';
import styled from 'styled-components';
import { useAppSelector } from '@/hooks/useTypedRedux';
import {
	useGetLikedTracksQuery,
	useGetLikedArtistsQuery,
} from '@/api/rtk/liked';
import Button from '@/components/buttons/buttons';
import { useNavigate } from '@tanstack/react-router';
import { AsideLikedTracks } from './AsideLikedTracks';
import { AsideLikedArtists } from './AsideLikedArtists';
import {
	selectCurrentTrack,
	selectPlayerQueue,
} from '@/store/slices/player';

const AsideBarComponent = styled.aside<{
	$isPlayList: boolean;
	$isHovered: boolean;
}>`
	width: 400px;
	background-color: ${({ theme }) => theme.secondBgBlur};
	backdrop-filter: blur(20px);
	position: fixed;
	top: 90px;
	left: ${({ $isHovered }) => ($isHovered ? '40px' : '-398px')};
	height: calc(
		100svh - ${({ $isPlayList }) => ($isPlayList ? '190px' : '110px')}
	);
	border-radius: 15px;
	transition: 500ms ease all;
	z-index: 100;
	border: 1px solid ${({ theme }) => theme.border};
	opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
	box-sizing: border-box;
	padding: 20px;
	display: flex;
	flex-direction: column;

	&::before {
		content: '';
		width: 42px;
		height: calc(
			100svh - ${({ $isPlayList }) => ($isPlayList ? '190px' : '110px')}
		);
		position: absolute;
		top: 0;
		left: -42px;
	}
`;

const FlexRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	span {
		font-size: 2rem;
		font-weight: 700;
	}
`;

const ArtistsGridWrapper = styled.div<{ $isNoArtists: boolean }>`
	display: ${({ $isNoArtists }) => ($isNoArtists ? 'flex' : 'grid')};
	justify-content: center;
	grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
	gap: 20px;
	width: 100%;
`;

const AsideBar: FC = () => {
	const currentTrack = useAppSelector(selectCurrentTrack);
	const currentPlayList = useAppSelector(selectPlayerQueue);
	const { data: likedTrackList = [], isLoading: tracksLoading } =
		useGetLikedTracksQuery();
	const { data: likedArtists = [], isLoading: artistsLoading } =
		useGetLikedArtistsQuery();

	const [showPlayList, setShowPlayList] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isPopular, setIsPopular] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (currentTrack && currentPlayList.length > 0) {
			setShowPlayList(true);
		} else {
			setShowPlayList(false);
		}
	}, [currentPlayList.length, currentTrack]);

	useEffect(() => {
		setIsHovered(false);
	}, [navigate]);

	return (
		<AsideBarComponent
			$isHovered={isHovered}
			$isPlayList={showPlayList}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<FlexRow>
				<span>Любимые треки</span>
				<Button
					to="/home/liked"
					variant="alternative"
					size="s"
				>
					Посмотреть всё
				</Button>
			</FlexRow>
			<div className={styles.aside_liked_track_list}>
				<AsideLikedTracks
					tracks={likedTrackList}
					isLoading={tracksLoading}
				/>
			</div>
			<FlexRow style={{ marginTop: 10 }}>
				<span>Любимые артисты</span>
				<Button
					variant={isPopular ? 'accent' : 'alternative'}
					onClick={() => setIsPopular(!isPopular)}
					size="s"
					weight={isPopular ? 'medium' : 'regular'}
					style={{ borderRadius: 100 }}
				>
					Сначала популярные
				</Button>
			</FlexRow>
			<div className={styles.aside_artist_list}>
				<ArtistsGridWrapper $isNoArtists={likedArtists.length === 0}>
					<AsideLikedArtists
						artists={likedArtists}
						isLoading={artistsLoading}
						isPopular={isPopular}
					/>
				</ArtistsGridWrapper>
			</div>
		</AsideBarComponent>
	);
};

export default AsideBar;
