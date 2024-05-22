import { Box } from "@chakra-ui/react";
import React from "react";
import GradientLayoutMain from "./GradientLayoutMain";

const GradientLayoutLoadingData = () => {
	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutMain color="gray" />;
		</Box>
	);
};

export default GradientLayoutLoadingData;
