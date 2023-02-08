import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { getCoursesAction } from '../../store/courses/actionCreators';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './Courses.css';
import { getStoreCourses, getStoreUser } from '../../selectors';
import { getInfoAction } from '../../store/user/actionCreators';
function Courses(props) {
	const dispatch = useDispatch();
	let [term, setTerm] = useState('');
	const courses = useSelector(getStoreCourses);
	const user = useSelector(getStoreUser);

	useEffect(() => {
		const getCoursesStore = async () => {
			dispatch(await getCoursesAction());
		};
		getCoursesStore();
	}, []);

	let token = localStorage.getItem('token');
	let userData = localStorage.getItem('userData');
	userData = JSON.parse(userData);
	let filteredCourses = courses.filter((course) => {
		if (
			course.title.toLowerCase().includes(term) ||
			course.id.toLowerCase().includes(term)
		) {
			return course;
		}
		// eslint-disable-next-line array-callback-return
		return;
	});

	const courseCard = filteredCourses.map((course, index) => (
		<CourseCard inputValue={term} course={course} key={index} />
	));
	return (
		<div className='courses'>
			<div className='courses__block'>
				<div className='buttons__block'>
					<SearchBar term={term} setTerm={setTerm} courses={courses} />
					{userData.role === 'admin' ? (
						<Link to='create'>
							<Button buttonText='Add new course' />
						</Link>
					) : (
						<div></div>
					)}
				</div>
				<ul className='courseCard__list'>{courseCard}</ul>
			</div>
		</div>
	);
}

Courses.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
};
export default Courses;
