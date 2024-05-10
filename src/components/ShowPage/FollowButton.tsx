import { Mode, Size } from "@/enums/FollowButton";
import { fetchFeedData } from "@/react-query/fetch";
import { favouriteSongsKey, feedKey } from "@/react-query/queryKeys";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import { Box, Button, Text, Tooltip, useToast } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show, Song } from "@prisma/client";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Track } from "../../../lib/store";

type FeedData = ((Show | Album | Artist | Song | Playlist) & {
	category: { description: string };
})[];

const FollowButton = ({
	categoryData,
	categoryArray,
	mode,
	size,
}: {
	mode: Mode;
	size?: Size;
	categoryArray: string;
	categoryData:
		| (Show | Artist | Album | Playlist) & {
				category?: Category;
		  };
}) => {
	const [followStatus, setFollowStatus] = useState<BtnStatus | string>("");

	const { data } = useQuery<FeedData>(feedKey, fetchFeedData);
	const toast = useToast();

	enum BtnStatus {
		Follow = "Follow",
		Following = "Following",
	}
	const queryClient = useQueryClient();

	/**
	 * The function `isItemInFavourites` checks if a given item is present in a feed of items.
	 * @param {FeedData | undefined} feed - FeedData array containing items that the user has marked as
	 * favorites
	 * @param {Song | Album | Playlist | Artist | Show | Track} currentItem - The `currentItem` parameter
	 * represents an item that you want to check if it is in the favorites list. It can be of type `Song`,
	 * `Album`, `Playlist`, `Artist`, `Show`, or `Track`.
	 * @returns The function `isItemInFavourites` returns a boolean value indicating whether the
	 * `currentItem` is present in the `feed` array.
	 */
	const isItemInFavourites = (
		feed: FeedData | undefined,
		currentItem: Song | Album | Playlist | Artist | Show | Track
	) => {
		if (feed) {
			return (
				feed.filter((current) => {
					return current.id === currentItem.id;
				}).length > 0
			);
		}
	};

	interface Body {
		itemId: string;
		category: string;
		name: string;
	}

	interface Data {
		action: string;
		message: string;
	}

	const updateFeedMutation = useMutation<Data, any, Partial<Body>, any>(
		async (newItem) => {
			const response = await fetch("/api/feed", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newItem),
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return jsonResponse;
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
			onSuccess: (data, variables) => {
				toast({
					title: data.message,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				queryClient.invalidateQueries(feedKey);
				queryClient.invalidateQueries(favouriteSongsKey);

				if (data.action === "removed") {
					setFollowStatus(BtnStatus.Follow);
				}

				if (data.action === "added") {
					setFollowStatus(BtnStatus.Following);
				}
			},
		}
	);

	/**
	 * The function `handleFollowUnfollow` takes an item ID and name as parameters, and if the name is
	 * provided, it constructs a body object and calls an updateFeedMutation with that body.
	 * @param {string} itemId - The `itemId` parameter is a string that represents the unique identifier
	 * of an item.
	 * @param {string} name - The `name` parameter in the `handleFollowUnfollow` function is a string that
	 * represents the name of a user or entity.
	 */
	const handleFollowUnfollow = async (itemId: string, name: string) => {
		if (name) {
			const body = { itemId, category: categoryArray, name };
			updateFeedMutation.mutate(body);
		}
	};

	// on load, check button status
	useEffect(() => {
		const result = isItemInFavourites(data, categoryData);

		if (result) {
			setFollowStatus(BtnStatus.Following);
		} else {
			setFollowStatus(BtnStatus.Follow);
		}
	}, []);

	return mode === Mode.Button ? (
		<Button
			onClick={() => handleFollowUnfollow(categoryData.id, categoryData.name)}
			_hover={{ background: "rgba(0,0,0,0)" }}
			borderRadius="50px"
			size="sm"
			variant="outline"
		>
			<Text color="white">{followStatus}</Text>
		</Button>
	) : followStatus === BtnStatus.Follow ? (
		<Box
			sx={{
				color: lightGrayText,
			}}
		>
			<Tooltip label="Save to Your Library" placement="top">
				<Box display="inline-block" _hover={{ color: "white" }}>
					<AiOutlineHeart
						cursor="pointer"
						size={size === Size.medium ? "50px" : "20px"}
						onClick={() =>
							handleFollowUnfollow(categoryData.id, categoryData.name)
						}
					/>
				</Box>
			</Tooltip>
		</Box>
	) : (
		<Box
			sx={{
				color: spotifyGreen,
			}}
		>
			<Tooltip label="Remove from Your Library" placement="top">
				<Box display="inline-block" _hover={{ color: spotifyGreen }}>
					<AiFillHeart
						cursor="pointer"
						size={size === Size.medium ? "50px" : "20px"}
						onClick={() =>
							handleFollowUnfollow(categoryData.id, categoryData.name)
						}
					/>
				</Box>
			</Tooltip>
		</Box>
	);
};

export default FollowButton;
