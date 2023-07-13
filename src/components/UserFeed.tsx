import { Box } from "@chakra-ui/react";
import UserFeedCarousel from "./UserFeedCarousel";

function UserFeed({ data }: { data: { label: string; data: any[] }[] }) {
	const renderFeed = data.map(
		(singleCarousel: { label: string; data: any[] }, index) => {
			return <UserFeedCarousel key={index} feed={singleCarousel} />;
		}
	);
	return <Box sx={{ padding: "30px" }}>{renderFeed}</Box>;
}

export default UserFeed;
