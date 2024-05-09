import { fetchFavouriteSongs } from "@/react-query/fetch";
import { favouriteSongsKey } from "@/react-query/queryKeys";
import { Box, List } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show } from "@prisma/client";
import { useQuery } from "react-query";
import ListAlbumElement from "../FavouritesFeed/List/ListAlbumElement";
import ListArtistElement from "../FavouritesFeed/List/ListArtistElement";
import ListLikedSongs from "../FavouritesFeed/List/ListLikedSongs";
import ListPlaylistElement from "../FavouritesFeed/List/ListPlaylistElement";
import ListShowElement from "../FavouritesFeed/List/ListShowElement";

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
					<ListAlbumElement
						index={index}
						url={url}
						textInput={textInput}
						feedRecord={feedRecord}
					/>
				);
				break;
			case "show":
				component = (
					<ListShowElement
						index={index}
						url={url}
						textInput={textInput}
						feedRecord={feedRecord}
					/>
				);
				break;
			case "playlist":
				component = (
					<ListPlaylistElement
						index={index}
						url={url}
						textInput={textInput}
						feedRecord={feedRecord}
					/>
				);
				break;
			case "artist":
				component = (
					<ListArtistElement
						index={index}
						url={url}
						textInput={textInput}
						feedRecord={feedRecord}
					/>
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
				<ListLikedSongs likedSongsData={likedSongsData} />
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
