import { Box, Grid, Heading } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../lib/capitalise";
import UserFeedCard from "./UserFeedCard";

function UserFeedCarousel({ feed }: { feed: { label: string; data: any[] } }) {
	return feed.data.length > 0 ? (
		<Box>
			<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
				{capitalise(feed.label)}
			</Heading>
			<Grid templateColumns="repeat(6, 1fr)" gap={6}>
				{feed.data.map((singleElement: any, index) => {
					const url = singleElement.Category
						? `/${singleElement.Category.description}/${singleElement.id}`
						: `/${singleElement.id}`;
					return (
						<Link href={url}>
							<UserFeedCard key={index} data={singleElement} />
						</Link>
					);
				})}
			</Grid>
		</Box>
	) : null;
}

export default UserFeedCarousel;
