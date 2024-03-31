import { RecentlyAddedType } from "@/pages";
import { Box } from "@chakra-ui/react";
import GridRow from "./GridRow";

const RecentlyAddedGrid = ({ data }: { data: RecentlyAddedType[][] }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
			{data.map((singleRow) => {
				return <GridRow rowItems={singleRow} />;
			})}
		</Box>
	);
};

export default RecentlyAddedGrid;
