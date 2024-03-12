import { likedSongsCover } from "@/pages/favourites/liked-songs";
import { fetchFavouriteSongs } from "@/react-query/fetch";
import { favouriteSongsKey } from "@/react-query/queryKeys";
import { spotifyGreen } from "@/styles/colors";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show } from "@prisma/client";
import Link from "next/link";
import { AiFillPushpin } from "react-icons/ai";
import { useQuery } from "react-query";
import capitalise from "../../lib/capitalise";
import pluralise from "../../lib/pluralise";
import SubstringSearchText from "./SubstringSearchText";

const FavouritesListView = ({
	data,
	textInput,
}: {
	data: ((Show | Artist | Album | Playlist) & { category?: Category })[];
	textInput: string;
}) => {
	const renderFavFeed = (
		categoryType: string,
		feedRecord: any,
		index: number
	) => {
		let component;
		const url = `/${categoryType}/${feedRecord.id}`;
		switch (categoryType) {
			case "album":
				component = (
					<Link key={index} href={url}>
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
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text as="span" fontSize="small">{`${capitalise(
									feedRecord.category.description
								)} \u2022 `}</Text>
								<Text as="span" fontSize="small">
									<SubstringSearchText
										string={feedRecord.artist.name}
										substring={textInput}
									/>
								</Text>
							</Box>
						</ListItem>
					</Link>
				);
				break;
			case "show":
				component = (
					<Link key={index} href={url}>
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
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text as="span" fontSize="small">{`${capitalise(
									feedRecord.category.description
								)} \u2022 `}</Text>
								<Text as="span" fontSize="small">
									<SubstringSearchText
										string={feedRecord.author}
										substring={textInput}
									/>
								</Text>
							</Box>
						</ListItem>
					</Link>
				);
				break;
			case "playlist":
				component = (
					<Link key={index} href={url}>
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
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text as="span" fontSize="small">{`${capitalise(
									feedRecord.category.description
								)} \u2022 `}</Text>
								<Text as="span" fontSize="small">
									<SubstringSearchText
										string={`${feedRecord.createdBy.firstName} ${feedRecord.createdBy.lastName}`}
										substring={textInput}
									/>
								</Text>
							</Box>
						</ListItem>
					</Link>
				);
				break;
			case "artist":
				component = (
					<Link key={index} href={url}>
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
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box sx={{ marginLeft: "10px" }}>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text fontSize="small">{`${capitalise(
									feedRecord.category.description
								)}`}</Text>
							</Box>
						</ListItem>
					</Link>
				);
				break;
			default:
				component = null;
				break;
		}

		return component;
	};

	const { data: likedSongsData } = useQuery(
		favouriteSongsKey,
		fetchFavouriteSongs
	);

	if (!likedSongsData) return null;
	if (!data) return null;

	return (
		<Box id="favourites-wrapper">
			{/* Liked Songs - Always on Top */}
			<List>
				<Link href="/favourites/liked-songs">
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
							src={likedSongsCover}
							alt="Liked Songs"
						/>
						<Box sx={{ marginLeft: "10px" }}>
							<Text color="white">Liked Songs</Text>
							<Text fontSize="small">
								<Icon
									marginRight="6px"
									color={spotifyGreen}
									as={AiFillPushpin}
								/>
								{`Playlist \u2022 ${likedSongsData.length} ${pluralise(
									likedSongsData.length,
									"song"
								)}`}
							</Text>
						</Box>
					</ListItem>
				</Link>
			</List>

			<List>
				{data.map((singleFeedRecord, index: number) => {
					if (singleFeedRecord && singleFeedRecord.category) {
						const categoryType = singleFeedRecord.category.description;
						const component = renderFavFeed(
							categoryType,
							singleFeedRecord,
							index
						);
						return component;
					}
				})}
			</List>
		</Box>
	);
};

export default FavouritesListView;
