import { Dispatch, createContext } from "react";

export type ScrollPositionType = {
	scrollPosition: number;
	updateScrollPosition: Dispatch<React.SetStateAction<number>>;
};

const ScrollPositionDefault: ScrollPositionType = {
	scrollPosition: 0,
	updateScrollPosition: () => {},
};

export const ScrollPositionContext = createContext<ScrollPositionType>(
	ScrollPositionDefault
);
