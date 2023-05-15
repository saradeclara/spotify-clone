import fetcher from "./fetcher";

export const auth = (
	mode: ModeEnum,
	method: string,
	body: { email: string; password: string }
) => {
	return fetcher(`/${mode}`, method, body);
};
