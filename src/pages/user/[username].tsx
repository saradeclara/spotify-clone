import GradientLayoutPages from "@/components/GradientLayoutPages";
import UserFeed from "@/components/UserFeed";
import { Box } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import capitalise from "../../../lib/capitalise";
import pluralise from "../../../lib/pluralise";
import prisma from "../../../lib/prisma";

interface CustomUser extends User {
	createdPlaylists: any[];
	followingArtist: any[];
	favouritedPlaylists: any[];
}

const UserDashboard = ({
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	// if (user) {
	const userFeedData: { label: string; data: any[] }[] = [
		{
			label: "your top artists",
			data: user.followingArtist,
		},
		{
			label: "your playlists",
			data: [...user.createdPlaylists, ...user.favouritedPlaylists],
		},
		{
			label: "followers",
			data: [...user.followedBy, ...user.followedByArtist],
		},
		{
			label: "following",
			data: [...user.following, ...user.followingArtist],
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
				<UserFeed data={userFeedData} />
			</GradientLayoutPages>
		</Box>
	);
	// }
};

interface CustomQuery extends ParsedUrlQuery {
	username?: string;
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const customQuery: CustomQuery = context.query;

	// let user: CustomUser | null;
	const user = await prisma.user.findUnique({
		where: {
			username: customQuery.username,
		},
		include: {
			favouritedPlaylists: true,
			followedByArtist: true,
			followingArtist: true,
			createdPlaylists: true,
			followedBy: true,
			following: true,
		},
	});
	if (user) {
		return {
			props: {
				user,
			},
		};
	}
};

export default UserDashboard;
