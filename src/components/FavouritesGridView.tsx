import { spotifyGreen } from "@/styles/colors";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";

const FavouritesGridView = () => {
  const fakeAlbums = [
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/KhBYkPh/thumb.webp",
      title: "Superunknown (20th Anniversary)",
      category: "Album",
      author: "Soundgarden",
    },
    {
      thumbnail: "https://i.ibb.co/XJXMs6K/violator.png",
      title: "Violator",
      category: "Album",
      author: "Depeche Mode",
    },
    {
      thumbnail: "https://i.ibb.co/XJXMs6K/violator.png",
      title: "Violator",
      category: "Album",
      author: "Depeche Mode",
    },
    {
      thumbnail: "https://i.ibb.co/XJXMs6K/violator.png",
      title: "Violator",
      category: "Album",
      author: "Depeche Mode",
    },
    {
      thumbnail: "https://i.ibb.co/XJXMs6K/violator.png",
      title: "Violator",
      category: "Album",
      author: "Depeche Mode",
    },
    {
      thumbnail: "https://i.ibb.co/XJXMs6K/violator.png",
      title: "Violator",
      category: "Album",
      author: "Depeche Mode",
    },
    {
      thumbnail: "https://i.ibb.co/XJXMs6K/violator.png",
      title: "Violator",
      category: "Album",
      author: "Depeche Mode",
    },
  ];

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

  return (
    <Box id="favourites-wrapper" sx={{ display: "flex" }}>
      <List sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* Liked Songs & Your Episodes - Always on Top */}
        <ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
          <Image
            borderRadius="md"
            boxSize="150px"
            src="https://i.ibb.co/XJXMs6K/violator.png"
            alt="Liked Songs"
          />
          <Box sx={{ marginLeft: "10px" }}>
            <Text color="white">Liked Songs</Text>
            <Text fontSize="small" sx={textWithEllipsis}>
              <Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
              {`Playlist \u2022 326 songs`}
            </Text>
          </Box>
        </ListItem>
        <ListItem _hover={{ backgroundColor: "#1A1A1A" }} sx={listItemStyles}>
          <Image
            borderRadius="md"
            boxSize="150px"
            src="https://i.ibb.co/XJXMs6K/violator.png"
            alt="Liked Songs"
          />
          <Box>
            <Text color="white">Your Episodes</Text>
            <Text fontSize="small" sx={textWithEllipsis}>
              <Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
              Saved & downloaded Episodes
            </Text>
          </Box>
        </ListItem>
        {/* Favourites (Albums, Artists, Podcasts, Songs,...) */}
        {fakeAlbums.map(({ thumbnail, title, category, author }) => {
          return (
            <ListItem
              _hover={{ backgroundColor: "#1A1A1A" }}
              sx={listItemStyles}
            >
              <Image
                borderRadius="md"
                boxSize="150px"
                src={thumbnail}
                alt={title}
              />
              <Box>
                <Text color="white" sx={textWithEllipsis}>
                  {title}
                </Text>
                <Text
                  fontSize="small"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >{`${category} \u2022 ${author}`}</Text>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default FavouritesGridView;
