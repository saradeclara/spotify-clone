import { sidebarMain } from "@/styles/colors";
import { LibraryMenuProps } from "@/types/libraryMenu";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useFavourites, usePlaylist } from "../../lib/hooks";
import FavouritesGridView from "./FavouritesGridView";
import FavouritesListView from "./FavouritesListView";
import LibraryCarousel from "./LibraryCarousel";
import LibraryHeader from "./LibraryHeader";
import SearchLibraryInput from "./SearchLibraryInput";
import SortByFilter from "./SortByFilter";

const LibraryMenu = ({
	sidebarMargin,
	updateSidebarMargin,
	margins,
}: LibraryMenuProps) => {
	const [currentView, toggleView] = useState(0);
	const favouritesViews: string[] = ["list", "grid"];

	const { playlists } = usePlaylist();
	const { favouriteAlbums, favouriteArtists, favouriteShows } = useFavourites();

	const favouritesAndPlaylists = {
		favouriteAlbums,
		favouriteArtists,
		favouriteShows,
		playlists,
	};
	return (
		<Box
			id="libraryMenu"
			sx={{
				borderRadius: "10px",
				backgroundColor: sidebarMain,
				padding: "17px 17px 0px 17px",
				marginTop: "8px",
			}}
		>
			<LibraryHeader
				sidebarMargin={sidebarMargin}
				updateSidebarMargin={updateSidebarMargin}
				margins={margins}
				currentView={currentView}
				toggleView={toggleView}
				favouritesViews={favouritesViews}
			/>
			<LibraryCarousel />
			<Box
				sx={{
					height: "calc(100vh - 354.458px)",
					overflow: "auto",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<SearchLibraryInput />
					<SortByFilter />
				</Box>
				{/* Main Favourites List */}
				<Box sx={{ marginTop: "20px" }}>
					{favouritesViews[currentView] === "list" ? (
						<FavouritesListView data={favouritesAndPlaylists} />
					) : (
						<FavouritesGridView data={favouritesAndPlaylists} />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default LibraryMenu;
