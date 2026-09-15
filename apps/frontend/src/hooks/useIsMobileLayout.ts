import { useEffect, useState } from 'react';

export const mobileLayoutMediaQuery = '(max-width: 480px)';

export const useIsMobileLayout = () => {
	const [isMobile, setIsMobile] = useState(
		() => window.matchMedia(mobileLayoutMediaQuery).matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(mobileLayoutMediaQuery);
		const onChange = () => setIsMobile(mediaQuery.matches);

		onChange();
		mediaQuery.addEventListener('change', onChange);
		return () => mediaQuery.removeEventListener('change', onChange);
	}, []);

	return isMobile;
};
