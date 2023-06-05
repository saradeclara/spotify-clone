import fetcher from "./fetcher";

export const auth = (
	mode: string,
	body: { email: string; password: string }
) => {
	return fetcher(`/${mode}`, body);
};
