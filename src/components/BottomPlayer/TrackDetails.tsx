import { Mode, Size } from "@/enums/FollowButton";
import { lightGrayText } from "@/styles/colors";
import { Box, Img, Text } from "@chakra-ui/react";
import { ExtendedSong } from "../../../lib/store";
import FollowButton from "../ShowPage/FollowButton";

const TrackDetails = ({
	activeSongs,
	activeSong,
}: {
	activeSongs: ExtendedSong[] | null;
	activeSong: ExtendedSong | null;
}) => {
	return (
		<Box
			sx={{
				color: lightGrayText,
				padding: "0px 20px",
				width: "25%",
			}}
		>
			{activeSong ? (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Img
						width="65px"
						borderRadius="5px"
						src={
							!activeSong?.album?.avatarUrl
								? undefined
								: activeSong?.album.avatarUrl
						}
					/>
					<Box sx={{ width: "150px", paddingLeft: "15px" }}>
						<Text fontSize="sm">{activeSong?.name}</Text>
						<Text fontSize="xs">{activeSong?.artist?.name}</Text>
					</Box>
					<Box>
						<FollowButton
							mode={Mode.Heart}
							size={Size.small}
							categoryArray="favouriteSongs"
							categoryData={activeSong}
						/>
					</Box>
				</Box>
			) : null}
		</Box>
	);
};

export default TrackDetails;
