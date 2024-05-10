import SubstringSearchText from "@/components/SubstringSearchText";
import { listItemStyles, textWithEllipsis } from "@/styles/globals";
import { Box, Image, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../../../lib/capitalise";
import { FeedElement } from "../../../../lib/generateResultGrid";

const GridAlbumElement = ({
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
				sx={listItemStyles}
			>
				<Image
					borderRadius="md"
					boxSize="150px"
					src={feedRecord.avatarUrl ?? ""}
					alt={feedRecord.name}
				/>
				<Box>
					{feedRecord && feedRecord.name ? (
						<Text color="white" sx={textWithEllipsis}>
							<SubstringSearchText
								string={feedRecord.name}
								substring={textInput}
							/>
						</Text>
					) : null}

					<Text fontSize="small" sx={textWithEllipsis}>
						{feedRecord && feedRecord.category ? (
							<Text as="span">{`${capitalise(
								feedRecord.category.description
							)} \u2022 `}</Text>
						) : null}
						{feedRecord && feedRecord.artist ? (
							<Text as="span">
								<SubstringSearchText
									string={feedRecord.artist.name}
									substring={textInput}
								/>
							</Text>
						) : null}
					</Text>
				</Box>
			</ListItem>
		</Link>
	);
};

export default GridAlbumElement;
