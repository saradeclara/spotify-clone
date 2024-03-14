import { Mode, Size } from "@/enums/FollowButton";
import { fetchFeedData } from "@/react-query/fetch";
import { favouriteSongsKey, feedKey } from "@/react-query/queryKeys";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show, Song } from "@prisma/client";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ExtendedSong, Track } from "../../../lib/store";

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
		| ((Show | Artist | Album | Playlist) & {
				category?: Category;
		  })
		| ExtendedSong
		| Track;
}) => {
	const [followStatus, setFollowStatus] = useState<BtnStatus | string>("");

	const { data } = useQuery<FeedData>(feedKey, fetchFeedData);
	// const addRemoveToast = useToast();

	enum BtnStatus {
		Follow = "Follow",
		Following = "Following",
	}

	const queryClient = useQueryClient();

	const isItemInFavourites = (
		feed: FeedData | undefined,
		currentItem: Song | Album | Playlist | Artist | Show | Track
	) => {
		return feed?.find((current) => {
			return current.id === currentItem.id;
		});
	};

	interface Body {
		itemId: string;
		category: string;
	}

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

	const handleFollowUnfollow = async (itemId: string) => {
		const body = { itemId, category: categoryArray };
		updateFeedMutation.mutate(body);
	};

	useEffect(() => {
		const result = isItemInFavourites(data, categoryData);

		if (result) {
			setFollowStatus(BtnStatus.Following);
		} else {
			setFollowStatus(BtnStatus.Follow);
		}
	}, [data, categoryData]);

	useEffect(() => {
		if (followStatus === BtnStatus.Follow) {
			// 	addRemoveToast({
			// 		title: "Removed from Your Library",
			// 		status: "success",
			// 		duration: 3000,
			// 		isClosable: false,
			// 	});
			// } else {
			// 	addRemoveToast({
			// 		title: "Added to Your Library",
			// 		status: "success",
			// 		duration: 3000,
			// 		isClosable: false,
			// 	});
		}
	}, [followStatus]);

	return mode === Mode.Button ? (
		<Button
			onClick={() => handleFollowUnfollow(categoryData.id)}
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
						onClick={() => handleFollowUnfollow(categoryData.id)}
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
						onClick={() => handleFollowUnfollow(categoryData.id)}
					/>
				</Box>
			</Tooltip>
		</Box>
	);
};

export default FollowButton;
