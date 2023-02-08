import { AUTH_USER, LOGOUT_USER, INFO_USER } from './actionTypes';

export const loginAction = async (token, data) => {
	return {
		type: AUTH_USER,
		data: {
			token: token,
			email: data.email,
			name: data.name,
			isAuth: true,
			role: data.role,
		},
	};
};

export const logoutAction = (id) => {
	return {
		type: LOGOUT_USER,
		data: { token: '', email: '', name: '', isAuth: false, role: '' },
	};
};

export const getInfoAction = (info) => {
	return {
		type: INFO_USER,
		data: info,
	};
};
