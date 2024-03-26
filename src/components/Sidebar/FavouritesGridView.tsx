import { likedSongsCover } from "@/pages/favourites/liked-songs";
import { fetchFavouriteSongs } from "@/react-query/fetch";
import { favouriteSongsKey } from "@/react-query/queryKeys";
import { spotifyGreen } from "@/styles/colors";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show } from "@prisma/client";
import Link from "next/link";
import { AiFillPushpin } from "react-icons/ai";
import { useQuery } from "react-query";
import capitalise from "../../../lib/capitalise";
import pluralise from "../../../lib/pluralise";
import SubstringSearchText from "../SubstringSearchText";

const FavouritesGridView = ({
	data,
	textInput,
}: {
	data: ((Show | Artist | Album | Playlist) & { category: Category })[];
	textInput: string;
}) => {
	const { data: likedSongsData } = useQuery(
		favouriteSongsKey,
		fetchFavouriteSongs
	);
	if (!likedSongsData) return null;

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
		const url = `/${categoryType}/${feedRecord.id}`;

		switch (categoryType) {
			case "album":
				component = (
					<Link key={index} href={url}>
						<ListItem
							key={index}
							_hover={{ backgroundColor: "#1A1A1A" }}
							sx={listItemStyles}
						>
							<Image
								borderRadius="md"
								boxSize="150px"
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									<Text as="span">{`${capitalise(
										feedRecord.category.description
									)} \u2022 `}</Text>
									<Text as="span">
										<SubstringSearchText
											string={feedRecord.artist.name}
											substring={textInput}
										/>
									</Text>
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
							sx={listItemStyles}
						>
							<Image
								borderRadius="md"
								boxSize="150px"
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									<Text as="span">{`${capitalise(
										feedRecord.category.description
									)} \u2022 `}</Text>
									<Text as="span">
										<SubstringSearchText
											string={feedRecord.author}
											substring={textInput}
										/>
									</Text>
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
							sx={listItemStyles}
						>
							<Image
								borderRadius="md"
								boxSize="150px"
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									<Text as="span">{`${capitalise(
										feedRecord.category.description
									)} \u2022 `}</Text>
									<Text as="span">
										<SubstringSearchText
											string={`${feedRecord.createdBy.firstName} ${feedRecord.createdBy.lastName}`}
											substring={textInput}
										/>
									</Text>
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
							sx={listItemStyles}
						>
							<Image
								borderRadius="full"
								boxSize="150px"
								src={feedRecord.avatarUrl}
								alt={feedRecord.name}
							/>
							<Box>
								<Text color="white">
									<SubstringSearchText
										string={feedRecord.name}
										substring={textInput}
									/>
								</Text>
								<Text fontSize="small" sx={textWithEllipsis}>
									{`${capitalise(feedRecord.category.description)}`}
								</Text>
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

	return (
		<Box id="favourites-wrapper" sx={{ display: "flex" }}>
			<List sx={{ display: "flex", flexWrap: "wrap" }}>
				{/* Liked Songs - Always on Top */}
				<Link href="/favourites/liked-songs">
					<ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
						<Image
							borderRadius="md"
							boxSize="150px"
							src={likedSongsCover}
							alt="Liked Songs"
						/>
						<Box sx={{ marginLeft: "10px" }}>
							<Text color="white">Liked Songs</Text>
							<Text fontSize="small" sx={textWithEllipsis}>
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
				{data
					? data.map(
							(
								singleFeedRecord: { category: { description: string } },
								index: number
							) => {
								const categoryType = singleFeedRecord.category.description;
								if (singleFeedRecord) {
									const component = renderFavFeed(
										categoryType,
										singleFeedRecord,
										index
									);
									return component;
								}
							}
					  )
					: "No Favourites"}
			</List>
		</Box>
	);
};

export default FavouritesGridView;
