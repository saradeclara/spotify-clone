import { fetchFavouriteSongs } from "@/react-query/fetch";
import { favouriteSongsKey } from "@/react-query/queryKeys";
import { Box, List } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FeedElement } from "../../../lib/generateResultGrid";
import GridAlbumElement from "../FavouritesFeed/Grid/GridAlbumElement";
import GridArtistElement from "../FavouritesFeed/Grid/GridArtistElement";
import GridLikedSongs from "../FavouritesFeed/Grid/GridLikedSongs";
import GridPlaylistElement from "../FavouritesFeed/Grid/GridPlaylistElement";
import GridShowElement from "../FavouritesFeed/Grid/GridShowElement";

const FavouritesGridView = ({
	data,
	textInput,
}: {
	data: FeedElement[];
	textInput: string;
}) => {
	const { data: likedSongsData } = useQuery(
		favouriteSongsKey,
		fetchFavouriteSongs
	);
	if (!likedSongsData) return null;

	const renderFavFeed = (
		categoryType: string,
		feedRecord: FeedElement,
		index: number
	) => {
		let component;
		const url = `/${categoryType}/${feedRecord.id}`;

		switch (categoryType) {
			case "album":
				component = (
					<GridAlbumElement
						index={index}
						url={url}
						feedRecord={feedRecord}
						textInput={textInput}
					/>
				);
				break;
			case "show":
				component = (
					<GridShowElement
						index={index}
						url={url}
						feedRecord={feedRecord}
						textInput={textInput}
					/>
				);
				break;
			case "playlist":
				component = (
					<GridPlaylistElement
						index={index}
						url={url}
						feedRecord={feedRecord}
						textInput={textInput}
					/>
				);
				break;
			case "artist":
				component = (
					<GridArtistElement
						index={index}
						url={url}
						feedRecord={feedRecord}
						textInput={textInput}
					/>
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
				<GridLikedSongs likedSongsData={likedSongsData} />

				{/* Favourites Feed */}
				{data
					? data.map((singleFeedRecord, index: number) => {
							const categoryType = singleFeedRecord?.category?.description;
							if (singleFeedRecord && categoryType) {
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
