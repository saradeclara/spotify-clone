import { User } from ".prisma/client";
import { LayoutContext } from "@/context/LayoutContext";
import { LoggedInUserContext } from "@/context/LoggedInUserContext";
import { NavBarHeaderContext } from "@/context/NavBarHeader";
import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import { marginType } from "@/types";
import { Box } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMe } from "../../lib/hooks";
import MainPlayer from "./BottomPlayer/MainPlayer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";

const fac = new FastAverageColor();

const queryClient = new QueryClient();

const PlayerLayout = ({ children }: { children: ReactNode }) => {
	const { user } = useMe();

	const defaultUser = {
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		isAdmin: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		username: "",
		avatarUrl: "",
	};
	const [loggedInUser, updateLoggedInUser] = useState<User>(defaultUser);
	const [queryStatus, updateQueryStatus] = useState(false);
	const [header, updateHeader] = useState("");
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

	const musicPlayerHeight: string = "90px";
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
		updateLoggedInUser(user);
		if (user && user.avatarUrl) {
			fac
				.getColorAsync(user.avatarUrl)
				.then((color) => {
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
		<QueryClientProvider client={queryClient}>
			<LoggedInUserContext.Provider
				value={{ ...loggedInUser, updateLoggedInUser }}
			>
				<NavBarHeaderContext.Provider value={{ header, updateHeader }}>
					<LayoutContext.Provider
						value={{
							sidebarMargin,
							updateSidebarMargin,
							margins,
							musicPlayerHeight,
						}}
					>
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
										<Sidebar />
									</Box>
									<Box
										sx={{
											marginLeft: sidebarMargin,
											height: `calc(100vh - ${musicPlayerHeight})`,
											background: "black",
										}}
									>
										<Navbar
											currentHistoryPos={currentHistoryPos}
											updateHistoryPos={updateHistoryPos}
											loggedInUser={user}
										/>
										{children}
									</Box>
									<Box sx={{ position: "absolute", left: "0", bottom: "0" }}>
										<MainPlayer height={musicPlayerHeight} />
									</Box>
								</Box>
							</ScrollPositionContext.Provider>
						</UserColorContext.Provider>
					</LayoutContext.Provider>
				</NavBarHeaderContext.Provider>
			</LoggedInUserContext.Provider>
		</QueryClientProvider>
	) : null;
};

export default PlayerLayout;
