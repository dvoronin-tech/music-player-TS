export type TrackCountLocale = 'ru' | 'en';

const trackLabels: Record<TrackCountLocale, Record<string, string>> = {
	ru: {
		one: 'трек',
		few: 'трека',
		many: 'треков',
		other: 'треков',
	},
	en: {
		one: 'track',
		other: 'tracks',
	},
};

export function humanizeTrackCount(
	count: number,
	locale: TrackCountLocale,
): string {
	const pluralForm = new Intl.PluralRules(locale).select(count);
	const label = trackLabels[locale][pluralForm] ?? trackLabels[locale].other;
	const formattedCount = new Intl.NumberFormat(locale).format(count);

	return `${formattedCount} ${label}`;
}
