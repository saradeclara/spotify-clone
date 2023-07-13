import { createContext } from "react";

export type userColorContextType = {
	r: number;
	g: number;
	b: number;
};

const userColorContextDefault: userColorContextType = {
	r: 0,
	g: 0,
	b: 0,
};

export const UserColorContext = createContext<userColorContextType>(
	userColorContextDefault
);
