import { lightGrayText } from "@/styles/colors";
import {
	Box,
	Heading,
	Img,
	ListItem,
	OrderedList,
	Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import capitalise from "../../lib/capitalise";

interface albumType {
	id: string;
	name: string;
	avatarUrl: string | null;
}

interface artistType {
	id: string;
	name: string;
}

interface listItem {
	id: string;
	name: string;
	album: albumType;
	duration?: number;
	artist: artistType;
}

interface TopListProps {
	heading: string;
	items: listItem[];
}

function TopList({ heading, items }: TopListProps) {
	const [{ isHovering, item }, updateHoveringState] = useState({
		isHovering: false,
		item: 0,
	});
	console.log({ items });

	const handleMouseEnter = (e: any) => {
		updateHoveringState({ isHovering: true, item: e.target.id });
	};

	const handleMouseLeave = (e: any) => {
		updateHoveringState({ isHovering: false, item: e.target.id });
	};

	return (
		<Box sx={{ padding: "30px" }}>
			<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
				{capitalise(heading)}
			</Heading>
			<OrderedList
				sx={{
					color: "white",
					marginLeft: "0px",
					width: "50%",
				}}
			>
				{items.map(({ name, album, duration, artist }, index) => (
					<Box
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						id={index.toString()}
						_hover={{
							backgroundColor: "rgba(255,255,255,.3)",
							transition: "background-color .2s",
							borderRadius: "5px",
						}}
						sx={{ display: "flex", alignItems: "center", padding: "10px 20px" }}
					>
						<Tooltip placement="top" label={`Play ${name} by ${artist.name}`}>
							<Box width="20px" marginRight="20px">
								{isHovering && item == index ? <BsFillPlayFill /> : index + 1}
							</Box>
						</Tooltip>
						<ListItem
							sx={{
								display: "flex",
								alignItems: "center",
								width: "100%",
							}}
						>
							<Box marginRight="20px">
								<Img
									width="50px"
									src={!album.avatarUrl ? undefined : album.avatarUrl}
								/>
							</Box>
							<Box>{name}</Box>
							<Box sx={{ marginRight: "0px" }}></Box>
							<Box
								sx={{
									marginLeft: "auto",
									display: "flex",
									alignItems: "center",
									color: lightGrayText,
								}}
							>
								<Box marginRight="50px">
									{isHovering && item == index ? (
										<Tooltip placement="top" label="Save to Your Library">
											<Box _hover={{ color: "white" }} cursor="pointer">
												<AiOutlineHeart />
											</Box>
										</Tooltip>
									) : null}
								</Box>
								<Box>{duration}</Box>
							</Box>
						</ListItem>
					</Box>
				))}
			</OrderedList>
		</Box>
	);
}

export default TopList;
