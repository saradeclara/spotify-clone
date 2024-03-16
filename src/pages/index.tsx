import FeedCarousel from "@/components/FeedCarousel";
import GradientLayoutMain from "@/components/GradientLayoutMain";
import { Box } from "@chakra-ui/react";
import jwt from "jsonwebtoken";
import { InferGetServerSidePropsType } from "next";
import capitalise from "../../lib/capitalise";
import prisma from "../../lib/prisma";
const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { feed } = props;

	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutMain color="red">
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{Object.values(feed).map(({ label, data }, index) => (
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
					feed: {
						favouriteSongs: {
							label: `${user.firstName}'s top tracks`,
							data: user.favouriteSongs,
						},
						artistFollowing: {
							label: "Your Favourite Artists",
							data: user.artistFollowing,
						},
						favouriteShows: {
							label: `${user.firstName}'s favourite podcasts`,
							data: user?.favouriteShows,
						},

						favouritePlaylists: {
							label: "Your Playlists",
							data: [...user.favouritePlaylists, ...user.createdPlaylists],
						},
					},
				},
			};
		}
	}
};

export default Home;
