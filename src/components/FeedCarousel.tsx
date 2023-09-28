import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import capitalise from "../../lib/capitalise";
import FeedCard from "./FeedCard";

function FeedCarousel({ feed }: { feed: { label: string; data: any[] } }) {
	return feed.data.length > 0 ? (
		<Box>
			<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
				{capitalise(feed.label)}
			</Heading>
			<Box sx={{ display: "flex" }}>
				{feed.data.map((singleElement: any, index, array) => {
					const url = singleElement.Category
						? `/${singleElement.Category.description}/${singleElement.id}`
						: `/${singleElement.id}`;
					return (
						<Link href={url}>
							<FeedCard
								key={index}
								data={singleElement}
								isLast={index === array.length - 1}
							/>
						</Link>
					);
				})}
			</Box>
		</Box>
	) : null;
}

export default FeedCarousel;
