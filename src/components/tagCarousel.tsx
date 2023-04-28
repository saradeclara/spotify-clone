import { Box, HStack, Tag, Text } from "@chakra-ui/react";
import React from "react";

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
            size="md"
            key={singleTag}
            borderRadius="full"
            variant="solid"
            backgroundColor="#2a2a2a"
            marginRight="8px"
          >
            <Text padding="6px">{singleTag}</Text>
          </Tag>
        );
      })}
    </Box>
  );
};

export default TagCarousel;
