function ordinalSuffix(day: number): string {
	if (day % 10 === 1 && day !== 11) {
		return day + 'st';
	} else if (day % 10 === 2 && day !== 12) {
		return day + 'nd';
	} else if (day % 10 === 3 && day !== 13) {
		return day + 'rd';
	} else {
		return day + 'th';
	}
}

export function formatDate(isoDateString: string): string {
	const date = new Date(isoDateString);
	const day = date.getDate();
	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December',
	];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	return `${ordinalSuffix(day)} of ${month} ${year}`;
}
