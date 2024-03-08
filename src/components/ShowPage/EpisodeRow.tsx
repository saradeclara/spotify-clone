import { darkGrayText, lightGrayText } from "@/styles/colors";
import { Box, IconButton, Img, Text } from "@chakra-ui/react";
import { Episode } from "@prisma/client";
import { State } from "easy-peasy";
import { AiFillPlayCircle } from "react-icons/ai";
import convertSeconds from "../../../lib/convertSeconds";
import dateParser from "../../../lib/dateParser";
import { StoreModel, useStoreActions, useStoreState } from "../../../lib/store";

const EpisodeRow = ({
	info,
	showTitle,
	avatarUrl,
}: {
	info: Episode;
	showTitle: string;
	avatarUrl: string | null;
}) => {
	const { title, description, createdAt, duration } = info;
	const createdDate = dateParser(createdAt);

	const activeSong = useStoreState(
		(store: State<StoreModel>) => store.activeSong
	);

	// retrieving actions from the main store
	const setActiveSongs = useStoreActions((store) => store.changeActiveSongs);
	const setActiveSong = useStoreActions((store) => store.changeActiveSong);

	console.log({ createdDate });
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
				<Img width="100px" src={!avatarUrl ? undefined : avatarUrl} />
			</Box>
			<Box sx={{ padding: "0px 10px", flex: "8" }}>
				<Text color="white" fontSize="md" marginBottom="3px">
					{title}
				</Text>
				<Text fontSize="sm" color={lightGrayText} marginBottom="8px">
					{showTitle}
				</Text>
				<Text fontSize="sm" color={darkGrayText} noOfLines={2}>
					{description}
				</Text>
				<Text sx={{ padding: "10px 0px", fontSize: "sm" }} color="white">
					{createdDate?.month.text} {createdDate?.year} {`\u2022`}{" "}
					{convertSeconds(duration, "hhhh mmmm ssss")}
				</Text>
				<IconButton
					outline="none"
					variant="link"
					_hover={{ fontSize: "42px" }}
					color={lightGrayText}
					aria-label="play"
					fontSize="40px"
					icon={<AiFillPlayCircle />}
					// onClick={() => {
					// 	setActiveSong(info);
					// }}
					// onClick={onClick}
					// sx={{
					// 	marginTop: secondaryIcon && isOn ? "5px" : "0px",
					// 	width: width ?? "auto",
					// }}
				/>
			</Box>
		</Box>
	);
};

export default EpisodeRow;
