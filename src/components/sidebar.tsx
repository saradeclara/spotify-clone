import { Box } from "@chakra-ui/react";
import LibraryMenu from "./LibraryMenu";
import NavMenu from "./NavMenu";

const Sidebar = () => {
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
			<LibraryMenu />
		</Box>
	);
};

export default Sidebar;
