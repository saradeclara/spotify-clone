import { sidebarMain, spotifyGreen } from "@/styles/colors";
import {
	Button,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { MdCheck } from "react-icons/md";

const SortByFilter = ({
	filters,
	currentOption,
	updateOption,
}: {
	filters: string[];
	currentOption: number;
	updateOption: Function;
}) => {
	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						isActive={isOpen}
						as={Button}
						rightIcon={isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
						_hover={{ backgroundColor: sidebarMain }}
						_focusVisible={{ backgroundColor: sidebarMain }}
						_active={{ backgroundColor: sidebarMain }}
						sx={{
							width: "170px",
							backgroundColor: sidebarMain,
							textAlign: "right",
						}}
					>
						<Text fontSize="sm">{filters[currentOption]}</Text>
					</MenuButton>
					<MenuList
						sx={{
							backgroundColor: "#282828",
						}}
					>
						<Text
							fontSize="small"
							fontWeight="bold"
							paddingLeft="10px"
							marginBottom="5px"
						>
							Sort by
						</Text>
						{filters.map((singleFilter, index) => (
							<MenuItem
								key={index}
								backgroundColor={
									currentOption === index ? "#4c4c4c" : "#282828"
								}
								_hover={{ backgroundColor: "#4c4c4c" }}
								onClick={() => updateOption(index)}
								sx={{ display: "flex", justifyContent: "space-between" }}
							>
								<Text
									fontSize="small"
									color={currentOption === index ? spotifyGreen : "white"}
								>
									{singleFilter}
								</Text>
								{currentOption === index ? (
									<Icon as={MdCheck} color={spotifyGreen} />
								) : null}
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
};

export default SortByFilter;
