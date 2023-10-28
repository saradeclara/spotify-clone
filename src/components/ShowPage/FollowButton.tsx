import { Mode } from "@/enums/FollowButton";
import { fetchFeedData } from "@/react-query/fetch";
import { feedKey } from "@/react-query/queryKeys";
import { lightGrayText, spotifyGreen } from "@/styles/colors";
import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { Album, Artist, Category, Playlist, Show, Song } from "@prisma/client";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";

type FeedData = ((Show | Album | Artist | Song | Playlist) & {
	category: { description: string };
})[];

const FollowButton = ({
	categoryData,
	categoryArray,
	mode,
}: {
	mode: Mode;
	categoryArray: string;
	categoryData: (Show | Artist | Album | Playlist | Song) & {
		category?: Category;
	};
}) => {
	// console.log({ categoryData });
	const [followStatus, setFollowStatus] = useState<BtnStatus | string>("");
	console.log({ followStatus });
	const { data } = useQuery<FeedData>(feedKey, fetchFeedData);

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
			},
		}
	);

	const handleFollowUnfollow = async (itemId: string) => {
		const body = { itemId, category: categoryArray };
		updateFeedMutation.mutate(body);
	};

	useEffect(() => {
		// check data from feed query to see if current show is in feed
		if (data) {
			const foundItem = [...data].find(
				(feedItem) =>
					feedItem.id === categoryData.id &&
					feedItem.category?.description === categoryData.category?.description
			);
			console.log("useEffect", data, categoryData, { foundItem });
			// if show is found, print 'Following'
			if (foundItem) {
				setFollowStatus(BtnStatus.Following);
			} else {
				// if show is not found, print 'Follow'
				setFollowStatus(BtnStatus.Follow);
			}
		}
	}, [data]);

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
				padding: "30px 30px 0px 30px",
				color: lightGrayText,
			}}
		>
			<Tooltip label="Save to Your Library" placement="top">
				<Box display="inline-block" _hover={{ color: "white" }}>
					<AiOutlineHeart
						cursor="pointer"
						size="50px"
						onClick={() => handleFollowUnfollow(categoryData.id)}
					/>
				</Box>
			</Tooltip>
		</Box>
	) : (
		<Box
			sx={{
				padding: "30px 30px 0px 30px",
				color: spotifyGreen,
			}}
		>
			<Tooltip label="Remove from Your Library" placement="top">
				<Box display="inline-block" _hover={{ color: spotifyGreen }}>
					<AiFillHeart
						cursor="pointer"
						size="50px"
						onClick={() => handleFollowUnfollow(categoryData.id)}
					/>
				</Box>
			</Tooltip>
		</Box>
	);
};

export default FollowButton;
