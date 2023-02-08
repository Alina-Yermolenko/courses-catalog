import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { useState } from 'react';
import './SearchBar.css';
import PropTypes from 'prop-types';

function SearchBar(props) {
	const [inputValue, setInputValue] = useState('');
	let inputHandler = (e) => {
		let lowerCase = e.target.value.toLowerCase();
		setInputValue(lowerCase);
	};

	const buttonHandler = () => {
		props.setTerm(inputValue);
	};

	return (
		<div className='searchBar'>
			<Input
				placeholder='Enter course name...'
				setTerm={props.setTerm}
				onChange={inputHandler}
			/>
			<Button onClick={buttonHandler} buttonText='Search' />
		</div>
	);
}

SearchBar.propTypes = {
	term: PropTypes.string,
	courses: PropTypes.array,
	setTerm: PropTypes.func,
};

export default SearchBar;
