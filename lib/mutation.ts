import fetcher from "./fetcher";

/**
 * The `auth` function sends a fetch request with the specified mode and body parameters.
 * @param {string} mode - The `mode` parameter in the `auth` function is a string that specifies the
 * authentication mode. It could be used to determine whether the user is trying to log in, sign up,
 * reset password, or perform any other authentication-related action.
 * @param body - The `body` parameter in the `auth` function is an object with two properties: `email`
 * and `password`. The `email` property is a string that represents the user's email address, and the
 * `password` property is a string that represents the user's password. These values are
 * @returns The `auth` function is returning the result of calling the `fetcher` function with the
 * parameters `/` and `body`.
 */
export const auth = (
	mode: string,
	body: { email: string; password: string }
) => {
	return fetcher(`/${mode}`, body);
};
