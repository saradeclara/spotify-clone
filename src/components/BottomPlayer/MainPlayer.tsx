import { Box } from "@chakra-ui/react";
import TrackControls from "./TrackControls";
import TrackDetails from "./TrackDetails";
import TrackOptions from "./TrackOptions";

const MainPlayer = ({ height }: { height: string }) => {
	return (
		<Box
			sx={{
				height,
				width: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<TrackDetails />
			<TrackControls />
			<TrackOptions />
		</Box>
	);
};

export default MainPlayer;
