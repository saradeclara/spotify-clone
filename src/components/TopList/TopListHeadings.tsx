import { lightGrayText } from "@/styles/colors";
import { Box, ListItem, OrderedList } from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";

const TopListHeadings = ({
	width,
	colStyles,
	showFavourites,
	showAlbumColumn,
	showDateAdded,
}: {
	width: string;
	colStyles: { marginLeft?: string };
	showFavourites: boolean;
	showAlbumColumn: boolean;
	showDateAdded: boolean;
}) => {
	console.log(
		"headings",
		showDateAdded,
		showAlbumColumn,
		showDateAdded && showAlbumColumn ? 2 : 10
	);
	return (
		<OrderedList
			sx={{
				color: lightGrayText,
				marginLeft: "0px",
				width,
				fontSize: "sm",
				borderBottom: `1px solid rgba(255,255,255,.3)`,
				marginBottom: "20px",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					padding: "10px 20px",
				}}
			>
				<Box width="20px" color={lightGrayText} marginRight="20px">
					#
				</Box>
				<ListItem
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Box
						width="100%"
						sx={{
							...colStyles,
							display: "flex",
							alignItems: "center",
							color: lightGrayText,
						}}
					>
						<Box
							sx={{
								flex: showDateAdded && showAlbumColumn ? 2 : 10,
								display: "flex",
							}}
						>
							<Box
								sx={{
									display: "block",
									margin: "auto 0",
								}}
							>
								<Box>Title</Box>
							</Box>
						</Box>
						{showAlbumColumn ? <Box sx={{ flex: 1 }}>Album</Box> : null}
						{showDateAdded ? <Box sx={{ flex: 1 }}>Date added</Box> : null}

						{showFavourites ? (
							<Box
								sx={{
									flex: 1,
									display: "flex",
									justifyContent: "center",
								}}
								cursor="pointer"
							></Box>
						) : null}

						<Box
							sx={{
								flex: 1,
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<BiTimeFive />
						</Box>
					</Box>
				</ListItem>
			</Box>
		</OrderedList>
	);
};

export default TopListHeadings;
