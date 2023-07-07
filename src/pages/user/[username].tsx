import GradientLayoutPages from "@/components/GradientLayoutPages";
import { Box } from "@chakra-ui/react";
import getAverageColor from "get-average-color";
import { useEffect, useState } from "react";
import capitalise from "../../../lib/capitalise";
import { useMe } from "../../../lib/hooks";
import pluralise from "../../../lib/pluralise";

const UserDashboard = (_props: any) => {
	const [currentColor, updateCurrentColor] = useState({ r: 0, g: 0, b: 0 });
	const { user } = useMe();

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
		if (user) {
			getAverageColor(user.avatarUrl).then((rgb: any) => {
				updateCurrentColor(rgb);
				console.log({ rgb });
			}); // { r: 66, g: 83, b: 25 }
		}
	}, []);

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
				color={currentColor}
				roundAvatar={true}
				title={`${user.firstName} ${user.lastName}`}
				subtitle="Profile"
				description={description}
			>
				<Box>hello</Box>
			</GradientLayoutPages>
		</Box>
	);
};

export default UserDashboard;
