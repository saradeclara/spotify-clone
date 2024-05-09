import SubstringSearchText from "@/components/SubstringSearchText";
import { Box, Image, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../../../lib/capitalise";
import { FeedElement } from "../../../../lib/generateResultGrid";

const ListArtistElement = ({
	index,
	url,
	feedRecord,
	textInput,
}: {
	index: number;
	url: string;
	feedRecord: FeedElement;
	textInput: string;
}) => {
	return (
		<Link key={index} href={url}>
			<ListItem
				key={index}
				_hover={{ backgroundColor: "#1A1A1A" }}
				sx={{
					display: "flex",
					alignItems: "center",
					padding: "10px",
					cursor: "pointer",
				}}
			>
				<Image
					borderRadius="full"
					boxSize="50px"
					src={feedRecord.avatarUrl}
					alt={feedRecord.name}
				/>
				<Box sx={{ marginLeft: "10px" }}>
					<Text color="white">
						<SubstringSearchText
							string={feedRecord.name ?? ""}
							substring={textInput}
						/>
					</Text>
					{feedRecord.category ? (
						<Text fontSize="small">{`${capitalise(
							feedRecord.category.description
						)}`}</Text>
					) : null}
				</Box>
			</ListItem>
		</Link>
	);
};

export default ListArtistElement;
