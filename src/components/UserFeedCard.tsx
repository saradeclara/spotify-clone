import { Avatar, Box, Text } from "@chakra-ui/react";
import capitalise from "../../lib/capitalise";

const UserFeedCard = ({
	data,
}: {
	data: { name: string; thumbnail: string; Category: { description: string } };
}) => {
	return (
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
				{data.name}
			</Text>
			<Text fontSize="sm" marginTop="5px" color="gray">
				{data.Category ? capitalise(data.Category.description) : "Profile"}
			</Text>
		</Box>
	);
};

export default UserFeedCard;
