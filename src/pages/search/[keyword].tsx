import FeedCarousel from "@/components/FeedCarousel";
import { LayoutContext } from "@/context/LayoutContext";
import { grayMain } from "@/styles/colors";
import { Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import { useContext } from "react";
import { FeedElement } from "../../../lib/generateResultGrid";
import prisma from "../../../lib/prisma";

const Search = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const {
		result: { allAlbums, allArtists, allPlaylists, allShows, allUsers },
	} = props;
	const { sidebarMargin, musicPlayerHeight } = useContext(LayoutContext);

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
					height: `calc(100vh - ${musicPlayerHeight} - 60px - 8px - 8px)`,
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
				{allUsers.length > 0 ? (
					<FeedCarousel feed={{ label: "users", data: allUsers }} />
				) : null}
			</Box>
		</Box>
	);
};

export const getServerSideProps = async ({ query }: { query: any }) => {
	let allUsers: FeedElement[] = await prisma.user.findMany({
		where: {
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
				{
					username: {
						contains: query.keyword,
						mode: "insensitive",
					},
				},
			],
		},
	});

	let allArtists: FeedElement[] = await prisma.artist.findMany({
		include: {
			category: true,
		},
		where: {
			name: {
				contains: query.keyword,
				mode: "insensitive",
			},
		},
	});

	let allAlbums: FeedElement[] = await prisma.album.findMany({
		include: {
			artist: true,
			category: true,
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

	let allShows: FeedElement[] = await prisma.show.findMany({
		include: {
			category: true,
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

	let allPlaylists: FeedElement[] = await prisma.playlist.findMany({
		include: {
			createdBy: true,
			category: true,
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

	if (allAlbums && allArtists && allPlaylists && allShows && allUsers) {
		const result = {
			allAlbums,
			allArtists,
			allPlaylists,
			allShows,
			allUsers,
		};
		return {
			props: {
				result,
			},
		};
	}
};

export default Search;
