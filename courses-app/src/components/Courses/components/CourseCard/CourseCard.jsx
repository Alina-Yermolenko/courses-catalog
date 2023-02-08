import Button from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import './CourseCard.css';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourseAction } from '../../../../store/courses/actionCreators';
import {
	getStoreCourses,
	getStoreUser,
	renderedAuthors,
} from '../../../../selectors';

function CourseCard(props) {
	const { title, duration, creationDate, description, id } = props.course;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authors = useSelector(renderedAuthors);
	const user = useSelector(getStoreUser);
	const courses = useSelector(getStoreCourses);

	useEffect(() => {
		const getAuthorsStore = async () => {
			dispatch({
				type: 'AUTHORS',
				data: await authorsFromServer(),
			});
		};
		getAuthorsStore();
	}, [dispatch]);

	let token = localStorage.getItem('token');
	let userData = localStorage.getItem('userData');
	userData = JSON.parse(userData);
	let authorsFromServer = async () => {
		const response = await fetch(`http://localhost:4000/authors/all`, {
			method: 'GET',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization': token,
				'Content-Type': 'application/json',
			},
		});
		let result = await response.json();
		return result;
	};

	const findAuthors =
		props.course.authors.map((propsAuthor) => {
			return authors.filter((author) => {
				return author.id === propsAuthor;
			});
		}) || [];

	const courseAuthors =
		findAuthors.map((author) => {
			return author.map((one) => {
				return ' ' + one.name;
			});
		}) + '' || [];

	const deleteCourse = async () => {
		let course = courses.find((course) => {
			return course.id === props.course.id;
		});

		let token = localStorage.getItem('token');
		const response = await fetch(`http://localhost:4000/courses/${course.id}`, {
			method: 'DELETE',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization': token,
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 200) {
			dispatch(deleteCourseAction(id));
		}
	};

	const updateCourse = async () => {
		let course = courses.find((course) => {
			return course.id === props.course.id;
		});
		navigate(`../courses/update/${course.id}`);
	};

	return (
		<li key={id} className='courseCard__item'>
			<div className='block__text'>
				<h1> {title}</h1>
				<p>{description}</p>
			</div>
			<div className='block__info'>
				<p>
					<strong>Authors:</strong> {courseAuthors}
				</p>
				<strong>Duration:</strong> {pipeDuration(duration)} hours
				<p>
					<strong>Created: </strong> {creationDate}
				</p>
				<Link to={props.course.id}>
					<Button buttonText='Show course' />
				</Link>
				{userData.role === 'admin' ? (
					<>
						<Button
							buttonText='Update'
							onClick={() => {
								updateCourse(id);
							}}
						></Button>
						<Button
							buttonText='Delete'
							onClick={() => {
								deleteCourse(id);
							}}
						></Button>
					</>
				) : (
					<div></div>
				)}
			</div>
		</li>
	);
}

CourseCard.propTypes = {
	inputValue: PropTypes.string,
	authorsList: PropTypes.array,
	course: PropTypes.object,
};

export default CourseCard;
