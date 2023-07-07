import { marginType } from "@/types";
import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useMe } from "../../lib/hooks";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type PlayerLayoutProps = {
	children: ReactNode;
};

const PlayerLayout = ({ children }: PlayerLayoutProps) => {
	const { user } = useMe();
	const [currentHistoryPos, updateHistoryPos] = useState<{
		current: number;
		len: number;
	}>({ current: 0, len: 1 });

	const margins: marginType = {
		sm: "100px",
		md: "450px",
		l: "840px",
	};
	const [sidebarMargin, updateSidebarMargin] = useState(margins.md);

	useEffect(() => {
		if (window && window.history) {
			if (window.history.length !== currentHistoryPos.len) {
				updateHistoryPos({
					current: window.history.length - 1,
					len: window.history.length,
				});
			}
		}
	});

	return user ? (
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
				<Navbar
					currentHistoryPos={currentHistoryPos}
					updateHistoryPos={updateHistoryPos}
					user={user}
					sidebarMargin={sidebarMargin}
				/>
				{children}
			</Box>
			<Box sx={{ position: "absolute", left: "0", bottom: "0" }}>player</Box>
		</Box>
	) : null;
};

export default PlayerLayout;
