import { spotifyGreen } from "@/styles/colors";
import { FavouritesProps } from "@/types/favouritesView";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";
import capitalise from "../../lib/capitalise";

const FavouritesGridView = ({ data }: FavouritesProps) => {
	const listItemStyles = {
		display: "flex",
		flexDirection: "column",
		padding: "10px",
		cursor: "pointer",
		width: "150px",
		height: "200px;",
	};

	const textWithEllipsis = {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	};

	const renderFavFeed = (
		categoryType: string,
		feedRecord: any,
		index: number
	) => {
		let component;
		switch (categoryType) {
			case "album":
				component = (
					<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
						<Image
							borderRadius="md"
							boxSize="150px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small" sx={textWithEllipsis}>
								{`${capitalise(feedRecord.Category.description)} \u2022 ${
									feedRecord.artist.name
								}`}
							</Text>
						</Box>
					</ListItem>
				);
				break;
			case "podcast":
				component = (
					<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
						<Image
							borderRadius="md"
							boxSize="150px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small" sx={textWithEllipsis}>
								{`${capitalise(feedRecord.Category.description)} \u2022 ${
									feedRecord.author
								}`}
							</Text>
						</Box>
					</ListItem>
				);
				break;
			case "playlist":
				component = (
					<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
						<Image
							borderRadius="md"
							boxSize="150px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small" sx={textWithEllipsis}>
								{`${capitalise(feedRecord.Category.description)} \u2022 ${
									feedRecord.createdBy.firstName
								} ${feedRecord.createdBy.lastName}`}
							</Text>
						</Box>
					</ListItem>
				);
				break;
			case "artist":
				component = (
					<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
						<Image
							borderRadius="full"
							boxSize="150px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small" sx={textWithEllipsis}>
								{`${capitalise(feedRecord.Category.description)}`}
							</Text>
						</Box>
					</ListItem>
				);
				break;
			default:
				component = null;
				break;
		}

		return component;
	};

	return (
		<Box id="favourites-wrapper" sx={{ display: "flex" }}>
			<List sx={{ display: "flex", flexWrap: "wrap" }}>
				{/* Liked Songs & Your Episodes - Always on Top */}
				<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
					<Image
						borderRadius="md"
						boxSize="150px"
						src="https://i.ibb.co/XJXMs6K/violator.png"
						alt="Liked Songs"
					/>
					<Box sx={{ marginLeft: "10px" }}>
						<Text color="white">Liked Songs</Text>
						<Text fontSize="small" sx={textWithEllipsis}>
							<Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
							{`Playlist \u2022 326 songs`}
						</Text>
					</Box>
				</ListItem>
				<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
					<Image
						borderRadius="md"
						boxSize="150px"
						src="https://i.ibb.co/XJXMs6K/violator.png"
						alt="Liked Songs"
					/>
					<Box>
						<Text color="white">Your Episodes</Text>
						<Text fontSize="small" sx={textWithEllipsis}>
							<Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
							Saved & downloaded Episodes
						</Text>
					</Box>
				</ListItem>
				{data
					? data.map((singleFeedRecord, index) => {
							const categoryType = singleFeedRecord.Category.description;
							if (singleFeedRecord) {
								const component = renderFavFeed(
									categoryType,
									singleFeedRecord,
									index
								);
								return component;
							}
					  })
					: "No Favourites"}
			</List>
		</Box>
	);
};

export default FavouritesGridView;
