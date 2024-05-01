/**
 * The function `findBaseUrl` returns the base URL based on the environment (development or
 * production).
 * @returns The `findBaseUrl` function returns the base URL based on the environment.
 */
export const findBaseUrl = () => {
	let baseUrl =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "PRODUCTION_URL";

	return baseUrl;
};
