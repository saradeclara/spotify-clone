import { grayMain } from "@/styles/colors";
import { menuDataType } from "@/types";
import { Box, Link, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdHome, MdSearch } from "react-icons/md";

const NavMenu = () => {
	const navMenuData: menuDataType[] = [
		{
			name: "Home",
			icon: MdHome,
			route: "/",
		},
		{
			name: "Search",
			icon: MdSearch,
			route: "/search",
		},
	];
	return (
		<Box
			id="navMenu"
			sx={{
				borderRadius: "10px",
				backgroundColor: grayMain,
				padding: "17px",
			}}
		>
			<List spacing={5}>
				{navMenuData.map(({ name, icon, route }) => {
					return (
						<ListItem fontSize={16} key={name}>
							<Link
								_hover={{ color: "white" }}
								sx={{ display: "flex", alignItems: "center" }}
								as={NextLink}
								href={route}
							>
								<ListIcon fontSize={30} marginRight={5} as={icon} />
								<Text fontWeight="bold">{name}</Text>
							</Link>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default NavMenu;
