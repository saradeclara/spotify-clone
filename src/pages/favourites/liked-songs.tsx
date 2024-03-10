import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { fetchFavouriteSongs } from "@/react-query/fetch";
import { favouriteSongsKey } from "@/react-query/queryKeys";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";

export const likedSongsCover = "https://i.ibb.co/7bxRhFz/rnqa7yhv4il71.webp";

const FavouritePage = (props) => {
	const { data } = useQuery(favouriteSongsKey, fetchFavouriteSongs);

	const info = {
		title: "Liked Songs",
		thumbnail: likedSongsCover,
		description: [""],
		subtitle: "Playlist",
	};
	const gradientProps = {
		image: info.thumbnail,
		roundAvatar: false,
		description: info.description,
		subtitle: info.subtitle,
		title: info.title,
	};

	// console.log({ data });

	// let topListItems: Track[] = query.cat === 'episodes' ? [...data].map(el => { id: el.id; thumbnail: el.avatarUrl; author: el.})

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
						items={data}
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

// export const getServerSideProps = async (
// 	context: GetServerSidePropsContext
// ) => {
// 	// const response = await fetch("http://localhost:3000/api/favouritesongs");
// 	// const jsonData = await response.json();

// 	// console.log({ jsonData });
// 	let info;
// 	switch (context.query.cat) {
// 		case "songs":
// 			info = {
// 				title: "Liked Songs",
// 				thumbnail: "https://i.ibb.co/7bxRhFz/rnqa7yhv4il71.webp",
// 				description: [""],
// 				subtitle: "Playlist",
// 			};
// 			break;
// 		case "episodes":
// 			info = {
// 				title: "Your Episodes",
// 				thumbnail: "https://i.ibb.co/TPwSWwd/rnqa7yhv4il71.jpg",
// 				description: [""],
// 				subtitle: "Playlist",
// 			};
// 	}
// 	return {
// 		props: {
// 			info,
// 		},
// 	};
// };
// export const getServerSideProps = async (context: GetServerSideProps) => {
// const baseUrl = findBaseUrl();
// const response = await fetch(baseUrl + "/api/favouritesongs");
// if (!response.ok) throw new Error("Failed to fetch data");
// console.log("json", response.json());
// const user = await prisma.user.findUnique({
// 	where: {
// 		username: "saradc88",
// 	},
// });

// const favouriteSongs = await fetch(baseUrl + "/api/me");
// console.log({ favouriteSongs });

// console.log(user);
// };

// interface CustomQuery extends ParsedUrlQuery {
// 	username?: string;
// 	params: any;
// }

// export const getServerSideProps = async (
// 	context: GetServerSidePropsContext
// ) => {
// 	console.log({ context });
// 	const customQuery: any = context.params;
//     const user = useContext()
// 	return {
// 		props: {
// 			result: { query: customQuery },
// 		},
// 	};
// };
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			username: customQuery.username,
// 		},
// 		include: {
// 			favouriteSongs: {
// 				include: { album: true, artist: true, category: true },
// 			},
// 			createdPlaylists: { include: { category: true } },
// 			favouritePlaylists: { include: { category: true } },
// 			userFollowers: true,
// 			artistFollowers: {
// 				include: { albums: true, songs: true, category: true },
// 			},
// 			userFollowing: true,
// 			artistFollowing: {
// 				include: { albums: true, songs: true, category: true },
// 			},
// 		},
// 	});
// 	if (user && user.favouriteSongs && user.favouriteSongs) {
// 		const userWithStats = {
// 			...user,
// 			stats: [
// 				{
// 					label: "playlist",
// 					total: user.createdPlaylists.length + user.favouritePlaylists.length,
// 				},
// 				{
// 					label: "follower",
// 					total: user.userFollowers.length + user.artistFollowers.length,
// 				},
// 				{
// 					label: "following",
// 					total: user.userFollowing.length + user.artistFollowing.length,
// 				},
// 			],
// 		};
// 		return {
// 			props: {
// 				user: userWithStats,
// 			},
// 		};
// 	}
// };
// const currentUser = await prisma.user.findUnique({
// 	where: {
// 		id: query.id,
// 	},
// 	include: {
// 		category: true,
// 		songs: {
// 			include: {
// 				album: true,
// 				artist: true,
// 				category: true,
// 			},
// 		},
// 	},
// });

// if (playlist) {
// 	return {
// 		props: {
// 			playlist,
// 		},
// 	};
// }

export default FavouritePage;
