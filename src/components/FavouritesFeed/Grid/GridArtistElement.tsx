import SubstringSearchText from "@/components/SubstringSearchText";
import { listItemStyles, textWithEllipsis } from "@/styles/globals";
import { Box, Image, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../../../lib/capitalise";
import { FeedElement } from "../../../../lib/generateResultGrid";

const GridArtistElement = ({
	index,
	url,
	textInput,
	feedRecord,
}: {
	index: number;
	url: string;
	textInput: string;
	feedRecord: FeedElement;
}) => {
	return (
		<Link key={index} href={url}>
			<ListItem
				key={index}
				_hover={{ backgroundColor: "#1A1A1A" }}
				sx={listItemStyles}
			>
				<Image
					borderRadius="full"
					boxSize="150px"
					src={feedRecord.avatarUrl}
					alt={feedRecord.name}
				/>
				<Box>
					{feedRecord && feedRecord.name ? (
						<Text color="white">
							<SubstringSearchText
								string={feedRecord.name}
								substring={textInput}
							/>
						</Text>
					) : null}

					{feedRecord && feedRecord.category ? (
						<Text fontSize="small" sx={textWithEllipsis}>
							{`${capitalise(feedRecord.category.description)}`}
						</Text>
					) : null}
				</Box>
			</ListItem>
		</Link>
	);
};

export default GridArtistElement;
