import { Mode, Size } from "@/enums/FollowButton";
import { fetchFeedData } from "@/react-query/fetch";
import { feedKey } from "@/react-query/queryKeys";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import { Box, Button, Text, Tooltip, useToast } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show, Song } from "@prisma/client";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ExtendedSong } from "../../../lib/store";

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
		| ExtendedSong;
}) => {
	const [followStatus, setFollowStatus] = useState<BtnStatus | string>("");
	const { data } = useQuery<FeedData>(feedKey, fetchFeedData);
	const addRemoveToast = useToast();

	enum BtnStatus {
		Follow = "Follow",
		Following = "Following",
	}

	const queryClient = useQueryClient();

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
				if (followStatus === BtnStatus.Follow) {
					addRemoveToast({
						title: "Added to Your Library",
						status: "success",
						duration: 3000,
						isClosable: false,
					});
				} else if (followStatus === BtnStatus.Following) {
					addRemoveToast({
						title: "Removed from Your Library",
						status: "success",
						duration: 3000,
						isClosable: false,
					});
				}
			},
		}
	);

	const handleFollowUnfollow = async (itemId: string) => {
		const body = { itemId, category: categoryArray };
		const result = await updateFeedMutation.mutate(body);
		console.log({ result });
	};

	useEffect(() => {
		// check data from feed query to see if current show is in feed
		if (data && categoryData) {
			const foundItem = [...data].find((feedItem) => {
				console.log("first", feedItem.id, categoryData.id);
				return (
					feedItem.id === categoryData.id &&
					feedItem.category?.description === categoryData.category?.description
				);
			});
			console.log({ foundItem }, { data }, { categoryData });
			// if show is found, print 'Following'
			if (foundItem) {
				setFollowStatus(BtnStatus.Following);
			} else {
				// if show is not found, print 'Follow'
				setFollowStatus(BtnStatus.Follow);
			}
		}
	}, [data, categoryData]);

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
