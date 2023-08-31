import { Avatar, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../lib/capitalise";

const UserFeedCard = ({
	data,
	isLast,
}: {
	data: {
		id: string;
		name: string;
		firstName?: string;
		lastName?: string;
		thumbnail: string;
		username?: string;
		Category: { description: string };
	};
	isLast?: boolean;
}) => {
	const url = data.Category
		? `/${data.Category.description}/${data.id}`
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
					borderRadius="full"
					src={data.thumbnail}
				/>
				<Text fontWeight="bold" fontSize="sm" color="white">
					{data.Category ? data.name : `${data.firstName} ${data.lastName}`}
				</Text>
				<Text fontSize="sm" marginTop="5px" color="gray">
					{data.Category ? capitalise(data.Category.description) : "Profile"}
				</Text>
			</Box>
		</Link>
	);
};

export default UserFeedCard;
