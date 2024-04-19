import { RecentlyAddedType } from "@/pages";
import { Box, Img } from "@chakra-ui/react";
import Link from "next/link";

const GridItem = ({ item }: { item: RecentlyAddedType }) => {
	/**
	 * The function `generateItemUrl` takes a `RecentlyAddedType` item and returns a URL based on its
	 * category and ID.
	 * @param {RecentlyAddedType} item - RecentlyAddedType
	 * @returns `/{category}/{item.id}` url string
	 */
	const generateItemUrl = (item: RecentlyAddedType) => {
		const category =
			item.category.description === "song" ||
			item.category.description === "episode"
				? "track"
				: item.category.description;
		return `/${category}/${item.id}`;
	};

	return (
		<Box sx={{ flex: "1" }}>
			<Link href={generateItemUrl(item)}>
				<Box
					sx={{
						background: "rgba(255,255,255,.3)",
						flex: "1",
						height: "70px",
						borderRadius: "5px",
						marginRight: "10px",
						display: "inline-flex",
						width: "97%",
					}}
				>
					<Box>
						<Img
							height="70px"
							width="70px"
							objectFit="cover"
							borderRadius="5px 0 0 5px"
							src={(item.avatarUrl || item.album?.avatarUrl) ?? undefined}
						/>
					</Box>
					<Box
						sx={{
							height: "70px",
							display: "flex",
							alignItems: "center",
							fontWeight: "bold",
							marginLeft: "10px",
						}}
					>
						{item.name}
					</Box>
				</Box>
			</Link>
		</Box>
	);
};

export default GridItem;
