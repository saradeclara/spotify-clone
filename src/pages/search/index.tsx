import { LayoutContext } from "@/context/LayoutContext";
import { grayMain } from "@/styles/colors";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import capitalise from "../../../lib/capitalise";

const Search = (props) => {
	const { sidebarMargin, musicPlayerHeight } = useContext(LayoutContext);
	const browseAllItems = [
		{
			label: "shows",
			color: "red",
		},
		{
			label: "albums",
			color: "green",
		},
		{
			label: "artists",
			color: "blue",
		},
	];
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
				<h1>Search</h1>
				<Heading marginTop="20px" size="lg" color="white">
					Browse all
				</Heading>
				<Box sx={{ paddingTop: "30px", display: "flex" }}>
					{browseAllItems.map(({ label, color }, index, array) => {
						const url = `/${label}`;
						return (
							<Link href={url}>
								<Box
									sx={{
										width: "200px",
										height: "200px",
										backgroundColor: color,
										borderRadius: "20px",
										marginRight: index !== array.length - 1 ? "20px" : "0px",
										padding: "20px",
										overflow: "hidden",
									}}
								>
									<Heading size="lg" color="white">
										{capitalise(label)}
									</Heading>
									<Image
										sx={{
											width: "70%",
											transform: "translate(90px, 60px) rotate(24deg)",
										}}
										src="/thumbnail.jpg"
									/>
								</Box>
							</Link>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default Search;
