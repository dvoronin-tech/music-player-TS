import { useEffect, useState } from 'react';

export type AppLayout = 'desktop' | 'tablet' | 'mobile';

const mobileQuery = '(max-width: 480px)';
const tabletQuery = '(min-width: 481px) and (max-width: 899px)';

const getLayout = (): AppLayout => {
	if (typeof window === 'undefined') {
		return 'desktop';
	}
	if (window.matchMedia(mobileQuery).matches) {
		return 'mobile';
	}
	if (window.matchMedia(tabletQuery).matches) {
		return 'tablet';
	}
	return 'desktop';
};

export const useLayout = (): AppLayout => {
	const [layout, setLayout] = useState<AppLayout>(getLayout);

	useEffect(() => {
		const mqlMobile = window.matchMedia(mobileQuery);
		const mqlTablet = window.matchMedia(tabletQuery);

		const onChange = () => {
			setLayout(getLayout());
		};

		mqlMobile.addEventListener('change', onChange);
		mqlTablet.addEventListener('change', onChange);

		return () => {
			mqlMobile.removeEventListener('change', onChange);
			mqlTablet.removeEventListener('change', onChange);
		};
	}, []);

	return layout;
};
