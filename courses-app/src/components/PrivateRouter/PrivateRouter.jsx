import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getStoreUser } from '../../selectors';

export const PrivateRoute = ({ children }) => {
	let userData = localStorage.getItem('userData');
	userData = JSON.parse(userData);
	let user = useSelector(getStoreUser);
	let logged = userData.role === 'admin';

	if (!logged) {
		return <Navigate to='/courses' />;
	}

	return children;
};
