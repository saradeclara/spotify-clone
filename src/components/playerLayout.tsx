import { Box } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { Sidebar } from "./index";
import { marginType } from "@/types";
type PlayerLayoutProps = {
  children: ReactNode;
};

const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  const margins: marginType = {
    sm: "100px",
    md: "420px",
    l: "840px",
  };
  const [sidebarMargin, updateSidebarMargin] = useState(margins.md);

  return (
    <Box width="100vw" height="100vh">
      <Box
        sx={{ position: "absolute", top: "0", width: sidebarMargin, left: "0" }}
      >
        <Sidebar
          margins={margins}
          sidebarMargin={sidebarMargin}
          updateSidebarMargin={updateSidebarMargin}
        />
      </Box>
      <Box
        sx={{
          marginLeft: sidebarMargin,
        }}
      >
        content
        {children}
      </Box>
      <Box sx={{ position: "absolute", left: "0", bottom: "0" }}>player</Box>
    </Box>
  );
};

export default PlayerLayout;
