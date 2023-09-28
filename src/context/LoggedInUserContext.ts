import { createContext } from "react";

export type loggedInUserContextType = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	avatarUrl?: string;
	isAdmin: boolean;
	favouriteSongs?: any[];
};

const loggedInUserDefault: loggedInUserContextType = {
	id: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	isAdmin: false,
};

export const LoggedInUserContext =
	createContext<loggedInUserContextType>(loggedInUserDefault);
