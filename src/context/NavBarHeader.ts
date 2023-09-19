import { Dispatch, createContext } from "react";

export type NavBarHeaderType = {
	header: string;
	updateHeader: Dispatch<React.SetStateAction<string>>;
};

const NavBarHeaderDefault: NavBarHeaderType = {
	header: "",
	updateHeader: () => {},
};

export const NavBarHeaderContext =
	createContext<NavBarHeaderType>(NavBarHeaderDefault);
