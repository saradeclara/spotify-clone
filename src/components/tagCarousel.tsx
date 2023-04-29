import { Box, Tag, Text } from "@chakra-ui/react";

const libraryTags: string[] = [
  "Playlists",
  "Artists",
  "Albums",
  "Podcasts & Shows",
];

const TagCarousel = () => {
  return (
    <Box sx={{ marginTop: "25px", width: "400px" }}>
      {libraryTags.map((singleTag) => {
        return (
          <Tag
            _hover={{
              backgroundColor: "#383838",
              transition: "background-color .3s",
            }}
            size="md"
            key={singleTag}
            borderRadius="full"
            variant="solid"
            backgroundColor="#2a2a2a"
            transition="background-color .3s"
            marginRight="8px"
            cursor="pointer"
          >
            <Text padding="6px">{singleTag}</Text>
          </Tag>
        );
      })}
    </Box>
  );
};

export default TagCarousel;
