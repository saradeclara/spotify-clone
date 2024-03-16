import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const GradientLayoutMain = ({
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
				bgGradient: `linear(to-b, ${color}.900 0%, rgba(18,18,18, .90) 40%)`,
			}}
		>
			<Flex sx={{ padding: "40px" }}>{children}</Flex>
		</Box>
	);
};

export default GradientLayoutMain;
