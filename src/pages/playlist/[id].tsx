import GradientLayoutPages from "@/components/GradientLayoutPages";
import AddSongsToPlaylist from "@/components/Playlist/AddSongsToPlaylist";
import TopList from "@/components/TopList/TopList";
import { fetchPlaylist } from "@/react-query/fetch";
import { playlistKey } from "@/react-query/queryKeys";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { Song } from "@prisma/client";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import convertSeconds from "../../../lib/convertSeconds";
import pluralise from "../../../lib/pluralise";

const PlaylistPage = (props: any) => {
	const {
		query: { id },
	} = useRouter();

	if (!id || typeof id !== "string") return;

	const { data, isLoading, error } = useQuery([playlistKey, id], () =>
		fetchPlaylist(id)
	);

	console.log({ data });
	if (!data) return;

	let totalLength: number = 0;
	data.songs.forEach((el: Song) => (totalLength = totalLength + el.duration));

	const gradientProps = {
		image: data.avatarUrl,
		roundAvatar: false,
		description: [
			<Avatar
				size="xs"
				sx={{ border: "2px solid black", marginRight: "5px" }}
				src={data.createdBy.avatarUrl ?? undefined}
			/>,
			<Text fontWeight="bold">
				{`${data.createdBy.firstName} ${data.createdBy.lastName}`}
			</Text>,
			<Text margin="0px 5px">{"\u2022"}</Text>,
			<Text>
				{data.songs.length} {pluralise(data.songs.length, "song")},
			</Text>,
			<Text marginLeft="5px">
				{convertSeconds(totalLength, "hhhh mmmm ssss")}
			</Text>,
		],
		subtitle: data.category.description,
		title: data.name,
		...data,
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
						items={data.songs}
						showArtist
						showFavourites
						showAlbumCovers
						showDateAdded
						showAlbumColumn
						showHeadings
					/>
					<AddSongsToPlaylist playlistId={data.id} />
				</Box>
			</GradientLayoutPages>
		</Box>
	);
};

// export const getServerSideProps = async ({
// 	query,
// }: {
// 	query: { id: string };
// }) => {
// 	const playlist = await prisma.playlist.findUnique({
// 		where: {
// 			id: query.id,
// 		},
// 		include: {
// 			createdBy: true,
// 			category: true,
// 			songs: {
// 				include: {
// 					album: true,
// 					artist: true,
// 					category: true,
// 				},
// 			},
// 		},
// 	});

// 	if (playlist) {
// 		return {
// 			props: {
// 				playlist,
// 			},
// 		};
// 	}
// };

export default PlaylistPage;
