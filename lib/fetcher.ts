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
