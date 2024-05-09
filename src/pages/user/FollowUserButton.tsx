import { Button, useToast } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

interface FollowUserButtonProps {
	currentUser: User;
	userFollowing: User[];
}

const FollowUserButton = ({
	currentUser,
	userFollowing,
}: FollowUserButtonProps) => {
	const [followStatus, updateFollowStatus] = useState(false);
	const toast = useToast();

	const updateUserFollowing = async () => {
		const response = await fetch("/api/me", {
			method: "PUT",
			body: JSON.stringify({ newUser: currentUser }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const jsonResponse = await response.json();

		console.log({ jsonResponse });
		if (jsonResponse) {
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
