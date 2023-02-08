import { AUTH_USER, LOGOUT_USER, INFO_USER } from './actionTypes';

let token = localStorage.getItem('token');
export const userReducer = (
	state = [
		{
			isAuth: false,
			name: '',
			email: '',
			token: token || '',
			role: '',
		},
	],
	action
) => {
	switch (action.type) {
		case INFO_USER:
			state = action.data;
			return state;
		case AUTH_USER:
			state = action.data;
			return state;
		case LOGOUT_USER:
			state = action.data;
			return state;
		default:
			return state;
	}
};
