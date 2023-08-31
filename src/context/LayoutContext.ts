import { marginType } from "@/types";
import { Dispatch, createContext } from "react";

const margins: marginType = {
	sm: "100px",
	md: "450px",
	l: "840px",
};

export type layoutContextType = {
	sidebarMargin: string;
	updateSidebarMargin: Dispatch<React.SetStateAction<string>>;
	margins: marginType;
	musicPlayerHeight: string;
};

const layoutContextDefault: layoutContextType = {
	sidebarMargin: margins.md,
	updateSidebarMargin: () => {},
	margins,
	musicPlayerHeight: "90px",
};

export const LayoutContext =
	createContext<layoutContextType>(layoutContextDefault);
