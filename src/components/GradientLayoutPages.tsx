import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

const GradientLayoutPages = ({
	color,
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
	color: { r: number; g: number; b: number };
	children: ReactNode;
	image: string;
	roundAvatar: boolean;
}) => {
	console.log({ color });
	return (
		<Box
			sx={{
				height: "100%",
				overflowY: "auto",
				borderRadius: "10px",
				background: "black",
				bgGradient: `linear(to-b, rgba(${color.r},${color.g},${color.b}) 0%, rgba(${color.r},${color.g},${color.b}) 15%, rgba(${color.r},${color.g},${color.b}) 20%, rgba(18,18,18) 65%)`,
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
