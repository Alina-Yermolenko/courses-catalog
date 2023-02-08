import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoAction, logoutAction } from '../../store/user/actionCreators';
import { getStoreUser } from '../../selectors';

function Header(props) {
	let dispatch = useDispatch();
	let token = localStorage.getItem('token');
	const user = useSelector(getStoreUser);

	const logoutFunc = async () => {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization': token,
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 200) {
			localStorage.clear();
			props.setToken('');
			dispatch(await logoutAction());
		}
	};

	return (
		<>
			<div className='header'>
				<div className='header__block'>
					<Logo />
					<div className='right__block'>
						<div className='user-name'>{user.name}</div>
						{token ? (
							<Link to={'/login'}>
								<Button buttonText='Logout' onClick={logoutFunc} />
							</Link>
						) : (
							<div></div>
						)}
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}

Header.propTypes = {
	token: PropTypes.string,
	setToken: PropTypes.func,
};

export default Header;
