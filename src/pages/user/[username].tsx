import FeedWrapper from "@/components/FeedWrapper";
import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { LoggedInUserContext } from "@/context/LoggedInUserContext";
import { fetchCurrentUser } from "@/react-query/fetch";
import { currentUserKey } from "@/react-query/queryKeys";
import { Box } from "@chakra-ui/react";
import { Artist, Playlist, Song, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import capitalise from "../../../lib/capitalise";
import pluralise from "../../../lib/pluralise";
import FollowUserButton from "./FollowUserButton";
import GradientLayoutLoadingData from "@/components/GradientLayoutLoadingData";

const UserDashboard = () => {
	const [followStatus, updateFollowStatus] = useState(false);
	const router = useRouter();

	const loggedInUser = useContext(LoggedInUserContext);
	const urlUsername = router.query.username;

	type ExtendedUser = User & {
		artistFollowing: Artist[];
		createdPlaylists: Playlist[];
		favouritePlaylists: Playlist[];
		artistFollowers: Artist[];
		userFollowers: User[];
		userFollowing: User[];
		stats: { label: string; total: number }[];
		favouriteSongs: Song[];
	};

	const {
		data: user,
		isLoading,
		refetch,
	} = useQuery<any, any, ExtendedUser>(
		currentUserKey,
		typeof urlUsername === "string"
			? () => fetchCurrentUser(urlUsername)
			: () => {}
	);

	/**
	 * The function `generateUserFeedData` creates a user feed data structure based on the provided user,
	 * label, and data inputs.
	 * @param {ExtendedUser} user - The `user` parameter in the `generateUserFeedData` function is of type
	 * `ExtendedUser`, which likely contains information about a user in your application. This could
	 * include details such as their artist following, created playlists, favorite playlists, user
	 * followers, artist followers, user following, and artist following
	 * @param {string} label - The `label` parameter in the `generateUserFeedData` function is a string
	 * that represents the category or type of data being passed in the `data` parameter. It is used to
	 * categorize and label the data for the user feed.
	 * @param {(Artist | Playlist | User)[]} data - The `data` parameter in the `generateUserFeedData`
	 * function is an array containing objects of type `Artist`, `Playlist`, or `User`.
	 * @returns An array of objects containing user feed data based on the input parameters provided. Each
	 * object in the array includes a label and corresponding data based on the user's top artists,
	 * playlists, followers, and following relationships.
	 */
	const generateUserFeedData = (user: ExtendedUser) => {
		return [
			{
				label: "your top artists",
				data: user.artistFollowing,
			},
			{
				label: "your playlists",
				data: [...user.createdPlaylists, ...user.favouritePlaylists],
			},
			{
				label: "followers",
				data: [...user.userFollowers, ...user.artistFollowers],
			},
			{
				label: "following",
				data: [...user.userFollowing, ...user.artistFollowing],
			},
		];
	};

	const renderText = (total: number, label: string, plural: boolean) => {
		return plural
			? `${total} ${capitalise(pluralise(total, label))}`
			: `${total} ${capitalise(label)}`;
	};

	const description = user?.stats.map(
		(
			singleStat: { total: number; label: string },
			index: number,
			array: { total: number; label: string }[]
		) => {
			return index === array.length - 1
				? singleStat.label === "following"
					? renderText(singleStat.total, singleStat.label, false)
					: renderText(singleStat.total, singleStat.label, true)
				: `${renderText(singleStat.total, singleStat.label, true)}  \u2022 `;
		}
	);

	useEffect(() => {
		refetch();
	}, [refetch, router.asPath]);

	const userFeedData = user ? generateUserFeedData(user) : [];

	if (isLoading) return <GradientLayoutLoadingData />;

	if (user)
		return (
			<Box
				sx={{
					background: "black",
					height: "calc(100vh - 90px)",
					padding: "8px 8px 8px 0px",
				}}
			>
				<GradientLayoutPages
					image={user.avatarUrl}
					roundAvatar={true}
					title={`${user.firstName} ${user.lastName}`}
					subtitle="Profile"
					description={description ?? [""]}
				>
					{/* only show follow button, if user is not current user */}
					{loggedInUser.id !== user.id && loggedInUser.userFollowing ? (
						<Box sx={{ margin: "30px 0px 0px 30px" }}>
							<FollowUserButton
								followStatus={followStatus}
								updateFollowStatus={updateFollowStatus}
								currentUser={user}
								userFollowing={loggedInUser.userFollowing}
							/>
						</Box>
					) : null}
					{user.favouriteSongs && user.favouriteSongs.length > 0 ? (
						<TopList
							heading={`${user.firstName}'s Top Tracks`}
							showFavourites={false}
							showAlbumCovers
							showHeadings={false}
							showArtist
							showDateAdded={false}
							showAlbumColumn={false}
						/>
					) : null}
					<FeedWrapper data={userFeedData} />
				</GradientLayoutPages>
			</Box>
		);
};

export default UserDashboard;
