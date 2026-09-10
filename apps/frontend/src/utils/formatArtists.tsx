import type { MouseEvent, ReactNode } from 'react';
import type { ApiArtistRef } from '@music-player/backend';

export function formatArtistNames(artists: ApiArtistRef[]): string {
	return artists.map((artist) => artist.name).join(', ');
}

export interface ArtistButtonsProps {
	artists: ApiArtistRef[];
	onClick?: (artist: ApiArtistRef, event: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	buttonClassName?: string;
	separator?: ReactNode;
}

export function ArtistButtons({
	artists,
	onClick,
	className,
	buttonClassName,
	separator = ', ',
}: ArtistButtonsProps) {

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const artistId = event.currentTarget.dataset.artistId;
        if (!artistId) return;

        const artist = artists.find((artist) => artist.id === +artistId);
        if (!artist) return;
        
        onClick?.(artist, event);
    }

	return (
		<span className={className}>
			{artists.map((artist, index) => (
				<span key={artist.id}>
					<button
                        data-artist-id={artist.id}
						type="button"
						className={buttonClassName}
						onClick={handleClick}
					>
						{artist.name}
					</button>
					{index < artists.length - 1 && separator}
				</span>
			))}
		</span>
	);
}

