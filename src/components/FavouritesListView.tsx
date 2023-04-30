import { spotifyGreen } from "@/styles/colors";
import { Box, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";

const FavouritesListView = () => {
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
  return (
    <Box id="favourites-wrapper">
      {/* Liked Songs & Your Episodes - Always on Top */}
      <List>
        <ListItem
          _hover={{ backgroundColor: "#1A1A1A" }}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <Image
            borderRadius="md"
            boxSize="50px"
            src="https://i.ibb.co/XJXMs6K/violator.png"
            alt="Liked Songs"
          />
          <Box sx={{ marginLeft: "10px" }}>
            <Text color="white">Liked Songs</Text>
            <Text fontSize="small">
              <Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
              {`Playlist \u2022 326 songs`}
            </Text>
          </Box>
        </ListItem>
        <ListItem
          _hover={{ backgroundColor: "#1A1A1A" }}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <Image
            borderRadius="md"
            boxSize="50px"
            src="https://i.ibb.co/XJXMs6K/violator.png"
            alt="Liked Songs"
          />
          <Box sx={{ marginLeft: "10px" }}>
            <Text color="white">Your Episodes</Text>
            <Text fontSize="small">
              <Icon marginRight="6px" color={spotifyGreen} as={AiFillPushpin} />
              Saved & downloaded Episodes
            </Text>
          </Box>
        </ListItem>
      </List>

      {/* Favourites (Albums, Artists, Podcasts, Songs,...) */}
      <List>
        {fakeAlbums.map(({ thumbnail, title, category, author }, index) => {
          return (
            <ListItem
              key={index}
              _hover={{ backgroundColor: "#1A1A1A" }}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <Image
                borderRadius="md"
                boxSize="50px"
                src={thumbnail}
                alt={title}
              />
              <Box sx={{ marginLeft: "10px" }}>
                <Text color="white">{title}</Text>
                <Text fontSize="small">{`${category} \u2022 ${author}`}</Text>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default FavouritesListView;
