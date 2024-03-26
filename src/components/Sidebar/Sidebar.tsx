import { Box } from "@chakra-ui/react";
import NavMenu from "../NavMenu";
import LibraryMenu from "./LibraryMenu";

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
