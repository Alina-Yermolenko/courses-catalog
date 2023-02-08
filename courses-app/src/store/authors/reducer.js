export const authorsReducer = (
	state = [
		{
			name: '',
			id: '',
		},
	],
	action
) => {
	switch (action.type) {
		case 'AUTHORS':
			state = action.data.result;
			return state;
		case 'SAVE_AUTHOR':
			state.push(action.data);
			return state;
		default:
			return state;
	}
};
