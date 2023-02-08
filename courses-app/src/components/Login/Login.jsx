import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { loginAction, logoutAction } from '../../store/user/actionCreators';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Login.css';
import { getStoreUser } from '../../selectors';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

function Login(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [newUser, setNewUser] = useState({
		password: '',
		email: '',
	});
	const [divResponse, setDivResponse] = useState('');

	const handleInput = (key, value) => {
		for (let one in newUser) {
			if (one === key) {
				newUser[key] = value;
			}
			setNewUser(newUser);
		}
		return;
	};

	const loginUser = async () => {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (response.status === 201) {
			localStorage.setItem('token', result.result);
			props.setToken(result.result);
			let token = localStorage.getItem('token');
			setDivResponse(result.result);
			const getCoursesStore = async () => {
				const response = await fetch('http://localhost:4000/users/me', {
					method: 'GET',
					headers: {
						// eslint-disable-next-line prettier/prettier
						"Authorization": token,
						'Content-Type': 'application/json',
					},
				});
				let userInfo = await response.json();
				let userData = JSON.stringify(userInfo.result);
				localStorage.setItem('userData', userData);

				dispatch(await loginAction(token, userInfo.result));
				navigate('../courses');
			};
			getCoursesStore();
		}
		if (result.successful === false) {
			setDivResponse(result.errors);
		}
	};

	return (
		<div className='login__block'>
			<h1>Login</h1>
			<form>
				<Input
					labelText='Email'
					name='email'
					id='login-email'
					placeholder='Enter email'
					onChange={(event) => {
						handleInput('email', event.target.value);
					}}
				></Input>
				<Input
					labelText='Password'
					name='password'
					id='login-password'
					placeholder='Enter password'
					onChange={(event) => {
						handleInput('password', event.target.value);
					}}
				></Input>
			</form>
			<Button
				buttonText='Login'
				onClick={() => {
					loginUser();
				}}
				type={'submit'}
				form='loginForm'
			></Button>
			<div>
				If you don't have an account you can{' '}
				<Link to={'/registration'}>register</Link>
			</div>
			<div>{divResponse}</div>
		</div>
	);
}

export default Login;

Login.propTypes = {
	token: PropTypes.string,
	setToken: PropTypes.func,
};
