import { fetchFeedData } from "@/react-query/fetch";
import { favouriteSongsKey, feedKey } from "@/react-query/queryKeys";
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
import { Episode, Song } from "@prisma/client";
import { State, useStoreState } from "easy-peasy";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import capitalise from "../../../lib/capitalise";
import convertSeconds from "../../../lib/convertSeconds";
import dateParser from "../../../lib/dateParser";
import {
	ExtendedSong,
	StoreModel,
	Track,
	useStoreActions,
} from "../../../lib/store";
import TopListHeadings from "./TopListHeadings";

interface TopListProps {
	heading?: string | null;
	items?: ExtendedSong[];
	showFavourites?: boolean;
	showAlbumCovers?: boolean;
	showHeadings?: boolean;
	showArtist?: boolean;
	mode?: string;
	width?: string;
	showDateAdded?: boolean;
	showAlbumColumn?: boolean;
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
	const [{ isHovering, item }, updateHoveringState] = useState({
		isHovering: false,
		item: 0,
	});

	const activeTrack = useStoreState(
		(store: State<StoreModel>) => store.activeTrack
	);

	// retrieving actions from the main store
	const setActiveTracks = useStoreActions((store) => store.changeActiveTracks);
	const setActiveTrack = useStoreActions((store) => store.changeActiveTrack);

	/**
	 * Function which dispatches actions from the store to update activeSong and activeSongs in the main store
	 */
	const handlePlay = (singleSong: Track, songCollection: Track[]) => {
		setActiveTracks(songCollection);
		setActiveTrack(singleSong);
	};

	const { data, isLoading, error } = useQuery(feedKey, fetchFeedData, {
		staleTime: 60 * 5 * 1000,
	});

	const queryClient = useQueryClient();

	interface Body {
		itemId: string;
		category: string;
	}

	const isSongInFavourites = (id: string, favSongs: Song[]) => {
		const favSongsIds = favSongs.map((song) => song.id);
		return favSongsIds.includes(id);
	};

	const updateFeedMutation = useMutation<Body, Error, Partial<Body>>(
		async (newItem) => {
			const response = await fetch("/api/updatefeed", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newItem),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			return response.json();
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(feedKey);
				queryClient.invalidateQueries(favouriteSongsKey);
			},
		}
	);

	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		const id = Number(e.currentTarget.id);
		updateHoveringState({ isHovering: true, item: id });
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		const id = Number(e.currentTarget.id);
		updateHoveringState({ isHovering: false, item: id });
	};

	const updateSongFavourites = async (id: string) => {
		const body = { itemId: id, category: "favouriteSongs" };
		updateFeedMutation.mutate(body);
	};

	const handleClick = (id: string) => {
		updateSongFavourites(id);
	};

	const colStyles =
		showDateAdded && showAlbumColumn
			? {
					marginLeft: "auto",
			  }
			: {};

	const isSongPlaying = (activeSong: Track, currentSongId: string) => {
		return activeSong.id === currentSongId;
	};

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	if (error) {
		return <Box>Error</Box>;
	}

	if (data) {
		const favouriteSongs = [...data].filter(
			(record) => record.category.description === "song"
		);

		const listItems: (ExtendedSong & Episode & { avatarUrl: string })[] =
			typeof items === "undefined" ? favouriteSongs : items;

		const trackList: Track[] = [...listItems].map((el) => {
			return {
				id: el.id,
				name: el.name,
				author: el.artist?.name,
				duration: el.duration,
				thumbnail: el.album ? el.album?.avatarUrl : el.avatarUrl,
				albumIndex: el.albumIndex,
				url: el.url,
				createdAt: el.createdAt,
				updatedAt: el.updatedAt,
				authorId: el.artistId,
				collectionName: el.album?.name,
			};
		});

		const orderedItems: Track[] =
			mode === "album"
				? [...trackList].sort((a, b) => {
						return typeof a.albumIndex !== "undefined" &&
							typeof b.albumIndex !== "undefined"
							? a.albumIndex - b.albumIndex
							: -1;
				  })
				: trackList;
		console.log({ orderedItems });
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
					{orderedItems?.map((song, index) => {
						const {
							id,
							name,
							duration,
							thumbnail,
							author,
							albumIndex,
							updatedAt,
							collectionName,
							authorId,
						} = song;
						return (
							<Box
								key={index}
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
								<Tooltip placement="top" label={`Play ${name} by ${author}`}>
									<Box
										color={
											activeTrack && isSongPlaying(activeTrack, id)
												? spotifyGreen
												: lightGrayText
										}
										width="20px"
										marginRight="20px"
									>
										{isHovering && item == index ? (
											<Box
												onClick={() => handlePlay(song, orderedItems)}
												sx={{ cursor: "pointer" }}
											>
												<BsFillPlayFill />
											</Box>
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
														src={!thumbnail ? undefined : thumbnail}
													/>
												</Box>
											) : null}
											<Box
												sx={{
													display: "block",
													margin: "auto 0",
												}}
											>
												<Link href="/track/[id]" as={`/track/${id}`}>
													<Box
														color={
															activeTrack && isSongPlaying(activeTrack, id)
																? spotifyGreen
																: lightGrayText
														}
														_hover={{
															textDecoration: "underline",
														}}
													>
														{name}
													</Box>
												</Link>
												{showArtist ? (
													<Box sx={{ color: "gray", fontSize: "small" }}>
														<Link
															href="/artist/[id]"
															as={`/artist/${authorId}`}
														>
															<Text _hover={{ textDecoration: "underline" }}>
																{author}
															</Text>
														</Link>
													</Box>
												) : null}
											</Box>
										</Box>
										{showAlbumColumn ? (
											<Box sx={{ flex: 1, fontSize: "sm" }}>
												{collectionName}
											</Box>
										) : null}

										{showDateAdded ? (
											<Box sx={{ flex: 1, fontSize: "sm" }}>
												{dateParser(new Date(updatedAt))?.month.text}{" "}
												{dateParser(new Date(updatedAt))?.day},{" "}
												{dateParser(new Date(updatedAt))?.year}
											</Box>
										) : null}
										{showFavourites ? (
											<Tooltip
												placement="top"
												label={
													isSongInFavourites(id, favouriteSongs)
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
													{isSongInFavourites(id, favouriteSongs) ? (
														<AiFillHeart
															onClick={() => handleClick(id)}
															color={spotifyGreen}
														/>
													) : isHovering && item == index ? (
														<Box _hover={{ color: "white" }}>
															<AiOutlineHeart onClick={() => handleClick(id)} />
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
						);
					})}
				</OrderedList>
			</Box>
		);
	}
}

export default TopList;
