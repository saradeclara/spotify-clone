import SubstringSearchText from "@/components/SubstringSearchText";
import { Box, Image, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../../../lib/capitalise";
import { FeedElement } from "../../../../lib/generateResultGrid";

const ListAlbumElement = ({
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
				_hover={{ backgroundColor: "#1A1A1A" }}
				sx={{
					display: "flex",
					alignItems: "center",
					padding: "10px",
					cursor: "pointer",
				}}
			>
				<Image
					borderRadius="md"
					boxSize="50px"
					src={feedRecord.avatarUrl ?? ""}
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
						<Text as="span" fontSize="small">{`${capitalise(
							feedRecord.category.description
						)} \u2022 `}</Text>
					) : null}

					{feedRecord.artist ? (
						<Text as="span" fontSize="small">
							<SubstringSearchText
								string={feedRecord.artist.name}
								substring={textInput}
							/>
						</Text>
					) : null}
				</Box>
			</ListItem>
		</Link>
	);
};

export default ListAlbumElement;
