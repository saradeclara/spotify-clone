import { Box, Heading } from "@chakra-ui/react";
import capitalise from "../../lib/capitalise";
import generateResultGrid, { FeedElement } from "../../lib/generateResultGrid";
import FeedCard from "./FeedCard";

function FeedCarousel({
	feed,
}: {
	feed: { label: string; data: FeedElement[] };
}) {
	const resultGrid = generateResultGrid(feed.data, 6);

	return feed.data.length > 0 ? (
		<Box>
			<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
				{capitalise(feed.label)}
			</Heading>
			<Box>
				{resultGrid.map((singleRow: FeedElement[]) => {
					const gridRow = singleRow.map(
						(singleElement: FeedElement, index, array) => {
							return (
								<FeedCard
									key={index}
									data={singleElement}
									isLast={index === array.length - 1}
								/>
							);
						}
					);

					return (
						<Box marginBottom="20px" display="flex">
							{gridRow}
						</Box>
					);
				})}
			</Box>
		</Box>
	) : null;
}

export default FeedCarousel;
