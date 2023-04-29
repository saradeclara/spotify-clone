import { SidebarProps } from "@/types";
import { Box } from "@chakra-ui/react";
import LibraryMenu from "./LibraryMenu";
import NavMenu from "./NavMenu";

const Sidebar = ({
  sidebarMargin,
  updateSidebarMargin,
  margins,
}: SidebarProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 90px)",
        background: "black",
        color: "gray",
        padding: "8px",
      }}
    >
      <NavMenu />
      <LibraryMenu
        sidebarMargin={sidebarMargin}
        updateSidebarMargin={updateSidebarMargin}
        margins={margins}
      />
    </Box>
  );
};

export default Sidebar;
