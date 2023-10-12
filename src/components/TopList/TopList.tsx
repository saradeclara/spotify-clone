import { LoggedInUserContext } from "@/context/LoggedInUserContext";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import {
	Box,
	Heading,
	Img,
	ListItem,
	OrderedList,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import capitalise from "../../../lib/capitalise";
import convertSeconds from "../../../lib/convertSeconds";
import dateParser from "../../../lib/dateParser";
import TopListHeadings from "./TopListHeadings";
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
	albumIndex: number;
	updatedAt: Date;
}

interface TopListProps {
	heading?: string | null;
	items: listItem[];
	showFavourites: boolean;
	showAlbumCovers: boolean;
	showHeadings: boolean;
	showArtist: boolean;
	mode?: string;
	width?: string;
	showDateAdded: boolean;
	showAlbumColumn: boolean;
}

function TopList({
	heading,
	items,
	showAlbumColumn,
	showDateAdded,
	showFavourites,
	showAlbumCovers,
	showHeadings,
	showArtist,
	mode,
	width = "100%",
}: TopListProps) {
	console.log("toplist", showDateAdded, showAlbumColumn);
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

	const orderedItems =
		mode === "album"
			? [...items].sort((a, b) => a.albumIndex - b.albumIndex)
			: items;

	useEffect(() => {
		// add favourite songs on load
		const favouriteSongsIds = loggedInUser?.favouriteSongs?.map(
			(el: { id: string }) => el.id
		);
		if (favouriteSongsIds) {
			setFavouriteSongs(favouriteSongsIds);
		}
	}, []);

	const colStyles =
		showDateAdded && showAlbumColumn
			? {
					marginLeft: "auto",
			  }
			: {};

	return (
		<Box sx={{ padding: "30px" }}>
			{heading ? (
				<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
					{capitalise(heading)}
				</Heading>
			) : null}

			{showHeadings ? (
				<TopListHeadings
					width={width}
					colStyles={colStyles}
					showFavourites
					showAlbumColumn={showAlbumColumn}
					showDateAdded={showDateAdded}
				/>
			) : null}

			<OrderedList
				sx={{
					color: "white",
					marginLeft: "0px",
					width,
				}}
			>
				{orderedItems.map(
					(
						{ id, name, album, duration, artist, albumIndex, updatedAt },
						index
					) => (
						<Box
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							id={index.toString()}
							_hover={{
								backgroundColor: "rgba(255,255,255,.3)",
								transition: "background-color .2s",
								borderRadius: "5px",
							}}
							sx={{
								display: "flex",
								alignItems: "center",
								padding: "10px 20px",
							}}
						>
							<Tooltip placement="top" label={`Play ${name} by ${artist.name}`}>
								<Box width="20px" marginRight="20px">
									{isHovering && item == index ? (
										<BsFillPlayFill />
									) : mode === "album" ? (
										albumIndex
									) : (
										index + 1
									)}
								</Box>
							</Tooltip>
							<ListItem
								sx={{
									display: "flex",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Box
									width="100%"
									sx={{
										...colStyles,
										display: "flex",
										alignItems: "center",
										color: lightGrayText,
									}}
								>
									<Box
										sx={{
											flex: showDateAdded && showAlbumColumn ? 2 : 10,
											display: "flex",
										}}
									>
										{showAlbumCovers ? (
											<Box marginRight="20px">
												<Img
													width="50px"
													src={!album.avatarUrl ? undefined : album.avatarUrl}
												/>
											</Box>
										) : null}
										<Box
											sx={{
												display: "block",
												margin: "auto 0",
											}}
										>
											<Box>{name}</Box>
											{showArtist ? (
												<Box sx={{ color: "gray", fontSize: "small" }}>
													<Link href={`/artist/${artist.id}`}>
														<Text _hover={{ textDecoration: "underline" }}>
															{artist.name}
														</Text>
													</Link>
												</Box>
											) : null}
										</Box>
									</Box>
									{showAlbumColumn ? (
										<Box sx={{ flex: 1, fontSize: "sm" }}>{album.name}</Box>
									) : null}

									{showDateAdded ? (
										<Box sx={{ flex: 1, fontSize: "sm" }}>
											{dateParser(updatedAt)?.month.text}{" "}
											{dateParser(updatedAt)?.day},{" "}
											{dateParser(updatedAt)?.year}
										</Box>
									) : null}
									{showFavourites ? (
										<Tooltip
											placement="top"
											label={
												favouriteSongs.includes(id)
													? "Remove from Your Library"
													: "Save to Your Library"
											}
										>
											<Box
												sx={{
													flex: 1,
													display: "flex",
													justifyContent: "center",
												}}
												cursor="pointer"
											>
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

									<Box
										sx={{
											flex: 1,
											display: "flex",
											justifyContent: "flex-end",
											fontSize: "sm",
										}}
									>
										{convertSeconds(duration)}
									</Box>
								</Box>
							</ListItem>
						</Box>
					)
				)}
			</OrderedList>
		</Box>
	);
}

export default TopList;
