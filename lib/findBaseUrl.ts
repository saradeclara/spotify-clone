export const findBaseUrl = () => {
	let baseUrl =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "PRODUCTION_URL";

	return baseUrl;
};
