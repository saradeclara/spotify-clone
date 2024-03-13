import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { Song } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import convertSeconds from "../../../lib/convertSeconds";
import pluralise from "../../../lib/pluralise";
import prisma from "../../../lib/prisma";

const PlaylistPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { playlist } = props;
	let totalLength: number = 0;
	playlist.songs.forEach(
		(el: Song) => (totalLength = totalLength + el.duration)
	);

	const gradientProps = {
		image: playlist.avatarUrl,
		roundAvatar: false,
		description: [
			<Avatar
				size="xs"
				sx={{ border: "2px solid black", marginRight: "5px" }}
				src={playlist.createdBy.avatarUrl ?? undefined}
			/>,
			<Text fontWeight="bold">
				{`${playlist.createdBy.firstName} ${playlist.createdBy.lastName}`}
			</Text>,
			<Text margin="0px 5px">{"\u2022"}</Text>,
			<Text>
				{playlist.songs.length} {pluralise(playlist.songs.length, "song")},
			</Text>,
			<Text marginLeft="5px">
				{convertSeconds(totalLength, "hhhh mmmm ssss")}
			</Text>,
		],
		subtitle: playlist.category.description,
		title: playlist.name,
		...playlist,
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
						items={playlist.songs}
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

export const getServerSideProps = async ({
	query,
}: {
	query: { id: string };
}) => {
	const playlist = await prisma.playlist.findUnique({
		where: {
			id: query.id,
		},
		include: {
			createdBy: true,
			category: true,
			songs: {
				include: {
					album: true,
					artist: true,
					category: true,
				},
			},
		},
	});

	if (playlist) {
		return {
			props: {
				playlist,
			},
		};
	}
};

export default PlaylistPage;
