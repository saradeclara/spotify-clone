import { Mode, Size } from "@/enums/FollowButton";
import { lightGrayText } from "@/styles/colors";
import { Box, Img, Text } from "@chakra-ui/react";
import { Track } from "../../../lib/store";
import FollowButton from "../ShowPage/FollowButton";

const TrackDetails = ({ activeTrack }: { activeTrack: Track | null }) => {
	if (!activeTrack)
		return (
			<Box
				sx={{
					padding: "0px 20px",
					width: "25%",
				}}
			></Box>
		);
	const { thumbnail, name, author } = activeTrack;

	return (
		<Box
			sx={{
				color: lightGrayText,
				padding: "0px 20px",
				width: "25%",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Img
					width="65px"
					borderRadius="5px"
					src={!thumbnail ? undefined : thumbnail}
				/>
				<Box sx={{ width: "150px", paddingLeft: "15px" }}>
					<Text fontSize="sm" noOfLines={2}>
						{name}
					</Text>
					<Text fontSize="xs">{author}</Text>
				</Box>
				<Box>
					<FollowButton
						mode={Mode.Heart}
						size={Size.small}
						categoryArray="favouriteSongs"
						categoryData={activeTrack}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default TrackDetails;
