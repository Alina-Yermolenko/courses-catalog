import {
	UPDATE_COURSE,
	GET_COURSES,
	DELETE_COURSE,
	SAVE_COURSE,
} from './actionTypes';

export const coursesReducer = (
	state = [
		{
			id: '',
			title: '',
			description: ``,
			creationDate: '',
			duration: 0,
			authors: [''],
		},
	],
	action
) => {
	switch (action.type) {
		case GET_COURSES:
			state = action.data.result;
			return state;
		case DELETE_COURSE:
			return state.filter((one) => {
				return one.id !== action.id;
			});
		case SAVE_COURSE:
			state.push(action.data);
			return state;
		case UPDATE_COURSE:
			state = action.data;
			return state;

		default:
			return state;
	}
};
