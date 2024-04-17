import { playlistKey } from "@/react-query/queryKeys";
import { lightGrayText } from "@/styles/colors";
import { Box, Button, Image } from "@chakra-ui/react";
import { Album, Artist, Song } from "@prisma/client";
import { useQueryClient } from "react-query";

function ResultList({
	results,
	playlistId,
}: {
	playlistId: string;
	results: (Song & { album: Album; artist: Artist })[];
}) {
	const queryClient = useQueryClient();

	const handleAddSongToPlaylist = async (newSongId: string) => {
		await fetch(`/api/playlist/${playlistId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ newSongId, flag: "add" }),
		}).then(() => {
			queryClient.invalidateQueries(playlistKey);
		});
	};

	return (
		<Box paddingTop="30px">
			{results.map((song, index, array) => {
				return (
					<Box
						width="100%"
						color="white"
						padding="10px 10px"
						borderRadius="10px"
						cursor="pointer"
						sx={{ display: "flex", width: "100%" }}
						_hover={{
							background: "#272727",
							transition: "0.3s all",
						}}
					>
						<Box width="5%">
							<Image
								src={song.album.avatarUrl ?? undefined}
								width="40px"
								borderRadius="5px"
							/>
						</Box>

						<Box width="45%">
							<Box>{song.name}</Box>
							<Box fontSize="small" color={lightGrayText}>
								{song.artist.name}
							</Box>
						</Box>
						<Box width="45%" color={lightGrayText}>
							{song.album.name}
						</Box>
						<Box width="5%">
							<Button
								padding="10px"
								colorScheme="white"
								variant="outline"
								onClick={() => handleAddSongToPlaylist(song.id)}
							>
								Add
							</Button>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
}

export default ResultList;
