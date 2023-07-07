import GradientLayoutMain from "@/components/GradientLayoutMain";
import { Box } from "@chakra-ui/react";

const Home = (_props: any) => {
	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutMain color="red" image={""}>
				<Box>hello</Box>
			</GradientLayoutMain>
		</Box>
	);
};

export default Home;
