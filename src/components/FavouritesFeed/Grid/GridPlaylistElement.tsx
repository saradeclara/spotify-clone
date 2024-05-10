import SubstringSearchText from "@/components/SubstringSearchText";
import { listItemStyles, textWithEllipsis } from "@/styles/globals";
import { Box, Image, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../../../lib/capitalise";
import { FeedElement } from "../../../../lib/generateResultGrid";

const GridPlaylistElement = ({
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
				<Box>
					<Image
						borderRadius="md"
						boxSize="150px"
						src={feedRecord.avatarUrl ?? ""}
						alt={feedRecord.name}
					/>
				</Box>

				<Box>
					{feedRecord && feedRecord.name ? (
						<Text color="white">
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

						{feedRecord && feedRecord.createdBy ? (
							<Text as="span">
								<SubstringSearchText
									string={`${feedRecord.createdBy.firstName} ${feedRecord.createdBy.lastName}`}
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

export default GridPlaylistElement;
