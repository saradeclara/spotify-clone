const capitalise = (string: string) => {
	console.log({ string });
	return string[0].toUpperCase() + string.slice(1);
};

export default capitalise;
