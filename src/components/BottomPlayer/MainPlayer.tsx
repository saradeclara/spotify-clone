import { Box } from "@chakra-ui/react";
import { State, useStoreState } from "easy-peasy";
import { RefObject, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { StoreModel, useStoreActions } from "../../../lib/store";
import TrackControls from "./TrackControls";
import TrackDetails from "./TrackDetails";
import TrackOptions from "./TrackOptions";

const MainPlayer = ({ height }: { height: string }) => {
	const [volume, setVolume] = useState(0.5);
	const soundRef: RefObject<ReactHowler> = useRef(null);
	const volumeRef: RefObject<ReactHowler> = useRef(null);

	const activeTrack = useStoreState(
		(store: State<StoreModel>) => store.activeTrack
	);
	const activeTracks = useStoreState(
		(store: State<StoreModel>) => store.activeTracks
	);

	const setActiveTrack = useStoreActions((store) => store.changeActiveTrack);
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
			<TrackDetails activeTrack={activeTrack} />
			<TrackControls
				activeTracks={activeTracks}
				activeTrack={activeTrack}
				setActiveTrack={setActiveTrack}
				volume={volume}
				soundRef={soundRef}
			/>
			<TrackOptions
				volume={volume}
				setVolume={setVolume}
				volumeRef={volumeRef}
			/>
		</Box>
	);
};

export default MainPlayer;
