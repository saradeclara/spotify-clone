import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import { marginType } from "@/types";
import { Box } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import { ReactNode, useEffect, useState } from "react";
import { useMe } from "../../lib/hooks";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const fac = new FastAverageColor();
type PlayerLayoutProps = {
	children: ReactNode;
};
const PlayerLayout = ({ children }: PlayerLayoutProps) => {
	const { user } = useMe();
	const [currentColor, updateCurrentColor] = useState({ r: 18, g: 18, b: 18 });
	const [scrollPosition, updateScrollPosition] = useState(0);

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

	useEffect(() => {
		if (user && user.avatarUrl) {
			fac
				.getColorAsync(user.avatarUrl)
				.then((color) => {
					console.log("color", color.value);
					const rgbColor = {
						r: color.value[0],
						g: color.value[1],
						b: color.value[2],
					};
					updateCurrentColor(rgbColor);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [user]);

	return user ? (
		<UserColorContext.Provider value={currentColor}>
			<ScrollPositionContext.Provider
				value={{ scrollPosition, updateScrollPosition }}
			>
				<Box width="100vw" height="100vh">
					<Box
						sx={{
							position: "absolute",
							top: "0",
							width: sidebarMargin,
							left: "0",
						}}
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
					<Box sx={{ position: "absolute", left: "0", bottom: "0" }}>
						player
					</Box>
				</Box>
			</ScrollPositionContext.Provider>
		</UserColorContext.Provider>
	) : null;
};

export default PlayerLayout;
