import { config } from 'dotenv';
import { createDb } from '../src/client.js';
import { artists, artistsToTracks, tracks } from '../src/schema/index.js';
import { catalogSeed } from '../seed/catalog.js';

config();

const db = createDb(process.env.DATABASE_URL);

async function main() {
	const insertedArtists = await db
		.insert(artists)
		.values(
			catalogSeed.artists.map((artist) => ({
				name: artist.name,
				artistImg: artist.artistImg,
				bigImg: artist.bigImg,
			})),
		)
		.returning({ id: artists.id, name: artists.name });

	const artistIdByName = new Map(
		insertedArtists.map((artist) => [artist.name, artist.id]),
	);

	await db.insert(tracks).values(
		catalogSeed.tracks.map((track) => ({
			id: track.id,
			title: track.title,
			albumImg: track.albumImg,
			music: track.music,
			auditions: track.auditions ?? 0,
		})),
	);

	const linkRows = catalogSeed.links.map((link) => {
		const artistId = artistIdByName.get(link.artistName);
		if (artistId === undefined) {
			throw new Error(`Unknown artist in link: ${link.artistName}`);
		}

		return {
			artistId,
			trackId: link.trackId,
		};
	});

	await db.insert(artistsToTracks).values(linkRows);

	console.log(
		`Seeded ${insertedArtists.length} artists, ${catalogSeed.tracks.length} tracks, ${linkRows.length} links`,
	);
	process.exit(0);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
