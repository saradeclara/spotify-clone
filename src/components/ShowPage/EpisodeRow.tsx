import { darkGrayText, lightGrayText, spotifyGreen } from "@/styles/colors";
import { Box, IconButton, Img, Text } from "@chakra-ui/react";
import { State } from "easy-peasy";
import { AiFillPlayCircle } from "react-icons/ai";
import convertSeconds from "../../../lib/convertSeconds";
import dateParser from "../../../lib/dateParser";
import {
	StoreModel,
	Track,
	useStoreActions,
	useStoreState,
} from "../../../lib/store";

const EpisodeRow = ({
	info,
	collection,
}: {
	info: Track;
	collection: Track[];
}) => {
	const { thumbnail, name, author, description, duration } = info;
	const createdDate = dateParser(info.createdAt);

	const activeTrack = useStoreState(
		(store: State<StoreModel>) => store.activeTrack
	);

	// retrieving actions from the main store
	const setActiveTracks = useStoreActions((store) => store.changeActiveTracks);
	const setActiveTrack = useStoreActions((store) => store.changeActiveTrack);

	return (
		<Box
			sx={{
				padding: "20px",
				borderTop: `1px solid ${darkGrayText}`,
				width: "80%",
				display: "flex",
			}}
		>
			<Box sx={{ flex: "1" }}>
				<Img width="100px" src={!thumbnail ? undefined : thumbnail} />
			</Box>
			<Box sx={{ padding: "0px 10px", flex: "8" }}>
				<Text
					color={activeTrack?.name === name ? spotifyGreen : "white"}
					fontSize="md"
					marginBottom="3px"
				>
					{name}
				</Text>
				<Text fontSize="sm" color={lightGrayText} marginBottom="8px">
					{author}
				</Text>
				<Text fontSize="sm" color={darkGrayText} noOfLines={2}>
					{description}
				</Text>
				<Text sx={{ padding: "10px 0px", fontSize: "sm" }} color="white">
					{createdDate?.month.text} {createdDate?.year} {`\u2022`}{" "}
					{convertSeconds(duration, "hhhh mmmm ssss")}
				</Text>
				<Box
					sx={{ display: "flex", justifyContent: "flex-end", height: "50px" }}
				>
					<IconButton
						outline="none"
						variant="link"
						_hover={{ fontSize: "42px" }}
						color={lightGrayText}
						aria-label="play"
						fontSize="40px"
						icon={<AiFillPlayCircle />}
						onClick={() => {
							setActiveTrack(info);
							setActiveTracks(collection);
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default EpisodeRow;
