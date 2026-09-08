export const humanizingNumbers = (time: number): string => {
	if (time) {
		const roundedTime = Math.trunc(time);
		const minutes = Math.floor(roundedTime / 60);
		const seconds = roundedTime % 60;

		let minutesStr = '';
		let secondsStr = '';

		if (minutes < 10) {
			minutesStr = `0${minutes}`;
		} else {
			minutesStr = `${minutes}`;
		}

		if (seconds < 10) {
			secondsStr = `0${seconds}`;
		} else {
			secondsStr = `${seconds}`;
		}
		return `${minutesStr}:${secondsStr}`;
	} else {
		return '00:00';
	}
};
