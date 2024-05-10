import FeedWrapper from "@/components/FeedWrapper";
import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { LoggedInUserContext } from "@/context/LoggedInUserContext";
import { fetchCurrentUser } from "@/react-query/fetch";
import { currentUserKey } from "@/react-query/queryKeys";
import { Box } from "@chakra-ui/react";
import { Artist, Playlist, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import capitalise from "../../../lib/capitalise";
import pluralise from "../../../lib/pluralise";
import FollowUserButton from "./FollowUserButton";

const UserDashboard = () => {
	const [followStatus, updateFollowStatus] = useState(false);
	const router = useRouter();

	const loggedInUser = useContext(LoggedInUserContext);
	const urlUsername = router.query.username;

	if (typeof urlUsername !== "string") return null;
	const {
		isLoading,
		isError,
		data: user,
		refetch,
	} = useQuery(currentUserKey, () => fetchCurrentUser(urlUsername));

	if (isLoading) return "Loading...";
	if (isError) return "Something went wrong. Try again.";

	const userFeedData: {
		label: string;
		data: (Artist | Playlist | User)[];
	}[] = [
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

	const renderText = (total: number, label: string, plural: boolean) => {
		return plural
			? `${total} ${capitalise(pluralise(total, label))}`
			: `${total} ${capitalise(label)}`;
	};

	const description = user.stats.map(
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
	}, [router.asPath]);

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
				description={description}
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
