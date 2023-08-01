const postInfo = async (url, date) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: date,
	});
	return await res.json();
};
//
const getResource = async (url) => {
	const res = await fetch(url);
	//
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	}
	//
	return await res.json();
};

export { postInfo };
export { getResource };
