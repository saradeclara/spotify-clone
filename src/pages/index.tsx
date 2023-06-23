import GradientLayoutMain from "@/components/GradientLayoutMain";
import GradientLayoutPages from "@/components/GradientLayoutPages";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home = (_props: any) => {
	const { pathname } = useRouter();
	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			{pathname === "/" ? (
				<GradientLayoutMain color="red">
					<Box>hello</Box>
				</GradientLayoutMain>
			) : (
				<GradientLayoutPages color="red">
					<Box>hello</Box>
				</GradientLayoutPages>
			)}
		</Box>
	);
};

export default Home;
