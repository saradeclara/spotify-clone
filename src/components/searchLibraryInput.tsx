import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { MdSearch } from "react-icons/md";

const SearchLibraryInput = () => {
  return (
    <Box sx={{ width: "185px" }}>
      <InputGroup
        sx={{
          backgroundColor: "#282828",
          borderRadius: "50px",
        }}
      >
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<MdSearch />}
        />
        <Input
          _focusVisible={{ border: "0px" }}
          _hover={{ border: "0px" }}
          _placeholder={{
            opacity: 1,
            color: "#8E8E8E",
            fontSize: "small",
          }}
          sx={{
            borderRadius: "5px",
            borderColor: "#282828",
            paddingLeft: "35px",
          }}
          placeholder="Search In Your Library"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchLibraryInput;
