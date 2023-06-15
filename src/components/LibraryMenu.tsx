import { sidebarMain } from "@/styles/colors";
import { LibraryMenuProps } from "@/types/libraryMenu";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFeed } from "../../lib/hooks";
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
	{ name: "Podcasts & Shows", label: "podcast" },
];

const LibraryMenu = ({
	sidebarMargin,
	updateSidebarMargin,
	margins,
}: LibraryMenuProps) => {
	const [currentView, toggleView] = useState(0);
	const [currentOption, updateOption] = useState(0);
	const [textInput, updateTextInput] = useState("");
	const [currentCat, updateCat] = useState<number | null>(null);
	const favouritesViews: string[] = ["list", "grid"];

	const { data, isLoading, error } = useFeed({
		sort: filters[currentOption],
		search: textInput,
		catFilter: currentCat === null ? null : libraryTags[currentCat].label,
	});

	useEffect(() => {
		if (sidebarMargin === margins.l) {
			toggleView(1);
		}
	}, [sidebarMargin]);

	useEffect(() => {}, [textInput]);

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
			<LibraryCarousel
				currentCat={currentCat}
				updateCat={updateCat}
				libraryTags={libraryTags}
			/>
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
					{data ? (
						favouritesViews[currentView] === "list" ? (
							<FavouritesListView data={data} />
						) : (
							<FavouritesGridView data={data} />
						)
					) : null}
				</Box>
			</Box>
		</Box>
	);
};

export default LibraryMenu;
