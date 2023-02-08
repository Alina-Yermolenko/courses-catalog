import { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';

function Registration() {
	localStorage.clear();
	const [newUser, setNewUser] = useState({
		name: '',
		password: '',
		email: '',
	});

	const [divResponse, setDivResponse] = useState('');
	let navigate = useNavigate();

	const handleInput = (key, value) => {
		for (let one in newUser) {
			if (one === key) {
				newUser[key] = value;
			}
			setNewUser(newUser);
		}
		return;
	};

	const registerUser = async () => {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		if (response.status === 201) {
			navigate('/login');
			setDivResponse(result.result);
		}
		if (result.successful === false) {
			setDivResponse(result.errors);
		}
	};

	return (
		<div className='registration__block'>
			<h1>Registration</h1>
			<form>
				<Input
					labelText='Name'
					name='name'
					id='registration-name'
					placeholder='Enter name'
					onChange={(event) => {
						handleInput('name', event.target.value);
					}}
				></Input>
				<Input
					labelText='Email'
					name='email'
					id='registration-email'
					placeholder='Enter email'
					onChange={(event) => {
						handleInput('email', event.target.value);
					}}
				></Input>
				<Input
					labelText='Password'
					name='password'
					id='registration-password'
					placeholder='Enter password'
					onChange={(event) => {
						handleInput('password', event.target.value);
					}}
				></Input>
			</form>
			<Button
				buttonText='Register'
				onClick={() => {
					registerUser();
				}}
				type={'submit'}
				form='registerForm'
			></Button>
			<div>
				If you have an account you can <Link to={'/login'}>login</Link>
			</div>
			<div>{divResponse}</div>
		</div>
	);
}

export default Registration;
