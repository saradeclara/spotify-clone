import { spotifyGreen } from "@/styles/colors";
import { FavouritesProps } from "@/types/favouritesView";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";
import capitalise from "../../lib/capitalise";

const FavouritesListView = ({ data }: FavouritesProps) => {
	const renderFavFeed = (
		categoryType: string,
		feedRecord: any,
		index: number
	) => {
		let component;
		switch (categoryType) {
			case "album":
				component = (
					<ListItem
						key={index}
						_hover={{ backgroundColor: "#1A1A1A" }}
						sx={{
							display: "flex",
							alignItems: "center",
							padding: "10px",
							cursor: "pointer",
						}}
					>
						<Image
							borderRadius="md"
							boxSize="50px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box sx={{ marginLeft: "10px" }}>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small">{`${capitalise(
								feedRecord.Category.description
							)} \u2022 ${feedRecord.artist.name}`}</Text>
						</Box>
					</ListItem>
				);
				break;
			case "podcast":
				component = (
					<ListItem
						key={index}
						_hover={{ backgroundColor: "#1A1A1A" }}
						sx={{
							display: "flex",
							alignItems: "center",
							padding: "10px",
							cursor: "pointer",
						}}
					>
						<Image
							borderRadius="full"
							boxSize="50px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box sx={{ marginLeft: "10px" }}>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small">{`${capitalise(
								feedRecord.Category.description
							)} \u2022 ${feedRecord.author}`}</Text>
						</Box>
					</ListItem>
				);
				break;
			case "playlist":
				component = (
					<ListItem
						key={index}
						_hover={{ backgroundColor: "#1A1A1A" }}
						sx={{
							display: "flex",
							alignItems: "center",
							padding: "10px",
							cursor: "pointer",
						}}
					>
						<Image
							borderRadius="md"
							boxSize="50px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box sx={{ marginLeft: "10px" }}>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small">{`${capitalise(
								feedRecord.Category.description
							)} \u2022 ${feedRecord.User.firstName} ${
								feedRecord.User.lastName
							}`}</Text>
						</Box>
					</ListItem>
				);
				break;
			case "artist":
				component = (
					<ListItem
						key={index}
						_hover={{ backgroundColor: "#1A1A1A" }}
						sx={{
							display: "flex",
							alignItems: "center",
							padding: "10px",
							cursor: "pointer",
						}}
					>
						<Image
							borderRadius="full"
							boxSize="50px"
							src={feedRecord.thumbnail}
							alt={feedRecord.name}
						/>
						<Box sx={{ marginLeft: "10px" }}>
							<Text color="white">{feedRecord.name}</Text>
							<Text fontSize="small">{`${capitalise(
								feedRecord.Category.description
							)}`}</Text>
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
		<Box id="favourites-wrapper">
			{/* Liked Songs & Your Episodes - Always on Top */}
			<List>
				<ListItem
					_hover={{ backgroundColor: "#1A1A1A" }}
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "10px",
						cursor: "pointer",
					}}
				>
					<Image
						borderRadius="md"
						boxSize="50px"
						src="https://i.ibb.co/XJXMs6K/violator.png"
						alt="Liked Songs"
					/>
					<Box sx={{ marginLeft: "10px" }}>
						<Text color="white">Liked Songs</Text>
						<Text fontSize="small">
							<Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
							{`Playlist \u2022 326 songs`}
						</Text>
					</Box>
				</ListItem>
				<ListItem
					_hover={{ backgroundColor: "#1A1A1A" }}
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "10px",
						cursor: "pointer",
					}}
				>
					<Image
						borderRadius="md"
						boxSize="50px"
						src="https://i.ibb.co/XJXMs6K/violator.png"
						alt="Liked Songs"
					/>
					<Box sx={{ marginLeft: "10px" }}>
						<Text color="white">Your Episodes</Text>
						<Text fontSize="small">
							<Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
							Saved & downloaded Episodes
						</Text>
					</Box>
				</ListItem>
			</List>

			<List>
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

export default FavouritesListView;
