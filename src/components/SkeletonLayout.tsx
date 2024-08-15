import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import MainPlayer from "./BottomPlayer/MainPlayer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { grayMain, spotifyGreen } from "@/styles/colors";
import Loader from "./Loader";

const SkeletonLayout = ({
	sidebarMargin,
	musicPlayerHeight,
}: {
	sidebarMargin: string;
	musicPlayerHeight: string;
}) => {
	return (
		<>
			<Box
				sx={{
					zIndex: 11,
					width: "100vw",
					height: "100vh",
					position: "fixed",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Loader />
			</Box>
			<Box
				sx={{
					position: "fixed",
					zIndex: 10,
					width: "100vw",
					height: "100vh",
					background: "rgba(0,0,0,.5)",
				}}
			></Box>
			<Box width="100vw" height="100vh">
				<Box
					sx={{
						position: "absolute",
						top: "0",
						width: sidebarMargin,
						left: "0",
						background: "black",
					}}
				>
					<Box background="black">
						<Box
							sx={{
								background: grayMain,
								height: "80px",
								margin: "8px",
								borderRadius: "10px",
								padding: "17px",
							}}
						></Box>
						<Box
							sx={{
								background: grayMain,
								height: `calc(100vh - ${musicPlayerHeight} - 80px - 8px - 8px - 8px)`,
								margin: "8px",
								borderRadius: "10px",
							}}
						></Box>
					</Box>
				</Box>
				<Box
					sx={{
						marginLeft: sidebarMargin,
						height: `calc(100vh - ${musicPlayerHeight})`,
						background: "black",
					}}
				>
					<Box
						sx={{
							position: "absolute",
							marginTop: "8px",
							borderRadius: "10px 10px 0px 0px",
							width: `calc(100vw - ${sidebarMargin} - 8px)`,
							height: "60px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0px 30px 0px 20px",
							background: grayMain,
						}}
					></Box>
					<Box
						sx={{
							background: grayMain,
							marginTop: 8 + 60,
							position: "fixed",
							width: `calc(100vw - ${sidebarMargin} - 8px)`,
							height: `calc(100vh - ${musicPlayerHeight} - 60px - 8px - 8px)`,
							borderRadius: "0px 0px 10px 10px",
						}}
					></Box>
				</Box>
				<Box sx={{ position: "absolute", left: "0", bottom: "0" }}>
					<MainPlayer height={musicPlayerHeight} />
				</Box>
			</Box>
		</>
	);
};

export default SkeletonLayout;
