export const addCourseThunk = async (singleCourse, token) => {
	const configCourses = {
		method: 'POST',
		body: JSON.stringify({
			title: singleCourse.title,
			description: singleCourse.description,
			duration: +singleCourse.duration,
			authors: singleCourse.authors,
		}),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
			Accept: '*/*',
		},
	};
	const responseCourses = await fetch(
		`http://localhost:4000/courses/add`,
		configCourses
	);
	let result = await responseCourses.json();

	return result;
};

export const updateCourseThunk = async (singleCourse, token, course) => {
	const configCourse = {
		method: 'PUT',
		body: JSON.stringify({
			title: singleCourse.title,
			description: singleCourse.description,
			duration: +singleCourse.duration,
			authors: singleCourse.authors,
		}),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	};
	const responseCourses = await fetch(
		`http://localhost:4000/courses/${course.id}`,
		configCourse
	);
	let result = await responseCourses.json();

	return result;
};
