/**
 * The function `fetcher` sends a GET or POST request to a specified URL with optional data and returns
 * a Promise that resolves to the JSON response.
 * @param {string} url - The `url` parameter is a string representing the endpoint or route to which
 * the fetch request will be made.
 * @param {any} data - The `data` parameter in the `fetcher` function is used to send data in the
 * request body when making a POST request. If no `data` is provided, the request will be a GET
 * request. The `data` parameter is optional and defaults to `undefined`.
 * @returns The `fetcher` function returns a Promise that resolves to the JSON response from the API
 * endpoint. If the response status is not in the range of 200-399, it logs an error message to the
 * console.
 */
export default function fetcher(url: string, data: any = undefined) {
	return fetch(`${window.location.origin}/api${url}`, {
		method: data ? "POST" : "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((response) => {
		if (response.status > 399 || response.status < 200) {
			console.log("Error", new Error());
		}
		return response.json();
	});
}
