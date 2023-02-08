export const getCourses = async () => {
	try {
		let response = await fetch('http://localhost:4000/courses/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		let result = await response.json();
		return result;
	} catch (err) {
		console.error(err);
	}
};
