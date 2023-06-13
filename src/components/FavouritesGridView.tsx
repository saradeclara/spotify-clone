import { spotifyGreen } from "@/styles/colors";
import { FavouritesProps } from "@/types/favouritesView";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";

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
				{/* Favourites (Albums, Artists, Podcasts, Songs,...) */}
				{/* {playlists.map(({ thumbnail, name, Category, User }, index) => {
					return (
						<ListItem
							_hover={{ backgroundColor: "#1A1A1A" }}
							sx={listItemStyles}
						>
							<Image
								borderRadius="md"
								boxSize="150px"
								src={thumbnail}
								alt={name}
							/>
							<Box>
								<Text color="white">{name}</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									{`${capitalise(Category.description)} \u2022 ${
										User.firstName
									} ${User.lastName}`}
								</Text>
							</Box>
						</ListItem>
					);
				})}
				{favouriteArtists.map(({ thumbnail, name, Category }, index) => {
					return (
						<ListItem
							_hover={{ backgroundColor: "#1A1A1A" }}
							sx={listItemStyles}
						>
							<Image
								borderRadius="full"
								boxSize="150px"
								src={thumbnail}
								alt={name}
							/>
							<Box>
								<Text color="white">{name}</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									{`${capitalise(Category.description)}`}
								</Text>
							</Box>
						</ListItem>
					);
				})}
				{favouriteAlbums.map(({ thumbnail, name, Category, artist }, index) => {
					return (
						<ListItem
							_hover={{ backgroundColor: "#1A1A1A" }}
							sx={listItemStyles}
						>
							<Image
								borderRadius="md"
								boxSize="150px"
								src={thumbnail}
								alt={name}
							/>
							<Box>
								<Text color="white">{name}</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									{`${capitalise(Category.description)} \u2022 ${artist.name}`}
								</Text>
							</Box>
						</ListItem>
					);
				})}

				{favouriteShows.map(({ thumbnail, name, author, Category }, index) => {
					return (
						<ListItem
							_hover={{ backgroundColor: "#1A1A1A" }}
							sx={listItemStyles}
						>
							<Image
								borderRadius="md"
								boxSize="150px"
								src={thumbnail}
								alt={name}
							/>
							<Box>
								<Text color="white">{name}</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									{`${capitalise(Category.description)} \u2022 ${author}`}
								</Text>
							</Box>
						</ListItem>
					);
				})} */}
			</List>
		</Box>
	);
};

export default FavouritesGridView;
