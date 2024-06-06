import { Box } from "@chakra-ui/react";
import React from "react";
import Loader from "../Loader";

const FavouritesLoadingData = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "450px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Loader />
		</Box>
	);
};

export default FavouritesLoadingData;
