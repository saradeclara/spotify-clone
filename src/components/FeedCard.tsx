import { Avatar, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../lib/capitalise";
import dateParser from "../../lib/dateParser";

const FeedCard = ({
	data,
	isLast,
}: {
	data: {
		id: string;
		name: string;
		firstName?: string;
		lastName?: string;
		avatarUrl?: string;
		username?: string;
		releasedOn?: Date;
		category: { description: string };
	};
	isLast?: boolean;
}) => {
	const url = data.category
		? `/${data.category.description}/${data.id}`
		: `/user/${data.username}`;
	return (
		<Link href={url}>
			<Box
				_hover={{
					background: "#272727",
					transition: "0.3s all",
				}}
				sx={{
					padding: "15px",
					background: "#181818",
					width: "180px",
					height: "250px",
					borderRadius: "10px",
					display: "flex",
					flexDirection: "column",
					cursor: "pointer",
					marginRight: isLast ? "0px" : "15px",
				}}
			>
				<Avatar
					sx={{ marginBottom: "20px" }}
					width="150px"
					height="150px"
					borderRadius={
						!data.category || data.category.description === "artist"
							? "full"
							: "5px"
					}
					src={data.avatarUrl}
				/>
				<Text fontWeight="bold" fontSize="sm" color="white">
					{data.category ? data.name : `${data.firstName} ${data.lastName}`}
				</Text>
				<Text fontSize="sm" marginTop="5px" color="gray">
					{data.category && data.category.description === "album"
						? `${dateParser(data.releasedOn)?.year} \u2022 `
						: ""}
					{data.category ? capitalise(data.category.description) : "Profile"}
				</Text>
			</Box>
		</Link>
	);
};

export default FeedCard;
