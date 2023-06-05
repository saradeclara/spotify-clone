import { Box } from "@chakra-ui/react";
import TagCarousel from "./TagCarousel";

function LibraryCarousel() {
	return (
		<Box sx={{ overflow: "auto", marginBottom: "15px" }}>
			<TagCarousel />
		</Box>
	);
}

export default LibraryCarousel;
