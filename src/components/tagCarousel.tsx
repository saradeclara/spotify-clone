import { Box, Tag, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { RiCloseFill } from "react-icons/ri";
const TagCarousel = ({
	libraryTags,
	currentCat,
	updateCat,
}: {
	currentCat: number | null;
	updateCat: Dispatch<SetStateAction<number | null>>;
	libraryTags: { name: string; label: string }[];
}) => {
	const handleTagClick = (singleTag: number) => {
		updateCat(singleTag);
	};

	const filteredTags =
		typeof currentCat === "number"
			? libraryTags.filter(
					(singleTag, index, array) => singleTag.name === array[currentCat].name
			  )
			: libraryTags;
	return (
		<Box sx={{ marginTop: "25px", height: "30px", overflow: "hidden" }}>
			<Box
				onClick={() => updateCat(null)}
				display={typeof currentCat === "number" ? "inline-block" : "none"}
				sx={{
					background: "#2A2A2A",
					cursor: "pointer",
					padding: "5px",
					borderRadius: "full",
					marginRight: "10px",
				}}
			>
				<RiCloseFill />
			</Box>
			{filteredTags.map((singleTag, index) => {
				return (
					<Tag
						_hover={{
							backgroundColor:
								typeof currentCat === "number" ? "white" : "#383838",
							transition: "background-color .3s",
						}}
						size="md"
						key={singleTag.name}
						backgroundColor={
							typeof currentCat === "number" ? "white" : "#2A2A2A"
						}
						color={typeof currentCat === "number" ? "black" : "white"}
						borderRadius="full"
						variant="solid"
						transition="background-color .3s"
						marginRight="8px"
						cursor="pointer"
						onClick={() => handleTagClick(index)}
					>
						<Text padding="6px">{singleTag.name}</Text>
					</Tag>
				);
			})}
			{typeof currentCat === "number" &&
			libraryTags[currentCat].label === "playlist"
				? ["By Spotify", "By you"].map((singleTag, index) => {
						return (
							<Tag
								_hover={{
									backgroundColor: "#383838",
									transition: "background-color .3s",
								}}
								size="md"
								key={singleTag}
								backgroundColor={"#2A2A2A"}
								// color={typeof currentCat === "number" ? "black" :/ "white"}
								borderRadius="full"
								variant="solid"
								transition="background-color .3s"
								marginRight="8px"
								cursor="pointer"
								onClick={() => handleTagClick(index)}
							>
								<Text padding="6px">{singleTag}</Text>
							</Tag>
						);
				  })
				: null}
		</Box>
	);
};

export default TagCarousel;
