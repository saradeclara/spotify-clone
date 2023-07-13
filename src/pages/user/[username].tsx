import GradientLayoutPages from "@/components/GradientLayoutPages";
import UserFeed from "@/components/UserFeed";
import { Box } from "@chakra-ui/react";
import capitalise from "../../../lib/capitalise";
import { useMe } from "../../../lib/hooks";
import pluralise from "../../../lib/pluralise";

const UserDashboard = () => {
	const { user } = useMe();
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
				image={user ? user.avatarUrl : null}
				roundAvatar={true}
				title={`${user.firstName} ${user.lastName}`}
				subtitle="Profile"
				description={description}
			>
				<UserFeed data={userFeedData} />
			</GradientLayoutPages>
		</Box>
	);
};

export default UserDashboard;
