import FeedWrapper from "@/components/FeedWrapper";
import GradientLayoutPages from "@/components/GradientLayoutPages";
import TopList from "@/components/TopList/TopList";
import { NavBarHeaderContext } from "@/context/NavBarHeader";
import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { Box } from "@chakra-ui/react";
import { Artist, Playlist, User } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect, useState } from "react";
import capitalise from "../../../lib/capitalise";
import { useMe } from "../../../lib/hooks";
import pluralise from "../../../lib/pluralise";
import prisma from "../../../lib/prisma";
import FollowUserButton from "./FollowUserButton";

const UserDashboard = ({
    	user,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [followStatus, updateFollowStatus] = useState(false);
	const { updateHeader } = useContext(NavBarHeaderContext);
	const { updateScrollPosition } = useContext(ScrollPositionContext);
	const { asPath } = useRouter();
	const { isError, isLoading, user: userData } = useMe();

	const userFeedData: { label: string; data: (Artist | Playlist | User)[] }[] =
		[
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
		updateHeader(`${user.firstName} ${user.lastName}`);
	});

	// reset scrollPosition when navigating through pages
	useEffect(() => {
		updateScrollPosition(0);
	}, [asPath]);

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
				{userData.id !== user.id ? (
					<Box sx={{ margin: "30px 0px 0px 30px" }}>
						<FollowUserButton
							followStatus={followStatus}
							updateFollowStatus={updateFollowStatus}
							currentUser={user}
							userFollowing={userData.userFollowing}
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

interface CustomQuery extends ParsedUrlQuery {
	username?: string;
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const customQuery: CustomQuery = context.query;

	const user = await prisma.user.findUnique({
		where: {
			username: customQuery.username,
		},
		include: {
			favouriteSongs: {
				include: { album: true, artist: true, category: true },
			},
			createdPlaylists: { include: { category: true } },
			favouritePlaylists: { include: { category: true } },
			userFollowers: true,
			artistFollowers: {
				include: { albums: true, songs: true, category: true },
			},
			userFollowing: true,
			artistFollowing: {
				include: { albums: true, songs: true, category: true },
			},
		},
	});
	if (user && user.favouriteSongs && user.favouriteSongs) {
		const userWithStats = {
			...user,
			stats: [
				{
					label: "playlist",
					total: user.createdPlaylists.length + user.favouritePlaylists.length,
				},
				{
					label: "follower",
					total: user.userFollowers.length + user.artistFollowers.length,
				},
				{
					label: "following",
					total: user.userFollowing.length + user.artistFollowing.length,
				},
			],
		};
		return {
			props: {
				user: userWithStats,
			},
		};
	}
};

export default UserDashboard;
