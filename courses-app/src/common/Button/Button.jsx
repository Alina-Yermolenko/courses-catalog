import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
	const { buttonText } = props;
	return (
		<>
			<button
				className='button'
				onClick={props.onClick}
				type={props.type || 'button'}
				form={props.form}
			>
				{buttonText}
			</button>
		</>
	);
}

Button.propTypes = {
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
