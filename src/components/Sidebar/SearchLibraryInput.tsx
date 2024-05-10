import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { MdSearch } from "react-icons/md";

const SearchLibraryInput = ({
	textInput,
	updateTextInput,
}: {
	textInput: string;
	updateTextInput: Dispatch<SetStateAction<string>>;
}) => {
	const handleChangeTextInput = (e: FormEvent<HTMLInputElement>) => {
		updateTextInput(e.currentTarget.value);
	};
	return (
		<Box sx={{ width: "185px" }}>
			<InputGroup
				sx={{
					backgroundColor: "#282828",
					borderRadius: "50px",
				}}
			>
				<InputLeftElement
					pointerEvents="none"
					color="gray.300"
					fontSize="1.2em"
					// eslint-disable-next-line react/no-children-prop
					children={<MdSearch />}
				/>
				<Input
					_focusVisible={{ border: "1px" }}
					_hover={{ border: "1px" }}
					_placeholder={{
						opacity: 1,
						color: "#8E8E8E",
						fontSize: "small",
					}}
					value={textInput}
					onChange={handleChangeTextInput}
					sx={{
						borderRadius: "5px",
						borderColor: "#282828",
						paddingLeft: "35px",
					}}
					placeholder="Search In Your Library"
				/>
			</InputGroup>
		</Box>
	);
};

export default SearchLibraryInput;
