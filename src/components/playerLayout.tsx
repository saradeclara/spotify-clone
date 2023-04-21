import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type PlayerLayoutProps = {
  children: ReactNode;
};

const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  return (
    <Box width="100vw" height="100vh">
      <Box sx={{ position: "absolute", top: "0", width: "250px", left: "0" }}>
        sidebar
      </Box>
      <Box
        sx={{
          marginLeft: "250px",
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
