import { spotifyGreen } from "@/styles/colors";
import { FavouritesProps } from "@/types/favouritesView";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";
import capitalise from "../../lib/capitalise";

const FavouritesListView = ({ data }: FavouritesProps) => {
	const { favouriteAlbums, favouriteArtists, favouriteShows, playlists } = data;
	console.log({ data });
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

			{/* Favourites (Albums, Artists, Podcasts, Playlists,...) */}
			<List>
				{playlists.map(({ thumbnail, name, Category, User }, index) => {
					return (
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
								src={thumbnail}
								alt={name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">{name}</Text>
								<Text fontSize="small">{`${capitalise(
									Category.description
								)} \u2022 ${User.firstName} ${User.lastName}`}</Text>
							</Box>
						</ListItem>
					);
				})}
				{favouriteArtists.map(({ thumbnail, name, Category }, index) => {
					return (
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
								src={thumbnail}
								alt={name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">{name}</Text>
								<Text fontSize="small">{`${capitalise(
									Category.description
								)}`}</Text>
							</Box>
						</ListItem>
					);
				})}
				{favouriteAlbums.map(({ thumbnail, name, Category, artist }, index) => {
					return (
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
								src={thumbnail}
								alt={name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">{name}</Text>
								<Text fontSize="small">{`${capitalise(
									Category.description
								)} \u2022 ${artist.name}`}</Text>
							</Box>
						</ListItem>
					);
				})}

				{favouriteShows.map(({ thumbnail, name, author, Category }, index) => {
					return (
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
								src={thumbnail}
								alt={name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">{name}</Text>
								<Text fontSize="small">{`${capitalise(
									Category.description
								)} \u2022 ${author}`}</Text>
							</Box>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default FavouritesListView;
