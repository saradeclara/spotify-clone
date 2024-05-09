import { likedSongsCover } from "@/pages/favourites/liked-songs";
import { spotifyGreen } from "@/styles/colors";
import { Box, Icon, Image, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillPushpin } from "react-icons/ai";
import { FeedElement } from "../../../../lib/generateResultGrid";
import pluralise from "../../../../lib/pluralise";

const ListLikedSongs = ({
	likedSongsData,
}: {
	likedSongsData: FeedElement[];
}) => {
	return (
		<Link href="/favourites/liked-songs">
			<ListItem
				_hover={{ backgroundColor: "#1A1A1A" }}
				sx={{
					display: "flex",
					alignItems: "center",
					padding: "10px",
					cursor: "pointer",
				}}
			>
				<Image
					borderRadius="md"
					boxSize="50px"
					src={likedSongsCover}
					alt="Liked Songs"
				/>
				<Box sx={{ marginLeft: "10px" }}>
					<Text color="white">Liked Songs</Text>
					<Text fontSize="small">
						<Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
						{`Playlist \u2022 ${likedSongsData.length} ${pluralise(
							likedSongsData.length,
							"song"
						)}`}
					</Text>
				</Box>
			</ListItem>
		</Link>
	);
};

export default ListLikedSongs;
