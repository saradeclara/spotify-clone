import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import prisma from "../../../lib/prisma";

const PlaylistPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { playlist } = props;

	const gradientProps = {
		image: playlist.avatarUrl,
		roundAvatar: false,
		description: ["description"],
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
