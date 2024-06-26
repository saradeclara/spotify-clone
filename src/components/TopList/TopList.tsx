import { fetchFeedData } from "@/react-query/fetch";
import {
	favouriteSongsKey,
	feedKey,
	playlistKey,
} from "@/react-query/queryKeys";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import {
	Box,
	Heading,
	Img,
	ListItem,
	OrderedList,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import { Episode, Song } from "@prisma/client";
import { State, useStoreState } from "easy-peasy";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
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
	showDeleteCol?: boolean;
	mode?: string;
	width?: string;
	showDateAdded?: boolean;
	showAlbumColumn?: boolean;
	playlistId?: string;
}

function TopList({
	heading,
	items,
	showAlbumColumn,
	showDateAdded,
	showDeleteCol,
	showFavourites,
	showAlbumCovers,
	showHeadings,
	showArtist,
	mode,
	playlistId,
	width = "100%",
}: TopListProps) {
	const [{ isHovering, item }, updateHoveringState] = useState({
		isHovering: false,
		item: 0,
	});
	const [isDeleteLoading, toggleDeleteLoading] = useState<boolean | null>(null);
	const [songToDelete, updateSongToDelete] = useState<string | null>(null);
	const activeTrack = useStoreState(
		(store: State<StoreModel>) => store.activeTrack
	);

	// retrieving actions from the main store
	const setActiveTracks = useStoreActions((store) => store.changeActiveTracks);
	const setActiveTrack = useStoreActions((store) => store.changeActiveTrack);

	const toast = useToast();

	/**
	 * The `handlePlay` function sets a single song as the active track and updates the collection of
	 * active tracks.
	 * @param {Track} singleSong - The `singleSong` parameter is a single track object that represents a
	 * song to be played.
	 * @param {Track[]} songCollection - The `songCollection` parameter is an array of `Track` objects
	 * that likely represents a collection of songs or tracks.
	 */
	const handlePlay = (singleSong: Track, songCollection: Track[]) => {
		setActiveTracks(songCollection);
		setActiveTrack(singleSong);
	};

	/**
	 * The function `handleDeleteSong` asynchronously sends a PUT request to remove a song from a playlist
	 * using the provided `playlistId` and `newSongId`, and then invalidates the playlist query.
	 * @param {string} playlistId - The `playlistId` parameter in the `handleDeleteSong` function is a
	 * string that represents the unique identifier of the playlist from which you want to delete a song.
	 * @param {string} newSongId - The `newSongId` parameter in the `handleDeleteSong` function represents
	 * the ID of the song that you want to remove from the playlist.
	 */
	const handleDeleteSong = async (playlistId: string, newSongId: string) => {
		toggleDeleteLoading(true);

		const response = await fetch(`/api/playlist/${playlistId}`, {
			method: "PUT",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ newSongId, flag: "remove" }),
		});
		const json = await response.json();
		const { songToDelete } = json;
		updateSongToDelete(songToDelete.name);

		queryClient.invalidateQueries(playlistKey);

		if (response.ok) {
			toggleDeleteLoading(false);
		}
	};

	const { data, isLoading, error } = useQuery(feedKey, fetchFeedData, {
		staleTime: 60 * 5 * 1000,
	});

	const queryClient = useQueryClient();

	interface Body {
		itemId: string;
		category: string;
	}

	/**
	 * The function `isSongInFavourites` checks if a song with a specific ID is present in a list of
	 * favorite songs.
	 * @param {string} id - The `id` parameter is a string representing the unique identifier of a song.
	 * @param {Song[]} favSongs - An array of objects representing songs, where each object has an `id`
	 * property of type string.
	 * @returns The function `isSongInFavourites` returns a boolean value indicating whether a song with
	 * the given `id` is present in the array of favorite songs (`favSongs`).
	 */
	const isSongInFavourites = (id: string, favSongs: Song[]) => {
		const favSongsIds = favSongs.map((song) => song.id);
		return favSongsIds.includes(id);
	};

	interface Data {
		message: string;
		action: string;
	}

	/* The code below defines a mutation function `updateFeedMutation` using the `useMutation` hook 
	from the React Query library. This mutation function is responsible
	for sending a PUT request to the "/api/feed" endpoint with a new item as the request body. If the
	network response is successful (status code 200), it returns the JSON response.
	Upon success, the feed query and favourite songs query are both invalidated. */
	const updateFeedMutation = useMutation<Data, any, Partial<Body>, any>(
		async (newItem) => {
			const response = await fetch("/api/feed", {
				method: "PUT",
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
			onMutate: () => {
				toast({
					title: "Loading...",
					status: "loading",
					duration: 3000,
					isClosable: true,
				});
			},
			onSuccess: (data, _variables) => {
				toast({
					title: data.message,
					status: "success",
					duration: 3000,
					isClosable: true,
				});

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

	const updateSongFavourites = async (id: string, name: string) => {
		const body = { itemId: id, category: "favouriteSongs", name };
		updateFeedMutation.mutate(body);
	};

	const handleClick = (id: string, name: string) => {
		updateSongFavourites(id, name);
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

	const favouriteSongs = data
		? [...data].filter((record) => record.category.description === "song")
		: [];

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

	useEffect(() => {
		if (songToDelete) {
			if (isDeleteLoading) {
				toast({
					title: "Loading...",
					status: "loading",
					duration: 3000,
					isClosable: false,
				});
			} else {
				toast({
					title: `${songToDelete} was removed from your playlist.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
		}
	}, [isDeleteLoading, toast, songToDelete]);

	if (isLoading) {
		return <Box>Loading data...</Box>;
	}

	if (error) {
		return <Box>Error</Box>;
	}

	if (!data) return <Box></Box>;

	return (
		<Box sx={{ padding: "30px" }}>
			{heading ? (
				<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
					{capitalise(heading)}
				</Heading>
			) : null}
			{showHeadings && orderedItems.length > 0 ? (
				<TopListHeadings
					width={width}
					colStyles={colStyles}
					showFavourites
					showAlbumColumn={showAlbumColumn}
					showDateAdded={showDateAdded}
					showDeleteCol={showDeleteCol}
				/>
			) : null}

			<OrderedList
				sx={{
					color: "white",
					marginLeft: "0px",
					width,
				}}
			>
				{orderedItems.length > 0 ? (
					orderedItems.map((song, index) => {
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
												<Box
													color={
														activeTrack && isSongPlaying(activeTrack, id)
															? spotifyGreen
															: lightGrayText
													}
												>
													{name}
												</Box>
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
															onClick={() => handleClick(id, name)}
															color={spotifyGreen}
														/>
													) : isHovering && item == index ? (
														<Box _hover={{ color: "white" }}>
															<AiOutlineHeart
																onClick={() => handleClick(id, name)}
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
										{showDeleteCol && playlistId ? (
											<Tooltip
												placement="top"
												label={`Remove ${name} from this playlist`}
											>
												<Box
													_hover={{
														color: spotifyGreen,
														transition: "all .3s",
													}}
													sx={{
														flex: 0.5,
														display: "flex",
														justifyContent: "flex-end",
														fontSize: "sm",
														cursor: "pointer",
													}}
													onClick={() => handleDeleteSong(playlistId, song.id)}
												>
													<MdDelete />
												</Box>
											</Tooltip>
										) : null}
									</Box>
								</ListItem>
							</Box>
						);
					})
				) : (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							color: lightGrayText,
						}}
					>
						There are no tracks in this collection
					</Box>
				)}
			</OrderedList>
		</Box>
	);
}

export default TopList;
