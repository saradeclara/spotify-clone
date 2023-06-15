import { Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import TagCarousel from "./TagCarousel";

function LibraryCarousel({
	currentCat,
	updateCat,
	libraryTags,
}: {
	currentCat: number | null;
	updateCat: Dispatch<SetStateAction<number | null>>;
	libraryTags: { name: string; label: string }[];
}) {
	return (
		<Box sx={{ overflow: "auto", marginBottom: "15px" }}>
			<TagCarousel
				currentCat={currentCat}
				updateCat={updateCat}
				libraryTags={libraryTags}
			/>
		</Box>
	);
}

export default LibraryCarousel;
