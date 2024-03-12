import { LayoutContext } from "@/context/LayoutContext";
import { fetchFeedData } from "@/react-query/fetch";
import { feedKey } from "@/react-query/queryKeys";
import { grayMain } from "@/styles/colors";
import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { searchText } from "../../lib/sort";
import FavouritesGridView from "./FavouritesGridView";
import FavouritesListView from "./FavouritesListView";
import LibraryCarousel from "./LibraryCarousel";
import LibraryHeader from "./LibraryHeader";
import SearchLibraryInput from "./SearchLibraryInput";
import SortByFilter from "./SortByFilter";

const filters: string[] = [
	"Recents",
	"Recently Added",
	"Alphabetical",
	"Creator",
];

const libraryTags: { name: string; label: string }[] = [
	{ name: "Playlists", label: "playlist" },
	{ name: "Artists", label: "artist" },
	{ name: "Albums", label: "album" },
	{ name: "Podcasts & Shows", label: "show" },
];

const LibraryMenu = () => {
	const [currentView, toggleView] = useState(0);
	const [currentOption, updateOption] = useState(0);
	const [textInput, updateTextInput] = useState("");
	const [currentCat, updateCat] = useState<number | null>(null);
	const favouritesViews: string[] = ["list", "grid"];

	const { sidebarMargin, margins } = useContext(LayoutContext);

	const { data, status } = useQuery(feedKey, fetchFeedData);

	const filteredData = searchText(data, textInput);

	useEffect(() => {
		if (sidebarMargin === margins.l) {
			toggleView(1);
		}
	}, [sidebarMargin]);

	return (
		<Box
			id="libraryMenu"
			sx={{
				borderRadius: "10px",
				backgroundColor: grayMain,
				padding: "17px 17px 0px 17px",
				marginTop: "8px",
			}}
		>
			<LibraryHeader
				currentView={currentView}
				toggleView={toggleView}
				favouritesViews={favouritesViews}
			/>
			<LibraryCarousel
				currentCat={currentCat}
				updateCat={updateCat}
				libraryTags={libraryTags}
			/>
			<Box
				sx={{
					height: "calc(100vh - 346.458px)",
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
					<SearchLibraryInput
						updateTextInput={updateTextInput}
						textInput={textInput}
					/>
					<SortByFilter
						filters={filters}
						currentOption={currentOption}
						updateOption={updateOption}
					/>
				</Box>
				{/* Main Favourites List */}
				<Box sx={{ marginTop: "20px" }}>
					{status === "loading" ? (
						<Text>Loading data...</Text>
					) : status === "error" ? (
						<Text>Error!</Text>
					) : favouritesViews[currentView] === "list" ? (
						<FavouritesListView textInput={textInput} data={filteredData} />
					) : (
						<FavouritesGridView textInput={textInput} data={filteredData} />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default LibraryMenu;
