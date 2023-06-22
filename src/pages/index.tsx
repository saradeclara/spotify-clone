import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

const Home = () => {
	const list = ["apple", "mango", "banana"];
	const substring = "a";
	return (
		<Box marginLeft="30px">
			<h3>List</h3>
			<h4>Substring: </h4> {substring}
			<UnorderedList>
				{list.map((element) => (
					<ListItem>
						{/* <SubstringSearchText string={element} substring={substring} /> */}
					</ListItem>
				))}
			</UnorderedList>
		</Box>
	);
};

export default Home;
