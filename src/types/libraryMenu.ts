import { Dispatch } from "react";

type LibraryHeaderProps = {
	currentView: number;
	toggleView: Dispatch<React.SetStateAction<number>>;
	favouritesViews: string[];
};

export type { LibraryHeaderProps };
