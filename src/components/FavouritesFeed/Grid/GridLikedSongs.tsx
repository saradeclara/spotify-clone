import { likedSongsCover } from "@/pages/favourites/liked-songs";
import { spotifyGreen } from "@/styles/colors";
import { listItemStyles, textWithEllipsis } from "@/styles/globals";
import { Box, Icon, Image, ListItem, Text } from "@chakra-ui/react";
import { Song } from "@prisma/client";
import Link from "next/link";
import { AiFillPushpin } from "react-icons/ai";
import pluralise from "../../../../lib/pluralise";

const GridLikedSongs = ({ likedSongsData }: { likedSongsData: Song[] }) => {
	return (
		<Link href="/favourites/liked-songs">
			<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
				<Image
					borderRadius="md"
					width="150px"
					height="150px"
					src={likedSongsCover}
					alt="Liked Songs"
				/>
				<Box sx={{ marginLeft: "10px" }}>
					<Text color="white">Liked Songs</Text>
					<Text fontSize="small" sx={textWithEllipsis}>
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

export default GridLikedSongs;
