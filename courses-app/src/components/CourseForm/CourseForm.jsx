import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { saveCourseAction } from '../../store/courses/actionCreators';
import { saveAuthorAction } from '../../store/authors/actionCreators';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './CourseForm.css';
import {
	getStoreCourses,
	getStoreUser,
	renderedAuthors,
} from '../../selectors';
import { addCourseThunk, updateCourseThunk } from '../../store/courses/thunk';
import { addAuthorThunk } from '../../store/authors/thunk';

function CourseForm(props) {
	let selected = [];

	let navigate = useNavigate();
	let dispatch = useDispatch();
	let token = localStorage.getItem('token');
	const [name, setName] = useState('');
	const [defaultAuthors, setAuthors] = useState(props.authors);
	let [filtered, setFiltered] = useState();
	const [singleCourse, setSingleCourse] = useState({
		id: 0,
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	});

	let urlId = useParams().id;
	const storeCourses = useSelector(getStoreCourses);
	const storeAuthors = useSelector(renderedAuthors);

	let course = storeCourses.find((course) => {
		return course.id === urlId;
	});

	if (course) {
		filtered = defaultAuthors.filter((author) => {
			return course.authors.indexOf(author.id) < 0;
		});
		selected = storeAuthors.filter((author) => {
			return course.authors.indexOf(author.id) >= 0;
		});
	}
	const [selectedAuthors, setSelectedAuthors] = useState(selected);
	useEffect(() => {
		singleCourse.authors = selectedAuthors.map((one) => one.id);
	}, [selectedAuthors, singleCourse]);

	const createOrUpdateCourse = async (callThunk) => {
		if (callThunk === addCourseThunk) {
			if (
				!singleCourse.description ||
				!singleCourse.title ||
				singleCourse.duration === 0 ||
				!singleCourse.authors
			) {
				alert('Please, fill all the data.');
				return;
			}
		}
		let response = await callThunk(singleCourse, token, course);
		if (response.successful) {
			dispatch(saveCourseAction(response.result));
		}
		navigate('/courses');
	};

	const handleInput = (key, value) => {
		for (let one in singleCourse) {
			if (one === key) {
				singleCourse[key] = value;
			}
			if ('duration' === key) {
				singleCourse.duration = value;
			}
		}
		setName(value);
		setSingleCourse({
			...singleCourse,
			creationDate: String(new Date().toLocaleDateString('en-GB')),
			authors: selectedAuthors.map((one) => one.id),
		});
	};

	const checkAuthorInList = async (setList, list, author) => {
		let result = storeAuthors.every((storeAuthor) => {
			return author.id !== storeAuthor.id;
		});

		if (result) {
			addAuthor(setList, list, author);
		} else {
			await setList([...list, { id: author.id, name: author.name }]);
		}
	};

	const addAuthor = async (setList, list, author) => {
		let responseAuthors = await addAuthorThunk(author, token);
		if (responseAuthors.successful) {
			dispatch(saveAuthorAction(responseAuthors.result));
		}
		await setList([
			...list,
			{ id: responseAuthors.result.id, name: responseAuthors.result.name },
		]);
	};

	const deleteAuthor = async (setList, list, author) => {
		await setList(list.filter((a) => a.id !== author.id));
	};

	const createAuthor = () => {
		setAuthors([...defaultAuthors, { name: name }]);
	};

	return (
		<div className='main'>
			<div className='main__block'>
				<div className='title-block'>
					<div className='title-input'>
						<Input
							labelText='Title'
							name='title'
							id='course-title'
							placeholder='Enter title'
							defaultValue={course ? course.title : ''}
							onChange={(event) => {
								handleInput('title', event.target.value);
							}}
							required={true}
						/>
					</div>
					{!urlId ? (
						<Button
							buttonText='Create course'
							onClick={() => {
								createOrUpdateCourse(addCourseThunk);
							}}
							type={'submit'}
						/>
					) : (
						<Button
							buttonText='Update course'
							onClick={() => {
								createOrUpdateCourse(updateCourseThunk);
							}}
							type={'submit'}
						/>
					)}
				</div>
				<div className='description-block'>
					<label htmlFor='course-description'>Description</label>
					<textarea
						name='description'
						id='course-description'
						cols='30'
						rows='10'
						placeholder='Enter description'
						defaultValue={course ? course.description : ''}
						required
						onChange={(event) => {
							handleInput('description', event.target.value);
						}}
					></textarea>
				</div>
				<div className='authors-block'>
					<div className='author-add'>
						<div className='add__author'>
							<h4>Add author</h4>
							<div className='author-input'>
								<Input
									labelText='Author name'
									name='author'
									id='course-author'
									placeholder='Enter author name'
									onChange={(event) => {
										handleInput('author', event.target.value);
									}}
								/>
							</div>
							<Button onClick={createAuthor} buttonText='Create author' />
						</div>
						<div className='duration'>
							<h4>Duration</h4>
							<div className='duration-input'>
								<Input
									labelText='Duration'
									name='duration'
									id='course-duration'
									type='number'
									defaultValue={course ? course.duration : ''}
									placeholder='Enter duration in minutes'
									required={true}
									onChange={(event) => {
										handleInput('duration', event.target.value);
									}}
								/>
							</div>
							<div className='duration-text'>
								Duration:{' '}
								<strong className='duration-time'>
									{parseFloat(singleCourse.duration / 60).toFixed(2)}{' '}
								</strong>
								hours
							</div>
						</div>
					</div>
					<div className='authors-list-block'>
						<h4>Authors</h4>
						<ul>
							{urlId
								? filtered.map((author) => {
										return (
											<li key={author.id}>
												{author.name}
												<Button
													onClick={() => {
														checkAuthorInList(
															setSelectedAuthors,
															selectedAuthors,
															author
														);
														deleteAuthor(setAuthors, defaultAuthors, author);
													}}
													buttonText='Add author'
												/>
											</li>
										);
								  })
								: defaultAuthors.map((author) => {
										return (
											<li key={author.id}>
												{author.name}
												<Button
													onClick={() => {
														checkAuthorInList(
															setSelectedAuthors,
															selectedAuthors,
															author
														);
														deleteAuthor(setAuthors, defaultAuthors, author);
													}}
													buttonText='Add author'
												/>
											</li>
										);
								  })}
						</ul>
						<div className='course-authors'>
							<h4>Course authors</h4>
							<ul>
								{selectedAuthors.length > 0
									? selectedAuthors.map((author) => {
											return (
												<li key={author.id}>
													{author.name}
													<Button
														buttonText='Delete author'
														onClick={() => {
															deleteAuthor(
																setSelectedAuthors,
																selectedAuthors,
																author
															);
															let result = storeAuthors.every((storeAuthor) => {
																return author.id !== storeAuthor.id;
															});
															if (!result) {
																addAuthor(setAuthors, defaultAuthors, author);
															}
														}}
													/>
												</li>
											);
									  })
									: 'Author list is empty'}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

CourseForm.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
};

export default CourseForm;
