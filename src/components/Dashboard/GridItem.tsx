import { RecentlyAddedType } from "@/pages";
import { Box, Img } from "@chakra-ui/react";
import Link from "next/link";

const GridItem = ({ item }: { item: RecentlyAddedType }) => {
	return (
		<Box sx={{ flex: "1" }}>
			<Link href="">
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