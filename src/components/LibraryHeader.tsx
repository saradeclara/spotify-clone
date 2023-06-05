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
import {
	MdAdd,
	MdArrowBack,
	MdArrowForward,
	MdFormatListBulleted,
	MdGridView,
	MdLibraryBooks,
} from "react-icons/md";

function LibraryHeader({
	sidebarMargin,
	updateSidebarMargin,
	margins,
	currentView,
	toggleView,
	favouritesViews,
}: LibraryHeaderProps) {
	const libraryListItem: menuDataType = {
		name: "Your Library",
		icon: MdLibraryBooks,
		route: "/library",
	};

	const handleExpandReduceLibrary = () => {
		if (sidebarMargin === margins.md) {
			updateSidebarMargin(margins.l);
		} else {
			updateSidebarMargin(margins.md);
			// forcing list view on md view
			toggleView(0);
		}
	};

	const handleToggleView = () => {
		toggleView(currentView === 0 ? 1 : 0);
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
					<Tooltip label="Create playlist or folder" placement="top">
						<Box>
							<ListIcon
								_hover={{ color: "white" }}
								fontSize={30}
								cursor="pointer"
								as={MdAdd}
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
