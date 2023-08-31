import { Dispatch, createContext } from "react";

export type searchQueryContextType = {
	status: boolean;
	updateStatus: Dispatch<React.SetStateAction<boolean>>;
};

const searchQueryContextDefault: searchQueryContextType = {
	status: false,
	updateStatus: () => {},
};

export const SearchQueryContext = createContext<searchQueryContextType>(
	searchQueryContextDefault
);
