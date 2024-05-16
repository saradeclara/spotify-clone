import { playlistKey } from "@/react-query/queryKeys";
import { lightGrayText } from "@/styles/colors";
import { Box, Button, Image, useToast } from "@chakra-ui/react";
import { Album, Artist, Song } from "@prisma/client";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

function ResultList({
	results,
	playlistId,
}: {
	playlistId: string;
	results: (Song & { album: Album; artist: Artist })[];
}) {
	const [isAddingLoading, toggleAddingLoading] = useState<boolean | null>(null);
	const [lastSongAdded, updateLastSongAdded] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const toast = useToast();

	const handleAddSongToPlaylist = async (newSongId: string) => {
		toggleAddingLoading(true);

		await fetch(`/api/playlist/${playlistId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ newSongId, flag: "add" }),
		}).then(async (response) => {
			queryClient.invalidateQueries(playlistKey);

			const json = await response.json();
			const { newSong } = json;
			updateLastSongAdded(newSong.name);

			toggleAddingLoading(false);
		});
	};

	useEffect(() => {
		if (lastSongAdded) {
			if (isAddingLoading) {
				toast({
					title: "Loading...",
					status: "loading",
					duration: 2000,
					isClosable: true,
				});
			} else {
				toast({
					title: `${lastSongAdded} was added to your playlist.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
		}
	}, [isAddingLoading, lastSongAdded, toast]);

	useEffect(() => {}, [lastSongAdded]);

	return (
		<Box paddingTop="30px">
			{results.map((song, index) => {
				return (
					<Box
						key={index}
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
								alt="No Thumbnail"
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
