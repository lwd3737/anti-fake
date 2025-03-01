export const json = (data: any, isPretty?: boolean) => {
	if (isPretty) {
		return JSON.stringify(data, null, 2);
	}
	return JSON.stringify(data);
};
