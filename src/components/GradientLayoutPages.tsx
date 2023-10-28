import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import { ReactNode, useContext, useEffect, useState } from "react";
import capitalise from "../../lib/capitalise";
import lumaTextColor from "../../lib/lumaTextColor";

const fac = new FastAverageColor();
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
	description: (string | null | JSX.Element)[];
	children: ReactNode;
	image: string | null;
	roundAvatar: boolean;
}) => {
	const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
	const { updateScrollPosition } = useContext(ScrollPositionContext);

	const textColor = lumaTextColor(color);
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

	useEffect(() => {
		if (image && typeof image === "string") {
			fac
				.getColorAsync(image)
				.then((color) => {
					const rgbColor = {
						r: color.value[0],
						g: color.value[1],
						b: color.value[2],
					};
					setColor(rgbColor);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [image]);

	return (
		<Box
			onScroll={handleScroll}
			sx={{
				height: "100%",
				overflowY: "auto",
				borderRadius: "10px",
				background: "blue",
				bgGradient: `linear(to-b, rgba(${color.r},${color.g},${color.b}) 10px, rgba(${color.r},${color.g},${color.b}) 30px, rgba(${color.r},${color.g},${color.b}) 50px, rgba(18,18,18) 700px)`,
				backgroundAttachment: "local",
			}}
		>
			<Flex
				sx={{
					bg: `rgba(${color.r},${color.g},${color.b}, .4)`,
					padding: "60px 20px 20px 20px",
					align: "end",
				}}
			>
				<Box padding="20px" sx={{ display: "flex" }}>
					<Avatar
						size="full"
						src={image ?? undefined}
						borderRadius={roundAvatar ? "full" : "none"}
						boxShadow="2xl"
						width="250px"
						height="250px"
					/>
					<Box
						sx={{
							paddingLeft: "30px",
							color: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
							display: "flex",
							alignItems: "flex-end",
						}}
					>
						<Box>
							<Heading as="h4" size="xs">
								{capitalise(subtitle)}
							</Heading>
							<Heading as="h1" size="4xl">
								{capitalise(title)}
							</Heading>
							<Text
								fontSize={subtitle === "Podcast" ? "xl" : "sm"}
								fontWeight={subtitle === "Podcast" ? "bold" : "normal"}
								paddingTop="40px"
							>
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
