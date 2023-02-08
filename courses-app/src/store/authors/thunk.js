export const addAuthorThunk = async (author, token) => {
	const configAuthors = {
		method: 'POST',
		body: JSON.stringify({
			name: author.name,
		}),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
			Accept: '*/*',
		},
	};
	let responseAuthors = await fetch(
		'http://localhost:4000/authors/add',
		configAuthors
	);
	let result = await responseAuthors.json();

	return result;
};
