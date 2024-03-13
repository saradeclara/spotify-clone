import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { LoggedInUserContext } from "@/context/LoggedInUserContext";
import { fetchFavouriteSongs } from "@/react-query/fetch";
import { favouriteSongsKey } from "@/react-query/queryKeys";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { Song } from "@prisma/client";
import { useContext } from "react";
import { useQuery } from "react-query";
import convertSeconds from "../../../lib/convertSeconds";
import pluralise from "../../../lib/pluralise";

export const likedSongsCover = "https://i.ibb.co/7bxRhFz/rnqa7yhv4il71.webp";

const FavouritePage = () => {
	const { data } = useQuery(favouriteSongsKey, fetchFavouriteSongs);
	const user = useContext(LoggedInUserContext);
	if (!data) return <div key="no-data">No data available</div>;

	let totalLength: number = 0;
	data?.forEach((el: Song) => (totalLength = totalLength + el.duration));

	const gradientProps = {
		image: likedSongsCover,
		roundAvatar: false,
		description: [
			<Avatar
				key="user-avatar"
				size="xs"
				sx={{ border: "2px solid black", marginRight: "5px" }}
				src={user.avatarUrl ?? undefined}
			/>,
			<Text
				key="user-name"
				fontWeight="bold"
			>{`${user.firstName} ${user.lastName}`}</Text>,
			<Text key="separator" margin="0px 5px">
				{"\u2022"}
			</Text>,
			<Text key="n-of-songs">
				{data.length} {pluralise(data.length, "song")},
			</Text>,
			<Text key="total-length" marginLeft="5px">
				{convertSeconds(totalLength, "hhhh mmmm ssss")}
			</Text>,
		],
		subtitle: "Playlist",
		title: "Liked Songs",
	};

	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutPages {...gradientProps}>
				<Box>
					<TopList
						items={data}
						showArtist
						showFavourites
						showAlbumCovers
						showDateAdded
						showAlbumColumn
						showHeadings
					/>
				</Box>
			</GradientLayoutPages>
		</Box>
	);
};

export default FavouritePage;
