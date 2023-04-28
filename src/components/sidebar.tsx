import { SidebarProps, menuDataType } from "@/types";
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
  MdHome,
  MdSearch,
  MdLibraryBooks,
  MdAdd,
  MdArrowForward,
  MdArrowBack,
  MdGrid4X4,
  MdGridView,
} from "react-icons/md";
import {
  Favourites,
  SearchLibraryInput,
  SortByFilter,
  TagCarousel,
} from "./index";
import { sidebarMain } from "@/styles/colors";

const navMenu: menuDataType[] = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
];

const libraryListItem: menuDataType = {
  name: "Your Library",
  icon: MdLibraryBooks,
  route: "/library",
};

const Sidebar = ({
  sidebarMargin,
  updateSidebarMargin,
  margins,
}: SidebarProps) => {
  const handleExpandReduceLibrary = () => {
    sidebarMargin === margins.md
      ? updateSidebarMargin(margins.l)
      : updateSidebarMargin(margins.md);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 90px)",
        background: "black",
        color: "gray",
        padding: "8px",
      }}
    >
      <Box
        id="navMenu"
        sx={{
          borderRadius: "10px",
          backgroundColor: sidebarMain,
          padding: "17px",
        }}
      >
        <List spacing={5}>
          {navMenu.map(({ name, icon, route }) => {
            return (
              <ListItem fontSize={16} key={name}>
                <Link
                  _hover={{ color: "white" }}
                  sx={{ display: "flex", alignItems: "center" }}
                  as={NextLink}
                  href={route}
                >
                  <ListIcon fontSize={30} marginRight={5} as={icon} />
                  <Text fontWeight="bold">{name}</Text>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
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
                <Tooltip label="Switch to grid view" placement="top">
                  <Box>
                    <ListIcon
                      _hover={{ color: "white" }}
                      fontSize={30}
                      cursor="pointer"
                      as={MdGridView}
                    />
                  </Box>
                </Tooltip>
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
            <Favourites />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
