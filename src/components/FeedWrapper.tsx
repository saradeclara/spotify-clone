import { Box } from "@chakra-ui/react";
import FeedCarousel from "./FeedCarousel";

function FeedWrapper({ data }: { data: { label: string; data: any[] }[] }) {
	const renderFeed = data.map(
		(singleCarousel: { label: string; data: any[] }, index) => {
			return <FeedCarousel key={index} feed={singleCarousel} />;
		}
	);
	return <Box sx={{ padding: "30px" }}>{renderFeed}</Box>;
}

export default FeedWrapper;
