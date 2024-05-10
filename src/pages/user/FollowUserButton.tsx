import { currentUserKey } from "@/react-query/queryKeys";
import { Button, useToast } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useQueryClient } from "react-query";

interface FollowUserButtonProps {
	currentUser: User;
	userFollowing: User[];
	followStatus: boolean;
	updateFollowStatus: Dispatch<SetStateAction<boolean>>;
}

/* eslint-disable react/prop-types */
const FollowUserButton = ({
        	currentUser,
        	userFollowing,
        	updateFollowStatus,
        	followStatus,
        }: FollowUserButtonProps) => {
	const toast = useToast();
	const queryClient = useQueryClient();

	const updateUserFollowing = async () => {
		const response = await fetch("/api/me", {
			method: "PUT",
			body: JSON.stringify({ newUser: currentUser }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const jsonResponse = await response.json();

		if (jsonResponse) {
			queryClient.invalidateQueries(currentUserKey);

			toast({
				description: jsonResponse.message,
				duration: 3000,
				status: "success",
				isClosable: true,
			});
		}

		updateFollowStatus(jsonResponse.flag === "add");
	};

	// on load, check follow status and update accordingly
	useEffect(() => {
		const isUserFollowed =
			userFollowing.filter(
				(singleUser: User) => singleUser.id === currentUser.id
			).length > 0;

		isUserFollowed ? updateFollowStatus(true) : updateFollowStatus(false);
	}, []);

	return (
		<Button onClick={updateUserFollowing}>
			{followStatus ? "Following" : "Follow"}
		</Button>
	);
};

export default FollowUserButton;
