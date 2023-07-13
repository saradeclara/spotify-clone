import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode, useContext, useEffect } from "react";

const GradientLayoutPages = ({
	children,
	image,
	roundAvatar,
	description,
	subtitle,
	title,
}: {
	title: string;
	subtitle: string;
	description: string;
	children: ReactNode;
	image: string;
	roundAvatar: boolean;
}) => {
	const color = useContext(UserColorContext);
	const { updateScrollPosition } = useContext(ScrollPositionContext);

	const handleScroll = (e: any) => {
		if (e.target && e.target.scrollTop) {
			updateScrollPosition(e.target.scrollTop);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Box
			onScroll={handleScroll}
			sx={{
				height: "100%",
				overflowY: "auto",
				borderRadius: "10px",
				background: "blue",
				bgGradient: `linear(to-b, rgba(${color.r},${color.g},${color.b}) 0%, rgba(${color.r},${color.g},${color.b}) 15%, rgba(${color.r},${color.g},${color.b}) 20%, rgba(18,18,18) 40%)`,
				backgroundAttachment: "local",
			}}
		>
			<Flex
				sx={{
					bg: `rgba(${color.r},${color.g},${color.b}, 0.3)`,
					padding: "60px 20px 20px 20px",
					align: "end",
				}}
			>
				<Box padding="20px" sx={{ display: "flex" }}>
					<Avatar
						size="full"
						src={image}
						borderRadius={roundAvatar ? "full" : "none"}
						boxShadow="2xl"
						width="250px"
						height="250px"
					/>
					<Box
						sx={{
							paddingLeft: "30px",
							color: "white",
							display: "flex",
							alignItems: "flex-end",
						}}
					>
						<Box>
							<Heading as="h4" size="xs">
								{subtitle}
							</Heading>
							<Heading as="h1" size="4xl">
								{title}
							</Heading>
							<Text fontSize="sm" paddingTop="40px">
								{description}
							</Text>
						</Box>
					</Box>
				</Box>
			</Flex>
			{children}
		</Box>
	);
};

export default GradientLayoutPages;
