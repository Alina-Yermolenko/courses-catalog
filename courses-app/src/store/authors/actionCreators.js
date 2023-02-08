export const getAuthorsAction = async () => {
	return {
		type: 'AUTHORS',
	};
};

export const saveAuthorAction = (data) => {
	return {
		type: 'SAVE_AUTHOR',
		data: data,
	};
};
