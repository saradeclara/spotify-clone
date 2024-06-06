import { Box, keyframes } from "@chakra-ui/react";
import React from "react";
import GradientLayoutMain from "./GradientLayoutMain";
import { transform } from "typescript";
import { spotifyGreen } from "@/styles/colors";
import Loader from "./Loader";

const GradientLayoutLoadingData = () => {
	return (
		<>
			<Box
				sx={{
					width: "70%",
					height: "90%",
					position: "fixed",
					background: "black",
					opacity: "0.2",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Loader />
			</Box>
			<Box
				sx={{
					background: "black",
					height: "calc(100vh - 90px)",
					padding: "8px 8px 8px 0px",
				}}
			>
				<GradientLayoutMain color="gray" />;
			</Box>
		</>
	);
};

export default GradientLayoutLoadingData;
