import { Box } from "@chakra-ui/react";
import { FeedElement } from "../../lib/generateResultGrid";
import FeedCarousel from "./FeedCarousel";

function FeedWrapper({
	data,
}: {
	data: { label: string; data: FeedElement[] }[];
}) {
	const renderFeed = data.map(
		(singleCarousel: { label: string; data: FeedElement[] }, index) => {
			return <FeedCarousel key={index} feed={singleCarousel} />;
		}
	);
	return <Box sx={{ padding: "30px" }}>{renderFeed}</Box>;
}

export default FeedWrapper;
