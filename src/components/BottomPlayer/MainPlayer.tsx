import { Box } from "@chakra-ui/react";
import { State, useStoreState } from "easy-peasy";
import { StoreModel, useStoreActions } from "../../../lib/store";
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

	const setActiveSong = useStoreActions((store) => store.changeActiveSong);
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
			<TrackControls
				activeSongs={activeSongs}
				activeSong={activeSong}
				setActiveSong={setActiveSong}
			/>
			<TrackOptions />
		</Box>
	);
};

export default MainPlayer;
