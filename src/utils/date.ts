export const formatDateTime = (dateObj?: Date) => {
	const now = dateObj ?? new Date();
	const [year, month, date, hour, minute, second] = [
		now.getFullYear(),
		now.getMonth() + 1,
		now.getDate(),
		now.getHours(),
		now.getMinutes(),
		now.getSeconds(),
	];
	return `${year}-${month}-${date}T${hour}:${minute}:${second}`;
};

export const formatDate = (dateObj?: Date) => {
	const now = dateObj ?? new Date();
	const [year, month, date] = [
		now.getFullYear(),
		now.getMonth() + 1,
		now.getDate(),
	];
	return `${year}. ${month}. ${date}`;
};
