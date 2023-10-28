import FeedCarousel from "@/components/FeedCarousel";
import { LayoutContext } from "@/context/LayoutContext";
import { SearchQueryContext } from "@/context/SearchQueryContext";
import { grayMain } from "@/styles/colors";
import { Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import { useContext, useEffect } from "react";
import prisma from "../../../lib/prisma";

const Search = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const {
		result: { allAlbums, allArtists, allPlaylists, allShows },
	} = props;
	const { updateStatus } = useContext(SearchQueryContext);
	const { sidebarMargin, musicPlayerHeight } = useContext(LayoutContext);

	useEffect(() => {
		updateStatus(false);
	}, []);

	return (
		<Box
			sx={{
				width: `calc(100vw - ${sidebarMargin} - 8px)`,
				position: "absolute",
				marginTop: "8px",
				background: grayMain,
				borderRadius: "10px",
				height: `calc(100vh - ${musicPlayerHeight} - 8px - 8px )`,
			}}
		>
			<Box
				sx={{
					marginTop: "60px",
					paddingLeft: "20px",
					overflowY: "auto",
					height: `calc(100vh - ${musicPlayerHeight} - 60px - 8px)`,
				}}
			>
				{allAlbums.length > 0 ? (
					<FeedCarousel feed={{ label: "albums", data: allAlbums }} />
				) : null}
				{allPlaylists.length > 0 ? (
					<FeedCarousel feed={{ label: "playlists", data: allPlaylists }} />
				) : null}
				{allArtists.length > 0 ? (
					<FeedCarousel feed={{ label: "artists", data: allArtists }} />
				) : null}
				{allShows.length > 0 ? (
					<FeedCarousel feed={{ label: "shows", data: allShows }} />
				) : null}
			</Box>
		</Box>
	);
};

export const getServerSideProps = async ({ query }: { query: any }) => {
	let allArtists = await prisma.artist.findMany({
		include: {
			Category: true,
		},
		where: {
			name: {
				contains: query.keyword,
				mode: "insensitive",
			},
		},
	});

	let allAlbums = await prisma.album.findMany({
		include: {
			artist: true,
			Category: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: query.keyword,
						mode: "insensitive",
					},
				},
				{
					artist: {
						name: {
							contains: query.keyword,
							mode: "insensitive",
						},
					},
				},
			],
		},
	});

	let allShows = await prisma.show.findMany({
		include: {
			Category: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: query.keyword,
						mode: "insensitive",
					},
				},
				{
					author: {
						contains: query.keyword,
						mode: "insensitive",
					},
				},
			],
		},
	});

	let allPlaylists = await prisma.playlist.findMany({
		include: {
			createdBy: true,
			Category: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: query.keyword,
						mode: "insensitive",
					},
				},
				{
					createdBy: {
						OR: [
							{
								firstName: {
									contains: query.keyword,
									mode: "insensitive",
								},
							},
							{
								lastName: {
									contains: query.keyword,
									mode: "insensitive",
								},
							},
						],
					},
				},
			],
		},
	});

	if (allAlbums && allArtists && allPlaylists && allShows) {
		const result = { allAlbums, allArtists, allPlaylists, allShows };
		return {
			props: {
				result,
			},
		};
	}
};

export default Search;
