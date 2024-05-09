import GradientLayoutPages from "@/components/GradientLayoutPages";
import AddSongsToPlaylist from "@/components/Playlist/AddSongsToPlaylist";
import TopList from "@/components/TopList/TopList";
import { fetchPlaylist } from "@/react-query/fetch";
import { feedKey, playlistKey } from "@/react-query/queryKeys";
import { spotifyGreen } from "@/styles/colors";
import { Avatar, Box, Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import convertSeconds from "../../../lib/convertSeconds";
import pluralise from "../../../lib/pluralise";

const PlaylistPage = () => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const queryClient = useQueryClient();
	const toast = useToast();

	if (!id || typeof id !== "string") return;

	const { data, isLoading } = useQuery([playlistKey, id], () =>
		fetchPlaylist(id)
	);

	if (isLoading) return <Box>Loading data...</Box>;

	const gradientProps = {
		image: data.avatarUrl,
		roundAvatar: false,
		isTitleEditable: true,
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
				{convertSeconds(data.totalLength, "hhhh mmmm ssss")}
			</Text>,
		],
		subtitle: data.category.description,
		title: data.name,
		...data,
	};

	/**
	 * The function `handleDeletePlaylist` sends a DELETE request to the server to delete a playlist by
	 * its ID and then updates the query cache for playlist and feed data.
	 * @param {string} playlistId - The `playlistId` parameter is a string that represents the unique
	 * identifier of the playlist that needs to be deleted.
	 */
	const handleDeletePlaylist = async (playlistId: string) => {
		const response = await fetch(`/api/playlist/${playlistId}`, {
			method: "DELETE",
		});
		const jsonResponse = await response.json();

		if (jsonResponse) {
			router.push("/");

			queryClient.invalidateQueries(playlistKey);
			queryClient.invalidateQueries(feedKey);

			toast({
				description: `Playlist "${jsonResponse.deletedPlaylist.name}" was successfully deleted`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
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
					<Box sx={{ margin: "30px 0px 0px 30px" }}>
						<Button
							leftIcon={<MdDelete />}
							color={spotifyGreen}
							variant="outline"
							onClick={() => handleDeletePlaylist(id)}
						>
							Delete this playlist
						</Button>
					</Box>
					<TopList
						items={data.songs}
						playlistId={data.id}
						showArtist
						showFavourites
						showAlbumCovers
						showDateAdded
						showAlbumColumn
						showHeadings
						showDeleteCol
					/>
					<AddSongsToPlaylist playlistId={data.id} />
				</Box>
			</GradientLayoutPages>
		</Box>
	);
};

export default PlaylistPage;
