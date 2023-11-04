import { Box } from "@chakra-ui/react";
import { State, useStoreState } from "easy-peasy";
import { StoreModel } from "../../../lib/store";
import TrackControls from "./TrackControls";
import TrackDetails from "./TrackDetails";
import TrackOptions from "./TrackOptions";

const MainPlayer = ({ height }: { height: string }) => {
	const activeSong = useStoreState(
		(store: State<StoreModel>) => store.activeSong
	);
	const activeSongs = useStoreState(
		(store: State<StoreModel>) => store.activeSongs
	);
	return (
		<Box
			sx={{
				backgroundColor: "black",
				height,
				width: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<TrackDetails activeSongs={activeSongs} activeSong={activeSong} />
			<TrackControls activeSongs={activeSongs} activeSong={activeSong} />
			<TrackOptions />
		</Box>
	);
};

export default MainPlayer;
