import './App.css';
import Header from './components/Header/Header';
import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CourseForm from './components/CourseForm/CourseForm';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useState } from 'react';
import { PrivateRoute } from './components/PrivateRouter/PrivateRouter';

export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
		1500s, when an unknown printer took a galley of type and scrambled it to make a type
		specimen book. It has survived not only five centuries, but also the leap into electronic Create Courses component.
		typesetting, remaining essentially unchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
		typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
		1500s, when an unknown
		printer took a galley of type and scrambled it to make a type specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const render = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

function App() {
	const [token, setToken] = useState('');
	return (
		<>
			<Header token={token} setToken={setToken} />
			<Routes key={token}>
				{/* <Route path='/' element={}> */}
				<Route path='/courses'>
					<Route
						index
						element={
							<Courses
								courses={mockedCoursesList}
								authors={mockedAuthorsList}
							/>
						}
					/>
					<Route
						path=':id'
						element={
							<CourseInfo
								courses={mockedCoursesList}
								authors={mockedAuthorsList}
								render={render}
							/>
						}
					/>
					<Route
						path='create'
						element={
							<PrivateRoute>
								<CourseForm
									courses={mockedCoursesList}
									authors={mockedAuthorsList}
								/>
							</PrivateRoute>
						}
					/>
					<Route
						path='update/:id'
						element={
							<PrivateRoute>
								<CourseForm
									courses={mockedCoursesList}
									authors={mockedAuthorsList}
								/>
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path='/registration' element={<Registration />}></Route>
				<Route
					path='/login'
					element={<Login token={token} setToken={setToken} />}
				></Route>
				<Route path='/' element={<Navigate to='/login' />}></Route>
				<Route path='*' element={<div>Error</div>}></Route>
				{/* </Route> */}
			</Routes>
		</>
	);
}

export default App;
