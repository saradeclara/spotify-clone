import { spotifyGreen } from "@/styles/colors";
import { Box, keyframes } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
	const spin = keyframes`to{transform: rotate(1turn)}`;
	const spinAnimation = `${spin} 1s infinite linear`;

	return (
		<Box
			animation={spinAnimation}
			sx={{
				width: 100,
				height: 100,
				borderRadius: "50%",
				border: "8px solid",
				borderColor: "#E4E4ED",
				borderRightColor: spotifyGreen,
			}}
		></Box>
	);
};

export default Loader;
