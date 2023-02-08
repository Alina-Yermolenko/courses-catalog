import './Input.css';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<div className='input__block'>
			<label htmlFor={props.labelText}>{props.labelText}</label>
			<input
				type={props.type || 'text'}
				id={props.labelText}
				required={props.required}
				placeholder={props.placeholder}
				onChange={props.onChange}
				defaultValue={props.defaultValue}
				className='input'
			/>
		</div>
	);
}

Input.propTypes = {
	placeholder: PropTypes.string,
	setTerm: PropTypes.func,
	onChange: PropTypes.func,
};

export default Input;
