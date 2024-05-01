import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ReactNode, UIEvent, useContext, useEffect } from "react";

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

	/**
	 * The `handleScroll` function updates the scroll position of a target element based on the
	 * scrollTop value.
	 * @param {UIEvent | Event} e - The `e` parameter is of type `UIEvent` or `Event`, which represents
	 * the event object triggered when a scroll event occurs.
	 */
	const handleScroll = (e: UIEvent | Event) => {
		const target = e.target as HTMLDivElement;
		if (target && target.scrollTop) {
			updateScrollPosition(target.scrollTop);
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
						</Box>
					</Box>
				</Box>
			</Flex>
			{children}
		</Box>
	);
};

export default GradientLayoutArtist;
