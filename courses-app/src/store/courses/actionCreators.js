import {
	GET_COURSES,
	SAVE_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';
import { getCourses } from '../../../../courses-app/src/services';

export const getCoursesAction = async () => {
	return {
		type: GET_COURSES,
		data: await getCourses(),
	};
};

export const deleteCourseAction = (id) => {
	return {
		type: DELETE_COURSE,
		id: id,
	};
};

export const saveCourseAction = (singleCourse) => {
	return {
		type: SAVE_COURSE,
		data: singleCourse,
	};
};

export const updateCourseAction = (singleCourse) => {
	return {
		type: UPDATE_COURSE,
		data: singleCourse,
	};
};
