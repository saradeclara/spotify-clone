import { LayoutContext } from "@/context/LayoutContext";
import { feedKey } from "@/react-query/queryKeys";
import { menuDataType } from "@/types";
import { LibraryHeaderProps } from "@/types/libraryMenu";
import {
	Box,
	Link,
	List,
	ListIcon,
	ListItem,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
	MdAdd,
	MdArrowBack,
	MdArrowForward,
	MdFormatListBulleted,
	MdGridView,
	MdLibraryBooks,
} from "react-icons/md";
import { useQueryClient } from "react-query";

function LibraryHeader({
	currentView,
	toggleView,
	favouritesViews,
}: LibraryHeaderProps) {
	const router = useRouter();

	const libraryListItem: menuDataType = {
		name: "Your Library",
		icon: MdLibraryBooks,
		route: "/library",
	};
	const { sidebarMargin, updateSidebarMargin, margins } =
		useContext(LayoutContext);
	const queryClient = useQueryClient();

	/**
	 * The function `handleExpandReduceLibrary` toggles between two sidebar margin sizes and forces a list
	 * view on a specific margin size.
	 */
	const handleExpandReduceLibrary = () => {
		if (sidebarMargin === margins.md) {
			updateSidebarMargin(margins.l);
		} else {
			updateSidebarMargin(margins.md);
			// forcing list view on md view
			toggleView(0);
		}
	};

	/**
	 * The function `handleToggleView` toggles between two views by updating the current view state.
	 */
	const handleToggleView = () => {
		toggleView(currentView === 0 ? 1 : 0);
	};

	/**
	 * The function `handleCreatePlaylist` sends a POST request to create a new playlist via an API, then
	 * redirects to the newly created playlist and invalidates the main feed query..
	 */
	const handleCreatePlaylist = async () => {
		const newPlaylist = await fetch("/api/playlist", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			referrerPolicy: "no-referrer",
		});
		const newPlaylistJson = await newPlaylist.json();

		if (newPlaylistJson) {
			router.push(`/playlist/${newPlaylistJson.id}`);
			queryClient.invalidateQueries(feedKey);
		}
	};

	return (
		<List sx={{ height: "32px" }} spacing={5}>
			<ListItem
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
				fontSize={16}
			>
				<Link
					_hover={{ color: "white" }}
					as={NextLink}
					href={libraryListItem.route}
				>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ListIcon fontSize={30} marginRight={5} as={libraryListItem.icon} />
						<Text fontWeight="bold">{libraryListItem.name}</Text>
					</Box>
				</Link>
				<Box display="flex">
					<Tooltip boxShadow="md" label="Create playlist" placement="top">
						<Box>
							<ListIcon
								_hover={{ color: "white" }}
								fontSize={30}
								cursor="pointer"
								as={MdAdd}
								onClick={handleCreatePlaylist}
							/>
						</Box>
					</Tooltip>
					{sidebarMargin === margins.l ? (
						favouritesViews[currentView] === "list" ? (
							<Tooltip label="Switch to grid view" placement="top">
								<Box>
									<ListIcon
										_hover={{ color: "white" }}
										fontSize={30}
										cursor="pointer"
										onClick={handleToggleView}
										as={MdGridView}
									/>
								</Box>
							</Tooltip>
						) : (
							<Tooltip label="Switch to list view" placement="top">
								<Box>
									<ListIcon
										_hover={{ color: "white" }}
										fontSize={30}
										cursor="pointer"
										onClick={handleToggleView}
										as={MdFormatListBulleted}
									/>
								</Box>
							</Tooltip>
						)
					) : null}
					<Tooltip
						label={
							sidebarMargin === margins.md
								? "Enlarge Your Library"
								: "Reduce Your Library"
						}
						placement="top"
					>
						<Box>
							<ListIcon
								_hover={{ color: "white" }}
								fontSize={30}
								cursor="pointer"
								onClick={handleExpandReduceLibrary}
								as={
									sidebarMargin === margins.md
										? MdArrowForward
										: sidebarMargin === margins.l
										? MdArrowBack
										: undefined
								}
							/>
						</Box>
					</Tooltip>
				</Box>
			</ListItem>
		</List>
	);
}

export default LibraryHeader;
