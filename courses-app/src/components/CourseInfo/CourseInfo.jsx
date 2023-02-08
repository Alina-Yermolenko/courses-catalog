import Button from '../../common/Button/Button';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CourseInfo.css';
import { useSelector } from 'react-redux';
import { getStoreCourses, renderedAuthors } from '../../selectors';

function CourseInfo() {
	const { id } = useParams();
	const courses = useSelector(getStoreCourses);

	const course = courses.find((course) => {
		return course.id === id;
	});
	const render = useSelector(renderedAuthors);

	const findAuthors =
		course.authors.map((propsAuthor) => {
			return render.filter((author) => {
				return author.id === propsAuthor;
			});
		}) || [];

	const authors = findAuthors.map(([one]) => ' ' + one.name).toString();

	return (
		<div className='courseInfo__block'>
			<Link to='/courses'>
				<Button className='button' buttonText='<  Back to courses' />
			</Link>
			<h1>{course.title}</h1>
			<div className='data'>
				<div className='course__text-block'>
					<p>{course.description}</p>
				</div>
				<div className='course__data-block'>
					<div>
						<strong>ID: </strong>
						{course.id}
					</div>
					<div>
						<strong>Duration: </strong>
						{course.duration}
					</div>
					<div>
						<strong>Created: </strong>
						{course.creationDate}
					</div>
					<div>
						<strong>Authors: </strong>
						{authors}{' '}
					</div>
				</div>
			</div>
		</div>
	);
}

CourseInfo.propTypes = {
	render: PropTypes.array,
	authors: PropTypes.array,
	courses: PropTypes.array,
};

export default CourseInfo;
