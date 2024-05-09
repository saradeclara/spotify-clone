import RecentlyAddedGrid from "@/components/Dashboard/RecentlyAddedGrid";
import FeedCarousel from "@/components/FeedCarousel";
import GradientLayoutMain from "@/components/GradientLayoutMain";
import { getTopItems } from "@/helpers";
import { Box } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Song } from "@prisma/client";
import jwt from "jsonwebtoken";
import { InferGetServerSidePropsType } from "next";
import capitalise from "../../lib/capitalise";
import prisma from "../../lib/prisma";
import { sortRecentlyAdded } from "../../lib/sort";

export type RecentlyAddedType = (Album & Song & Artist & Playlist & Album) & {
	category: Category;
	album: Album;
};

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { carouselFeed, mainFeed } = props;

	/**
	 * The function `generateGridArray` takes an array of `RecentlyAddedType` elements and organizes them
	 * into a grid with each row containing up to 4 elements.
	 * @param {RecentlyAddedType[]} array - The `array` parameter in the `generateGridArray` function is
	 * an array of elements of type `RecentlyAddedType`. The function takes this array and organizes its
	 * elements into a grid structure where each row contains up to 4 elements.
	 * @returns The `generateGridArray` function returns a 2D array where each sub-array contains up to 4
	 * elements from the input `array`.
	 */
	const generateGridArray = (array: RecentlyAddedType[]) => {
		let grid: RecentlyAddedType[][] = [];
		let newRow: RecentlyAddedType[] = [];
		array.map((el) => {
			newRow.push(el);
			if (newRow.length === 4) {
				grid.push(newRow);
				newRow = [];
			}
		});

		return grid;
	};

	const recentlyAddedData: RecentlyAddedType[] = sortRecentlyAdded(
		mainFeed
	).filter((_item, index) => index <= 8);
	const gridData = generateGridArray(recentlyAddedData);

	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutMain color="red">
				<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
					<RecentlyAddedGrid data={gridData} />
					{Object.values(carouselFeed).map(({ label, data }, index) => (
						<Box sx={{ display: "block" }}>
							<FeedCarousel
								key={index}
								feed={{
									label: label
										.split(" ")
										.map((el) => capitalise(el))
										.join(" "),
									data,
								}}
							/>
						</Box>
					))}
				</Box>
			</GradientLayoutMain>
		</Box>
	);
};

export const getServerSideProps = async (context: any) => {
	const { FAKE_SPOTIFY_ACCESS_TOKEN: token } = context.req.cookies;

	const findCurrentUser = async (decodedToken: jwt.JwtPayload) => {
		let user;
		try {
			user = await prisma.user.findUnique({
				where: { id: decodedToken.id },
				include: {
					favouriteShows: { include: { category: true } },
					favouriteAlbums: { include: { category: true } },
					favouritePlaylists: { include: { category: true } },
					createdPlaylists: { include: { category: true } },
					favouriteSongs: { include: { album: true, category: true } },
					artistFollowing: { include: { category: true } },
				},
			});

			if (!user) throw new Error("Unknown User");
		} catch (error) {
			console.error({ error });
		}
		return user;
	};
	if (token) {
		const decodedToken = jwt.verify(token, "hello");

		if (typeof decodedToken !== "string") {
			const user = await findCurrentUser(decodedToken);

			if (!user) return;
			return {
				props: {
					mainFeed: [
						...user?.favouriteAlbums,
						...user?.favouritePlaylists,
						...user?.favouriteSongs,
						...user?.artistFollowing,
						...user?.createdPlaylists,
					],
					carouselFeed: {
						favouritePlaylists: {
							label: "Your Playlists",
							data: getTopItems(
								[...user.favouritePlaylists, ...user.createdPlaylists],
								6
							),
						},
						favouriteAlbums: {
							label: "Top 5 Albums",
							data: getTopItems(user?.favouriteAlbums, 6),
						},
						artistFollowing: {
							label: "Your Favourite Artists",
							data: getTopItems(user.artistFollowing, 6),
						},
						favouriteShows: {
							label: `${user.firstName}'s favourite podcasts`,
							data: getTopItems(user?.favouriteShows, 6),
						},
					},
				},
			};
		}
	}
};

export default Home;
