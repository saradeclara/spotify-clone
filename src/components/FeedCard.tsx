import { Avatar, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../lib/capitalise";
import dateParser from "../../lib/dateParser";
import { Track } from "../../lib/store";

const FeedCard = ({
	data,
	isLast,
}: {
	data: Track & {
		avatarUrl: string;
		firstName?: string;
		lastName?: string;
		releasedOn?: Date;
		album?: { avatarUrl: string };
		username?: string;
		category: { description: string };
	};
	isLast?: boolean;
}) => {
	/**
	 * The function `getCategory` takes a category description as input and returns "track" if the
	 * description is "song".
	 * @param {string} catDescription - catDescription is a parameter of type string that represents the
	 * description of a category.
	 * @returns The function `getCategory` returns "track" if the `catDescription` parameter is equal to
	 * "song", otherwise it returns the `catDescription` parameter as is.
	 */
	const getCategory = (catDescription: string) => {
		return catDescription === "song" ? "track" : catDescription;
	};

	const url = data.category
		? `/${getCategory(data.category.description)}/${data.id}`
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
					src={
						data.category.description === "song"
							? data.album?.avatarUrl
							: data.avatarUrl
					}
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
