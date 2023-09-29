import { LoggedInUserContext } from "@/context/LoggedInUserContext";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import {
	Box,
	Heading,
	Img,
	ListItem,
	OrderedList,
	Tooltip,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import capitalise from "../../lib/capitalise";
import convertSeconds from "../../lib/convertSeconds";

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
	showFavourites: boolean;
}

function TopList({ heading, items, showFavourites }: TopListProps) {
	const [{ isHovering, item }, updateHoveringState] = useState({
		isHovering: false,
		item: 0,
	});
	const defaultFavouriteSongs: string[] = [];
	const [favouriteSongs, setFavouriteSongs] = useState(defaultFavouriteSongs);

	const loggedInUser = useContext(LoggedInUserContext);

	const handleMouseEnter = (e: any) => {
		updateHoveringState({ isHovering: true, item: e.target.id });
	};

	const handleMouseLeave = (e: any) => {
		updateHoveringState({ isHovering: false, item: e.target.id });
	};

	const updateSongFavourites = async (flag: boolean, id: string) => {
		const body = { songId: id, flag };
		const result = await fetch(`/api/updateuser`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const updatedUser = await result.json();

		setFavouriteSongs(
			updatedUser.favouriteSongs.map((el: { id: string }) => el.id)
		);
	};

	const handleClick = (flag: boolean, id: string) => {
		updateSongFavourites(flag, id);
	};

	useEffect(() => {
		// add favourite songs on load
		const favouriteSongsIds = loggedInUser?.favouriteSongs?.map(
			(el: { id: string }) => el.id
		);
		if (favouriteSongsIds) {
			setFavouriteSongs(favouriteSongsIds);
		}
	}, []);

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
				{items.map(({ id, name, album, duration, artist }, index) => (
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
								{showFavourites ? (
									<Tooltip
										placement="top"
										label={
											favouriteSongs.includes(id)
												? "Remove from Your Library"
												: "Save to Your Library"
										}
									>
										<Box marginRight="50px" cursor="pointer">
											{favouriteSongs.includes(id) ? (
												<AiFillHeart
													onClick={() =>
														handleClick(favouriteSongs.includes(id), id)
													}
													color={spotifyGreen}
												/>
											) : isHovering && item == index ? (
												<Box _hover={{ color: "white" }}>
													<AiOutlineHeart
														onClick={() =>
															handleClick(favouriteSongs.includes(id), id)
														}
													/>
												</Box>
											) : null}
										</Box>
									</Tooltip>
								) : null}

								<Box>{convertSeconds(duration)}</Box>
							</Box>
						</ListItem>
					</Box>
				))}
			</OrderedList>
		</Box>
	);
}

export default TopList;
