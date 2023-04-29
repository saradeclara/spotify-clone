import { sidebarMain } from "@/styles/colors";
import { menuDataType } from "@/types";
import { LibraryMenuProps } from "@/types/libraryMenu";
import {
  Box,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdFormatListBulleted,
  MdGridView,
  MdLibraryBooks,
} from "react-icons/md";
import NextLink from "next/link";
import FavouritesListView from "./FavouritesListView";
import SearchLibraryInput from "./SearchLibraryInput";
import SortByFilter from "./SortByFilter";
import TagCarousel from "./TagCarousel";
import FavouritesGridView from "./FavouritesGridView";

const LibraryMenu = ({
  sidebarMargin,
  updateSidebarMargin,
  margins,
}: LibraryMenuProps) => {
  const favouritesViews: string[] = ["list", "grid"];
  const [currentView, toggleView] = useState(0);
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
    <Box
      id="libraryMenu"
      sx={{
        borderRadius: "10px",
        backgroundColor: sidebarMain,
        padding: "17px 17px 0px 17px",
        marginTop: "8px",
      }}
    >
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
              <ListIcon
                fontSize={30}
                marginRight={5}
                as={libraryListItem.icon}
              />
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
      <Box sx={{ overflow: "auto", marginBottom: "15px" }}>
        <TagCarousel />
      </Box>
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
            <FavouritesListView />
          ) : (
            <FavouritesGridView />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LibraryMenu;
