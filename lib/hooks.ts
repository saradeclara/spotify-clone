import useSWR from "swr";
import fetcher from "./fetcher";
/**
 * The `useMe` function uses the `useSWR` hook to fetch data from the "/me" endpoint and returns the
 * user data, loading state, and error state.
 * @returns The `useMe` custom hook is being returned, which fetches data from the "/me" endpoint using
 * `useSWR` and returns an object with the user data, loading state, and error state.
 */

export const useMe = () => {
	const { data, error } = useSWR("/me", fetcher);

	return {
		user: data,
		isLoading: !data && !error,
		isError: error,
	};
};
