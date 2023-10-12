import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ReactNode, useContext, useEffect } from "react";

const GradientLayoutArtist = ({
	children,
	headerUrl,
	name,
}: {
	children?: ReactNode;
	headerUrl?: string | null;
	name: string;
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
				bgGradient: `linear(to-b, rgba(${color.r},${color.g},${color.b}) 0%, rgba(${color.r},${color.g},${color.b}) 15%, rgba(${color.r},${color.g},${color.b}) 20%, rgba(18,18,18) 50%)`,
				backgroundAttachment: "local",
			}}
		>
			<Flex
				sx={{
					padding: "60px 20px 20px 20px",
					align: "end",
					background: `rgba(${color.r},${color.g},${color.b}, 0.3) url(${headerUrl})`,
					backgroundBlendMode: "multiply",
					backgroundSize: "cover",
					height: "400px",
				}}
			>
				<Box padding="20px" sx={{ display: "flex" }}>
					<Box
						sx={{
							paddingLeft: "30px",
							color: "white",
							display: "flex",
							alignItems: "flex-end",
						}}
					>
						<Box>
							<Heading as="h1" size="4xl">
								{name}
							</Heading>
							{/* <Text fontSize="sm" paddingTop="40px">
								{description}
							</Text> */}
						</Box>
					</Box>
				</Box>
			</Flex>
			{children}
		</Box>
	);
};

export default GradientLayoutArtist;
