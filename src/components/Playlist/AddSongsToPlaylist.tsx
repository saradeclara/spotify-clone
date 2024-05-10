import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import { Album, Artist, Song } from "@prisma/client";
import { SetStateAction, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import ResultList from "./ResultList";

const AddSongsToPlaylist = ({ playlistId }: { playlistId: string }) => {
	const textInputDefault: string = "";
	const [textInput, updateTextInput] = useState(textInputDefault);
	const [results, updateResults] = useState<
		(Song & { album: Album; artist: Artist })[]
	>([]);

	const handleTextInputChange = (e: {
		target: { value: SetStateAction<string> };
	}) => {
		updateTextInput(e.target.value);
	};

	const handleDeleteTextInput = () => {
		console.log("delete");
		updateTextInput(textInputDefault);
	};

	useEffect(() => {
		if (textInput === textInputDefault) {
			updateResults([]);
		} else {
			const fetchSongs = async () => {
				const data = await fetch("/api/songs");
				const response = await data.json();
				const filteredResponse = response.filter((song: Song) =>
					song.name.toLowerCase().includes(textInput.toLowerCase())
				);

				updateResults(filteredResponse);
			};
			fetchSongs().catch(console.error);
		}
	}, [textInput]);

	return (
		<Box sx={{ padding: "0px 30px" }}>
			<InputGroup width="40%" background="#3d3d3d" borderRadius="5px">
				<InputLeftElement
					color="gray.300"
					fontSize="1.2em"
					// eslint-disable-next-line react/no-children-prop
					children={<MdSearch />}
					pointerEvents="none"
				/>

				<Input
					border="0px"
					color="white"
					onChange={handleTextInputChange}
					value={textInput}
					placeholder="Search for songs"
					_placeholder={{ color: "white" }}
				/>
				<InputRightElement
					color="gray.300"
					fontSize="1.2em"
					// eslint-disable-next-line react/no-children-prop
					children={<RxCross2 />}
					cursor="pointer"
					onClick={handleDeleteTextInput}
				/>
			</InputGroup>
			<ResultList results={results} playlistId={playlistId} />
		</Box>
	);
};

export default AddSongsToPlaylist;
