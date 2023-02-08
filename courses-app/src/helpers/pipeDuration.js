export function pipeDuration(duration) {
	const minutes = duration % 60;

	const hours = (duration - minutes) / 60;

	const format =
		(hours < 10 ? '0' : '') +
		hours.toString() +
		':' +
		(minutes < 10 ? '0' : '') +
		minutes.toString();

	return format;
}
