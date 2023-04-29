import { marginType } from "./playerLayout";
import { Dispatch } from "react";

type LibraryMenuProps = {
  margins: marginType;
  sidebarMargin: string;
  updateSidebarMargin: Dispatch<React.SetStateAction<string>>;
};

export type { LibraryMenuProps };
