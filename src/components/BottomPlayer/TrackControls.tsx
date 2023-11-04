import { darkGrayText, lightGrayText } from "@/styles/colors";
import {
	Box,
	ButtonGroup,
	Center,
	IconButton,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
} from "@chakra-ui/react";
import { MouseEventHandler, useState } from "react";
import {
	AiFillPauseCircle,
	AiFillPlayCircle,
	AiFillStepForward,
	AiOutlineStepBackward,
} from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";
import { SlLoop } from "react-icons/sl";
import { ExtendedSong } from "../../../lib/store";

const TrackControls = ({
	activeSongs,
	activeSong,
}: {
	activeSongs: ExtendedSong[] | null;
	activeSong: ExtendedSong | null;
}) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [indexSong, setIndexSong] = useState(0);
	const [seek, setSeek] = useState(0.0);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [duration, setDuration] = useState(0.0);

	const controls: {
		icon: React.ReactElement;
		ariaLabel: string;
		fontSize: string;
		onClick: MouseEventHandler<HTMLElement>;
		color: string;
	}[] = [
		{
			icon: <BiShuffle />,
			ariaLabel: "shuffle",
			fontSize: "20px",
			onClick: () => setShuffle(!shuffle),
			color: shuffle ? lightGrayText : darkGrayText,
		},

		{
			icon: <AiOutlineStepBackward />,
			ariaLabel: "backward",
			fontSize: "20px",
			onClick: () => {},
			color: lightGrayText,
		},
		{
			icon: <AiFillPlayCircle />,
			ariaLabel: "play",
			fontSize: "39px",
			onClick: () => setIsPlaying(!isPlaying),
			color: lightGrayText,
		},
		{
			icon: <AiFillPauseCircle />,
			ariaLabel: "pause",
			fontSize: "39px",
			onClick: () => setIsPlaying(!isPlaying),
			color: lightGrayText,
		},
		{
			icon: <AiFillStepForward />,
			ariaLabel: "forward",
			fontSize: "20px",
			onClick: () => {},
			color: lightGrayText,
		},
		{
			icon: <SlLoop />,
			ariaLabel: "loop",
			fontSize: "20px",
			onClick: () => setRepeat(!repeat),
			color: repeat ? lightGrayText : darkGrayText,
		},
	];
	return (
		<Box sx={{ width: "50%" }}>
			<Box>
				{/* <ReactHowler playing={isPlaying} src={activeSong?.url} /> */}
			</Box>
			<Center sx={{ paddingBottom: "8px" }}>
				<ButtonGroup>
					{controls.map(({ icon, ariaLabel, fontSize, onClick, color }) => {
						if (isPlaying && ariaLabel === "play") return null;
						if (!isPlaying && ariaLabel === "pause") return null;
						return (
							<IconButton
								outline="none"
								variant="link"
								color={color}
								aria-label={ariaLabel}
								fontSize={fontSize}
								icon={icon}
								onClick={onClick}
							/>
						);
					})}
				</ButtonGroup>
			</Center>
			<Box color={lightGrayText}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box>
						<Text fontSize="xs">00:02</Text>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							padding: "0px 10px",
						}}
						width="80%"
					>
						<RangeSlider
							aria-label={["min", "max"]}
							step={0.1}
							min={0}
							max={123}
							id="seek-bar"
							defaultValue={[0]}
						>
							<RangeSliderThumb index={0} />
							<RangeSliderTrack background="gray.800">
								<RangeSliderFilledTrack background={lightGrayText} />
							</RangeSliderTrack>
						</RangeSlider>
					</Box>
					<Box>
						<Text fontSize="xs">02:18</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default TrackControls;
