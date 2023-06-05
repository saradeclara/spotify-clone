import { Dispatch } from "react";
import { marginType } from "./playerLayout";

type LibraryMenuProps = {
	margins: marginType;
	sidebarMargin: string;
	updateSidebarMargin: Dispatch<React.SetStateAction<string>>;
};

type LibraryHeaderProps = {
	margins: marginType;
	sidebarMargin: string;
	updateSidebarMargin: Dispatch<React.SetStateAction<string>>;
	currentView: number;
	toggleView: Dispatch<React.SetStateAction<number>>;
	favouritesViews: string[];
};

export type { LibraryMenuProps, LibraryHeaderProps };
