import UserFeedCard from "@/components/UserFeedCard";
import { LayoutContext } from "@/context/LayoutContext";
import { grayMain } from "@/styles/colors";
import { Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import { useContext } from "react";
import prisma from "../../lib/prisma";

const CategoryFeed = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { sidebarMargin, musicPlayerHeight } = useContext(LayoutContext);
	const { items } = props;
	return (
		<Box sx={{ height: "100%", background: "black" }}>
			<Box
				sx={{
					width: `calc(100vw - ${sidebarMargin} - 8px)`,
					position: "absolute",
					marginTop: "8px",
					background: grayMain,
					borderRadius: "10px",
					height: `calc(100vh - ${musicPlayerHeight} - 8px - 8px )`,
					padding: "30px",
				}}
			>
				<Box sx={{ marginTop: "50px", display: "flex" }}>
					{items.map((item) => {
						return <UserFeedCard data={item} />;
					})}
				</Box>
			</Box>
		</Box>
	);
};

export const getServerSideProps = async (context: any) => {
	const { params } = context;

	let items: any[] = [];
	switch (params.category) {
		case "podcasts":
			items = await prisma.show.findMany({
				include: {
					Category: true,
				},
			});
			break;
		case "artists":
			items = await prisma.artist.findMany({
				include: {
					Category: true,
				},
			});
			break;
		case "albums":
			items = await prisma.album.findMany({
				include: {
					Category: true,
				},
			});
			break;
		default:
			break;
	}

	return {
		props: {
			items,
		},
	};
};

export default CategoryFeed;
