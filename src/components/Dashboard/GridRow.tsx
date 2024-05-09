import { RecentlyAddedType } from "@/pages";
import { Box } from "@chakra-ui/react";
import GridItem from "./GridItem";

const GridRow = ({ rowItems }: { rowItems: RecentlyAddedType[] }) => {
	return (
		<Box
			sx={{
				display: "inline-flex",
				width: "100%",
				marginTop: "10px",
				cursor: "pointer",
			}}
		>
			{rowItems.map((item, index) => {
				return <GridItem key={index} item={item} />;
			})}
		</Box>
	);
};

export default GridRow;
