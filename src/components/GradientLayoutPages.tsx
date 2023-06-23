import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const GradientLayoutPages = ({
	color,
	children,
}: {
	color: string;
	children: ReactNode;
}) => {
	return (
		<Box
			sx={{
				height: "100%",
				overflowY: "auto",
				borderRadius: "10px",
				background: "black",
				bgGradient: `linear(to-b, ${color}.500 0%, ${color}.600 15%, ${color}.700 30%, rgba(18,18,18, .90) 75%)`,
			}}
		>
			<Flex sx={{ bg: `${color}.600`, padding: "40px", align: "end" }}>
				HELLOWORLD
			</Flex>
		</Box>
	);
};

export default GradientLayoutPages;
