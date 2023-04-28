import { Dispatch } from "react";
import { IconType } from "react-icons";
import { marginType } from "./playerLayout";

type menuDataType = {
  name: string;
  icon: IconType;
  route: string;
};

type SidebarProps = {
  margins: marginType;
  sidebarMargin: string;
  updateSidebarMargin: Dispatch<React.SetStateAction<string>>;
};

export type { menuDataType, SidebarProps };
